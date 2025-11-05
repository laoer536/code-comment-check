const test = '123'
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
const dd = '123'

function fn() {
  console.log('test')
}

class Test {
  constructor() {
    console.log('test')
  }
}

enum TestEnum {
  A = 'A',
  B = 'B',
}
