

//countdown clock
// Set the date we're counting down to
let countDownDate = new Date("Nov 6, 2018 00:00:00").getTime();

//update the coundown every 1 second
let x = setInterval(function (){
    //get todays date and time

    let now = new Date().getTime();

    //find the distance between now and the count down date
    let distance = countDownDate - now;

    //time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance/(1000*60*60*24));
    let hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    let seconds = Math.floor((distance % (1000*60))/ 1000);

    //output the results in an element with id="time"
    document.getElementById("time").innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds `;
    //if the countdown is over, write some text
    if (distance <0 ){
        clearInterval(x);
        document.getElementById("time").innerHTML = "Expired";
    }
},1000);




const app = document.getElementById('root');


const container = document.createElement('div');
container.setAttribute('class','container');

app.appendChild(container);

//makes the submit button redirect to the show page
function validateSubmit(){
    const searchInput = document.getElementById('search').value;
    
    if( searchInput.length > 0) {
        localStorage.setItem("text", searchInput);
        window.location.href = "/show";
        
     } else {
            alert("Enter an address")
        }
}


const valuefromStrorage=localStorage.getItem("text")

// Create a request variable and assign a new XMLHttpRequest object to it.

let request = new XMLHttpRequest();



// Open a new connection, using the GET request on the URL endpoint
request.open('GET', `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${valuefromStrorage}` , true);

request.onload = function () {
    //begin accessing JSON data here
let data = JSON.parse(this.response);
//create a div with a card class
const card = document.createElement('div');
card.setAttribute('class','card');

//create an H1 and set the text content to the film's title

for (var i = 0; i <data.offices.length; i++){
    let arr = data.offices[i].officialIndices
 
    arr.forEach(politician => {
        //make the card
        const card = document.createElement('div');
        //set an atribute and class for each card
        card.setAttribute('class','card');
        //attach card to parent container
        container.appendChild(card);

        //create h1 element and append to card
        const h1 = document.createElement('h1')
        card.appendChild(h1);

        //create img tag
        //if politician image is undefined use the default image else use the image from API
        //attach it to the card
        const image = document.createElement('img');
        if (data.officials[politician].photoUrl ==undefined) {
            image.src = 'default_avatar.jpg'
        }else {
            image.src =`${data.officials[politician].photoUrl}` 
        }
        card.appendChild(image);
        //create an element tag and append to card
        const politicianName = document.createElement('h2');
        politicianName.textContent = `${data.officials[politician].name}`

        //append party next to the politician's name if it exists
        let party;
            if (data.officials[politician].party == "Republican") {
                party = document.createTextNode(" (R)");
                politicianName.appendChild(party);
            }else if (data.officials[politician].party == "Democratic"|| data.officials[politician].party == "Democrat" ) {
                    party= document.createTextNode(" (D)");
                    politicianName.appendChild(party);
                } else if (data.officials[politician].party == "Independent") {
                    party= document.createTextNode(" (I)");
                    politicianName.appendChild(party);
                };
            
        card.appendChild(politicianName);


        const list =document.createElement("ul")
        card.appendChild(list);
        const phoneNumber = document.createElement('li')
        const homePage = document.createElement('li')
        const address = document.createElement('li')
        h1.textContent = data.offices[i].name;
        homePage.innerHTML=`<a href="${data.officials[politician].urls}">Website</a>`
        //addresses of politicians
        if (data.officials[politician].address != undefined) {
        const fullAddress = data.officials[politician].address[0]
        address.textContent= Object.values(fullAddress).join(' ')
        }
    

        if (data.officials[politician].phones != undefined ) {
            phoneNumber.textContent = `${data.officials[politician].phones}`
            list.appendChild(phoneNumber);

        }
       
        //social network channels
        if (data.officials[politician].channels != undefined) {
            const socialNetworks = data.officials[politician].channels
            for (let j = 0; j < socialNetworks.length; j++) {
                let socialPlatform = socialNetworks[j].type
                if (socialPlatform == "Facebook") {
                    const faceBook = document.createElement('a')
                    faceBook.setAttribute('class','icon facebook');
                    faceBook.href =`https://www.facebook.com/${socialNetworks[j].id}`;
                    list.appendChild(faceBook)
                }
                if (socialPlatform == "Twitter") {
                    const twitter = document.createElement('a')
                    twitter.setAttribute('class','icon twitter');
                    twitter.href =`https://www.twitter.com/${socialNetworks[j].id}`;
                    list.appendChild(twitter)
                }
                if (socialPlatform == "YouTube") {
                    const youTube = document.createElement('a')
                    youTube.setAttribute('class','icon youtube');

                    //youtube names may differ if the info we have is the channel info or user info from json.
                    //had to make an if statement for this.
                    if (socialNetworks[j].id.length > 20) {
                        youTube.href = `https://www.youTube.com/channel/${socialNetworks[j].id}`;
                        list.appendChild(youTube);

                    } else {
                    youTube.href = `https://www.youTube.com/user/${socialNetworks[j].id}`;
                    list.appendChild(youTube);
                    }

                }
                }
            
        }

     if (data.officials[politician].photoUrl ==undefined) {
         image.src = 'default.jpeg'
     }else {image.src =`${data.officials[politician].photoUrl}` 
    }
        list.appendChild(phoneNumber);
        list.appendChild(homePage);
        list.appendChild(address)
        ;
        
    });
        
}
}


//send request
request.send();
//put the address that was put in the text box on the page
document.getElementById("addressInput").textContent= valuefromStrorage;




