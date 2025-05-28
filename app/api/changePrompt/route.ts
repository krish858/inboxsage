"use server";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/db";
import { userModel } from "@/models/userModel";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, type: "not authenticated" });
    }

    const email = session.user?.email;
    await dbConnect();

    await userModel.updateOne({ email }, { prompt });

    return NextResponse.json({
      success: true,
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
