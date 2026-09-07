<script setup lang="ts">
type Node = {
  name: string
  type?: 'dir' | 'file' | 'link'
  target?: string
  comment?: string
  highlight?: boolean
  children?: Node[]
}

const props = defineProps<{
  node: Node
  prefixes: string[]
  isLast: boolean
}>()

// "│   " carries the line down through this column for descendants;
// "    " (four spaces) means this branch terminated above.
const childPrefixes = [...props.prefixes, props.isLast ? '    ' : '│   ']
const elbow = props.isLast ? '└── ' : '├── '
</script>

<template>
  <div :class="['row', { highlighted: node.highlight }]">
    <span class="connector">{{ prefixes.join('') }}{{ elbow }}</span>
    <carbon-folder    v-if="node.type === 'dir'"       class="icon dir" />
    <carbon-link      v-else-if="node.type === 'link'" class="icon link" />
    <carbon-document  v-else                            class="icon file" />
    <span :class="['name', node.type || 'file']">{{ node.name }}</span>
    <span v-if="node.target" class="target">  →  {{ node.target }}</span>
    <span v-if="node.comment" class="comment">    # {{ node.comment }}</span>
  </div>
  <FileTreeNode
    v-for="(child, i) in node.children || []"
    :key="i"
    :node="child"
    :prefixes="childPrefixes"
    :is-last="i === (node.children!.length - 1)"
  />
</template>
