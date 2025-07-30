


$(document).ready(function () {
    const observer = new IntersectionObserver(
(entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Optional: remove after showing once
    }
    });
},
{
    threshold: 0.35, // Trigger when 10% of the section is visible
}
);

document.querySelectorAll('.fade-in-section').forEach(section => {
observer.observe(section);
});

const messages = {
"Unterhaltsreinigung": "<div>Unsere Unterhaltsreinigung sorgt für kontinuierliche Sauberkeit in Ihren Räumlichkeiten. Wir reinigen zuverlässig und gründlich - genau abgestimmt auf Ihre Wünsche und den Bedarf Ihres Objekts.</div>",
"Aufwendigereinigung": "<div>In besonderen Fällen wie Wasserschäden, Feuerschäden oder nach Bauarbeiten bieten wir intensive Reinigungen. Wir kommen schnell, arbeiten effizient und bringen Ihre Räume wieder in Bestform - natürlich mit passender Ausrüstung.</div>",
"Büroreinigung": "<div>Ob Schreibtische, Regale, Böden oder Gemeinschaftsbereiche - wir reinigen Ihr Büro professionell, diskret und sorgfältig. Für ein sauberes und motivierendes.</div>",
"Sanitärreinigung": "<div>Wir reinigen Ihre sanitären Einrichtungen gründlich und hygienisch - von Waschbecken über WCs bis zu Urinalen. Auf Wunsch füllen wir auch Verbrauchsmaterialien wie Seife und Papier nach.</div>",
"Müllentsorgung": "<div>Wir übernehmen die fachgerechte Entsorgung von Abfällen - sowohl bei vorhandener Mülltrennung vor Ort als auch mit Abtransport durch uns. Alles sauber geregelt.</div>",
"Fensterreinigung": "<div>Klare Sicht garantiert! Wir reinigen Fensterflächen innen und außen - mit professionellen Maschinen und Reinigungsmitteln, für streifenfreie Ergebnisse auch in schwer erreichbaren Bereichen.</div>",
"Teppichreinigung": "<div>Wir reinigen Ihre Teppiche tiefenwirksam und schonend – mit leistungsstarken Spezialmaschinen, die selbst hartnäckigen Schmutz und Gerüche beseitigen. Für frische und gepflegte Böden.</div>",
"Polierreinigung": "<div>Ihre Polstermöbel reinigen wir gründlich und materialschonend - mit professionellen Geräten, die Schmutz, Staub und Flecken tief aus dem Gewebe holen. Ideal für Haushalte und gewerbliche Objekte.</div>",
"Bügelservice": "<div>Sie haben keine Zeit zum Bügeln? Wir übernehmen das für Sie - schnell, sauber und faltenfrei. Unser Bügelservice ist flexibel buchbar, ideal für private und gewerbliche Kunden.</div>",
"Fahrzeugreinigung": "<div>Ob Firmen-PKW, Transporter oder Kühlhaus-Fahrzeug - wir reinigen Ihre Fahrzeuge gründlich, hygienisch und professionell, innen wie außen.Gerade bei Kühl- und Lieferfahrzeugen legen wir besonderen Wert auf Hygiene und Rückstandsfreiheit, damit Ihre Waren sicher transportiert werden. Die Reinigung erfolgt nach Absprache und individuellen Anforderungen - schnell, flexibel und zuverlässig.</div>",
"Einmalige_Reinigung": "<div>Sie benötigen eine gründliche Reinigung auf einmaliger Basis - z. B. vor einer Wohnungsübergabe, nach einer Veranstaltung oder einfach zwischendurch? Kein Problem! Wir bieten einmalige Reinigungen nach Absprache, die sich ganz individuell an Ihre Wünsche anpassen lassen. Die durchgeführten Leistungen entsprechen inhaltlich unserer Unterhaltsreinigung - enreinigungDabei entscheiden Sie, was genau gereinigt werden soll - ob nur bestimmte Räume oder das gesamte Objekt. Wir passen den Umfang und die Zeiten flexibel an Ihre Bedürfnisse an.</div>",
"Algemeinereinigung": `
<div class=" border-bottom border-black">
<h3 class="redText">Unterhaltsreinigung</h3>
<p>Unsere Unterhaltsreinigung sorgt für kontinuierliche Sauberkeit in Ihren Räumlichkeiten. Wir reinigen zuverlässig und gründlich - genau abgestimmt auf Ihre Wünsche und den Bedarf Ihres Objekts.</p>
</div>
<div class=" border-bottom border-black mt-2">
<h3 class="redText">Allgemeine Reinigungsarbeiten</h3>
<p>Staubwischen von Oberflächen (Tische, Fensterbänke, Regale etc.)</p>
<p>Abfalleimer leeren und ggf. neue Müllbeutel einsetzen</p>
<p>Saugen oder Kehren von Böden</p>
<p>Feucht- oder Nasswischen von Hartböden</p>
<p>Reinigung von Spiegeln und Glasflächen (z. B. Glastüren)</p>
</div>
<div class=" border-bottom border-black mt-2">
<h3 class="redText">Küchen- und Pausenräume</h3>
<p>Reinigung von Oberflächen</p>
<p>Reinigung von Spüle und Armaturen</p>
<p>Leeren von Kaffeemaschinen/Geschirrspülern (falls vereinbart)</p>
</div>
<div class=" border-bottom border-black mt-2">
<h3 class="redText">Sanitärreinigung</h3>
<p>Reinigung von Waschbecken, WCs, Urinalen</p>
<p>Reinigung von Armaturen und Spiegeln</p>
<p>Auffüllen von Seife, Papier handtüchern, Toilettenpapier (wenn vereinbart)</p>
<p>Oberfläche Desinfektion</p>
</div>
<div class=" border-bottom border-black mt-2">
<h3 class="redText">Treppenhaus/Eingangsbereich (bei Wohnanlagen)</h3>
<p>Kehren und Wischen der Treppen und Podeste</p>
<p>Reinigung von Handläufen und Geländern</p>
<p>Sauberhalten des Eingangsbereichs und Fußmatten </p>
<p>Fensterreinigung (falls vereinbart, z. B. monatlich)</p>
</div>


`
};
$('.textBox').on('click', function (e) {
    $('.message-box-wrapper').remove();
    $('.message-box-wrapper').remove();
    

    const id = $(this).attr('id');
    const text = messages[id] || "Keine Beschreibung vorhanden.";

    const $boxWrapper = $('<div class="message-box-wrapper"></div>');
    const $messageBox = $(`
    <div class="message-box border border-black rounded p-4 textblack backWhite animatedText">
        <button type="button" class="btn-close" aria-label="Close"></button>
        ${text}
    </div>
    `);
    $boxWrapper.append($messageBox);

    if ($(this).is('i')) {
    const $span = $(this).closest('h2').find('span');
    $span.after($boxWrapper);
    } else {
    $(this).after($boxWrapper);
    }

    $messageBox.find('.btn-close').on('click', function () {
    $boxWrapper.remove();
    });
    

});
});
