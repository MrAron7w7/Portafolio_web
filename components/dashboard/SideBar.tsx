import SideBarMobile from "./SideBarMobile";
import { SidebarServer } from "./SidebarServer";

async function Sidebar() {
  const content = await SidebarServer();

  return (
    <>
      <SideBarMobile content={content} />
      <aside className="hidden lg:flex w-[240px] flex-col border-r">
        {content}
      </aside>
    </>
  );
}

export default Sidebar;
