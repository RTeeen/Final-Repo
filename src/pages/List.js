import "./App.css";
import { useEffect } from "react";
import { useLocation, Route, Router } from "react-router";
import useSWR from "swr";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AddNew from "./AddNew";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function List() {
  const { data, error } = useSWR("/api/users", fetcher);
  const nav = useNavigate();

  const errorStyles = {
    color: "white",
    backgroundColor: "red",
    border: "2px solid pink",
    width: 200,
    height: 60,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  if (error) {
    return <div style={errorStyles}>failed to load</div>;
  } else if (!data) {
    return <div style={errorStyles}>loading...</div>;
  } else if (data && !error) {
    return (
      <div className='App-header'>
        <h1 style={{ color: "white", marginTop: 100, textAlign: "center" }}>
          List of Users in DB
        </h1>
        <hr style={{ width: "100%", color: "white", marginTop: 10 }} />
        <div>
          <Link to='/addnew'>
            <button onClick={() => nav(`/addnew`)}>Add Users</button>
          </Link>
        </div>

        {data &&
          data.map((piece, i) => {
            console.log(piece);
            return (
              <div
                style={{
                  marginTop: 50,
                  borderRadius: "2px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <span style={{ margin: 10 }}>
                  name: {`${piece.first_name} ${piece.last_name}`}
                </span>
                <span style={{ margin: 10 }}>
                  profession: {piece.profession}
                </span>
                <span style={{ margin: 10 }}>
                  has a degree? {`${piece.hasDegree}`}
                </span>

                <Link to={{ pathname: `/edit/${piece._id}` }}>
                  <button key={piece._id}>Update User</button>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}
export default List;
