##PHP
Integrare PHP nelle pagine
Una pagina PHP solitamente ha estensione .php. Tutto ciò che sta in una pagina PHP è sempre mostrato in output, soltanto ciò che sta fra i tag di apertura <?php e ?> è prima interpretato dal motore PHP. Ciò è molto pratico per creare una completa pagina HTML e lanciare comandi PHP solo dove necessario. Esempio:

<!DOCTYPE html>
<html>
<head>
	<title>Test</title>
</head>
<body>
	<?php echo "Hello, World!"; ?>
</body>
</html>
Ogni comando PHP termina con punto e virgola ;. Se il comando è l'ultimo, il punto e virgola può essere omesso (nell'esempio sopra può essere omesso). Anche il tag di chiusura ?> può essere omesso, se si trova alla fine del file. Di fatto, tale omissione è spesso preferibile, per evitare che siano accidentalmente presenti ulteriori caratteri indesiderati (come uno spazio).

Commenti
Per rendere più leggibile il codice si usano i commenti. I commenti non vengono elaborati dall'interprete PHP. Vi sono 3 diversi stili di commenti:

<?php
// Commento tipo C

/*
 * Commento multi-linea in stile C++
 * Il secondo e terzo asterisco sono solo a fine estetico.
 */

# Commento in stile Perl a riga singola (collocato a inizio riga)
Stampare a video
Anteposto il concetto che ogni porzione di testo fuori dai tag <?php ?> viene mostrata a video, al contrario ogni porzione di codice all'interno dei tag <?php ?> non viene mostrata a video ma bensì interpretata. Vi sono per cui determinate istruzioni per mostrare a video un valore da PHP. Un esempio è l'istruzione echo:

<?php echo 1+2+3; ?>
Output: 6.