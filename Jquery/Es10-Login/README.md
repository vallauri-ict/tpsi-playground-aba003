10. > **LEZIONE 10**
     10. > *Consegna jQuery - Ese 10 Login*
     
Data la pagina HTML contenente due Text Box ed un pulsante di submit, utilizzando SOLO metodi jQuery, scrivere un programma di autenticazione che, partendo dal seguente vettore 
precaricato:
var utenti = [ {"user":"pippo",  "pwd":"pwdPippo"},
               {"user":"pluto",  "pwd":"pwdPluto"},
		        {"user":"minnie", "pwd":"pwdMinnie"} ];
            
esegua le operazioni indicate di seguito :
•	In corrispondenza dell’abbandono del campo user (evento change) verifichi che il nome utente non sia vuoto e corrisponda ad uno dei nomi presenti nel vettore.
•	In caso di non corrispondenza applicare al TextBox un bordino rosso e visualizzare a fianco con effetto fadeIn un apposito messaggio di errore con colore del testo rosso (Utente non valido).
•	In caso di corrispondenza applicare al TextBox un bordino nero e visualizzare a fianco con effetto fadeIn un apposito messaggio di OK con colore verde.
•	In caso di passaggio del mouse sui TextBox, il bordo diventa blu e lo sfondo diventa blu chiaro (#CCF);
•	In corrispondenza dell’abbandono del campo pwd (evento change) verifichi che la password inserita sia lunga almeno 8 caratteri, contenga almeno 1 carattere letterale ed almeno un 
carattere numerico e, in caso affermativo, verifiche che sia presente nel vettore delle password e ci sia corrispondenza di posizione con lo username inserito, per la corrispodenza della password è stata utilizzata una regEx (let regEx = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;). 
Gestire Errori e Ok esattamente come nel caso dello User.
