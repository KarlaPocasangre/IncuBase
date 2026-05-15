import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#EEF3F0]">
      <Sidebar />

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="incubase-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex-1 p-6">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
