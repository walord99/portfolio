import {  useState } from "react";
import "../css/BackgroundSettings.css";

export type sliderData = {
  name: string;
  rangeMin: number;
  rangeMax: number;
  rangeStep?: number;
  currentValue: number;
};

export type silderGroup = {
  name: string;
  min: sliderData,
  max: sliderData,
  speed: sliderData,
  scale: sliderData
}


function Slider({ slide }: { slide: sliderData }) {

  const [value, setValue] = useState(slide.currentValue);

  return (
    <div>
      <p>{slide.name}</p>
      <input 
        className="win10-thumb"
        type="range"
        name={slide.name}
        id={slide.name}
        min={slide.rangeMin}
        max={slide.rangeMax}
        step={slide.rangeStep}
        value={value}
        onChange={(e) => {
          slide.currentValue = parseInt( e.target.value);
          setValue(slide.currentValue);
        }}
      />
    </div>
  );
}

function BackgroundSettings({settings}: {settings: silderGroup[]}) {

  return (
    <div id="settings">
      {settings.map((group) => {
        return (
          <div key={group.name} className={group.name}>
            <p>{group.name}</p>
            <Slider slide={group.min}/>
            <Slider slide={group.max}/>
            <Slider slide={group.speed}/>
            <Slider slide={group.scale}/>

          </div>
        );
      })}
    </div>
  );
}

export default BackgroundSettings;
