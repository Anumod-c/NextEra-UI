import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Lesson {
  title: string;
  videoName: string | null; // Store only the file name
  description: string;
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
      lessons: [{ title: "", videoName: null, description: "" }],
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

  },
});

export const { saveAddCourse, saveAddCourse2,saveLessons } = courseSlice.actions;

export default courseSlice.reducer;
