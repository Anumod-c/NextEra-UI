import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Lesson {
  lessonTitle: string;
  lessonDesc: string;
  videoKey?: string;
}

interface Section {
  sectionTitle: string;
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
    thumbnail: File | null;
  };
  addCourse2: {
    prerequisites: string[];
    benefits: string[];
  };
  addLessons: {
    sections: Section[];
  };
  courseDetails: {
    courseTitle: string;
    courseDesc: string;
    coursePrice: number;
    courseDiscountPrice: number;
    courseCategory: string;
    courseLevel: string;
    demoURL: string;
    thumbnail: File | null;
    prerequisites: string[];
    benefits: string[];
    sections: Section[];
  };
}

const initialState: CourseState = {
  addCourse: {
    courseTitle: '',
    courseCategory: '',
    courseDesc: '',
    courseLevel: '',
    coursePrice: 0,
    courseDiscountPrice: 0,
    demoURL: '',
    thumbnail: null,
  },
  addCourse2: {
    benefits: [],
    prerequisites: [],
  },
  addLessons: {
    sections: [],
  },
  courseDetails: {
    courseTitle: '',
    courseDesc: '',
    coursePrice: 0,
    courseDiscountPrice: 0,
    courseCategory: '',
    courseLevel: '',
    demoURL: '',
    thumbnail: null,
    prerequisites: [],
    benefits: [],
    sections: [],
  },
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    saveAddCourse(state, action: PayloadAction<CourseState['addCourse']>) {
      state.addCourse = action.payload;
      state.courseDetails = {
        ...state.courseDetails,
        ...action.payload,
      };
    },
    saveAddCourse2(state, action: PayloadAction<CourseState['addCourse2']>) {
      state.addCourse2 = action.payload;
      state.courseDetails = {
        ...state.courseDetails,
        ...action.payload,
      };
    },
    setLessons(state, action: PayloadAction<CourseState['addLessons']>) {
      state.addLessons = action.payload;
      state.courseDetails.sections = action.payload.sections;
    },
    addSection(state, action: PayloadAction<Section>) {
      state.addLessons.sections.push(action.payload);
      state.courseDetails.sections.push(action.payload);
    },
    updateLesson(
      state,
      action: PayloadAction<{
        sectionIndex: number;
        lessonIndex: number;
        lessonData: Lesson;
      }>
    ) {
      const { sectionIndex, lessonIndex, lessonData } = action.payload;
      const section = state.addLessons.sections[sectionIndex];
      if (section) {
        section.lessons[lessonIndex] = { ...section.lessons[lessonIndex], ...lessonData };
        state.courseDetails.sections[sectionIndex].lessons[lessonIndex] = {
          ...section.lessons[lessonIndex],
          ...lessonData,
        };
      }
    },
  },
});

export const {
  saveAddCourse,
  saveAddCourse2,
  addSection,
  setLessons,
  updateLesson,
} = courseSlice.actions;

export default courseSlice.reducer;
