import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { dbConnect } from "@/app/db";
import { userModel } from "@/models/userModel";

const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me/messages";
const SECRET = process.env.NEXTAUTH_SECRET;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: SECRET });
  console.log(token);
  if (!token?.accessToken) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const email = token.email;
    const listRes = await fetch(`${GMAIL_API}?maxResults=15&labelIds=INBOX`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const user = await userModel.findOne({ email });
    console.log(user);
    const listData = await listRes.json();
    if (!listData.messages || listData.messages.length === 0) {
      return NextResponse.json({ success: true, emails: [] });
    }

    const emails = await Promise.all(
      listData.messages.map(async ({ id }: { id: string }) => {
        const res = await fetch(`${GMAIL_API}/${id}?format=full`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const data = await res.json();
        const headers = Object.fromEntries(
          data.payload.headers.map((h: any) => [h.name, h.value])
        );
        const subject = headers["Subject"] || "(no subject)";
        const from = headers["From"] || "(unknown sender)";
        const snippet = data.snippet;
        const body = extractPlainTextBody(data.payload).slice(0, 1000);

        return {
          id,
          subject,
          from,
          snippet,
          body,
        };
      })
    );
    const emailJson = JSON.stringify(emails, null, 2);
    const prompt = `You are my personal email assistant. Below is a list of emails I received(in JSON format):
      ${emailJson}

      Your task:
      - Review all emails(subject and body) and filter out spam or unimportant ones.
      - From the important emails, generate a clear and natural-sounding summary. (for me that is ${
        user.prompt || " "
      } ) if empty means i have no pref decide on your own.
      - Dont create eamils on your own just filter from above given emails.
      - If there are no important emails, simply say: "No important mails are present."

      Output format (as a JSON object):
      output_json = {
        summary: // A natural-sounding summary of the important emails in detail (around 100 words),
        mails: [ // A list of important emails only
          {
            id, // id of the email
            title,
            sender_mail,
            priority, // One of: "high", "medium", "low"
            tags,
            subject,
            body
          }
        ]
      }`;
    console.log("generating");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
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
    console.log(completion.choices[0].message.content);
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from Groq API");
    }
    const data = await JSON.parse(responseContent);
    return NextResponse.json({ success: true, data, emails });
  } catch (err) {
    console.error("Gmail API error:", err);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch emails",
    });
  }
}

function extractPlainTextBody(payload: any): string {
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    const base64 = payload.body.data.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64").toString("utf8");
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const result = extractPlainTextBody(part);
      if (result) return result;
    }
  }

  return "(no plain text body found)";
}
