"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ".//admin.css";

export default function Admin() {
  const [records, setRecords] = useState();
  const [archivedRecords, setArchivedRecords] = useState();

  const fetchRecords = async () => {
    const response = await fetch("/api/get-records");
    const json = await response.json();

    setRecords(
      json?.result.rows.filter((record) => record.status !== "archived")
    );
    setArchivedRecords(
      json?.result.rows.filter((record) => record.status === "archived")
    );
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <Link href={`/api/auth/signout?callbackUrl=/`}>sign out</Link>
      <h2>All record</h2>
      <p>
        Here are all the records in the database. You can edit each record by
        clicking the edit link.
      </p>
      {!records && !archivedRecords ? (
        <span>loading...</span>
      ) : (
        <>
          <h3>Leads</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map((record) => (
                  <tr key={record.record_id}>
                    <td>{record.record_id}</td>
                    <td>{record.name}</td>
                    <td>{record.email}</td>
                    <td>{record.status}</td>
                    <td>
                      <Link
                        href={`/admin/${record.record_id}?name=${record.name}&email=${record.email}&status=${record.status}`}
                      >
                        edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3>Archived records</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {archivedRecords &&
                archivedRecords.map((record) => (
                  <tr key={record.record_id}>
                    <td>{record.record_id}</td>
                    <td>{record.name}</td>
                    <td>{record.email}</td>
                    <td>{record.status}</td>
                    <td>
                      <Link
                        href={`/admin/${record.record_id}?name=${record.name}&email=${record.email}&status=${record.status}`}
                      >
                        edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
