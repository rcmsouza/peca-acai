/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../components/api";
import { AxiosResponse } from "axios";

export interface IInitialState {
  sizes: ISizes[],
  fruits: IFruit[],
  complements: IComplements[]
  step: number
  itemsSelected: {
    quantity: number
    sizes: ISizes,
    fruits: IFruit,
    complements: IComplements[]
  }
}

interface ISizes {
  size: string,
  price: number,
  time: number
}

interface IFruit {
  fruit: string,
  price: number
}

export interface IComplements{
  complement: string,
  price: number
}

const initialState = {
  sizes: [],
  fruits: [],
  complements: [],
  step: 0,
  itemsSelected: {
    quantity: 1,
    sizes: {} as ISizes,
    fruits: {} as IFruit,
    complements: [] as IComplements[]
  }
} as IInitialState


const acaiSlice = createSlice({
  name: 'acai',
  initialState,
  reducers:{
    addAcaiData(state, action){
      state.sizes = action.payload.sizes as ISizes[]
      state.fruits = action.payload.fruits as IFruit[]
      state.complements = action.payload.complements as IComplements[]
    },

    nextStep(state){
      if(state.step < 4){
        state.step += 1
      } else {
      }
    },
    changeItemSelected(state, action){
      if(action.payload.type === 'size') state.itemsSelected.sizes = action.payload.item
      else if(action.payload.type === 'fruit') state.itemsSelected.fruits = action.payload.item
      else if(action.payload.type === 'complement') state.itemsSelected.complements = action.payload.item
    },
    increaseQuantity(state){
      state.itemsSelected.quantity += 1
    },
    decreaseQuantity(state){
      if(state.itemsSelected.quantity > 1){
        state.itemsSelected.quantity -= 1
      }
    },
  }
})

export const { addAcaiData, nextStep, changeItemSelected, increaseQuantity, decreaseQuantity } = acaiSlice.actions

export const fetchAcaiData = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await api.get('/acai') as AxiosResponse
  return data
})

export default acaiSlice.reducer