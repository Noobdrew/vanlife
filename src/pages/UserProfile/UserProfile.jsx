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

export default function UserProfile() {
  const { currentUser } = useContext(VanApiContext);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newEmail, setNewEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [changeEmailPassword, setChangeEmailPassowrd] = useState();
  const [error, setError] = useState(null);
  console.log(currentUser);
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
  function cancelChangeEmail() {
    setEmailOpen(false);
  }
  async function confirmCangeEmail(e) {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
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
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }
  return (
    <>
      {emailOpen ? (
        <div className="email-popup">
          <form action="">
            <h2>Change Email</h2>
            <p>{error ? error.message : ""}</p>
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
      ) : (
        ""
      )}
      {passwordOpen ? (
        <div className="password-popup">
          <form action="">
            <h2>Change Password</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Submit</button>
            <button className="popup-cancel">Cancel</button>
          </form>
        </div>
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

        <button className="user-change-password user-profile-button">
          Change Password
        </button>

        <button className="user-signout user-profile-button" onClick={signout}>
          Sign out
        </button>
      </div>
    </>
  );
}
