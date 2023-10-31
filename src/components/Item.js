import { useState } from "react";

function Item({ text, onDelete, index, onChange, type, rows }) {
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
      {itemContent}
      <button id="remove-button" onClick={(e) => onDelete(e, index)}>
        Remove
      </button>
    </>
  );
}

export default Item;
