import { Item } from './item'

export const updateQualityForConcertItem = (item: Item): Item => {
  if (item.sellIn <= 0) {
    item.quality = item.quality - item.quality
    return item
  }

  item.quality = item.quality + 1

  if (item.sellIn < 11 && item.quality < 50) {
    item.quality = item.quality + 1
  }

  if (item.sellIn < 6 && item.quality < 50) {
    item.quality = item.quality + 1
  }

  item.sellIn = item.sellIn - 1;

  return item
}

export const updateQualityForAgedBrie = (item: Item): Item => {
  if (item.quality < 50) {
    item.quality = item.quality + 1
  }

  item.sellIn = item.sellIn - 1;

  if (item.sellIn < 0 && item.quality < 50) {
    item.quality = item.quality + 1
  }

  return item
}

export const updateQualityForSulfuras = (item: Item): Item => {
  return item
}

export const updateQualityForCommonItem = (item: Item): Item => {
  if (item.quality > 0) {
    item.quality = item.quality - 1
  }

  item.sellIn = item.sellIn - 1;

  if (item.sellIn < 0 && item.quality > 0) {
    item.quality = item.quality - 1
  }

  return item
}

export const updateQuailtyForConjuredItem = (item: Item): Item => {
  item.sellIn -= 1;

  let degradationFactor = 2;

  if (item.sellIn < 0) {
    item.quality -= 2 * degradationFactor;
  } else {
    item.quality -= degradationFactor;
  }

  if (item.quality < 0) {
    item.quality = 0;
  }

  return item
}