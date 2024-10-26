import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Qualification {
    qualification: string;
    certificate: string;
}
interface TutorState{
    id:string;
    name:string;
    email:string;
    profilePicture?:string;
    bio?:string;
    phone:string;
    linkedin?:string;
    instagram?:string;
    facebook?:string;
    twitter?:string;
    courses?:string[];
    cv?:string;
    expertise?:string[];
    qualifications?:Qualification[];
    status?:boolean;

}

const initialState:TutorState={
    id:'',
    email:'',
    name:'',
    phone:'',
    bio:'',
    facebook:'',
    instagram:'',
    linkedin:'',
    twitter:'',
    courses:[],
    profilePicture:'',
    cv: '',
    expertise: [],
    qualifications: [],
    status:true,
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
            state.facebook='';
            state.instagram='';
            state.linkedin='';
            state.twitter='';
            state.courses=[];
            state.profilePicture='';
            state.cv = '';
            state.expertise = [];
            state.qualifications = [];
            state.status = true;
        }
    },
    

    
});


export const {setTutor,clearTutorDetails }=tutotSlice.actions;

export default tutotSlice.reducer