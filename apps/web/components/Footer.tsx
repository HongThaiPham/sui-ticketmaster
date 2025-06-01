import { TicketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black/40 border-t border-gray-800 dark:border-white/10 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center dark:orange-glow">
                <TicketIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-500 dark:text-gradient">
                Sui Ticketmaster
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              The future of event ticketing on Sui blockchain.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">𝕏</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">DC</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">TG</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/events"
                  className="hover:text-orange-400 transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="hover:text-orange-400 transition-colors"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-orange-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="hover:text-orange-400 transition-colors"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/docs"
                  className="hover:text-orange-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="hover:text-orange-400 transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-orange-400 transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-orange-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-orange-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-orange-400 transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Sui Ticketmaster. All rights reserved. Built on Sui
            Network.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
