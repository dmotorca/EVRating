'use client';

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
  const workingAverage = 402 * parseInt(milesDriven);
  const evEmissions = 1224699;

  const chartData = [
    {
      browser: 'user',
      Emissions: co2WithFactor * 7,
      fill: 'var(--color-user)',
    },
    {
      browser: 'ev',
      Emissions: evEmissions * 7,
      fill: 'var(--color-ev)',
    },
    {
      browser: 'average',
      Emissions: workingAverage * 7,
      fill: 'var(--color-average)',
    },
  ];

  const chartConfig = {
    user: {
      label: 'Selected Vehicle',
      color: 'hsl(var(--chart-4))',
    },
    average: {
      label: 'Average Vehicle',
      color: 'hsl(var(--chart-6))',
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
        <CardDescription>Emissions over a 7 year time period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            className="font-bold"
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 3,
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
            <XAxis dataKey="Emissions" type="number" hide />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="Emissions" layout="vertical" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {co2WithFactor > workingAverage ? (
            <div className="font-semibold text-red-600">
              Your vehicle emits more CO2 than the average vehicle
            </div>
          ) : (
            <div className="font-semibold text-green-600">
              Your vehicle emits less CO2 than the average vehicle
            </div>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {co2WithFactor > workingAverage ? (
            <div>Your vehicle emits {workingAverage - co2WithFactor} </div>
          ) : (
            <div className="">
              <div> Nice Job!</div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChart;
