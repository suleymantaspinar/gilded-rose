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