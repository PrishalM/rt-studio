import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const status = searchParams.get("status");

  try {
    if (!id || !name || !email || !status)
      throw new Error("id, name, email, and status is required");
    const result = await sql`UPDATE records
    SET name = ${name}, email = ${email}, status = ${status}
    WHERE record_id = ${id};`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
