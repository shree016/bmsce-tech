import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Pusher from "pusher";

// 🔥 Pusher server instance
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, answer, email } = body;

    if (!questionId || !answer || !email) {
      return NextResponse.json(
        { error: "Missing required fields (email, answer, questionId)" },
        { status: 400 }
      );
    }

    const existing = await prisma.response.findFirst({
      where: { questionId, email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already submitted a response." },
        { status: 400 }
      );
    }

    const response = await prisma.response.create({
      data: {
        questionId,
        answer,
        email,
      },
    });

    await pusher.trigger(
      `question-${questionId}`, // channel
      "new-response", // event
      response // payload
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error creating response:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "You have already submitted a response." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create response",
        details: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
