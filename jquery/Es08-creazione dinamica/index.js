"use strict"

let ul = [];

$(document).ready( function(){
    let wrapper = $("#wrapper");
    ul.push(wrapper.children("ul").eq(0)); 
    ul.push(wrapper.children("ul").eq(1));
})

function aggiungi(index){
    index--;
    //let _li = $("<li> menu 1 voce 4 </li>");  // creo un nuovo elemento <li>
    let _li =  $("<li>");
    let n = ul[index].children("li").length + 1;
    _li.html("menu " + (index+1) + " voce <b>" + n + "</b>"); //con html posso scrivere anche dei tag
    ul[index].append(_li);
}

function sposta(index){
    index--;
    let _li = ul[index].children().last();  // puntatore all'ultimo elemento del menu passato
    if(index == 0)
        _li.appendTo(ul[1]); // taglia automaticamente la voce se già presente
    else if(index == 1)
        _li.appendTo(ul[0]);
}

function aggiungiPrima(index){
    index--;
    let _li = $("<li>");
    _li.text("voce iniziale");
    ul[index].children("li").first().before(_li);
    // li.insertBefore(ul[index].children("li").first()); equivalenti
}

function aggiungiDopo(index){
    index--;
    let _li = $("<li>");
    _li.text("voce dopo il primo elemento");
    ul[index].children("li").first().after(_li);
    // li.insertAfter(ul[index].children("li").first()); equivalenti
}

function replica(index){
    index--;
    let _li = $("<li>");
    _li.text("------------");
    _li.insertBefore(ul[index].children("li"));
}

function creazioneConCostruttore(){
    $("<div>", {
        "css": {
            "background-color":"#ddd",
            "width":"190px",
            "height":"50px",
            "color":"blue",
        },
        "text":"Hello world!",
        "appendTo":wrapper,
        "append":[
            $("<br>"),
            $("<label>", {"text":"hobbies :"}),
            $("<input>", {"type":"radio", "name":"hobbies"}),
            $("<span>", {"text":"sport"}),
            $("<input>", {"type":"radio", "name":"hobbies"}),
            $("<span>", {"text":"musica"}),
        ]
    })
}