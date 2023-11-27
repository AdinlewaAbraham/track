// App.js or your main component

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Track from "./pages/TrackPage/Track";
import TrackHome from "./pages/TrackPage/TrackHome";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/track/:trip_id" element={<Track />} />
        <Route exact path="/track/" element={<TrackHome />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
