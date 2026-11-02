# Gaïa – Natural Energy Drink

Site de la boisson Gaïa (projet Fresh, CPNV Sainte-Croix).

- `index.html` : la boisson, les ingrédients, la FAQ, la loi, Instagram
- `projet.html` : le processus du projet et l'équipe
- `assets/css/styles.css` : style
- `assets/js/main.js` : traductions FR / EN / DE, interactions
- `assets/fonts/` : polices
- `assets/img/marque/` : logos, favicon, curseur, QR code
- `assets/img/equipe/` : portraits
- `assets/instagram/` : images et liste des posts, écrites par le robot
- `plugins/insta-grille/` : grille Instagram (repris de l'e-portfolio)
- `plugins/bouteille-3d/` : bouteille 3D (`src/` pour la reconstruire, voir son `LISEZMOI.md`)
- `scripts/` : robot Instagram, mise en place, publications épinglées

## Robot Instagram

Même fonctionnement que La Lanterne de Yuna sur l'e-portfolio :

```
Instagram ──(API officielle, toutes les 15 min)──► robot GitHub Actions
                                                     │
          assets/instagram/*.jpg      ◄──────────────┤  télécharge les images
          assets/instagram/posts.js   ◄──────────────┤  réécrit la liste
                                                     │
          serveur du site             ◄──(FTP)───────┘  envoie ces fichiers
```

1. `.github/workflows/instagram.yml` lance `scripts/instagram-sync.mjs`
   toutes les 15 minutes. GitHub ne garantit pas l'heure exacte : un passage
   peut avoir du retard (bouton **Run workflow** pour forcer).
2. Le script récupère toutes les publications de @gaia_ned, enregistre
   l'image de chaque nouvelle publication dans `assets/instagram/`, retire
   celles des posts supprimés et réécrit `assets/instagram/posts.js`.
3. S'il y a du nouveau, le robot commite ces fichiers et les envoie sur le
   site par FTP.

Le token Instagram n'apparaît jamais en clair dans le dépôt : il est rangé
chiffré dans `.github/instagram-token.enc`, et le robot le prolonge de
60 jours chaque semaine.

### Mise en place (une seule fois)

Depuis ce dossier, dans le Terminal :

```
bash scripts/configurer.sh
```

Le script :
- enregistre le token Instagram dans le secret `INSTAGRAM_TOKEN` (lu dans
  `Web/.instagram-token`, sinon demandé) ;
- crée la phrase secrète `INSTAGRAM_TOKEN_KEY` qui chiffre le token ;
- propose d'enregistrer les accès FTP (`FTP_SERVEUR`, `FTP_UTILISATEUR`,
  `FTP_MOT_DE_PASSE`, `FTP_DOSSIER`) après les avoir vérifiés ;
- lance le robot une première fois.

Sans accès FTP, le robot met quand même le dépôt à jour, mais il faut envoyer
`assets/instagram/` sur le serveur soi-même avec FileZilla.

Pour renvoyer tout le site sur le serveur : onglet **Actions** →
**Publications Instagram** → **Run workflow** → coche **Envoyer aussi tout le
site**. Rien n'est supprimé sur le serveur.

### Publications épinglées

L'API d'Instagram ne dit pas quels posts sont épinglés. Colle leurs liens
dans `scripts/instagram-epingles.json`, dans l'ordre du profil (3 au maximum) : le
robot les place en tête de la grille à son prochain passage.

### En cas de problème

- **Le run est rouge** : clique dessus, le message dit ce qui manque
  (secret absent, token refusé…).
- **Token expiré** (robot arrêté plus de 60 jours) : génère un nouveau token
  (app Meta → Instagram → Configuration de l'API avec connexion Instagram →
  Générer le token), mets-le dans le secret `INSTAGRAM_TOKEN`, supprime
  `.github/instagram-token.enc` du dépôt, puis relance le robot.
- **GitHub a désactivé le robot** : GitHub suspend les tâches planifiées d'un
  dépôt public sans activité pendant 60 jours et envoie un e-mail. Un clic sur
  **Enable workflow** (onglet Actions) le relance.
