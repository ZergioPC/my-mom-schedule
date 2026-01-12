import React from "react";
import { SemanaList } from "../../Components/SemanaList";

function Cronograma(){
  return (
    <>
      <h1>Planifica tu tiempo</h1>

      <ol>
        <li>
          <SemanaList />
        </li>
      </ol>
    </>
  );
}

export { Cronograma };