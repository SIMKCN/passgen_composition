<script setup lang="ts">
import { ref, computed } from 'vue';

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

// const isPasswordGenerated = computed(() => {
// return password.value.length > 0;
// })

const password = ref<Array<string>>([])
const labelArray = ref<Array<string>>([])
const password_length = ref<number>(0)
const message = ref<string>("")
const passwordGenerated = ref<boolean>(true)
const textColorMessage = ref<string>("text-red-600")
const copyIcon = ref<string>("/copy.png")
const generateButtonStatus = ref<boolean>(true)


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
  const charGroup = {
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
function addCharsToPassphrase(value: []) {
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
  while (n < passwordLength) {
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
function changeCheckedToCopyIcon() {
  copyIcon.value = "/copy.png"
}
function changeIconToWrong() {
  copyIcon.value = "/wrong.png"
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

</script>
