import { atom } from "recoil";

export const dataState = atom({
    key: "dataState",
    default:[]
})

export const switchChange = atom({
    key:"swtchChange",
    default:(true)
})