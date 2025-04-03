import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string(),
  nom: z.string(),
  prenom: z.string(),
  salaireBrut: z.number(),
  dateEmbauche: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;

// Barème IPR 2024 RDC
const IPR_BRACKETS = [
  { min: 0, max: 168000, rate: 0 },
  { min: 168000, max: 1800000, rate: 0.15 },
  { min: 1800000, max: 3600000, rate: 0.30 },
  { min: 3600000, max: Infinity, rate: 0.40 }
];

export const calculateIPR = (salaireBrut: number): number => {
  let ipr = 0;
  let remainingSalary = salaireBrut;

  for (const bracket of IPR_BRACKETS) {
    if (remainingSalary <= 0) break;

    const taxableAmount = Math.min(
      remainingSalary,
      bracket.max - bracket.min
    );

    ipr += taxableAmount * bracket.rate;
    remainingSalary -= taxableAmount;
  }

  return Math.round(ipr);
};

export const calculateNetSalary = (salaireBrut: number): number => {
  const ipr = calculateIPR(salaireBrut);
  const cnss = salaireBrut * 0.05; // 5% pour la CNSS
  const inpp = salaireBrut * 0.02; // 2% pour l'INPP
  return salaireBrut - ipr - cnss - inpp;
};

export const generatePayslip = (employee: Employee) => {
  const salaireBrut = employee.salaireBrut;
  const ipr = calculateIPR(salaireBrut);
  const cnss = salaireBrut * 0.05;
  const inpp = salaireBrut * 0.02;
  const salaireNet = calculateNetSalary(salaireBrut);

  return {
    employee,
    salaireBrut,
    deductions: {
      ipr,
      cnss,
      inpp,
    },
    salaireNet,
  };
};