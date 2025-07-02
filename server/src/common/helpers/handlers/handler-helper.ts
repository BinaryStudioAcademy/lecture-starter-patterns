const insertItem = <T>(items: T[], index: number, value: T): T[] => {
    return [...items.slice(0, index), value, ...items.slice(index)];
}

const findItemIndexById = <T extends {id: string}>(itemArray: T[], itemId: string): number => {
    return itemArray.findIndex((item) => item.id === itemId);
};

const updateItemAtIndex = <T>(
    itemArray: T[], 
    index: number, 
    updateFunction: (item: T) => T
): T[] => {
        return itemArray.map((item, i) => 
            i === index ? updateFunction(item) : item);
    }

export { insertItem, findItemIndexById, updateItemAtIndex };