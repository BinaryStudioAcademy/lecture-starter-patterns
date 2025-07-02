import type { Socket } from "socket.io";

import { CardEvent } from "../../../common/src/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";
import { logger } from "../common/helpers/logger";
import { findItemIndexById, insertItem, updateItemAtIndex } from "../common/helpers/handlers/handler-helper";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.COPY, this.copyCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeCardDescription.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "Add description");
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();

    logger.log("info", `New card "${cardName}" was successfully created with an id ${newCard.id}`);
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const allLists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists: allLists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();

    logger.log("info", `Cards were successfully reordered`);
  }

  private renameCard(listId: string, cardId: string, newName: string) {
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId 
        ? list.setCards(updateItemAtIndex(
            list.cards, 
            findItemIndexById(list.cards, cardId), 
            (card) => ({...card, name: newName} as Card))
          ) 
        : list
    );

    this.db.setData(updatedLists);
    this.updateLists();

    if(!newName.trim()) {
      logger.log("warning", "Card new name is empty");
    } else {
      logger.log("info", `Card ${cardId} was successfully renamed to "${newName}"`);
    }
  }

  private deleteCard(listId: string, cardId: string) {
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId ? list.setCards(list.cards.filter((card) => card.id !== cardId)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();

    logger.log("info", `Card ${cardId} was successfully deleted`);
  }

  private copyCard(listId: string, card: Card) {
    const newCard = Card.copy(card);
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId 
    ? list.setCards(insertItem(
        list.cards, 
        findItemIndexById(list.cards, card.id), 
        newCard)
      ) 
    : list
    );

    this.db.setData(updatedLists);
    this.updateLists();

    logger.log("info", `Card ${card.id} was successfully copied at ${newCard.createdAt}. New card id: ${newCard.id}`);
  }

  private changeCardDescription(listId: string, cardId: string, newDescription: string) {
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId 
        ? list.setCards(updateItemAtIndex(
            list.cards, 
            findItemIndexById(list.cards, cardId), 
            (card) => ({...card, description: newDescription} as Card))
          ) 
        : list
    );

    this.db.setData(updatedLists);
    this.updateLists();

    if(!newDescription.trim()) {
      logger.log("warning", "Card new description is empty");
    } else {
      logger.log("info", `Card ${cardId} description was successfully changed to "${newDescription}"`);
    }
  }
}

export { CardHandler };
