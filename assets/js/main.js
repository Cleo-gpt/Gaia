/* ==========================================================
   Gaïa – interactions du site
   ========================================================== */

// ---------- Stockage local (peut être bloqué : on ignore les erreurs) ----------
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) {} },
};
const session = {
  get(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { sessionStorage.setItem(key, value); } catch (e) {} },
};

// ---------- Traductions ----------
// Le français est déjà dans le HTML ; on le lit au chargement pour pouvoir y revenir.
const translations = {
  en: {
    "hero.title": "New: Gaïa Peach",
    "hero.script": "Discover natural energy",
    "hero.lead": "A 100% handmade peach-flavoured drink, natural and vegan.",
    "hero.cta": "See the ingredients",

    "ing.title": "The ingredients",
    "ing.perBottle": "Quantities for one 330 ml bottle",
    "ing.more": "Read more",
    "ing.less": "Read less",
    "ing.water.name": "Sparkling water (226 ml)",
    "ing.water.text": "It is the base of Gaïa: 226 ml out of the bottle's 330 ml. Its fine bubbles make the drink fizzy and refreshing, and lighten the sweetness of the peach and sugar. Gaïa is best enjoyed well chilled, to keep all its fizz.",
    "ing.still.name": "Still water (40 ml)",
    "ing.still.text": "40 ml of still water complete the sparkling water to fill the bottle. It lengthens the drink without adding bubbles, so Gaïa stays smooth and light in the mouth.",
    "ing.juice.name": "Peach juice (50 ml)",
    "ing.juice.text": "It is the fruit in the recipe: 50 ml of peach juice per bottle. It gives Gaïa body and a real fruity note, which the peach flavouring then strengthens. It also brings part of its natural sweetness.",
    "ing.color.name": "Yellow colouring (1.5 ml)",
    "ing.color.text": "A few drops are enough: 1.5 ml per bottle. It gives Gaïa its yellow-orange colour, like a ripe peach, and keeps the same shade from one bottle to the next.",
    "ing.sugar.name": "Sugar (12 g)",
    "ing.sugar.text": "12 g of sugar per bottle. It softens the acidity of the two citrus juices and brings out the peach taste. Together with the natural sugar from the peach juice, Gaïa contains 5.1 g of sugars per 100 ml, with no sweeteners at all.",
    "ing.lemon.name": "Lemon juice (10 ml)",
    "ing.lemon.text": "A blend of 5 ml of lemon juice and 5 ml of lime juice. The lemon brings a clean acidity, the lime a fresher, more fragrant note. Together they balance the sweetness of the sugar and bring out the peach taste.",
    "ing.guarana.name": "Guarana (2 g)",
    "ing.guarana.text": "This guarana powder is certified ORGANIC by Ecocert (FR-BIO-01). It comes from Brazil and has a high natural caffeine content of 3.5%. Guarana powder is known for its many everyday benefits.",
    "ing.aroma.name": "Peach flavour (1.5 ml)",
    "ing.aroma.text": "White peach has a delicate, sweet and floral flavour, more subtle than yellow peach, which is richer, sweeter and slightly tangy. White peach brings a lighter freshness. Comes from France.",
    "ing.aroma.composition": "Flavouring ingredients: propylene glycol, invert sugar, water, flavouring preparations, natural flavouring substances, preservative: potassium sorbate.",
    "ing.facts.title": "On the label",
    "ing.facts.caffeine": "70 mg of caffeine (guarana)",
    "ing.facts.allergy": "No major allergens added",
    "ing.facts.vegan": "Vegan",
    "ing.facts.traces": "May contain traces of peanuts, tree nuts, mustard and sesame (guarana packing facility).",
    "ing.facts.warning": "Not recommended for children or for pregnant or breastfeeding women.",
    "ing.facts.serve": "Shake before opening. Keep and serve chilled.",
    "ing.facts.nutrition": "Nutrition facts",
    "ing.facts.per": "per 100 ml",
    "ing.facts.energy": "Energy",
    "ing.facts.carbs": "Carbohydrates",
    "ing.facts.sugars": "Of which sugars",
    "ing.facts.protein": "Protein",
    "ing.facts.fat": "Fat",
    "ing.facts.salt": "Salt",
    "ing.allHint": "Tap here to see them all",
    "ing.all": "All categories",
    "ing.allClose": "Hide all",

    "process.title": "The process",
    "process.intro": "From the idea to the stand: here is how we created Gaïa, step by step.",
    "process.s4.name": "The launch",
    "process.s4.text": "We launched our social media to make Gaïa known, tested several flavours to find the right recipe, and built this website to present the drink and the team.",
    "process.s5.name": "The open days",
    "process.s5.text": "Gaïa is presented and sold at our stand during the CPNV open days in Sainte-Croix, on Friday 27 and Saturday 28 November 2026.",
    "process.s1.name": "The product",
    "process.s1.text": "First of all, we had to find our product: work out what we wanted to create and sell, until we chose a natural peach-flavoured energy drink.",
    "process.s2.name": "The visual identity",
    "process.s2.text": "Our visual identity changed a lot along the way: sometimes the brand name, sometimes the colours, sometimes the logo. It took several versions to arrive at Gaïa as it is today.",
    "process.s3.name": "The organisation",
    "process.s3.text": "We divided the tasks among the team members, then found our suppliers for the ingredients, the bottles and the equipment.",

    "faq.q1": "What does Gaïa taste like?",
    "faq.a1": "A fruity peach flavour, slightly tangy thanks to the lemon juice, with the fine bubbles of sparkling water.",
    "faq.q2": "Where does Gaïa's energy come from?",
    "faq.a2": "From guarana, an Amazonian plant whose seeds naturally contain caffeine.",
    "faq.q3": "Does Gaïa contain sugar?",
    "faq.a3": "Yes: 12 g of sugar per bottle, plus the natural sugar from the peach juice, with no artificial sweeteners.",
    "faq.q4": "Is Gaïa vegan?",
    "faq.a4": "Yes. It contains no ingredients of animal origin.",
    "faq.q7": "How long does Gaïa keep?",
    "faq.a7": "Gaïa is handmade and keeps for less than a day. Keep it chilled and drink it the same day.",
    "faq.q6": "Can everyone drink it?",
    "faq.a6": "Gaïa contains caffeine. It is not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine.",
    "faq.q8": "How much caffeine does Gaïa contain?",
    "faq.a8": "70 mg of caffeine per 330 ml bottle, from 2 g of guarana powder. It is the drink's only source of caffeine.",
    "faq.q9": "How many calories does Gaïa contain?",
    "faq.a9": "23 kcal per 100 ml, with 5.6 g of carbohydrates, of which 5.1 g are sugars. It contains no fat and no salt.",
    "faq.q10": "Does Gaïa contain allergens?",
    "faq.a10": "None of the major allergens are in the recipe. However, the guarana powder is packed in a facility that also handles peanuts, tree nuts, mustard and sesame, so Gaïa may contain traces of them. The sheets for our ingredients are in the legal notice.",
    "faq.q11": "Is the guarana organic?",
    "faq.a11": "Yes. Our guarana powder comes from Brazil and is certified organic by Ecocert (FR-BIO-01).",
    "faq.notFound": "Didn't find the answer to your question?",
    "faq.contact": "Contact us",

    "insta.title": "Follow us on Instagram",
    "insta.text": "Behind the scenes of the project, our tests and Gaïa news.",
    "insta.cta": "See the account",

    "team.title": "Our team",
    "team.intro": "We are five apprentices at CPNV in Sainte-Croix. Gaïa is our project: from the recipe to the label, we make everything ourselves.",
    "team.loric.role": "Team lead",
    "team.loric.text": "My name is Loric Salzmann and I am in the third year of my apprenticeship as a mediamatician at CPNV in Sainte-Croix. During my training, I have built versatile skills in web development, graphic design, multimedia project management and IT support, which let me create digital solutions from concept to delivery. Rigorous, curious and independent, I enjoy learning new tools and taking on concrete challenges. Today I put these skills to work for this project, with the same attention to detail and quality.",
    "team.leo.role": "Designer",
    "team.leo.text": "My name is Léo and I am in the third year of my apprenticeship as a mediamatician at CPNV in Sainte-Croix. Alongside my training, I work as a freelance graphic designer under the name Léo Tâche Design: I work with clients and, among other things, designed the logo for the open days of CPNV's mediamatics section. On Gaïa, I am responsible for the entire visual identity, from the logo and brand guidelines to the label, the posters and the stand. What drives me is bringing an idea to life until it looks professional.",
    "team.allan.role": "Marketing",
    "team.allan.text": "My name is Allan Sonzaï Heberling and I am in the third year of my apprenticeship as a mediamatician at CPNV in Sainte-Croix. I am especially interested in marketing, graphic design and web development. Curious and enterprising, I enjoy turning ideas into concrete projects and finding creative solutions. On the Gaïa project, I am the marketing director: I take part in the strategic thinking and in showcasing the project. What I particularly enjoy is combining creativity, strategy and communication to give a project a strong identity.",
    "team.killian.role": "Project management",
    "team.killian.text": "Hello, my name is Killian Schwab and I am a mediamatics student at CPNV. I am especially interested in project management and design. I love learning new things, developing my skills and bringing creative projects to life.",
    "team.cleo.role": "Web & social media",
    "team.cleo.text": "I'm Cléo Forclaz, a third-year mediamatics student at CPNV in Sainte-Croix. Outside of my studies, I'm an illustrator, photographer and video editor. I'm persevering, creative and quick-witted. On the Gaïa project, I'm the webmaster and in charge of social media.",

    "nav.ingredients": "The ingredients",
    "nav.project": "The process and the team",

    "footer.chapters": "Site sections",
    "footer.drink": "The drink",
    "footer.legal": "Legal notice",
    "ing.legalHint": "For any further information, see the",
    "ing.legalLink": "legal notice",
    "legal.title": "Legal notice",
    "legal.intro": "The official documents about the drink and the technical sheet of each of its ingredients.",
    "legal.ingredients": "Ingredient sheets",
    "legal.sheet": "Technical sheet",
    "legal.allergens": "Allergens",
    "legal.organic": "Organic certificate",
    "legal.soon": "Sheet coming soon",
    "legal.law": "Swiss law on the drink",
    "legal.osav": "FSVO explanations of the Ordinance on Beverages (in French)",
    "legal.editor": "Site publisher",
    "legal.editorText": "Gaïa is a project by apprentices at CPNV in Sainte-Croix, created as part of the Fresh project.",
    "legal.contact": "Contact:",
    "footer.terms": "Terms of use",
    "footer.privacy": "Privacy policy",
    "footer.rights": "All rights reserved",

    "popup.title": "Join us",
    "popup.script": "on Insta!",
    "popup.text": "Follow @gaia_ned so you don't miss any Gaïa news, behind-the-scenes content or our upcoming contests.",
    "popup.cta": "Follow @gaia_ned",
  },

  de: {
    "hero.title": "Neu: Gaïa Pfirsich",
    "hero.script": "Entdecke natürliche Energie",
    "hero.lead": "Ein 100 % handgemachtes Getränk mit Pfirsichgeschmack, natürlich und vegan.",
    "hero.cta": "Zu den Zutaten",

    "ing.title": "Die Zutaten",
    "ing.perBottle": "Mengen für eine Flasche mit 330 ml",
    "ing.more": "Mehr lesen",
    "ing.less": "Weniger lesen",
    "ing.water.name": "Kohlensäure­haltiges Wasser (226 ml)",
    "ing.water.text": "Es ist die Grundlage von Gaïa: 226 ml der 330 ml in der Flasche. Seine feinen Bläschen machen das Getränk prickelnd und erfrischend und machen die Süsse von Pfirsich und Zucker leichter. Gaïa schmeckt am besten gut gekühlt, damit sie schön prickelnd bleibt.",
    "ing.still.name": "Stilles Wasser (40 ml)",
    "ing.still.text": "40 ml stilles Wasser ergänzen das kohlensäurehaltige Wasser, um die Flasche zu füllen. Es verlängert das Getränk, ohne Bläschen hinzuzufügen, damit Gaïa sanft und leicht bleibt.",
    "ing.juice.name": "Pfirsich­saft (50 ml)",
    "ing.juice.text": "Er ist die Frucht im Rezept: 50 ml Pfirsichsaft pro Flasche. Er gibt Gaïa Fülle und eine echte Fruchtnote, die das Pfirsicharoma noch verstärkt. Ausserdem bringt er einen Teil seiner natürlichen Süsse.",
    "ing.color.name": "Gelber Lebensmittel­farbstoff (1,5 ml)",
    "ing.color.text": "Ein paar Tropfen genügen: 1,5 ml pro Flasche. Er gibt Gaïa ihre gelb-orange Farbe wie ein reifer Pfirsich und sorgt für denselben Farbton in jeder Flasche.",
    "ing.sugar.name": "Zucker (12 g)",
    "ing.sugar.text": "12 g Zucker pro Flasche. Er mildert die Säure der beiden Zitrusfrüchte und hebt den Pfirsichgeschmack hervor. Zusammen mit dem natürlichen Zucker aus dem Pfirsichsaft enthält Gaïa 5,1 g Zucker pro 100 ml, ganz ohne Süssstoffe.",
    "ing.lemon.name": "Zitronen­saft (10 ml)",
    "ing.lemon.text": "Eine Mischung aus 5 ml Zitronensaft und 5 ml Limettensaft. Die Zitrone bringt eine klare Säure, die Limette eine frischere, duftende Note. Zusammen gleichen sie die Süsse des Zuckers aus und heben den Pfirsichgeschmack hervor.",
    "ing.guarana.name": "Guarana (2 g)",
    "ing.guarana.text": "Dieses Guaranapulver ist von Ecocert BIO-zertifiziert (FR-BIO-01). Es stammt aus Brasilien und hat einen hohen natürlichen Koffeingehalt von 3,5 %. Guaranapulver ist für seine vielen Vorteile im Alltag bekannt.",
    "ing.aroma.name": "Pfirsich­aroma (1,5 ml)",
    "ing.aroma.text": "Der weisse Pfirsich hat einen zarten, süssen und blumigen Geschmack, feiner als der gelbe Pfirsich, der voller, süsser und leicht säuerlich ist. Der weisse Pfirsich wirkt leichter und frischer. Herkunft: Frankreich.",
    "ing.aroma.composition": "Zutaten des Aromas: Propylenglykol, Invertzucker, Wasser, Aromaextrakte, natürliche Aromastoffe, Konservierungsmittel: Kaliumsorbat.",
    "ing.facts.title": "Auf dem Etikett",
    "ing.facts.caffeine": "70 mg Koffein (Guarana)",
    "ing.facts.allergy": "Keine Hauptallergene zugesetzt",
    "ing.facts.vegan": "Vegan",
    "ing.facts.traces": "Kann Spuren von Erdnüssen, Schalenfrüchten, Senf und Sesam enthalten (Abfüllbetrieb des Guaranas).",
    "ing.facts.warning": "Nicht empfohlen für Kinder sowie schwangere oder stillende Frauen.",
    "ing.facts.serve": "Vor dem Öffnen schütteln. Kühl lagern und kühl servieren.",
    "ing.facts.nutrition": "Nährwerte",
    "ing.facts.per": "pro 100 ml",
    "ing.facts.energy": "Energie",
    "ing.facts.carbs": "Kohlenhydrate",
    "ing.facts.sugars": "Davon Zucker",
    "ing.facts.protein": "Eiweiss",
    "ing.facts.fat": "Fett",
    "ing.facts.salt": "Salz",
    "ing.allHint": "Hier tippen, um alle zu sehen",
    "ing.all": "Alle Kategorien",
    "ing.allClose": "Alle schliessen",

    "process.title": "Der Prozess",
    "process.intro": "Von der Idee bis zum Stand: So haben wir Gaïa Schritt für Schritt entwickelt.",
    "process.s4.name": "Der Start",
    "process.s4.text": "Wir haben unsere sozialen Medien gestartet, um Gaïa bekannt zu machen, mehrere Geschmacksrichtungen getestet, um das richtige Rezept zu finden, und diese Website gebaut, um das Getränk und das Team vorzustellen.",
    "process.s5.name": "Die Tage der offenen Tür",
    "process.s5.text": "Gaïa wird an unserem Stand an den Tagen der offenen Tür des CPNV in Sainte-Croix vorgestellt und verkauft, am Freitag, 27., und Samstag, 28. November 2026.",
    "process.s1.name": "Das Produkt",
    "process.s1.text": "Zuerst mussten wir unser Produkt finden: herausfinden, was wir herstellen und verkaufen wollten, bis wir uns für einen natürlichen Energydrink mit Pfirsichgeschmack entschieden haben.",
    "process.s2.name": "Das Erscheinungsbild",
    "process.s2.text": "Unser Erscheinungsbild hat sich unterwegs stark verändert: mal der Markenname, mal die Farben, mal das Logo. Es brauchte mehrere Versionen, bis Gaïa so aussah wie heute.",
    "process.s3.name": "Die Organisation",
    "process.s3.text": "Wir haben die Aufgaben im Team verteilt und dann unsere Lieferanten für die Zutaten, die Flaschen und das Material gefunden.",

    "faq.q1": "Wie schmeckt Gaïa?",
    "faq.a1": "Fruchtig nach Pfirsich, dank Zitronensaft leicht säuerlich, mit den feinen Bläschen des Sprudelwassers.",
    "faq.q2": "Woher kommt die Energie von Gaïa?",
    "faq.a2": "Aus Guarana, einer Pflanze aus dem Amazonas, deren Samen von Natur aus Koffein enthalten.",
    "faq.q3": "Enthält Gaïa Zucker?",
    "faq.a3": "Ja: 12 g Zucker pro Flasche, dazu der natürliche Zucker aus dem Pfirsichsaft, ohne künstliche Süssstoffe.",
    "faq.q4": "Ist Gaïa vegan?",
    "faq.a4": "Ja. Es enthält keine Zutaten tierischen Ursprungs.",
    "faq.q7": "Wie lange ist Gaïa haltbar?",
    "faq.a7": "Gaïa wird von Hand hergestellt und ist weniger als einen Tag haltbar. Kühl lagern und noch am selben Tag trinken.",
    "faq.q6": "Darf jeder Gaïa trinken?",
    "faq.a6": "Gaïa enthält Koffein. Für Kinder, schwangere oder stillende Frauen und koffeinempfindliche Personen wird es nicht empfohlen.",
    "faq.q8": "Wie viel Koffein enthält Gaïa?",
    "faq.a8": "70 mg Koffein pro 330-ml-Flasche, aus 2 g Guaranapulver. Es ist die einzige Koffeinquelle des Getränks.",
    "faq.q9": "Wie viele Kalorien hat Gaïa?",
    "faq.a9": "23 kcal pro 100 ml, mit 5,6 g Kohlenhydraten, davon 5,1 g Zucker. Sie enthält weder Fett noch Salz.",
    "faq.q10": "Enthält Gaïa Allergene?",
    "faq.a10": "Keines der Hauptallergene ist im Rezept enthalten. Das Guaranapulver wird jedoch in einem Betrieb abgefüllt, der auch Erdnüsse, Schalenfrüchte, Senf und Sesam verarbeitet. Gaïa kann daher Spuren davon enthalten. Die Datenblätter unserer Zutaten finden Sie im Impressum.",
    "faq.q11": "Ist das Guarana bio?",
    "faq.a11": "Ja. Unser Guaranapulver stammt aus Brasilien und ist von Ecocert bio-zertifiziert (FR-BIO-01).",
    "faq.notFound": "Keine Antwort auf deine Frage gefunden?",
    "faq.contact": "Kontaktiere uns",

    "insta.title": "Folge uns auf Instagram",
    "insta.text": "Hinter den Kulissen des Projekts, unsere Tests und Neuigkeiten von Gaïa.",
    "insta.cta": "Zum Account",

    "team.title": "Unser Team",
    "team.intro": "Wir sind fünf Lernende des CPNV in Sainte-Croix. Gaïa ist unser Projekt: vom Rezept bis zum Etikett machen wir alles selbst.",
    "team.loric.role": "Gruppenleitung",
    "team.loric.text": "Ich heisse Loric Salzmann und bin im 3. Lehrjahr als Mediamatiker am CPNV in Sainte-Croix. Während meiner Ausbildung habe ich vielseitige Kompetenzen in Webentwicklung, Grafik, Multimedia-Projektmanagement und IT-Support aufgebaut, mit denen ich digitale Lösungen von der Idee bis zur Umsetzung realisieren kann. Ich bin sorgfältig, neugierig und selbstständig und lerne gerne neue Tools kennen und stelle mich konkreten Herausforderungen. Heute setze ich diese Kompetenzen für dieses Projekt ein, mit demselben Sinn für Details und Qualität.",
    "team.leo.role": "Design",
    "team.leo.text": "Ich heisse Léo und bin im 3. Lehrjahr als Mediamatiker am CPNV in Sainte-Croix. Neben meiner Ausbildung arbeite ich als freiberuflicher Grafiker unter dem Namen Léo Tâche Design: Ich arbeite mit Kunden und habe unter anderem das Logo für die Tage der offenen Tür der Mediamatik-Abteilung des CPNV gestaltet. Bei Gaïa bin ich für das gesamte Erscheinungsbild verantwortlich, vom Logo und Corporate Design bis zum Etikett, zu den Plakaten und zum Stand. Was mich antreibt, ist, eine Idee zum Leben zu erwecken, bis ein professionelles Ergebnis entsteht.",
    "team.allan.role": "Marketing",
    "team.allan.text": "Ich heisse Allan Sonzaï Heberling und bin im 3. Lehrjahr als Mediamatiker am CPNV in Sainte-Croix. Ich interessiere mich besonders für Marketing, Grafikdesign und Webentwicklung. Neugierig und unternehmungslustig verwandle ich gerne Ideen in konkrete Projekte und finde kreative Lösungen. Im Projekt Gaïa bin ich Marketingleiter: Ich wirke bei der strategischen Planung mit und setze das Projekt in Szene. Besonders schätze ich, dass ich Kreativität, Strategie und Kommunikation verbinden kann, um einem Projekt eine starke Identität zu geben.",
    "team.killian.role": "Projektmanagement",
    "team.killian.text": "Hallo, ich heisse Killian Schwab und bin Mediamatik-Lernender am CPNV. Ich interessiere mich besonders für Projektmanagement und Design. Ich lerne gerne Neues, entwickle meine Fähigkeiten weiter und erwecke kreative Projekte zum Leben.",
    "team.cleo.role": "Web & Social Media",
    "team.cleo.text": "Ich bin Cléo Forclaz und im dritten Jahr der Mediamatik-Ausbildung am CPNV in Sainte-Croix. Neben meiner Ausbildung bin ich Illustratorin, Fotografin und Videoeditorin. Ich bin ausdauernd, kreativ und schlagfertig. Im Projekt Gaïa bin ich Webmasterin und für die sozialen Medien verantwortlich.",

    "nav.ingredients": "Die Zutaten",
    "nav.project": "Der Prozess und das Team",

    "footer.chapters": "Bereiche der Website",
    "footer.drink": "Das Getränk",
    "footer.legal": "Impressum",
    "ing.legalHint": "Weitere Informationen finden Sie im",
    "ing.legalLink": "Impressum",
    "legal.title": "Impressum",
    "legal.intro": "Die offiziellen Dokumente zum Getränk und das technische Datenblatt jeder Zutat.",
    "legal.ingredients": "Datenblätter der Zutaten",
    "legal.sheet": "Technisches Datenblatt",
    "legal.allergens": "Allergene",
    "legal.organic": "Bio-Zertifikat",
    "legal.soon": "Datenblatt folgt",
    "legal.law": "Schweizer Gesetz zum Getränk",
    "legal.osav": "Erläuterungen des BLV zur Getränkeverordnung (auf Französisch)",
    "legal.editor": "Herausgeber der Website",
    "legal.editorText": "Gaïa ist ein Projekt von Lernenden des CPNV in Sainte-Croix im Rahmen des Projekts Fresh.",
    "legal.contact": "Kontakt:",
    "footer.terms": "AGB",
    "footer.privacy": "Datenschutz",
    "footer.rights": "Alle Rechte vorbehalten",

    "popup.title": "Folge uns",
    "popup.script": "auf Insta!",
    "popup.text": "Folge @gaia_ned und verpasse keine Neuigkeiten von Gaïa, keine Blicke hinter die Kulissen und keine unserer nächsten Wettbewerbe.",
    "popup.cta": "@gaia_ned folgen",
  },
};

