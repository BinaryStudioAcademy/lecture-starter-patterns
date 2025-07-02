import { List } from "../models/list";

interface IReorder {
    reorder<T>(items: T[], startIndex: number, endIndex: number): T[];
    reorderCards({
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
    }): List[];
}

export { IReorder };