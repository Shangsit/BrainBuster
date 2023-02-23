import React from "react"

function Options(prop){
    // console.log("option rendered")
    
    function style(){

            if(prop.showAns){
                if(prop.body.selected){
                    if(prop.selected_ind===prop.correct_answer_ind){
                        return {backgroundColor: "green", color:"white"};
                    }else{
                        return {backgroundColor: "red", color:"white"};
                    }
                }
                if(prop.selected_ind===prop.correct_answer_ind){
                    return {backgroundColor: "green", color:"white"};
                } 
            }
            if(prop.body.selected){
                return {backgroundColor: "white", color:"blue"};
            }
        }
//    console.log(prop.selected_ind)
    return (
        <button style={style()} onClick={()=>{
            if(!prop.showAns)
            {
                {
                    prop.handleClick(prop.selected_ind, prop.correct_answer_ind, prop.question_id)}; prop.toggleSelection(prop.id)
                    }
                } 
            } className="option" >{prop.body.body}</button>
    )
}

export default function Question(props){

    const [options, setOptions] = React.useState(func(props.options))
    
    function func(array){
        const newarray=[];
        for(let i=0; i<array.length; i++){
            newarray.push({
                id: i,
                body: array[i],
                selected: false
            })
        }
        return newarray
    }
    
    // There is some issue with toggleSelection function
    // function toggleSelection(id){
    //     setOptions(prevOptions=>{
    //         const newOptions=[]
    //         for(let i=0; i<prevOptions.length; i++){
    //             if(id===prevOptions[i].id){
    //                 newOptions.push({
    //                     id: i,
    //                     body: prevOptions[i],
    //                     selected: false,
    //                     selected: !prevOptions[i].selected
    //                 })
    //             }else{
    //                 newOptions.push({
    //                     id: i,
    //                     body: prevOptions[i],
    //                     selected: false,
    //                     selected: false
    //                 })
    //             }
    //         }
    //         return newOptions;
    //     })
    // }
    function toggleSelection(id){
        setOptions(prevOptions=>{
            const newOptions=[]
            for(let i=0; i<prevOptions.length; i++){
                if(id===prevOptions[i].id){
                    prevOptions[i].selected = !prevOptions[i].selected;
                    newOptions.push(prevOptions[i])
                }else{
                    prevOptions[i].selected = false;
                    newOptions.push(prevOptions[i])
                }
            }
            return newOptions;
        })
    }
    
    const optionElts = options.map((opt,i )=> 
    <Options 
        showAns={props.showAns}
        selected={opt.selected} 
        id={opt.id}
        toggleSelection={toggleSelection} 
        selected_ind={i} 
        handleClick={props.handleClick} 
        key={i} 
        body={opt} 
        question_id={props.question_id} 
        correct_answer_ind={props.correct_answer_ind}
        />)

       
    return (
     
        <div className="QuestionBody">
            <h4 className={props.darkMode ? "" : "QuestionHeadingWhite"} >{props.body}</h4>
            <div className="AllOptions">
            {optionElts}

            </div>
        </div>
            
    ) 
}