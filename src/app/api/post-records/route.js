import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  try {
    if (!name || !email) throw new Error("name and email is required");
    await sql`INSERT INTO records (name, email, status) VALUES (${name}, ${email}, 'successful');`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const records = await sql`SELECT * FROM records;`;
  return NextResponse.json({ records }, { status: 200 });
}
