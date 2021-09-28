import { Room, Cancel } from '@material-ui/icons';
import styled from 'styled-components'
import { useState, useRef } from 'react';
import axios from 'axios'

const Login = ({setShowLogin}) => {
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            await axios.post("https://localhost:5000/api/users/login", user)
            setError(false)
        } catch(err) {
            setError(true)
        }
    }

    return (
        <LoginContainer>
            <logo>
                <Room/>
                MapApp
            </logo>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button>Login</button>
                {error && (
                    <span className="failure">Something went wrong!</span>
                )}
            </Form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
width: 300px;
height: 250px;
padding: 20px;
border-radius: 10px;
background-color: white;
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
logo {
    display: flex;
    align-items: center;
    justify-content: center;
    color: teal;
    font-weight: 700;
}
.loginCancel {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
`;

const Form = styled.div`
width: 250px;
height: 200px;
display: flex;
flex-direction: column;
justify-content: space-between;
input{
    border: none;
    border-bottom: 1px solid gray;
    ::placeholder {
      font-size: 14px;
      color: rgb(172, 169, 169);
    }
  }
  button {
    border: none;
    border-radius: 3px;
    padding: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
  }
  .failure {
      color: red;
      font-size: 12px;
      text-align: center;
  }

`;




export default Login
