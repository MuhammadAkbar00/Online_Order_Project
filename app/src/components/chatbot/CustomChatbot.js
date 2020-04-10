import React from "react";
import ChatBot from "react-simple-chatbot";
import Image from "react-bootstrap/Image";
import PageRecord from '../../marketing/PageRecord'

function CustomChatbot(props) {
    const steps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
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
        {
            id: '7',
            component: <img alt="" style={{width:"300px", height:"300px"}} src={ require('../../images/yourefired.jpg') } />,
            end: true
        }
    ];
    return (<><PageRecord pagename={"chat"} productId={null}/><ChatBot steps={steps} /></>);
}
export default CustomChatbot;