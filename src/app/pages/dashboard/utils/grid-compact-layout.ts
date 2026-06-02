import type { KtdGridLayout, KtdGridLayoutItem } from '@katoid/angular-grid-layout';

type ItemsMap = (KtdGridLayoutItem | undefined)[][];

export function rowAutoFlowCompact(layout: KtdGridLayout, columnsCount: number, draggedId?: string): KtdGridLayout {
  const maxYIndex = layout.reduce((max, item) => Math.max(max, item.y), 0) + 1;
  const maxXIndex = columnsCount - 1;
  const itemsMap = mapItemsByCoordinates(layout, maxYIndex);

  for (let y = 0; y <= maxYIndex; y++) {
    for (let x = 0; x <= maxXIndex; x++) {
      if (itemsMap[y][x]) {
        continue;
      }

      const item = findFillerItem(itemsMap, y, x, maxYIndex, maxXIndex, draggedId);
      if (!item) {
        continue;
      }

      itemsMap[item.y][item.x] = undefined;
      itemsMap[y][x] = { ...item, y, x };
    }
  }

  const compacted: KtdGridLayout = [];

  for (let y = 0; y <= maxYIndex; y++) {
    for (let x = 0; x <= maxXIndex; x++) {
      const item = itemsMap[y][x];
      if (!item || !(item.x === x && item.y === y)) {
        continue;
      }
      compacted.push(item);
    }
  }

  return compacted;
}

function findFillerItem(
  itemsMap: ItemsMap,
  startY: number,
  startX: number,
  maxYIndex: number,
  maxXIndex: number,
  draggedId?: string,
): KtdGridLayoutItem | undefined {
  for (let y = startY; y <= maxYIndex; y++) {
    for (let x = 0; x <= maxXIndex; x++) {
      if (y === startY && x < startX) {
        continue;
      }

      const item = itemsMap[y][x];
      if (!item || (draggedId && item.id === draggedId) || item.w > 1) {
        continue;
      }

      return item;
    }
  }

  return undefined;
}

function mapItemsByCoordinates(layout: KtdGridLayout, maxYIndex: number): ItemsMap {
  const itemsMap: ItemsMap = [];

  for (let y = 0; y <= maxYIndex; y++) {
    itemsMap[y] = [];
  }

  layout.forEach((ktItem) => {
    if (ktItem.h > 1) {
      itemsMap[ktItem.y][ktItem.x] = ktItem;
      itemsMap[ktItem.y + 1][ktItem.x] = ktItem;
      itemsMap[ktItem.y][ktItem.x + 1] = ktItem;
      itemsMap[ktItem.y + 1][ktItem.x + 1] = ktItem;
    } else {
      itemsMap[ktItem.y][ktItem.x] = ktItem;
    }
  });

  return itemsMap;
}
