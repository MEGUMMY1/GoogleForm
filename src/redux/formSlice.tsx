import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  title: string;
  subtitle: string;
  questionType: string;
}

const initialState: FormState = {
  title: "제목 없는 설문지",
  subtitle: "설문지 설명",
  questionType: "객관식 질문",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setSubtitle(state, action: PayloadAction<string>) {
      state.subtitle = action.payload;
    },
    setQuestionType(state, action: PayloadAction<string>) {
      state.questionType = action.payload;
    },
  },
});

export const { setTitle, setSubtitle, setQuestionType } = formSlice.actions;
export default formSlice.reducer;
