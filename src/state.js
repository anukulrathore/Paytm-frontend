import { atom } from "recoil"

  export const userAuth= atom({
    key:'auth',
    default: false
  })

  export const balance = atom({
    key:'bal',
    default: 0
  })

  export const transferto = atom({
    key:'to',
    default: { userId: '', userName: ''}
  })


  