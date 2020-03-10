export function calculateCost(card) {
  const rate = card <= 10 ? 4 : card <= 100 ? 2 : 1;

  return rate * card * 100;
}
