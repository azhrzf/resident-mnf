export interface House {
  id: number;
  house_number: string;
  occupancy_status: "occupied" | "vacant";
  created_at: Date;
  updated_at: Date;
}

export interface Resident {
  id: number;
  full_name: string;
  id_card_photo: string;
  resident_status: "permanent" | "temporary";
  phone_number: string;
  marital_status: "single" | "married";
  created_at: Date;
  updated_at: Date;
}

export interface ResidentWithLatestHouse extends Resident {
  house_residents: (HouseResidentBase & {
    house: House;
  })[];
}

export interface FeeType {
  id: number;
  name: string;
  description: string;
  default_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: number;
  house_resident_id: number;
  fee_type_id: number;
  amount: number;
  payment_date: string;
  payment_period: "monthly" | "yearly";
  payment_status: "paid" | "unpaid";
  created_at: Date;
  updated_at: Date;
}

export interface MultiPayment extends Payment {
  fee_type: FeeType;
  house_resident: HouseResidentInPayment;
}

export interface HouseResidentBase {
  id: number;
  house_id: number;
  resident_id: number;
  date_of_entry: string;
  date_of_exit: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface HouseResidentInHouse extends HouseResidentBase {
  resident: Resident;
  payments: (Payment & FeeType)[];
}

export interface HouseResidentInResident extends HouseResidentBase {
  house: House;
  payments: (Payment & FeeType)[];
}

export interface HouseResidentInPayment extends HouseResidentBase {
  resident: Resident;
  house: House;
}

export interface ExpenseCateogry {
  id: number;
  name: string;
  description: string;
  default_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface Expense {
  id: number;
  expense_category_id: number;
  amount: number;
  expense_date: string;
  expense_period: "monthly" | "irregular";
  description: string;
  created_at: Date;
  updated_at: Date;
  expense_category: ExpenseCateogry;
}

export interface PaymentSummary {
  year: number;
  month?: number;
  total_unpaid: number;
  total_paid: number;
  payments: (Payment & {
    fee_tyoe: FeeType;
  })[];
}

export interface ExpenseSummary {
  year: number;
  month?: number;
  total_expenses: number;
  expenses: (Expense & {
    expense_category: ExpenseCateogry;
  })[];
}

export interface AllSummary {
  year: string;
  month?: string;
  payment_total_unpaid: number;
  payment_total_paid: number;
  expense_total: number;
  payments: MultiPayment[];
  expenses: (Expense & {
    expense_category: ExpenseCateogry;
  })[];
}

export interface AllChartData {
  date: string;
  paymentUnpaid: number;
  paymentPaid: number;
  expense: number;
}