import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import { Room, Star } from "@material-ui/icons"
import styled from "styled-components"
import axios from 'axios'
import {format} from "timeago.js"
import Register from './components/register/Register'
import Login from './components/login/Login'

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("https://localhost:5000/api/pins")
        setPins(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPins()
  }, [])

  const handleMarkerClick = (id, latitude, longitude) => {
    setCurrentPlaceId(id)
    setViewport({
      ...viewport, latitude: latitude, longitude: longitude
    })
  }

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat
    setNewPlace({
      latitude,
      longitude,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    }
    try {
      const res = await axios.post("https://localhost:5000/api/pins", newPin)
      setPins([...pins, res.data])
      setNewPlace(null)
    }catch(error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    myStorage.removeItem("user")
    setCurrentUser(null)
  }

  return (
    <div className="App">
       <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onDblClick = {handleAddClick}
      transitionDuration="200ms"
    >
      {pins.map((pin) => (
        <>
        <Marker latitude={pin.latitude} longitude={pin.longitude} offsetLeft={-viewport.zoom * 3.5} offsetTop={-viewport.zoom * 7}>
        <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue", cursor: "pointer" }} 
          onClick={() => handleMarkerClick(pin._id, pin.latitude, pin.longitude)} />
       </Marker>
       {pin._id === currentPlaceId && (
          <Popup
          latitude={pin.latitude}
          longitude={pin.longitude}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setCurrentPlaceId(null)}
          >
          <Card>
            <Label>Name</Label>
              <h3>{pin.title}</h3>
            <Label>Review</Label>
              <Description>{pin.desc}</Description>
            <Label>Rating</Label>
            <Stars>
              {Array(pin.rating).fill(<Star/>)}
            </Stars>
            <Label>Information</Label>
            <Username>Created by <b>{pin.username}</b></Username>
            <Date>{format(pin.createdAt)}</Date>
          </Card>
        </Popup>
       )}
       
        </>
  ))}
  {newPlace && (
    <Popup
    latitude={newPlace.latitude}
    longitude={newPlace.longitude}
    closeButton={true}
    closeOnClick={false}
    anchor="left"
    onClose={() => setNewPlace(null)}
    >
      <Form onSubmit={handleSubmit} >
          <label>Title</label>
          <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}/>
          <label>Review</label>
          <textarea placeholder="Tell us something about this place" onChange={(e) => setDesc(e.target.value)}/>
          <select onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Rating</label>
          <button className="submitButton" type="submit">Add Pin</button>
      </Form>         
    </Popup>
    )}
    {currentUser ? (
      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>
    ) : (
      <Buttons>
        <LoginButton onClick={() => setShowLogin(true)}>
          Login
        </LoginButton>
        <RegisterButton onClick={() => setShowRegister(true)}>
          Register
        </RegisterButton>
      </Buttons>
    )}
    {showRegister && (
      <Register 
        setShowRegister={setShowRegister}
      />
    )}
    {showLogin && (
      <Login 
        setShowLogin={setShowLogin} 
        myStorage={myStorage} 
        setCurrentUser={setCurrentUser}
      />
    )}
    </ReactMapGL>
    </div>
  );
}

const Card = styled.div`
width: 250px;
height: 250px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const Label = styled.div`
width: max-content;
color: tomato;
font-size: 13px;
border-bottom: .5px solid tomato;
margin: 3px 0;
`;

const Description = styled.div`
font-size: 14px;
`;

const Stars = styled.div`
color: gold;
`;

const Username = styled.div`
font-size: 14px;
`;

const Date = styled.div`
font-size: 12px;
`;

const Form = styled.div`
width: 250px;
height: 250px;
display: flex;
flex-direction: column;
justify-content: space-between;
input, textarea {
  border: none;
  border-bottom: 1px solid gray;
  ::placeholder {
    font-size: 14px;
    color: rgb(172, 169, 169);
  }
}
button {
  border: none;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: tomato;
  cursor: pointer;
}
`;

const LogoutButton  = styled.button`
border: none;
padding: 5px;
border-radius: 5px;
color: white;
position: absolute;
top: 10px;
right: 10px;
background-color: tomato;
cursor: pointer;
`;

const Buttons = styled.div`
position: absolute;
top: 10px;
right: 10px;
`;

const LoginButton  = styled.button`
border: none;
padding: 5px;
border-radius: 5px;
color: white;
background-color: teal;
margin-right: 10px;
CURSOR: pointer;
`;

const RegisterButton  = styled.button`
border: none;
padding: 5px;
border-radius: 5px;
color: white;
background-color: slateblue;
CURSOR: pointer;
`;

export default App;
