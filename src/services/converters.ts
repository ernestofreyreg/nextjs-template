export const toFloat = (number: number, precision: number = 2) =>
  parseFloat(number.toFixed(precision));

export const toDollars = (centsAmount: number) => toFloat(centsAmount / 100);
export const toCents = (dollarAmount: number) => toFloat(dollarAmount * 100);

export const toRate = (percentValue: number) => toFloat(percentValue / 100, 4);
export const toPercent = (rateValue: number) => toFloat(rateValue * 100);

export const toAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

export const formatDollar = (
  dollars?: number,
  decimalPlaces: number = 2,
): string =>
  dollars?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimalPlaces,
  }) ?? "—";
export const convertCentsToDollar = (
  cents: number,
  decimalPlaces: number = 2,
): string => {
  const dollars = cents / 100;
  return formatDollar(dollars, decimalPlaces);
};
