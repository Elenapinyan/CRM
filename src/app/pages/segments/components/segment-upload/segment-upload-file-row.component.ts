import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { UploadedSegmentFile } from './segment-upload.model';

function formatPlayersLabel(count: number): string {
  return `${count.toLocaleString('en-US')} players`;
}

@Component({
  selector: 'app-segment-upload-file-row',
  templateUrl: './segment-upload-file-row.component.html',
  styleUrl: './segment-upload-file-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentUploadFileRowComponent {
  readonly file = input.required<UploadedSegmentFile>();

  readonly playersClick = output<UploadedSegmentFile>();
  readonly remove = output<UploadedSegmentFile>();

  protected formatPlayersLabel = formatPlayersLabel;

  protected onPlayersClick(): void {
    if (this.file().playerCount <= 0) {
      return;
    }
    this.playersClick.emit(this.file());
  }

  protected onRemove(): void {
    this.remove.emit(this.file());
  }
}
