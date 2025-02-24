import { AllSummary } from "@/api/types";
import { formatCurrency } from "@/lib/utils";
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
  payment_total_paid: {
    label: "Pembayaran Lunas",
    color: "hsl(var(--chart-1))",
  },
  payment_total_unpaid: {
    label: "Pembayaran Belum Lunas",
    color: "hsl(var(--chart-2))",
  },
  expense_total: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const SummaryChart = ({ summary }: { summary: AllSummary[] }) => {
  const totalPaid = summary.reduce(
    (acc, curr) => acc + Number(curr.payment_total_paid),
    0
  );

  const totalUnpaid = summary.reduce(
    (acc, curr) => acc + Number(curr.payment_total_unpaid),
    0
  );

  const totalExpense = summary.reduce(
    (acc, curr) => acc + Number(curr.expense_total),
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Pembayaran</CardTitle>
        <CardDescription>
          {summary[0].date} - {summary[summary.length - 1].date}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-56 w-full">
        <ChartContainer config={chartConfig} className="max-h-56 w-full">
          <BarChart accessibilityLayer data={summary}>
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
              dataKey="payment_total_paid"
              fill="var(--color-payment_total_paid)"
              radius={4}
            />
            <Bar
              dataKey="payment_total_unpaid"
              fill="var(--color-payment_total_unpaid)"
              radius={4}
            />
            <Bar
              dataKey="expense_total"
              fill="var(--color-expense_total)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm space-y-1">
        <div className="flex gap-2 font-medium leading-none">
          Data Total Pembayaran
        </div>
        <div className="space-y-2">
          <div className="leading-none text-muted-foreground">
            Total Pembayaran Lunas: {formatCurrency(totalPaid)}
          </div>
          <div className="leading-none text-muted-foreground">
            Total Pembayaran Belum Lunas: {formatCurrency(totalUnpaid)}
          </div>
          <div className="leading-none text-muted-foreground">
            Total Pengeluaran: {formatCurrency(totalExpense)}
          </div>
          <div className="leading-none text-muted-foreground">
            Total Saldo yang Terpenuhi: {formatCurrency(totalPaid - totalExpense)}
          </div>
          <div className="leading-none text-muted-foreground">
            Total Saldo Jika Semua Terpenuhi: {formatCurrency(totalPaid + totalUnpaid - totalExpense)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SummaryChart;
