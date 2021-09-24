import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"
import styled from "styled-components"

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4
  });
  return (
    <div className="App">
       <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    >
       <Marker latitude={48.858093} longitude={2.294694} offsetLeft={-20} offsetTop={-10}>
        <Room atyle={{ fontSize: viewport.zoom * 7 }}/>
       </Marker>
       <Popup
          latitude={48.858093}
          longitude={2.294694}
          closeButton={true}
          closeOnClick={false}
          anchor="left" >
          <Card>
            <Label>Name</Label>
              <h3>Eiffell Tower</h3>
            <Label>Review</Label>
              <Description>A beautiful place. I like it.</Description>
            <Label>Rating</Label>
            <Stars>
            <Star/>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Stars>
            <Label>Information</Label>
            <Username>Created by <b>Nishank</b></Username>
            <Date>1 Hour age</Date>
          </Card>
        </Popup>
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

export default App;
