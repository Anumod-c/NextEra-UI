import { createSlice, PayloadAction } from '@reduxjs/toolkit';


  

interface CourseState {
    addCourse: {
        courseTitle: string;
        courseDesc: string;
        coursePrice: number;
        courseDiscountPrice:number;
        courseCategory: string;
        courseLevel: string;
        demoURL: string;
        thumbnail:File| null;
    };
    addCourse2: {
        prerequisites: string[];
        benefits: string[];
    };

}

const initialState: CourseState = {
    addCourse: {
        courseTitle: '',
        courseCategory: '',
        courseDesc: '',
        courseLevel: '',
        coursePrice: 0,
        courseDiscountPrice:0,
        demoURL: '',
        thumbnail: null,
    },
    addCourse2: {
        benefits:[],
        prerequisites: [],
    },

};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        saveAddCourse(state, action: PayloadAction<CourseState['addCourse']>) {
            state.addCourse = action.payload;
        },
        saveAddCourse2(state, action: PayloadAction<CourseState['addCourse2']>) {
            state.addCourse2 = action.payload;
        },
        
    },
});

export const { saveAddCourse, saveAddCourse2 } = courseSlice.actions;
export default courseSlice.reducer;