// Textes français récupérés depuis le HTML
translations.fr = {};
document.querySelectorAll("[data-i18n]").forEach((el) => {
  translations.fr[el.dataset.i18n] = el.textContent;
});
translations.fr["ing.allClose"] = "Tout refermer";

let currentLang = "fr";

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations.fr[key] || key;
}

function setLang(lang) {
  if (!translations[lang]) lang = "fr";
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    // Espace insécable avant ! ? : ; pour que la ponctuation ne passe jamais seule à la ligne
    el.textContent = t(el.dataset.i18n).replace(/ ([!?:;])/g, "\u00a0$1");
  });
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  updateAllButton();
  store.set("gaia-lang", lang);
}

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

// ---------- En-tête au défilement ----------
// La bande et le petit logo apparaissent une fois la première section de la page quittée.
// L'observateur est plus fiable dans Safari que l'événement « scroll » seul.
const topbar = document.getElementById("topbar");
const hero = document.querySelector(".hero, .page-head");
function updateScrolled() {
  topbar.classList.toggle("scrolled", !hero || hero.getBoundingClientRect().bottom <= topbar.offsetHeight);
}
if (hero && "IntersectionObserver" in window) {
  new IntersectionObserver(updateScrolled, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }).observe(hero);
}
window.addEventListener("scroll", updateScrolled, { passive: true });
window.addEventListener("resize", updateScrolled);
updateScrolled();

