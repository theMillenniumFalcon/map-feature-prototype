import { Room } from '@material-ui/icons';
import styled from 'styled-components'

const Register = () => {
    return (
        <RegisterContainer>
            <logo>
                <Room/>
                MapApp
            </logo>
            <Form>
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button>Register</button>
                <span className="success">Successfull. You can login now!</span>
                <span className="failure">Something went wrong!</span>
            </Form>
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
