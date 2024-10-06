import StudentForm from "./pages/StudentForm.js";
import ResultMarksheet from "./pages/ResultMarksheet.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/result/:serialNo" element={<ResultMarksheet />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
