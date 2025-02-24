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
  fee_type: FeeType;
}

export interface MultiPayment extends Payment {
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
  payments: Payment[];
}

export interface HouseExtendsHouseResident extends House {
  house_residents: HouseResidentInHouse[];
}

export interface HouseResidentInResident extends HouseResidentBase {
  house: House;
  payments: Payment[];
}

export interface ResidentExtendsHouseResident extends Resident {
  house_residents: HouseResidentInResident[];
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
  date: string;
  year: number;
  month?: number;
  payment_total_unpaid: number;
  payment_total_paid: number;
  payments: MultiPayment[];
}

export interface ExpenseSummary {
  date: string;
  year: number;
  month?: number;
  expense_total: number;
  expenses: (Expense & {
    expense_category: ExpenseCateogry;
  })[];
}

export interface AllSummary {
  date: string;
  year: number;
  month?: number;
  payment_total_unpaid: number;
  payment_total_paid: number;
  expense_total: number;
  payments: MultiPayment[];
  expenses: (Expense & {
    expense_category: ExpenseCateogry;
  })[];
}

export interface PostResponse {
  status: string;
  message: string;
}

export interface PostHouse {
  houseNumber: string;
  occupancyStatus: "occupied" | "vacant";
}

export interface PostHouseResponse extends PostResponse {
  data: House;
}

export interface PostResident {
  fullName: string;
  residentStatus: string;
  phoneNumber: string;
  maritalStatus: string;
  houseId: string;
  dateOfEntry: string;
  dateOfExit?: string;
  imageFile?: File;
}

export interface PostResidentResponse extends PostResponse {
  data: Resident;
}

export interface SelectInput {
  label: string;
  value: string;
}

export interface PostExpense {
  expenseCategoryId: string;
  amount: number;
  expenseDate: string;
  expensePeriod: string;
}

export interface PostExpenseResponse extends PostResponse {
  data: Expense;
}

export interface PostPayment {
  houseResidentId: string;
  feeTypeId: string;
  amount: number;
  paymentDate: string;
  paymentPeriod: string;
  paymentStatus: string;
}

export interface PostPaymentResponse extends PostResponse {
  data: Payment;
}
