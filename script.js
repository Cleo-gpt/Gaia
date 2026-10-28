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
    "ing.more": "Read more",
    "ing.less": "Read less",
    "ing.water.name": "Sparkling water",
    "ing.water.text": "Carbonated water, more commonly called sparkling or fizzy water, is water that contains dissolved carbon dioxide (CO₂).",
    "ing.syrup.name": "Peach syrup",
    "ing.syrup.text": "Peach syrup is a versatile product used in cooking and drinks, but its impact on health mainly depends on how it is made and how much sugar it contains.",
    "ing.sugar.name": "Sugar",
    "ing.sugar.text": "Sugar usually means sucrose, a sweet-tasting carbohydrate extracted mainly from sugar cane or sugar beet. Nutritionally and chemically, it belongs to the family of simple carbohydrates.",
    "ing.lemon.name": "Lemon juice",
    "ing.lemon.text": "Lemon juice is an acidic, versatile ingredient, used in cooking as well as for health or household cleaning.",
    "ing.guarana.name": "Guarana",
    "ing.guarana.text": "Guarana (Paullinia cupana) is a climbing plant native to the Amazon basin, especially widespread in Brazil. It is known worldwide for its seeds, which have an exceptionally high caffeine content.",
    "ing.aroma.name": "Peach flavour",
    "ing.aroma.text": "Peach flavouring is a magic ingredient that gives the subtle, fruity taste of peach to your pastries, creams or drinks, without changing their texture the way real fruit (which can be too watery) sometimes does.",
    "ing.allHint": "Tap here to see them all",
    "ing.all": "All categories",
    "ing.allClose": "Hide all",

    "process.title": "The process",
    "process.intro": "From the idea to the stand: here is how we created Gaïa, step by step.",
    "process.s4.name": "The launch",
    "process.s4.text": "We launched our social media to make Gaïa known, tested several flavours to find the right recipe, and built this website to present the drink and the team.",
    "process.s5.name": "The open days",
    "process.s5.text": "Gaïa is presented and sold at our stand during the CPNV open days in Sainte-Croix, on Friday 27 and Saturday 28 November 2026.",
    "process.step": "Step",
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
    "faq.a3": "Yes. It is sweetened with sugar and peach syrup, with no artificial sweeteners.",
    "faq.q4": "Is Gaïa vegan?",
    "faq.a4": "Yes. All its ingredients are plant-based.",
    "faq.q5": "How should I store Gaïa?",
    "faq.a5": "In a cool place, away from light. It tastes best chilled. Once opened, it's best to drink it quickly so it keeps its bubbles.",
    "faq.q7": "How long does Gaïa keep?",
    "faq.a7": "Gaïa is handmade in small batches. Unopened, it keeps until the date shown on the label. Once opened, keep it in the fridge and drink it the same day.",
    "faq.q6": "Can everyone drink it?",
    "faq.a6": "Gaïa contains caffeine. It is not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine.",
    "faq.notFound": "Didn't find the answer to your question?",
    "faq.contact": "Contact us",

    "insta.title": "Follow us on Instagram",
    "insta.text": "Behind the scenes of the project, our tests and Gaïa news.",
    "insta.cta": "See the account",
    "law.title": "Swiss law on the drink",
    "law.p1": "In Switzerland, drinks containing caffeine are regulated by the FDHA Ordinance on Beverages (SR 817.022.12).",
    "law.li1": "The caffeine content must not exceed a maximum value set by law.",
    "law.li2": "A drink with a high caffeine content must carry a warning on its label, stating the amount of caffeine.",
    "law.li3": "The label must also list the ingredients, the quantity and the best-before date.",
    "law.p2": "We are checking our recipe and our label against these rules.",
    "law.link": "Read the FSVO explanations (PDF, in French)",

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
    "nav.process": "The process",
    "nav.team": "Our team",
    "nav.law": "Swiss law on the drink",

    "footer.chapters": "Site sections",
    "footer.drink": "The drink",
    "footer.prep": "The project process",
    "footer.law": "Swiss law on the drink",
    "footer.scan": "Scan me to follow us!",
    "footer.legal": "Legal notice",
    "footer.terms": "Terms of use",
    "footer.privacy": "Privacy policy",
    "footer.rights": "All rights reserved",

    "popup.title": "Join us",
    "popup.script": "on Insta!",
    "popup.text": "Follow @gaia_ned so you don't miss any Gaïa news, behind-the-scenes content or our upcoming contests.",
    "popup.cta": "Follow @gaia_ned",
    "popup.scan": "Scan me!",
  },

  de: {
    "hero.title": "Neu: Gaïa Pfirsich",
    "hero.script": "Entdecke natürliche Energie",
    "hero.lead": "Ein 100 % handgemachtes Getränk mit Pfirsichgeschmack, natürlich und vegan.",
    "hero.cta": "Zu den Zutaten",

    "ing.title": "Die Zutaten",
    "ing.more": "Mehr lesen",
    "ing.less": "Weniger lesen",
    "ing.water.name": "Kohlensäure­haltiges Wasser",
    "ing.water.text": "Kohlensäurehaltiges Wasser, auch Sprudel- oder Mineralwasser mit Kohlensäure genannt, ist Wasser, in dem Kohlendioxid (CO₂) gelöst ist.",
    "ing.syrup.name": "Pfirsich­sirup",
    "ing.syrup.text": "Pfirsichsirup ist ein vielseitiges Produkt für Küche und Getränke. Seine Wirkung auf die Gesundheit hängt vor allem von der Herstellung und vom Zuckergehalt ab.",
    "ing.sugar.name": "Zucker",
    "ing.sugar.text": "Mit Zucker ist meist Saccharose gemeint, ein süss schmeckendes Kohlenhydrat, das hauptsächlich aus Zuckerrohr oder Zuckerrüben gewonnen wird. Ernährungsphysiologisch und chemisch gehört er zu den einfachen Kohlenhydraten.",
    "ing.lemon.name": "Zitronen­saft",
    "ing.lemon.text": "Zitronensaft ist eine saure, vielseitige Zutat, die in der Küche ebenso verwendet wird wie für die Gesundheit oder im Haushalt.",
    "ing.guarana.name": "Guarana",
    "ing.guarana.text": "Guarana (Paullinia cupana) ist eine Kletterpflanze aus dem Amazonasbecken, die besonders in Brasilien verbreitet ist. Weltweit bekannt ist sie für ihre Samen, die außergewöhnlich viel Koffein enthalten.",
    "ing.aroma.name": "Pfirsich­aroma",
    "ing.aroma.text": "Pfirsicharoma ist eine magische Zutat, die Gebäck, Cremes oder Getränken den feinen, fruchtigen Geschmack von Pfirsich verleiht, ohne die Konsistenz zu verändern, wie es echte Früchte (die manchmal zu viel Wasser abgeben) tun.",
    "ing.allHint": "Hier tippen, um alle zu sehen",
    "ing.all": "Alle Kategorien",
    "ing.allClose": "Alle schliessen",

    "process.title": "Der Prozess",
    "process.intro": "Von der Idee bis zum Stand: So haben wir Gaïa Schritt für Schritt entwickelt.",
    "process.s4.name": "Der Start",
    "process.s4.text": "Wir haben unsere sozialen Medien gestartet, um Gaïa bekannt zu machen, mehrere Geschmacksrichtungen getestet, um das richtige Rezept zu finden, und diese Website gebaut, um das Getränk und das Team vorzustellen.",
    "process.s5.name": "Die Tage der offenen Tür",
    "process.s5.text": "Gaïa wird an unserem Stand an den Tagen der offenen Tür des CPNV in Sainte-Croix vorgestellt und verkauft, am Freitag, 27., und Samstag, 28. November 2026.",
    "process.step": "Schritt",
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
    "faq.a3": "Ja. Gaïa ist mit Zucker und Pfirsichsirup gesüsst, ohne künstliche Süssstoffe.",
    "faq.q4": "Ist Gaïa vegan?",
    "faq.a4": "Ja. Alle Zutaten sind pflanzlich.",
    "faq.q5": "Wie bewahrt man Gaïa auf?",
    "faq.a5": "Kühl und vor Licht geschützt. Am besten schmeckt Gaïa gut gekühlt. Nach dem Öffnen am besten rasch trinken, damit die Kohlensäure erhalten bleibt.",
    "faq.q7": "Wie lange ist Gaïa haltbar?",
    "faq.a7": "Gaïa wird von Hand in kleinen Mengen hergestellt. Ungeöffnet ist Gaïa bis zum Datum auf dem Etikett haltbar. Nach dem Öffnen im Kühlschrank aufbewahren und am selben Tag trinken.",
    "faq.q6": "Darf jeder Gaïa trinken?",
    "faq.a6": "Gaïa enthält Koffein. Für Kinder, schwangere oder stillende Frauen und koffeinempfindliche Personen wird es nicht empfohlen.",
    "faq.notFound": "Keine Antwort auf deine Frage gefunden?",
    "faq.contact": "Kontaktiere uns",

    "insta.title": "Folge uns auf Instagram",
    "insta.text": "Hinter den Kulissen des Projekts, unsere Tests und Neuigkeiten von Gaïa.",
    "insta.cta": "Zum Account",
    "law.title": "Das Schweizer Gesetz zum Getränk",
    "law.p1": "In der Schweiz sind koffeinhaltige Getränke in der Verordnung des EDI über Getränke (SR 817.022.12) geregelt.",
    "law.li1": "Der Koffeingehalt darf einen gesetzlich festgelegten Höchstwert nicht überschreiten.",
    "law.li2": "Ein Getränk mit hohem Koffeingehalt muss auf dem Etikett einen Warnhinweis mit der Koffeinmenge tragen.",
    "law.li3": "Das Etikett muss ausserdem die Zutaten, die Menge und das Mindesthaltbarkeitsdatum angeben.",
    "law.p2": "Wir prüfen unser Rezept und unser Etikett anhand dieser Regeln.",
    "law.link": "Erläuterungen des BLV lesen (PDF, auf Französisch)",

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
    "nav.process": "Der Prozess",
    "nav.team": "Unser Team",
    "nav.law": "Schweizer Gesetz zum Getränk",

    "footer.chapters": "Bereiche der Website",
    "footer.drink": "Das Getränk",
    "footer.prep": "Der Projektprozess",
    "footer.law": "Gesetz zum Getränk in der Schweiz",
    "footer.scan": "Scan mich, um uns zu folgen!",
    "footer.legal": "Impressum",
    "footer.terms": "AGB",
    "footer.privacy": "Datenschutz",
    "footer.rights": "Alle Rechte vorbehalten",

    "popup.title": "Folge uns",
    "popup.script": "auf Insta!",
    "popup.text": "Folge @gaia_ned und verpasse keine Neuigkeiten von Gaïa, keine Blicke hinter die Kulissen und keine unserer nächsten Wettbewerbe.",
    "popup.cta": "@gaia_ned folgen",
    "popup.scan": "Scan mich!",
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
// Le fond orange apparaît dès qu'on quitte le haut de la page d'accueil.
// Un repère invisible en haut de page est observé (plus fiable dans Safari
// que l'événement « scroll » seul) ; les autres pages ont toujours le fond.
const topbar = document.getElementById("topbar");
const hasHero = document.querySelector(".hero") !== null;
function setScrolled(on) {
  topbar.classList.toggle("scrolled", !hasHero || on);
}
const sentinel = document.createElement("div");
sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none;";
document.body.prepend(sentinel);
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting)).observe(sentinel);
}
window.addEventListener("scroll", () => setScrolled(window.scrollY > 40), { passive: true });
setScrolled(window.scrollY > 40);

