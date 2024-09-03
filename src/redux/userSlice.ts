import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface UserState{
    id:string;
    name:string;
    email:string;
    profilePicture:string|null;
    bio:string;
    coursesEnrolled:string[];
    completedCourses:string[];
}

const initialState:UserState={
    id:'',
    name:'',
    email:'',
    bio:'',
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
          updateBio: (state, action: PayloadAction<string>) => {
            state.bio = action.payload;
          },
          addCourse: (state, action: PayloadAction<string>) => {
            state.coursesEnrolled.push(action.payload);
          },
          completeCourse: (state, action: PayloadAction<string>) => {
            state.completedCourses.push(action.payload);
          },
    }

})
export const { setUser, updateProfilePicture, updateBio, addCourse, completeCourse } = userSlice.actions;

export default userSlice.reducer;