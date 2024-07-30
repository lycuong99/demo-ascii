/* eslint-disable react/no-unknown-property */
import "./App.css";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { Router } from "./router";
import { useGLTF } from "@react-three/drei";


function App() {
  return <Router />;
}
useGLTF.preload('logo.glb')

export default App;
