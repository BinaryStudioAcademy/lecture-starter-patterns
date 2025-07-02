import type { Socket } from "socket.io";

import { ListEvent } from "../../../common/src/enums/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";
import { logger } from "../common/helpers/logger";
import { findItemIndexById, insertItem, updateItemAtIndex } from "../common/helpers/handlers/handler-helper";

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.RENAME, this.renameList.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const allLists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      allLists,
      sourceIndex,
      destinationIndex
    );
    this.db.setData(reorderedLists);
    this.updateLists();

    logger.log("info", "Lists were successfully reordered");
  }

  private createList(name: string): void {
    const allLists = this.db.getData();
    const newList = new List(name);
    const updatedLists = insertItem(allLists, allLists.length, newList);
    this.db.setData(updatedLists);
    this.updateLists();

    logger.log("info", `List "${name}" was successfully created with an id ${newList.id}`);
  }

  private renameList(id: string, newName: string): void {
    const allLists = this.db.getData();
    const listIndexToUpdate = findItemIndexById(allLists, id);
    const updatedLists = updateItemAtIndex(
      allLists, 
      listIndexToUpdate, 
      (list) => ({...list, name: newName} as List)
    );
    this.db.setData(updatedLists);
    this.updateLists();

    if(!newName.trim()) {
      logger.log("warning", "List new name is empty");
    } else {
      logger.log("info", `List ${id} was successfully renamed to "${newName}"`);
    }
  }

  private deleteList(id: string): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.filter((list) => list.id !== id);
    this.db.setData(updatedLists);
    this.updateLists();

    logger.log("info", `List ${id} was successfully deleted`);
  }
}

export { ListHandler };
