import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters, setCharacters] = useState([]);

  // function removeOneCharacter(index) {

  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }
  function removeOneCharacter(index) {
    const userId = characters[index].id;
  
    fetch(`http://localhost:8000/users/${userId}`, {method: 'DELETE',})
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (response.status === 404) {
          throw new Error('resource not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
 

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json(); 
        } else {
          throw new Error(`${response.status}`);
        }
      })
      .then((data) => {
        setCharacters([...characters, data.user]); 
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  return (
    <div className={"conainer"}>
      <Table 
        characterData = {characters} 
        removeCharacter = {removeOneCharacter}
      />
      < Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;