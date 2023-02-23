import React from "react"
import Question from "./Question"
import Confetti from "react-confetti"

export default function QuestionPage(props) {
    const [showAns, setShowAns] = React.useState(false)
    const [selectionArr, setSelectionArr] = React.useState([])

    function SelectionStore(selectedOpt, correctOpt, qid) {
        // console.log(selectedOpt, correctOpt, qid)
        // This function stores the selected options of each question
        setSelectionArr(prevSelections => {
            const array = [];
            for (let i = 0; i < prevSelections.length; i++) {
                array.push(prevSelections[i])
            }

            let entry = false;
            for (let i = 0; i < array.length; i++) {
                if (qid === array[i].qid) {
                    entry = true;
                    array.splice(i, 1, {
                        selectedOpt: selectedOpt,
                        correctOpt: correctOpt,
                        qid: qid
                    })
                }
            }
            if (entry === false) {
                array.push({
                    selectedOpt: selectedOpt,
                    correctOpt: correctOpt,
                    qid: qid
                })
            }
            // console.log(array)
            return array;
        })
    }

    function ScoreFinder() {
        let x = 0;
        for (let i = 0; i < selectionArr.length; i++) {
            if (selectionArr[i].correctOpt === selectionArr[i].selectedOpt) {
                x = x + 1;
            }
        }
        return x;
    }
    function toggleShowAns() {
        setShowAns(showAns => true)

    }
    // console.log("questionPage rendered!")
    const questionElts = props.questionArray.map(function(elt){
        return (
                <Question darkMode={props.darkMode} showAns={showAns} handleClick={SelectionStore} key={elt.question_id} body={elt.question} options={elt.options} correct_answer_ind={elt.correct_answer_ind} question_id={elt.question_id} />
            )
    })

    return (
        <div className={props.darkMode ? "Question" : "QuestionWhite"}>
            {showAns &&
                <div className="winningPage" >
                    {(ScoreFinder() > 0) && <Confetti recycle={true} numberOfPieces={600} />}
                    <h3>{(ScoreFinder() >= props.questionArray.length / 2) ? "Congratulations! " : ""}Your score is {ScoreFinder()}/{props.questionArray.length}</h3>
                    <button className="checker playAgain" onClick={props.toggleGameOver} >Play Again</button>
                </div>
            }
            {(!props.questionArray || props.questionArray.length === 0) && <h2>Get Ready!</h2>}
            
                {questionElts}
            


            {!(!props.questionArray || props.questionArray.length === 0) && <button className="checker" onClick={() => {
                if (!showAns) {
                    {
                        toggleShowAns();
                    }

                }
            }}>Check Answers</button>}
        </div>
    )
}