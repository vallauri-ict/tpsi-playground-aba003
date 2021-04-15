6. > **LEZIONE 6**
     6. > *Consegna GeoLocation - Ese 6 GPS*
   
## Obiettivo:
Se l'utente consente di visualizzare la sua posizione, viene generata una google maps centrata rispetto alla posizione dell'utente.

## Al click del pulsante consenti:
Viene generato un **navigator.geolocation.getCurrentPosition** che restituisce la posizione corrente dell'utente. Viene poi creata una google maps centrata rispetto a quella posizione e si genera anche un map marker sul punto esatto restituito (può capitare che venga restituita la posizione del Provider).