import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AVG_SCORE_BY_MODULE, COMPLETION_BY_WEEK } from "@/data/mockTeacherData"

const TEAL = "#2A9D8F"
const GOLD = "#E9C46A"
// Darker step from the same gold ramp, used for the line itself: brand gold is
// only 1.67:1 against a white card, while this clears the 3:1 contrast floor
// natively. Brand gold stays as the dot fill so the chart still reads as ours.
const GOLD_DEEP = "#A17520"

const AXIS_INK = "#64748B"
const GRID_INK = "#E7E7E2"

const axisTick = {
  fill: AXIS_INK,
  fontSize: 12,
  fontFamily: "Outfit, sans-serif",
}

const numericTick = {
  fill: AXIS_INK,
  fontSize: 12,
  fontFamily: "'JetBrains Mono', monospace",
}

/** Shared tooltip: white surface, soft border, mono numerals. */
function ChartTooltip({ active, payload, label, suffix = "%", labelKey }) {
  if (!active || !payload?.length) return null
  const point = payload[0]
  const heading = labelKey ? point.payload[labelKey] : label

  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-navy">{heading}</p>
      <p className="text-stat mt-0.5 text-sm" style={{ color: point.color }}>
        {point.value}
        {suffix}
      </p>
    </div>
  )
}

/** Value labels on the line — required relief for gold's low contrast. */
function GoldPointLabel({ x, y, value }) {
  return (
    <text
      x={x}
      y={y - 14}
      textAnchor="middle"
      fill={GOLD_DEEP}
      fontSize={12}
      fontFamily="'JetBrains Mono', monospace"
      fontWeight={600}
    >
      {value}%
    </text>
  )
}

export function AvgScoreByModuleChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-navy">
          Average Score by Module
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Class average across every graded attempt
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={AVG_SCORE_BY_MODULE}
              margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
            >
              <CartesianGrid
                vertical={false}
                stroke={GRID_INK}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="short"
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={numericTick}
                tickLine={false}
                axisLine={false}
                width={44}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "rgba(42,157,143,0.06)" }}
                content={<ChartTooltip labelKey="module" />}
              />
              <Bar
                dataKey="avgScore"
                fill={TEAL}
                radius={[4, 4, 0, 0]}
                maxBarSize={38}
                // Marks render immediately; entrance animation adds nothing to
                // a dashboard and breaks under reduced-motion.
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CompletionByWeekChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-navy">
          Completion Rate by Week
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share of the pathway completed, last four weeks
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={COMPLETION_BY_WEEK}
              margin={{ top: 24, right: 16, bottom: 0, left: -16 }}
            >
              <CartesianGrid
                vertical={false}
                stroke={GRID_INK}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="week"
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                // Inset the series so the first point's value label clears
                // the y-axis tick labels.
                padding={{ left: 16, right: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={numericTick}
                tickLine={false}
                axisLine={false}
                width={44}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ stroke: GOLD_DEEP, strokeWidth: 1 }}
                content={<ChartTooltip labelKey="label" />}
              />
              <Line
                type="monotone"
                dataKey="completionRate"
                stroke={GOLD_DEEP}
                strokeWidth={3}
                // Darker ring keeps each point readable where the line is faint.
                isAnimationActive={false}
                dot={{ fill: GOLD, stroke: GOLD_DEEP, strokeWidth: 2, r: 5 }}
                activeDot={{ fill: GOLD_DEEP, stroke: "#FFFFFF", strokeWidth: 2, r: 6 }}
                label={<GoldPointLabel />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AvgScoreByModuleChart />
      <CompletionByWeekChart />
    </div>
  )
}
