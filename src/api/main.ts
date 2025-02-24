import axios from "axios";
import {
  House,
  HouseExtendsHouseResident,
  ResidentExtendsHouseResident,
  ResidentWithLatestHouse,
  PaymentSummary,
  ExpenseSummary,
  AllSummary,
  PostHouseResponse,
  PostResident,
  PostResidentResponse,
  ExpenseCateogry,
  PostExpenseResponse,
  PostExpense,
  PostPaymentResponse,
  HouseResidentInPayment,
} from "./types";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getHouses = async (): Promise<House[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/houses`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getHouseDetail = async (
  id: string
): Promise<HouseExtendsHouseResident> => {
  try {
    const response = await axios.get(`${backendUrl}/api/houses/${id}`);
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

export const getResidentDetail = async (
  id: string
): Promise<ResidentExtendsHouseResident> => {
  try {
    const response = await axios.get(`${backendUrl}/api/residents/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getExpenses = async (
  dates?: string[],
  type?: string
): Promise<ExpenseSummary[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/expenses`, {
      params: {
        dates,
        type,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getPayments = async (
  dates?: string[],
  type?: string
): Promise<PaymentSummary[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/payments`, {
      params: {
        dates,
        type,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getAllSummary = async (
  dates?: string[],
  type?: string
): Promise<AllSummary[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/financial-summary`, {
      params: {
        dates,
        type,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};

export const postHouse = async (
  houseNumber: string,
  occupancyStatus: "occupied" | "vacant"
): Promise<PostHouseResponse> => {
  try {
    const response = await axios.post(`${backendUrl}/api/houses`, {
      house_number: houseNumber,
      occupancy_status: occupancyStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const putHouse = async (
  id: string,
  houseNumber: string,
  occupancyStatus: string
): Promise<PostHouseResponse> => {
  try {
    const response = await axios.post(`${backendUrl}/api/houses/${id}`, {
      house_number: houseNumber,
      occupancy_status: occupancyStatus,
      _method: "PUT",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

const mapResidentData = (data: PostResident) => {
  return {
    full_name: data.fullName,
    resident_status: data.residentStatus,
    phone_number: data.phoneNumber,
    marital_status: data.maritalStatus,
    house_id: data.houseId,
    date_of_entry: data.dateOfEntry,
    date_of_exit: data.dateOfExit,
    id_card_photo: data.imageFile,
  };
};

export async function postResident(
  data: PostResident
): Promise<PostResidentResponse> {
  if (!data.imageFile) {
    throw new Error("Gambar tidak boleh kosong.");
  }

  const mappedData = mapResidentData(data);

  try {
    const response = await axios.post(
      `${backendUrl}/api/residents`,
      mappedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting resident:", error);
    throw error;
  }
}

export const putResident = async (
  data: PostResident,
  id: string
): Promise<PostResidentResponse> => {
  const mappedData = mapResidentData(data);

  try {
    const response = await axios.post(
      `${backendUrl}/api/residents/${id}`,
      { ...mappedData, _method: "PUT" },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting resident:", error);
    throw error;
  }
};

export const getExpenseCategories = async (): Promise<ExpenseCateogry[]> => {
  try {
    const response = await axios.get(`${backendUrl}/api/expense-categories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching expense categories:", error);
    throw error;
  }
};

export const postExpense = async (
  data: PostExpense
): Promise<PostExpenseResponse> => {
  const mappedData = {
    expense_category_id: data.expenseCategoryId,
    amount: data.amount,
    expense_date: data.expenseDate,
    expense_period: data.expensePeriod,
  };

  try {
    const response = await axios.post(`${backendUrl}/api/expenses`, mappedData);
    return response.data;
  } catch (error) {
    console.error("Error posting resident:", error);
    throw error;
  }
};

export const patchPaymentPaid = async (
  id: string
): Promise<PostPaymentResponse> => {
  try {
    const response = await axios.post(`${backendUrl}/api/payments/${id}/paid`, {
      _method: "PATCH",
    });
    return response.data;
  } catch (error) {
    console.error("Error posting resident:", error);
    throw error;
  }
};

export const getHouseResidents = async (): Promise<
  HouseResidentInPayment[]
> => {
  try {
    const response = await axios.get(`${backendUrl}/api/house-residents`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching house residents:", error);
    throw error;
  }
};
