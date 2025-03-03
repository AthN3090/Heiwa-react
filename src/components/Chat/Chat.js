import './Chat.css'
import { userContext } from '../../App'
import { React, useContext, useEffect, useState, useRef } from 'react'
import Loader from '../Loader/Loader'
import Whiteboard from '../Whiteboard/Whiteboard'
import { Navigate } from 'react-router-dom'

// const AlwaysScrollToBottom = () => {
//     useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }));
//     return <div ref={elementRef} />;
// };
function Messages(props) {
    const elementRef = useRef();
    const { user, socket } = useContext(userContext)
    const [messages, setMessages] = useState([])
    const [inputMsg, setInputMsg] = useState("");
    const handlerInputMsg = (e) => {
        setInputMsg(e.target.value)
    }
    const sendMessage = (e) => {
        e.preventDefault()
        if (inputMsg === "") return
        const message = {
            author: user.username,
            text: inputMsg
        }

        socket.emit('send-message', { content: message, to: props.receiver.id })
        setMessages([...messages, message])
        
        setInputMsg('')
    }
    useEffect(() => {
        elementRef.current.scrollIntoView({ behavior: 'smooth' })
        socket.on('received-message', (data) => {
            setMessages([...messages, data])
        })
    }, [socket, messages])
    return (
        <div className='chat-box'>
            <div className='message-box'>
                <div style={{ textAlign: "center", color: "white", backgroundColor: "var(--gray)", padding: "0px 0px" }}>
                    <div className='connection-name'>
                        You are chatting with <br /> <div style={{ color: "var(--green)", fontSize: "18px", textTransform: "capitalize" }}>
                            <div className='receiver-name'>{props.receiver.username}
                                <div style={{ position: "relative", marginTop: "7px" }}>
                                    <div className='tooltip-container'>
                                        <div>
                                            <span style={{ color: "white", fontSize: "12px", marginRight: "5px", textDecoration: "underline" }}>Feelings:</span>
                                            <span style={{ display: "flex", gap: "5px" }}>
                                                {props.receiver.feelings.map(item => <DisplayTags key={item} name={item} />)}   
                                            </span>
                                                
                                        </div>
                                        
                                        <div>
                                            <span style={{ color: "white", fontSize: "12px", marginRight: "5px", textDecoration: "underline" }}>Interests:</span>
                                            <span style={{ display: "flex", gap: "5px" }}>
                                                {props.receiver.interests.map(item => <DisplayTags key={item} name={item} />)}
                                            </span>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='chat-display'>
                    {
                        messages.map(item => {
                            return <div className={item.author === user.username ? "sen-text" : "rec-text"}> {item.text}</div>
                        })
                    }
                    <div ref={elementRef} > </div>
                    {/* <AlwaysScrollToBottom /> */}

                </div>
                <div className='chat-input'>
                    <form style={{ display: "flex", alignItems: "center", gap: "10px" }} onSubmit={sendMessage}>
                        <input style={{ flexGrow: '1', fontSize: "14px" }} type='text' value={inputMsg} placeholder="Type your message ..." onChange={handlerInputMsg}></input>
                        <button type='submit' />
                    </form>
                </div>
            </div>
            {/*      */}
        </div>

    )
}



function Info(props) {
    // const session = useContext(userContext)
    return <div className='info-box'>
        <p style={{ textAlign: "center", color: "white", marginBottom: "2px" }}> About</p>
        <div className='connection-info'>
            <p style={{ textAlign: "center", color: "#BEC9F1", fontSize: "24px", margin: "2px" }}>{props.receiver.username}</p>
            <p style={{ color: "#BEC9F1", margin: "0px 0px 0px 10px", marginLeft: "10px" }}>
                Feelings
            </p>
            {props.receiver.feelings.map(item => <DisplayTags key={item} name={item} />)}
            <p style={{ color: "#BEC9F1", margin: "20px 0px 0px 10px" }}>
                Interests</p>
            {props.receiver.interests.map(item => <DisplayTags key={item} name={item} />)}
        </div>
    </div>
}

function DisplayTags(props) {
    return <div className="display-tags">
        {props.name}
    </div>
}

function Chat() {

    const { user, socket } = useContext(userContext)
    const currUser = user.username
    const [receiver, setReceiver] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(currUser)
        socket.on('match-info', (data) => {
            setReceiver({
                id: data.id,
                username: data.username,
                feelings: data.feelings,
                interests: data.interests
            })
            setIsLoading(false)
        })
    }, [socket, receiver, currUser])

    return (
        (currUser === null) ? <Navigate to="/" /> : isLoading ? <Loader /> : (
            <div className='chat-wrapper'>
                <div className='chat-container'>
                    {/* <div className='connection-name'>
                        You are chatting with <br /> <span style={{ color: "#536BC1", fontSize: "18px", textTransform: "capitalize" }}> {receiver.username} </span>
                    </div> */}
                    <div className='chat-content'>
                        <Whiteboard socket={socket} receiver={receiver.id} />
                        <Messages receiver={receiver} />
                    </div>
                    <div className='chat-footer'> &copy;Heiwa</div>
                </div>

            </div>)

    )



}


export default Chat