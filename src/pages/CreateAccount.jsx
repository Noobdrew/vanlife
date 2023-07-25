import { useContext, useState } from "react";
import { auth } from "../api";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { VanApiContext } from "../App";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(VanApiContext);
  console.log(auth);
  console.log(currentUser);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sign-in">
      {" "}
      <h1>Create account</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          name="email"
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onInput={(e) => setPassword(e.target.value)}
        />
        <button> sign up</button>
      </form>
    </div>
  );
}
