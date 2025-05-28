"use server";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import Groq from "groq-sdk";
import { mailModel } from "@/models/mailModel";
import { messageModel } from "@/models/messagemodel";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { id, query } = await req.json();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, type: "not authenticated" });
    }

    const email = session.user?.email;
    await dbConnect();

    const reply = await mailModel.findOne({ mailid: id, email });
    const message = await messageModel.findOne({ Mailid: id, email });

    await messageModel.updateOne(
      { Mailid: id },
      {
        $push: {
          message: {
            role: "user",
            content: query,
          },
        },
      }
    );

    const prompt = `You are a professional email assistant.

        Here is the email received:
        - Subject: ${reply.subject}
        - Body: ${reply.body}

        Here is the current reply draft:
        - Reply Subject: ${reply.replysubject}
        - Reply Body: ${reply.replyobject}

        The user says:
        "${query}"

        Your task:
        Based on the user's input, assess whether the reply subject or body needs improvement. Update them only if necessary.

        Return the result in the following format:

        json_output = {
        message: "message you want to show to user behave humanly",
        replybody: "Return the revised reply body, or the original (${reply.replyobject}) if no change is made.",
        replysubject: "Return the revised reply subject, or the original (${reply.replysubject}) if no change is made."
        }

    `;

    let messages = message.message || [];

    messages.push({
      role: "user",
      content: prompt,
    });

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_completion_tokens: 30070,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });

    const responseContent = completion.choices[0].message.content || null;

    if (!responseContent) {
      await messageModel.updateOne(
        { Mailid: id, email },
        {
          $push: {
            message: {
              role: "assistant",
              content:
                "Sorry, there was an error processing your request. Could you please try again?",
            },
          },
        }
      );

      return NextResponse.json({
        success: false,
        type: "groq_error",
        msg: "Sorry, there was an error processing your request. Could you please try again?",
      });
    }

    const data = await JSON.parse(responseContent);

    await messageModel.updateOne(
      { Mailid: id, email },
      {
        $push: {
          message: {
            role: "assistant",
            content: data.message,
          },
        },
      }
    );

    await mailModel.updateOne(
      { mailid: id, email },
      {
        replybody: data.replybody,
        replysubject: data.replysubject,
      }
    );

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      type: "error",
      error: error,
    });
  }
}
