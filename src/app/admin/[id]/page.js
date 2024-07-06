"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams, useParams } from "next/navigation";

import ".//editRecord.css";

export default function EditRecord() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isArchiveLoading, setIsArchiveLoading] = useState(false);
  const [isUnarchiveLoading, setIsUnarchiveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(searchParams.get("name"));
  const [email, setEmail] = useState(searchParams.get("email"));
  const router = useRouter();

  async function updateRecord(event) {
    event.preventDefault();
    setIsUpdateLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const response = await fetch(
        `/api/update-records?id=${params.id}&name=${name}&email=${email}&status=updated`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      if (response.status == 200) {
        router.push("/admin");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsUpdateLoading(false);
    }
  }

  async function archiveRecord() {
    setIsArchiveLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const response = await fetch(
        `/api/archive-records?id=${params.id}&status=archived`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      if (response.status == 200) {
        router.push("/admin");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsArchiveLoading(false);
    }
  }

  async function unarchiveRecord() {
    setIsUnarchiveLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const response = await fetch(
        `/api/archive-records?id=${params.id}&status=unarchived`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      if (response.status == 200) {
        router.push("/admin");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsUnarchiveLoading(false);
    }
  }

  async function deleteRecord() {
    setIsDeleteLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const response = await fetch(`/api/delete-records?id=${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      if (response.status == 200) {
        router.push("/admin");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <div>
      <Link href={`/admin`}>back</Link>
      <Link href={`/api/auth/signout?callbackUrl=/`}>sign out</Link>
      <h2>Edit record</h2>
      <p>
        You can edit,{" "}
        {searchParams.get("status") === "archived" ? "unarchive" : "archive"} or
        delete this records. Updating an archived record will unarchived the
        record.
      </p>
      <p>
        Deleting a record is permanent and cannot be undone. Archive records
        instead.
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="update-form">
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <button
            type="button"
            disabled={isDeleteLoading}
            onClick={deleteRecord}
          >
            {isDeleteLoading ? "Loading..." : "Delete"}
          </button>
          <p>{params.status}</p>
          {searchParams.get("status") === "archived" && (
            <button
              type="button"
              disabled={isUnarchiveLoading}
              onClick={unarchiveRecord}
            >
              {isUnarchiveLoading ? "Loading..." : "Unarchive"}
            </button>
          )}
          {searchParams.get("status") !== "archived" && (
            <button
              type="button"
              disabled={isArchiveLoading}
              onClick={archiveRecord}
            >
              {isArchiveLoading ? "Loading..." : "Archive"}
            </button>
          )}
        </div>
        <button type="button" disabled={isUpdateLoading} onClick={updateRecord}>
          {isUpdateLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
}
