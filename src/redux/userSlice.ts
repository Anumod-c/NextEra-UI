import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface UserState{
    id:string;
    name:string;
    email:string;
    profilePicture?:string|null;
    bio?:string;
    phone:string;
    coursesEnrolled?:string[];
    completedCourses?:string[];
}

const initialState:UserState={
    id:'',
    name:'',
    email:'',
    bio:'',
    phone:'',
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
        //   updateBio: (state, action: PayloadAction<string>) => {
        //     state.bio = action.payload;
        //   },
        //   addCourse: (state, action: PayloadAction<string>) => {
        //     state.coursesEnrolled.push(action.payload);
        //   },
        //   completeCourse: (state, action: PayloadAction<string>) => {
        //     state.completedCourses.push(action.payload);
        //   },,
        clearUserDetails:(state)=>{
            state.id='';
            state.name='';
            state.email='';
            state.bio='';
            state.phone='';
            state.completedCourses=[];
            state.coursesEnrolled=[];
            state.profilePicture=null;
        }


    }

})
export const { setUser, updateProfilePicture ,clearUserDetails} = userSlice.actions;

export default userSlice.reducer;