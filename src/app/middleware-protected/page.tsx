import Link from "next/link";

export default function Protected() {
  return (
    <main>
      <h1>🔒 Protected page</h1>
      <p>This page is password protected with middleware!</p>
      <Link href={`/api/auth/signin?callbackUrl=/admin`}>sign in</Link>
    </main>
  );
}
