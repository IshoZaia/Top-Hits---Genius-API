import './App.scss';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Lyrics } from './Lyrics';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
export default function App() {
  return (
      <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route
          path="lyrics"
          element={
            <Lyrics url="https://genius.com/Taylor-swift-exile-lyrics" />
          }
        />
        <Route path="song/:id" element={<Song />} />
      </Routes>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <>
    <Link to="/">
      <div id="header">
        <div id="hContent">
          Top 5s By Genius
        </div>
      </div>
      </Link>
    </>
  )
}
function Search() {
  const [searched, setSearched] = useState({ name: "Taylor Swift" });
  const [artistName, setArtistName] = useState([]);
  const onChangeHandler = (event) => {
    var newValue = event.target.value;
    var targetName = event.target.name;
    setSearched({ ...searched, [targetName]: newValue });
  }
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'cf9c36239bmsh101292c4053037fp1cd164jsn32e552991d7b',
        'X-RapidAPI-Host': 'genius.p.rapidapi.com'
      }
    };
    fetch('https://genius.p.rapidapi.com/search?q=' + searched.name, options)
      .then(response => response.json())
      .then(response => {
        const artistID = response.response.hits[0].result.primary_artist.id;
        return fetch('https://genius.p.rapidapi.com/artists/' + artistID + '/songs?per_page=5&page=1&sort=popularity', options);
      })
      .then(response => response.json())
      .then(response => {console.log(response)
         setArtistName(response)})
      .catch(err => console.error(err));
  }, [searched]);

  let storeSongs = () => {

    let songList = [];
    for (let i = 0; i < artistName.response.songs.length; i++) {
      songList.push({
        id: artistName.response.songs[i].id,
        coverArt: artistName.response.songs[i].header_image_url,
        title: artistName.response.songs[i].title,
        release: artistName.response.songs[i].release_date_for_display,
      }
      )
    }
    return songList;
    
  }
  return (
    <>
    <Container className='w-100' fluid="md">
        <Row>
          <Col id="desc"><h2>Search for any artist to reveal their top 5 songs! </h2></Col>
        </Row>
      </Container>
    <div className="text-center" >
      <input type="text" name={"name"} id="search" placeholder='Search for an artist' onChange={onChangeHandler} value={searched.name}></input>
    </div>
      <SearchedArtist name={searched.name} />
      <Container className="d-flex flex-col-md-4">
        {artistName.response && storeSongs().map((songsinfo) => {
          return (
            <ArtistForm key={songsinfo.id} 
            coverArt={songsinfo.coverArt} 
            title={songsinfo.title} 
            release={songsinfo.release} 
            sample={songsinfo.sample} 
            songLink={songsinfo.id} />)}
        )}
        </Container>
    </>
  )
}

function SearchedArtist(props) {
  return (
    <h1 style={{textAlign: "center"}}>
      {props.name}
    </h1>
  )
}
function ArtistForm(props) {
  return (
    <Card style={{ width: '18rem' }} className="text-center" key={props.id}>
      <Card.Img variant="top" src={props.coverArt} className="card-img-top" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> {props.release}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link className="btn btn-primary" to={`song/${props.songLink}`} >Songs</Link>
        <Card.Link className="btn btn-primary" href="#">Lyrics</Card.Link>
      </Card.Body>
    </Card>
    /*<Row className='songs' key={props.id}>
      <table className="ArtistSongs">
      <th><Col>Title: {props.title}</Col></th>
      <tr><Col>Release Date: {props.release}</Col></tr>
      <tr><Col><img src={props.coverArt} width={250} height={250} alt="Artist Song Cover Art" /></Col></tr>
      </table>
    </Row>*/
  )
}
