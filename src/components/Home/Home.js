import React, { useContext, useEffect, useState} from "react";
import { userContext } from "../../App";
import {useNavigate} from "react-router-dom";
import './Home.css';


function Greeting(){
    return(
        <div className="home-greeting">
            <p className="home-logo">
                Heiwa  ...
            </p>
            <div className="home-tag">
                Hey 👋
                <p style={{ color: '#536BC1', margin:'0px'}}>Going through tough times ?</p>
                Let us help you talk to someone in the same boat.
            </div>
        </div>
        )
}

function Tag(props){
    return (
        <div className="tags">
            {props.name}  <button className="cancel-tag" onClick = {() => props.remove(props.name)}>x</button>
        </div>
    )

}

function Menu(){
    let navigate = useNavigate()
    const [input, setInput] = useState({
        username:'',
        feelings: '',
        interests: '',
    })
    const [feelings, setFeelings] = useState([]);
    const [interests, setInterests] = useState([]);
    
    let handlerFeelings = (e) => {
        e.preventDefault();
        if(input.feelings === "") return
        setFeelings([...feelings, e.target.value])
        setInput({...input, feelings : ''})
    }
    let handlerFeelingsMobile = (e) => {
        e.preventDefault();
        if(input.feelings === "") return
        setFeelings([...feelings, input.feelings])
        setInput({...input, feelings : ''})
    }
    let handlerInterests = (e) => {
        e.preventDefault();
        if(input.interests === "") return
        setInterests([...interests, e.target.value])
        setInput({...input, interests : ''})
    }
    let handlerInterestsMobile = (e) => {
        e.preventDefault();
        if(input.interests === "") return
        setInterests([...interests, input.interests])
        setInput({...input, interests : ''})
    }

    let removeFeelings = (feeling) =>{
        const newFeelings = feelings.filter(item => item !== feeling)
        setFeelings(newFeelings);
    }


    let removeInterests = (interest) =>{
        const newInterests = interests.filter(item => item !== interest)
        setInterests(newInterests);
    }

    const {user, setUser, socket} = useContext(userContext);
    let submitUser = (e) => {
        e.preventDefault();
        // console.log(input.username, feelings, interests)
        setUser({
            ...user,
            username: input.username,
            feelings: feelings,
            interests: interests,
        })
       
        
    }
    useEffect(()=> {
        if(user.username){
            socket.emit('add-user', user)
            navigate("/chat")
        }
        
    }, [user, socket, navigate])
    return (
        <div className="home-menu">
            <form onSubmit = {(e) => e.preventDefault()} style={{height: 'auto', width: '80%', margin: '50px'}}>
            <label  className="input-label">What do you like to be called ?</label><br/>
            <input  className="home-input" 
                type={'text'} 
                value={input.username} 
                onChange = {(e) => setInput({...input, username : e.target.value})} 
                onKeyDown = {(e)=> e.key === 'Enter' ? e.preventDefault() : ""}
                placeholder = "Enter username"
                required
                /><br/>

            <label className="input-label">How do you feel ?</label><br/>

            <div id="feelings">
                {feelings.map(item => <Tag key = {item} name = {item} remove = {removeFeelings} />)}     
            </div>

            <input  className="home-input" type={'text'} value={input.feelings} 
                onChange = {(e) => setInput({...input, feelings : e.target.value})} 
                onKeyDown = {(e) => (e.key === 'Enter') ? handlerFeelings(e) : "" } 
                placeholder = "Add your feelings"
                />
                <button className="add-tag" onClick={(e)=> handlerFeelingsMobile(e)}></button>
                <br/>

            <label  className="input-label">What do you want to talk about ?</label><br/>

            <div id="interests">
                {interests.map(item => <Tag key = {item} name = {item} remove = {removeInterests}/>)}  
            </div>

            <input  className="home-input" type={'text'} value={input.interests} 
                onChange = {(e) => setInput({...input, interests : e.target.value})} 
                onKeyDown = {(e) => (e.key === 'Enter') ? handlerInterests(e) : "" }
                placeholder = "Add your Interests"
                />
                <button className="add-tag" onClick={(e) => handlerInterestsMobile(e)}> </button>
                <br/>
                <button className="home-chatbtn" onClick={(e) => submitUser(e) }>Let’s chat 🙌</button>
           

            </form>
        </div>
    )
}


function Home(){
    
    return (
       
        <React.Fragment>
            <Greeting />
            <Menu />
        </React.Fragment>

    )
}


export default Home;