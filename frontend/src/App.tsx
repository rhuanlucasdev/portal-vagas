import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
// import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vagas" element={<Jobs />} />
        {/* <Route path="/vagas/:id" element={<JobDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
