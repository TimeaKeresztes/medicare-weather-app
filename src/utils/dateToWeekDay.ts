export function dateStringToWeekDay(date: string, format: 'short' | 'long') {
  try {
    return new Date(date).toLocaleDateString('en-US', { weekday: format });
  } catch (e) {
    console.error(e);
    return 'Unknown';
  }
}
