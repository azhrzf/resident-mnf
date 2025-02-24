import { Routes, Route, BrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HousesPage from "./pages/HousesPage";
import ResidentsPage from "./pages/ResidentsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportSummaryPage from "./pages/ReportSummaryPage";
import HouseDetailPage from "./pages/HouseDetailPage";
import ResidentDetailPage from "./pages/ResidentDetailPage";
import AddResidentPage from "./pages/AddResidentPage";
import EditResidentPage from "./pages/EditResidentPage";
import AddExpensePage from "./pages/AddExpensePage";
import AddPaymentPage from "./pages/AddPaymentPage";
import NotFound from "./components/global/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HousesPage />} />
          <Route path="/houses" element={<HousesPage />} />
          <Route path="/houses/:id" element={<HouseDetailPage />} />
          <Route path="/residents" element={<ResidentsPage />} />
          <Route path="/residents/:id" element={<ResidentDetailPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/reports" element={<ReportSummaryPage />} />
          <Route path="/add-resident" element={<AddResidentPage />} />
          <Route path="/edit-resident/:id" element={<EditResidentPage />} />
          <Route path="/add-expense" element={<AddExpensePage />} />
          <Route path="/add-payment" element={<AddPaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
