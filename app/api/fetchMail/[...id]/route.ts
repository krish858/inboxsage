import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(
  req: NextRequest,
  context: { params: { id?: string[] } }
) {
  const token = await getToken({ req, secret });

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const idArray = context?.params?.id;
  if (!idArray || !Array.isArray(idArray)) {
    return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
  }

  const id = idArray.join("/");

  try {
    const gmailRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    if (!gmailRes.ok) {
      const errorText = await gmailRes.text();
      return NextResponse.json({
        error: "Failed to fetch email",
        details: errorText,
      });
    }

    const emailData = await gmailRes.json();

    const headers = emailData.payload.headers;
    const subjectHeader = headers.find(
      (h: any) => h.name.toLowerCase() === "subject"
    );
    const fromHeader = headers.find(
      (h: any) => h.name.toLowerCase() === "from"
    );

    const subject = subjectHeader?.value || "No Subject";
    const sendermailRaw = fromHeader?.value || "Unknown Sender";
    const sendermail = extractEmailAddress(sendermailRaw);

    let body = "";
    const parts = emailData.payload.parts || [];

    const plainTextPart = findPartByMimeType(parts, "text/plain");
    const htmlPart = findPartByMimeType(parts, "text/html");

    if (plainTextPart?.body?.data) {
      body = decodeBase64(plainTextPart.body.data);
    } else if (htmlPart?.body?.data) {
      body = decodeBase64(htmlPart.body.data);
    } else if (emailData.payload.body?.data) {
      body = decodeBase64(emailData.payload.body.data);
    }

    return NextResponse.json({ sendermail, subject, body });
  } catch (error) {
    console.error("Error fetching email:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

function decodeBase64(base64: string): string {
  return Buffer.from(
    base64.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf-8");
}

function extractEmailAddress(raw: string): string {
  const match = raw.match(/<([^>]+)>/);
  return match ? match[1] : raw;
}

function findPartByMimeType(parts: any[], mimeType: string): any {
  for (const part of parts) {
    if (part.mimeType === mimeType) return part;
    if (part.parts) {
      const found = findPartByMimeType(part.parts, mimeType);
      if (found) return found;
    }
  }
  return null;
}
