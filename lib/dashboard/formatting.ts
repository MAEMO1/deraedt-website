/**
 * Centralized formatting utilities for dashboard components
 * DRY: Used across tenders, compliance, facility, and other clients
 */

/**
 * Format deadline with days until and color coding
 */
export function formatDeadline(deadline: string): { text: string; color: string } {
  const date = new Date(deadline);
  const now = new Date();
  const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { text: 'Verlopen', color: 'text-red-600' };
  if (daysUntil <= 7) return { text: `${daysUntil}d`, color: 'text-red-600' };
  if (daysUntil <= 14) return { text: `${daysUntil}d`, color: 'text-amber-600' };
  return { text: `${daysUntil}d`, color: 'text-green-600' };
}

/**
 * Format currency value with K/M suffixes
 */
export function formatValue(value?: number | null): string {
  if (!value) return '-';
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
  return `€${value}`;
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('nl-BE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date only for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date short (day + month only)
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Get SLA status info for facility tickets
 */
export function getSLAStatus(slaDueAt: string): { text: string; color: string; urgent: boolean } {
  const dueDate = new Date(slaDueAt);
  const now = new Date();
  const hoursUntil = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntil < 0) {
    return { text: 'SLA overschreden', color: 'text-red-600', urgent: true };
  }
  if (hoursUntil <= 4) {
    return { text: `${Math.ceil(hoursUntil)}u resterend`, color: 'text-red-600', urgent: true };
  }
  if (hoursUntil <= 24) {
    return { text: `${Math.ceil(hoursUntil)}u resterend`, color: 'text-amber-600', urgent: false };
  }
  const daysUntil = Math.ceil(hoursUntil / 24);
  return { text: `${daysUntil}d resterend`, color: 'text-green-600', urgent: false };
}

/**
 * Calculate days until a date
 */
export function daysUntil(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Format relative time (e.g., "2 dagen geleden", "over 3 uur")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffDays === 0) {
    if (diffHours === 0) return 'nu';
    if (diffHours > 0) return `over ${diffHours} uur`;
    return `${Math.abs(diffHours)} uur geleden`;
  }
  if (diffDays > 0) return `over ${diffDays} dagen`;
  return `${Math.abs(diffDays)} dagen geleden`;
}
