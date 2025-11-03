// 123
const test = '123'
// test
let test1 = '123'
var test2 = '123'
export const test3 = '123'
export let test4 = '123'
export var test5 = '123'

interface Type {
  name: string
}

type UserType = 'admin' | 'user'

export interface User {
  id: number
  name: string
  type: Type
}

export type UserWithType = User & {
  type: UserType
}

const bb = '123'
const cc = '123'
// test husky width code-comment-check
const dd = '123'
