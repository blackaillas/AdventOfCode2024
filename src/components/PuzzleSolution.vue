<script setup lang="ts">
import { solvePart1 as solvePu1Pa1, solvePart2 as solvePu1Pa2 } from '../solutions/puzzle.1.js'
import { solvePart1 as solvePu2Pa1, solvePart2 as solvePu2Pa2 } from '../solutions/puzzle.2.js'
import { solvePart1 as solvePu3Pa1, solvePart2 as solvePu3Pa2 } from '../solutions/puzzle.3.js'
import { solvePart1 as solvePu4Pa1, solvePart2 as solvePu4Pa2 } from '../solutions/puzzle.4.js'
import { solvePart1 as solvePu5Pa1, solvePart2 as solvePu5Pa2 } from '../solutions/puzzle.5.js'
import { solvePart1 as solvePu6Pa1, solvePart2 as solvePu6Pa2 } from '../solutions/puzzle.6.js'
import { solvePart1 as solvePu7Pa1, solvePart2 as solvePu7Pa2 } from '../solutions/puzzle.7.js'
import { solvePart1 as solvePu8Pa1, solvePart2 as solvePu8Pa2 } from '../solutions/puzzle.8.js'
import { solvePart1 as solvePu9Pa1, solvePart2 as solvePu9Pa2 } from '../solutions/puzzle.9.js'
import { solvePart1 as solvePu10Pa1, solvePart2 as solvePu10Pa2 } from '../solutions/puzzle.10.js'
import { solvePart1 as solvePu11Pa1, solvePart2 as solvePu11Pa2 } from '../solutions/puzzle.11.js'
import { solvePart1 as solvePu12Pa1, solvePart2 as solvePu12Pa2 } from '../solutions/puzzle.12.js'
import { solvePart1 as solvePu13Pa1, solvePart2 as solvePu13Pa2 } from '../solutions/puzzle.13.js'
import { solvePart1 as solvePu14Pa1, solvePart2 as solvePu14Pa2 } from '../solutions/puzzle.14.js'
import { solvePart1 as solvePu15Pa1, solvePart2 as solvePu15Pa2 } from '../solutions/puzzle.15.js'
import { solvePart1 as solvePu16Pa1, solvePart2 as solvePu16Pa2 } from '../solutions/puzzle.16.js'
import { solvePart1 as solvePu17Pa1, solvePart2 as solvePu17Pa2 } from '../solutions/puzzle.17.js'
import { solvePart1 as solvePu18Pa1, solvePart2 as solvePu18Pa2 } from '../solutions/puzzle.18.js'

function solvePuzzle(id: number) {
    solutionValue.value = null;
    solutionTime.value = null;
    switch (id) {
        case 1:
            solutionValue.value = solvePu1Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu1Pa1);
            }
            break;
        case 2:
            solutionValue.value = solvePu2Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu2Pa1);
            }
            break;
        case 3:
            solutionValue.value = solvePu3Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu3Pa1);
            }
            break;
        case 4:
            solutionValue.value = solvePu4Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu4Pa1);
            }
            break;
        case 5:
            solutionValue.value = solvePu5Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu5Pa1);
            }
            break;
        case 6:
            solutionValue.value = solvePu6Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu6Pa1);
            }
            break;
        case 7:
            solutionValue.value = solvePu7Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu7Pa1);
            }
            break;
        case 8:
            solutionValue.value = solvePu8Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu8Pa1);
            }
            break;
        case 9:
            solutionValue.value = solvePu9Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu9Pa1);
            }
            break;
        case 10:
            solutionValue.value = solvePu10Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu10Pa1);
            }
            break;
        case 11:
            solutionValue.value = solvePu11Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu11Pa1);
            }
            break;
        case 12:
            solutionValue.value = solvePu12Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu12Pa1);
            }
            break;
        case 13:
            solutionValue.value = solvePu13Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu13Pa1);
            }
            break;
        case 14:
            solutionValue.value = solvePu14Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu14Pa1);
            }
            break;
        case 15:
            solutionValue.value = solvePu15Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu15Pa1);
            }
            break;
        case 16:
            solutionValue.value = solvePu16Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu16Pa1);
            }
            break;
        case 17:
            solutionValue.value = solvePu17Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu17Pa1);
            }
            break;
        case 18:
            solutionValue.value = solvePu18Pa1();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu18Pa1);
            }
            break;
        default:
            solutionValue.value = 'No solution available';
    }

    console.log('Part 1 Solution is:', solutionValue.value);
}

