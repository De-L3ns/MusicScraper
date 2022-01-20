// Packages

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import fetch from 'node-fetch'; // gets the node-fetch package
import { load } from 'cheerio'; // gets the cheerio package
import moment from 'moment';

// Makes __dirname work
import path from 'path';
import res from 'express/lib/response.js';
import { Console } from 'console';

const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));


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
const parsedTop50Data = load(top50Data, { decodeEntities: true }, {encoding: null});
let dates = [];

parsedTop50Data('option',".content").each(function (i, e) {
    dates[i] = (parsedTop50Data(this).text());
});

let datePrevWeek = dates[1];
let dateThisWeek = dates[0];

// gather dates from previous week (only work if there are allready dates in the list)
// does not work first week of the year
let day = datePrevWeek.split('/')[0];
let month = datePrevWeek.split('/')[1];
let year = datePrevWeek.split('/')[2];

// get backup dates from current year to perform calculations to get the date prev week 
// backup for first week of the year
let dayBackup = dateThisWeek.split('/')[0];
let monthBackup = dateThisWeek.split('/')[1];
let yearBackup = dateThisWeek.split('/')[2];
let currentWeek = new Date(`${yearBackup}-${monthBackup}-${dayBackup}`);
let lastWeek = new Date();
lastWeek.setDate(currentWeek.getDate() - 7); // decrease 7 days from the current date
let lastWeekFormatted = moment(lastWeek).format('YYYYMMDD'); // format to string with moment method

// Website url from last week
let urlPrevWeek = `${url}/${year}/${year}${month}${day}`

// Alternative year gathering incase of year change
// If one of the dates is undefined (no data) then we use the alternative method to construct the URL

if (day === undefined || month === undefined || year === undefined ) { // === checks for the type of the variable -> undefined = none

    urlPrevWeek = `${url}/${lastWeek.getFullYear()}/${lastWeekFormatted}`;

}


// Script functions

const getTop50Artists = async (url) => {
    const top50Data = await getRawData(url);
    const parsedTop50Data = load(top50Data, { decodeEntities: false });
    let artistList = [];
    

    parsedTop50Data('b',".chart_title").each(function (i, e) {
        
        artistList[i] = parsedTop50Data(this).text().replace('�', 'e');
        // .replace get's rid of the é ë and è problem.
        
    });
    
   
    return artistList;
    
};

const getTop50Songs = async (url) => {
    const top50Data = await getRawData(url);
    const parsedTop50Data = load(top50Data, { decodeEntities: false });
    let songList = [];
    
    parsedTop50Data('a', ".chart_title").each(function (i, e) {

        parsedTop50Data(this).contents().map(function(){
            songList[i] = (this.type === 'text') ? parsedTop50Data(this).text().replace('�', 'e') +'' : '';
        }).get().join('');
        // .replace get's rid of the é ë and è problem.
    })

    return songList;
    
}; 

const getWeeksInARow = async (url) => {
    const top50Data = await getRawData(url);
    const parsedTop50Data = load(top50Data, { decodeEntities: false });
    let weeks = [];
    
    parsedTop50Data('.wp', ".chart_addinfo").each(function (i, e) {

        weeks[i] = parsedTop50Data(this).text().split('|')[0].substring(1).trim();
        
    });


    return weeks;
    
}; 

let top50ArtistsThisWeek = await getTop50Artists(url);
let top50SongsThisWeek = await getTop50Songs(url);
let getWeeks = await getWeeksInARow(url);
let top50ArtistsLastWeek = await getTop50Artists(urlPrevWeek);
let top50SongsLastWeek = await getTop50Songs(urlPrevWeek);


// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Views for EJS
app.set('views', './views');
app.set('view engine', 'ejs');



app.get('', (req, res) => {

    res
        
        
        .render('index', {
            top50ArtistsThisWeek: top50ArtistsThisWeek,
            top50SongsThisWeek: top50SongsThisWeek,
            top50ArtistsLastWeek: top50ArtistsLastWeek,
            top50SongsLastWeek: top50SongsLastWeek,
            getWeeks: getWeeks,
        })
        
    
    
});

// Listen on port 3000

app.listen(port, () => console.info(`listening on port ${port}`));