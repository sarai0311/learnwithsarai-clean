import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserTimezone(): string {
  try {
    // Get the user's timezone using Intl API
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    // Fallback to UTC if detection fails
    console.error('Failed to detect timezone:', error);
    return 'UTC';
  }
}
