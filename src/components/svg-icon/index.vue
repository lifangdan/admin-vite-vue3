<template>
    <i v-if="isEl" :class="iconName"  :style="{ fontSize: size + 'px',  color: color }"></i>
    <svg v-else class="svg-icon" aria-hidden="true"  :style="{ width: size + 'px', height: size + 'px', fill: color }">
        <use :xlink:href="svgName" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    iconName: String,
    size: {
        type: [String, Number],
        default: 14
    },
    color: {
        type: String
    }
})

const svgName = computed(() => {
    return `#icon-${props.iconName}`
})

const isEl = computed(() => {
    return props.iconName.indexOf('el-icon') > -1
})
</script>

<style scoped lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>