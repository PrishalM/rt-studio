import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`CREATE TABLE records(
        record_id SERIAL PRIMARY Key,
        name VARCHAR(30),
        email VARCHAR(50),
        status VARCHAR(20)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
