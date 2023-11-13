import { useState } from "react";

function Item({ text, onDelete, index, onChange, moveItem, type, rows, list }) {
  const [isEditing, setIsEditing] = useState(false);

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
          type="text"
          value={text}
          rows={rows}
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
    <>
      <div id="arrow-button-field">
        {index === 0 ? null : (
          <button
            id="arrow-button-up"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveItem(index, "Up");
            }}
          ></button>
        )}
        {index === list.length - 1 ? null : (
          <button
            id="arrow-button-down"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveItem(index, "Down");
            }}
          ></button>
        )}
      </div>
      {itemContent}
      <button id="remove-button" onClick={(e) => onDelete(e, index)}>
        Remove
      </button>
    </>
  );
}

export default Item;
