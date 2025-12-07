import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await prisma.response.create({
      data: {
        questionId: body.questionId,
        answer: body.answer,
        studentId: body.studentId || null,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating response:", error);
    return NextResponse.json(
      { error: "Failed to create response" },
      { status: 500 }
    );
  }
}
