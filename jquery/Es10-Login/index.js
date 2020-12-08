
var utenti = [ {"user":"pippo",  "pwd":"pwdPippo"},
               {"user":"pluto",  "pwd":"pwdPluto"},
			   {"user":"minnie", "pwd":"pwdMinnie"} ];
              
 let pwd;	
 let user;	   
$(document).ready(function() {

    let _txtUser = $("#txtUser");
    let _txtPwd = $("#txtPwd");
    let _msgUser = $("#msgUser");
    let _msgPwd = $("#msgPwd");

    _txtUser.change(function() {
        let ok = false;

        if(_txtUser.val()=="")
        {
            _msgUser.fadeOut(function(){
                _txtUser.css("border","1px solid red");
                _msgUser.fadeIn(1000).text("Nessun utente inserito").css("color", "red");
             });
        }
        else
        {
            for (const item of utenti) {
                if (_txtUser.val() == item.user) {
                    ok = true;
                }
            }
            if (!ok) {
                _msgUser.fadeOut(function(){
                    _txtUser.css("border", "1px solid red");
                    _msgUser.fadeIn(1000).text("Utente non valido").css("color", "red");
                });
            } else {
                _txtUser.css("border", "1px solid black");
                        _msgUser.fadeOut(function(){
                         _msgUser.fadeIn(1000).text("OK").css("color", "green"); 
                 });
            }
        }
    })


    _txtPwd.change(function() {
        let ok = false;
        if(_txtPwd.val()=="")
        {
            _txtPwd.css("border", "1px solid red");
            _msgPwd.fadeOut(function(){
                _msgPwd.fadeIn(1000).text("Nessuna password inserita").css("color", "red");    
            });   
        }
        else
        {
            if(_txtPwd.val().length>=8)
            {
                for (const item of utenti)
                if (_txtPwd.val() == item.pwd)
                    if (item.user == _txtUser.val())
                        ok = true;
        if (!ok) {
            _txtPwd.css("border", "1px solid red");
            _msgPwd.fadeOut(function(){
                _msgPwd.fadeIn(1000).text("Password non valida").css("color", "red"); 
             });
        } else {
            _txtPwd.css("border", "1px solid black");
            _msgPwd.fadeOut(function(){
            _msgPwd.fadeIn(1000).text("OK").css("color", "green");
           });
        }
            }
            else
            {
                _txtPwd.css("border", "1px solid red");
            _msgPwd.fadeOut(function(){
                _msgPwd.fadeIn(1000).text("Password troppo corta").css("color", "red");    
            }); 
            }
            
        }
    })

    coloraTextBox();

    function coloraTextBox(){
        _txtUser.on("mouseenter", function(){
            _txtUser.css({"background-color":"#CCF", "border":"1px solid blue"});
        })
        _txtUser.on("mouseleave", function(){
            _txtUser.css({"background-color":"", "border":""});
        })
        _txtPwd.on("mouseenter", function(){
            _txtPwd.css({"background-color":"#CCF", "border":"1px solid blue"});
        })
        _txtPwd.on("mouseleave", function(){
            _txtPwd.css({"background-color":"", "border":""});
        })
    }
});
