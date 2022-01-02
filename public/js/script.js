

// DOM Manipulation for the list items

let currentTop50 = document.getElementsByClassName('currentTop50ListItem');
let lastTop50 = document.getElementsByClassName('lastTop50ListItem');
let growthTable = document.getElementsByClassName('ranking');
let tableNew = document.getElementById("new");
let tableGrowth = document.getElementById("top");
let tableDropped = document.getElementById("dropped");

let dropDown = document.getElementsByClassName("drop-down");


// special variables
let idNumberNew = 0;
let idNumberGrowth = 0;


for (let i = 0; i < lastTop50.length; i++) {

    lastTop50[i].style.color = "darkred";
    lastTop50[i].style.fontWeight = 'bold';


    for (let j = 0; j < currentTop50.length; j++) {

        if (lastTop50[i].innerText == currentTop50[j].innerText) {

            lastTop50[i].style.color = 'black';
            lastTop50[i].style.fontWeight = 'normal';
            

        } 
    }

    if (lastTop50[i].style.color == "darkred") {

        let row = tableDropped.insertRow(-1);
        let cellSpot = row.insertCell(0);
        let cellArtistNumber = row.insertCell(1);
        
        cellSpot.innerHTML = i + 1;
        cellArtistNumber.innerHTML = lastTop50[i].innerHTML;
        


    }

} 

for (let i = 0; i < currentTop50.length; i++) {

    currentTop50[i].style.color = 'green';
    currentTop50[i].style.fontWeight = 'bold';
    currentTop50[i].id = `copyTextCurrent${i}`;

    
    

    for (let j = 0; j < lastTop50.length; j++) {

        if (currentTop50[i].innerText == lastTop50[j].innerText) {

            currentTop50[i].style.color = 'black';
            currentTop50[i].style.fontWeight = 'normal';

            if (i == j) {

                growthTable[i].innerHTML += '0';
                

            } else if (i < j) {
                let growth = j - i;
                growthTable[i].innerHTML += `+${growth}`;
                if (growth > 9) {
                    
                    let row = tableGrowth.insertRow(-1);
                    let cellSpot = row.insertCell(0);
                    let cellArtistNumber = row.insertCell(1);
                    cellArtistNumber.id = `copyTextGrowth${idNumberGrowth}`;
                    idNumberGrowth++;
                    let cellCopy = row.insertCell(2);
                    cellSpot.innerHTML = i + 1;
                    cellArtistNumber.innerHTML = currentTop50[i].innerHTML;
                    cellCopy.innerHTML = '<button class="copyButtonGrowth"><i class="fa fa-copy"></i></button>'

                   

                }

                if (growth > 0) {

                    growthTable[i].style.color = "green";

                } 
                

            } else {

                growthTable[i].innerHTML += `-${i - j}`;
                growthTable[i].style.color = "darkred";
            }
            

        
        }
    }

    if (currentTop50[i].style.color == 'green') {
        
        let row = tableNew.insertRow(-1);
        let cellSpot = row.insertCell(0);
        let cellArtistNumber = row.insertCell(1);
        
        
        let cellCopy = row.insertCell(2);
        cellSpot.innerHTML = i + 1;
        cellArtistNumber.innerHTML = currentTop50[i].innerHTML;
        cellCopy.innerHTML = '<button class="copyButtonNew"><i class="fa fa-copy"></i></button>'
        cellArtistNumber.id = `copyTextNew${idNumberNew}`;
        idNumberNew++;



    }

}

// Button logic for all buttons on the tables

// Current Top 50 buttons

let copyButtonsCurrent = document.getElementsByClassName('copyButtonCurrent');

for (let i = 0; i < copyButtonsCurrent.length; i++) {

    copyButtonsCurrent[i].addEventListener("click", function() {
        copyToClipboard((`copyTextCurrent${i}`));

    })

}

// New this week buttons

let copyButtonsNew = document.getElementsByClassName('copyButtonNew');

for (let i = 0; i < copyButtonsNew.length; i++) {

    copyButtonsNew[i].addEventListener("click", function() {
        copyToClipboard((`copyTextNew${i}`));

    })

}

// Top Growers buttons

let copyButtonsGrowth = document.getElementsByClassName('copyButtonGrowth');
for (let i = 0; i < copyButtonsGrowth.length; i++) {

    copyButtonsGrowth[i].addEventListener("click", function() {
        copyToClipboard((`copyTextGrowth${i}`));

    })
    

}





// re-usable functions

function copyToClipboard(elementID) {

    let element = document.getElementById(elementID);

    let text = element.textContent;
    copyText(text);
    
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    

}

// for (let i = 0; i < dropDown.length; i++) {
//     dropDown[i].addEventListener("click", function() {
//       this.classList.toggle("active");
//       let content = this.nextElementSibling;
//       if (content.style.maxHeight){
//         content.style.maxHeight = null;
//       } else {
//         content.style.maxHeight = content.scrollHeight + "px";
//       } 
//     });

// }