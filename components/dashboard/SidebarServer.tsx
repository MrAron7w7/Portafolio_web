import { ScrollArea } from "@/components/ui/scroll-area";
import { NavSection } from "./nav-section";
import { BrandSection } from "./BrandSection";
import UserSection from "./user-section";
import { auth } from "@/lib/auth/auth";

export async function SidebarServer() {
  const session = await auth();
  if (!session || !session.user) return null;

  const user = session.user;

  return (
    <div className="flex h-full flex-col">
      <BrandSection />
      <ScrollArea className="flex-1">
        <NavSection />
      </ScrollArea>
      <UserSection
        user={{
          name: user.name || user.email || "Usuario",
          email: user.email || "",
          image: user.image || "",
        }}
      />
    </div>
  );
}
