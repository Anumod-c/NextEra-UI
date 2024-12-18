import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Option {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  question: string;
  options: Option[];
}
export interface Lesson {
  title: string;
  video: string | null; // Store only the file name
  description: string;
  quizzes:Quiz[]
}

export interface Section {
  title: string;
  lessons: Lesson[];
}


interface CourseState {
  addCourse: {
    courseTitle: string;
    courseDesc: string;
    coursePrice: number;
    courseDiscountPrice: number;
    courseCategory: string;
    courseLevel: string;
    demoURL: string;
    thumbnail: string;
  };
  addCourse2: {
    prerequisites: string[];
    benefits: string[];
  };
  sections: Section[];

  courseDetails: {
    courseTitle: string;
    courseDesc: string;
    coursePrice: number;
    courseDiscountPrice: number;
    courseCategory: string;
    courseLevel: string;
    demoURL: string;
    thumbnail: string;
    prerequisites: string[];
    benefits: string[];
    sections:Section[]
  };
}

const initialState: CourseState = {
  addCourse: {
    courseTitle: "",
    courseDesc: "",
    coursePrice: 0,
    courseDiscountPrice: 0,
    courseCategory: "",
    courseLevel: "",
    demoURL: "",
    thumbnail: "",
  },
  addCourse2: {
    prerequisites: [],
    benefits: [],
  },
  sections: [
    {
      title: "",
      lessons: [{ title: "", video: null, description: "",quizzes:[] }],
    },
  ],
 
  courseDetails: {
    courseTitle: "",
    courseDesc: "",
    coursePrice: 0,
    courseDiscountPrice: 0,
    courseCategory: "",
    courseLevel: "",
    demoURL: "",
    thumbnail: "",
    prerequisites: [],
    benefits: [],
    sections:[],

  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    saveAddCourse(state, action: PayloadAction<CourseState["addCourse"]>) {
      state.addCourse = action.payload;
      state.courseDetails = {
        ...state.courseDetails,
        ...action.payload,
      };
    },
    saveAddCourse2(state, action: PayloadAction<CourseState["addCourse2"]>) {
      state.addCourse2 = action.payload;
      state.courseDetails = {
        ...state.courseDetails,
        ...action.payload,
      };
    },
    saveLessons(state, action: PayloadAction<Section[]>) {
      state.sections = action.payload;
      state.courseDetails.sections = action.payload;
    },
    clearCourseData(state) {
      state.addCourse = initialState.addCourse;
      state.addCourse2 = initialState.addCourse2;
      state.sections = initialState.sections;
      state.courseDetails = initialState.courseDetails;
    },
  },
});

export const { saveAddCourse, saveAddCourse2,saveLessons,clearCourseData } = courseSlice.actions;

export default courseSlice.reducer;
