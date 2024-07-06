import Link from "next/link";

import ".//header.css";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link href="/">RT Studio</Link>
      </h1>
    </div>
  );
}
