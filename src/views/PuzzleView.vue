<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="puzzle">
    <h1>This is my solutions for this year's puzzles.</h1>

    <nav class="list">
      <RouterLink to="./1">#1</RouterLink>
      <RouterLink to="./2">#2</RouterLink>
      <RouterLink to="./3">#3</RouterLink>
      <RouterLink to="./4">#4</RouterLink>
      <RouterLink to="./5">#5</RouterLink>
      <RouterLink to="./6">#6</RouterLink>
      <RouterLink to="./7">#7</RouterLink>
      <RouterLink to="./8">#8</RouterLink>
      <RouterLink to="./9">#9</RouterLink>
      <RouterLink to="./10">#10</RouterLink>
      <RouterLink to="./11">#11</RouterLink>
      <RouterLink to="./12">#12</RouterLink>
      <RouterLink to="./13">#13</RouterLink>
      <RouterLink to="./14">#14</RouterLink>
      <RouterLink to="./15">#15</RouterLink>
      <RouterLink to="./16">#16</RouterLink>
      <RouterLink to="./17">#17</RouterLink>
      <RouterLink to="./18">#18</RouterLink>
      <RouterLink to="./19">#19</RouterLink>
      <RouterLink to="./20">#20</RouterLink>
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
