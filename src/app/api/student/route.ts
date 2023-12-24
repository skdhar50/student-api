import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStudentSchema = z.array(
  z.object({
    first_name: z.string().min(3).max(30),
    last_name: z.optional(z.string().max(30)),
    grade: z.string().min(1).max(10),
  })
);

interface StudentType {
  first_name: string;
  last_name?: string;
  grade: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createStudentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const prisma = new PrismaClient();
    const students = body?.map((student: StudentType) => {
      return {
        first_name: student.first_name,
        last_name: student?.last_name ?? "",
        grade: student.grade,
      };
    });
    const newStudent = await prisma.student.createMany({
      data: [...students],
    });

    return NextResponse.json({ data: newStudent }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 401 }
    );
  }
}
