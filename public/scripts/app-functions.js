window.onload = ()=> {
    const showPage = () => {
        document.querySelector("#myDiv").style.display = "block";
    }
    setTimeout(showPage, 500);
    
}


//countdown clock
// Set the date we're counting down to
const countDownDate = new Date("Nov 6, 2018 00:00:00").getTime()

//update the coundown every 1 second
const x = setInterval(() =>{
    //get todays date and time

    const now = new Date().getTime()

    //find the distance between now and the count down date
    const distance = countDownDate - now

    //time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance/(1000*60*60*24))
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60))
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60))
    const seconds = Math.floor((distance % (1000*60))/ 1000)

    //output the results in an element with id="time"
    document.querySelector("#time").innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds `
    //if the countdown is over, write some text
    if (distance <0 ){
        clearInterval(x)
        document.querySelector("#time").innerHTML = "Expired"
    }
},1000)

document.querySelector("#form").addEventListener("submit", (e)=> {
    e.preventDefault()
    const searchInput = e.target.address.value
    if( searchInput.length > 0) {
        localStorage.setItem("text", searchInput)
        location.assign("/show")
        
     } else {
            alert("Enter an address")
        }
})

//event listener triggered when submit button clicked
// document.querySelector('#submit-button').addEventListener("click",() =>{
//     const searchInput = document.querySelector('#search').value
    
//     if( searchInput.length > 0) {
//         localStorage.setItem("text", searchInput)
//         location.assign("/show")
        
//      } else {
//             alert("Enter an address")
//         }
// })

activatePlacesSearch = function() {
    let input = document.querySelector('#search');
    let autocomplete = new google.maps.places.Autocomplete(input);
    // Set  restriction on country for the autocomplete 
    autocomplete.setComponentRestrictions(
    {'country': 'us'});
}

//jquery to disable button if no text
$('#submit').attr('disabled', true)
$('input:text').keyup(function (){
    let disable = false
    $('input:text').each(function() {
        if($(this).val()==""){
            disable = true              
        }
    })
    $('#submit-button').prop('disabled', disable)
})
