/* eslint-disable react/no-unknown-property */
import { Canvas, extend } from "@react-three/fiber";
import "./App.css";
import { MatrixMaterial } from "./material/MatrixMaterial";
import Scene from "./Scene";
extend({ MatrixMaterial });
function App() {
  return (
    <main>
      <Canvas className="canvas">
        <Scene />
      </Canvas>
    </main>
  );
}

export default App;
