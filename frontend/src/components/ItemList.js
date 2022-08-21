import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0 && !!props.title) {
    return (
      <div
        className="container parent my-2 py-2 text-center bg-primary align-items-center"
        id="empty"
      >
        <div className="row">
          <div className="col py-3">
            <span className="display-1">
              <i class="bi bi-emoji-frown-fill"></i>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="py-4 no-items">
              <span>
                No items found for "<strong>{props.title}</strong>".
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (props.items.length === 0) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
