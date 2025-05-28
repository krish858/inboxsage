"use server";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import Groq from "groq-sdk";
import { messageModel } from "@/models/messagemodel";
import { mailModel } from "@/models/mailModel";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { id, mailsub, mailbody, sendermail } = await req.json();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { success: false, type: "not_authenticated" },
        { status: 401 }
      );
    }

    const email = session.user?.email;
    await dbConnect();

    const prompt = `You are my email assistant. I received an email with the following details:

        Subject: ${mailsub || ""}
        Body: ${mailbody || ""}

        Please generate a professional reply to this email.

        Output as JSON:
        {
        replysub,  // subject of the reply
        replybody  // body of the reply
        }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "qwen-qwq-32b",
      temperature: 0.9,
      max_completion_tokens: 20000,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from Groq API");
    }

    const data = JSON.parse(responseContent);

    const savedReply = await mailModel.create({
      mailid: id,
      email,
      senderemail: sendermail,
      body: mailbody,
      subject: mailsub,
      replybody: data.replybody,
      replysubject: data.replysub,
    });

    await messageModel.create({
      Mailid: id,
      email,
      message: [
        {
          role: "assistant",
          content:
            "Here is the suggested reply. Let me know if you'd like to revise it.",
        },
      ],
    });

    return NextResponse.json({ success: true, reply: savedReply });
  } catch (error) {
    console.error("Generate Reply Error:", error);
    return NextResponse.json({ success: false, type: "error", error: error });
  }
}
