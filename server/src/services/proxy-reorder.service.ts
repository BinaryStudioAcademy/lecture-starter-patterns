import { logger } from "../common/helpers/logger";
import { IReorder } from "../data/interfaces/reorder.interface";
import { List } from "../data/models/list";
import { ReorderService } from "./reorder.service";

// PATTERN:Proxy

class ProxyReorderService implements IReorder {
    private reorderService: ReorderService;

    constructor(reorderService: ReorderService) {
        this.reorderService = reorderService;
    }

    public reorder = function reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
        logger.log("info", `Method "${this.reorder.name}" has the next arguments: ${JSON.stringify({...arguments})}`);
        return this.reorderService.reorder(items, startIndex, endIndex);
    }

    public reorderCards = function reorderCards({
        lists,
        sourceIndex,
        destinationIndex,
        sourceListId,
        destinationListId,
    }: {
        lists: List[];
        sourceIndex: number;
        destinationIndex: number;
        sourceListId: string;
        destinationListId: string;
    }): List[] {
        logger.log("info", `Method "${this.reorderCards.name}" has the next arguments: ${JSON.stringify({...arguments})}`);
        return this.reorderService.reorderCards({
            lists,
            sourceIndex,
            destinationIndex,
            sourceListId,
            destinationListId,
        });
    }
}
export { ProxyReorderService };