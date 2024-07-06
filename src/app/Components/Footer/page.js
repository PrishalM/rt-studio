import Link from "next/link";

export default function Footer() {
  return (
    <p>
      © 2024 RT Studio.{" "}
      <Link href="/terms">Terms & Conditions and Privacy Policy</Link>. Designed
      & Developed by <Link href="https://prish.al">Prish.al</Link>
    </p>
  );
}
