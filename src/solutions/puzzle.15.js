const LINE_SEP = '\n';
const ROBOT = '@';
const WALL = '#';
const BOX = 'O';
const EMPTY = '.';
const BIGBOX_L = '[';
const BIGBOX_R = ']';

const steps = [
    { row: -1, col: 0, sign: '^' },
    { row: 1, col: 0, sign: 'v' },
    { row: 0, col: -1, sign: '<' },
    { row: 0, col: 1, sign: '>' }
];

export function solvePart1() {
    const map = getMap(input);
    const moves = inputMoves.split('').filter(c => c !== LINE_SEP);

    let sum = 0;

    for (let i = 0; i < moves.length; i++) {
        const posOfRobot = findRobot(map);
        const nextPos = getNextPos(map, posOfRobot, steps.find(s => s.sign == moves[i]));
        // draw(map);
    }

    for (let row = 0; row < map.length; row++) {
        const element = map[row];
        for (let col = 0; col < element.length; col++) {
            if (map[row][col] == BOX) {
                sum += row * 100 + col;
            }
        }
    }

    return sum;
}


export async function solvePart2() {
    let map = getMap(testInput3);
    map = doubleMap(map);
    draw(map);
    const moves = testInput3Moves.split('').filter(c => c !== LINE_SEP);

    let sum = 0;

    for (let i = 0; i < moves.length; i++) {
        const posOfRobot = findRobot(map);
        const nextPos = getNextPos(map, posOfRobot, steps.find(s => s.sign == moves[i]));
        draw(map);
    }
    for (let row = 0; row < map.length; row++) {
        const element = map[row];
        for (let col = 0; col < element.length; col++) {
            if (map[row][col] == BIGBOX_L) {
                sum += row * 100 + col;
            }
        }
    }

    return sum;
}

function getMap(inp) {
    return inp.split(LINE_SEP).map(line => line.split(''));
}

function doubleMap(inp) {
    let newMap = [];
    for (let row = 0; row < inp.length; row++) {
        newMap.push([]);
        for (let col = 0; col < inp[row].length; col++) {
            const cell = inp[row][col];
            newMap[row].push(cell);
            if (cell == WALL) {
                newMap[row][(col * 2) + 1] = WALL;
            } else if (cell == BOX) {
                newMap[row][(col * 2)] = BIGBOX_L;
                newMap[row][(col * 2) + 1] = BIGBOX_R;
            } else if (cell == EMPTY) {
                newMap[row][(col * 2) + 1] = EMPTY;
            } else if (cell == ROBOT) {
                newMap[row][(col * 2) + 1] = EMPTY;
            }
        }
    }
    return newMap;
}

function findRobot(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === ROBOT) {
                return { x: j, y: i };
            }
        }
    }
}

function getNextPos(map, currentPos, move) {
    const nextPos = { x: currentPos.x + move.col, y: currentPos.y + move.row };
    let nextCell = map[nextPos.y][nextPos.x];
    if (nextCell == WALL) {
        return currentPos;
    } else if (nextCell == EMPTY) {
        map[currentPos.y][currentPos.x] = EMPTY;
        map[nextPos.y][nextPos.x] = ROBOT;
        return nextPos;
    } else if (nextCell == BOX) {
        let lastBoxToMove = findLastBoxToMove(map, nextPos, move);
        if (lastBoxToMove) {
            const spaceAfterLastBox = { x: lastBoxToMove.x + move.col, y: lastBoxToMove.y + move.row };
            map[spaceAfterLastBox.y][spaceAfterLastBox.x] = BOX;
            map[currentPos.y][currentPos.x] = EMPTY;
            map[nextPos.y][nextPos.x] = ROBOT;
            return nextPos;
        } else {
            return currentPos;
        }
    }
    else if (nextCell == BIGBOX_L || nextCell == BIGBOX_R) {
        let lastBoxToMove = findLastBoxToMove(map, nextPos, move);
        if (lastBoxToMove) {
            const spaceAfterLastBox = { x: lastBoxToMove.x + move.col, y: lastBoxToMove.y + move.row };

            for (let i = 0; i < array.length; i++) {
                const element = array[i];

            }

            return nextPos;
        } else {
            return currentPos;
        }
    }

    return null;
}

function findLastBoxToMove(map, lastBoxPos, move) {
    const nextBoxPos = { x: lastBoxPos.x + move.col, y: lastBoxPos.y + move.row };
    let nextBoxCell = map[nextBoxPos.y][nextBoxPos.x];
    if (nextBoxCell == WALL) {
        return null;
    } else if (nextBoxCell == EMPTY) {
        return lastBoxPos;
    } else if (nextBoxCell == BOX) {
        return findLastBoxToMove(map, nextBoxPos, move);
        // big box to left    
    } else if ((nextBoxCell == BIGBOX_R || nextBoxCell == BIGBOX_L) && move.col == -1) {
        return findLastBoxToMove(map, nextBoxPos, move);
        // big box to right    
    } else if ((nextBoxCell == BIGBOX_R || nextBoxCell == BIGBOX_L) && move.col == 1) {
        return findLastBoxToMove(map, nextBoxPos, move);
        // big box to top
    } else if ((nextBoxCell == BIGBOX_R || nextBoxCell == BIGBOX_L) && move.row == -1) {
        // TODO
        // big box to bottom
    } else if ((nextBoxCell == BIGBOX_R || nextBoxCell == BIGBOX_L) && move.row == 1) {
        // TODO
    }

    return null;
}

function draw(map) {
    for (let i = 0; i < map.length; i++) {
        console.log(map[i].join(''));
    }
    console.log('-----------------------------------');
}



var testInput = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`;

var testInputMoves = `<^^>>>vv<v>>v<<`;


var testInput3 = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######`;

var testInput3Moves = `<vv<<^^<<^^`;


