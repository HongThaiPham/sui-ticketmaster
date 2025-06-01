import { TicketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeToogle from "./ThemeToogle";
import SuiConnectButton from "./SuiConnectButton";

const Header = () => {
  return (
    <header className="bg-white border-gray-200 border-b dark:border-white/10 dark:bg-black/20 dark:backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center dark:orange-glow">
              <TicketIcon className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-2xl font-bold text-orange-600 dark:bg-linear-135 dark:from-[#f97316] dark:via-[#ea580c] dark:to-[#fb923c] bg-clip-text dark:text-transparent">
              Sui Ticketmaster
            </span>
            <div className="text-xs text-orange-500 font-medium">
              Powered by Sui Blockchain
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/events"
            className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
          >
            Explore Events
          </Link>
          <Link
            href="/new-event"
            className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
          >
            Create Event
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <ThemeToogle />
          <SuiConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
