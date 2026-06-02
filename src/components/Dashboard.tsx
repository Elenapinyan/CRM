import './Dashboard.css';

/* =====================================================================
   Tiny SVG helpers
   ===================================================================== */

/** Sparkline: 80×28 polyline, no fill */
function Sparkline({ color = '#2dd4bf' }: { color?: string }) {
  // Generate a plausible wavy sparkline
  const pts = [
    [0, 20], [8, 14], [16, 18], [24, 10], [32, 16], [40, 8], [48, 12], [56, 6], [64, 14], [72, 10], [80, 8],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
  return (
    <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bar chart: 100% wide, configurable height, 29 bars */
function BarChart({ color = '#2dd4bf', height = 80 }: { color?: string; height?: number }) {
  const bars = [40, 55, 35, 65, 50, 72, 45, 60, 38, 70, 52, 68, 44, 78, 56, 62, 48, 74, 40, 66, 54, 80, 42, 58, 36, 76, 50, 64, 46];
  const max = 80;
  const bw = 100 / bars.length;
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${max}`} preserveAspectRatio="none">
      {bars.map((v, i) => (
        <rect
          key={i}
          x={i * bw + bw * 0.15}
          y={max - v}
          width={bw * 0.7}
          height={v}
          fill={color}
          rx="1"
        />
      ))}
    </svg>
  );
}

/** Grouped bar chart for Depositors */
function GroupedBarChart({ height = 80 }: { height?: number }) {
  const colors = ['#22d3ee', '#06b6d4', '#0d9488', '#ca8a04'];
  const data = [
    [40, 30, 20, 10],
    [50, 40, 30, 15],
    [35, 45, 25, 20],
    [60, 35, 40, 25],
    [45, 50, 35, 18],
    [55, 38, 28, 22],
    [42, 44, 32, 16],
  ];
  const max = 80;
  const groupW = 100 / data.length;
  const barW = (groupW * 0.8) / colors.length;
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${max}`} preserveAspectRatio="none">
      {data.map((group, gi) =>
        group.map((v, ci) => (
          <rect
            key={`${gi}-${ci}`}
            x={gi * groupW + groupW * 0.1 + ci * barW}
            y={max - v}
            width={barW * 0.85}
            height={v}
            fill={colors[ci]}
            rx="0.5"
          />
        ))
      )}
    </svg>
  );
}

/** Line chart */
function LineChart({ color = '#2dd4bf', height = 80 }: { color?: string; height?: number }) {
  const vals = [55, 42, 60, 35, 70, 48, 65, 38, 72, 44, 68, 52, 75, 40, 66, 50, 80, 45, 62, 36, 78, 54, 70, 42, 68, 58, 76, 50, 64];
  const max = 80;
  const step = 100 / (vals.length - 1);
  const pts = vals.map((v, i) => `${i * step},${max - v}`).join(' ');
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${max}`} preserveAspectRatio="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =====================================================================
   Shared sub-components
   ===================================================================== */

function InfoIcon() {
  return (
    <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2h4M2 2v4M12 2h-4M12 2v4M2 12h4M2 12v-4M12 12h-4M12 12v-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5h11M5.5 5v7.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.4 2.4l1.06 1.06M10.54 10.54l1.06 1.06M2.4 11.6l1.06-1.06M10.54 3.46l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UpArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ChartWidgetProps {
  title: string;
  value?: string;
  change?: string;
  changeDir?: 'up' | 'down';
  axisLabel?: string;
  yAxis?: string[];
  xAxis?: string[];
  spanClass?: string;
  rowSpan?: boolean;
  children: React.ReactNode;
  badge?: string;
}

function ChartWidget({ title, value, change, changeDir = 'up', axisLabel, yAxis, xAxis, spanClass = 'span-2', rowSpan, children, badge }: ChartWidgetProps) {
  return (
    <div className={`chart-widget ${spanClass}${rowSpan ? ' row-span-2' : ''}`}>
      <div className="chart-widget-header">
        <div className="chart-widget-title-group">
          {title}
          <InfoIcon />
          {badge && <span className="badge-lifetime">{badge}</span>}
        </div>
        <div className="chart-widget-actions">
          <button className="icon-btn" aria-label="Expand"><ExpandIcon /></button>
        </div>
      </div>
      {value && (
        <div className="chart-metric-row">
          <span className="chart-metric-value">{value}</span>
          {change && (
            <span className={`change-badge ${changeDir}`}>
              {changeDir === 'up' ? <UpArrow /> : <DownArrow />}
              {change}
            </span>
          )}
        </div>
      )}
      {axisLabel && <div className="chart-axis-label">{axisLabel}</div>}
      {yAxis ? (
        <div className="chart-with-yaxis">
          <div className="y-axis-labels" style={{ height: 80 }}>
            {yAxis.map(l => <span key={l}>{l}</span>)}
          </div>
          <div className="chart-area" style={{ flex: 1 }}>
            {children}
            {xAxis && (
              <div className="x-axis-labels">
                {xAxis.map(l => <span key={l}>{l}</span>)}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="chart-area">{children}</div>
      )}
    </div>
  );
}

function ChartWidgetHalf({ title, value, change, changeDir = 'up', children }: { title: string; value?: string; change?: string; changeDir?: 'up' | 'down'; children: React.ReactNode }) {
  return (
    <div className="chart-widget-half">
      <div className="chart-widget-header">
        <div className="chart-widget-title-group">
          {title}
          <InfoIcon />
        </div>
        <div className="chart-widget-actions">
          <button className="icon-btn" aria-label="Expand"><ExpandIcon /></button>
        </div>
      </div>
      {value && (
        <div className="chart-metric-row">
          <span className="chart-metric-value">{value}</span>
          {change && (
            <span className={`change-badge ${changeDir}`}>
              {changeDir === 'up' ? <UpArrow /> : <DownArrow />}
              {change}
            </span>
          )}
        </div>
      )}
      <div className="chart-area">{children}</div>
    </div>
  );
}

/* =====================================================================
   Communications Table
   ===================================================================== */

interface CommRow {
  channel: string;
  color: string;
  bgColor: string;
  sent: string;
  delivered: string;
  clicked: string;
  wf: string;
  tmpl: string;
  sparkColor: string;
}

const COMM_ROWS: CommRow[] = [
  { channel: 'Email',  color: '#e63946', bgColor: '#fde8e9', sent: '3,552.45', delivered: '3,552.45', clicked: '3,552.45', wf: '200', tmpl: '40',  sparkColor: '#e63946' },
  { channel: 'SMS',   color: '#2563eb', bgColor: '#dbeafe', sent: '552.25',   delivered: '552.25',   clicked: '552.25',   wf: '20',  tmpl: '10',  sparkColor: '#2563eb' },
  { channel: 'Push',  color: '#f59e0b', bgColor: '#fef3c7', sent: '1,532.15', delivered: '1,532.15', clicked: '—',        wf: '153', tmpl: '129', sparkColor: '#f59e0b' },
  { channel: 'Inbox', color: '#10b981', bgColor: '#d1fae5', sent: '2,345.67', delivered: '2,345.67', clicked: '2,345.67', wf: '24',  tmpl: '48',  sparkColor: '#10b981' },
  { channel: 'Popup', color: '#8b5cf6', bgColor: '#ede9fe', sent: '789.90',   delivered: '789.90',   clicked: '789.90',   wf: '40',  tmpl: '88',  sparkColor: '#8b5cf6' },
];

function SparklineCell({ value, color, isDash }: { value: string; color: string; isDash?: boolean }) {
  if (isDash) {
    return <span style={{ color: 'var(--neutral-500)' }}>—</span>;
  }
  return (
    <div className="sparkline-cell">
      <Sparkline color={color} />
      <span className="value">{value}</span>
    </div>
  );
}

function CommsTable() {
  return (
    <table className="comms-table">
      <thead>
        <tr>
          <th>Channel type</th>
          <th>Sent</th>
          <th>Delivered</th>
          <th>Clicked</th>
          <th style={{ textAlign: 'right' }}>Workflows count</th>
          <th style={{ textAlign: 'right' }}>Templates count</th>
        </tr>
      </thead>
      <tbody>
        {COMM_ROWS.map(row => (
          <tr key={row.channel}>
            <td>
              <div className="channel-cell">
                <span className="channel-dot" style={{ background: row.color }} />
                <span className="channel-chip" style={{ background: row.bgColor, color: row.color }}>
                  {row.channel}
                </span>
              </div>
            </td>
            <td><SparklineCell value={row.sent} color={row.sparkColor} isDash={row.sent === '—'} /></td>
            <td><SparklineCell value={row.delivered} color={row.sparkColor} isDash={row.delivered === '—'} /></td>
            <td><SparklineCell value={row.clicked} color={row.sparkColor} isDash={row.clicked === '—'} /></td>
            <td className="count-cell">{row.wf}</td>
            <td className="count-cell">{row.tmpl}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td><strong>Total</strong></td>
          <td>
            <div className="sparkline-cell">
              <Sparkline color="#6b7280" />
              <span className="value"><strong>5,636.85</strong></span>
            </div>
          </td>
          <td>
            <div className="sparkline-cell">
              <Sparkline color="#6b7280" />
              <span className="value"><strong>5,636.85</strong></span>
            </div>
          </td>
          <td>
            <div className="sparkline-cell">
              <Sparkline color="#6b7280" />
              <span className="value"><strong>5,636.85</strong></span>
            </div>
          </td>
          <td className="count-cell"><strong>437</strong></td>
          <td className="count-cell"><strong>315</strong></td>
        </tr>
      </tbody>
    </table>
  );
}

/* =====================================================================
   Funnel Chart
   ===================================================================== */

function FunnelChart() {
  const steps = [
    { label: 'First',  count: '1,320', height: 100 },
    { label: 'Second', count: '1,003', height: 76 },
    { label: 'Third',  count: '734',   height: 56 },
    { label: 'Fourth', count: '320',   height: 32 },
  ];
  const conversions = ['76%', '68%', '44%'];

  return (
    <div className="funnel-widget">
      <div className="funnel-content">
        {steps.map((step, i) => (
          <div key={step.label} className="funnel-step">
            <div
              className="funnel-step-bar"
              style={{ height: step.height }}
            />
            <div className="funnel-step-info">
              <span className="funnel-label">{step.label}</span>
              <span className="funnel-count">{step.count}</span>
            </div>
            {i < steps.length - 1 && (
              <span className="funnel-conv-chip">{conversions[i]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   Main Dashboard
   ===================================================================== */

const Y_AXIS_PCT = ['100%', '80%', '60%', '40%', '20%', '0'];
const Y_AXIS_AMT = ['10K', '8K', '6K', '4K', '2K', '0'];
const X_AXIS_DAYS = Array.from({ length: 7 }, (_, i) => String((i + 1) * 4 + 1));

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Page Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="btn-customise">
          <GearIcon />
          Customise
        </button>
      </div>

      {/* Filter Bar */}
      <div className="dashboard-filters">
        <button className="chip-btn">
          Period: March <ChevronDownIcon />
        </button>
        <button className="chip-btn">
          Compare: Previous period <ChevronDownIcon />
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="dashboard-kpi-row">
        <div className="kpi-cell">
          <div className="kpi-cell-header">
            <div className="kpi-cell-label-group">
              Email opt in/out <InfoIcon />
            </div>
            <span className="badge-lifetime">Lifetime</span>
          </div>
          <div className="kpi-value">1,683/23</div>
        </div>
        <div className="kpi-cell">
          <div className="kpi-cell-header">
            <div className="kpi-cell-label-group">
              SMS opt in/out <InfoIcon />
            </div>
            <span className="badge-lifetime">Lifetime</span>
          </div>
          <div className="kpi-value">789/24</div>
        </div>
        <div className="kpi-cell">
          <div className="kpi-cell-header">
            <div className="kpi-cell-label-group">
              Self-excluded users <InfoIcon />
            </div>
            <span className="badge-lifetime">Lifetime</span>
          </div>
          <div className="kpi-value">2,425</div>
        </div>
      </div>

      {/* Communications Widget */}
      <div className="comms-widget">
        <div className="widget-header">
          <div className="widget-title-group">
            Communications <InfoIcon />
          </div>
          <div className="widget-actions">
            <button className="icon-btn" aria-label="Table view"><TableIcon /></button>
            <button className="icon-btn" aria-label="Expand"><ExpandIcon /></button>
          </div>
        </div>
        <CommsTable />
      </div>

      {/* Charts Grid */}
      <div className="dashboard-charts">

        {/* Row 1 — Net deposit (span 2) */}
        <ChartWidget
          title="Net deposit"
          value="12,301"
          change="+0.24%"
          changeDir="up"
          axisLabel="Amount, €"
          yAxis={Y_AXIS_AMT}
          spanClass="span-2"
        >
          <BarChart color="#2dd4bf" height={80} />
        </ChartWidget>

        {/* Row 1 — Depositors (span 2) */}
        <ChartWidget
          title="Depositors"
          spanClass="span-2"
          yAxis={Y_AXIS_AMT}
        >
          <>
            <GroupedBarChart height={80} />
            <div className="chart-legend">
              {[['#22d3ee','First'],['#06b6d4','Second'],['#0d9488','Third'],['#ca8a04','Fourth']].map(([c,l]) => (
                <div className="legend-item" key={l}>
                  <span className="legend-dot" style={{ background: c }} />
                  {l}
                </div>
              ))}
            </div>
          </>
        </ChartWidget>

        {/* Row 1 — GGR + NGR stacked (span 2) */}
        <div className="stacked-col">
          <ChartWidgetHalf title="GGR" value="€ 12,301" change="-0.21%" changeDir="down">
            <BarChart color="#facc15" height={50} />
          </ChartWidgetHalf>
          <ChartWidgetHalf title="NGR" value="€ 12,301" change="+0.32%" changeDir="up">
            <BarChart color="#4ade80" height={50} />
          </ChartWidgetHalf>
        </div>

        {/* Row 2 — Deposit conversion funnel (span 4) */}
        <ChartWidget title="Deposit conversion funnel" spanClass="span-4" badge="Lifetime">
          <FunnelChart />
        </ChartWidget>

        {/* Row 2 — Average deposit per user (span 2) */}
        <ChartWidget
          title="Average deposit per user"
          axisLabel="Amount, €"
          yAxis={Y_AXIS_AMT}
          spanClass="span-2"
        >
          <LineChart color="#2dd4bf" height={80} />
        </ChartWidget>

        {/* Row 3 — Registrations (span 2) */}
        <ChartWidget title="Registrations" value="12,301" change="+0.24%" changeDir="up" spanClass="span-2">
          <BarChart color="#86efac" height={60} />
        </ChartWidget>

        {/* Row 3 — GGR small (span 2) */}
        <ChartWidget title="GGR" value="€ 12,301.00" change="+0.4%" changeDir="up" spanClass="span-2">
          <BarChart color="#c084fc" height={60} />
        </ChartWidget>

        {/* Row 3 — Retention rate (span 2, row-span 2) */}
        <ChartWidget
          title="Retention rate"
          spanClass="span-2"
          rowSpan={true}
          yAxis={Y_AXIS_PCT}
          xAxis={X_AXIS_DAYS}
        >
          <LineChart color="#a78bfa" height={140} />
        </ChartWidget>

        {/* Row 4 — Conversion rate (span 2) */}
        <ChartWidget title="Conversion rate" value="24.8%" change="-0.13%" changeDir="down" spanClass="span-2">
          <BarChart color="#60a5fa" height={60} />
        </ChartWidget>

        {/* Row 4 — NGR small (span 2) */}
        <ChartWidget title="NGR" value="€ 9,343.00" change="+0.4%" changeDir="up" spanClass="span-2">
          <BarChart color="#fde047" height={60} />
        </ChartWidget>

        {/* Row 5 — GGR Retention rate (span 3) */}
        <ChartWidget
          title="GGR Retention rate"
          spanClass="span-3"
          yAxis={Y_AXIS_PCT}
        >
          <LineChart color="#f472b6" height={80} />
        </ChartWidget>

        {/* Row 5 — Cross-sell rate (span 3) */}
        <ChartWidget
          title="Cross-sell rate"
          spanClass="span-3"
          yAxis={Y_AXIS_PCT}
        >
          <LineChart color="#fb923c" height={80} />
        </ChartWidget>

        {/* Row 6 — ARPU (span 2) */}
        <ChartWidget title="ARPU" axisLabel="Amount, €" yAxis={Y_AXIS_AMT} spanClass="span-2">
          <LineChart color="#fda4af" height={80} />
        </ChartWidget>

        {/* Row 6 — Reactivation rate (span 2) */}
        <ChartWidget
          title="Reactivation rate"
          spanClass="span-2"
          yAxis={['100%','80%','60%','40%','20%','0']}
        >
          <BarChart color="#fb923c" height={80} />
        </ChartWidget>

        {/* Row 6 — Total bet amount + Bonus cost stacked (span 2) */}
        <div className="stacked-col">
          <ChartWidgetHalf title="Total bet amount" value="€ 12,301.00" change="+0.4%" changeDir="up">
            <BarChart color="#fbbf24" height={50} />
          </ChartWidgetHalf>
          <ChartWidgetHalf title="Bonus cost" value="€ 9,343.00" change="+0.4%" changeDir="up">
            <BarChart color="#f87171" height={50} />
          </ChartWidgetHalf>
        </div>

      </div>
    </div>
  );
}
