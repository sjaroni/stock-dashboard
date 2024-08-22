export function normalizeQuarterFormat(value) {
  const regex = /Q(\d)\s*(\d{4})|(\d{4})|(\d{1,2})\s*(\d{4})|Q(\d{1,2})/i;
  const match = value.match(regex);
  
  if (match) {
    let quarter, year;

    if (match[1]) {
      quarter = `Q${match[1]}`;
      year = match[2] || new Date().getFullYear();
    } else if (match[3]) {
      year = match[3];
      quarter = 'Q1';
    } else if (match[4] && match[5]) {
      quarter = `Q${match[4]}`;
      year = match[5];
    } else if (match[6]) {
      quarter = `Q${match[6]}`;
      year = new Date().getFullYear();
    }
    
    return `${quarter} ${year}`;
  }

  return value;
}
