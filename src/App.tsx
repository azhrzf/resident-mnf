import { Routes, Route, BrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HousesPage from "./pages/HousesPage";
import ResidentsPage from "./pages/ResidentsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportSummaryPage from "./pages/ReportSummaryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HousesPage/>} />
          <Route path="/houses" element={<HousesPage/>} />
          <Route path="/residents" element={<ResidentsPage/>}/>
          <Route path="/payments" element={<PaymentsPage/>}/>
          <Route path="/expenses" element={<ExpensesPage/>}/>
          <Route path="/reports" element={<ReportSummaryPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
