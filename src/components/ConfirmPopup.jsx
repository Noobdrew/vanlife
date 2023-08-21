import { useNavigate } from "react-router-dom";

export default function ConfirmPopup({
  children,
  callback,
  setConfirmPopupOpen,
}) {
  const navigate = useNavigate();
  function hidePopup() {
    setConfirmPopupOpen(false);
  }

  function runCallback() {
    callback();
    setConfirmPopupOpen(false);
    navigate("/host/vans");
  }
  return (
    <div className="popup-confirm-outer">
      <div className="popup-confirm-inner">
        <h3>{children}</h3>
        <div className="popup-button-container">
          <button className="popup-button delete" onClick={runCallback}>
            Yes
          </button>
          <button className="popup-button cancel" onClick={hidePopup}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
