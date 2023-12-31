import { Abilities } from './abilities.model';
import { Attack } from './attacks.model';
import { Weaknesses } from './weaknesses.model';

export class DeckUser{
  id: string | null;
  name: string | null;
  cards: Card[];
  pokemonCards?: Card[];
  trainerCards?: Card[];
  energyCards?: Card[];
  cardMap?: any;
  coreCount?: number;
  constructor(){
    this.id = null;
    this.name = null;
    this.cards = [];
    this.cardMap= {};
  }
}

export interface DeckList {
  data: Card[];
  count: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface Card {
  id: string;
  imageLoading?: boolean;
  index?: number;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  abilities: Abilities[];
  attacks: Attack[];
  weaknesses: Weaknesses[];
  resistances: { type: 'string'; value: string }[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
  };
  images: {
    small: string;
    large: string;
  };
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices: {
      holofoil: {
        low: number;
        mid: number;
        high: number;
        market: number;
      };
      reverseHolofoil: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
    };
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestedPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
    
  };
}
