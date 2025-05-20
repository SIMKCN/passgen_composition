<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import BaseMessage from './BaseMessage.vue'
const charPool = ref<number>(0)
const entropy = ref<number>(0)

const ALPHABET_LENGTH = 26
const SYMBOL_AMOUNT = 32
const DIGITS = 10

interface Safety {
    max: number,
    label: string,
    class: string
}
const safetyLevel = ref<number>(0)
const safetyValues: Safety[] = [
        { max: 40, label: "sehr unsicher", class: "text-[#ff0000]" },
        { max: 50, label: "akzeptabel", class: "text-[#ff6300]" },
        { max: 60, label: "fast sicher", class: "text-[#ff6300]" },
        { max: 80, label: "sicher", class: "text-[#ff6300]" },
        { max: 100, label: "sehr sicher", class: "text-[#3DC000]" },
        { max: 120, label: "besonders sicher", class: "text-[#3DC000]" },
        { max: 160, label: "äußerst sicher", class: "text-[#34C53E]" },
        { max: 200, label: "höchst sicher", class: "text-[#34C53E]" },
        { max: 220, label: "absolut sicher", class: "text-[#1AC883]" },
        { max: 500, label: "enorm sicher", class: "text-[#1AC883]" },
        { max: 850, label: "maximal sicher", class: "text-[#04BEC5]" },
]

interface Props{
    password: string
    labelArray: string[]
}

const props = defineProps<Props>()

onMounted(() => {
    entropyCalculationProcess();
})
watch(
    () => props.password,
    () => {
        entropyCalculationProcess()
    }
)

function entropyCalculationProcess() {
    resetVariables()
    updateCharacterPoolCount()
    calculateEntropy()
    setSafetyLevel()
    resetVariables()
}

function resetVariables() {
      charPool.value = 0;
      entropy.value = 0;
}
function calculateEntropy() {
      entropy.value = props.password.length * Math.log2(charPool.value);
}
function setSafetyLevel() {
    safetyLevel.value = safetyValues.findIndex(({ max }) => entropy.value <= max)
}
function updateCharacterPoolCount() {
    for (let i = 0; i < props.labelArray.length; i++) {
        if (props.labelArray[i] == "Großbuchstaben") {
            charPool.value += ALPHABET_LENGTH;
        } else if (props.labelArray[i] == "Kleinbuchstaben") {
          charPool.value += ALPHABET_LENGTH;
        } else if (props.labelArray[i] == "Symbole") {
          charPool.value += SYMBOL_AMOUNT;
        } else if (props.labelArray[i] == "Zahlen") {
          charPool.value += DIGITS;
        }
      }
}
</script>
<template>
    <base-message
      :labelMessage="safetyValues[safetyLevel].label"
      :class="safetyValues[safetyLevel].class"
    ></base-message>
  </template>
