import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import CharacterSearchPage from "./pages/CharacterSearchPage";
import LocationSearchPage from "./pages/LocationSearchPage";
import EpisodeSearchPage from "./pages/EpisodeSearchPage";

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/characters" element={<CharacterSearchPage />} />
        <Route path="/locations" element={<LocationSearchPage />} />
        <Route path="/episodes" element={<EpisodeSearchPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;
