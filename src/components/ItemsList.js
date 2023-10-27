import { Fragment, useState } from "react";

import Item from "./Item";

function ItemsList({ list, onDelete, type, text, addItem, onChange, rows }) {
  const [items, setItems] = useState(list);

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedArray;
      });
    }
  };

  return (
    <>
      {list.length
        ? list.map((item, i) => {
            return (
              <Fragment key={i}>
                <Item
                  text={item}
                  onDelete={onDelete}
                  index={i}
                  onChange={onChange}
                  moveItem={moveItem}
                  type={type}
                  rows={rows}
                />
              </Fragment>
            );
          })
        : null}
      <textarea ref={text} rows={rows} />
      <button onClick={(event) => addItem(event)}>{`Add ${type}`}</button>
    </>
  );
}

export default ItemsList;
