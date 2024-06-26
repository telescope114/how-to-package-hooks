<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <div><RouterLink to="/count">/count</RouterLink></div>
    <div><RouterLink to="/count-tsx">/count-tsx</RouterLink></div>
    <div><RouterLink to="/fetch-hooks">/fetch-hooks</RouterLink></div>
    <div><RouterLink to="/fetch-hooks-tsx">/fetch-hooks-tsx</RouterLink></div>
    <RouterView />
  </div>
</template>
