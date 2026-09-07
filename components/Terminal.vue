<script setup lang="ts">
defineProps<{
  /** Title shown in the bar (e.g. ~/my-robot) */
  title?: string
}>()
</script>

<template>
  <div class="term">
    <div class="term-bar">
      <span class="term-dot term-dot--r"></span>
      <span class="term-dot term-dot--y"></span>
      <span class="term-dot term-dot--g"></span>
      <span v-if="title" class="term-bar-title">{{ title }}</span>
    </div>
    <div class="term-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.term {
  background: #f5f5e9;
  border-radius: 6px;
  overflow: hidden;
  font-family: var(--tufte-mono);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 0.5rem;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  background: #ece6d4;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.term-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.term-dot--r { background: #ff5f56; }
.term-dot--y { background: #ffbd2e; }
.term-dot--g { background: #27c93f; }
.term-bar-title {
  flex: 1;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  margin-right: 2.5rem;
  font-style: normal;
  letter-spacing: 0.02em;
}
.term-body {
  padding: 0.7rem 1rem;
  color: #222;
  font-size: 0.78rem;
  line-height: 1.6;
}
/* Line styling reaches into TermLine children via :deep so the slot can hold
 * either <TermLine> components or raw <div class="term-line"> elements. */
.term-body :deep(.term-line) {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: var(--tufte-mono);
}
.term-body :deep(.term-line.term-out) {
  color: #777;
  font-style: italic;
}
.term-body :deep(.term-prompt) {
  color: #2f8f2f;
  font-weight: 600;
  margin-right: 0.6em;
}
.term-body :deep(.term-string) {
  color: #828f2f;
  font-weight: 600;
}
</style>
