// Ude Import export (MANDATORY)

import navbar from "../components/navbar.js";
document.getElementById("navbar").innerHTML=navbar();


var input=document.getElementById("search_input");

input.addEventListener("keydown", function(e){
    if(e.key=="Enter"){
        validate(e);
    }
});


var news_array=JSON.parse(localStorage.getItem("news")) || [];


async function validate(e){

    try {
        let query=e.target.value;

   let res=await fetch(`https://masai-mock-api.herokuapp.com/news?q=${query}`);

   const data=await res.json();

   const data1=data.articles;
   getNews(data1)

   console.log(data.articles);
    }
    catch(err){
    console.log(err)
}
}


function getNews(data1){

    data1.forEach(function(el){
       
        news_array.push(el);
        localStorage.setItem("news",JSON.stringify(news_array));
    });
}

function appendNews(){

    news_array.forEach(function(el){

        var div1=document.createElement("div");
        div1.id="div1"
        var div2=document.createElement("div");
        div2.id="div2"
        var div3=document.createElement("div");
        div3.id="div3"

        var img=document.createElement("img");
        img.src=el.urlToImage;

        var h4=document.createElement("h4");
        h4.innerText=el.content;

        var p=document.createElement("p");
        p.innerText=el.description;

        div2.append(img)
        div3.append(h4,p)
        div1.append(div2,div3)

        let box=document.getElementById("detailed_news");

        box.append(div1)
    
    })
}

appendNews()