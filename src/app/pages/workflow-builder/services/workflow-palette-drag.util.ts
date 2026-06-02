/** Hide the native drag image so a custom ghost can follow the pointer. */
export function setTransparentDragImage(event: DragEvent): void {
  const dragImage = document.createElement('div');
  dragImage.style.width = '1px';
  dragImage.style.height = '1px';
  dragImage.style.opacity = '0';
  dragImage.style.position = 'fixed';
  dragImage.style.top = '-1000px';
  dragImage.style.left = '-1000px';
  document.body.appendChild(dragImage);
  event.dataTransfer?.setDragImage(dragImage, 0, 0);
  requestAnimationFrame(() => dragImage.remove());
}
