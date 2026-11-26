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
    "process.intro": "From the pan to the bottle: here is how we make Gaïa, step by step.",
    "process.step": "Step",
    "process.s1.name": "The syrup",
    "process.s1.text": "We gently heat water and sugar to make a syrup, then add the peach syrup and peach flavouring.",
    "process.s2.name": "The blend",
    "process.s2.text": "Lemon juice and guarana join the syrup. We stir until the base is perfectly smooth.",
    "process.s3.name": "Bottling",
    "process.s3.text": "The base is topped up with chilled sparkling water, then poured into our 33 cl glass bottles, capped and labelled by hand.",

    "faq.q1": "What is Gaïa?",
    "faq.a1": "Gaïa is a natural peach-flavoured energy drink, designed and handmade by apprentices at CPNV in Sainte-Croix.",
    "faq.q2": "Where does Gaïa's energy come from?",
    "faq.a2": "From guarana, an Amazonian plant whose seeds naturally contain caffeine.",
    "faq.q3": "Is Gaïa vegan?",
    "faq.a3": "Yes. All our ingredients are plant-based.",
    "faq.q4": "Can everyone drink it?",
    "faq.a4": "Gaïa contains caffeine. It is not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine.",
    "faq.q5": "Where can I try Gaïa?",
    "faq.a5": "At the CPNV open days in Sainte-Croix, on Friday 27 and Saturday 28 November 2026.",
    "faq.notFound": "Didn't find the answer to your question?",
    "faq.contact": "Contact us",

    "law.title": "Swiss law on the drink",
    "law.p1": "In Switzerland, drinks containing caffeine are regulated by the FDHA Ordinance on Beverages (SR 817.022.12).",
    "law.li1": "The caffeine content must not exceed a maximum value set by law.",
    "law.li2": "A drink with a high caffeine content must carry a warning on its label, stating the amount of caffeine.",
    "law.li3": "The label must also list the ingredients, the quantity and the best-before date.",
    "law.p2": "We are checking our recipe and our label against these rules.",
    "law.link": "Read the law on fedlex.admin.ch",

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
    "footer.prep": "How the drink is made",
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

    "process.title": "Die Herstellung",
    "process.intro": "Vom Topf bis in die Flasche: So stellen wir Gaïa Schritt für Schritt her.",
    "process.step": "Schritt",
    "process.s1.name": "Der Sirup",
    "process.s1.text": "Wasser und Zucker werden sanft erhitzt, bis ein Sirup entsteht. Dann kommen Pfirsichsirup und Pfirsicharoma dazu.",
    "process.s2.name": "Die Mischung",
    "process.s2.text": "Zitronensaft und Guarana kommen in den Sirup. Wir rühren, bis die Basis ganz gleichmässig ist.",
    "process.s3.name": "Die Abfüllung",
    "process.s3.text": "Die Basis wird mit kaltem Sprudelwasser aufgefüllt und in unsere 33-cl-Glasflaschen abgefüllt, die von Hand verschlossen und etikettiert werden.",

    "faq.q1": "Was ist Gaïa?",
    "faq.a1": "Gaïa ist ein natürlicher Energydrink mit Pfirsichgeschmack, entwickelt und von Hand hergestellt von Lernenden des CPNV in Sainte-Croix.",
    "faq.q2": "Woher kommt die Energie von Gaïa?",
    "faq.a2": "Aus Guarana, einer Pflanze aus dem Amazonas, deren Samen von Natur aus Koffein enthalten.",
    "faq.q3": "Ist Gaïa vegan?",
    "faq.a3": "Ja. Alle unsere Zutaten sind pflanzlich.",
    "faq.q4": "Darf jeder Gaïa trinken?",
    "faq.a4": "Gaïa enthält Koffein. Für Kinder, schwangere oder stillende Frauen und koffeinempfindliche Personen wird es nicht empfohlen.",
    "faq.q5": "Wo kann man Gaïa probieren?",
    "faq.a5": "An den Tagen der offenen Tür des CPNV in Sainte-Croix, am Freitag, 27., und Samstag, 28. November 2026.",
    "faq.notFound": "Keine Antwort auf deine Frage gefunden?",
    "faq.contact": "Kontaktiere uns",

    "law.title": "Das Schweizer Gesetz zum Getränk",
    "law.p1": "In der Schweiz sind koffeinhaltige Getränke in der Verordnung des EDI über Getränke (SR 817.022.12) geregelt.",
    "law.li1": "Der Koffeingehalt darf einen gesetzlich festgelegten Höchstwert nicht überschreiten.",
    "law.li2": "Ein Getränk mit hohem Koffeingehalt muss auf dem Etikett einen Warnhinweis mit der Koffeinmenge tragen.",
    "law.li3": "Das Etikett muss ausserdem die Zutaten, die Menge und das Mindesthaltbarkeitsdatum angeben.",
    "law.p2": "Wir prüfen unser Rezept und unser Etikett anhand dieser Regeln.",
    "law.link": "Gesetz auf fedlex.admin.ch lesen",

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
    "nav.process": "Die Herstellung",
    "nav.team": "Unser Team",
    "nav.law": "Schweizer Gesetz zum Getränk",

    "footer.chapters": "Bereiche der Website",
    "footer.drink": "Das Getränk",
    "footer.prep": "Herstellung des Getränks",
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

// ---------- Démarrage ----------
const browserLang = (navigator.language || "fr").slice(0, 2);
setLang(store.get("gaia-lang") || (translations[browserLang] ? browserLang : "fr"));
