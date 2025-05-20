<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
const props = defineProps(['label'])
const emit = defineEmits(['got_checked'])
const checkedStatus = ref<boolean>(true)


onBeforeMount(() => {
    emit("got_checked", props.label)
})

function handleSwitchChange() {
    checkedStatus.value = !checkedStatus.value
    emitChange()
}

function emitChange() {
    emit("got_checked", props.label)
}
</script>
<template>
    <label class="flex cursor-pointer select-none items-center my-1">
      <div class="relative">
        <input type="checkbox" class="sr-only peer" @change="handleSwitchChange()" checked/>
        <div class="block h-6 w-10 rounded-full bg-[#c2c2c2]  hover:bg-[#aa6df] peer-checked:bg-[#0092b6]"></div>

        <div
          :class="{ 'translate-x-full !bg-primary': checkedStatus }"
          class="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-[#757575] border-[#626d67] transition peer-checked:bg-blug-500 peer-checked:bg-[#00d1d8]"
        ></div>
      </div>
      <p class="pl-2">{{ props.label }}</p>
    </label>

</template>
