import type { Icon as IconType, LucideProps } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  Inbox,
  MessageCircle,
  Twitter,
  Github,
  ChevronDown,
  ChevronUp,
  Check,
  Sun,
  Moon,
  Database,
  Cloud,
  HardDrive,
  Server,
  Code,
  Package,
  Layers,
  X,
  Info,
  AlertTriangle,
  AlertCircle,
  Monitor,
  Search,
  ChevronRight,
  ChevronLeft,
  User,
  Copy,
  Plus,
  Edit,
  ExternalLink,
  ChevronsUpDown,
  Square,
  RefreshCw,
  Settings,
  Sidebar,
  Play,
  Network,
  Columns,
  CornerRightUp,
  Table as Tables,
  Sparkles,
} from 'lucide-react';
import { forwardRef } from 'react';

const Logo = ({ className }: LucideProps) => {
  return (
    <svg
      className={cn(
        'h-6 w-6 hover:text-gray-high-contrast transition-colors',
        className
      )}
      width="226"
      height="226"
      viewBox="0 0 226 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 38.92C0 17.4251 17.4251 0 38.92 0H186.816C208.311 0 225.736 17.4251 225.736 38.92V164.705C225.736 186.943 197.595 196.594 183.947 179.037L141.28 124.15V190.708C141.28 210.053 125.597 225.736 106.252 225.736H38.92C17.4251 225.736 0 208.311 0 186.816V38.92ZM38.92 31.136C34.621 31.136 31.136 34.621 31.136 38.92V186.816C31.136 191.115 34.621 194.6 38.92 194.6H107.419C109.569 194.6 110.144 192.857 110.144 190.708V101.454C110.144 79.2162 138.284 69.5649 151.932 87.1218L194.6 142.009V38.92C194.6 34.621 195.007 31.136 190.708 31.136H38.92Z"
        fill="currentColor"
      />
      <path
        d="M186.815 0C208.31 0 225.735 17.4251 225.735 38.92V164.705C225.735 186.943 197.595 196.594 183.947 179.037L141.279 124.15V190.708C141.279 210.053 125.596 225.736 106.251 225.736C108.4 225.736 110.143 223.993 110.143 221.844V101.454C110.143 79.2162 138.283 69.5649 151.932 87.1218L194.599 142.009V7.784C194.599 3.48501 191.114 0 186.815 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export enum IconsList {
  Cross,
  Message,
  GitHub,
  Twitter,
  ChevronDown,
  ChevronUp,
  Check,
  Sun,
  Moon,
  Database,
  Cloud,
  HardDrive,
  Server,
  Code,
  Logo,
  Package,
  Layers,
  Info,
  AlertTriangle,
  AlertCircle,
  Monitor,
  Search,
  ChevronRight,
  ChevronLeft,
  User,
  Copy,
  Plus,
  Edit,
  ExternalLink,
  ChevronsUpDown,
  Square,
  Settings,
  Inbox,
  RefreshCw,
  Sidebar,
  Play,
  Network,
  Columns,
  Views,
  Tables,
  CornerRightUp,
  Sparkles,
}

const icons: Record<keyof typeof IconsList, IconType> = {
  Cross: X,
  Message: MessageCircle,
  GitHub: Github,
  Twitter: Twitter,
  ChevronDown: ChevronDown,
  ChevronUp: ChevronUp,
  Check: Check,
  Sun: Sun,
  Moon: Moon,
  Database: Database,
  Cloud: Cloud,
  HardDrive: HardDrive,
  Server: Server,
  Code: Code,
  Logo: Logo,
  Package: Package,
  Layers: Layers,
  Info: Info,
  AlertTriangle: AlertTriangle,
  AlertCircle: AlertCircle,
  Monitor: Monitor,
  Search: Search,
  ChevronRight: ChevronRight,
  ChevronLeft: ChevronLeft,
  User: User,
  Copy: Copy,
  Plus: Plus,
  Edit: Edit,
  ExternalLink: ExternalLink,
  ChevronsUpDown: ChevronsUpDown,
  Square: Square,
  Settings: Settings,
  Inbox: Inbox,
  RefreshCw: RefreshCw,
  Sidebar: Sidebar,
  Play: Play,
  Network: Network,
  Columns: Columns,
  Tables: Tables,
  Views: Tables,
  CornerRightUp: CornerRightUp,
  Sparkles: Sparkles,
};

export interface IconProps {
  name: keyof typeof icons;
  className?: string;
}

export const Icon = forwardRef(function Icn(
  { name, className }: IconProps,
  ref
) {
  const Component = icons[name];
  // @ts-ignore
  return <Component ref={ref} className={className} />;
});
