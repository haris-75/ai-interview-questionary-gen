import { Outlet } from "react-router-dom";

export default function AppShellLayout() {
  return (
    <div className=" bg-background text-fg h-full overflow-auto">
      {/* header / sidebar here */}
      <main className="max-w-5xl mx-auto px-4 py-8 h-full">
        <Outlet />
      </main>
    </div>
  );
}
