import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

// const characters = [
//   {
//     name: "Charlie",
//     job: "Janitor"
//   },
//   {
//     name: "Mac",
//     job: "Bouncer"
//   },
//   {
//     name: "Dee",
//     job: "Aspring actress"
//   },
//   {
//     name: "Dennis",
//     job: "Bartender"
//   }
// ];


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    console.log(update);
    setCharacters(updated);
  }

  return (
    <div className={"conainer"}>
      <Table 
        characterData = {characters} 
        removeCharacter = {removeOneCharacter}
      />
      < Form />
    </div>
  );
}

export default MyApp;