<template>
  <div ref="el" v-bind="{ ...attrs, ...$attrs }" :class="[ui.wrapper, grow ? ui.grow : ui.border, collapsible ? ui.collapsible : 'flex']" :style="{ '--width': width && !grow ? `${width}px` : undefined }">
    <slot />

    <!-- <slot name="handle" :on-drag="onDrag"> -->
      <!-- <UDashboardPanelHandle v-if="resizable && !grow" @mousedown="onDrag" /> -->
    <!-- </slot> -->
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const config = {
  wrapper: 'flex-col items-stretch relative w-full',
  border: 'border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0',
  grow: 'flex-1',
  collapsible: 'hidden lg:flex',
  slideover: 'lg:hidden'
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  collapsible: {
    type: Boolean,
    default: false
  },
  side: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  grow: {
    type: Boolean,
    default: false
  },
  resizable: {
    type: [Boolean, Object],
    default: false
  },
  width: {
    type: Number,
    default: undefined
  },
  breakpoint: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | '2xl'>,
    default: 'lg'
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<Partial<typeof config>>,
    default: () => ({})
  }
})

// const emit = defineEmits(['update:modelValue'])

// const id = props.id ? `dashboard:panel:${props.id}` : useId()
const { ui, attrs } = useUI('dashboard.panel', toRef(props, 'ui'), config, toRef(props, 'class'), true)
// const { el, width, onDrag, isDragging } = props.resizable ? useResizable(id || 'dashboard:panel', { ...(typeof props.resizable === 'object' ? props.resizable : {}), value: props.width }) : { el: undefined, width: toRef(props.width), onDrag: undefined, isDragging: undefined }


// defineExpose({
//   width,
//   isDragging
// })
</script>
