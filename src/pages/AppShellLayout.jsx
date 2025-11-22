import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AppShellLayout = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-bg to-elevated flex transition-colors duration-300 font-sans overflow-auto">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-4 h-screen">
        <div className="bg-background text-fg h-full w-full overflow-auto">
          <section className="max-w-4xl mx-auto px-4 py-8 h-full">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AppShellLayout;
