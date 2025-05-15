import { ReactNode } from "react";
import "@/app/globals.css"; // Global styles
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
// import Sidebar from "@/app/components/sidebar"; // Uncomment if you want to add Sidebar

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" />
        <title>IM DASHBOARD</title>
      </head>
      <body className="font-roboto">
        <div className="font-sans antialiased relative">
          <div className="flex flex-col">
            <div className="fixed top-0 left-0 z-30">
              <Logo /> {/* Logo will appear above Navbar */}
            </div>
            <div className="">
              <Navbar />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
