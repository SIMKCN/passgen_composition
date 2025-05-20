<script setup lang="ts">
const props = defineProps(['labelText'])
</script>
<template>
    <p class="truncate bg-[#0077B6] text-[#CAF0F8] text-lg text-center shadow-2xl h-10 px-4 py-1">
        {{ props.labelText }}
    </p>
</template>