// La barre se cache quand on descend et revient dès qu'on remonte un tout petit peu.
// Les petits écarts sont cumulés dans le même sens pour ignorer les tremblements.
const TOPBAR_DOWN = 10;
const TOPBAR_UP = 12;
let lastScrollY = Math.max(window.scrollY, 0);
let scrollRun = 0;
window.addEventListener("scroll", () => {
  const y = Math.max(window.scrollY, 0); // rebond de Safari en haut de page
  const delta = y - lastScrollY;
  lastScrollY = y;
  if (delta === 0) return;
  scrollRun = Math.sign(delta) === Math.sign(scrollRun) ? scrollRun + delta : delta;
  if (y <= topbar.offsetHeight) topbar.classList.remove("is-hidden");
  else if (scrollRun >= TOPBAR_DOWN) topbar.classList.add("is-hidden");
  else if (scrollRun <= -TOPBAR_UP) topbar.classList.remove("is-hidden");
}, { passive: true });
// Au clavier, la barre revient quand un de ses boutons reçoit le focus
topbar.addEventListener("focusin", () => topbar.classList.remove("is-hidden"));

// ---------- Fenêtres plein écran (menu, pop-up) ----------
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
const popup = document.getElementById("instaPopup");
let lastFocus = null;

function openOverlay(el) {
  lastFocus = document.activeElement;
  el.classList.remove("is-closing");
  el.hidden = false;
  document.body.style.overflow = "hidden";
  if (el === menu) burger.setAttribute("aria-expanded", "true");
  const close = el.querySelector("[data-close]");
  if (close) close.focus();
}

