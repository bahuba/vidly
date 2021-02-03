import React from "react";
import { PropTypes } from "prop-types";

// Input:
//  items: array - object must have a name and value property
//  selectedItem: object - selected item
//  textProperty: string - item field name that maps to the display name
//  valueProperty: string - item field name that maps to the unique id
// Output:
//  onListItemChanged ( listItem: object )

const ListGroup = (props) => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty,
  } = props;
  const itemClassName = "list-group-item";

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? itemClassName + " active" : itemClassName
          }
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
};

export default ListGroup;
