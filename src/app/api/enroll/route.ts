import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const course_id = await prisma.course.findUnique({
      where: { id: Number(body.course_id) },
    });
    const student_id = await prisma.student.findUnique({
      where: { id: Number(body.student_id) },
    });

    if (course_id && student_id) {
      const newEnroll = await prisma.enroll.create({
        data: {
          studentId: Number(body.student_id),
          courseId: Number(body.course_id),
        },
      });
      return NextResponse.json(
        { data: newEnroll, message: "Enrollment created successfully!!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Course or Student not found!" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 401 }
    );
  }
}
