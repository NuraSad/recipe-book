import { Fragment } from "react";

import Item from "./Item";

function ItemsList({
  list,
  // moveItem,
  onDelete,
  type,
  text,
  addItem,
  onChange,
  rows,
}) {
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
