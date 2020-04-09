import React, {useState} from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PageRecord from '../../marketing/PageRecord'
import SearchFaq from "../../faq/SearchFaq";

function CustomChatbot(props) {

    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const steps = [
        {
            id: '1',
            message: 'Welcome to the inDine Chatbot',
            trigger: '2',
        },
        {
            id: '2',
            message: 'Do you have a question?',
            trigger: '3',
        },
        {
            id: '3',
            options: [
                {value: 'yes', label: 'yes', trigger: '4'},
                {value: 'no', label: 'no', trigger: '2'}
            ]
        },
        {
            id: '4',
            message: 'What is your question?',
            trigger: '5',
        },
        {
            id: '5',
            component: <SearchFaq/>,
            waitAction: true,
            trigger: '2',
        },
    ];
    return (
        <><PageRecord pagename={"chat"} productId={null}/>
        <ChatBot steps={steps} {...config} /></>
    );
}
export default CustomChatbot;

