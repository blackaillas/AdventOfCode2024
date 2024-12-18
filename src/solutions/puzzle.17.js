import { bitXor, mod } from 'mathjs';


const LINE_SEP = '\n';
const START = 'S';
const WALL = '#';
const END = 'E';
const EMPTY = '.';

const steps = [
    { row: 1, col: 0, sign: 'v' },
    { row: 0, col: -1, sign: '<' },
    { row: -1, col: 0, sign: '^' },
    { row: 0, col: 1, sign: '>' }
];

export function solvePart1() {
    const model = getInput(input);

    let sum = [];

    for (let p = 0; p < model.program.length; p = p + 2) {
        const opcode = model.program[p];
        const operand = model.program[p + 1];

        switch (opcode) {
            case 0:
                model.A = +division(model, +operand);
                break;
            case 1:
                model.B = +bitXor(+model.B, +operand);
                break;
            case 2:
                model.B = +mod(getComboValue(model, +operand), 8);
                break;
            case 3:
                if (model.A !== 0) {
                    p = +operand - 2;
                }
                break;
            case 4:
                model.B = +bitXor(+model.B, +model.C);
                break;
            case 5:
                sum.push(mod(getComboValue(model, +operand), 8));
                break;
            case 6:
                model.B = +division(model, +operand);
                break;
            case 7:
                model.C = +division(model, +operand);
                break;
            default:
                break;
        }
    }

    return sum.join(',');
}

// 117440 too low
export function solvePart2() {
    let model = getInput(testInput5);
    let original = getInput(testInput5);
    let sum = '';
    // let newA = 400000001;
    let newA = 0;

    while (sum !== model.program.join(',') && newA < 500000001) {
        newA = newA + 1;
        model = original;
        model.A = newA;
        sum = [];
        for (let p = 0; p < model.program.length; p = p + 2) {
            const opcode = model.program[p];
            const operand = model.program[p + 1];

            switch (opcode) {
                case 0:
                    model.A = +division(model, +operand);
                    break;
                case 1:
                    model.B = +bitXor(+model.B, +operand);
                    break;
                case 2:
                    model.B = +mod(getComboValue(model, +operand), 8);
                    break;
                case 3:
                    if (model.A !== 0) {
                        p = +operand - 2;
                    }
                    break;
                case 4:
                    model.B = +bitXor(+model.B, +model.C);
                    break;
                case 5:
                    sum.push(mod(getComboValue(model, +operand), 8));
                    if (sum.join(',') !== (model.program).slice(0, sum.length).join(',')) {
                        p = model.program.length;
                    }
                    break;
                case 6:
                    model.B = +division(model, +operand);
                    break;
                case 7:
                    model.C = +division(model, +operand);
                    break;
                default:
                    break;
            }
        }
        sum = sum.join(',');
    }
    return newA;
}

function getComboValue(model, operand) {
    let value = null;
    switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
            value = operand;
            break;
        case 4:
            value = model.A;
            break;
        case 5:
            value = model.B;
            break;
        case 6:
            value = model.C;
            break;
        case 7:
            value = null
            break;
        default:
            break;
    }
    return value;
}

function division(model, operand) {
    const nominator = model.A;
    const denominator = Math.pow(2, getComboValue(model, operand));
    const result = Math.floor(nominator / denominator);
    return result;
}

function getInput(inp) {
    let model = {};
    const lines = inp.split(LINE_SEP);
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (line.includes('Register A:')) {
            model.A = parseInt(line.split('A: ')[1]);
        } else if (line.includes('Register B:')) {
            model.B = parseInt(line.split(' B: ')[1]);
        } else if (line.includes('Register C:')) {
            model.C = parseInt(line.split('C: ')[1]);
        } else if (line.includes('Program:')) {
            model.program = line.split('Program: ')[1].split(',').map(x => parseInt(x));
        }
    }
    return model;
}




var testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

var testINput2 = `Register A: 0
Register B: 0
Register C: 9

Program: 2,6`;


var testInput3 = `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`;

var testInput4 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

var testInput5 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

var input = `Register A: 38610541
Register B: 0
Register C: 0

Program: 2,4,1,1,7,5,1,5,4,3,5,5,0,3,3,0`;