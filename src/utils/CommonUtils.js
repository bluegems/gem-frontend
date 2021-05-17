function monthIndexToString(monthIndex) {
  const indexToMonth = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  return indexToMonth[monthIndex];
}

export function dateToString(date) {
  return `${date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  })} ${date.getDate()} ${monthIndexToString(date.getMonth())} ${date.getFullYear()}`;
}
