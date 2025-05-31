import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Gradient } from "@repo/ui/gradient";
import { Button } from "@repo/ui/components/button";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import Link from "next/link";
import {
  CalendarIcon,
  GlobeIcon,
  LockIcon,
  MapPinIcon,
  ShieldIcon,
  SparklesIcon,
  TicketIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

const featuredEvents = [
  {
    id: 1,
    title: "Sui Blockchain Summit 2024",
    date: "March 15, 2024",
    location: "San Francisco, CA",
    price: "2.5 SUI",
    image: "/placeholder.svg?height=300&width=400",
    attendees: 1250,
    category: "Technology",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "Digital Art Revolution",
    date: "March 20, 2024",
    location: "New York, NY",
    price: "1.8 SUI",
    image: "/placeholder.svg?height=300&width=400",
    attendees: 800,
    category: "Art",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    title: "DeFi Innovation Conference",
    date: "March 25, 2024",
    location: "London, UK",
    price: "3.2 SUI",
    image: "/placeholder.svg?height=300&width=400",
    attendees: 2000,
    category: "Finance",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center orange-glow">
                <TicketIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">
                Sui Ticketmaster
              </span>
              <div className="text-xs text-orange-400 font-medium">
                Powered by Sui Blockchain
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className="text-gray-300 hover:text-orange-400 transition-colors"
            >
              Explore Events
            </Link>
            <Link
              href="/create"
              className="text-gray-300 hover:text-orange-400 transition-colors"
            >
              Create Event
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-orange-400 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Connect Wallet
            </Button>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Launch App
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <SparklesIcon className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">
              Next-Gen Event Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">The Future of</span>
            <br />
            <span className="text-gradient">Event Ticketing</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience seamless event management with blockchain-verified
            tickets, instant transfers, and fraud-proof verification on the Sui
            network.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-lg px-8 py-4 h-auto orange-glow"
            >
              <Link href="/events" className="flex items-center space-x-2">
                <GlobeIcon className="w-5 h-5" />
                <span>Explore Events</span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-lg px-8 py-4 h-auto"
            >
              <Link href="/create" className="flex items-center space-x-2">
                <ZapIcon className="w-5 h-5" />
                <span>Create Event</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Sui Ticketmaster?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology for unparalleled
              security and user experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform orange-glow">
                  <ShieldIcon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">
                  Blockchain Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  Every ticket is an NFT secured on Sui blockchain, making
                  counterfeiting impossible and ownership transparent.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform orange-glow">
                  <ZapIcon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">
                  Instant Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  Lightning-fast QR code scanning with real-time blockchain
                  verification for seamless event entry.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform orange-glow">
                  <LockIcon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">
                  True Ownership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  Own your tickets as digital assets. Transfer, resell, or
                  collect them with full ownership rights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Trending Events
              </h2>
              <p className="text-gray-400">
                Discover the hottest events in the Web3 space
              </p>
            </div>
            <Button
              variant="outline"
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
              asChild
            >
              <Link href="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge
                    className={`absolute top-4 left-4 bg-gradient-to-r ${event.gradient} border-0 text-white`}
                  >
                    {event.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-orange-400 font-bold">
                      {event.price}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white text-lg line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">
                        {event.attendees.toLocaleString()} attending
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    asChild
                  >
                    <Link href={`/events/${event.id}`}>Get Tickets</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
              <div className="text-gray-400">Events Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">2M+</div>
              <div className="text-gray-400">Tickets Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">500K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center orange-glow">
                  <TicketIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">
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

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Sui Ticketmaster. All rights reserved. Built on Sui
              Network.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
