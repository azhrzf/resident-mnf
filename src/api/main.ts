import axios from "axios";
import {
  House,
  ResidentWithLatestHouse,
  MultiPayment,
  Expense,
  PaymentSummary,
  ExpenseSummary,
  AllSummary,
} from "./types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getHouses = async (): Promise<House[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/houses`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getResidents = async (): Promise<ResidentWithLatestHouse[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/residents`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getPayments = async (): Promise<MultiPayment[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/payments`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/expenses`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getExpenseSummary = async (
  dates: string[],
  type: string
): Promise<ExpenseSummary[]> => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/financial-reports/expenses`,
      {
        params: {
          dates,
          type,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getPaymentSummary = async (
  dates: string[],
  type: string
): Promise<PaymentSummary[]> => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/financial-reports/payments`,
      {
        params: {
          dates,
          type,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getAllSummary = async (
  dates: string[],
  type: string
): Promise<AllSummary[]> => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/financial-reports/summary`,
      {
        params: {
          dates,
          type,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};
