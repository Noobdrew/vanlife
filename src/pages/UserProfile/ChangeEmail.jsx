import { useContext, useState } from "react";
import { VanApiContext } from "../../App";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { auth } from "../../api";

export default function ChangeEmail({ emailOpen, setEmailOpen }) {
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [changeEmailPassword, setChangeEmailPassowrd] = useState();

  function cancelChangeEmail() {
    setEmailOpen(false);
  }
  async function confirmCangeEmail(e) {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
      setPopupText("Emails do not match");
      setPopupOpen(true);
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        changeEmailPassword
      );
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );
      await updateEmail(auth.currentUser, newEmail);
      setEmailOpen(false);
      setPopupText("Email changed successfully!");
      setPopupOpen(true);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }
  return (
    <div className="email-popup">
      <form action="">
        <h2>Change Email</h2>
        <p className="danger">{error ? error.message : ""}</p>
        <input
          type="email"
          placeholder="New Email"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="email"
          placeholder="Confirm Email"
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setChangeEmailPassowrd(e.target.value)}
        />
        <button onClick={confirmCangeEmail}>Submit</button>
        <button onClick={cancelChangeEmail} className="popup-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}