// ---------- Fenêtres plein écran (menu, pop-up) ----------
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
const popup = document.getElementById("instaPopup");
let lastFocus = null;

function openOverlay(el) {
  lastFocus = document.activeElement;
  el.hidden = false;
  document.body.style.overflow = "hidden";
  if (el === menu) burger.setAttribute("aria-expanded", "true");
  const close = el.querySelector("[data-close]");
  if (close) close.focus();
}

function closeOverlay(el) {
  el.hidden = true;
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
const cards = document.querySelectorAll(".ing-card");
const allButton = document.getElementById("ingAll");

function setCard(card, open) {
  card.classList.toggle("open", open);
  card.querySelector(".ing-toggle").setAttribute("aria-expanded", String(open));
}

function updateAllButton() {
  if (!allButton) return;
  const allOpen = [...cards].every((c) => c.classList.contains("open"));
  allButton.textContent = allOpen ? t("ing.allClose") : t("ing.all");
}

cards.forEach((card) => {
  card.querySelector(".ing-toggle").addEventListener("click", () => {
    setCard(card, !card.classList.contains("open"));
    updateAllButton();
  });
});

if (allButton) allButton.addEventListener("click", () => {
  const allOpen = [...cards].every((c) => c.classList.contains("open"));
  cards.forEach((c) => setCard(c, !allOpen));
  updateAllButton();
});

// ---------- Apparition au défilement ----------
const revealTargets = document.querySelectorAll(
  ".hero-text > *, .section-title, .ing-card, .ing-all, .faq-item, .faq-contact, .law-card, " +
  ".page-head p, .step-head > :not(.waves), .step-text p, .team-intro, .team-nav li, .person-grid"
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
// toutes les heures par le robot GitHub (scripts/instagram-sync.mjs, voir README.md).
if (window.InstaGrille && document.getElementById("gaiaPosts")) {
  InstaGrille.monter("#gaiaPosts", {
    posts: window.INSTA_POSTS || [],
    lignesVisibles: 3,
    curseur: "assets/img/curseur-gaia.png",
  });
}

// ---------- Démarrage ----------
const browserLang = (navigator.language || "fr").slice(0, 2);
setLang(store.get("gaia-lang") || (translations[browserLang] ? browserLang : "fr"));
