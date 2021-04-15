5. > **LEZIONE 5**
     5. > *Consegna GeoLocation - Ese 5 Percorso*
   
## Obiettivo:
L'utente deve inserire il luogo di partenza e di arrivo in 2 textbox. In seguito visualizzerà il percorso migliore sulla mappa.

## Al click del pulsante visualizza percorso:
Tramite una new **google.maps.DirectionsService()** è possibile ottenere l'elenco dei percorsi migliori per il tragitto selezionato dall'utente. Tramite il **DirectionsRenderer()** viene visualizzata la google map ed il percorso migliore (modalità di viaggio impostata come **driving**). Vengono anche visualizzati i km totali e il tempo di percorrenza.