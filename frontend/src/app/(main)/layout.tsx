"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { COOKIE_KEY } from "@/constant/common.constant";
import { removeCookie } from "@/lib/cookie";
import { concatNameSafe } from "@/lib/utils";
import { useAuthGetMe } from "@/services/hooks/use-auth.service";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { data } = useAuthGetMe();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky w-full top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <SidebarTrigger className="-ml-1" />
          {data && (
            <Popover>
              <PopoverTrigger className=" flex gap-2 items-center">
                {concatNameSafe(data.data.firstName, data.data.lastName)}
                <ChevronDown size={14} />
              </PopoverTrigger>

              <PopoverContent className=" p-1 w-48" align="end">
                <PopoverClose asChild>
                  <Button
                    variant="ghost"
                    className=" w-full justify-start"
                    size="sm"
                    asChild
                  >
                    <Link href="/setting">
                      <Settings />
                      Setting
                    </Link>
                  </Button>
                </PopoverClose>
                <PopoverClose asChild>
                  <Button
                    variant="ghost"
                    className=" w-full justify-start"
                    onClick={() => {
                      removeCookie(COOKIE_KEY.ACCESS_TOKEN);
                      window.location.replace("/");
                    }}
                    size="sm"
                  >
                    <LogOut />
                    Logout
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          )}
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
