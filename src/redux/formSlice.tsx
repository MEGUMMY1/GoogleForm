import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionFormState {
  id: number;
  questionType: string;
  isRequired: boolean;
  questionText: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: number;
  text: string;
  isChecked?: boolean;
}

interface FormState {
  questionForms: QuestionFormState[];
  selectedFormId: number | null;
  title: string;
  subtitle: string;
  answers: { [key: number]: string | string[] };
}

const initialState: FormState = {
  questionForms: [
    {
      id: 0,
      questionType: "객관식 질문",
      isRequired: false,
      questionText: "",
      options: [{ id: 1, text: "옵션1" }],
    },
  ],
  selectedFormId: null,
  title: "설문지 제목",
  subtitle: "설문지 설명",
  answers: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addQuestion(state) {
      state.questionForms.push({
        id: state.questionForms.length,
        questionType: "객관식 질문",
        isRequired: false,
        questionText: "",
        options: [{ id: 1, text: "옵션1" }],
      });
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      state.questionForms = state.questionForms.filter((form) => form.id !== action.payload);
      if (state.selectedFormId === action.payload) {
        state.selectedFormId = null;
      }

      delete state.answers[action.payload];
    },
    copyQuestion(state, action: PayloadAction<number>) {
      const formIndex = state.questionForms.findIndex((form) => form.id === action.payload);
      if (formIndex !== -1) {
        const formToCopy = state.questionForms[formIndex];
        const newForm = {
          ...formToCopy,
          id: state.questionForms.length,
        };
        state.questionForms.splice(formIndex + 1, 0, newForm);
      }
    },
    updateFormState(
      state,
      action: PayloadAction<{ id: number; updatedState: Partial<QuestionFormState> }>
    ) {
      const { id, updatedState } = action.payload;
      const index = state.questionForms.findIndex((form) => form.id === id);
      if (index !== -1) {
        state.questionForms[index] = {
          ...state.questionForms[index],
          ...updatedState,
        };
      }
    },
    dragEnd(state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const reorderedItems = Array.from(state.questionForms);
      const [movedItem] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, movedItem);
      state.questionForms = reorderedItems;
    },
    setSelectedFormId(state, action: PayloadAction<number | null>) {
      state.selectedFormId = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setSubtitle(state, action: PayloadAction<string>) {
      state.subtitle = action.payload;
    },
    submitAnswers(state, action: PayloadAction<{ [key: number]: string | string[] }>) {
      state.answers = action.payload;
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  copyQuestion,
  updateFormState,
  dragEnd,
  setSelectedFormId,
  setTitle,
  setSubtitle,
  submitAnswers,
} = formSlice.actions;

export default formSlice.reducer;