var testInput2 = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########`;
var testInput2Moves = `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

var input = `##################################################
#OO...O#.O...#.........O....#.#...O............OO#
#..O.O...O..#.O#.O....O.O.O#.OO.O....O.#O...OO.O.#
#....O.....##.......O.O....#.......OO#O.O.#....O##
#O........O#...O....O...OO.O..OOO.O.OO...#..OO.O.#
#..O...O.OO......#O#.......O.O..#..OOO.OOO..O.#.O#
#....OOO.O..O#..O...........O....O.O.OO.OO.O#O...#
#..O....#O....OO....O#O..........O..OO.O.O.......#
#...O...OO...O....OO...O.O.O.....O.OOO...#...#...#
#....#.#.....O.#O....O..O.....#.O.O.....O..O#..OO#
#..O..O...O.##....O..O#.OO...OO..O...#O#OO.......#
#.....O....O..O###.O.O#.O...#O.OO...O.#.##O.#O...#
#..O.#.....O.#.O..O.O...O...O#.O...O.O..O.O....#O#
#O...OO#O.....O.OO..O##.OO#.O.OO..OO.OOO.O....#O.#
#.O..O....O.O.#OO..#O..OO...O.#O........O....O..O#
#OO#.OOOO.##........O.......#OO.......O.OO......O#
#..O..##.O.O..O...##..O.O....OOOOO.......OO.OOO#.#
#.O.##O..O..O.#.OO..OO.O.....O..O.O#...O........O#
##....O..................O.....O#....O.O.O#.....##
#..O#....#.....O....OO...#.#O.........O...O.O...O#
#.#....OO#...#..##..OO..OO..#....O....O......O.#O#
#....O...O.OO..#O...#.O.O....O##.OO...O.##.#..O..#
#..O.O..O..#O.O......OOOOO.......O.#O.OO.O...O..O#
#.O.O.#..O#OO#OOO.O...O..........O...O..O##O..O..#
#O....O..OO..OOO.O.....O@O..O..OO...............O#
#..O..OO......##........O.OO.......#....O..O.....#
#O.OO.O.O.......#..#....O.O...O.......#.#.O.OO#.O#
#...O#...........#.O..OOOO..O...#.#.O....OO.O.#..#
##....OO..#.O#OO....O...OO#.......O...OOO.O.O.OO.#
##.....O.........##.O....OO..#....##.O..........O#
#O.#..OO.......#O..#...OOO..O.O..OO.O.OOO...O.O..#
#O.OOOO.OO..........O........OO..OO.O#.O.O..O....#
#.##.O.OOO.........O...O...O.OO.O.#..O#.O...O...##
#.OO#O.O..O.O.O..O..#.O.O...O..O..O....#O.#..O...#
#......O.#O.O.O....OO#.......O.O..OO#O..##.......#
#.OO.O.OOO.O.O##...O#.....O..O#...O.O.O..O..O..O.#
#....O........O.##..O..#.....#..OO#....OO#O..O...#
#OO...O...OO.O.....O..O......O.O..O.......O...O..#
#.....O.O.O......O#..O.O.OO...O...OO...O.....OO..#
#.O.O.O....O.O#.O......O...#..O..O#...OO..O#.O...#
##.O....#......#.....OOOO.OOOO.O.OOO.O..O.O..#O..#
#O.#O.O....O.O.O....#...#..OO......O..#O........##
#O...#O..O.O.O.........O#O.OO...O....O...O.O.O.O.#
#.O.#...O#..O......#.....O..OO#...#.#........O.#.#
#O.O..O....O.....O.O.O....OO.......O...O.O.OO....#
#.#O............O.....##OO..OO........OOOO#O.#.O##
#.#.O..OO.......O...O...#..O..O....O.O......OOO..#
#...##.OOOOO.#...O...#....O...O.#......O.O...O.OO#
#....O.O..O.#...OO#..OO.O..................#...#.#
##################################################`;

