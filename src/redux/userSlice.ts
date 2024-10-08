import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface UserState{
    id:string;
    name:string;
    age?:number;
    email:string;
    profilePicture?:string|null;
    bio?:string;
    phone:string;
    linkedin:string;
    instagram:string;
    facebook:string;
    twitter:string;
    coursesEnrolled?:string[];
    completedCourses?:string[];
}

const initialState:UserState={
    id:'',
    name:'',
    email:'',
    bio:'',
    age:0,
    phone:'',
    facebook:'',
    instagram:'',
    linkedin:'',
    twitter:'',
    completedCourses:[],
    coursesEnrolled:[],
    profilePicture:null,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<UserState>) => {
            // Directly setting user data on login or registration
            return { ...state, ...action.payload };
          },
          updateProfilePicture: (state, action: PayloadAction<string>) => {
            state.profilePicture = action.payload;
          },
       
        //   completeCourse: (state, action: PayloadAction<string>) => {
        //     state.completedCourses.push(action.payload);
        //   },,
        clearUserDetails:(state)=>{
            state.id='';
            state.name='';
            state.email='';
            state.bio= '';
            state.age=0,
            state.phone='';
            state.completedCourses=[];
            state.coursesEnrolled=[];
            state.profilePicture=null;
            state.instagram='',
            state.facebook='',
            state.twitter='',
            state.linkedin=''
        }


    }

})
export const { setUser, updateProfilePicture ,clearUserDetails} = userSlice.actions;

export default userSlice.reducer;