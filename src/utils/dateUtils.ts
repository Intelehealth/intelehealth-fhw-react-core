export interface DateFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
}

export function formatDate(
  date: Date | string | number,
  options: DateFormatOptions | string = {}
): string {
  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    if (typeof options === 'string') {
      // Handle custom format strings
      return formatDateWithString(dateObj, options);
    }

    // Use Intl.DateTimeFormat for locale-aware formatting
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

export function parseDate(dateString: string, format?: string): Date | null {
  try {
    // Try parsing with Date constructor first
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }

    // Try parsing common formats
    const parsed = parseCommonFormats(dateString);
    if (parsed) {
      return parsed;
    }

    // Try parsing with format string if provided
    if (format) {
      return parseDateWithFormat(dateString, format);
    }

    return null;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

export function isValidDate(date: string | number | Date): boolean {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / oneDay);
}

export function getMonthsBetween(date1: Date, date2: Date): number {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isYesterday(date: Date): boolean {
  const yesterday = addDays(new Date(), -1);
  return date.toDateString() === yesterday.toDateString();
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = addDays(new Date(), 1);
  return date.toDateString() === tomorrow.toDateString();
}

export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function startOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : firstDayOfWeek);
  result.setDate(diff);
  return startOfDay(result);
}

export function endOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
  const result = startOfWeek(date, firstDayOfWeek);
  return endOfDay(addDays(result, 6));
}

export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  return startOfDay(result);
}

export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  return endOfDay(result);
}

// Helper functions
function formatDateWithString(date: Date, format: string): string {
  const formatMap: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    M: (date.getMonth() + 1).toString(),
    DD: date.getDate().toString().padStart(2, '0'),
    D: date.getDate().toString(),
    HH: date.getHours().toString().padStart(2, '0'),
    H: date.getHours().toString(),
    mm: date.getMinutes().toString().padStart(2, '0'),
    m: date.getMinutes().toString(),
    ss: date.getSeconds().toString().padStart(2, '0'),
    s: date.getSeconds().toString(),
  };

  let result = format;
  Object.entries(formatMap).forEach(([key, value]) => {
    result = result.replace(new RegExp(key, 'g'), value);
  });

  return result;
}

function parseCommonFormats(dateString: string): Date | null {
  // Common date formats
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
    /^(\d{2})\/(\d{2})\/(\d{4})$/, // MM/DD/YYYY
    /^(\d{2})-(\d{2})-(\d{4})$/, // DD-MM-YYYY
    /^(\d{4})\/(\d{2})\/(\d{2})$/, // YYYY/MM/DD
  ];

  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      const [, ...parts] = match;
      if (format.source.includes('YYYY')) {
        // YYYY-MM-DD or YYYY/MM/DD
        const [year, month, day] = parts;
        return new Date(
          parseInt(year || '0'),
          parseInt(month || '1') - 1,
          parseInt(day || '1')
        );
      } else {
        // MM/DD/YYYY or DD-MM-YYYY
        const [first, second, year] = parts;
        return new Date(
          parseInt(year || '0'),
          parseInt(first || '1') - 1,
          parseInt(second || '1')
        );
      }
    }
  }

  return null;
}

function parseDateWithFormat(dateString: string, _format: string): Date | null {
  // Simple format parsing - this is a basic implementation
  // For production use, consider using libraries like date-fns or moment.js
  try {
    // This is a simplified parser - in real applications you'd want more robust parsing
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}
