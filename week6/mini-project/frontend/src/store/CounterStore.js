import {create} from 'zustand'

// create a global store
export const useCounterStore=create((set)=>({
    // state
    newCounter:0,
    newCounter1:100,
    // add user state:(name,age,email)
    user:{name:"tejas",email:"tejas@mail.com",age:"20"},
    // function to change email
    chnageEmail:()=>set({...user,email:"tejas@mail.in"}),
    // function to change the naem and age

    changeNameAndAge:()=>set({...user,name:"Krish",age:"22"}),

    // functions to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
    incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),

    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:0}),

    // function to change newCounter to 500
    newCounterSet:()=>set({newCounter:500}),

    // function to decrement newCounter1 by 20
    decrementCounter1:()=>set(state=>({newCounter1:state.newCounter1-20})),

}))

















// import { create } from "zustand";
// //creste store
// export const useCounterStore = create((set) => ({
//   //state
//   newCounter: 0,
//   newCounter1: 10,
//   user:{name:'Tejas',email:"Tejas@mail.com, age:21"},
//   //funtions

//   incrementCounter: () => set((state) => ({ newCounter: state.newCounter + 1 })),
//   decrementCounter: () => set((state) => ({ newCounter: state.newCounter - 1 })),
//   reset: () => set({ newCounter: 0 }),

//   incrementCounter1: () => set((state) => ({ newCounter1: state.newCounter1 + 1 })),
//   decrementCounter1: () => set((state) => ({ newCounter1: state.newCounter1 - 1 })),
//   reset1: () => set({ newCounter1: 10 }),

//   changeCounter:()=> set({newCounter:500}),
//   decrementCounterBy20:()=>set((state) => ({newCounter:state.newCounter-20})),


//    // function to  change emial
//    changeEmail:()=>set({...user,email:"test@mail.com"}),

//    changeNameAndAge:()=>({...user,name:"bhanu",age:32}),



   
// }));

//{} returns obj
