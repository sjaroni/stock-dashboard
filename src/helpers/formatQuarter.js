export function normalizeQuarterFormat(value) {
  const regex = /Q(\d)\s*(\d{4})|(\d{4})|(\d{1,2})\s*(\d{4})|Q(\d{1,2})-(\d{2})|(\d{2})Q(\d{1,2})|Q(\d{1,2})/i;
  const match = value.match(regex);

  if (match) {
    let quarter, year;

    if (match[1]) {
      // Format: Q1 2023
      quarter = `Q${match[1]}`;
      year = match[2] || new Date().getFullYear();
    } else if (match[3]) {
      // Format: 2023
      year = match[3];
      quarter = 'Q1';
    } else if (match[4] && match[5]) {
      // Format: 1 2023 (e.g., 1 for Q1)
      quarter = `Q${match[4]}`;
      year = match[5];
    } else if (match[6] && match[7]) {
      // Format: Q1-25 (two-digit year)
      quarter = `Q${match[6]}`;
      const twoDigitYear = parseInt(match[7], 10);
      year = twoDigitYear < 50 ? 2000 + twoDigitYear : 1900 + twoDigitYear;
    } else if (match[8] && match[9]) {
      // Format: 25Q2 (two-digit year followed by quarter)
      quarter = `Q${match[9]}`;
      const twoDigitYear = parseInt(match[8], 10);
      year = twoDigitYear < 50 ? 2000 + twoDigitYear : 1900 + twoDigitYear;
    } else if (match[10]) {
      // Format: Q1
      quarter = `Q${match[10]}`;
      year = new Date().getFullYear();
    }

    return `${quarter} ${year}`;
  }

  return value;
}
