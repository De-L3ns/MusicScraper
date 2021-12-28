// Packages

import express from 'express';
const app = express();
const port = 3000;
import fetch from 'node-fetch'; // gets the node-fetch package
import { load } from 'cheerio'; // gets the cheerio package

// Makes __dirname work
import path from 'path';
import res from 'express/lib/response.js';

const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));


// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Views for EJS
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('', (req, res) => {

    res.render('index', {
        top50ArtistsThisWeek: top50ArtistsThisWeek,
        top50SongsThisWeek: top50SongsThisWeek,
        top50ArtistsLastWeek: top50ArtistsLastWeek,
        top50SongsLastWeek: top50SongsLastWeek,
    })
    

});

// Listen on port 3000

app.listen(port, () => console.info(`listening on port ${port}`));


// # Functions


const getRawData = (URL) => { // get the data from the website
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        });
};


// Website url
const url = 'https://www.ultratop.be/nl/ultratop50'



// extract the previous date from the webpage to generate the URL for last week
const top50Data = await getRawData(url);
const parsedTop50Data = load(top50Data);
let dates = [];

parsedTop50Data('option',".content").each(function (i, e) {
    dates[i] = (parsedTop50Data(this).text());
});

let datePrevWeek = dates[1];
let day = datePrevWeek.split('/')[0];
let month = datePrevWeek.split('/')[1];
let year = datePrevWeek.split('/')[2];

//website url from last week
let urlPrevWeek = `${url}/${year}/${year}${month}${day}`



// Script

const getTop50Artists = async (url) => {
    const top50Data = await getRawData(url);
    const parsedTop50Data = load(top50Data);
    let artistList = [];
    

    parsedTop50Data('b',".chart_title").each(function (i, e) {
        artistList[i] = parsedTop50Data(this).text();
    });
    
    
    return artistList;
    
};

const getTop50Songs = async (url) => {
    const top50Data = await getRawData(url);
    const parsedTop50Data = load(top50Data);
    let songList = [];
    
    parsedTop50Data('a', ".chart_title").each(function (i, e) {

        parsedTop50Data(this).contents().map(function(){
            songList[i] = (this.type === 'text') ? parsedTop50Data(this).text()+'' : '';
        }).get().join('');
        
    })

    return songList;
    
}; 


let top50ArtistsThisWeek = await getTop50Artists(url);
let top50SongsThisWeek = await getTop50Songs(url);
let top50ArtistsLastWeek = await getTop50Artists(urlPrevWeek);
let top50SongsLastWeek = await getTop50Songs(urlPrevWeek);

