import { Room, Cancel } from '@material-ui/icons';
import styled from 'styled-components'
import { useState, useRef } from 'react';
import axios from 'axios'

const Register = ({setShowRegister}) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            await axios.post("https://localhost:5000/api/users/register", newUser)
            setError(false)
            setSuccess(true)
        } catch(err) {
            setError(true)
        }
    }

    return (
        <RegisterContainer>
            <logo>
                <Room/>
                MapApp
            </logo>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button>Register</button>
                {success && (
                    <span className="success">Successfull. You can login now!</span>
                )}
                {error && (
                    <span className="failure">Something went wrong!</span>
                )}
            </Form>
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
        </RegisterContainer>
    )
}

const RegisterContainer = styled.div`
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
    color: slateblue;
    font-weight: 700;
}
.registerCancel {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
`;

const Form = styled.div`
width: 250px;
height: 220px;
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
    background-color: slateblue;
    color: white;
    cursor: pointer;
  }
  .success {
      color: green;
      font-size: 12px;
      text-align: center;
  }
  .failure {
      color: red;
      font-size: 12px;
      text-align: center;
  }

`;




export default Register
