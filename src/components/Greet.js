import React from "react";

function Greet({person}){
    return(
        <>
        <div>Hello, {person.name}. You are {person.age} 
        Years old. You like to eat {person.likes} </div>
        </>
    )
}
export default Greet;
