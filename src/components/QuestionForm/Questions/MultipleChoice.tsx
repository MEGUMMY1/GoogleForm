import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import styles from "./Questions.module.scss";
import close_icon from "../../../assets/close_small.png";
import useEnterKey from "../../../hooks/handleKeyDown";

export default function MultipleChoice() {
  const [options, setOptions] = useState([{ id: "1", text: "옵션1", isChecked: false }]);
  const [newOptionText, setNewOptionText] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOptions(items);
  };

  const handleOptionChange = (id: string, newText: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.id === id ? { ...option, text: newText } : option))
    );
  };

  const handleAddOption = () => {
    if (newOptionText.trim() === "") return;
    const newOption = {
      id: (options.length + 1).toString(),
      text: newOptionText,
      isChecked: false,
    };
    setOptions([...options, newOption]);
    setNewOptionText("");
  };

  const handleDeleteOption = (id: string) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.id !== id));
  };

  const handleKeyDown = useEnterKey(handleAddOption);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="options">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
              {options.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.list_item}
                    >
                      <div className={styles.drag_handle}>::</div>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className={styles.option_input}
                      />
                      {index !== 0 && (
                        <img
                          src={close_icon}
                          className={styles.delete_button}
                          width={40}
                          height={40}
                          onClick={() => handleDeleteOption(option.id)}
                          alt="닫기"
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
    </>
  );
}
