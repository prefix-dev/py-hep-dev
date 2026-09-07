<script setup lang="ts">
type Node = {
  name: string
  type?: 'dir' | 'file' | 'link'
  target?: string
  comment?: string
  highlight?: boolean
  children?: Node[]
}

defineProps<{ tree: Node[]; rootLabel?: string }>()
</script>

<template>
  <div class="file-tree">
    <div v-if="rootLabel" class="row root">
      <carbon-folder class="icon dir" />
      <span class="name dir">{{ rootLabel }}</span>
    </div>
    <FileTreeNode
      v-for="(node, i) in tree"
      :key="i"
      :node="node"
      :prefixes="[]"
      :is-last="i === tree.length - 1"
    />
  </div>
</template>

<style scoped>
.file-tree {
  font-family: var(--tufte-mono, 'IBM Plex Mono', Menlo, monospace);
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--tufte-text, #111);
  white-space: pre;
}
.file-tree :deep(.row) {
  display: flex;
  align-items: center;
}
.file-tree :deep(.connector) {
  color: var(--tufte-muted, #888);
  white-space: pre;
  flex-shrink: 0;
}
.file-tree :deep(.icon) {
  flex-shrink: 0;
  width: 0.95rem;
  height: 0.95rem;
  margin-right: 0.4rem;
}
.file-tree :deep(.icon.dir)  { color: #c9a227; }
.file-tree :deep(.icon.file) { color: #4a4a4a; }
.file-tree :deep(.icon.link) { color: var(--tufte-accent, #c14a26); }
.file-tree :deep(.name)      { font-weight: 500; }
.file-tree :deep(.name.dir)  { color: #8a6d00; }
.file-tree :deep(.name.link) { color: var(--tufte-accent, #c14a26); }
.file-tree :deep(.name.file) { color: var(--tufte-text, #111); }
.file-tree :deep(.target)    { color: var(--tufte-accent, #c14a26); font-style: italic; }
.file-tree :deep(.comment)   { color: var(--tufte-muted, #888); font-style: italic; }
.file-tree .root .name       { color: var(--tufte-text, #111); font-weight: 500; }

/* Highlighted node: subtle yellow band with an accent bar on the left. */
.file-tree :deep(.row.highlighted) {
  background: rgba(255, 200, 100, 0.22);
  box-shadow: inset 3px 0 0 var(--tufte-accent, #c14a26);
  border-radius: 2px;
}
.file-tree :deep(.row.highlighted .name) {
  font-weight: 700;
}
</style>
