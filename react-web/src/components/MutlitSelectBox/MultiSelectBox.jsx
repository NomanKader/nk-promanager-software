import React from "react";
import { Select, MenuItem, OutlinedInput, Checkbox, ListItemText } from "@mui/material";

const MultiSelectBox = ({ label,placeHolder,selectedOptions, handleChange, options }) => {
  const handleSizeChange = (event) => {
    const { value } = event.target;

    const jonValue = {
      target: {
        name: label, 
        value: value.join(", "), 
      },
    };

    handleChange(jonValue); 
  };

  return (
    <Select
      multiple
      displayEmpty
      name={label}
      value={selectedOptions ? selectedOptions.split(", ") : []} 
      onChange={handleSizeChange}
      input={<OutlinedInput />}
      renderValue={(selected) =>
        selected.length > 0 ? selected.join(", ") : <em>{placeHolder}</em>
      } 
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200, 
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox
            checked={
              selectedOptions ? selectedOptions.split(", ").includes(option) : false
            }
          />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultiSelectBox;
