import AuthRedirect from "@/components/AuthRedirect";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppFooter = () => (
  <footer className="w-full p-8 text-center bg-gray-800 text-gray-300 mt-auto">
    <p>GetHired UK Ltd © 2025</p>
  </footer>
);

function AppLayout() {
  return (
    <div className="px-5">
      <div className="grid-background"></div>
      <main className="min-h-screen container m-auto">
        <Header />
        <AuthRedirect/>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
