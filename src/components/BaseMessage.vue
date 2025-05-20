<script setup lang="ts">
const props = defineProps(['labelMessage', 'textColor'])
</script>
<template>
    <div>
        <p class="font-semibold text-sm" :class="props.textColor">
            {{ props.labelMessage }}
        </p>
    </div>

</template>
