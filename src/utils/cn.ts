import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utility function for conditionally adding Tailwind classes
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
