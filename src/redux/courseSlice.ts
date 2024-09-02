import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CourseState {
    addCourse: {
        courseTitle: string;
        courseDesc: string;
        coursePrice: string;
        courseCategory: string;
        courseLevel: string;
        demoURL: string;
        thumbnail: string;
    };
    addCourse2: {
        prerequisites: string[];
        benefits: string[];
    };
    addLesson: {
        lessons: { title: string; video: File | null; description: string }[];
    };
}

const initialState: CourseState = {
    addCourse: {
        courseTitle: '',
        courseCategory: '',
        courseDesc: '',
        courseLevel: '',
        coursePrice: '',
        demoURL: '',
        thumbnail: '',
    },
    addCourse2: {
        benefits:[],
        prerequisites: [],
    },
    addLesson: {
        lessons: [{ title: '', video: null, description: '' }],
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
        saveAddLessons(state, action: PayloadAction<CourseState['addLesson']>) {
            state.addLesson = action.payload;
        },
    },
});

export const { saveAddCourse, saveAddCourse2, saveAddLessons } = courseSlice.actions;
export default courseSlice.reducer;
