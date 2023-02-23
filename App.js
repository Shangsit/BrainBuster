// Object of Objects should not be passed to a component -->DOUBT!!
// Next Objective: Give the necessary styles to the options when the Check Answers button is clicked
import {nanoid} from "nanoid"
import React from "react"
import HomePage from "./HomePage"
import QuestionPage from "./QuestionPage"
import Question from "./Question"

export default function App(){
    // console.log("app rendered!")
    // All the declarations
    const [start, setStart] = React.useState(false)
    const [questionArray, setQuestionArray] = React.useState([]) 
    const [gameOver, setGameOver] = React.useState(false)
    const [darkMode, setDarkMode] = React.useState(true)
    
    // All the functions
    function toggleStart(){
        setStart(start => !start)
    }
    function toggleDarkMode(){
        setDarkMode(darkMode=>!darkMode)
    }
    function createQuestionArray(array){
        setGameOver(false)
        const newArray=[];
        for(let i=0; i<array.length; i++){
            const randInd = Math.floor(Math.random()*4);
            const options = array[i].incorrect_answers;
            options.splice(randInd, 0, array[i].correct_answer);

            newArray.push({
                question_id: nanoid(),
                question: array[i].question,
                correct_answer_ind: randInd,
                options: options
            })
        }      
        return newArray;
    }
     
    // API call
    React.useEffect(function(){          
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple")
            .then(res => res.json())
            .then(data => {setQuestionArray(createQuestionArray(data.results));})
    }, [gameOver])
    
    function toggleGameOver(){
        setGameOver(gameOver=>!gameOver)
    }
    
    return (
        <div className="MainContent">
            <div className={darkMode ? "NavbarDark" : "Navbar"}>
                <span>BrainBuster</span>
                <div className="toggler">
                <p className={darkMode ? "toggler--dark" : "toggler--light"}>Light</p>
                <div 
                    className={darkMode ? "toggler--sliderDark" : "toggler--slider"}
                    onClick={toggleDarkMode}
                >
                    <div className={darkMode ? "toggler--slider--circleDark" : "toggler--slider--circle"}></div>
                </div>
                <p className={darkMode ? "toggler--dark" : "toggler--light"}>Dark</p>
            </div>
            </div>
        {!start && <HomePage toggleStart={toggleStart} darkMode={darkMode}/>}
        {start && !gameOver && <QuestionPage darkMode={darkMode} gameOver={gameOver} toggleGameOver={toggleGameOver} questionArray={questionArray}/>}
        
        </div>
    )
}