"use server";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import { mailModel } from "@/models/mailModel";

export async function GET(
  req: NextRequest,
  context: { params: { id: string[] } }
) {
  try {
    const { params } = context;
    const id = params.id.join("/");
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, type: "not authenticated" });
    }

    const email = session.user?.email;
    await dbConnect();

    const existing = await mailModel.findOne({ mailid: id, email });

    return NextResponse.json({
      success: true,
      exists: !!existing,
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
