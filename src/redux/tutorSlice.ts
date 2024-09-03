import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface TutorState{
    id:string;
    name:string;
    email:string;
    profilePicture?:string|null;
    bio?:string;
    phone:string;
    courseAdded?:string[];
}

const initialState:TutorState={
    id:'',
    email:'',
    name:'',
    phone:'',
    bio:'',
    courseAdded:[],
    profilePicture:null,
}



const tutotSlice = createSlice({

    name:'tutor',
    initialState,
    reducers:{
        setTutor:(state,action: PayloadAction<TutorState>)=>{
            return {...state,...action.payload};
        },
    }

    
});


export const {setTutor }=tutotSlice.actions;

export default tutotSlice.reducer