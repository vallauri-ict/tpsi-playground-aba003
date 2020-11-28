"use strict"

let ul = [];

$(document).ready(function(){
    let _wrapper = $("#wrapper");
    ul.push(_wrapper.children("ul").eq(0));
    ul.push(_wrapper.children("ul").eq(1)); 
});

function aggiungi(index){
    //let li = $("<li>menu 1 voce 4</li>");
    index--;
    let li= $("<li>");
    let n=ul[index].children(li).length +1; //qaunti li ci sono
    li.html("menu "+(index+1)+"voce <b>"+n+ "</b>");
    ul[index].append(li);
};

function sposta(index){
    index--;
    let li=ul[index].children("li").last();
    if(index==0){
        li.appendTo(ul[1]);
    }else{
        li.appendTo(ul[0]);
    }
}
function aggiuniPrima(index){
    index--;
    let li= $("<li>");
    li.text("voce iniziale");
    //ul[index].children("li").first().before(li);
    li.insertBefore(ul[index].children("li").first().before(li));
}
function aggiungiDopo(index){
    index--;
    let li= $("<li>");
    li.text("voce dopo il primo elemento");
    //ul[index].children("li").first().before(li);
    li.inserAfter(ul[index].children("li").first());
}
