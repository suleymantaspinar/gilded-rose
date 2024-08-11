import {Item} from './item'

import { 
  updateQualityForConcertItem,
  updateQualityForAgedBrie,
  updateQualityForSulfuras
 } from './update-strategies';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() :Item[] {
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
          if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name)
            && item.quality > 0 ) { // decrase quailty
            item.quality = item.quality - 1
          }

          if (item.name != 'Sulfuras, Hand of Ragnaros' && item.name !='Backstage passes to a TAFKAL80ETC concert' ) { // decrease sellIn
            item.sellIn = item.sellIn - 1;
          }
    
          if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name) // decrease quailty
            && item.sellIn < 0  && item.quality > 0) {
            item.quality = item.quality - 1
          }
      }
    });

    return this.items;
  }
}
