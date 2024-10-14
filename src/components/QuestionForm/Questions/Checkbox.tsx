import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

export default function CheckBox() {
  const [options, setOptions] = useState([
    { id: "1", text: "옵션 1", isChecked: false },
    { id: "2", text: "옵션 2", isChecked: false },
    { id: "3", text: "옵션 3", isChecked: false },
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOptions(items);
  };

  const toggleCheckbox = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="checkboxes">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((option, index) => (
              <Draggable key={option.id} draggableId={option.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <input
                      type="checkbox"
                      checked={option.isChecked}
                      onChange={() => toggleCheckbox(option.id)}
                    />
                    {option.text}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
