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

const editStudentSchema = z.object({
  first_name: z.optional(z.string().min(3).max(30)),
  last_name: z.optional(z.string().max(30)),
  grade: z.optional(z.string().min(1).max(10)),
});

interface StudentType {
  first_name: string;
  last_name?: string;
  grade: string;
}

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      const allStudents = await prisma.student.findMany();
      return NextResponse.json({ data: allStudents }, { status: 200 });
    } else {
      const student = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json({ data: student }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createStudentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
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

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const student = await prisma.student.findFirst({
        where: { id: Number(id) },
      });

      if (student) {
        const body = await request.json();

        const validation = editStudentSchema.safeParse(body);

        if (!validation.success) {
          return NextResponse.json(validation.error.errors, { status: 400 });
        }

        const updatedStudent = await prisma.student.update({
          where: { id: Number(id) },
          data: body,
        });

        return NextResponse.json(
          { data: updatedStudent, message: "Student updated successfully!" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Student not available!" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Student not available!" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const student = await prisma.student.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json(
        { data: student, message: "Student deleted successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Student not available!" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something is wrong! Please try again!" },
      { status: 401 }
    );
  }
}
