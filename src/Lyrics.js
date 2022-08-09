import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
const cio = require('cheerio-without-node-native');


export function Lyrics(props) {
    let { path } = useParams()
    let [data, setData] = useState({})
    useEffect(() => {
    fetch('https://thingproxy.freeboard.io/fetch/' + "https://genius.com/" + path, { mode: 'cors' })
        .then(response => (response.text()))
        .then((html) =>{ setData(html)})
    }, []
    )
    const $ = cio.load(data);
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
        lyrics = ''
        $('div[class^="Lyrics__Container"]').each((i, elem) => {
            if ($(elem).text().length !== 0) {
                let snippet = $(elem).html()
                    .replace(/<br>/g, '\n')
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
                lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
            }
        })
    }
    if (!lyrics) return <h1 style={{padding: "200px"}} className="text-center">Please wait...</h1>;
    return (<>
    <h2 class="lyrics-H">Lyrics</h2>
    <div class="lyrics" dangerouslySetInnerHTML={{ __html: lyrics.trim().replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
    
    </>)
}

