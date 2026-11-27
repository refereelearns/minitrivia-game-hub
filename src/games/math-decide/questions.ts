// Each row is one round, from warm-up to finale. Add alternatives to a row
// using q(prompt, first label, first value, second label, second value, solution).
// The larger numeric value wins. Never enter a separate answer key.
export function q(prompt: string, a: string, x: number, b: string, y: number, solution: string) {
  if (!Number.isFinite(x) || !Number.isFinite(y) || x === y)
    throw new Error("Invalid comparison: " + prompt);
  return { prompt, labels: [a, b] as const, values: [x, y] as const, solution };
}
export type Question = ReturnType<typeof q>;
const larger = "Which number is larger?";
const fraction = "Which fraction is larger?";
const power = "Which power is larger?";
const discount = "Which discount saves more on the same jacket?";
const dice = "Roll two independent fair dice. Which total is more likely?";
const clock = "At which time is the smaller angle between the clock hands larger?";
const speed =
  "Which trip has the higher average speed? The two-speed trip has equal-distance legs.";
const area = "Which shape has the larger area?";

export const bank = [
  [
    q(
      fraction,
      "7/8",
      7 / 8,
      "8/9",
      8 / 9,
      "A ninth is smaller than an eighth, so 8/9 is closer to one.",
    ),
    q(fraction, "5/6", 5 / 6, "6/7", 6 / 7, "Compare the missing pieces: 1/7 is smaller than 1/6."),
    q(
      fraction,
      "9/11",
      9 / 11,
      "8/10",
      8 / 10,
      "Both lack two pieces. Two elevenths is less than two tenths.",
    ),
  ],
  [
    q(
      discount,
      "20% then 20%",
      1 - 0.8 ** 2,
      "37%",
      0.37,
      "On $100 the two discounts save $20 + $16 = $36. The single discount saves $37.",
    ),
    q(
      discount,
      "30% then 10%",
      1 - 0.7 * 0.9,
      "36%",
      0.36,
      "$100 falls to $70 and then $63: a 37% saving.",
    ),
    q(
      discount,
      "25% then 20%",
      1 - 0.75 * 0.8,
      "41%",
      0.41,
      "You pay 80% of 75%, or 60%. That is a 40% discount.",
    ),
  ],
  [
    q(
      area,
      "4 × 7 rectangle",
      28,
      "circle, r = 3",
      9 * Math.PI,
      "The rectangle covers 28 square units; the circle covers 9π ≈ 28.27.",
    ),
    q(area, "5 × 10 rectangle", 50, "circle, r = 4", 16 * Math.PI, "16π ≈ 50.27, just above 50."),
    q(area, "8 × 10 rectangle", 80, "circle, r = 5", 25 * Math.PI, "25π ≈ 78.54, just below 80."),
  ],
  [
    q(
      dice,
      "5",
      4 / 36,
      "10",
      3 / 36,
      "5: (1,4), (2,3), (3,2), (4,1). 10: (4,6), (5,5), (6,4). Four ways beat three.",
    ),
    q(
      dice,
      "8",
      5 / 36,
      "4",
      3 / 36,
      "For 8 the first die may be 2 through 6. For 4 it may be 1 through 3. The second die is fixed in each case.",
    ),
    q(
      dice,
      "6",
      5 / 36,
      "9",
      4 / 36,
      "For 6 the first die may be 1 through 5. For 9 it may be 3 through 6: five ways versus four.",
    ),
  ],
  [
    q(power, "2⁵⁰", 2 ** 50, "3³⁰", 3 ** 30, "Take tenth roots: 32 beats 27."),
    q(power, "5¹²", 5 ** 12, "7⁹", 7 ** 9, "Take cube roots: 625 beats 343."),
    q(power, "3²⁴", 3 ** 24, "4¹⁸", 4 ** 18, "Take sixth roots: 81 beats 64."),
  ],
  [
    q(
      clock,
      "3:15",
      7.5,
      "6:30",
      15,
      "At 3:15 the hour hand is 7.5° past the 3. At 6:30 it is 15° past the 6.",
    ),
    q(
      clock,
      "9:45",
      22.5,
      "6:30",
      15,
      "The minute hand points to the original hour mark. The hour hand has moved 22.5° or 15° beyond it.",
    ),
    q(
      clock,
      "2:10",
      5,
      "8:40",
      20,
      "The hour hand travels half a degree per minute: 5° versus 20° beyond the minute hand.",
    ),
  ],
  [
    q(larger, "49 × 51", 49 * 51, "50²", 50 ** 2, "(50 − 1)(50 + 1) = 50² − 1."),
    q(larger, "39 × 43", 39 * 43, "41²", 41 ** 2, "(41 − 2)(41 + 2) = 41² − 4."),
    q(larger, "97 × 103", 97 * 103, "100²", 100 ** 2, "(100 − 3)(100 + 3) = 100² − 9."),
  ],
  [
    q(
      larger,
      "log₃ 26",
      Math.log(26) / Math.log(3),
      "log₂ 9",
      Math.log2(9),
      "26 < 3³, but 9 > 2³. The logarithms lie on opposite sides of 3.",
    ),
    q(
      larger,
      "log₂ 17",
      Math.log2(17),
      "log₃ 80",
      Math.log(80) / Math.log(3),
      "17 > 2⁴, but 80 < 3⁴. Compare each logarithm with 4.",
    ),
    q(
      larger,
      "log₅ 24",
      Math.log(24) / Math.log(5),
      "log₇ 50",
      Math.log(50) / Math.log(7),
      "24 < 5² and 50 > 7². Compare each logarithm with 2.",
    ),
  ],
  [
    q(
      speed,
      "40 & 60 km/h",
      2 / (1 / 40 + 1 / 60),
      "49 km/h",
      49,
      "Two 120 km legs take five hours altogether: 240/5 = 48 km/h.",
    ),
    q(
      speed,
      "30 & 60 km/h",
      2 / (1 / 30 + 1 / 60),
      "39 km/h",
      39,
      "Two 60 km legs take three hours altogether: 120/3 = 40 km/h.",
    ),
    q(
      speed,
      "60 & 90 km/h",
      2 / (1 / 60 + 1 / 90),
      "73 km/h",
      73,
      "Two 180 km legs take five hours altogether: 360/5 = 72 km/h.",
    ),
  ],
  [
    q(
      "Which count is larger?",
      "8 people's handshakes",
      (8 * 7) / 2,
      "5 coin toss sequences",
      2 ** 5,
      "Each pair shakes hands once: 8 × 7 / 2 = 28. Five tosses give 32 heads/tails sequences.",
    ),
    q(
      "Which count is larger?",
      "9 people's handshakes",
      (9 * 8) / 2,
      "5 coin toss sequences",
      2 ** 5,
      "Each pair shakes hands once: 9 × 8 / 2 = 36, versus 32 sequences.",
    ),
    q(
      "Which count is larger?",
      "11 people's handshakes",
      (11 * 10) / 2,
      "6 coin toss sequences",
      2 ** 6,
      "Each pair shakes hands once: 11 × 10 / 2 = 55, versus 64 sequences.",
    ),
  ],
  [
    q(larger, "7/10", 0.7, "sin 45°", Math.SQRT1_2, "Square both: 49/100 is below 1/2."),
    q(
      larger,
      "cos 30°",
      Math.sqrt(3) / 2,
      "13/15",
      13 / 15,
      "Their squares are 3/4 and 169/225. Over 900 those are 675 and 676.",
    ),
    q(
      larger,
      "tan 30°",
      1 / Math.sqrt(3),
      "4/7",
      4 / 7,
      "Compare the squares: 1/3 = 49/147, while 16/49 = 48/147.",
    ),
  ],
  [
    q(
      fraction,
      "34/55",
      34 / 55,
      "21/34",
      21 / 34,
      "Over 1,870 their numerators are 1,156 and 1,155. So 34/55 wins.",
    ),
    q(
      fraction,
      "13/21",
      13 / 21,
      "21/34",
      21 / 34,
      "Cross-multiply: 13 × 34 = 442 beats 21² = 441.",
    ),
    q(
      fraction,
      "55/89",
      55 / 89,
      "34/55",
      34 / 55,
      "55² = 3,025 and 34 × 89 = 3,026. The second fraction wins.",
    ),
  ],
  [
    q(
      "Which event is more likely with fair, independent rolls and tosses?",
      "Exactly 1 six in 3 rolls",
      75 / 216,
      "Exactly 2 heads in 3 tosses",
      3 / 8,
      "One six: 3 × 5² / 6³ = 75/216. Two heads: 3/8 = 81/216.",
    ),
    q(
      "Which event is more likely with fair, independent rolls and tosses?",
      "Any six in 4 rolls",
      1 - (5 / 6) ** 4,
      "Heads on 1 toss",
      0.5,
      "No six has probability 625/1296, below half. At least one six is therefore more likely than heads.",
    ),
    q(
      "Which event is more likely with fair, independent rolls and tosses?",
      "Any six in 2 rolls",
      1 - (5 / 6) ** 2,
      "Exactly 1 head in 3 tosses",
      3 / 8,
      "At least one six has probability 11/36 = 22/72. Exactly one head has probability 3/8 = 27/72.",
    ),
  ],
  [
    q(
      power,
      "πᵉ",
      Math.PI ** Math.E,
      "e^π",
      Math.E ** Math.PI,
      "π raised to e is about 22.46. e raised to π is about 23.14.",
    ),
    q(
      power,
      "e³",
      Math.E ** 3,
      "3ᵉ",
      3 ** Math.E,
      "e³ ≈ 20.09, while 3 raised to e is about 19.81.",
    ),
    q(
      power,
      "3^π",
      3 ** Math.PI,
      "π³",
      Math.PI ** 3,
      "ln(x)/x decreases for x > e. Since 3 < π, multiplying the resulting inequality by 3π gives π ln(3) > 3 ln(π).",
    ),
  ],
  [
    q(
      larger,
      "π",
      Math.PI,
      "355/113",
      355 / 113,
      "355/113 ≈ 3.141592920, just above π ≈ 3.141592654.",
    ),
    q(
      larger,
      "√2",
      Math.SQRT2,
      "99/70",
      99 / 70,
      "Square both: 99² = 9,801, exactly one above 2 × 70².",
    ),
    q(
      larger,
      "√3",
      Math.sqrt(3),
      "97/56",
      97 / 56,
      "Square both: 97² = 9,409, exactly one above 3 × 56².",
    ),
  ],
];

// To curate a specific date, copy 15 q(...) entries here under "YYYY-MM-DD".
export const editions: Record<string, Question[]> = {};
