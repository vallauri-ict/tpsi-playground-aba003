##PHP
Ogni operazione eseguita sul Web coinvolge un client ed un server. Un client è un dispositivo (ad esempio un browser) che effettua una richiesta ad un server remoto. Il server remoto attraverso un linguaggio di scripting (come per esempio PHP) interpreta la richiesta del client ed invia una risposta (ad esempio una pagina HTML, un oggetto JSON o un XML) al client. A questo punto il client è in grado di interpretare, a sua volta, la risposta ricevuta e fornirla all’utente; nel caso del browser riceverà una pagina HTML che mostrerà all’utente.

PHP è un linguaggio per lo scripting server-side, ovvero un linguaggio che risiede in un server in remoto e che in fase di esecuzione interpreta le informazioni ricevute da un client grazie al Web server, le elabora e restituisce un risultato al client che ha formulato la richiesta.

Supponiamo ad esempio di accedere ad una pagina di un sito Web in cui effettuare il login. Dal nostro browser all’interno di una pagina (ad esempio www.nomesito.com/login) inseriremo le nostre credenziali per l’autenticazione. Semplificando il più possibile, le azioni che vengono compiute saranno le seguenti:

il browser effettua una richiesta con le credenziali al server remoto tramite il protocollo HTTP;
il Web server riceve la richiesta e la interpreta verificando che i dati inviati siano corretti;
il web server restituisce una risposta al client che potrà essere diversa a seconda del fatto che la risorsa richiesta sia disponibile o meno.
Quello di cui si occupa PHP è appunto elaborare i dati veicolati tramite una richiesta HTTP e fornire un’adeguata risposta al client. Nel nostro caso il linguaggio avrà il compito di verificare che i dati di login siano corretti e restituire una risposta diversa a seconda della validità delle informazioni ricevute; tale meccanismo viene rappresentato dalla figura seguente (fonte).