import React from "react"

export default function HomePage(props){

    return (
            <div className={props.darkMode ? "HomePage" : "HomePageWhite"}>
                <h1 className="HomePageHeading">BrainBuster</h1>
                <p>Unleash your inner genius with BrainBusters</p>
                <button className="HomePageButton" onClick={props.toggleStart}>Start Quiz</button>
            </div>
    )
}