import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import './App.scss'

export default function Song(props) {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "cf9c36239bmsh101292c4053037fp1cd164jsn32e552991d7b",
            "X-RapidAPI-Host": "genius.p.rapidapi.com"
        }
    };
    let { id } = useParams();
    const [song, setSong] = useState({});
    useEffect(() => {
        fetch("https://genius.p.rapidapi.com/songs/" + id, options)
            .then((x) => x.json())
            .then((json) => {
                setSong(json.response.song);
                console.log(json.response.song);
            });
    }, []);

    if (song.album === undefined) {
        return <h1 style={{padding: "200px"}} className="text-center">Please wait...</h1>;
    }
    else if (song.recording_location == null && song.album !== null) {
        return (
            <>
            <SubHeader name={song.primary_artist.name} />
            <Container style={{padding: "10px"}} className="col d-flex justify-content-center">
            <Card style={{ width: '18rem' }} className="text-center" key={props.id}>
                <Card.Img variant="top" src={song.header_image_thumbnail_url} className="card-img-top" />
                <Card.Body>
                    <Card.Title>Album<br/>{song.album.full_title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Song<br/>{song.title} </ListGroup.Item>
                    <ListGroup.Item>Release Date<br/> {song.release_date_for_display}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link id="button" className="btn btn-dark" href={song.apple_music_player_url}>Listen to a Sample</Card.Link>
                    </Card.Body>
                    <Card.Body>
                    <Card.Link id="button" className="btn btn-dark" href={song.primary_artist.url}>Other Songs By {song.primary_artist.name}</Card.Link>
                </Card.Body>
            </Card>
            </Container>
            </>
        );
    }
    else if(song.album == null){
        return(
            <>
            <Container style={{padding: "10px"}} className="col d-flex justify-content-center">
            <Card style={{ width: '18rem' }} className="text-center" key={props.id}>
                <Card.Img variant="top" src={song.header_image_thumbnail_url} className="card-img-top" />
                <Card.Body>
                    <Card.Title>Song<br/>{song.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Release Date<br/> {song.release_date_for_display}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link id="button" className="btn btn-dark" href={song.apple_music_player_url}>Listen to a Sample</Card.Link>
                    </Card.Body>
                    <Card.Body>
                    <Card.Link id="button" className="btn btn-dark" href={song.primary_artist.url}>Other Songs By {song.primary_artist.name}</Card.Link>
                </Card.Body>
            </Card>
            </Container>
            </>
        );
    }
    return (
        <>
        <Container style={{padding: "10px"}} className="col d-flex justify-content-center">
        <Card style={{ width: '18rem' }} className="text-center" key={props.id}>
            <Card.Img variant="top" src={song.header_image_thumbnail_url} className="card-img-top" />
            <Card.Body>
                <Card.Title>Album<br/>{song.album.full_title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>Song<br/>{song.title} </ListGroup.Item>
                    <ListGroup.Item>Release Date<br/> {song.release_date_for_display}</ListGroup.Item>
                <ListGroup.Item>Recorded at<br/> {song.recording_location}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Card.Link id="button" className="btn btn-dark" href={song.apple_music_player_url}>Listen to a Sample</Card.Link>
                    </Card.Body>
                    <Card.Body>
                    <Card.Link id="button" className="btn btn-dark" href={song.primary_artist.url}>Other Songs By {song.primary_artist.name}</Card.Link>
            </Card.Body>
        </Card>
        </Container>
        </>
    );
}
function SubHeader(props){
    return(<>
    <h2 id="songSub" >Find songs like this and others by {props.name}! </h2><br/>
    </>)
}