function closeOverlay(el) {
  if (el.hidden || el.classList.contains("is-closing")) return;
  // Le menu repart sur le côté avant d'être caché
  if (el === menu && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.classList.add("is-closing");
    el.addEventListener("animationend", function done(e) {
      if (e.target !== el) return; // animation d'un lien, pas du menu
      el.removeEventListener("animationend", done);
      if (!el.classList.contains("is-closing")) return; // rouvert entre-temps
      el.classList.remove("is-closing");
      el.hidden = true;
    });
  } else {
    el.hidden = true;
  }
  document.body.style.overflow = "";
  if (el === menu) burger.setAttribute("aria-expanded", "false");
  if (lastFocus) lastFocus.focus();
}

burger.addEventListener("click", () => openOverlay(menu));

document.querySelectorAll(".overlay").forEach((overlay) => {
  overlay.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeOverlay(overlay));
  });
});

// Un lien du menu ferme le menu puis fait défiler vers la section
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeOverlay(menu));
});

// Un clic sur le fond assombri autour du pop-up le ferme
if (popup) popup.addEventListener("click", (e) => { if (e.target === popup) closeOverlay(popup); });

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".overlay:not([hidden])").forEach(closeOverlay);
});

// Pop-up Instagram : une fois par visite, après quelques secondes
if (popup && !session.get("gaia-popup-seen")) {
  setTimeout(() => {
    if (!menu.hidden) return;
    openOverlay(popup);
    session.set("gaia-popup-seen", "1");
  }, 12000);
}

