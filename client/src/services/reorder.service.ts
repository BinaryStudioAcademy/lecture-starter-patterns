import type { DraggableLocation } from "@hello-pangea/dnd";

import { type Card, type List } from "../common/types/types";

  const reorderLists = (
    items: List[], 
    startIndex: number, 
    endIndex: number
  ): List[] => {
    const [removedItem] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removedItem);

    return items;
  };

  const findCards = (
    lists: List[], 
    location: DraggableLocation
  ): Card[] => {
    return lists.find((list) => list.id === location.droppableId)?.cards || [];
  };

  const reorderCards = (
    lists: List[],
    source: DraggableLocation,
    destination: DraggableLocation
  ): List[] => {
    const currentCards: Card[] = findCards(lists, source);
    const nextCards: Card[] = findCards(lists, destination);
    const targetCard: Card = currentCards[source.index];

    const isMovingInSameList = source.droppableId === destination.droppableId;

    if (isMovingInSameList) {
      const [removedCard] = currentCards.splice(source.index, 1);
      currentCards.splice(destination.index, 0, removedCard);
      const reorderedCards: Card[] = currentCards;

      return lists.map((list) =>
        list.id === source.droppableId ? { ...list, cards: reorderedCards } : list
      );
    }

    const newLists = lists.map((list) => {
      if (list.id === source.droppableId) {
        return {
          ...list,
          cards: removeCardFromList(currentCards, source.index),
        };
      }

      if (list.id === destination.droppableId) {
        return {
          ...list,
          cards: addCardToList(nextCards, destination.index, targetCard),
        };
      }

      return list;
    });

    return newLists;
  };

  const removeCardFromList = (cards: Card[], index: number): Card[] => {
    return cards.slice(0, index)
      .concat(cards.slice(index + 1));
  };

  const addCardToList = (
    cards: Card[], 
    index: number, 
    card: Card
  ): Card[] => {
    return cards.slice(0, index)
      .concat(card)
      .concat(cards
      .slice(index));
  };

  export { reorderLists, reorderCards }