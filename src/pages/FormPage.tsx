import { useState } from "react";
import Nav from "../components/Nav/Nav";
import Title from "../components/Title/Title";
import styles from "./Page.module.scss";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(questionForms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestionForms(items);
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questionForms">
          {(provided) => (
            <div
              className={styles.components_container}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Title />
              <Nav onAddQuestion={handleAddQuestion} />
              {questionForms.map((form, index) => (
                <Draggable key={form.id} draggableId={form.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <QuestionForm
                        id={form.id}
                        questionType={form.questionType}
                        isRequired={form.isRequired}
                        onDelete={handleDeleteQuestion}
                        onCopy={handleCopyQuestion}
                        onUpdateFormState={handleUpdateFormState}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
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
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
