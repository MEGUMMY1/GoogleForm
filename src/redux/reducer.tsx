interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  questionType: "객관식 질문",
};

export const questionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_QUESTION_TYPE":
      return { ...state, questionType: action.payload };
    default:
      return state;
  }
};
