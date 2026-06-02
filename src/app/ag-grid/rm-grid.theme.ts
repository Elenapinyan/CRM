import { iconSetMaterial, themeQuartz } from 'ag-grid-community';

/** Quartz + Material icons; DS token vars with hex fallbacks (see product table spec). */
export const rmTheme = themeQuartz.withPart(iconSetMaterial).withParams({
  fontSize: '14px',
  headerFontSize: '14px',
  borderRadius: 0,
  wrapperBorderRadius: 0,
  wrapperBorder: false,
  rowBorder: true,
  borderColor: 'var(--ds-neutral-200-700, #E4E4E7)',
  cellTextColor: 'var(--ds-neutral-1000-0, #18181B)',
  /** Figma CRM table header strip — exact fill, not token-derived. */
  headerBackgroundColor: '#FAFAFA',
  headerTextColor: 'var(--ds-neutral-1000-0, #18181B)',
  /** Vertical rules between column titles; stripe height capped at 24px (Figma). Uses `borderColor`. */
  headerColumnBorder: true,
  headerColumnBorderHeight: '24px',
  /** Flat header strip: no per-cell hover tint (avoids mismatched column header backgrounds). */
  headerCellHoverBackgroundColor: 'transparent',
});
