// 2661bd309c1b41d995207ba1bb107185



// AJAX 
const source="2661bd309c1b41d995207ba1bb107185";
const xhr= new XMLHttpRequest();

xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=in&apiKey=${source}`,true);

let newHTML="";
xhr.onload=function(){
    if(this.status==200){
        let apiobj=JSON.parse(this.responseText)
        let articles=apiobj.articles;
       articles.forEach((element)=>{
       if(element.content===null){
        element.content="";
       }
       if(element.urlToImage===null){
       
         element.urlToImage="./no-pictures.png";
       }
       })
        
        articles.forEach((element,index)=>{
            var date = new Date(element.publishedAt);
            
                let str = `  
                <div class="item mt-3" id="${index}"> ${element.title}  
                <img src="${element.urlToImage}" alt="">
                <p>updated on : ${date} </p></div>
                
                <div class="box" id="box${index}">
                ${element.content} <a href="${element.url} target="_blank"> Read More Here </a>
                </div>`
                
                
                newHTML+=str;
        

        
        })

        let news=document.getElementById('content');
        news.innerHTML=newHTML;
   
    }
}

xhr.send();

setTimeout(()=>{
    let item=document.querySelectorAll('.item');
    let box=document.querySelectorAll('.box');
    item.forEach(element=>{
        element.addEventListener('click',function(){
            console.log("clicked")
            if(box[element.id].style.display==="block"){

                box[element.id].style.display="none";
            }
            else{
                box[element.id].style.display="block";
            }

            
        })
    })
    
},1000)








function displayDate(){
    let time=new Date();
    let year=time.getFullYear();
    let month=time.getMonth() + 1;
    if(month<10){
        month="0"+month
    }
    let date=time.getDate();
    if(date<10){
        date="0"+date;
    }
    let day=time.getDay();
    let currDate=date+ " / " + month + " / "+ year;
    document.getElementById("date").textContent= currDate;
}


setInterval(() => {
    displayDate();
}, 1000);


function displayTime(){
    let time=new Date();
    let hours=time.getHours();
    if(hours<10){
        hours="0"+hours;
    }
    let minutes=time.getMinutes();
    if(minutes<10){
        minutes="0"+minutes;
    }
    let sec=time.getSeconds();
    if(sec<10){
        sec="0"+sec;
    }
  
    let currTime=hours + " : " + minutes + " : "  + sec;
  document.getElementById("time").textContent= currTime;
} 



setInterval(() => {
    displayTime();
}, 1000);

const mylocation= ()=>{

    const success = (position)=>{
        const lattitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        const geoApiurl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lattitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(geoApiurl).then((response)=>{
            return response.json();
        }).then((data)=>{
           
        document.getElementById('location').innerHTML=`  </i> ${data.principalSubdivision}   ${data.countryName} `
        });
       
        
    }
    const error = ()=>{
        console.log("Error occured");
    }

    navigator.geolocation.getCurrentPosition(success,error); // IMPORTANT LINE


}

mylocation();

