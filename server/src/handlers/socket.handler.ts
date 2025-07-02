import { Server, Socket } from "socket.io";

import { ListEvent } from "../../../common/src/enums/enums";
import { Database } from "../data/database";
import { IReorder } from "../data/interfaces/reorder.interface";

abstract class SocketHandler {
  protected db: Database;

  protected reorderService: IReorder;

  protected io: Server;

  public constructor(io: Server, db: Database, reorderService: IReorder) {
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
