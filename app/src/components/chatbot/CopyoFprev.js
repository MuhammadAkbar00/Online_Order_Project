import React, {useState} from "react";
import ChatBot from "react-simple-chatbot";
import PageRecord from '../../marketing/PageRecord'
import SearchFaq from "../../faq/SearchFaq";

function CustomChatbot(props) {

    let qu = "initail"
    const getFaq = (prevQ) =>{
        console.log("running", prevQ)
        qu = prevQ
    }

    const getQuestion = () => {
        console.log(qu)
        return qu;
    }

    const steps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '7',
        },
        {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            trigger: '4',
        },
        {
            id: '4',
            message: 'Will this chat bot be useful later on?',
            trigger: '5',
        },
        {
            id: '5',
            options: [
                {value: 'yes', label: 'yes', trigger: '6'},
                {value: 'no', label: 'no', trigger: '4'}
            ]
        },
        {
            id: '6',
            message: 'You Right!',
            trigger: '7',
        },
        // {
        //     id: '7',
        //     component: <img style={{width:"300px", height:"300px"}} src={ require('../../images/yourefired.jpg') } />,
        //     end: true
        // }
        // {
        //     id: '7',
        //     component: <Nav.Link as={Link} to="/faq">Go to FAQ</Nav.Link>,
        //     end: true
        // }
        // {
        //     id: '7',
        //     trigger: () => {
        //         return "Done"
        //     },
        //     end: true
        // }
        {
            id: '7',
            message: 'What is your question?',
            trigger: '8',
        },
        {
            id: '8',
            user: true,
            trigger: '9'
        },
        {
            id: '9',
            message: ({previousValue}) => {
                getFaq(previousValue)
                return 'Getting answers for "{previousValue}"'
            },
            trigger: () => {
                return '10'
            },
        },
        {
            id: '10',
            component: <SearchFaq search={``}/>,
            waitAction: true,
            trigger: '1',
        }

    ];
    return (<><PageRecord pagename={"chat"} productId={null}/><ChatBot steps={steps} /></>);
}
export default CustomChatbot;

