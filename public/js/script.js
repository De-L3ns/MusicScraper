

// DOM Manipulation for the list items

let currentTop50 = document.getElementsByClassName('currentTop50ListItem');
let lastTop50 = document.getElementsByClassName('lastTop50ListItem');
let olNew = document.getElementById("new");
let olGrowth = document.getElementById("top");
let olDropped = document.getElementById("dropped");



for (let i = 0; i < lastTop50.length; i++) {

    lastTop50[i].style.color = 'red';
    lastTop50[i].style.fontWeight = 'bold';


    for (let j = 0; j < currentTop50.length; j++) {

        if (lastTop50[i].innerText == currentTop50[j].innerText) {

            lastTop50[i].style.color = 'black';
            lastTop50[i].style.fontWeight = 'normal';
            

        } 
    }

    if (lastTop50[i].style.color == 'red') {

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(lastTop50[i].innerHTML));
        olDropped.appendChild(li);


    }

} 

for (let i = 0; i < currentTop50.length; i++) {

    currentTop50[i].style.color = 'green';
    currentTop50[i].style.fontWeight = 'bold';
    
    

    for (let j = 0; j < lastTop50.length; j++) {

        if (currentTop50[i].innerText == lastTop50[j].innerText) {

            currentTop50[i].style.color = 'black';
            currentTop50[i].style.fontWeight = 'normal';

            if (i == j) {

                currentTop50[i].innerHTML += ' 0';
                

            } else if (i < j) {
                let growth = j - i;
                currentTop50[i].innerHTML += ` +${growth}`;
                if (growth > 9) {

                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(currentTop50[i].innerHTML));
                    olGrowth.appendChild(li);

                }
                

            } else {

                currentTop50[i].innerHTML += ` -${i - j}`;
            }
            

        
        }
    }

    if (currentTop50[i].style.color == 'green') {

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(currentTop50[i].innerHTML));
        olNew.appendChild(li);


    }

} 

