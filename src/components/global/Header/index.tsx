import { Link, useLocation } from "react-router";
// import HeaderSheet from "./HeaderSheet";
import { Separator } from "@/components/ui/separator";

const links = [
  {
    name: "Rumah",
    url: "/houses",
  },
  {
    name: "Penghuni",
    url: "/residents",
  },
  {
    name: "Pembayaran",
    url: "/payments",
  },
  {
    name: "Pengeluaran",
    url: "/expenses",
  },
  {
    name: "Report Summary",
    url: "/reports",
  },
];

const Header = () => {
  const location = useLocation();
  const currentPathTextColor = (path: string) => {
    const isCurrentPath = location.pathname === path;
    return isCurrentPath ? "text-primary" : "text-foreground";
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <section className="px-4 lg:px-0">
        <section className="flex max-w-screen-lg mx-auto justify-between items-center py-4">
          <Link to="/" className="link-hover">
            <h1 className="link-hover uppercase font-semibold">
              Manajemen Perumahan
            </h1>
          </Link>
          <nav className="flex items-center space-x-2">
            <ol className="hidden lg:flex space-x-5 items-center list-none">
              {links.map((link) => {
                const textColor = currentPathTextColor(link.url);

                return (
                  <Link
                    to={link.url}
                    key={link.name}
                    className={`link-hover ${textColor}`}
                  >
                    <li>{link.name}</li>
                  </Link>
                );
              })}
            </ol>
            {/* <div className="lg:hidden">
              <HeaderSheet links={links} />
            </div> */}
          </nav>
        </section>
      </section>
      <Separator />
    </header>
  );
};

export default Header;
