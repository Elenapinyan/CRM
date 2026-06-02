import type { EChartsCoreOption } from 'echarts/core';

export type MetricWidgetData = {
  value?: string;
  subValue?: string;
  difference?: string;
  pairValues?: [string, string];
  isOnlyLifetime?: boolean;
};

export type ChartSeriesPoint = { date: string; values: Record<string, number> };

export type ChartSeriesConfig = { name: string; color: string; field: string };

export type ChartWidgetData = {
  chartKind: 'bar' | 'line' | 'net-deposit';
  yAxisLabel?: string;
  series: ChartSeriesConfig[];
  lineSeries?: ChartSeriesConfig[];
  points: ChartSeriesPoint[];
};

const NET_DEPOSIT_COLORS = {
  deposits: '#f8f88c',
  withdrawals: '#9be9e1',
  netDeposit: '#fc87d5',
} as const;

const NET_DEPOSIT_X_LABEL_DAYS = new Set([1, 5, 9, 13, 17, 21, 25, 29]);

/** Expanded popup — odd days 1…31 (Figma 938:19768). */
const NET_DEPOSIT_EXPANDED_X_LABEL_DAYS = new Set(
  Array.from({ length: 16 }, (_, index) => index * 2 + 1),
);

export type NetDepositChartVariant = 'widget' | 'expanded';

const NET_DEPOSIT_DEPOSITS_FIELD = 'deposits';
const NET_DEPOSIT_WITHDRAWALS_FIELD = 'withdrawals';

const DAY_LABELS = Array.from({ length: 30 }, (_, i) => String(i + 1));

/** Net deposit = total deposits − total withdrawals (per day). */
export function getNetDepositValue(point: ChartSeriesPoint): number {
  const deposits = point.values[NET_DEPOSIT_DEPOSITS_FIELD] ?? 0;
  const withdrawals = point.values[NET_DEPOSIT_WITHDRAWALS_FIELD] ?? 0;

  return deposits - withdrawals;
}

function formatNetDepositTooltipDate(dayLabel: string): string {
  const day = Math.max(1, Math.min(31, Number(dayLabel) || 1));

  return `Jan, ${day} 2025`;
}

function formatNetDepositTooltipRow(label: string, value: number): string {
  return `<div style="display:flex;gap:6px;align-items:flex-start;padding:4px;color:#fff;font-size:14px;line-height:20px;white-space:nowrap;">
    <span style="flex:0 0 auto;font-weight:400;">${label}</span>
    <span style="flex:1 1 auto;text-align:right;font-weight:600;">${value.toLocaleString('en-US')}</span>
  </div>`;
}

/** Figma hover menu (node 938:19729). */
export function formatNetDepositTooltipHtml(point: ChartSeriesPoint): string {
  const deposits = point.values[NET_DEPOSIT_DEPOSITS_FIELD] ?? 0;
  const withdrawals = point.values[NET_DEPOSIT_WITHDRAWALS_FIELD] ?? 0;
  const net = deposits - withdrawals;

  return `<div style="min-width:164px;padding:4px;border:1px solid #3b3b40;border-radius:8px;background:#212124;box-shadow:0 1px 6px rgba(24,24,27,0.56);font-family:Inter,system-ui,sans-serif;">
    <div style="padding:4px;color:#cfcfd3;font-size:12px;line-height:16px;">${formatNetDepositTooltipDate(point.date)}</div>
    <div style="height:8px;position:relative;margin:0 -4px;">
      <div style="position:absolute;left:0;right:0;top:50%;height:1px;background:#18181b;box-shadow:0 1px 0 #27272a;"></div>
    </div>
    ${formatNetDepositTooltipRow('Deposits', deposits)}
    ${formatNetDepositTooltipRow('Withdrawals', withdrawals)}
    ${formatNetDepositTooltipRow('Net deposit', net)}
  </div>`;
}

