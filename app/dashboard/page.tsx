"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DiaryList } from "@/components/diary/diary-list";
import { DiaryEntry } from "@/types/diary";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDiaries() {
      try {
        const response = await fetch("/api/diary");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchDiaries();
    }
  }, [status]);

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">로딩 중...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">환영합니다, {session?.user?.name || "사용자"}님!</h1>
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => router.push("/diary/new")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              새 일기 작성
            </Button>
            <div className="w-32">
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">오늘의 기분은 어떠신가요?</h2>
          <p className="text-gray-600">
            여기에서 당신의 감정을 기록하고 분석할 수 있습니다.
          </p>
        </div>
        <DiaryList entries={entries} />
      </div>
    </div>
  );
}
