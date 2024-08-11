import { Item, GildedRose } from '@/gilded-rose';

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