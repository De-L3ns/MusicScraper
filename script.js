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
    console.log(top50Data);
    const parsedTop50Data = load(top50Data);
    const top50Songs = parsedTop50Data('div.content.charitem');
    console.log(top50Songs);
    
};

getTop50();