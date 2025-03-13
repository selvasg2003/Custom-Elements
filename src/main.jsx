import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dropdown from './Components/Dropdown.jsx'
import { Countries } from './utils/Countries.js'
import VideosEmbed from './Components/VideosEmbed.jsx'
// import './index.css'
import App from './App.jsx'
import IFrame from './Components/IFrame.jsx'
import Video from './Components/Video.jsx'
import AppointmentRecurrence from './Components/AppointmentReccurence.jsx'
import InpersonEvent from "./Components/InpersonEvent.jsx";
import {} from "./Components/VideosEmbed.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App />
       */}
      <Routes>
        <Route path="/" element={<Dropdown countries={Countries} />} />
        <Route path="/dropdown" element={<Dropdown countries={Countries} />} />
        <Route path="/iframe" element={<IFrame />} />
        <Route path="/video" element={<Video />} />
        <Route path="/appointment" element={<AppointmentRecurrence />} />
        <Route path="/videosembed" element={<VideosEmbed />} />
        <Route path="/inpersonevent" element={<InpersonEvent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
