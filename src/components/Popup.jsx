import { useContext, useEffect, useState } from "react";
import { VanApiContext } from "../App";

export default function Popup({ children }) {
  const { popupOpen, setPopupOpen } = useContext(VanApiContext);
  const [popupShow, setPopupShow] = useState("hidden");
  useEffect(() => {
    if (popupOpen) {
      setTimeout(() => {
        console.log("timeout");
        setPopupOpen(false);
      }, 3000);
    }
  }, [popupOpen]);

  return (
    <div className={`popup-outer ${popupOpen ? "slide-bottom" : "hidden"}`}>
      <div className="popup-inner">
        <h3>{children}</h3>
      </div>
    </div>
  );
}
