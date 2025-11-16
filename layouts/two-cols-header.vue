<script setup>
import Base from '@slidev/client/layouts/two-cols-header.vue'
</script>

<template>
  <Base>
    <template #header>
      <h1 class="slidev-title"><slot name="title" /></h1>
    </template>
    <slot />
  </Base>
</template>
