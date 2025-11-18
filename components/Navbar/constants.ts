// components/navbar/constants.ts
import { Settings, Globe, Search, Moon, Sun } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavAction {
  label: string;
  icon: any; // Lucide icon type
  action?: () => void;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Recitation", href: "/recitation" },
  { label: "About", href: "/about" },
];

export const NAV_ACTIONS = [
  { label: "Search", icon: Search },
  { label: "Language", icon: Globe },
  { label: "Settings", icon: Settings },
  { label: "Theme", icon: Moon }, // You can toggle this icon based on theme state
];
