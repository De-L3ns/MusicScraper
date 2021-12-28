

// DOM Manipulation for the list items

let currentTop50 = document.getElementsByClassName('currentTop50ListItem');
let lastTop50 = document.getElementsByClassName('lastTop50ListItem');

console.log('Im here');
console.log(currentTop50);
console.log('im here 2');

for (let i = 0; i < currentTop50.length; i++) {

    currentTop50[i].style.color = 'green';

    for (let j = 0; j < lastTop50.length; j++) {

        if (currentTop50[i].innerText == lastTop50[j].innerText) {

            currentTop50[i].style.color = 'black';
            

        } 
    }

} 

for (let i = 0; i < lastTop50.length; i++) {

    lastTop50[i].style.color = 'red';

    for (let j = 0; j < currentTop50.length; j++) {

        if (lastTop50[i].innerText == currentTop50[j].innerText) {

            lastTop50[i].style.color = 'black';
            

        } 
    }

} 