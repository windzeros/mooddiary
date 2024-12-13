"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DiaryInput {
  content: string;
  diary_date: string;
}

export default function NewDiaryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diary, setDiary] = useState<DiaryInput>({
    content: "",
    diary_date: format(new Date(), "yyyy-MM-dd"),
  });
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diary),
      });

      if (!response.ok) {
        throw new Error("Failed to create diary");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating diary:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">새로운 일기 작성</h1>
            <p className="text-gray-500">오늘의 감정을 기록해보세요.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">날짜</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: ko })
                    ) : (
                      <span>날짜를 선택하세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        setDiary((prev) => ({
                          ...prev,
                          diary_date: format(newDate, "yyyy-MM-dd"),
                        }));
                      }
                    }}
                    initialFocus
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">내용</label>
              <Textarea
                value={diary.content}
                onChange={(e) =>
                  setDiary((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="오늘의 감정을 자유롭게 적어보세요..."
                className="min-h-[200px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
