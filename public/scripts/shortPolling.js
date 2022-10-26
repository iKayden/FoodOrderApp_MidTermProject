const shortPolling = ()=>{
  setInterval(async() => {
        let response = await fetch(`http://localhost:8080/`);
        let data = await response.json();
        if(data.randomNum%2===0){
            document.getElementById("body").style.background="red";
        }else{
            document.getElementById("body").style.background="white";
        }
  }, 5000);
}
shortPolling();