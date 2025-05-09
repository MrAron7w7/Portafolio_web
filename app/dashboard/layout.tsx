import Sidebar from "@/components/dashboard/SideBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
