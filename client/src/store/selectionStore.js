
import { create } from "zustand";

export const usesetstore =  create ((set)=>({

    data : '',
    menudata : '',

    setData : (data) => set({data}),
    setmenudata : (menudata) => set({menudata})

}))