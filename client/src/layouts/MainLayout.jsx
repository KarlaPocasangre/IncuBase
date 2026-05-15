import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#EEF3F0]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Topbar />

        {/* CONTENIDO */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;