import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStudentSchema = z.object({
    first_name: z.string().min(3).max(30),
    last_name: z.string().max(30),
    grade: z.string().min(1).max(10)
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createStudentSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }



    return NextResponse.json({}, { status: 200 })
}