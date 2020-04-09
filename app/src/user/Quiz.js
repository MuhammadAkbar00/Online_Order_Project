import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
    useHistory,
    browserHistory
} from "react-router-dom";

export default () => {

    const history = useHistory();
    const [start, setStart] = useState(false)
    const [next, setNext] = useState(0)

    const nextQuestion = () => {
        setNext(next + 1)
    }

    const changeState = () => {
        setStart(true)
    }

    //Game code

    useEffect(()=>{

        const textElement = document.getElementById('text')
        const optionButtonsElement = document.getElementById('option-buttons')

        let state = {}

        const textNodes = [
            {
                id: 1,
                text: "You have awaken in a strange place you have never been before, but strangely enough the place is quite familiar. \n" +
                    "What do you do:",
                options: [
                    {
                        text: 'Look around to find out where you are.',
                        setState: { op1: 1},
                        nextText: 2
                    },
                    {
                        text: 'GO WILD!!!',
                        setState: { op1: 2},
                        nextText: 2
                    },
                    {
                        text: 'Stay and think.',
                        setState: { op1: 3},
                        nextText: 2
                    },
                    {
                        text: 'Go back to sleep.',
                        setState: { op1: 4},
                        nextText: 2
                    }
                ]
            },
            {
                id: 2,
                text: 'You just passed a village where you were informed of a haunting on the outskirts.' +
                    ' You decide to head there anyway as it will take you to your destination. ' +
                    'You meet a strange looking person who offers to let you pass them if you sneak them into the village.' +
                    ' You:',
                options: [
                    {
                        text: 'tell them to come with you instead',
                        setState: {op2: 1},
                        nextText: 3
                    },
                    {
                        text: 'run back to the village and never leave',
                        setState: {op2: 2},
                        nextText: 3
                    },
                    {
                        text: 'sneak him in',
                        setState: {op2: 3},
                        nextText: 3
                    },
                    {
                        text: 'run',
                        setState: {op2: 4},
                        nextText: 3
                    },
                ]
            },
            {
                id: 3,
                text: 'You\'re walking down an alley and see two people having a conversation. You get closer and you notice that they\'re facing the walls of the alley and not actually conversing but speaking into the walls. You:',
                options: [
                    {
                        text: 'join them and talk to the walls',
                        setState: {op3: 1},
                        nextText: 4
                    },
                    {
                        text: 'slowly back away',
                        setState: {op3: 2},
                        nextText: 4
                    },
                    {
                        text: 'try to talk to them',
                        setState: {op3: 3},
                        nextText: 4
                    },
                    {
                        text: 'go past them',
                        setState: {op3: 4},
                        nextText: 4
                    },
                ]
            },
            {
                id: 4,
                text: 'You have just planted a seed in your garden. A few weeks later you find out that this seed can support a whole universe and you can be it\'s God. The only way you can create life on this universe is by putting people from the real world into this new universe seed. You:',
                options: [
                    {
                        text: 'force strangers into your new world',
                        setState: {op4: 1},
                        nextText: 5
                    },
                    {
                        text: 'ask friends or family to go into it',
                        setState: {op4: 2},
                        nextText: 5
                    },
                    {
                        text: 'choose to not invite anyone and go into it yourself',
                        setState: {op4: 3},
                        nextText: 5
                    },
                    {
                        text: 'break it and release a world eating demon',
                        setState: {op4: 4},
                        nextText: 5
                    },
                ]
            },
            {
                id: 5,
                text: 'Your neck really hurts. The only way you can fix it is by wearing a poncho that always weighs double your weight for an hour every 4 hours. You decide to use it by:',
                options: [
                    {
                        text: 'drink protein shakes to lift more',
                        setState: {op5: 1},
                        nextText: 6
                    },
                    {
                        text: 'start working out',
                        setState: {op5: 2},
                        nextText: 6
                    },
                    {
                        text: 'lay in bed with it',
                        setState: {op5: 3},
                        nextText: 6
                    },
                    {
                        text: 'crack your neck and accidentally end it',
                        setState: {op5: 4},
                        nextText: 6
                    },
                ]
            },
            {
                id: 6,
                text: 'You play a video game with some of your friends. You hear one of them say "Wouldn\'t it be funny if we all turn off the game?". You:',
                options: [
                    {
                        text: 'tell him to shut up ',
                        setState: {op6: 1},
                        nextText: 7
                    },
                    {
                        text: 'actually turn the game off and be productive',
                        setState: {op6: 2},
                        nextText: 7
                    },
                    {
                        text: 'begin to cry',
                        setState: {op6: 3},
                        nextText: 7
                    },
                    {
                        text: 'hit him with your pickaxe (in game...or in real life?)',
                        setState: {op6: 4},
                        nextText: 7
                    },
                ]
            },
            {
                id: 7,
                text: 'This is the end of the quiz.',
                options: [
                    {
                        text: 'Click Here To see which product you got!',
                        nextText: -1
                    }
                ]
            }
        ]

        const startGame = () => {
            state = {}
            showTextNode(1)
        }

        const showTextNode = (textNodeIndex) => {
            const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
            textElement.innerText = textNode.text
            while (optionButtonsElement.firstChild){
                optionButtonsElement.removeChild(optionButtonsElement.firstChild)
            }

            textNode.options.forEach(option => {
                if(showOption(option)){
                    const button = document.createElement('button')
                    button.innerText = option.text
                    button.classList.add('btn')
                    button.addEventListener('click', () => selectOption(option))
                    console.log(button)
                    optionButtonsElement.appendChild(button)
                }
            })
            console.log("Current State ",state)
        }

        const showOption = (option) => {
            return option.requiredState == null || option.requiredState(state)
        }

        const selectOption = (option) => {
            const nextTextNodeId = option.nextText
            if (nextTextNodeId < 0){
                let id = picker()
                return history.push(`/menu/${id}`)

            }
            state = Object.assign(state, option.setState)
            showTextNode(nextTextNodeId)
        }

        const picker = () => {
            let id = 0;
            if(state.op1 == 1 && state.op2 == 1){
                id = 1;
            }else if (state.op1 == 2 && state.op2 == 1){
                id = 2;
            } else if (state.op1 == 3 && state.op2 == 1){
                id = 3;
            }else if(state.op1 == 1){
                id = 4;
            }else if(state.op4 == 4){
                id = 5;
            }else{
                id = 6;
            }
            return id;
        }



        if (start)
            startGame()

    },[start, nextQuestion])


    return (
        <>
      <span className={"game"}>
          <div className="game container1">
            <div className="gamestart container2">
            {
                start
                    ?
                    <span className={"gamestart"}>
                    <div id={"text"}>Text</div>
                    <div id={"option-buttons"} className={"btn-grid"}>
                      <Button onClick={nextQuestion} className="btn">Option 1</Button>
                      <Button onClick={nextQuestion} className="btn">Option 2</Button>
                      <Button onClick={nextQuestion} className="btn">Option 3</Button>
                      <Button onClick={nextQuestion} className="btn">Option 4</Button>
                    </div>
                  </span>
                    :
                    <span className={"gamestart"}>
                    <div id="home" className={"flex-center flex-column"}>
                      <h1>Personality Quiz</h1>
                      <Button className="btn" onClick={changeState} variant={"primary"}>Play</Button>
                    </div>
                  </span>
            }
            </div>
            </div>
      </span>
        </>
    )
}