import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface AdminState{
    id:string;
}

const initialState:AdminState={
    id:'',
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdmin:(state,action: PayloadAction<AdminState>)=>{
            return {state,...action.payload};
        }
    }
})


export const { setAdmin}= adminSlice.actions;
export default adminSlice.reducer