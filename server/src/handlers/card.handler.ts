import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

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
  }

  private renameCard(listId: string, cardId: string, newName: string) {
    const allLists = this.db.getData();
    const targetList = allLists.find((list) => list.id === listId);
    const cardToUpdate = targetList.cards.find((card) => card.id === cardId);
    cardToUpdate.name = newName;
    this.db.setData(allLists);
    this.updateLists();
  }

  private deleteCard(listId: string, cardId: string) {
    const allLists = this.db.getData();
    const targetList = allLists.find((list) => list.id === listId);
    const cardToDeleteIndex = targetList.cards.findIndex((card) => card.id === cardId);
    const deleteNumber = 1;
    targetList.cards.splice(cardToDeleteIndex, deleteNumber);
    this.db.setData(allLists);
    this.updateLists();
  }

  private copyCard(listId: string, card: Card) {
    const newCard = Card.copy(card);
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private changeCardDescription(listId: string, cardId: string, newDescription: string) {
    const allLists = this.db.getData();
    const targetList = allLists.find((list) => list.id === listId);
    const cardToUpdate = targetList.cards.find((card) => card.id === cardId);
    cardToUpdate.description = newDescription;
    this.db.setData(allLists);
    this.updateLists();
  }
}

export { CardHandler };
