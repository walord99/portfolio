import Header from "./components/Header";
import Projects from "./pages/Projects";
import GradientBackground from "./components/Background";
import BackgroundSettings from "./pages/BackgroundSettings";

import { sliderData, sliderGroup } from "./pages/BackgroundSettings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page_404 from "./pages/404";
import About from "./pages/About";

// type BackgroundSettings = {
//   : number;
// }

// const backgroundContext = createContext()

function App() {
  const setting1: sliderData = {
    name: "Min Value",
    rangeMin: 0,
    rangeMax: 100,
    rangeStep: 1,
    currentValue: 30,
  };
  const range1: sliderData = {
    name: "Max Value",
    rangeMin: 0,
    rangeMax: 100,
    rangeStep: 1,
    currentValue: 60,
  };
  const speed1: sliderData = {
    name: "Speed",
    rangeMin: 0,
    rangeMax: 100,
    rangeStep: 1,
    currentValue: 30,
  };

  const zoom1: sliderData = {
    name: "Scale",
    rangeMin: 1,
    rangeMax: 100,
    currentValue: 33,
  };

  const group1: sliderGroup = {
    name: "Red",
    min: setting1,
    max: range1,
    speed: speed1,
    scale: zoom1,
  };

  const settings = [
    group1,
    JSON.parse(JSON.stringify(group1)),
    JSON.parse(JSON.stringify(group1)),
  ];
  settings[1].name = "Green";
  settings[2].name = "Blue";
  settings[1].min.currentValue = 0;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <GradientBackground settings={settings} />
      <div id="container">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route
            path="/settings"
            element={<BackgroundSettings settings={settings} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<Page_404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// <GradientBackground settings={settings} />
// <div id="container">
//   <Header />
//   {/* <Projects /> */}
//   <BackgroundSettings settings={settings} />
// </div>
