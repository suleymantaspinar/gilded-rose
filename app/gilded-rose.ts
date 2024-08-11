import { Item } from './item'

import {
  updateQualityForConcertItem,
  updateQualityForAgedBrie,
  updateQualityForSulfuras,
  updateQualityForCommonItem,
} from './update-strategies';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach(item => {
      switch (item.name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          item = updateQualityForConcertItem(item)
          break;
        case 'Aged Brie':
          item = updateQualityForAgedBrie(item)
          break;
        case 'Sulfuras, Hand of Ragnaros':
          item = updateQualityForSulfuras(item)
          break;
        default:
          item = updateQualityForCommonItem(item)
      }
    });

    return this.items;
  }
}
