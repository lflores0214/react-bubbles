import React, { useState } from "react";
import { axiosWithAuth } from "../utils/PrivateRoute";

const initialColor = {
  color: "",
  code: { hex: "" }
};
const authAxios = axiosWithAuth();
const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = (color, code, hex) => {
    const newColor = { color: color, code: { hex: hex } };
    const authAxios = axiosWithAuth();
    authAxios
      .post("/api/colors", newColor)
      .then(response => {
        console.log("POST SUCCESS", response.data);
        getColors()
      })
      .catch(error => {
        console.log("POST FAIL", error);
      });
  };
  const handleChange = e => {
    setColorToAdd({
      ...colorToAdd,
      [e.target.name]: e.target.value
    });
  };
  const handleAdd = e => {
    e.preventDefault();
    addColor(colorToAdd.color, colorToAdd.code.hex);
    setColorToAdd({ color: "", code: { hex: "" } });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = () => {
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    authAxios
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log("EDIT Success", response);
        getColors();
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color);
    authAxios
      .delete(`/api/colors/${color.id}`, colors.id)
      .then(response => {
        console.log("Delete Success", response);
        getColors();
      })
      .catch(error => console.log("DELETE", error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        <button onClick={getColors}>Get Colors</button>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form
          onSubmit={e => {
            e.preventDefault();
            saveEdit();
          }}
        >
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="color"
          onChange={handleChange}
          value={colors.color}
          placeholder="add a color"
        />
        <input 
        type="text"
        name="hex"
        onChange={handleChange}
        value={colors.hex}
        placeholder="Hex Code"
        />
        <button type="submit" >Add Your Color</button>
      </form>
    </div>
  );
};

export default ColorList;
