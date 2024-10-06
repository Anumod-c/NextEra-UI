import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface TutorState{
    id:string;
    name:string;
    email:string;
    profilePicture?:string|null;
    bio?:string;
    phone:string;
    courses?:string[];
}

const initialState:TutorState={
    id:'',
    email:'',
    name:'',
    phone:'',
    bio:'',
    courses:[],
    profilePicture:null,
}



const tutotSlice = createSlice({

    name:'tutor',
    initialState,
    reducers:{
        setTutor:(state,action: PayloadAction<TutorState>)=>{
            return {...state,...action.payload};
        },
        clearTutorDetails:(state)=>{
            state.id='';
            state.name='';
            state.email='';
            state.bio='';
            state.phone='';
            state.courses=[];
            state.profilePicture=null;
        }
    },
    

    
});


export const {setTutor,clearTutorDetails }=tutotSlice.actions;

export default tutotSlice.reducer