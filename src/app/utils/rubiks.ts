export const createRubiksCube = () => {

    return [
        ['-', '-', '-', 'O', 'O', 'O', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'O', 'O', 'O', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'O', 'O', 'O', '-', '-', '-', '-', '-', '-'],
        ['G', 'G', 'G', 'W', 'W', 'W', 'B', 'B', 'B', 'Y', 'Y', 'Y'],
        ['G', 'G', 'G', 'W', 'W', 'W', 'B', 'B', 'B', 'Y', 'Y', 'Y'],
        ['G', 'G', 'G', 'W', 'W', 'W', 'B', 'B', 'B', 'Y', 'Y', 'Y'],
        ['-', '-', '-', 'R', 'R', 'R', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'R', 'R', 'R', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'R', 'R', 'R', '-', '-', '-', '-', '-', '-'],
    ]

}

export const getColor = (color: string) => {
    switch (color) {
        case 'O':
            return 'bg-orange-500';
        case 'Y':
            return 'bg-yellow-300';
        case 'G':
            return 'bg-green-500';
        case 'B':
            return 'bg-blue-600';
        case 'W':
            return 'bg-white';
        case 'R':
            return 'bg-red-500';
        default:
            return 'gray';
    }
}

export const rotate = (cube: string[][], action: string) => {
    if (action === 'F' || action === 'F`' || action === 'B' || action === 'B`') {
        const row = action === 'F' || action === 'F`' ? 5 : 3;
        const pivot = action === 'F`' || action === 'B' ? 3 : -3;
        const newCube = cube.map(row => row.slice());
        newCube[row].forEach((_, i) => {
            newCube[row][i] = cube[row][pivot > 0 ? (i + pivot) % 12 : (i + pivot + 12) % 12];
        });
        const itemOrder = action === 'F' || action === 'F`' ? [[6, 3], [6, 4], [6, 5], [7, 5], [8, 5], [8, 4], [8, 3], [7, 3]] : [[0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [2, 4], [2, 3], [1, 3]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = pivot > 0 ? fullOrder.slice(2, itemOrder.length + 2) : fullOrder.slice(itemOrder.length - 2, fullOrder.length - 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    if (action === 'L' || action === 'L`' || action === 'R' || action === 'R`') {
        const col = action === 'L' || action === 'L`' ? 3 : 5;
        const nextCol = action === 'L' || action === 'L`' ? 9 : 11;
        const pivot = action === 'L`' || action === 'R' ? -3 : 3;
        const newCube = cube.map(row => row.slice());
        for (let i = 0; i < 12; i++) {
            if (pivot > 0) {
                if (i < 9)
                    newCube[i][col] = i < 3 ? cube[i + 3][nextCol] : cube[i - 3][col];
                else
                    newCube[i - 6][nextCol] = cube[i - 3][col];
            }
            else {
                if (i < 9)
                    newCube[i][col] = i < 6 ? cube[i + 3][col] : cube[i - 3][nextCol];
                else
                    newCube[i - 6][nextCol] = cube[i - 9][col];
            }
        }
        const itemOrder = action === 'L' || action === 'L`' ? [[3, 2], [4, 2], [5, 2], [5, 1], [5, 0], [4, 0], [3, 0], [3, 1]] : [[3, 6], [4, 6], [5, 6], [5, 7], [5, 8], [4, 8], [3, 8], [3, 7]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = pivot > 0 ? fullOrder.slice(2, itemOrder.length + 2) : fullOrder.slice(itemOrder.length - 2, fullOrder.length - 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    if (action === 'U') {
        const newCube = cube.map(row => row.slice());
        newCube[3][2] = cube[6][3];
        newCube[4][2] = cube[6][4];
        newCube[5][2] = cube[6][5];
        newCube[2][3] = cube[3][2];
        newCube[2][4] = cube[4][2];
        newCube[2][5] = cube[5][2];
        newCube[3][6] = cube[2][3];
        newCube[4][6] = cube[2][4];
        newCube[5][6] = cube[2][5];
        newCube[6][3] = cube[5][6];
        newCube[6][4] = cube[4][6];
        newCube[6][5] = cube[3][6];
        const itemOrder = [[3, 3], [3, 4], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [4, 3]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = fullOrder.slice(2, itemOrder.length + 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    if (action === 'U`') {
        const newCube = cube.map(row => row.slice());
        newCube[3][2] = cube[2][3];
        newCube[4][2] = cube[2][4];
        newCube[5][2] = cube[2][5];
        newCube[2][3] = cube[3][6];
        newCube[2][4] = cube[4][6];
        newCube[2][5] = cube[5][6];
        newCube[3][6] = cube[6][5];
        newCube[4][6] = cube[6][4];
        newCube[5][6] = cube[6][3];
        newCube[6][3] = cube[3][2];
        newCube[6][4] = cube[4][2];
        newCube[6][5] = cube[5][2];
        const itemOrder = [[3, 3], [3, 4], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [4, 3]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = fullOrder.slice(itemOrder.length - 2, fullOrder.length - 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    if (action === 'D') {
        const newCube = cube.map(row => row.slice());
        newCube[0][3] = cube[3][0];
        newCube[0][4] = cube[4][0];
        newCube[0][5] = cube[5][0];
        newCube[3][8] = cube[0][5];
        newCube[4][8] = cube[0][4];
        newCube[5][8] = cube[0][3];
        newCube[8][3] = cube[5][8];
        newCube[8][4] = cube[4][8];
        newCube[8][5] = cube[3][8];
        newCube[3][0] = cube[8][3];
        newCube[4][0] = cube[8][4];
        newCube[5][0] = cube[8][5];
        const itemOrder = [[3, 9], [3, 10], [3, 11], [4, 11], [5, 11], [5, 10], [5, 9], [4, 9]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = fullOrder.slice(2, itemOrder.length + 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    if (action === 'D`') {
        const newCube = cube.map(row => row.slice());
        newCube[0][3] = cube[3][8];
        newCube[0][4] = cube[4][8];
        newCube[0][5] = cube[5][8];
        newCube[3][8] = cube[8][5];
        newCube[4][8] = cube[8][4];
        newCube[5][8] = cube[8][3];
        newCube[8][3] = cube[3][0];
        newCube[8][4] = cube[4][0];
        newCube[8][5] = cube[5][0];
        newCube[3][0] = cube[0][3];
        newCube[4][0] = cube[0][4];
        newCube[5][0] = cube[0][5];
        const itemOrder = [[3, 9], [3, 10], [3, 11], [4, 11], [5, 11], [5, 10], [5, 9], [4, 9]];
        const fullOrder = [...itemOrder, ...itemOrder];
        const afterPivot = fullOrder.slice(itemOrder.length - 2, fullOrder.length - 2);
        afterPivot.forEach(([i, j], k) => {
            newCube[i][j] = cube[fullOrder[k][0]][fullOrder[k][1]];
        });
        return newCube;
    }
    return cube;
}
