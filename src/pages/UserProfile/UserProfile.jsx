import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
} from "firebase/auth";
import { auth } from "../../api";
import userIcon from "../../assets/user-circle.svg";
import { useContext, useState } from "react";
import { VanApiContext } from "../../App";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default function UserProfile() {
  const { currentUser } = useContext(VanApiContext);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newEmail, setNewEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [changeEmailPassword, setChangeEmailPassowrd] = useState();
  const [error, setError] = useState(null);

  async function signout() {
    try {
      await signOut(auth);
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
          placeholder={"name"}
          maxLength={11}
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
