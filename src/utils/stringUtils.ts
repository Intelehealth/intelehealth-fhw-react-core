export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(
  str: string,
  length: number,
  suffix: string = '...'
): string {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + suffix;
}

export function slugify(str: string, separator: string = '-'): string {
  if (!str) return str;

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, separator) // Replace spaces and underscores with separator
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing separators
}

export function camelCase(str: string): string {
  if (!str) return str;

  return str
    .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^(.)/, chr => chr.toLowerCase());
}

export function kebabCase(str: string): string {
  if (!str) return str;

  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

export function snakeCase(str: string): string {
  if (!str) return str;

  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
}

export function pascalCase(str: string): string {
  if (!str) return str;

  return str
    .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^(.)/, chr => chr.toUpperCase());
}

export function titleCase(str: string): string {
  if (!str) return str;

  return str
    .toLowerCase()
    .split(/\s+/)
    .map(word => capitalize(word))
    .join(' ');
}

export function reverse(str: string): string {
  if (!str) return str;
  return str.split('').reverse().join('');
}

export function countWords(str: string): number {
  if (!str) return 0;

  return str
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}

export function countCharacters(
  str: string,
  includeSpaces: boolean = true
): number {
  if (!str) return 0;

  if (includeSpaces) {
    return str.length;
  }

  return str.replace(/\s/g, '').length;
}

export function isPalindrome(str: string): boolean {
  if (!str) return true;

  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === reverse(cleanStr);
}

export function generateRandomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export function maskString(
  str: string,
  maskChar: string = '*',
  start: number = 0,
  end?: number
): string {
  if (!str) return str;

  const strLength = str.length;
  const maskStart = Math.max(0, start);
  const maskEnd = end !== undefined ? Math.min(strLength, end) : strLength;

  if (maskStart >= maskEnd) return str;

  const before = str.substring(0, maskStart);
  const masked = maskChar.repeat(maskEnd - maskStart);
  const after = str.substring(maskEnd);

  return before + masked + after;
}

export function escapeHtml(str: string): string {
  if (!str) return str;

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, match => htmlEscapes[match] || match);
}

export function unescapeHtml(str: string): string {
  if (!str) return str;

  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  return str.replace(
    /&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/g,
    match => htmlUnescapes[match] || match
  );
}

export function formatNumber(
  num: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function extractNumbers(str: string): number[] {
  if (!str) return [];

  const matches = str.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

export function extractEmails(str: string): string[] {
  if (!str) return [];

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const matches = str.match(emailRegex);
  return matches || [];
}

export function extractUrls(str: string): string[] {
  if (!str) return [];

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = str.match(urlRegex);
  return matches || [];
}

export function removeAccents(str: string): string {
  if (!str) return str;

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function normalizeWhitespace(str: string): string {
  if (!str) return str;

  return str.replace(/\s+/g, ' ').trim();
}