var inputMoves = `>^v<v<<vvv<>^^>^<>v^^^>vvv><>vvvv^>>v>^v^v>^>v^^v^^v>v<<^<>v>^><<<<v>v<>^^^^>^^v>^^v><^<vv^><>><<v<v>^><^^^>v^^<>^v<<^^v<v<^^^<v<>^<<v^vv^v<><^<^^>^<>>v<<>vv<vv<^^<><v<<^^<^v><v^<<>v><v>><^^vv<v>>^v>>><^<>>vvv<<>^^<<<^>>^>^><^<v>vv><<vv<<vv<v<v<<^^<<^<<^vv^<<<>v>v>^^^>>vv><^>>><<vv>><<<>>^><><v<v>v^^^<^<<><<>v<<^^vvv<v^^^v>^v<v<><>><<><>vv^<<<><>v^^vv<^<><vvv<^^<^>^<vv<^v^>^<^>^<>><<v><^v>><<<<<>><^^>^^v><<<v>v^v>^^<v<^<<>v^v<<>v>v<<>>^v>>vvv>>v^v><^<v^<<<<v<<<^vv^><<>v<^v^v<^^vv^>v^>v^^>v><<^>^<v<<vv>^<>>v>vvv^>v><v>v>^<>^<><^>^^v<<>vv>v>>^^v>>^v^><^v<^><>>^v>v^<^>^v^>^<<>>^^v><>v<>^^>>^>v^<^v<v><<vv<^^^v^vv<^^>^^>v>vvvv><vvvv>v<<>>><v><v^^v>>><v>>^><v>>>>^v>^>^vv^<><>><><^v^v>^>>^>^><vv>^v><v^v^><<><^^v^^<v^vv^^<v<v^vv^^<><v^<<>v<><<^<>>>v>>><<<^^vv^^>^^^^v>^vvv<<<>>^^v^<<v^<><<<>>v>><v<<<>^>v^^v><>^>v<^>><^^vv>^^><>><^<>><^^<v^^><>>^>^^^<<><<vv><><v<^v^>^vv<^>><^^vv><>^>^>><v<>>v<vv><><<vv>>^^vv>^^><v^v^<v<^<<>^v<^^vvv^<>^>v^v^<<v^^v>v^>^<vv>^v>v>>v<>><<v^v>v<><<^^<>^>>v^^vv^vv<^>><
>^><^<vvvvvv^<>>^v>>^<><vv<^v^<<v^^>^>v^>>v^vv>v<v^<>^<>v^v<<^^<v>>v>v>>^^v^^v^>v<^<^<>><^^v^<^<>^<^<v>>vvv^>>^>^>><>^^<v>v<vv><v>^^<<>v^^^><>>^<^>v^^<<>v<<v<>^^<<>^^v^^<<^>>^v<^<><v>>v^vv>^v^><^<<<vv^><>^^<<vv<>v>^>vv^v<^^v^^^<^<vv<^v>^<v><v>^vvv^vv<^v^<><v><>^^v^>><^v^v><v<^v>>>^><>><<<vvv<^<>^^vv>v<vv<vv>><^<<<>>v^<>><><vvvv<^>>v<><<^vv<>^<>^^vv<><^<v>>vvvvvv>>>>>v>^>v^^^<^v<><^<^v>v>>vv<<<^<>vv^<v><>>^<v><<^<<^<^^>^^v^<v<^v><v><v^^^>v>v^><^><^^^v>>^>^><<><><<^<>><<vv^<v^<>^^v^v<><<v<vv^^v<v<>v<^^^<v^<^<vvv^vv<>^>^vv<<<^<<<^>^^vvvvv<<v>>v^>>>v^><vv><><>v>v<><v^vv^<<vv^<>v<^^><v^^<<>>^v<^^>v<vv<<><><^^^v<^<v><v^>>v>v>>v>>>><v>v<v<><>v^<>>><<><<<<>>^^^^>v>v^>><vv^v^><v^>>^^>v<vv^><v^vv^^^^^^v<<^^^^>>>^^^>v^<<><^<<>>>^^<^>^<^><^><>v<<<^^^>^<^<^vv>>^>^>vv^<<^<v<>v><^^<>vvvv>^<>>>^<vvv^v^>v^^^^>v^vv<>>v><^v>>>v>^^vv<^v>^v><>^><v>^<>^^v<^^<>><^^v<^^>^v>>^>>v><><^^>>>^vvv>>^v<>^>>^^><v>>v><<>v<><<v<<v<vv^<>^v<^>^v^vvvvv<>^^v^^vv^^<<v<<^^v^^<<v<^^<^v<v><^v<^><v^>^^^vv>^<^^<>>vvv^>^v^<v^vv<v
<v<v>>v<>>>v><<<^v>>v>>^vv>v^<^^<><v>^^<>vv^>>^>>><v<<>v><<<<^v>v<>>>v>v^v^v>^^<^v<<^v<><<<^vvv>^<>>^>><>>v<v<v<v^><v<<^^^vv<^<>v>v><<v^v>^^^vvv>>vv<<><>^v<<<^^^>>>>>^v>vv<<<^<^<<^v^^><^>^^^^vv<v<<<v>^v^v>>>^^>vv^^<v^^>><^^<v>^><v>^v^v>^<>^<^>>>v>^^v^v^><<<v<>^v<vv^>v><v>>>^<>><<><<^^<<>^^vvv^^<<^><vv<>v<><><^v^<^>v>v<v>>>vvv^v<^<><<v<vv<v>>^^<v^v^^<>><^<<^v>v^^v^v^^>^><>^^^v>vvv>v<>^v><^^<^^><>>vv^>v<^^v<<<v>>v>^<vv^<^^v><v^^^^^<vvvvvv^<>>v>^v^v><v^^><><>>^v>^<<<><<<<^^>^<v^<vv^>^^><v<^^^<^<>>v><>^v>^<<^vvv^^<^^v^vvv^>v<v<>>^^^^>><^>>^^<^<vv>^><<v^<v<>^><<><<>vv<^vvv<^<><<v<v^^<^>v<^<^v<v<^^<^>^<v^>v>>v>vv<<><vv^^v>>v^><^vv<>v<^^<>^v^>>^>v^<vv>><>^^v><v^>v><<^<vv><>><v>^>^^<v^>>><v><>v^^v^>><^v><<>^^^v^vv^>v^^vvvvvv>^>>>^><^>^>vv<v><v^<v<v>^^v<<^<^<v<v>>>>^^^^>^vv<>^vv<><^>^>^^>v<<<v<>^<<v>v^v^>v>>><><^>vv<^<^^>>>>^vv^^v<vvv<>v><v<vv<^^<>v<v^<^<<^^<vv>><<v>><vvv>^^<<^^<^v>^<^^v>^<<^v>><^<v<>v<^v<v<^vv>v^<>>>>>^vv<><<<>^>v>v<><<v^<^v^><>v^<>v<^v><><>v<>>><>^<^v^<v^^<^vv<<v<<<^vv^^<>v>^
<<^<<<<<>^>v^v^vv^>><<vv<<v>^><<vv>>^v<^v^>^^^^v^>v^<v>v<<^^^v<^>><v^vv<vv<>^<>^<^<v<><^^v><<>v<v^>^<vv>v^<^<>^><v>^^^>>^^>^^v<>v<>>v<^v>v<<>^><vv>>>v><vv^vv<^<^<<v^<><v>>v^<<v><<^>>v<<^<^<>><><<^>^>>^<<^^vv^v^>^^<<>^^v^>v>^^<>>^>^>^>^^^^<^vv<^vv^^v^^>^^v^v^^v<^>v>^v<>>><>^>v>>^<^><v<^v<^>^<vvvv><v^<^><<<^v^^^<>v<<>v<<v<<vv<v<<^<vv><^<vv<>^^<><><>>vv^<^>vv<>^<^<vv<^>v>v><^^>>>^<<<^<<<^^v<><vv><v^vv>v>v^><><>v>^><v^^v^>>^>^<<<<<>>>^>><<<<>>v>><^^>>>^v<>vv<^vvv^^<>vv^><v<<<v>>^^>^>>^^>^^v^<vv^v>v>>>v^^<<v><<>><vv>>^>v<^<^vv>v<v<^<^<<<v^<<v^<<>v>>vvv^>>^>vv<^^>v^^>^><v>v^<<v^^>>^v<<v>>>>>^v<<^>>>v^^v^v^>vv^^<><^^>v>>^<v^^v>>^vv<vv^^v<<v<^<><>>v^^v><<<>v<v<>>>>>><^^<vvv<<v^<>v>^v<v^^>vvvv^v^v><<^>v>>v^v>^^^>v^<v<v^<<v<>>v<<^^><>^<<>>><<v^<<^>v>^<><^^>^><v^<v>vv>^>^^^^>>v<v<^><^v<v^^<>v^>v^><^<v>>v^v>v<<<>v><^>v^v<>vv>^<^<<v<<^v><>^vv<>v^v><vv><><<^>^<<^>><>v>^>>v^><<v<>>^^vv<^><^<^v<<v^>><^^^><>v>^<><>^v^<>>v>>^>>>v<^>v>v>v<^>v>^^^<<<>^<>v<^^<<>v>^<<v^<<vv<^<v^>vv^>>>^vv^^>v>>v>^><^v^>v<v>
<<^>v<<^>>><<v<<^^^<>v^<v>><<><>v>v<<vv<>v<>v^^v^^vv<><^v>^>^<<v^^^<<<v^^^><^^<vv>v<^<>^<>>>v^^v><v><<<>^<>>v^v^<<v^<v^^<^^><<<v<>^>>v^^v>><>v^v<><^><v^<v>^vv^><<^^^v>^<^v^>^>v<<^>vv<>vv<v^^>^><^v>>v>^^v><<<^<^<vvvvv^^v<<^^>>^vv<vv^<<<^<<v>^><>>>>vv<<>v>><v^v<v^vv^^^^>vv>^v<>v^^vv^^vv>^<<>^<v>><v<vv>vv^^^<^^vv<^<<<vvv<<^^v<vvv<v^><^<^^vv<<>v^>v^^><vv<>>>>v><^^v>v<v><v<^><<v^v<>><>^>^v<^<^^vv>^v^<v>>>v>^v>^^><^><v>vv<<^<>vv^>^^>vv>^v><v<>v^v^v><<>>^>><<^<<<v^v<<^>vv<v>v>v<^^<>^>>>^^^v<>>^<>^v^<v<><<v<v>vv<<><>v><^^<>vv^><<><>v^v^^v^vv>>>><<<vv<<>>v<^<v>^<^>>v<^v>v^<<>^>>>>><<><^^v>>>>vvv<v^<>>v^<^>^^>v<<><>>v>v^v^<^<>v>vv^v>^<^^<>^vv<><^v<<vvv>>^v<v<^<<>v<^<^<<v^v<^v>^<<>v<>>v><<<>^<vv^v>><^^<^>><>>^^v<<^v^<^<^vv><^<^vv^v<^>^^v<v><^^<vv>v>^>^v>>vv^>^>^<><v<<v<>v^v^^>^^v><^<><v>>>vv<<<>><<v^><^v<v^>v^<>^v^<^v^>^>>^v^<^v<>^<>v<v<v><>>vv<><vvv^^v>>^><vv^>^vv^<>^^v^^>v<<>^vv><<^^<^>vv>v^<>>v>vv^v^<>>>^>v^^<<><v>^>^^^v><v<<<^v>^>v^^>^<<v>^>^<>vv>^>>^<><><v<^^>>vv><^^>^^>^>^>v^^^<<>^>^>v><v^^
v>v^<vv<^>>>v>^^^v>v<><^v^^<<<<v>vv<^^vvvv^<^^<<v>^>>^^<<^vvv<^v>^<v<^^^<v>>>v^^v<v<^v>v><v<>vv><>>^^><v<<>^>^>><><^v^>vvv<><^v^v^><<<>v><vv<v^^v>^^>^<<^<<><>>^>^^<<v<<^>>v<>^<^v>>><^<<>v<vv>vvv>><v>^^v^vv<<<>><><vvv^<^><^^<<>^v><<>>^>^<vv^v<^v<<v^vv<>v<>>>>>^>v^>>v<<><<v>vv>>v^><^vv>vv<><><v>^<^^^>>v<<>><v^>>>v^v<>^v<v<<vvv<>>v<vv^v<v<<^^>^><>^^><^^><^>>^^vv^>v^>^^><v>^v<<>vv><<vvv>vv^v^<vv><>><<>v><vv<>^><vv^>^^^^v<><vv<<^<><<<vvvv^<vv^v^><>><^^^><<^^^^>><v^^v^<^v^v^>>^vv>>^^<<>^^^v<v^vv<<^vv<>v<vvvv>v>>^>v<^<v<vv>v><^>vv<v^<^>>v><<vv>v><><^<^<^v<<^<>>^^>^<^><>>>^^vv^v<v^><>>^v>v>>>>v><>^<^><><^v>><v^vvv>^><^><>>^^<>>^>>><^<>vv<v><v^>v^^^>v<><^<>v^v>>^>>^v>>v<>>>v^^^^^^<v^>vv<<<^><<vv>^>>v>><v>^^v>><^vvv^>v>>v><^^v^^<^><v^<vv><>^v>><v^^v^^^<vvv>^<<^<<>>vv^^^v^<<<^v<vv>v^^>><^<v^>>^<v<>>>^<>>^>vv<>v^^>><>^<v><<v<^<v<>vvv><^<vv>v>^^>^<vvv^^^<>v^<v<><<v>><><vv^v><v>^v<><^<vv><<<vv^>^^<<vv><v>^>^^v<><><>vvv<^^v<<<<<<<<^v<><v<v><<><vv>v>>^<vv^v^>><<v^>^^>v^>><v^>^^v^vv^<vv>^>v>v<v><<><<<<
^<>^^v^^<^^<>v<<<<<^vvvv<>>^vv^><>^vv><>v<^<>>v^v^^<><<v<v>v<<v<>>^<v>>v>v>>v^v<v>vvv>>>^^>><vv>v>v<>><<v>vv><<<v<<>v<><v^vv>^>v>v<^<>v<<>vv^v<>v<v^<<>vvv>v<>v<><<v^>^>v>>>>><>>v>v>^v>^^><v^<^<^v<vv<v^v^>^v^v^<>><v>>>><^^^>>^><<<<<v>^^<^v>^<^<^><^>>^v<>^>>><><<vv<^<<>^><>v<v<><><v>vvv<vvv^><><^><v^>vv^vvv<v>vvv>^><<^^>^>>v<^^<<>>^>><v<v^v^^v<^^^<^vv>^v>>>>><>>><v>>^v>>vv^v<<<v>><v^^<<<>vv<^v^v^><<>v^^v<^vv^v>v^<<v><>^vv^^>>vv<<>^v^^<^<v<>^^v^<^>^^<^<>^^>v>^v>^<>v^^>v<v<^>>v^><v^^v>v<^vv<<^^^v^><><v<vv>v>>>v<^><^>>^<v^<v>>v<^v<>^^^><^v>vvv^^<<>^^<^v>>>>><^^<^>>>v^v^<vv^<vv<<>^v^<<v>v^<^v>vv^^^vv<><^>^^v<>v>v^><<v^>^v<v<>><<^^<vv>>>>v><v^>>v><>>^vvv>vv>><<<v><^>^v<><^v>^>>>>>^v^<^^v^<>v>^<^<>vv<v>^^<v>v>><^vv<vvv>vv<^<>^>v><>v^<><>vv<^^vv<>^v^^>^^^<v>><v>><<>^<<<v>v<<vv<<>v>vv^^v>>^>^><<<^<<^vv<^>^>v^>v^vv^v^^<^vvv<^v^><^^>^^^^>vv^^^>>^v>>vvvv<<^vv^<v<vvv^<^<^v<^^><>v><<<<v>v><>v>vv<v>^v<<^<^>>^v><v>>v<v>v^v<<><^v<^v><^v^>v><><v<^^>^>^>v<>v^>>^^vv><^<>>>vv>v>v^^v^vv^^<v><^<<<><<<<v>><^^v
^^^<<<><v<vvv>v>>vv^>^v<v^^><v><>vvv<>vv<^vv>^><v^>^<>>>v^>v<^><<^v^><^<v<<^<^^>v<<^vvv^^^<<<>>v>^^^<<^>v<vvv<v^^<^v^vv>>>v^^v^^<vv<>><<>v<<>v^>>^>><vv^v<v^>vv^v<v>>^<<v<vv>v<v>^v>^v>^<v^<>vvv>v<<v>v>>^<<v^<<>v^v>>><>vv<<<^^>vv^vv<vv^><v<>><^^^<v^v^<><><^^<^<<>v<<vv>>><<<<^vv<^^v>>v>^vv>^^v^>^^>><^<^v^<<v<><vv>>^^^>>^vvv><^>>v>>vv^<vv^v^<<>^^><<v<^>>^<^><><>^<<<>>vvv<v^v>v>v>v^<<^vv^<^^<<^v>><<<^v><>^>>^v>^>v^>v^>^<>><<<<<^><v<<>><v^vv<><>^^>><^<^^<v^vv>>^vvvvvv^<^<v^<v<>v<<<>>vv<<>>vv<><<<>>v><>v>v^^>>><vv>>v<^><v<<vv><vvv<v<v>v^^>>v>^^>>^^<<v<><v^>v><><^<^^><^^<^^vv^><^>>^>><v^^v>^<v>^^vv<^>>>>>^<vv<>^^^<^<^v>><>v^<<<v^v><<><v<<^>v><<>^<<<vv><>vvv<>v>v<>vv>^>v><v<v^<v>><<vv>v^<^v^^^^^>>vv>v^^v^<>^><v^v^^<>^>^<>v<>>^^>^><<<v>>>v>^^>^>>^<<>^>v>v>v<<<><v><<>^vvv^vv>^><v<<^<<<><<^v<<^^><v<^<>^>>^^v<<v>vv<v<><^^>^^^<>^^^<><v><v>vv<<<><<^<<<v^<<>v<<>^><>>>v>v^v>v<vvvv<v<^<<^>^v<><<v><<>^^<>><>><^<^v>v^^<>>^^><^<vv<<v^^>vv^vv>v<^^><vv<vv^<<>vv^v^^><>>>>>v^<v<^<<<<^<<<><<^^v<^^><<>v^>>v<v>v>
><<<<<<>>vv<>>v>^v>^v>>^><v>^^^>v<>vvvv^v>^^v^^<^v><<<v>>>>>v^>>^v^v^^>>^>^>>>>^>^>^<<>v<>^v^>>v<^^>^><><<^><><<^^<<>>^>>^>vvv<<><<>v<>>>^^^v^^^<>><^v^^>v>v^^><<<>^>vv^<vvv^<>^v<<><<<v<vv<>v>v>^^>v<v^>v>^>>v>>><>v>v^>v^>^>>><>v><^<>v><^v<<v^>v^^^v^^^^^v^v<v^vv^^^^<^^>^>^>>vv><<^^v>^>^>>^<vv<v<<^vv^><<vv^<^><^><^^>><^>v<v<^<v<vv^>v>v<<>^^><><>><vvvv^>>v<<v>v^^^^^^<v<<<v^v^>>>^v>^vv<v^^^>>>v>v>^>v^vvv^v<vv>vvv<>^>>vv>^^v<>^<>v<v>vv>><<>^v^>v<<>^<<^>vv^v^v>>v><vv<v<<<v<^><^<^<>vv>><><^vv<v^>><>v>vv<^^>>v<>>^v^^^<<<>v<^<<^^v><^v>v<<^v^<v><<><>^<<<><>v^>^v^^^vvvv^^v>>vv<vv>><<>>^>v>>^>^><^v<><v<<<<v^v>v>>>>^>^><<<^^v>vv<>^>^<^><<^>>^<vv<>v>^>>^<<^v<><^<>><v>v<>><>v^v>><^^^^^^>^vv>>v^v^^v>>^>>>>v^vv<>vv^>^>><>>>>>v^^<^>>^<>^v^><><><v<<vvv^^<v<^<<^<^<<v<>vv<^<<v^<v><v>^^<v>^><<>>><>>v>>v>vv<>>vv>><<v<<>^<v<v>^v^v^^v<v<<vv<^>>><>>^vv>^<vvv<^<^v<v^<^<vv><>^>>>>>v<v<<>^<<v<<^^^v<<^vv<^<v>^<>^<<<v<vv^<^^v>>^<^^<<v><><v><<vv^^v^^>^<vv<<>>><><>^^vv<vv>v<vv><<<v^>><>^<^vvvvv<><<>vv^<^>><v^>v>>><<<v<
v<>>v>>^^><<<^<vvv^>^<>>v^>^v>><<vv^>>^><^v<><>^^<<<><<^>^vv>v<<^>v<<v<>>v><<<^>><<<v^v<^<<>^>>v<>><>>v^^^>>^>^>^<^v^v>^^^<<>>^>^><^^^>v>^^^^v^>>>^vv^vv^^^^v<>^^<>^^>><>^v>v^v<<><^>>vvv^^><<<v<^<v>^>>v<<v<<v<^>>>>^^^<v>v^<><vv^<^v^v<>^^^^>^^v<>vv<vv>>>vvvv^vv>^>v>^<<<v^>><^^<^^^><><<v<<>>v>^>v^^<<>v^v>^>^v<^^>^>>v<<v>v^<>^v^<<v<v^>>v>v<vv^<^><><<^<><^><^<<^^<><>v<^^^v<^^v<>^^>><v>v^<v<v^>^<v>^v<<>^>^^<^v^>><><>>>>>^<>vvv^<v<v^^v^^^>v^^<>>v>>^><<><^>v^^<<<v<>>v>v^^v^^<<<^^<<v<^<>v>^^<^^vvv^>^><>^<<>>^^<^>v<<<<<^<<>^vv<^<v^<<<<>^^><<^^^<vv<vv<^v<>v<>v<>><><vv^v^>^<vvv>><><<<^<>v>^v<><>>><v<>^v<vv<^^>^<v<v^<v><><^>>^v>>^vv<<^>>vv^<<vv>v>><v<><>>^>v<v<v>v>>>v^<>^<v^<<<><v<><<>v^^<<<vv<<><^v<<><<>>^^<^^<^<><<>vv<<^>>^^>^v^v<^vv^>^v>^vv^<v<>^^<>>v>v<v<<^>^^^^^><><v<><>v<v^>>v<>>^>v^vv^<<<<v>^^>v>v^<^v^v^<<>><v^v^v<<>^>>>>vv<v><<^v^vv<>^>^v^^<vvv>^<^>^<v^>>vv^^>vv^^v<^^<^<>^^<^vv>vv>v>^v><^>v>>v<v<><>>>><v^<v^<<v^^v^^v^<^>v>^vv^^v^>^>>vvv^^<v>^><>vv><>^>>v>v><<^>>^^^vv<vv><<v<<>>vvv<^<<>><^><
^v>vv^^<v<<>^^>^v^<vvvv^v>^^^v^<<^>^^v>>^>^^<<vv>vv^<vv>>vvv>^<v^^vvv^^v<^<^^><<><>^v<<v>v>>^v><v>>^<^<v^v>v^><^<><v^<<><^>vv>v>v<<<<^<v>v<>>^>^>>^<<^<^^^>^vv^<<<<<>^v<<>v^>v<>^<^<v<>^<>^><^^>>^><v^<<^v^v>^<>^^^v<<<<^v>>>v<<<v<<^^<^><v>^^<vv>v><v^v^v<v^v^^v<v><>>vv<<v^^<^^>>^<>>^^^vvv<v>>^>vv<>><^vvv>><vv<v^>^<^<>vvvv^<^^v<><^v^><><<v<>>^^<>><^<<<<<>vvv^<v^^<vvv<<><<^vv<^v<vv^<^<<^><<<^><^<^<vv>vv<<<v^<>^<<>v>>^^>^v^>^>^>>v<>^v^v^v>v>v<>v<v><<v>>v<<<^><v^>>v>^^<<^^<><v>v^<><^v<v<^^v^<>>>>><>^^^>^v>>^^>vvv<>>><>^<v>>>>v<^^<v^>^<>>><<<^v>v^<v^^v^^v<v<<<>vv>>^>>^vv^^>>>^><^^>>>v^^^<v<<^<<^>><>^<^<<v<<<>^^v<^<><>>vv>>^<<v^vv<^^v<v^^>v<^>v^^v>v>v<v>>v<<<^><><><^><<v><v^<<^v<^>^>>^<<^^v^<>^<v<>vv<>>v<^><^^^v<v<<><<vv^<<<>>^v^^^>^vvvvv^<<>v<<<vv<>v<<^<^^^<v^^<>^>^<v>v<vv><^<^^^v^v^<v^<^<v<>^>^^v<<>>^<>^>^v^<>v>v^>v><<><v^vv^<<^>^<vv>><>v^<v<^v^vv^^^><>^^>>v><v>^vv<>v^<<<<>v>v<v>>>^v<>^>^<^>^^<^<^><<<v<><^<v^^<>>^<><v^^^v^<<<<v^^><<^^^v^^^><<v><<>v^^^<v^<>^<<<^^v^^<v>><<<<v<v^v^^<<v>^^v<>><vvv
^v<>><v>>^^^<<^v<v<<^>^<^^<<<v<v^><^^vv^v^v^v^^>>vvv^><vvv>>^^v^^^^>>>>vv>><><v><>vvv^<^v<^v^<^<v<^><v^>^<<v<<v>vv^^^^v^^<v<vv>v>^<vvvvvv^v^><<v<<vvv^^<^>v>v^v<><<v<>vv<^v^v><v>>^><vvv>^><^>^><^>v>^<><v>v<v><^^v>>^^>>>vvv>vv>>v<v<<<>vv<<>^>^><vv<><^<<^vv^vv<<vv^v^vv<v>>v<<^<^<vv^^v<^^v^<^v>^^v>^<>>>vv><^<^<^>>>>><<>^^v<v><>><^^<^v<>v<^<<>v<v>^<v>>v<<>^<v^^<^v^>>v<>^>>^<^>>v>^<v<^<>^<v<^<^^^<<>v<^<<>>vv^<v<<>^<v>vvvv>^<>v>>>v<>v^v>v^<^<^>vvv<><>^>^>^^<v^<<>^<v<vv<^^<<>v<vv^>>^>vv^><<v><<><^><^><<^>v>vv^v^>>>><<vv>>>>v^^v>v<^v>v^<^^^^<<>^<>v>>^>>vvvvv>>^v^^^>^>><>^<<>v>vv<<v>^>>v<v><^v>^>v^<>><>^v^v<^<>^<v>^>v><>^vv^<vv><v^<<v<v>>^>><<><><v<^>>>^vv^<v^<vv<^^>^><>^vvvv>>>v^^>^<<>^<^v^vv>><>>>v^>v<<v>^^v>>>^>v^<vv<<v>^>>>><>^>>^^v^v<>v>vv^^v^v<<v^^v^<^v>^^<v>^<^^<>v>vv>^^<>v>^>>v^v>vvvv>^<vv>><>>v>^<<<>v<<<^vv^<<v>v<vv^^v<v^vv><vvv<<^^^^vv><vv>v^v<vvv><^>^^v^^v^v<<><<^>v<^v^^<v^><v>>><<<v<^<^<>>^^><vv><v>>^<v^^<^><><^^v^<<<v><<<^<v<^^v<^>>^vv^<><^v^^<v<^<v^<>>>>>^v>v^<<<>^^>>>><>><<vv<v>^<
^>>v>^><<^<<v>^^^v^<vv<v><<<^>^vv<>>^><>^>>v^^v>v><>v^v^^<<v<>><v>>v^<<>^^><>><><>vv>^^<^><<^>v^>^>v^^<<^<^<<<>^v<v^<^^v<>^v<>^>>vv>v><>v^<><>v<vv^v<>vv<^>>>^v<><^<^^^<v^><v^v^^<<^^><>v>><^v>v^>^>^v^v<>v^><>><^v>><^v>^<^<^vvvv<<<v^v<<v^>>v<^^>^>^>^<vv^<^<v><<<^v><>>><^^>>><>^^<v<><<<>>v>>><<vv<>^v^><><<<<v^v<>v><<v>>>><v<v><>v^^^^^>>v^^<>>>vv^v<<v^^v^^vv<v^v<^>vv^>v>v>>>^<<^^^<v<v<^^v>^>^<v<>^v^<<<vvvv<v>v>>^<^vvvv^>vv<vvv<^>^v<^^<>^v<^<>^^<v>^^vv>><>^<v>v><>vv>v>><<>v><>>^v>v<^^v^><<v><^v>vv><><<vvv^v>^<<v<^vvvv>^><>v^vv>^^v<v>^>>v>^><<^<v<<>^>v><><^<<<>v^<><>^v<^^v>>^<>>>>^^><v^<><<>v<^>>v^^^<>>^<^^^v^v<>^v^<^v<>vv>>^^v^v<v><^^>><<><vvv^>v<<vv>v>v>vv>^<<v^vv<^<<>^v<v<vv>>>vvvv<^^^v>>>>v^^<v>>vvvv<^^v^<<>>><^<>^v>^<>^v<<<v^<v^<^>>^v^<<v<>v^>>>v<<><^^^>^<v<^>vv^^<<v<>vv<<<^^<<>>^><<<<v^^<^v>v^^^>v>v^^>v>v<v>>^v>>^><<<>^<><>^>>^^^>v><v<>>^<^^^><>^<^v^v^vvv>v>vv>vv>>vv<v<>^>v>><v>><<^vv<<>>v<<<^><v^vv>>>v><<v^>^<v>v><<>><^^v>>^<v^>^<^<^v<<<^^<<v<>vv<vv<<v>^v><vv^vv>>v<>v^vv><<<v><^<v<>v<
<><v>>^<>vv>v><<^v><>vv<<><<<><v^><v^^^>>><v^^<>^^<^>v^^><v^<>>v>^>>>>>^<^^^^<<>^v^>vvvvv^^^<<v<v>><<^>>>vv^v><><<^vv<^^^>^>>v<<^><^><v<^^>v<^^>vv<<<<^v>v>^v^vvv^v<^v<<^>^>^vv^<><<vv>v<v>>v>>v^^^<^^>>v^<^v>^v><^^>^<^<>vv<^>>v^^<vvv<vv^v<vv<vvv^<vv<v<>^v><^>>><^>^^vvvv<<^v^vv<<<>v>v^>^>>^^v^>^>v><v<^v^^<^v<<<v^vv<v^>v<^<^>vvv><>v>><<<^<vv^><v^<<^<><>v^^>^^<vv^vvv><>><>vv<^<>>>v>vv<^v<v>^>^^^<<^>^><^>v^^<>v<^v<v^vv>v<><^><>>v^>v><v>^v<vvv^<>>^<<^<^^vv>>>v<>^v>vvv^vv^^^>^vvv<v^v>^>v^v>^<v<>^>v>v<<<><><>v<^v><vvvv><^>v<><v>vv<<vv<<^^^v<>^^^>>v><><>>v<^^><^^<v>>^^^^>v<^vvv<v^<><<<v^^<<^v>v<^^>v^<>vv^<v><^v>^^v^vv^><>^v^^^^>^^>v^>v^>v>v>^><^><>v^v>>v><>^><v<><v<><<vv^v<v<<<^v<<v>v<^v^<>^^v<<v<^^><>v^>>>vv>v^vvvvv>><v>>v<<<v>>^<<^><>>^>^v>>v><v><^^v^><>>^<v<>^<vv^v>^v<^<v><>v^^^<v^<<v^^<<><<v^v>^<^v>>v<v>vv<v>^^>v^v^>>vv<><>vvv>vv>><^><^>^vv><<^^>>vvvvv<<<v^^<v^^vvv>>>^^^^<^>vv>^vv<>v^>>^<v><<<^^v>^>vv>vv^>vvv^^^^<v>>>>v^vv^^>^>><>>>>><<^vvvv>^vvv<^<^^>v^<vv<v><<<^^>^v>><^^v><^^vv<^v><v>v^vv>
v>^<<>vv^<<<^>vv^<<v>^<^<v<>^<><^^<^^>vv><vvv<<v<v^<>><>^<^><v>><v><>v^^v<>v>v<>>^^><<vv<>>^^<<<<v<^<>vv><<v^vv>vv^v<vv<>v<^<^<^^^^vv<<v^^v^v<v>><><<<v><v>>v><^v^>vvv<><v>>vv^>v^<<<v<>><^<^^v><<^<^<>v^v^^>v^<^>><^>v>v>><<v<<^^>^^>>v>><<<v^v^^>v^v^^v<v><v^<<>>v^<<>vvv<>^<v^><^v>^v<^v><<^<v<<<>v^>>^>v><>v><^^<>>^^<><<<v<v<<>^><>>>>>vv>>>>>v<vv>^^v^>^><vv>vv^><>^^<vv^v^v>v^>vv^<>><>^<<><vv^<><>>>^>vv^<>>vv><<v<<vvv>>v^v><v>><<<>v>v^v<><<<^<^^v>>v<^><v>vv<<vv<v^v><<<vv>v^^<v>v^vvvv^<<><v^v^<<^v<<>>vv<v^v^^>^>v^<>><<<v^^<^^v<<v<>^^>><v<<^v><>v>v<><^>^^^<v<<>>v<^<><>vv^<<>v>v<vv<v>><^>^v^<<>^<><>>v^^<<>>><<v><<v^v>>v<v<<^v^^^v^^v<<<<^v>^^><><<<>^v<><<vv^^><v<<v<^^vv>><v>v^v>><v<v<v^><^^^^<^>^<^>v<^<<v^^^>v<<v><^>><<><^<^>>>><v^^<v>><<^<^<^v>^<<<v>^>v><v>><>^<>^^>>v<<v^^^<>^^>>>>^^^vv>vv^^<v>v<v<^<>v<v^<^>^v><v><<vv<>>>><<>v>>^^<>><>><^v^v>^v^^<<<^>v<><>^>>vvv<^^<>>^>^v<^<<<><<v><<^<<^^^vv>vv<<<>^<vv^vv^<v><>^><<^<v>v<^^^<^>^v^v>^<v<>>v<vv^><>v>>^v<<<^vv>v>>v<<<^<^>vv><>v>>><v>v<>v^><><^v^^^<
<>vv<><^^><<<<>v^v>v<v^v<^<>vv><^>>^^v<vvv>v<v^><v^v>v>vvvv^<^vvv^vv<>v^^>v><>v<v^vv>vv^^vv<<<>vv>vv<<^v<<^><>v^<^<vv^^^^>><<^^v<v^<<>^v<^^^v>>>v<^^^v>^>^<<<<v<v^^>^v<>>^>>>>^<vv^^^^>v>v>v<^<<v<<vv><>>vvv<v^^>^><>^>^v>><^>^<>^v^^>^^<^<^v<<v<><<>^<v^vv>v<v<v<<v>><<<>vvvv^<^vv<v^^>>><v><^<^<^^<^>^<<>>v>>^^>><v>>vv>v^^v^>^<>v><>v^<>^><<^^><>>^><<v^<^^^v>^>v^<^>vv>>vv^>^vv<>>^<<>^>v<^vv<<>>v>v^^^^^v^v^^><vv>^^^v>^vv<><>^>^>v>^v^<v>v<<><^<<^<v^<<^vv^^<>vv><vv^^>^v<<>v^>vv<v><v>v^>^^>^^>v<v^^^<v^>^vv^>^<v^>^>v>v<<^v>^<v<^>^<v>vv^>vv<>^>^<^>vv>vv^v<^<>v><><vv^<^^^^vv^^<<v^v<<^>>><>v<>>^^^>^<vvv><^^v>><><v<<^^<<v>^^<v><^>^><^vv>><^^>^<vv>>v>><^>vv<<v^><^><<>v<>^^<^vv<<>v><>>^vvv>v><>>^vv>>vv<<^^>v>v>>vv^<v><>v^<^>>>vvv><v^^v^^vv<^<v<v^>>^v<^^<>v^><vvv<v>>>>^>^^<><v^^>><<<<v>^v<v^vv<>^vv<>^v>^^^v^>^vv^vv<^><<<<v<<vvv<>^<^^<<^>vv>^>^vv>vv<^^<>>v<v^v>v^^>>vv<^>^<^>v^<v><v>^vv^<^^^<<^^v>>>>>^<^vv>^^>^>^^>>^<<vv<^<<>^<><v>v<>v<<^^>^>^v^<<vv^vvvv<^>>><>>vv<^<v^<>^^v<<^<<<^^^^<><<v><v>><<<v^<<>>v>^><
>><<^<<<<><^>vv^>>vv>^^>>^v^<<^^v>v<>v<v<v^><<^><<>v^><>v^<<<v<<<<<^>^>><>^v>>><<<v<^>^>><<v>^^<^>v>v<<vv><v<^<>^><^^v^^v<><vv^>><^v>^<<v><vvv^<^<<v<>^^vv<>>^>v<>^><^<>vvv<^>vv<v><v^v^^v^>^^>v<^>^^<<v><>v^<^v>^><><<><>><^<v<v<^v<vv><^>^>vv^<v>^><^>vv><><>vv<^^<>v>^<>vv<v^v>>>v>v^><^<><v>^v>v^v<^v^v>>>v^vv>>v>^vv^>^>><>>^^v>^v^^^^<v>><^>vv^<>><<^^v>^v<^<<>^v^<><^>v<<^<^>>^<>><>^^^vv^v>vv<>^>v<>v^v^^^^><^<vv><<^>^><<^v^^^><>^<vv^<^><v<v<v<^>vv<v^<<>^>>><v><>>><>vv>>^><^<>vv>>v^<>v^v^^>^>v<<><^^^v<^^>>^^<v>v>^<vv><v<^>^^^>vvv<>>>v^><v^^vv<<>>>^<>>v>>>><v>v<>v^^^^>v<<<<^^<^^<v<>^>^v>^<<><^>^vv^^<^>v^^vvv<vv^vv<v^v<>>^^>><^v>vvv>^^>^>^>vv^>v^v^vv^^^^v<v^vv>>v<^<><v<<<<<v><>>v^<^^<^<>>^v<^<<v>v^>^<<^<^<^^vv><><^^v<<<<v<<<^<<>^^^<>^v^^><>^>>vv^<<<^>vv<>v><^>>^v<<^>^^><v<^>>>^^>v^<^<<^^v>^v<><^<vv^<vv<^><vvvvv>^><v>v>>v>^^^^><>^>^^<vvv>>>v<v><<><<<<>>><<>^^^vvv^^>^^^<v^v<v<<v<<v^<v>^>>^>v>^v><<>^<v>^<^<^^<v<><^<<^>>vv^><>v<^<^vv><><>>^^^v><<>v>>>><>^><>>>><vv^<>>^v>^<v<^v>v>v><<^^v^<>>^vv<<^<^
<v>vv<^<^<>^>>>><^<>v^<<^v<^^<v<>><v<v^>vvv<<<<<v>^<v^vvv>>vv^>><>v<^^<><><^<^<<v^^>>vv><><^<^v<^<<<^^<>><>>v^v><>>^<^v><^<^^<>v><^v<^<^<<>v<>^<^v<^v^^v>^><v>v^^^v>v^^>>^><^<^<<>^v>v<^vv<v^^<^>><><^v^<>v^<v<v^v^v>^^v<^<^^vv<<>>><>vvv^^<>^^>^<^v^<<>v^<^<^<v^^^>^>^v<v<>vv>>>^<<^v<v>v><>^v>^vv<v<>v^>>^>v>^<^<^>><v>vvv^<>v^^<>v^>><<>^<><>^>^<^^v^<^^<^^^v^<v><v^>>><v^^>>v<v>>><<vv<<><^v<v>>^<v>vvv^>>>>>>>v><>^>>^<<^<>^v^vv^>>v<^^^<vvv^><v<vv>^>v<>^^<vv>v^><<vv><^<vv>v<<^<<v<vv<^>><<^>^v<^v<^><><^<v<v>>^^<^><<<<v>>^v>><^>>^v^<<v<>^<><<>>v>v<^>>>^>>^^<<v<v<<<<^>><vv>>^v<<v<^<^v<<^<>^^v>^v>^^<v<^^>^><<<<^<^<><^><v<>^>vv^>><>>><v><v^><v>vv<<^^^v>^>v<^v>><>^<v>^<^^>v^<>>v<>v<<^^v^^>>vvv<><v<v^<<v<^v^>v^^^v>v>>v<<<<<^>v><<v^>v>>><v^<>>>>v>v^^<vv>><v><v^<^><>v^vv><<>><v<>^^>v<<vv>vv^<v>><<v^^>v<>v^^><>^<^>v><<><v><v^><v^<^<vv>^<<^><<vv<<<vvv^^<^v<v<>v><>><v<><><<v>^<>^v^^<>v<><<<<^<vv<vvvvvvv^>><^>vv^v<^v><>^^><v>>^>v<>><^><><^<>><>>v>>>>vv>^v>v<v>v<>^^<>>^<>>vvv^<vv^v^^^>vv>^vv>v<<>v>>>>v>^^v<>>>
v>v^^<^>v^<v^>>v><^><v>>^^>>v<^<>>^>v^v>>v^v^v<>v<>>^v>><v>>v<^^^<vv>^v^vv>>^^^vvvv^v^vvvv>v>><vv<<^v>^>><vvv^^>^<^^v><^<v^><^<<^>>>v>>><<<><<^>>v>^<^^><><>v^v><^^vv^><<<vvv<^<<>>^^v>>^vvv^>v^>v<<><>v>v>><<^v^>^^^^<<^<><<>^^<^v<>>><^<vv<<>v<v^^>v^>>^<<v>^^vv<<>>^><^<<^<^vvv^>>>v^^^<<<v^^<<vvv>v^v>v>vv><^v^>^^v^v>>v<<^^<^v>^^v><>>^>^^<vvv>vvv<^v^<vv>^^<v>>v^^>vv^<<v^vv^<<v<v>>><>^>^<^^v>v>^v<^^vvv^>^>vvv<^vvv>^>^><^<v^^<vvv><v^^v>><<>>^><v<<<v<<<^>v^><v<<v^v^<^<<>vv><v<^^v^><>>^>>^vv>^<>vv><><<vvv^^<^<^>^><<^v<>><<<^<>v<>^<^v<^v^v<><<><v><v>v^vv<<^^<^>^>^^>>v<<>><<vv^<<>v<<^>^^^v><>>>><>><><^^^>vv^^>v^>><^<>^<^>v<^>>v>v<v^^v^>vv^v<<<><vvvv<^<>^v^v^>vv<>^v>v^>^v<<<^vv^<>>v<^<<^^^<<<>v<v>><<^^^^<>v<>^<<^>>vv^>><v>^<<v<v>><^>^<v>v>v>v>v^^>vv^vvvv^<v>>>><^^<<v>v<^^<^>vvvv<<<vv^<>v^v^<v^>vv>^><<v^><>^^>^<<^vvv^v^><^vv>^<<<v>v><><>>^^>v>^^vv<^^v>>>v><^<^v^<^v>>>^<>^<>^v^^>^^>><^><><^><^v^><<<v^<>^^^<<^^<>><<>v^v^vvv^>v<v<<<^>>>v<>vv>>>v^vv>>^<>>vv^^^^^^vv^v^>>>>>^><v^^>^<>v^^^><><>v^^^^<>vv<<
^^<v>^>>>v<<><^^<^^<^v><><^v><v>>><>>v>><><<v^<v^<<<^<<v^<^^<^v><>v<<v^><^v<vv><^>v><<v^^>>>>^>>^^^v^v>>^vv>v^^<v^<>>^<^^^^v>>^><^v^v^^<^<<^^>^vv^^v^^v^><v^^^>^vv^<^vv<<>^>^^<>>>v^v<>>>^^^^<<^>>v<<<<v<^<>^vv^^>^>^><<<>v<>>><><^>^>^v>>v^v<><<v<^v<v^vv<>v<v>><>>^<v^>^vv>v>^^^>v^<v^v^>v^v^^v^vvvv<^^^^^vv>>v<<><<<>v><<<^^^><^><v<vv>>^><<<>^<^v<><v>>v><v>>^^<>>>^<^v<<^^>><>v<v^<^>^v>^<v>v>>>vv>>^^vv>^^v<>^<v^<vvv^>v^>>^<v^v^^<v><>v>>>^v><^v<>>v><^v>^<>>^<^v^>^<vv>v>^>^>>^>^<^<<^v<>v>>v^v<v>>^<^^<<>^^vv><<<<v>><<<><>^>v<><v^vvvv>vv^<><<^>^vv<<^v<v^<><><<>^>><^^v>v^<v>><<^>v<<v<<>>vvv<vv>^v<>^vv<v<<vvvv<<v^<vv><v^<^>><vvv><><vv><<>><>v^>>v^<<^<<^v^v<<>>><^<v<>^v^<^>v><^<^<^^^<<>^^><vv^>^>^^^^^^><vvvv>^>>^><<>^<<<<>>>>^<<>^vv<>^vv^vv><>v<v>^>^<<>v>v><<<><v<v<>>vv^^<<^>><v^<^>>vv>^>>vvv>^><^v^v<<><^^<>^^>vv<>>>v^>v^^^^>^v<<<^<<^><<^v^^v^<>>v<>v>^>>^^^^v^>v<>>>v^^>^<v>^v><><>><>>>>^^<vvv^<>^<<>v<>v<v<^<>v>^><<^v<v>><v<v^>vv<<<<v^>^v<v<^v><^<>>>^>>>>><v^vv<<>>v<<>><^>vv^><^><vv>^>><v^^^>>^<vv^vv>`;