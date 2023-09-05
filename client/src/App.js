import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Developers from './Pages/Developers'
import Proshow from "./Pages/Proshow";
import Contact from "./Pages/Contact";
import Events from "./Pages/Events.jsx";
import ProshowFinal from "./Pages/ProshowFinal";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Developers/>} />
        {/* <Route path="proshow" element={<Proshow/>} /> */}
        <Route path="proshow" element={<ProshowFinal/>} />
        <Route path="events" element={<Events/>} />
        <Route path="contact" element={<Contact/>} />

      </Routes>
    </>
  );
}
export default App;
