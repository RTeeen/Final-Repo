import "./App.css";
import { useEffect } from "react";
import { useLocation, Route, Router } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";

function AddNew() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const navigate = useNavigate();

  const update = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        profession: profession,
        hasDegree: true,
      }),
    };

    await fetch(`/api/users/`, options)
      .then((data) => data.json())
      .then((result) => console.log(result))
      .catch((e) => console.log("mistake"))
      .finally(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <h1>Add a New input:</h1>
      <p>FirstName</p>
      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      ></input>

      <p>LastName</p>
      <input
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      ></input>

      <p>Profession</p>
      <input
        onChange={(e) => {
          setProfession(e.target.value);
        }}
      ></input>

      <button onClick={update}>Submit</button>
    </div>
  );
}
export default AddNew;
