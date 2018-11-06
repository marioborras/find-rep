const container = document.querySelector('.container')
const valuefromStrorage = localStorage.getItem("text")


window.onload = () =>{
    const showPage = () => {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#root").style.display = "block";
        container.style.display = "flex";
    }
    setTimeout(showPage, 3000);
   
}


// Create a request variable and assign a new XMLHttpRequest object to it.

const request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${valuefromStrorage}` , true)

request.onload = function (){
    //begin accessing JSON data here
const data = JSON.parse(this.response)
//create a div with a card class


//create an H1 and set the text content to the politicians name

for (var i = 0; i <data.offices.length; i++){
    let arr = data.offices[i].officialIndices
 
    arr.forEach(politician => {
        //make the card
        const card = document.createElement('div')
        //set an atribute and class for each card
        card.setAttribute('class','card')
        //attach card to parent container
        container.appendChild(card)

        //create h1 element and append to card
        const h1 = document.createElement('h1')
        card.appendChild(h1)

        //create img tag
        //if politician image is undefined use the default image else use the image from API
        //attach it to the card
        const image = document.createElement('img')
        if (data.officials[politician].photoUrl ===undefined) {
            image.src = "/images/default.jpeg"
        }else {
            image.src =`${data.officials[politician].photoUrl}` 
        }
        card.appendChild(image)
        //create an element tag and append to card
        const politicianName = document.createElement('h2')
        politicianName.textContent = `${data.officials[politician].name}`

        //append party next to the politician's name if it exists
        let party
            if (data.officials[politician].party === "Republican") {
                party = document.createTextNode(" (R)")
                politicianName.appendChild(party)
            }else if (data.officials[politician].party === "Democratic"|| data.officials[politician].party === "Democrat" ) {
                    party= document.createTextNode(" (D)")
                    politicianName.appendChild(party)
                } else if (data.officials[politician].party === "Independent") {
                    party= document.createTextNode(" (I)")
                    politicianName.appendChild(party)
                }
            
        card.appendChild(politicianName)


        const contactList = document.createElement("ul")
        card.appendChild(contactList)
        const phoneNumber = document.createElement('li')
        const homePage = document.createElement('li')
        const address = document.createElement('li')
        h1.textContent = data.offices[i].name
        homePage.innerHTML=`<a href="${data.officials[politician].urls}">Website</a>`
        //addresses of politicians
        if (data.officials[politician].address != undefined) {
        const fullAddress = data.officials[politician].address[0]
        address.textContent= Object.values(fullAddress).join(' ')
        }
    

        if (data.officials[politician].phones != undefined ) {
            phoneNumber.textContent = `${data.officials[politician].phones}`
            contactList.appendChild(phoneNumber)

        }
       
        //social network channels
        if (data.officials[politician].channels != undefined) {
            const socialNetworks = data.officials[politician].channels
            for (let j = 0; j < socialNetworks.length; j++) {
                let socialPlatform = socialNetworks[j].type
                if (socialPlatform === "Facebook") {
                    const facebook = document.createElement('a')
                    facebook.setAttribute('class','icon facebook')
                    facebook.href =`https://www.facebook.com/${socialNetworks[j].id}`
                    contactList.appendChild(facebook)
                }
                if (socialPlatform === "Twitter") {
                    const twitter = document.createElement('a')
                    twitter.setAttribute('class','icon twitter')
                    twitter.href =`https://www.twitter.com/${socialNetworks[j].id}`
                    contactList.appendChild(twitter)
                }
                if (socialPlatform === "YouTube") {
                    const youtube = document.createElement('a')
                    youtube.setAttribute('class','icon youtube')

                    //youtube names may differ if the info we have is the channel info or user info from json.
                    //had to make an if statement for this.
                    if (socialNetworks[j].id.length > 20) {
                        youtube.href = `https://www.youtube.com/channel/${socialNetworks[j].id}`
                        contactList.appendChild(youtube)

                    } else {
                    youtube.href = `https://www.youtube.com/user/${socialNetworks[j].id}`
                    contactList.appendChild(youtube)
                    }

                }
                }
            
        }
        contactList.appendChild(phoneNumber)
        contactList.appendChild(homePage)
        contactList.appendChild(address)
        
        
    })
        
 }
}


//send request
request.send()
//put the address that was put in the text box on the page
document.querySelector("#addressInput").textContent= valuefromStrorage




