<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import BaseLabel from './BaseLabel.vue';

const emit = defineEmits(['update_password_length'])

const passwordLength = ref<number>(12)

onBeforeMount(() => {
  emit("update_password_length", passwordLength.value)
})


function sendLengthToApp() {
  emit("update_password_length", passwordLength.value)
}
</script>
<template>
  <div>
    <div class="grid grid-cols-1">
      <base-label
        :label-text="`Länge: ${passwordLength}`"
        class="rounded-lg pb-2"
      ></base-label>
      <div class="grid grid-cols-2 mt-3">
        <input
          type="range"
          value="12"
          min="4"
          max="128"
          class="mr-2 w-72 rounded-lg mb-2"
          v-model="passwordLength"
          @change="sendLengthToApp"
          step="1"
        />
      </div>
    </div>
  </div>
</template>
