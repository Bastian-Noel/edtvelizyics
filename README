# Emploi du temps Velizy - ICS

Ce projet permet de créer des **URL de calendriers compatibles avec iPhone, Google Agenda, Outlook, etc.** à partir des données de https://edt.rambouillet.iut-velizy.uvsq.fr/.

Ces URL peuvent être ajoutées directement dans vos applications de calendrier, et se mettent à jour automatiquement selon les modifications du planning.

---

## 📱 Configurer le calendrier sur votre appareil

### 🍎 iPhone / iPad
1. Ouvrez l’app **Calendrier**.
2. Touchez **Calendriers** en bas de l’écran, puis **Ajouter un calendrier / Nouveau calendrier**.
3. Sélectionnez **Ajouter un calendrier avec abonnement**.
4. Saisissez l’URL du calendrier (voir ci-dessous) et cliquez sur **S’abonner**.

### 🤖 Google Agenda
1. Sur PC ou navigateur, ouvrez [Google Agenda](https://calendar.google.com/).
2. En haut à droite, cliquez sur **Paramètres → Paramètres**.
3. Dans le menu de gauche, cliquez sur **Ajouter un agenda → À partir de l’URL**.
4. Saisissez l’URL du calendrier et cliquez sur **Ajouter un agenda**.

### 🔗 URL des calendriers
| Groupe | URL |
|--------|-----|
| MMI1-A1 | `https://edtvelizyics.bastiannoel.com/ics?group=MMI1-A1` |
| MMI1-A2 | `https://edtvelizyics.bastiannoel.com/ics?group=MMI1-A2` |
| MMI1-B1 | `https://edtvelizyics.bastiannoel.com/ics?group=MMI1-B1` |
| MMI1-B2 | `https://edtvelizyics.bastiannoel.com/ics?group=MMI1-B2` |
| Autre | `https://edtvelizyics.bastiannoel.com/ics?group=<nom_de_la_ressource>` |

> Remplacez `<Nom_de_la_Ressource>` par le nom exact du groupe ou de la ressource souhaitée.
---

## ⏱ Fréquence de mise à jour des calendriers 

- **Google Agenda** : rafraîchit automatiquement toutes les **4 à 24 heures**. 
- **Apple Calendar (iPhone / macOS)** : rafraîchit généralement toutes les **15 à 60 minutes**.  
  Sur macOS, la fréquence peut être configurée dans : `Préférences → Comptes → Avancé → Actualiser tous les…`.  

💡 Conclusion : Les modifications de l’emploi du temps peuvent prendre plusieurs heures mais pas plus.

---

## 📅 Limitation des événements

Pour éviter de surcharger votre calendrier, seules les **événements sur 1 mois ** sont inclus.

---

## 🖥 Auto-hébergement

Si vous ne voulez pas dépendre de mon serveur, vous pouvez faire tourner le projet sur votre propre serveur.

### Prérequis
- [Docker](https://www.docker.com/) installé

### Démarrage avec Docker
1. À la racine du projet (où se trouvent `Dockerfile` et `package.json`), construisez l’image :  
   ```bash
   docker build -t edtvelizyics .
