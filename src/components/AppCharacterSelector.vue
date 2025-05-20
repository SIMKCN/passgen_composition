<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitchToggle from './BaseSwitchToggle.vue';

interface Checkboxes {
  label: string,
  checked: boolean
}

const emit = defineEmits(['update_label_array', 'error_empty_label_array'])

const checkboxesLabels = ref<Checkboxes[]>([
        { label: "Großbuchstaben", checked: false },
        { label: "Kleinbuchstaben", checked: false },
        { label: "Symbole", checked: false },
        { label: "Zahlen", checked: false },
])


function updateCheckboxArrayAndSendToApp($event: string) {
  updateCheckboxArray($event)
  const labels_checked_boxes: string[] = createArrayOfCheckedBoxes()
  console.log(labels_checked_boxes)
  emitLabelsOrErrorToApp(labels_checked_boxes)
}

function updateCheckboxArray($event: string) {
  for (let i = 0; i < checkboxesLabels.value.length; i++) {
        if ($event == checkboxesLabels.value[i].label) {
          checkboxesLabels.value[i].checked = !checkboxesLabels.value[i].checked;
        }
      }
}

function createArrayOfCheckedBoxes() {
  const checked_boxes = checkboxesLabels.value.filter(
    (item) => item.checked === true);
      return checked_boxes.map((item) => item.label);
}

function emitLabelsOrErrorToApp(labels_checked_boxes: string[]) {
  console.log("Sending characters")
  if (labels_checked_boxes.length != 0) {
    emit("update_label_array", labels_checked_boxes)
    console.log("send characters")
  } else {
    emit('error_empty_label_array')
    console.log("erro")
  }
}
</script>
<template>
  <div
    class="grid grid-cols-1 mt-5 mb-5 rounded-lg w-72 bg-[#0077B6] text-[#CAF0F8] px-2 py-2"
  >
    <base-switch-toggle
      label="Großbuchstaben"
      @got_checked="updateCheckboxArrayAndSendToApp($event)"
    ></base-switch-toggle>
    <base-switch-toggle
      label="Kleinbuchstaben"
      @got_checked="updateCheckboxArrayAndSendToApp($event)"
    ></base-switch-toggle>
    <base-switch-toggle
      label="Symbole"
      @got_checked="updateCheckboxArrayAndSendToApp($event)"
    ></base-switch-toggle>
    <base-switch-toggle
      label="Zahlen"
      @got_checked="updateCheckboxArrayAndSendToApp($event)"
    ></base-switch-toggle>
  </div>
</template>
