import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Routers from "./routes/Routers";

function App() {
  return (
    <BrowserRouter>
      <Routers />
      <Toaster 
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        expand={true}
      />
    </BrowserRouter>
  );
}

export default App;
