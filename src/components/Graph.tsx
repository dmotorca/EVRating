'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const twoLitersInTon = 500;

console.log(twoLitersInTon);

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

const chartConfig = {
  user: {
    label: 'User',
    color: 'hsl(var(--chart-1))',
  },
  average: {
    label: 'Average',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface GraphProps {
  personalco2: string;
  milesDriven: string;
}

let co2WithFactor = 0;
const averageco2 = 400;
let workingAverage = 0;

const Graph: React.FC<GraphProps> = ({ personalco2, milesDriven }) => {
  co2WithFactor = parseInt(personalco2) * parseInt(milesDriven);
  workingAverage = averageco2 * parseInt(milesDriven);

  const userOnTopData = [
    {
      year: '1',
      user: co2WithFactor,
      average: workingAverage,
    },
    {
      year: '2',
      user: co2WithFactor * 2,
      average: workingAverage * 2,
    },
    {
      year: '3',
      user: co2WithFactor * 3,
      average: workingAverage * 3,
    },
    {
      year: '4',
      user: co2WithFactor * 4,
      average: workingAverage * 4,
    },
    {
      year: '5',
      user: co2WithFactor * 5,
      average: workingAverage * 5,
    },
    {
      year: '6',
      user: co2WithFactor * 6,
      average: workingAverage * 6,
    },
    {
      year: '7',
      user: co2WithFactor * 7,
      average: workingAverage * 7,
    },
  ];

  const workingOnTopData = [
    {
      year: '1',
      average: workingAverage,

      user: co2WithFactor,
    },
    {
      year: '2',
      user: co2WithFactor * 2,
      average: workingAverage * 2,
    },
    {
      year: '3',
      user: co2WithFactor * 3,
      average: workingAverage * 3,
    },
    {
      year: '4',
      user: co2WithFactor * 4,
      average: workingAverage * 4,
    },
    {
      year: '5',
      user: co2WithFactor * 5,
      average: workingAverage * 5,
    },
    {
      year: '6',
      user: co2WithFactor * 6,
      average: workingAverage * 6,
    },
    {
      year: '7',
      user: co2WithFactor * 7,
      average: workingAverage * 7,
    },
  ];

  const selectedData =
    co2WithFactor > workingAverage ? userOnTopData : workingOnTopData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={selectedData}
            margin={{
              left: 4,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Year ${value}`}
                  indicator="dot"
                />
              }
            />
            <defs>
              <linearGradient id="fillAverage" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-average)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-average)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillUser" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-user)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-user)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="user"
              type="natural"
              fill="url(#fillUser)"
              fillOpacity={0.4}
              stroke="var(--color-user)"
              stackId="a"
            />
            <Area
              dataKey="average"
              type="natural"
              fill="url(#fillAverage)"
              fillOpacity={0.4}
              stroke="var(--color-average)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by {milesDriven} this month {co2WithFactor}{' '}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Graph;
