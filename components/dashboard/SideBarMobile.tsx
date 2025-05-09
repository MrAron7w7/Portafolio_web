"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

type SideBarMobileProps = {
  content: React.ReactNode;
};

function SideBarMobile({ content }: SideBarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          {content}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideBarMobile;
