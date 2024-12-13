"use client";

import { DiaryEntry } from "@/types/diary";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface DiaryListProps {
  entries: DiaryEntry[];
}

export function DiaryList({ entries }: DiaryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">아직 작성된 일기가 없습니다.</p>
        <Button asChild>
          <Link href="/diary/new">일기 쓰기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CalendarIcon className="h-4 w-4 opacity-70" />
            <span className="font-semibold">
              {format(new Date(entry.diary_date), "PPP", { locale: ko })}
            </span>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">
              {entry.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/diary/${entry.id}`}>자세히 보기</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
