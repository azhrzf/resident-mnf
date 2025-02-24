import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace(/IDR\s?/g, "Rp")
    .replace(/,/g, "~")
    .replace(/,/g, ".")
    .replace(/~/g, ".");
}

export const getMonthRange = (startDate: string, endDate: string): string[] => {
  const result: string[] = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  currentDate.setDate(1);

  while (currentDate <= finalDate) {
    result.push(currentDate.toISOString().split("T")[0]); 
    currentDate.setMonth(currentDate.getMonth() + 1); 
  }

  return result;
};
