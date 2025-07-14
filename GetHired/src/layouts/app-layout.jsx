import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="px-5">
      <div className="grid-background"></div>
      <main className="min-h-screen container m-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 ">
        Project by Deepak
      </div>
    </div>
  );
}

export default AppLayout;
