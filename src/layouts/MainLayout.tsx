import { Outlet } from "react-router";
import Header from "@/components/global/Header";
import { Toaster } from "@/components/ui/sonner";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="px-4 lg:px-0 max-w-screen-lg w-full mx-auto py-10">
        <Outlet />
      </div>
      <Toaster />
      <section className="mt-auto">Footer</section>
    </section>
  );
};

export default MainLayout;
