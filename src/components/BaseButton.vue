<script setup lang="ts">

const props = defineProps(['buttonLabel', 'iconSrc'])

</script>
<template>
  <button class="shadow-2xl bg-[#00B4D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:bg-[#018eaa] text-lg px-1 py-1" @click="$emit('gotClicked')" >
    {{ props.buttonLabel }}
    <img v-if="props.iconSrc != 'noIcon'" :src="iconSrc" height="30" width="30">
  </button>

</template>