function solvePuzzle2(id: number) {
    solutionValue.value = null;
    solutionTime.value = null;
    switch (id) {
        case 1:
            solutionValue.value = solvePu1Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu1Pa2);
            }
            break;
        case 2:
            solutionValue.value = solvePu2Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu2Pa2);
            }
            break;
        case 3:
            solutionValue.value = solvePu3Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu3Pa2);
            }
            break;
        case 4:
            solutionValue.value = solvePu4Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu4Pa2);
            }
            break;
        case 5:
            solutionValue.value = solvePu5Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu5Pa2);
            }
            break;
        case 6:
            solutionValue.value = solvePu6Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu6Pa2);
            }
            break;
        case 7:
            solutionValue.value = solvePu7Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu7Pa2);
            }
            break;
        case 8:
            solutionValue.value = solvePu8Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu8Pa2);
            }
            break;
        case 9:
            solutionValue.value = solvePu9Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu9Pa2);
            }
            break;
        case 10:
            solutionValue.value = solvePu10Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu10Pa2);
            }
            break;
        case 11:
            solutionValue.value = solvePu11Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu11Pa2);
            }
            break;
        case 12:
            solutionValue.value = solvePu12Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu12Pa2);
            }
            break;
        case 13:
            solutionValue.value = solvePu13Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu13Pa2);
            }
            break;
        case 14:
            solutionValue.value = solvePu14Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu14Pa2);
            }
            break;
        case 15:
            solutionValue.value = solvePu15Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu15Pa2);
            }
            break;
        case 16:
            solutionValue.value = solvePu16Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu16Pa2);
            }
            break;
        case 17:
            solutionValue.value = solvePu17Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu17Pa2);
            }
            break;
        case 18:
            solutionValue.value = solvePu18Pa2();
            if (measureTime.value === true) {
                solutionTime.value = measureExecutionTime(solvePu18Pa2);
            }
            break;
        default:
            solutionValue.value = 'No solution available';
    }

    console.log('Part 2 Solution is:', solutionValue.value);
}

function measureExecutionTime(fn: any, cycles = 1000) {
    const start = performance.now();

    for (let i = 0; i < cycles; i++) {
        fn();
    }

    const end = performance.now();
    const duration = end - start;

    console.log(`Execution time for ${cycles} cycles: ${duration} milliseconds`);
    return Math.floor(duration / cycles * 1000) / 1000;
}

const solutionValue = defineModel();
const solutionTime = defineModel('time');
const measureTime = defineModel('measure');

</script>

<template>
    <div class="greetings">
        <h1 class="green">Puzzle for day #{{ $route.params.id }}</h1>

        <button @click="solvePuzzle(+$route.params.id)">Part 1 Solution</button>

        <button @click="solvePuzzle2(+$route.params.id)">Part 2 Solution</button>

        <input type="checkbox" name="measure" id="measure" v-model="measureTime"> Measure execution time

        <div class="field-container" v-if="solutionValue != null">
            <label for="puzzle-solution">Solution: <span id="value">{{ solutionValue }}</span> <span id="time"
                    title="Execution time for 1 execution based on 1000 cycles" v-if="solutionTime">{{ solutionTime }}
                    ms</span></label>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 1.6rem;
    position: relative;
    top: -10px;
}

button {
    padding: 0.5rem 1rem;
    margin: 1rem 0.5rem;
    background-color: transparent;
    border-color: var(--vt-c-green);
    color: var(--color-background);
    border: 1;
    border-radius: 4px;
    cursor: pointer;
}

.greetings h1 {
    text-align: center;
}

.field-container {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}

label {
    font-size: 1.4rem;
}

label span#value {
    font-weight: 500;
    color: var(--vt-c-green);
}

label span#time {
    font-weight: 400;
    font-size: small;
}

@media (min-width: 1024px) {
    .greetings h1 {
        text-align: left;
    }
}
</style>
