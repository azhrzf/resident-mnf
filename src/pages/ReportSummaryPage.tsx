import { useState, useEffect } from "react";
import { getAllSummary } from "@/api/main";
import { AllSummary, AllChartData, MultiPayment } from "@/api/types";
import PaymentTable from "@/components/global/PaymentTable";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  paymentPaid: {
    label: "Pembayaran Lunas",
    color: "hsl(var(--chart-1))",
  },
  paymentUnpaid: {
    label: "Pembayaran Belum Lunas",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;


const ReportSummaryPage = () => {
  const [chartData, setChartData] = useState<AllChartData[]>([]);
  const [payments, setPayments] = useState<MultiPayment[][]>([]);

  useEffect(() => {
    const fetchAllSummary = async () => {
      try {
        const data = await getAllSummary(
          ["2025-01-01", "2025-02-01"],
          "complete"
        );

        const formattedChartData = data.map((summary: AllSummary) => ({
          date: `${summary.month}/${summary.year}`,
          paymentPaid: summary.payment_total_paid,
          paymentUnpaid: summary.payment_total_unpaid,
          expense: summary.expense_total,
        }));

        setChartData(formattedChartData);

        const formattedPaymentsData = data.map((summary: AllSummary) => {
          return summary.payments;
        });

        console.log(formattedPaymentsData);

        setPayments(formattedPaymentsData);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchAllSummary();
  }, []);

  return (
    <div>
      <h1>Report Summary Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="paymentPaid"
                fill="var(--color-paymentPaid)"
                radius={4}
              />
              <Bar
                dataKey="paymentUnpaid"
                fill="var(--color-paymentUnpaid)"
                radius={4}
              />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      {payments.map((payment, index) => (
        <PaymentTable key={index} payments={payment} />
      ))}
    </div>
  );
};

export default ReportSummaryPage;
