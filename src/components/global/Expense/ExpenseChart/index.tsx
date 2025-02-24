import { ExpenseSummary } from "@/api/types";
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
  expense_total: {
    label: "Pembayaran Lunas",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const ExpenseChart = ({
  expenseSummary,
}: {
  expenseSummary: ExpenseSummary[];
}) => {
  const total = expenseSummary.reduce(
    (acc, curr) => acc + Number(curr.expense_total),
    0
  );

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Grafik Pembayaran</CardTitle>
        <CardDescription>
          {expenseSummary[0].date} -{" "}
          {expenseSummary[expenseSummary.length - 1].date}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-56 w-full">
        <ChartContainer config={chartConfig} className="max-h-56 w-full">
          <BarChart accessibilityLayer data={expenseSummary}>
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
            Total Pengeluaran: {formatCurrency(total)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpenseChart;
