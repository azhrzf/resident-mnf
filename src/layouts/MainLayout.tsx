import { Outlet } from "react-router";
import Header from "@/components/global/Header";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="max-w-screen-lg w-full mx-auto">
        <Outlet />
      </div>
      <section className="mt-auto">Footer</section>
    </section>
  );
};

export default MainLayout;
