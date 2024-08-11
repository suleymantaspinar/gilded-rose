export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() :Item[] {
    this.items.forEach(item => {
      if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name)
        && item.quality > 0 ) { // decrase quailty
        item.quality = item.quality - 1
      }

      if(['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'].includes(item.name) && item.quality < 50) { // increase quality
          item.quality = item.quality + 1
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.sellIn < 11 && item.quality < 50) {
            item.quality = item.quality + 1
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.sellIn < 6 && item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }

      if (item.name != 'Sulfuras, Hand of Ragnaros') { // decrease sellIn
        item.sellIn = item.sellIn - 1;
      }

      if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name) // decrease quailty
        && item.sellIn < 0  && item.quality > 0) {
        item.quality = item.quality - 1
      }

      if(item.sellIn < 0 && item.name == 'Backstage passes to a TAFKAL80ETC concert') { // make zero
        item.quality = item.quality - item.quality
      }

      if(item.sellIn < 0 && item.name =='Aged Brie' && item.quality < 50) {
        item.quality = item.quality + 1
      }

    });

    return this.items;
  }
}
