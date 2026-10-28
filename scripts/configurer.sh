#!/bin/bash
# configurer.sh — enregistre les secrets du robot Instagram dans GitHub,
# puis lance une première synchronisation (et une mise en ligne complète
# si les accès FTP sont donnés).
#
# À lancer une seule fois, depuis le dossier du site (racine du dépôt) :
#     bash scripts/configurer.sh
#
# Le token Instagram et le mot de passe FTP partent directement dans les
# secrets GitHub : ils ne sont écrits dans aucun fichier du dépôt.

set -e

if ! gh auth status >/dev/null 2>&1; then
    echo "Connecte-toi d'abord à GitHub : gh auth login"
    exit 1
fi
DEPOT=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "Dépôt : $DEPOT"
echo

# ---------- Instagram ----------
FICHIER_TOKEN="$(dirname "$0")/../../.instagram-token"
if [ -f "$FICHIER_TOKEN" ]; then
    TOKEN=$(cat "$FICHIER_TOKEN")
    echo "Token Instagram lu dans Web/.instagram-token."
else
    read -r -s -p "Token Instagram de @gaia_ned (commence par IGAA) : " TOKEN
    echo
fi
if [ -z "$TOKEN" ]; then
    echo "Token vide : rien n'a été enregistré."
    exit 1
fi
printf '%s' "$TOKEN" | gh secret set INSTAGRAM_TOKEN --repo "$DEPOT"
unset TOKEN
# Phrase secrète qui chiffre le token dans le dépôt : tirée au hasard, à ne plus changer.
if ! gh secret list --repo "$DEPOT" | grep -q '^INSTAGRAM_TOKEN_KEY'; then
    openssl rand -base64 32 | tr -d '\n' | gh secret set INSTAGRAM_TOKEN_KEY --repo "$DEPOT"
fi
echo "Secrets Instagram enregistrés."
echo

# ---------- FTP (facultatif) ----------
read -r -p "Configurer aussi la mise en ligne par FTP ? (o/n) " FTP
if [ "$FTP" = "o" ]; then
    read -r -p "Serveur FTP (ex : eleves.mediamatique.ch) : " SERVEUR
    read -r -p "Utilisateur FTP : " UTILISATEUR
    echo "Dossier du site sur le serveur : le chemin affiché à droite dans FileZilla"
    echo "quand tu ouvres le dossier qui doit contenir index.html (ex : /gaia)."
    read -r -p "Dossier du site (Entrée = dossier de connexion) : " DOSSIER
    read -r -s -p "Mot de passe FTP de $UTILISATEUR : " MOT_DE_PASSE
    echo
    if ! curl -s --max-time 30 --ssl -u "$UTILISATEUR:$MOT_DE_PASSE" "ftp://$SERVEUR/${DOSSIER#/}/" -o /dev/null; then
        echo "Connexion FTP refusée (mot de passe ou dossier incorrect) : FTP non enregistré."
        exit 1
    fi
    printf '%s' "$SERVEUR" | gh secret set FTP_SERVEUR --repo "$DEPOT"
    printf '%s' "$UTILISATEUR" | gh secret set FTP_UTILISATEUR --repo "$DEPOT"
    printf '%s' "$MOT_DE_PASSE" | gh secret set FTP_MOT_DE_PASSE --repo "$DEPOT"
    printf '%s' "$DOSSIER" | gh secret set FTP_DOSSIER --repo "$DEPOT"
    unset MOT_DE_PASSE
    echo "Secrets FTP enregistrés."
    gh workflow run instagram.yml --repo "$DEPOT" -f tout_envoyer=true
else
    gh workflow run instagram.yml --repo "$DEPOT"
fi
echo
echo "Robot lancé. Suivi : onglet Actions du dépôt, ou : gh run watch --repo $DEPOT"
