import type { SegmentFilterToken } from './segments-editor.model';

export interface SegmentFilterMenuOption {
  readonly value: string;
  readonly label: string;
}

export type SegmentFilterChipEdit =
  | {
      readonly kind: 'menu';
      readonly rowId: string;
      readonly chipIndex: number;
      readonly role: string;
      readonly option: SegmentFilterMenuOption;
    }
  | {
      readonly kind: 'datetime';
      readonly rowId: string;
      readonly chipIndex: number;
      readonly role: string;
      readonly date: Date;
    }
  | {
      readonly kind: 'text';
      readonly rowId: string;
      readonly chipIndex: number;
      readonly role: string;
      readonly text: string;
    }
  | {
      readonly kind: 'multiselect';
      readonly rowId: string;
      readonly chipIndex: number;
      readonly role: string;
      readonly values: readonly string[];
    };

export interface SegmentFilterTypeHandler {
  defaultTokens(label: string, apiKey?: string): SegmentFilterToken[];
  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit, apiKey?: string): SegmentFilterToken[];
  isEditableChip(token: SegmentFilterToken): boolean;
  usesMenu(token: SegmentFilterToken): boolean;
  usesStaticPicker(token: SegmentFilterToken): boolean;
  usesCustomValueEditor(token: SegmentFilterToken): boolean;
  usesListPopover(token: SegmentFilterToken): boolean;
  chipMenuOptions(role: string, apiKey?: string): readonly SegmentFilterMenuOption[];
}

export function labelFromTokens(tokens: SegmentFilterToken[]): string {
  const labelToken = tokens.find((t) => t.kind === 'text' && t.emphasis);
  return labelToken?.kind === 'text' ? labelToken.text : '';
}

export function baseSentence(label: string): SegmentFilterToken[] {
  return [
    { kind: 'text', text: label, emphasis: true },
    { kind: 'text', text: 'is' },
  ];
}
