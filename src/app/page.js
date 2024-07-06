"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ".//home.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const response = await fetch(
        `/api/post-records?name=${name}&email=${email}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      if (response.status == 200) {
        router.push("/subscribed");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Link href={`/admin`}>admin</Link>
      <h2>Join our Newsletter</h2>
      <p>
        By signing up you agree to our{" "}
        <Link href="/terms">Terms & Conditions and Privacy Policy</Link>.
      </p>
      <p>* Mandatory</p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="subscribe-form" onSubmit={onSubmit}>
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Anita Patel"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="e.g. anita.patel@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
