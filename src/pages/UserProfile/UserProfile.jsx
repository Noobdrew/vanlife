import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { auth, updateName } from "../../api";
import userIcon from "../../assets/user-circle.svg";
import { useContext, useEffect, useState } from "react";
import { VanApiContext } from "../../App";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default function UserProfile() {
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [userName, setUserName] = useState();
  const [tempUserName, setTempUserName] = useState(
    auth.currentUser.displayName
  );
  const [error, setError] = useState(null);

  async function signout() {
    try {
      await signOut(auth);
      setPopupText("See you next time!");
      setPopupOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  function changeEmail() {
    setEmailOpen(true);
    setError(null);
  }

  function changePassword() {
    setPasswordOpen(true);
    setError(null);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempUserName !== auth.currentUser.displayName) {
        updateName(auth.currentUser, auth.currentUser.uid, tempUserName);
        console.log(tempUserName);
        console.log("name changed");
        setPopupText(`Name changed to ${tempUserName}`);
        setPopupOpen(true);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tempUserName]);

  return (
    <>
      {emailOpen ? (
        <ChangeEmail emailOpen={emailOpen} setEmailOpen={setEmailOpen} />
      ) : (
        ""
      )}
      {passwordOpen ? (
        <ChangePassword
          passwordOpen={passwordOpen}
          setPasswordOpen={setPasswordOpen}
        />
      ) : (
        ""
      )}

      <div className="user-profile-container">
        <img
          className="user-profile-icon"
          src={userIcon}
          alt="avatar-icon"
          width={"100px"}
        />
        <input
          type="text"
          className="user-profile-name"
          placeholder={currentUser.displayName || "3-11 Characters"}
          value={tempUserName}
          minLength={3}
          maxLength={11}
          onChange={(e) => setTempUserName(e.target.value)}
        />

        <button
          className="user-change-email user-profile-button"
          onClick={changeEmail}
        >
          Change Email
        </button>

        <button
          className="user-change-password user-profile-button"
          onClick={changePassword}
        >
          Change Password
        </button>

        <button className="user-signout user-profile-button" onClick={signout}>
          Sign out
        </button>
      </div>
    </>
  );
}
