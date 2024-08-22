export function generateLastThreeYearsQuarters() {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  let currentQuarter = Math.ceil(currentMonth / 3);

  const result = [];

  for (let year = currentYear; year >= currentYear - 3; year--) {
    for (let q = currentQuarter; q > 0; q--) {
      result.unshift(`${quarters[q - 1]} ${year}`);
    }
    currentQuarter = 4;
  }

  return result;
}

export const lastThreeYearsQuarters = generateLastThreeYearsQuarters();