// ---------- Cartes ingrédients ----------
// « Lire plus » n'ouvre plus la carte elle-même : le texte s'affiche en grand
// dans un panneau sous la rangée de cartes. Les éléments sont clonés avec leur
// data-i18n, donc setLang les traduit aussi.
const cards = [...document.querySelectorAll(".ing-card")];
const allButton = document.getElementById("ingAll");
const ingPanel = document.getElementById("ingPanel");
const ingContent = ingPanel ? ingPanel.querySelector(".ing-panel-content") : null;

function ingEntry(card) {
  const entry = document.createElement("div");
  entry.className = "ing-entry";
  entry.append(
    card.querySelector(".ing-icon").cloneNode(true),
    Object.assign(document.createElement("div"), { className: "ing-entry-text" })
  );
  entry.lastChild.append(card.querySelector("h3").cloneNode(true), ...[...card.querySelectorAll(".ing-body p")].map((p) => p.cloneNode(true)));
  return entry;
}

function showIngredients(selected) {
  cards.forEach((c) => {
    const open = selected.length === 1 && selected[0] === c;
    c.classList.toggle("open", open);
    c.querySelector(".ing-toggle").setAttribute("aria-expanded", String(open));
  });
  if (!selected.length) {
    ingPanel.hidden = true;
  } else {
    ingContent.replaceChildren(...selected.map(ingEntry));
    ingPanel.classList.toggle("all", selected.length > 1);
    ingPanel.hidden = false;
    // relance l'animation d'apparition à chaque changement
    ingPanel.classList.remove("swap");
    void ingPanel.offsetWidth;
    ingPanel.classList.add("swap");
    ingPanel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }
  updateAllButton();
}

