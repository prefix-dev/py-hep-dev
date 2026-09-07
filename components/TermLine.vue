<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Render with no `$` prompt (e.g. for output, comments, blanks). */
    output?: boolean
  }>(),
  { output: false }
)
</script>

<template>
  <div :class="['term-line', { 'term-out': output }]">
    <span v-if="!output" class="term-prompt">$</span><slot />
  </div>
</template>
