import React from "react";
import { SemanaList } from "../../Components/SemanaList";

function Home(){
  // Planificador completo (semanal)

  return(
    <>
      <h1>General</h1>

      <SemanaList />
    </>
  );
}

export { Home };