function updateAllButton() {
  if (!allButton) return;
  const allOpen = ingPanel && !ingPanel.hidden && ingPanel.classList.contains("all");
  allButton.textContent = allOpen ? t("ing.allClose") : t("ing.all");
}

cards.forEach((card) => {
  card.querySelector(".ing-toggle").addEventListener("click", () => {
    showIngredients(card.classList.contains("open") ? [] : [card]);
  });
});

if (ingPanel) ingPanel.querySelector(".ing-panel-close").addEventListener("click", () => showIngredients([]));

if (allButton) allButton.addEventListener("click", () => {
  const allOpen = !ingPanel.hidden && ingPanel.classList.contains("all");
  showIngredients(allOpen ? [] : cards);
});

// ---------- Bouteilles 3D ----------
// Une scène 3D n'est créée qu'à sa première apparition, et s'arrête hors de l'écran :
// plusieurs bouteilles qui tournent en continu ralentiraient la page.
if (window.GaiaBottle && "IntersectionObserver" in window) {
  const bottles = new Map();
  const bottleObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const bottle = bottles.get(target);
      if (!isIntersecting) { if (bottle) bottle.pause(); return; }
      if (bottle) { bottle.resume(); return; }
      try {
        const lying = target.dataset.rest === "horizontal"; // couchée : tourne seule, sans ombre au sol
        bottles.set(target, GaiaBottle.mount(target, {
          zoom: Number(target.dataset.zoom) || 1,
          rest: lying ? -Math.PI / 2 : 0,
          shadow: !lying,
          interactive: !lying,
        }));
      } catch (err) {
        bottleObserver.unobserve(target); // pas de WebGL : l'emplacement reste vide
      }
    });
  }, { rootMargin: "100px" });
  document.querySelectorAll("[data-bottle]").forEach((el) => bottleObserver.observe(el));
}

