// composables/useDog.js
import { useState } from "#app"

export function useDog() {
  const name = useState("dogName", () => "Buddy")

  function eat() {
    console.log(`${name.value} is eating.`)
  }

  function bark() {
    console.log(`${name.value} is barking.`)
  }

  function changeName(newName) {
    name.value = newName
  }

  return {
    name,
    eat,
    bark,
    changeName,
  }
}
