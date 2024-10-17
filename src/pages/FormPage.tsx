import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import Title from "../components/Title/Title";
import styles from "./Page.module.scss";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RootState } from "../redux/store";
import {
  addQuestion,
  deleteQuestion,
  copyQuestion,
  updateFormState,
  dragEnd,
  setSelectedFormId,
  QuestionFormState,
} from "../redux/formSlice";

export default function FormPage() {
  const dispatch = useDispatch();
  const { questionForms, selectedFormId } = useSelector((state: RootState) => state.form);

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(deleteQuestion(id));
    toast("항목이 삭제되었습니다.");
  };

  const handleCopyQuestion = (id: number) => {
    dispatch(copyQuestion(id));
  };

  const handleUpdateFormState = (id: number, updatedState: Partial<QuestionFormState>) => {
    dispatch(updateFormState({ id, updatedState }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    dispatch(
      dragEnd({ sourceIndex: result.source.index, destinationIndex: result.destination.index })
    );
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
              {questionForms.map((form: QuestionFormState, index: number) => (
                <Draggable key={form.id} draggableId={form.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.form_container}
                      onClick={() => dispatch(setSelectedFormId(form.id))}
                    >
                      {selectedFormId === form.id && (
                        <>
                          <div className={styles.border} />
                          <div className={styles.navigation}>
                            <Nav onAddQuestion={handleAddQuestion} />
                          </div>
                        </>
                      )}
                      <QuestionForm
                        id={form.id}
                        questionType={form.questionType}
                        isRequired={form.isRequired}
                        questionText={form.questionText}
                        options={form.options}
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
