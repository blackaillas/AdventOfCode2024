<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="puzzle">
    <h1>This is my solutions  for this year's puzzles.</h1>

    <nav class="list">
      <RouterLink to="./1">#1</RouterLink>
      <RouterLink to="./2">#2</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .puzzle {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
  }
}
</style>
