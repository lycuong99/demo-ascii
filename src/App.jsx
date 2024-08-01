/* eslint-disable react/no-unknown-property */
import "./App.css";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { Router } from "./router";
import { useGLTF } from "@react-three/drei";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router />
      <Toaster
        theme="dark"
        className="toaster group font-neu"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
      />
    </>
  );
}
useGLTF.preload("logo.glb");

export default App;
