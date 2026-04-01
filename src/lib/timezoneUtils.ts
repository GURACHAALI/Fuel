export const formatDateWithTimezone = (date: Date, timezone: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formatter.format(date);
};

export const getTimezones = (): string[] => {
  return [
    'Africa/Nairobi',
    'Africa/Johannesburg',
    'Africa/Cairo',
    'Africa/Lagos',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Asia/Dubai',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Australia/Sydney',
    'UTC',
  ];
};

export const getTimezoneOffset = (timezone: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const parts = formatter.formatToParts(new Date());
  const tzName = parts.find(p => p.type === 'timeZoneName');
  return tzName ? tzName.value : timezone;
};
