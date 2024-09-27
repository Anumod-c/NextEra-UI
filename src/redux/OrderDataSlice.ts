import { createSlice } from "@reduxjs/toolkit";


// interface Order{
//     userId: string;
//   transactionId: string;
//   tutorId: string;
//   courseId: string;
//   title: string;
//   thumbnail: string;
//   price: string;
//   createdAt: Date|null;
//   paymentStatus: boolean;
// }

const initialState={
 order:{}
}

const oderDataSlice =createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrderData:(state,action)=>{
           state.order=action.payload
        },
        clearOrderData: (state) => {
            state.order={}
        },
    }
});

export const {setOrderData,clearOrderData }= oderDataSlice.actions;
export default oderDataSlice.reducer