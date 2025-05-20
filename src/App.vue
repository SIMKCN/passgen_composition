<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BaseButton from './components/BaseButton.vue';
import BaseLabel from './components/BaseLabel.vue';
import BaseMessage from './components/BaseMessage.vue';
import AppPasswordStrength from './components/AppPasswordStrength.vue';
import AppCharacterSelector from './components/AppCharacterSelector.vue';
import AppPasswordLengthInput from './components/AppPasswordLengthInput.vue';
const upperCaseLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowerCaseLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];
const symbols = [
  "!",
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "]",
  "^",
  "_",
  "{",
  "|",
  "}",
  "~",
];
const passphrase: string[] = []

const isPasswordGenerated = computed(() => {
  return password.value.length > 0;
})

const password = ref<Array<string>>([])
const labelArray = ref<Array<string>>([])
const passwordLength = ref<number>(0)
const message = ref<string>("")
const textColorMessage = ref<string>("text-red-600")
const copyIcon = ref<string>("/copy.png")
const generateButtonStatus = ref<boolean>(true)

onMounted(() => {
  console.log(generateButtonStatus.value)
})
function handleInput() {
  if (generateButtonStatus.value == true) {
    generatePassword()
  } else {
    outputErrorCharacters()
  }
}

function generatePassword() {
  resetPasswordVariables()
  addSelectedCharactersToPassphrase()
  shufflePassphrase()
  generatePasswordFromPassphrase()
}
function resetPasswordVariables() {
  deletePassphrase()
  password.value.length = 0
  outputInformation("", "")
  changeCheckedToCopyIcon()
}
function addSelectedCharactersToPassphrase() {

  const charGroup: { [key: string]: string[]} = {
    Großbuchstaben: upperCaseLetters,
    Kleinbuchstaben: lowerCaseLetters,
    Zahlen: numbers,
    Symbole: symbols,
  };
  labelArray.value.forEach((label) => {
    if (charGroup[label]) {
      addCharsToPassphrase(charGroup[label])
    }
  })
}
function addCharsToPassphrase(value: string[]) {
  passphrase.push(...value)

}
function shufflePassphrase(): string[] {
  let m = passphrase.length;
  let t: string;
  let i: number;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = passphrase[m];
    passphrase[m] = passphrase[i];
    passphrase[i] = t;
  }

  return passphrase;
}

function generatePasswordFromPassphrase() {
  let n = <number>(0)
  let pre_password = <string>("")
  while (n < passwordLength.value) {
    n++;
    const randomIndex = Math.floor(Math.random() * passphrase.length)
    const item = passphrase[randomIndex]
    pre_password += item
  }
  password.value[0] = pre_password
}

function deletePassphrase() {
  passphrase.length = 0
}
function outputInformation(text: string, kind: string) {
  textColorMessage.value = kind
  message.value = text

}
function outputErrorCharacters() {
  outputInformation("Es wurde keine Zeichengruppe ausgewählt!", "text-red-600")
}

function updateLabelAndEnableButton(labels: []) {
  resetOutput()
  setLabelArray(labels)
  flipGenerateButtonStatus(true)
}
function resetOutput() {
  outputInformation("", "")
}
function setLabelArray(labels: []) {
  labelArray.value = labels
}

function flipGenerateButtonStatus(Boolean: boolean) {
  generateButtonStatus.value = Boolean
}
function updatePasswordLength(value: number) {
  passwordLength.value = value
}
function handlePasswordCopying() {
  if (password.value.length != 0) {
    copyPasswordandOutputCopyMessage()
    changeCopyIconToChecked()
  } else {
    changeIconToWrong()
  }
}
function errorNoChars() {
  outputErrorCharacters()
  flipGenerateButtonStatus(false)
  deletePassphrase()
}
function copyPasswordandOutputCopyMessage() {
  navigator.clipboard.writeText(password.value[0])
}
function changeCheckedToCopyIcon() {
  copyIcon.value = "/copy.png"
}
function changeIconToWrong() {
  copyIcon.value = "/wrong.png"
}
function changeCopyIconToChecked() {
  copyIcon.value = "/check.png"
}
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-[#CAF0F8] w-80 px-4 py-2 rounded-lg animate-fade animate-once animate-duration-200 animate-ease-linear shadow-2xl"
    >
      <div>
        <h1 class="text-lg ml-16">Passwortgenerator</h1>
        <div class="grid grid-cols-2 grid-rows-1 w-72 mt-3">
          <base-label
            class="justify-self-start w-60 rounded-lg"
            :labelText="password[0]"
          ></base-label>
          <BaseButton
            class="h-10 w-10 justify-self-end hover:animate-pulse"
            @gotClicked="handlePasswordCopying"
            :icon-src="copyIcon"
          ></BaseButton>
        </div>
        <base-message
          :labelMessage="message"
          :textColor="textColorMessage"
        ></base-message>
        <AppCharacterSelector
          @update_label_array="updateLabelAndEnableButton($event)"
          @error_empty_label_array="errorNoChars()"
        ></AppCharacterSelector>
        <AppPasswordLengthInput
          @update_password_length="updatePasswordLength($event)"
        ></AppPasswordLengthInput>
        <div class="grid grid-cols-2 mt-3 mb-3">
          <BaseButton
            buttonLabel="Generiere"
            @gotClicked="handleInput"
            :disabled="!generateButtonStatus"
            :class="
              generateButtonStatus ? 'cursor-pointer' : 'cursor-not-allowed'
            "
            icon-src="noIcon"
            class="h-10 animate-wiggle hover:animate-none"
          ></BaseButton>
          <AppPasswordStrength
            v-if="isPasswordGenerated"
            :password="password[0]"
            :labelArray="labelArray"
            class="mx-2"
          ></AppPasswordStrength>
        </div>
      </div>
    </div>
  </div>
</template>
