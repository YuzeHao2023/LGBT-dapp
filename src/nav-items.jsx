import { HomeIcon, Search, MessageCircle, User, LogIn } from "lucide-react";
import Index from "./pages/Index.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePost from "./pages/CreatePost.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Index",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <LoginPage />,
  },
  {
    title: "Home",
    to: "/home",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <HomePage />,
  },
  {
    title: "Discover",
    to: "/discover",
    icon: <Search className="h-4 w-4" />,
    page: <DiscoverPage />,
  },
  {
    title: "Chat",
    to: "/chat",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <ChatPage />,
  },
  {
    title: "Create",
    to: "/create",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <CreatePost />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
    page: <ProfilePage />,
  },
];
