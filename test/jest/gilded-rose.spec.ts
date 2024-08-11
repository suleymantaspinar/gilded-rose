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