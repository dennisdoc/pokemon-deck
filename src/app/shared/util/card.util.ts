import { DeckUser } from '../model/deck.model';

export function countCoresfromDeck(deck: DeckUser): number {
  let coreCount = 0;
  const mapCore: any = {};
  for (let index = 0; index < deck.cards.length; index++) {
    const card = deck.cards[index];
    if (card.types) {
      for (let index2 = 0; index2 < card.types.length; index2++) {
        const type = card.types[index];
        if (!mapCore[type]) {
          mapCore[type] = true;
          coreCount++;
        }
      }
    }
  }
  return coreCount;
}
