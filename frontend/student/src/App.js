import StudentForm from "./StudentForm.js";
import ResultMarksheet from "./ResultMarksheet";
import {Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
        <Router>
            <Routes>
                    <Route path="/" element={<StudentForm />} />
                    <Route path="result" element={<ResultMarksheet />} />
            </Routes>
        </Router>
    </>
  );
}
export default App;