"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DiaryEntry } from "@/types/diary";
import { DiaryList } from "@/components/diary/diary-list";

export default function DiaryListPage() {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      redirect("/");
    }

    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/diary");
        if (!response.ok) {
          throw new Error("Failed to fetch diary entries");
        }
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">나의 일기장</h1>
      <DiaryList entries={entries} />
    </main>
  );
}