function buildLinePoints(fields: string[], scale = 1): ChartSeriesPoint[] {
  return DAY_LABELS.map((day, index) => {
    const values: Record<string, number> = {};
    fields.forEach((field, fieldIndex) => {
      const base = (index + 1) * (fieldIndex + 2) * 120 * scale;
      values[field] = Math.round(base + Math.sin(index / 3 + fieldIndex) * 400);
    });
    return { date: day, values };
  });
}

function buildNetDepositPoints(): ChartSeriesPoint[] {
  return DAY_LABELS.map((day, index) => {
    const deposits = Math.round(1800 + index * 210 + Math.sin(index / 2.4) * 900 + (index < 10 ? 500 : 0));
    const withdrawals =
      index < 10 ? 0 : Math.round(700 + index * 55 + Math.cos(index / 2.2) * 350);

    return {
      date: day,
      values: { deposits, withdrawals },
    };
  });
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

export function netDepositDateRangeSeed(from: Date, to: Date): number {
  return (from.getTime() ^ to.getTime() ^ (to.getTime() - from.getTime())) >>> 0;
}

function dayCountForRange(from: Date, to: Date): number {
  const msPerDay = 86_400_000;
  return Math.max(1, Math.min(31, Math.floor((to.getTime() - from.getTime()) / msPerDay) + 1));
}

function widgetLabelSeedOffset(label: string): number {
  let hash = 0;
  for (let index = 0; index < label.length; index += 1) {
    hash = (Math.imul(31, hash) + label.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function buildSeededLinePoints(
  fields: string[],
  from: Date,
  to: Date,
  scale = 1,
  label = '',
): ChartSeriesPoint[] {
  const dayCount = dayCountForRange(from, to);
  const rng = seededRandom(netDepositDateRangeSeed(from, to) ^ widgetLabelSeedOffset(label));

  return Array.from({ length: dayCount }, (_, index) => {
    const values: Record<string, number> = {};
    fields.forEach((field, fieldIndex) => {
      values[field] = Math.round((index + 1) * (fieldIndex + 2) * 120 * scale + rng() * 400);
    });
    return { date: String(index + 1), values };
  });
}

/** Prototype chart series for a date range (values randomized from range seed). */
export function buildNetDepositChartForDateRange(from: Date, to: Date): ChartWidgetData {
  const msPerDay = 86_400_000;
  const dayCount = Math.max(
    1,
    Math.min(31, Math.floor((to.getTime() - from.getTime()) / msPerDay) + 1),
  );
  const rng = seededRandom(netDepositDateRangeSeed(from, to));
  const withdrawalStart = Math.floor(dayCount * 0.35);

  const points: ChartSeriesPoint[] = Array.from({ length: dayCount }, (_, index) => {
    const deposits = Math.round(1600 + rng() * 3800 + index * (80 + rng() * 140));
    const withdrawals =
      index < withdrawalStart
        ? 0
        : Math.round(550 + rng() * 2600 + index * (35 + rng() * 25));

    return {
      date: String(index + 1),
      values: { deposits, withdrawals },
    };
  });

  return {
    chartKind: 'net-deposit',
    yAxisLabel: 'Amount, €',
    series: [
      { name: 'Deposits', color: NET_DEPOSIT_COLORS.deposits, field: NET_DEPOSIT_DEPOSITS_FIELD },
      {
        name: 'Withdrawals',
        color: NET_DEPOSIT_COLORS.withdrawals,
        field: NET_DEPOSIT_WITHDRAWALS_FIELD,
      },
    ],
    lineSeries: [
      { name: 'Net deposit', color: NET_DEPOSIT_COLORS.netDeposit, field: 'netDeposit' },
    ],
    points,
  };
}

export const METRIC_WIDGET_MOCK: Record<string, MetricWidgetData> = {
  newPlayers: { pairValues: ['1,683', '23'], isOnlyLifetime: true },
  activePlayers: { pairValues: ['2,104', '41'], isOnlyLifetime: true },
  registrations: { value: '573', isOnlyLifetime: true },
  loginRate: { pairValues: ['5,573', '62%'], difference: '+1.4%' },
  ftdCount: { value: '248', isOnlyLifetime: true },
  ftdAmount: { value: '€ 42.8K', isOnlyLifetime: true },
};

export function getMetricWidgetData(label: string): MetricWidgetData {
  return (
    METRIC_WIDGET_MOCK[label] ?? {
      value: '—',
      difference: '0%',
    }
  );
}

export function getMetricWidgetDataForDateRange(
  label: string,
  from: Date,
  to: Date,
): MetricWidgetData {
  const base = getMetricWidgetData(label);
  if (base.isOnlyLifetime) {
    return base;
  }

  const rng = seededRandom(netDepositDateRangeSeed(from, to) ^ widgetLabelSeedOffset(label));
  const jitter = () => Math.round(80 + rng() * 920);

  if (base.pairValues) {
    const [left, right] = base.pairValues;
    const numericRight = Number.parseFloat(right.replace(/[^\d.-]/g, ''));
    if (!Number.isNaN(numericRight) && right.includes('%')) {
      const next = Math.min(99, Math.max(1, numericRight + (rng() - 0.5) * 8));
      return {
        ...base,
        pairValues: [left, `${next.toFixed(1)}%`],
        difference: `${rng() > 0.5 ? '+' : '-'}${(rng() * 2.5).toFixed(1)}%`,
      };
    }

    return {
      ...base,
      pairValues: [String(jitter()), right],
    };
  }

  if (base.value) {
    const numeric = Number.parseFloat(base.value.replace(/[^\d.-]/g, ''));
    if (!Number.isNaN(numeric)) {
      const next = Math.round(numeric * (0.85 + rng() * 0.35));
      const formatted = base.value.includes('€')
        ? `€ ${(next / 1000).toFixed(1)}K`
        : next.toLocaleString('en-US');
      return { ...base, value: formatted };
    }
  }

  return base;
}

export function getChartWidgetDataForDateRange(label: string, from: Date, to: Date): ChartWidgetData {
  if (label === 'amountDeposits') {
    return buildNetDepositChartForDateRange(from, to);
  }

  switch (label) {
    case 'sentMessages':
      return {
        chartKind: 'line',
        series: [
          { name: 'Email', color: '#2563eb', field: 'email' },
          { name: 'SMS', color: '#16a34a', field: 'sms' },
          { name: 'Push', color: '#a855f7', field: 'push' },
        ],
        points: buildSeededLinePoints(['email', 'sms', 'push'], from, to, 1, label),
      };
    case 'registrationsOverTime':
      return {
        chartKind: 'line',
        series: [{ name: 'Registrations', color: '#2563eb', field: 'registrations' }],
        points: buildSeededLinePoints(['registrations'], from, to, 1.4, label),
      };
    case 'triggeredCampaigns':
      return {
        chartKind: 'line',
        series: [{ name: 'Campaigns', color: '#0ea5e9', field: 'campaigns' }],
        points: buildSeededLinePoints(['campaigns'], from, to, 0.8, label),
      };
    case 'workflowStatuses':
      return {
        chartKind: 'line',
        series: [
          { name: 'Active', color: '#22c55e', field: 'active' },
          { name: 'Paused', color: '#eab308', field: 'paused' },
          { name: 'Failed', color: '#ef4444', field: 'failed' },
        ],
        points: buildSeededLinePoints(['active', 'paused', 'failed'], from, to, 0.6, label),
      };
    case 'conversionClickRate':
      return {
        chartKind: 'line',
        series: [
          { name: 'Conversion', color: '#6366f1', field: 'conversion' },
          { name: 'Click rate', color: '#14b8a6', field: 'clickRate' },
        ],
        points: buildSeededLinePoints(['conversion', 'clickRate'], from, to, 0.35, label),
      };
    case 'overallStatuses':
      return {
        chartKind: 'line',
        series: [
          { name: 'Delivered', color: '#22c55e', field: 'delivered' },
          { name: 'Opened', color: '#3b82f6', field: 'opened' },
          { name: 'Clicked', color: '#8b5cf6', field: 'clicked' },
        ],
        points: buildSeededLinePoints(['delivered', 'opened', 'clicked'], from, to, 1, label),
      };
    case 'depositsWithdrawals':
      return {
        chartKind: 'line',
        series: [
          { name: 'Deposits', color: '#2563eb', field: 'deposits' },
          { name: 'Withdrawals', color: '#f97316', field: 'withdrawals' },
        ],
        points: buildSeededLinePoints(['deposits', 'withdrawals'], from, to, 2.2, label),
      };
    case 'countrySegmentation':
      return {
        chartKind: 'line',
        series: [
          { name: 'UK', color: '#2563eb', field: 'uk' },
          { name: 'DE', color: '#16a34a', field: 'de' },
          { name: 'ES', color: '#f59e0b', field: 'es' },
        ],
        points: buildSeededLinePoints(['uk', 'de', 'es'], from, to, 0.9, label),
      };
    case 'emailChart':
    case 'smsChart':
    case 'pushNotificationChart':
      return {
        chartKind: 'line',
        series: [
          { name: 'Sent', color: '#2563eb', field: 'sent' },
          { name: 'Delivered', color: '#22c55e', field: 'delivered' },
          { name: 'Failed', color: '#ef4444', field: 'failed' },
        ],
        points: buildSeededLinePoints(['sent', 'delivered', 'failed'], from, to, 1, label),
      };
    default:
      return {
        chartKind: 'line',
        series: [{ name: 'Value', color: '#2563eb', field: 'value' }],
        points: buildSeededLinePoints(['value'], from, to, 1, label),
      };
  }
}

export function getChartWidgetData(label: string): ChartWidgetData {
  switch (label) {
    case 'amountDeposits':
      return {
        chartKind: 'net-deposit',
        yAxisLabel: 'Amount, €',
        series: [
          { name: 'Deposits', color: NET_DEPOSIT_COLORS.deposits, field: 'deposits' },
          { name: 'Withdrawals', color: NET_DEPOSIT_COLORS.withdrawals, field: 'withdrawals' },
        ],
        lineSeries: [{ name: 'Net deposit', color: NET_DEPOSIT_COLORS.netDeposit, field: 'netDeposit' }],
        points: buildNetDepositPoints(),
      };
    case 'sentMessages':
      return {
        chartKind: 'line',
        series: [
          { name: 'Email', color: '#2563eb', field: 'email' },
          { name: 'SMS', color: '#16a34a', field: 'sms' },
          { name: 'Push', color: '#a855f7', field: 'push' },
        ],
        points: buildLinePoints(['email', 'sms', 'push']),
      };
    case 'registrationsOverTime':
      return {
        chartKind: 'line',
        series: [{ name: 'Registrations', color: '#2563eb', field: 'registrations' }],
        points: buildLinePoints(['registrations'], 1.4),
      };
    case 'triggeredCampaigns':
      return {
        chartKind: 'line',
        series: [{ name: 'Campaigns', color: '#0ea5e9', field: 'campaigns' }],
        points: buildLinePoints(['campaigns'], 0.8),
      };
    case 'workflowStatuses':
      return {
        chartKind: 'line',
        series: [
          { name: 'Active', color: '#22c55e', field: 'active' },
          { name: 'Paused', color: '#eab308', field: 'paused' },
          { name: 'Failed', color: '#ef4444', field: 'failed' },
        ],
        points: buildLinePoints(['active', 'paused', 'failed'], 0.6),
      };
    case 'conversionClickRate':
      return {
        chartKind: 'line',
        series: [
          { name: 'Conversion', color: '#6366f1', field: 'conversion' },
          { name: 'Click rate', color: '#14b8a6', field: 'clickRate' },
        ],
        points: buildLinePoints(['conversion', 'clickRate'], 0.35),
      };
    case 'overallStatuses':
      return {
        chartKind: 'line',
        series: [
          { name: 'Delivered', color: '#22c55e', field: 'delivered' },
          { name: 'Opened', color: '#3b82f6', field: 'opened' },
          { name: 'Clicked', color: '#8b5cf6', field: 'clicked' },
        ],
        points: buildLinePoints(['delivered', 'opened', 'clicked']),
      };
    case 'depositsWithdrawals':
      return {
        chartKind: 'line',
        series: [
          { name: 'Deposits', color: '#2563eb', field: 'deposits' },
          { name: 'Withdrawals', color: '#f97316', field: 'withdrawals' },
        ],
        points: buildLinePoints(['deposits', 'withdrawals'], 2.2),
      };
    case 'countrySegmentation':
      return {
        chartKind: 'line',
        series: [
          { name: 'UK', color: '#2563eb', field: 'uk' },
          { name: 'DE', color: '#16a34a', field: 'de' },
          { name: 'ES', color: '#f59e0b', field: 'es' },
        ],
        points: buildLinePoints(['uk', 'de', 'es'], 0.9),
      };
    case 'emailChart':
    case 'smsChart':
    case 'pushNotificationChart':
      return {
        chartKind: 'line',
        series: [
          { name: 'Sent', color: '#2563eb', field: 'sent' },
          { name: 'Delivered', color: '#22c55e', field: 'delivered' },
          { name: 'Failed', color: '#ef4444', field: 'failed' },
        ],
        points: buildLinePoints(['sent', 'delivered', 'failed']),
      };
    default:
      return {
        chartKind: 'line',
        series: [{ name: 'Value', color: '#2563eb', field: 'value' }],
        points: buildLinePoints(['value']),
      };
  }
}

function buildNetDepositChartOptions(
  data: ChartWidgetData,
  variant: NetDepositChartVariant = 'widget',
): EChartsCoreOption {
  const isExpanded = variant === 'expanded';
  const categories = data.points.map((point) => point.date);
  const depositsSeries = data.series.find((series) => series.field === NET_DEPOSIT_DEPOSITS_FIELD);
  const withdrawalsSeries = data.series.find((series) => series.field === NET_DEPOSIT_WITHDRAWALS_FIELD);
  const netDepositLine = data.lineSeries?.[0];

  const netDepositValues = data.points.map((point) => getNetDepositValue(point));
  /** Bottom stack segment (deposits color): net so top of segment = net deposit line. */
  const depositsBarValues = netDepositValues.map((net) => Math.max(0, net));
  const withdrawalsBarValues = data.points.map(
    (point) => point.values[NET_DEPOSIT_WITHDRAWALS_FIELD] ?? 0,
  );
  const peakValue = Math.max(...depositsBarValues, ...withdrawalsBarValues, ...netDepositValues, 0);
  const yMax = Math.max(2000, Math.ceil(peakValue / 2000) * 2000);
  const yInterval = Math.max(1000, Math.round(yMax / 5 / 1000) * 1000);
  const pointCount = categories.length;
  const expandedLabelStep = Math.max(1, Math.ceil(pointCount / 16));

  return {
    animation: false,
    grid: { left: 40, right: 8, top: 14, bottom: isExpanded ? 28 : 52 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: 'rgba(24, 24, 27, 0.06)' },
      },
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      extraCssText: 'box-shadow:none;',
      formatter: (params: unknown) => {
        const items = Array.isArray(params) ? params : [params];
        const first = items[0] as { dataIndex?: number } | undefined;
        const index = first?.dataIndex ?? 0;
        const point = data.points[index];

        return point ? formatNetDepositTooltipHtml(point) : '';
      },
    },
    legend: isExpanded
      ? { show: false }
      : {
          bottom: 0,
          left: 0,
          itemGap: 12,
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 12,
          textStyle: { fontSize: 12, color: '#18181b' },
          data: [
            { name: 'Deposits' },
            { name: 'Withdrawals' },
            {
              name: 'Net deposit',
              itemStyle: {
                color: 'transparent',
                borderColor: NET_DEPOSIT_COLORS.netDeposit,
                borderWidth: 2,
              },
            },
          ],
        },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#76767f',
        fontSize: 12,
        interval: (index: number) => {
          if (!isExpanded) {
            const day = Number(categories[index]);
            return NET_DEPOSIT_X_LABEL_DAYS.has(day);
          }

          return index % expandedLabelStep === 0 || index === pointCount - 1;
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: isExpanded ? yMax : Math.min(yMax, 8000),
      interval: isExpanded ? yInterval : 2000,
      axisLabel: {
        color: '#27272a',
        fontSize: 12,
        lineHeight: 16,
        width: 32,
        padding: [2, 0, 0, 0],
        formatter: (value: number) => (value === 0 ? '0' : `${value / 1000}K`),
      },
      splitLine: {
        lineStyle: { color: '#efeff0', type: [4, 4] },
      },
    },
    series: [
      {
        name: depositsSeries?.name ?? 'Deposits',
        type: 'bar',
        stack: 'total',
        barMaxWidth: isExpanded ? 14 : 12,
        itemStyle: { color: depositsSeries?.color ?? NET_DEPOSIT_COLORS.deposits },
        data: depositsBarValues,
      },
      {
        name: withdrawalsSeries?.name ?? 'Withdrawals',
        type: 'bar',
        stack: 'total',
        barMaxWidth: isExpanded ? 14 : 12,
        itemStyle: { color: withdrawalsSeries?.color ?? NET_DEPOSIT_COLORS.withdrawals },
        data: withdrawalsBarValues,
      },
      {
        name: netDepositLine?.name ?? 'Net deposit',
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: true,
        z: 10,
        lineStyle: { color: netDepositLine?.color ?? NET_DEPOSIT_COLORS.netDeposit, width: 2 },
        itemStyle: {
          color: '#ffffff',
          borderColor: netDepositLine?.color ?? NET_DEPOSIT_COLORS.netDeposit,
          borderWidth: 2,
        },
        data: netDepositValues,
      },
    ],
  };
}

export function buildChartOptions(
  data: ChartWidgetData,
  options?: { netDepositVariant?: NetDepositChartVariant },
): EChartsCoreOption {
  const categories = data.points.map((p) => p.date);

  if (data.chartKind === 'net-deposit') {
    return buildNetDepositChartOptions(data, options?.netDepositVariant ?? 'widget');
  }

  if (data.chartKind === 'bar') {
    return {
      animation: false,
      grid: { left: 48, right: 16, top: 24, bottom: 28 },
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: { fontSize: 12 } },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#76767f', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        name: data.yAxisLabel,
        nameTextStyle: { color: '#76767f', fontSize: 11 },
        splitLine: { lineStyle: { color: '#efeff0' } },
        axisLabel: { color: '#76767f', fontSize: 11 },
      },
      series: data.series.map((s) => ({
        name: s.name,
        type: 'bar',
        stack: 'total',
        barMaxWidth: 10,
        itemStyle: { color: s.color },
        data: data.points.map((p) => p.values[s.field] ?? 0),
      })),
    };
  }

  return {
    animation: false,
    grid: { left: 48, right: 16, top: 24, bottom: 36 },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: { fontSize: 12 } },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#76767f', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#efeff0' } },
      axisLabel: { color: '#76767f', fontSize: 11 },
    },
    series: data.series.map((s) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2, color: s.color },
      itemStyle: { color: s.color },
      data: data.points.map((p) => p.values[s.field] ?? 0),
    })),
  };
}
