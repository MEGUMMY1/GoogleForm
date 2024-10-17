import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import styles from "./Questions.module.scss";
import close_icon from "../../../assets/close_small.png";
import useEnterKey from "../../../hooks/handleKeyDown";
import { QuestionOption, updateFormState } from "../../../redux/formSlice";
import { useDispatch } from "react-redux";

interface DropdownProps {
  options: QuestionOption[];
  id: number;
  isPreview?: boolean;
}

export default function Dropdown({ options, id, isPreview = false }: DropdownProps) {
  const dispatch = useDispatch();
  const [newOptionText, setNewOptionText] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(updateFormState({ id, updatedState: { options: items } }));
  };

  const handleOptionChange = (optionId: number, newText: string) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, text: newText } : option
    );
    dispatch(updateFormState({ id, updatedState: { options: updatedOptions } }));
  };

  const handleAddOption = () => {
    if (newOptionText.trim() === "") return;

    const newOption: QuestionOption = {
      id: options.length > 0 ? options[options.length - 1].id + 1 : 1,
      text: newOptionText,
    };
    const updatedOptions = [...options, newOption];
    setNewOptionText("");
    dispatch(updateFormState({ id, updatedState: { options: updatedOptions } }));
  };

  const handleDeleteOption = (optionId: number) => {
    const updatedOptions = options.filter((option) => option.id !== optionId);
    dispatch(updateFormState({ id, updatedState: { options: updatedOptions } }));
  };

  const handleKeyDown = useEnterKey(handleAddOption);

  const handleDeleteKeyDown = (event: React.KeyboardEvent<HTMLImageElement>, optionId: number) => {
    if (event.key === "Enter") {
      handleDeleteOption(optionId);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dropdown-options">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
              {options.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.list_item}
                      tabIndex={-1}
                    >
                      <div className={styles.drag_handle}>::</div>
                      <span className={styles.option_number}>{index + 1}</span>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className={styles.option_input}
                        disabled={isPreview}
                      />
                      {!isPreview && index !== 0 && (
                        <img
                          src={close_icon}
                          className={styles.delete_button}
                          width={40}
                          height={40}
                          onClick={() => handleDeleteOption(option.id)}
                          onKeyDown={(e) => handleDeleteKeyDown(e, option.id)}
                          alt="삭제"
                          tabIndex={0}
                          role="button"
                        />
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {!isPreview && (
        <div className={styles.add_option_wrapper}>
          <input
            type="text"
            value={newOptionText}
            onChange={(e) => setNewOptionText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="옵션 추가"
            className={styles.new_option_input}
          />
        </div>
      )}
    </>
  );
}
