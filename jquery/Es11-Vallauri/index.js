"use strict"

$(document).ready( function(){
    let wrapper = $("#wrapper");
    for(let i=0;i<36;i++)
    {
        /*let box = $("<div>");
        box.addClass("box");
        $("#wrapper").append(box);*/
        $("<div>").addClass("box").appendTo(wrapper);
    }

    setInterval(aggiorna,32);

    function aggiorna()
    {
        let n = generaNumero(0,35);
        //let box = wrapper.children().eq(n);
        let box = wrapper.children(".box").eq(n);
        // posso mettere in cascata le stesse proprietà
        box.animate({"opacity":0.3},400)
           .animate({"opacity":0.6},400)
           .animate({"opacity":0.1},400);
    }


    function generaNumero(min,max){
        let n= Math.floor((max-min+1)*Math.random()+min) /*x generare un numero tra min e max estremi inlcusi */
        return n;
    }
    
})