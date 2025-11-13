import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestApi from "./pages/testApi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<testApi />} />
      </Routes>
    </Router>
  );
}

export default App;
