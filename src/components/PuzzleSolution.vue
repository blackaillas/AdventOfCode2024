<script setup lang="ts">
import { solvePart1 as solvePu1Pa1, solvePart2 as solvePu1Pa2 } from '../solutions/puzzle.1.js'
import { solvePart1 as solvePu2Pa1, solvePart2 as solvePu2Pa2  } from '../solutions/puzzle.2.js'

function solvePuzzle(id: number) {
  let solution;
  switch (id) {
    case 1:
      solution = solvePu1Pa1();
      break;
    case 2:
      solution = solvePu2Pa1();
      break;
    default: 
      solution = 'No solution available';
  }

  console.log('Part 1 Solution is:', solution);
  solutionValue.value = solution;
}

function solvePuzzle2(id: number) {
  let solution;
  switch (id) {
    case 1:
      solution = solvePu1Pa2();
      break;
    case 2:
      solution = solvePu2Pa2();
      break;
    default: 
      solution = 'No solution available';
  }

  console.log('Part 2 Solution is:', solution);
  solutionValue.value = solution;
}

const solutionValue = defineModel();

</script>

<template>
  <div class="greetings">
    <h1 class="green">Puzzle for day #{{ $route.params.id  }}</h1>

    <button @click="solvePuzzle(+$route.params.id)">Part 1 Solution</button>

    <button @click="solvePuzzle2(+$route.params.id)">Part 2 Solution</button>

    <div class="field-container">
      <label for="puzzle-solution">Solution: <span>{{ solutionValue }}</span></label>
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

label span {
  font-weight: 500;
  color: var(--vt-c-green);
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
