import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";
import JobApply from "./pages/JobApply";
import ApplicationStatus from "./pages/ApplicationStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vagas" element={<Jobs />} />
        <Route path="/vagas/:id" element={<JobDetails />} />
        <Route path="/vagas/:id/apply" element={<JobApply />} />
        <Route path="/candidaturas/:id" element={<ApplicationStatus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
