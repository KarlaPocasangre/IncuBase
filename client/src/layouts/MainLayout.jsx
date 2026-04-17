import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#EEF3F0]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;