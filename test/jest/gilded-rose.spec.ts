import { GildedRose } from '@/gilded-rose';
import { Item } from '@/item'

describe('Gilded Rose', () => {
  it('should add a new item', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should add multiple items', () => {
    const gildedRose = new GildedRose([
      new Item('foo', 0, 0),
      new Item('bar', 0, 0)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[1].name).toBe('bar');
  });
});

describe('Common Rules', () => {
  it('should not update the quality if it is 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should degrades twice once sell by date has passed', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });
});

describe('Aged Brie Rules', () => {
  it('should increase the quality when degrades', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);
  });

  it('should not increase the quality above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should handle multiple updates correctly', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(-2);
  });
});

describe('Sulfuras, Hand of Ragnaros Rules', () => {
  it('should never degrades quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 2, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('should never has to be sold', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 2, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
  });
});

describe('Backstage passes Rules', () => {
  it('should increase in quality as its sellIn value approaches', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('should increase in quality by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('should increase in quality by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('should drop the quality to 0 after the concert', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});