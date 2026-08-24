const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (w) => PERSIAN_DIGITS[+w]);
}

export function formatPersianNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '۰';
  const parts = Number(num).toLocaleString('fa-IR');
  return parts;
}

export function formatPersianCurrency(amount: number): string {
  return `${formatPersianNumber(amount)} تومان`;
}

export function formatPersianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatPersianRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) {
      return 'لحظاتی پیش';
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${toPersianDigits(diffMinutes)} دقیقه پیش`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${toPersianDigits(diffHours)} ساعت پیش`;
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${toPersianDigits(diffDays)} روز پیش`;
    }
    return formatPersianDate(dateString);
  } catch {
    return dateString;
  }
}
