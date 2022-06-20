import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "typeface-krona-one";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
