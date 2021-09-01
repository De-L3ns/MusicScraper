// Packages

import fetch from 'node-fetch'; // gets the node-fetch package
import { load } from 'cheerio'; // gets the cheerio package

// # Functions


const getRawData = (URL) => { // get the data from the website
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        });
};

// Website url
const URL = 'https://www.ultratop.be/nl/ultratop50'

// Script

const getTop50 = async () => {
    const top50Data = await getRawData(URL);
    const parsedTop50Data = load(top50Data);
    let songList = [];
    let artistList = [];
    let top50SongsArtists = {};

    parsedTop50Data('b',".chart_title").each(function (i, e) {
        artistList[i] = parsedTop50Data(this).text();
    });
    
    parsedTop50Data('a', ".chart_title").each(function (i, e) {

        parsedTop50Data(this).contents().map(function(){
            songList[i] = (this.type === 'text') ? parsedTop50Data(this).text()+'' : '';
        }).get().join('');
        
    })
    
    artistList.forEach((key, i) => top50SongsArtists[key] = songList[i]);
    console.log(top50SongsArtists);
    

    
};

getTop50();