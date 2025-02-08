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
  const evEmissions = 1224699;
  console.log(workingAverage);

  console.log(
    'User Vehicle produces: ',
    co2WithFactor,
    'Co2 emissions per mile'
  );

  const chartData = [
    {
      browser: 'user',
      emissions: co2WithFactor * 7,
      fill: 'var(--color-user)',
    },
    {
      browser: 'ev',
      emissions: evEmissions * 7,
      fill: 'var(--color-ev)',
    },
    {
      browser: 'average',
      emissions: workingAverage * 7,
      fill: 'var(--color-average)',
    },
  ];

  const chartConfig = {
    user: {
      label: 'Selected Vehicle',
      color: 'hsl(var(--chart-1))',
    },
    average: {
      label: 'Average Vehicle',
      color: 'hsl(var(--chart-3))',
    },
    ev: {
      label: 'EV Vehicle',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CO2 Vehicle Emissions</CardTitle>
        <CardDescription>Year 1 through Year 7</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 6,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="emissions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="emissions" layout="vertical" radius={15} />
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
