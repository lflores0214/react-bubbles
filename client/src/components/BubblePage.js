import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/PrivateRoute"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = () => {
    const authAxios = axiosWithAuth();
    authAxios.get('/api/colors')
    .then(response => {
      console.log(response)
      setColorList(response.data)
    })
    .catch(error => console.log(error))
  }
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
