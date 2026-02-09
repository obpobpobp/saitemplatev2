/**
 * Date Helper Utilities
 * 
 * Formatting and calculation functions for timeline-based UI components.
 * Used by Sources and Creations panels for grouping and display.
 */

/**
 * Check if a date falls within the current week (Sunday to Saturday)
 * 
 * @param date - Date to check
 * @returns True if date is in current week
 * 
 * @example
 * ```ts
 * isThisWeek(new Date()); // true
 * isThisWeek(new Date('2024-01-01')); // false (if not current week)
 * ```
 */
export function isThisWeek(date: Date): boolean {
  const now = new Date();
  const startOfWeek = new Date(now);
  
  // Set to Sunday 00:00:00 of current week
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  
  return checkDate >= startOfWeek;
}

/**
 * Check if a date falls within the previous week
 * 
 * @param date - Date to check
 * @returns True if date is in previous week
 * 
 * @example
 * ```ts
 * isLastWeek(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)); // true (8 days ago)
 * ```
 */
export function isLastWeek(date: Date): boolean {
  const now = new Date();
  
  // Start of this week
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - now.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);
  
  // Start of last week (7 days before start of this week)
  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  
  const checkDate = new Date(date);
  
  return checkDate >= startOfLastWeek && checkDate < startOfThisWeek;
}

/**
 * Format a date relative to now
 * 
 * @param date - Date to format
 * @returns Formatted string like "Today", "Yesterday", "Nov 24"
 * 
 * @example
 * ```ts
 * formatRelativeDate(new Date()); // "Today"
 * formatRelativeDate(new Date(Date.now() - 86400000)); // "Yesterday"
 * formatRelativeDate(new Date('2024-11-24')); // "Nov 24"
 * ```
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const checkDate = new Date(date);
  
  // Calculate difference in days
  const diffMs = now.getTime() - checkDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  // Today
  if (diffDays === 0 && now.getDate() === checkDate.getDate()) {
    return 'Today';
  }
  
  // Yesterday
  if (diffDays === 1 || (diffDays === 0 && now.getDate() !== checkDate.getDate())) {
    return 'Yesterday';
  }
  
  // Within last week: "3 days ago"
  if (diffDays < 7 && diffDays > 0) {
    return `${diffDays} days ago`;
  }
  
  // Older: "Nov 24" or "Nov 24, 2023" if different year
  const sameYear = now.getFullYear() === checkDate.getFullYear();
  
  return checkDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric',
  });
}

/**
 * Format days until a future date
 * 
 * @param date - Future date
 * @returns Formatted string like "Today", "Tomorrow", "14 days away", "Past"
 * 
 * @example
 * ```ts
 * formatDaysUntil(new Date(Date.now() + 86400000)); // "Tomorrow"
 * formatDaysUntil(new Date(Date.now() + 14 * 86400000)); // "14 days away"
 * ```
 */
export function formatDaysUntil(date: Date): string {
  const now = new Date();
  const futureDate = new Date(date);
  
  // Calculate difference in days
  const diffMs = futureDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  // Past
  if (diffDays < 0) {
    return 'Past';
  }
  
  // Today
  if (diffDays === 0) {
    return 'Today';
  }
  
  // Tomorrow
  if (diffDays === 1) {
    return 'Tomorrow';
  }
  
  // This week: "3 days away"
  if (diffDays < 7) {
    return `${diffDays} days away`;
  }
  
  // Next week: "1 week away"
  if (diffDays < 14) {
    return '1 week away';
  }
  
  // Multiple weeks: "3 weeks away"
  const weeks = Math.floor(diffDays / 7);
  return `${weeks} weeks away`;
}

/**
 * Format file size in bytes to human-readable format
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string like "1.2 MB", "456 KB", "789 B"
 * 
 * @example
 * ```ts
 * formatFileSize(1024); // "1 KB"
 * formatFileSize(1536000); // "1.5 MB"
 * formatFileSize(500); // "500 B"
 * ```
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  
  if (bytes < 1024 * 1024) {
    const kb = Math.round(bytes / 1024);
    return `${kb} KB`;
  }
  
  const mb = (bytes / (1024 * 1024)).toFixed(1);
  return `${mb} MB`;
}

/**
 * Format large numbers with k suffix (1000 → 1k)
 * 
 * @param num - Number to format
 * @returns Formatted string like "1k", "2.3k", "999"
 * 
 * @example
 * ```ts
 * formatNumber(500); // "500"
 * formatNumber(1000); // "1k"
 * formatNumber(2341); // "2.3k"
 * formatNumber(15000); // "15k"
 * ```
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return String(num);
  }
  
  if (num < 10000) {
    // Show one decimal for numbers under 10k
    return `${(num / 1000).toFixed(1)}k`;
  }
  
  // Round for larger numbers
  return `${Math.round(num / 1000)}k`;
}

/**
 * Get start of week (Sunday) for a given date
 * 
 * @param date - Date to get week start for
 * @returns Date object set to Sunday 00:00:00 of that week
 */
export function getStartOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay());
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of week (Saturday) for a given date
 * 
 * @param date - Date to get week end for
 * @returns Date object set to Saturday 23:59:59 of that week
 */
export function getEndOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + (6 - result.getDay()));
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if two dates are the same day
 * 
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if both dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
