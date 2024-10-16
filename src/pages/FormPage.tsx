import { useState } from "react";
import Nav from "../components/Nav/Nav";
import Title from "../components/Title/Title";
import styles from "./Page.module.scss";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface QuestionFormState {
  id: number;
  questionType: string;
  isRequired: boolean;
}

export default function FormPage() {
  const [questionForms, setQuestionForms] = useState<QuestionFormState[]>([
    { id: 0, questionType: "객관식 질문", isRequired: false },
  ]);

  const handleAddQuestion = () => {
    setQuestionForms((prevForms) => [
      ...prevForms,
      { id: prevForms.length, questionType: "객관식 질문", isRequired: false },
    ]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestionForms((prevForms) => prevForms.filter((form) => form.id !== id));
    toast("항목이 삭제되었습니다.");
  };

  const handleCopyQuestion = (id: number) => {
    const formIndex = questionForms.findIndex((form) => form.id === id);
    if (formIndex !== -1) {
      const formToCopy = questionForms[formIndex];
      const newForm = {
        ...formToCopy,
        id: questionForms.length,
      };

      setQuestionForms((prevForms) => [
        ...prevForms.slice(0, formIndex + 1),
        newForm,
        ...prevForms.slice(formIndex + 1),
      ]);
    }
  };

  const handleUpdateFormState = (id: number, updatedState: Partial<QuestionFormState>) => {
    setQuestionForms((prevForms) =>
      prevForms.map((form) => (form.id === id ? { ...form, ...updatedState } : form))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.components_container}>
        <Title />
        <Nav onAddQuestion={handleAddQuestion} />
        {questionForms.map((form) => (
          <QuestionForm
            key={form.id}
            id={form.id}
            questionType={form.questionType}
            isRequired={form.isRequired}
            onDelete={handleDeleteQuestion}
            onCopy={handleCopyQuestion}
            onUpdateFormState={handleUpdateFormState}
          />
        ))}
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
