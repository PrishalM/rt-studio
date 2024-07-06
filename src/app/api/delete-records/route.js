import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) throw new Error("id is required");
    const result = await sql`DELETE FROM records
    WHERE record_id = ${id};`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
