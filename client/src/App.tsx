import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersonalityTest from "./pages/PersonalityTest";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="personality/">
          <Route path=":questionId" element={<PersonalityTest />} />
        </Route>
        <Route path="results/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
