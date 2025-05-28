"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import { mailModel } from "@/models/mailModel";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, type: "not authenticated" });
    }

    const email = session.user?.email;
    await dbConnect();

    const mails = await mailModel.find({ email });

    return NextResponse.json({
      success: true,
      mails,
    });
  } catch (error: any) {
    console.error("DB check error:", error);
    return NextResponse.json({
      success: false,
      type: "error",
      error: error,
    });
  }
}
