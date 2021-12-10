import "./App.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

function Edit() {
  //Control input field values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");

  // Send the user back to the main page
  const navigate = useNavigate();
  // Get the object Id from URL
  const { id } = useParams();

  // On component mount
  React.useEffect(() => {
    initialFetch();
  }, []);

  // Get the user info at first to update the place holders
  const initialFetch = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    await fetch(`/api/users/${id}`, options)
      .then((data) => data.json())
      .then((result) => {
        //Make sure to use database key names here
        setFirstName(result.first_name);
        setLastName(result.last_name);
        setProfession(result.profession);
      })
      .catch((e) => console.log("There was an error getting user info..."));
  };

  // Update the info after the user pressed submit button
  const update = async () => {
    const options = {
      method: "PATCH",
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

    await fetch(`/api/users/${id}`, options)
      .then((data) => data.json())
      .then((result) => console.log(result))
      .catch((e) => console.log("There was an error updating the database..."));
    navigate("/");
  };

  // Delete the user after pressing the button
  const deleteItem = async () => {
    console.log(id);
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };

    await fetch(`/api/users/${id}`, options)
      .then((data) => data.json())
      .then((result) => console.log(result))
      .catch((e) => console.log("mistake"));
    navigate("/");
  };

  return (
    <div>
      <h1>Edit an Entry</h1>
      <p>FirstName</p>
      <input
        placeholder={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      ></input>

      <p>LastName</p>
      <input
        placeholder={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      ></input>

      <p>Profession</p>
      <input
        placeholder={profession}
        onChange={(e) => {
          setProfession(e.target.value);
        }}
      ></input>

      <button onClick={update}>Submit</button>

      <button onClick={deleteItem}>Delete</button>
    </div>
  );
}
export default Edit;
