import React, { Component } from "react";

class Search extends Component {
  render() {
    const { value, onChange /* onFocus, onBlur */ } = this.props;

    return (
      <div className="form-group">
        <input
          value={value}
          placeholder="Search..."
          //   onFocus={onFocus}
          //   onBlur={onBlur}
          type="text"
          className="form-control"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    );
  }
}

export default Search;
