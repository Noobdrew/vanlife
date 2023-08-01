import { useContext, useState } from "react";
import { VanApiContext } from "../../App";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../api";

export default function ChangePassword({ passwordOpen, setPasswordOpen }) {
  const { currentUser, setPopupText, setPopupOpen } = useContext(VanApiContext);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [oldPassword, setOldPassword] = useState();

  function cancelChangePassword() {
    setPasswordOpen(false);
  }
  async function confirmChangePassword(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPopupText("Passwords do not match");
      setPopupOpen(true);
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );

      await updatePassword(auth.currentUser, newPassword);
      setPasswordOpen(false);
      setPopupText("Password changed successfully!");
      setPopupOpen(true);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }
  return (
    <div className="email-popup">
      <form action="">
        <h2>Change Password</h2>
        <p className="danger">{error ? error.message : ""}</p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <button onClick={confirmChangePassword}>Submit</button>
        <button onClick={cancelChangePassword} className="popup-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}
