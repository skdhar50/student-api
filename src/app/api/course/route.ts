import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createCourseSchema = z.array(
  z.object({
    course_name: z.string().min(3).max(60),
    course_code: z.string().min(1).max(50),
  })
);

interface CourseType {
  course_name: string;
  course_code: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createCourseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const prisma = new PrismaClient();
    const courses = body?.map((course: CourseType) => {
      return {
        course_name: course.course_name,
        course_code: course?.course_code,
      };
    });
    const newCourse = await prisma.course.createMany({
      data: [...courses],
    });

    return NextResponse.json(
      { data: newCourse, message: "Course created successfully!!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 401 }
    );
  }
}
