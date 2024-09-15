import { useEffect, useState } from "react";
import "./switch.css";
export default function Switch(handleClick) {
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [animation, setAnimation] = useState(localStorage.getItem("animation"));

  function handleSwitch() {
    if (activeSwitch === false) {
      setAnimation("slidein");
      localStorage.setItem("animation", "slidein");
      setActiveSwitch(true);
    } else {
      setAnimation("slideout");
      localStorage.setItem("animation", "slideout");
      setActiveSwitch(false);
    }
  }

  return (
    <button className="switch" onClick={handleSwitch}>
      <div className={`switch_button ${animation}`}></div>
    </button>
  );
}
