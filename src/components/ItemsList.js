import { Fragment, useCallback } from "react";

import Item from "./Item";

function ItemsList({
  list,
  moveItem,
  onDelete,
  type,
  text,
  addItem,
  onChange,
  rows,
}) {
  const renderItem = useCallback((item, i) => {
    return (
      <Item
        key={i}
        text={item}
        onDelete={onDelete}
        index={i}
        onChange={onChange}
        moveItem={moveItem}
        type={type}
        rows={rows}
      />
    );
  }, []);
  return (
    <>
      {list.length
        ? list.map((item, i) => renderItem(item, i))
        : // return (
          //   <Fragment key={i}>
          //     <Item
          //       text={item}
          //       key={i}
          //       onDelete={onDelete}
          //       index={i}
          //       onChange={onChange}
          //       moveItem={moveItem}
          //       type={type}
          //       rows={rows}
          //     />
          //   </Fragment>
          // );
          null}
      <textarea ref={text} rows={rows} />
      <button onClick={(event) => addItem(event)}>{`Add ${type}`}</button>
    </>
  );
}

export default ItemsList;
