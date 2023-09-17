import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './Store'

interface coffee {
    id: string,
    categories: string,
    specification: string,
    sold?: { price: number, message: string },
    image: string,
    size?: string,
    quantity?: number,
    coffeSize: Array<{ size: string, price: number, about: string }>
}
type update = {
    id: string,
    size: string
}
const initialState: { coffee: coffee[] } = {
    coffee: [{
        id: "",
        categories: "",
        specification: "",
        sold: { price: 0, message: "" },
        quantity: 1,
        size: "Small",
        image: "",
        coffeSize: []
    }]
}

export const coffee = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<coffee>) => {
            const data = { ...action.payload, quantity: 1 }
            const isExist = state.coffee.find((el) => el.id === action.payload.id)
            if (!isExist)
                state.coffee.push(data)
        },
        del: (state, action: PayloadAction<string>) => {
            state.coffee = state.coffee.filter(el => el.id != action.payload)
        },
        incriment: (state, action: PayloadAction<string>) => {
            state.coffee = state.coffee.map(el =>
                el.id === action.payload
                    ? { ...el, quantity: el.quantity + 1 }
                    : el
            )
        },
        decriment: (state, action: PayloadAction<string>) => {
            state.coffee = state.coffee.map(el =>
                el.id === action.payload
                    ? el.quantity > 1
                        ? { ...el, quantity: el.quantity - 1 }
                        : null
                    : el
            ).filter(el => el !== null)
        },
        cupSize: (state, action: PayloadAction<update>) => {
            state.coffee = state.coffee.map(el =>
                el.id === action.payload.id
                    ? { ...el, size: action.payload.size }
                    : el
            )
        },
        reset: (state) => {
            state.coffee = [{
                id: "",
                categories: "",
                specification: "",
                sold: { price: 0, message: "" },
                image: "",
                quantity: 1,
                size: "Small",
                coffeSize: []
            }]
        }
    },
})

export const { add, del, reset, incriment, decriment,cupSize } = coffee.actions
export const selectCount = (state: RootState) => state.coffee
export const coffeeResucer = coffee.reducer