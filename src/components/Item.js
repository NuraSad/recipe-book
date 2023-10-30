import { useState, useRef } from "react";
import { ItemTypes } from "../constants/Constants";
import { useDrag, useDrop } from "react-dnd";

function Item({ text, onDelete, index, onChange, moveItem, type, rows }) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes[type],
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes[type],
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  let itemContent;
  if (isEditing) {
    itemContent = (
      <>
        <textarea
          value={text}
          rows={rows}
          onChange={(e) => {
            onChange(e, index);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    itemContent = (
      <>
        <textarea
          name={`${type}${index}`}
          ref={ref}
          type="text"
          value={text}
          rows={rows}
          style={{ opacity: isDragging ? 0 : 1 }}
          readOnly
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <div id="item-block" ref={ref} data-handler-id={handlerId}>
      {itemContent}
      <button id="remove-button" onClick={(e) => onDelete(e, index)}>
        Remove
      </button>
    </div>
  );
}

export default Item;
