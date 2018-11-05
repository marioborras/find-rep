const textEl = document.querySelector("#polling-location")
textEl.textContent = "Sorry we couldn't find your polling location"
const pollRequest = new XMLHttpRequest()

pollRequest.open("GET",`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${valuefromStrorage}`,true )

pollRequest.onload = function(){

const pollData = JSON.parse(this.response)
const pollLocation = pollData.pollingLocations[0].address 
if (pollLocation != undefined) {
    textEl.textContent =`Your polling location is at the ${pollLocation.locationName}, ${pollLocation.line1} ${pollLocation.city}, ${pollLocation.state} ${pollLocation.zip}.
It is open from ${pollData.pollingLocations[0].pollingHours}`
}

}
pollRequest.send()
