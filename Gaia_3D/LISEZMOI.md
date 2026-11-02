# Gaia Pêche en 3D

## Les fichiers

| Fichier | À quoi il sert |
|---|---|
| `gaia-bottle.js` | La bouteille interactive, prête à l'emploi (Three.js et étiquette inclus). C'est le fichier à mettre dans ton site. |
| `exemple.html` | Exemple d'intégration avec des boutons. Ouvre-le dans le navigateur. |
| `Gaia_Peche_interactive.html` | Page complète autonome (titre, boutons, infos), un seul fichier. |
| `modele-3d/Gaia_Peche.glb` | Modèle 3D statique pour Blender, Windows 3D Viewer, etc. |
| `src/` | Code source, si tu veux modifier la bouteille et la reconstruire. |

## Intégrer la bouteille dans ta page

```html
<div id="bouteille" style="height:560px"></div>

<script src="gaia-bottle.js"></script>
<script>
  const bouteille = GaiaBottle.mount('#bouteille', {
    mode: 'turn',    // 'turn' = tourner sur elle-même, 'tilt' = pencher, 'move' = déplacer
    interactive: true, // false = pas de manipulation, elle tourne seule
    upright: true,   // revient debout quand on lâche
    spin: true,      // rotation lente
    shadow: true,    // ombre au sol
    zoom: 1,         // taille
    rest: 0          // position de repos en radians (Math.PI / 2 = couchée)
  });
</script>
```

Fonctions : `bouteille.shake()`, `bouteille.reset()`, `bouteille.setMode('turn' | 'tilt' | 'move')`,
`bouteille.setUpright(true/false)`, `bouteille.setSpin(true/false)`, `bouteille.pause()`, `bouteille.resume()`, `bouteille.destroy()`.

Le fond est transparent et la `div` donne la taille de la bouteille. Le dessin déborde de la `div` pour que la bouteille penchée ne soit pas coupée.

## Modifier le code source (optionnel)

Il faut Node.js. Dans le dossier `src` :

```
npm install
npm run build
```

Ça régénère `gaia-bottle.js` à la racine.

- `gaia-bottle.src.js` : le code (forme de la bouteille, matériaux, physique du jus).
  Couleur du jus : cherche `0xf09400` (jus) et `0xffb51e` (surface).
- `label.jpg` : l'étiquette déroulée (page avant à gauche, page arrière à droite). Remplace-la pour changer d'étiquette.
- `profile.json` : la silhouette de la bouteille en mètres, le niveau de remplissage (`fill`) et la position de l'étiquette.
