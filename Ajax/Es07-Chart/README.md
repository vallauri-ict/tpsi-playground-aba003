8. > **LEZIONE 8**
     8. > *Consegna Ajax - Ese 8 Chart*
   
## Premessa per l'esercizio:
**chartjs.org** è una libreria JavaScript, responsive, open-source, molto flessibile, che permette di creare rapidamente grafici efficaci, alimentando il motore di rendering con dati e opzioni in formato JSON. Si aspetta come parametro un canvas HTML5 (area di disegno) su cui tracciare il grafico. Per il suo utilizzo in una applicazione javascript è disponibile il seguente link cdn: https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js
- Le diverse variabili keys, values, colors, borderColors sono tutti vettori enumerativi paralleli. Il grafico è tracciato sulla base dei values, i principali grafici supportati sono:
- 'doughnut' ->  ciambella  
- 'pie' ->  torta 
- 'bar' ->  diagramma a barre verticali
- 'radar' ->  diagramma a ragnatela


## Obiettivo:
Scrivere una applicazione che:
- Richieda a randomuser.me un elenco di 100 persone
- Visualizzi sotto forma di tabella (creata dinamicamente) il numero di persone appartenenti a ciascuna nazionalità
- Riporti la stessa informazione sotto forma di grafico
- Aggiunga dinamicamente in coda un pulsante che consenta di salvare l’immagine su disco.


## Nota per il salvataggio:
Per salvare il canvas su disco, all’interno dell’onClick() si potrebbe settare l’attributo href del tag <a> utilizzando il seguente metodo tipico dell’oggetto chart: **$(this).prop("href", myChart.toBase64Image())** dove myChart è il nome assegnato all’oggetto Chart. 
