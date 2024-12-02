<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>For Reviewers</template>

    Navigate to Puzzles page and select the puzzle by its day number. You can then run my code for both parts of the puzzle and get the solution.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    This little blog is made with VueJs. It is a simple project to help me learn VueJs.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Join to our Teams group at
    <a href="Háh. jópofa feladványok vannak. Valaki dolgozik már rajtuk?" target="_blank" rel="noopener">Advent of Code 2024</a>.
  </WelcomeItem>
</template>
