const upperCaseLetters: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
const lowerCaseLetters: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

const numbers: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]
const symbols: string[] = [
  '!',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  ']',
  '^',
  '_',
  '{',
  '|',
  '}',
  '~',
]
const password: string[] = []
const passphrase: string[] = []
let labelArray = <Array<string>>[]
let passwordLength = <number>0

export function generatePassword(labels: string[], length: number) {
  resetPasswordVariables()
  setLabelArrayAndLength(labels, length)
  addSelectedCharactersToPassphrase()
  shufflePassphrase()
  generatePasswordFromPassphrase()
  return password
}

function setLabelArrayAndLength(labels: string[], length: number) {
  labelArray = labels
  passwordLength = length
}
function resetPasswordVariables() {
  deletePassphrase()
  deletePassword()
}
function deletePassphrase() {
  passphrase.length = 0
}
function deletePassword() {
  password.length = 0
}
function addSelectedCharactersToPassphrase() {
  const charGroup: { [key: string]: string[] } = {
    Großbuchstaben: upperCaseLetters,
    Kleinbuchstaben: lowerCaseLetters,
    Zahlen: numbers,
    Symbole: symbols,
  }
  labelArray.forEach((label) => {
    if (charGroup[label]) {
      addCharsToPassphrase(charGroup[label])
    }
  })
}
function addCharsToPassphrase(value: string[]) {
  passphrase.push(...value)
}

function shufflePassphrase(): string[] {
  let m = passphrase.length
  let t: string
  let i: number

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = passphrase[m]
    passphrase[m] = passphrase[i]
    passphrase[i] = t
  }

  return passphrase
}

function generatePasswordFromPassphrase() {
  let n = <number>0
  let pre_password = <string>''
  while (n < passwordLength) {
    n++
    const randomIndex = Math.floor(Math.random() * passphrase.length)
    const item = passphrase[randomIndex]
    pre_password += item
  }
  password[0] = pre_password
}
