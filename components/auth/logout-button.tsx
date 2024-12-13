"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="outline"
      className="w-full"
    >
      로그아웃
    </Button>
  );
}
