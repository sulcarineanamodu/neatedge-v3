// Neatedge 45/25/30 Pricing Calculator
// Implements: COGS = 45% | Overhead = 25% | Profit = 30%
// Source: [C] Neatedge Quoting Calculator.xlsx

export interface CalculatorInputs {
  cleanersRequired: number;
  hoursEstimated: number;
  hourlyRate?: number; // Default: £12.21 (NMW)
  weeksPerYear?: number; // Default: 52
  employerNIRate?: number; // Default: 0.138 (13.8%)
  holidayPayRate?: number; // Default: 0.1207 (12.07%)
  materialCostAnnual?: number;
  travelCostAnnual?: number;
}

export interface CalculatorResult {
  grossWages: number;
  employerNI: number;
  holidayPay: number;
  staffCostAnnual: number;
  otherDirectCosts: number;
  totalCOGS: number;
  minimumPriceAnnual: number;
  monthlyPrice: number;
  weeklyPrice: number;
  effectiveHourlyRate: number;
  profitMarginAtMinimum: number;
  snapshotData: CalculatorInputs;
}

export interface ProfitMarginResult {
  profitLoss: number;
  marginPct: number;
  verdict: string;
}

// Constants
const DEFAULT_HOURLY_RATE = 12.21; // National Minimum Wage
const DEFAULT_WEEKS_PER_YEAR = 52;
const DEFAULT_EMPLOYER_NI_RATE = 0.138; // 13.8%
const DEFAULT_HOLIDAY_PAY_RATE = 0.1207; // 12.07%
const COGS_PERCENTAGE = 0.45; // 45% of price
const PROFIT_TARGET = 0.30; // 30% of price

/**
 * Calculate minimum viable quote using 45/25/30 formula
 * Formula: Minimum Price = COGS ÷ 0.45
 */
export function calculateQuote(inputs: CalculatorInputs): CalculatorResult {
  const hourlyRate = inputs.hourlyRate ?? DEFAULT_HOURLY_RATE;
  const weeksPerYear = inputs.weeksPerYear ?? DEFAULT_WEEKS_PER_YEAR;
  const employerNIRate = inputs.employerNIRate ?? DEFAULT_EMPLOYER_NI_RATE;
  const holidayPayRate = inputs.holidayPayRate ?? DEFAULT_HOLIDAY_PAY_RATE;
  const materialCostAnnual = inputs.materialCostAnnual ?? 0;
  const travelCostAnnual = inputs.travelCostAnnual ?? 0;

  // Staff costs calculation
  const grossWages =
    inputs.cleanersRequired * hourlyRate * inputs.hoursEstimated * weeksPerYear;
  const employerNI = grossWages * employerNIRate;
  const holidayPay = grossWages * holidayPayRate;
  const staffCostAnnual = grossWages + employerNI + holidayPay;

  // Other direct costs
  const otherDirectCosts = materialCostAnnual + travelCostAnnual;

  // COGS & minimum price
  const totalCOGS = staffCostAnnual + otherDirectCosts;
  const minimumPriceAnnual = totalCOGS / COGS_PERCENTAGE; // COGS ÷ 0.45

  // Price breakdowns
  const monthlyPrice = minimumPriceAnnual / 12;
  const weeklyPrice = minimumPriceAnnual / 52;
  const effectiveHourlyRate =
    inputs.cleanersRequired * inputs.hoursEstimated > 0
      ? minimumPriceAnnual / (inputs.cleanersRequired * inputs.hoursEstimated * weeksPerYear)
      : 0;

  return {
    grossWages,
    employerNI,
    holidayPay,
    staffCostAnnual,
    otherDirectCosts,
    totalCOGS,
    minimumPriceAnnual,
    monthlyPrice,
    weeklyPrice,
    effectiveHourlyRate,
    profitMarginAtMinimum: PROFIT_TARGET,
    snapshotData: {
      ...inputs,
      hourlyRate,
      weeksPerYear,
      employerNIRate,
      holidayPayRate,
      materialCostAnnual,
      travelCostAnnual,
    },
  };
}

/**
 * Calculate profit margin at a given price point
 * Returns verdict on viability
 */
export function calculateProfitMargin(
  actualPrice: number,
  totalCOGS: number
): ProfitMarginResult {
  const profitLoss = actualPrice - totalCOGS;
  const marginPct = actualPrice > 0 ? profitLoss / actualPrice : 0;

  let verdict = 'Enter your quote above to see the verdict';
  if (actualPrice > 0) {
    if (marginPct >= PROFIT_TARGET) {
      verdict = '✅ VIABLE — you are priced correctly';
    } else if (marginPct > 0) {
      verdict = '⚠️ LOW MARGIN — below 30% profit target';
    } else {
      verdict = '❌ LOSS-MAKING — below your cost of delivery';
    }
  }

  return { profitLoss, marginPct, verdict };
}

/**
 * Generate a professional quote summary for display
 */
export function generateQuoteSummary(
  calculation: CalculatorResult,
  finalPrice: number
) {
  const profitMargin = calculateProfitMargin(finalPrice, calculation.totalCOGS);

  return {
    minimumViable: calculation.minimumPriceAnnual,
    monthlyAtMinimum: calculation.monthlyPrice,
    finalPrice,
    profitMargin: {
      amount: profitMargin.profitLoss,
      percentage: profitMargin.marginPct,
      verdict: profitMargin.verdict,
    },
    staffCost: calculation.staffCostAnnual,
    otherCosts: calculation.otherDirectCosts,
    totalCOGS: calculation.totalCOGS,
  };
}
