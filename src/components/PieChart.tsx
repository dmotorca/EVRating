'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, YAxis, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface PieChartProps {
  personalco2: string;
  milesDriven: string;
}

const PieChart: React.FC<PieChartProps> = ({ personalco2, milesDriven }) => {
  const co2WithFactor = parseInt(personalco2) * parseInt(milesDriven);
  const workingAverage = 400 * parseInt(milesDriven);
  console.log(workingAverage);

  console.log(
    'User Vehicle produces: ',
    co2WithFactor,
    'Co2 emissions per mile'
  );

  const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  ];

  const chartConfig = {
    chrome: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))',
    },
    user: {
      label: 'User',
      color: 'hsl(var(--chart-1))',
    },
    average: {
      label: 'Average',
      color: 'hsl(var(--chart-2))',
    },
    ev: {
      label: 'EV',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
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
  );
};

export default PieChart;
