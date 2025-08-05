//layout.tsx global layout for the application
import { ReactNode } from "react";
import "@/app/globals.css"; // Global styles
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import ReportIssueCard from "./components/ReportIssueCard";

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
              {/* Floating Report Issue Card */}
              <div className="fixed w-screen flex justify-center items-center z-50">
                <ReportIssueCard />
              </div>
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