// ---------- Apparition au défilement ----------
const revealTargets = document.querySelectorAll(
  ".hero-text > *, .section-title, .ing-card, .ing-all, .faq-item, .faq-contact, " +
  ".page-head p, .step-media, .step-body > *, .team-intro, .team-nav li, .person-grid"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("js-reveal");
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach((el) => {
    // Léger décalage entre les éléments voisins (cartes, questions…)
    const index = [...el.parentElement.children].indexOf(el);
    el.style.transitionDelay = `${Math.min(index, 6) * 80}ms`;
    el.classList.add("reveal");
    revealer.observe(el);
  });
}

// ---------- Instagram ----------
// Même plugin que le portfolio (plugins/insta-grille) : fenêtre de 3 × 3 qui défile,
// épinglés d'abord, avec la déesse de Gaïa comme curseur. Les posts sont téléchargés
// automatiquement par le robot GitHub (scripts/instagram-sync.mjs, voir README.md).
if (window.InstaGrille && document.getElementById("gaiaPosts")) {
  InstaGrille.monter("#gaiaPosts", {
    posts: window.INSTA_POSTS || [],
    lignesVisibles: 3,
    curseur: "assets/img/marque/curseur.png",
  });
}

// ---------- Démarrage ----------
const browserLang = (navigator.language || "fr").slice(0, 2);
setLang(store.get("gaia-lang") || (translations[browserLang] ? browserLang : "fr"));
