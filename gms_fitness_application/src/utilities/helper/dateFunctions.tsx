import dates from '../constants/dates';

type TimestampLike = {
  toDate?: () => Date;
  seconds?: number;
} | Date | string | null | undefined;

export const convertTimestamp = (timestamp: TimestampLike): string | null => {
  if (typeof timestamp === 'string') {
    return timestamp;
  }

  if (timestamp && typeof (timestamp as any).toDate === 'function') {
    return (timestamp as any).toDate().toISOString();
  }

  if (timestamp && typeof (timestamp as any).seconds === 'number') {
    return new Date((timestamp as any).seconds * 1000).toISOString();
  }

  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }

  return null;
};

export const convertToDate = (date: string | number | Date): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export function convertToDateOnly(date: string | number | Date): string {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
}

export const formatDateString = (date: string | number | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getDatesForWeek = (startDate: Date = new Date()): Date[] => {
  const dates: Date[] = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const formatDate = (date: Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: format.includes(dates.DAY_NAME) ? 'short' : undefined,
    day: format.includes(dates.DAY) ? 'numeric' : undefined,
    month: format.includes(dates.MMM) ? 'short' : undefined,
    year: format.includes(dates.yyyy) ? 'numeric' : undefined,
  };
  return date.toLocaleDateString(undefined, options);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
