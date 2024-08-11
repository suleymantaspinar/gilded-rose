import {Item} from './item'

import { updateQualityForConcertItem } from './update-strategies';

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
        default:
          if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name)
            && item.quality > 0 ) { // decrase quailty
            item.quality = item.quality - 1
          }

          if(['Aged Brie'].includes(item.name) && item.quality < 50) { // increase quality
            item.quality = item.quality + 1
          }
    
          if (item.name != 'Sulfuras, Hand of Ragnaros' && item.name !='Backstage passes to a TAFKAL80ETC concert' ) { // decrease sellIn
            item.sellIn = item.sellIn - 1;
          }
    
          if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name) // decrease quailty
            && item.sellIn < 0  && item.quality > 0) {
            item.quality = item.quality - 1
          }
    
          if(item.sellIn < 0 && item.name =='Aged Brie' && item.quality < 50) {
            console.log("5")
            item.quality = item.quality + 1
          }
      }

    });

    return this.items;
  }
}
