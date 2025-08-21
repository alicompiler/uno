type Layout = { right: number; top: number; left: number };

export const getTableLayout = (length: number): Layout => {
    const map: Record<number, Layout> = {
        0: { right: 0, top: 0, left: 0 },
        1: { right: 0, top: 0, left: 0 },
        2: { right: 0, top: 1, left: 0 },
        3: { right: 1, top: 0, left: 1 },
        4: { right: 1, top: 1, left: 1 },
        5: { right: 1, top: 2, left: 1 },
        6: { right: 2, top: 1, left: 2 },
        7: { right: 2, top: 2, left: 2 },
        8: { right: 3, top: 1, left: 3 },
        9: { right: 3, top: 2, left: 3 },
        10: { right: 4, top: 1, left: 4 },
    };
    const layout = map[length];
    if (!layout) {
        throw Error('cannot render table with length: ' + length);
    }
    return layout;
};

export function reArrangePlayers<T>(players: T[], meIndex: number): T[] {
    const newArray = [...players];
    for (let i = 0; i < meIndex; i++) {
        newArray.push(newArray.shift()!);
    }
    return newArray;
}
