import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CharacterPage from "./pages/CharacterPage";
import SearchPage from "./pages/SearchPage";
import EpisodePage from "./pages/EpisodePage";
import LocationPage from "./pages/LocationPage";

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/characters" element={<SearchPage type="character" />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/locations" element={<SearchPage type="location" />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/episodes" element={<SearchPage type="episode" />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
      </Routes>
    );
  }
}

export default AppRoutes;
