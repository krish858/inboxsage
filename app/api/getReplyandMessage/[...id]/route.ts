"use server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import { mailModel } from "@/models/mailModel";
import { messageModel } from "@/models/messagemodel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id.join("/");

    console.log("ID:", id);

    const session = await getServerSession();

    if (!session) {
      console.log("No session found");
      return NextResponse.json({ success: false, type: "not authenticated" });
    }

    const email = session.user?.email;
    console.log(" email:", email);

    await dbConnect();
    console.log("Database connected");

    const reply = await mailModel.findOne({ mailid: id, email });
    const message = await messageModel.findOne({ Mailid: id, email });

    return NextResponse.json({
      success: true,
      reply,
      message,
    });
  } catch (error) {
    console.error("GetReplyAndMessage - Error:", error);
    return NextResponse.json({
      success: false,
      type: "error",
      error: error,
    });
  }
}
