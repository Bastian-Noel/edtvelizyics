
# Emploi du temps Vélizy - ICS Lisible

Ce projet permet de **générer des fichiers ICS plus lisibles et structurés** à partir des calendriers Celcat de l’IUT de Vélizy.  
Les événements conservent leur UID et horaires exacts, mais les titres, descriptions et lieux sont nettoyés et harmonisés pour une meilleure lisibilité dans vos calendriers (iPhone, Google Agenda, Outlook, etc.).

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

---

## 🔗 URL des calendriers

Pour récupérer l’URL d’un groupe :  

1. Rendez-vous sur [https://celcat.iut-velizy.uvsq.fr/cal/groups.aspx](https://celcat.iut-velizy.uvsq.fr/cal/groups.aspx)  
2. Sélectionnez le groupe souhaité et cliquez sur **Afficher URL** en bas.  
3. Copiez la partie entre `ical/` et `/schedule.ics` de l’URL affichée.  
4. Exemple : pour  
```

webcal://celcat.rambouillet.iut-velizy.uvsq.fr/cal/ical/GX-HQ2HQAHQ24661973/schedule.ics

```
la partie à utiliser est `GX-HQ2HQAHQ24661973`.  

Ensuite, utilisez l’URL publique :  

```

[https://edtvelizyics.bastiannoel.com/ics?group=](https://edtvelizyics.bastiannoel.com/ics?group=)<ID_DU_GROUPE>

```

- Optionnel : filtrage par type d’événement :  
  - `CM` : Cours Magistraux  
  - `TP` : Travaux Pratiques  
  - `TD` : Travaux Dirigés  

Exemple :  

```

[https://edtvelizyics.bastiannoel.com/ics?group=GX-HQ2HQAHQ24661973&amp;type=TD](https://edtvelizyics.bastiannoel.com/ics?group=GX-HQ2HQAHQ24661973&type=TD)

```

---

## 🖥 Auto-hébergement

Si vous souhaitez ne pas dépendre du serveur public, vous pouvez héberger le projet vous-même.

### Prérequis
- [Docker](https://www.docker.com/) installé

### Démarrage avec Docker
1. À la racine du projet (où se trouvent `Dockerfile` et `package.json`), construisez l’image :  
```bash
docker build -t edtvelizyics .
```

2. Lancez le conteneur sur votre domaine ou serveur :

```bash
docker run -p 3000:3000 edtvelizyics
```

3. Accédez au calendrier depuis votre navigateur ou application avec :

```
https://<VOTRE_DOMAINE>/ics?group=<ID_DU_GROUPE>
```

---

## 📌 Exemple de texte avant / après

### Exemple original Celcat

```
Titre: R 1.04 - Culture numerique; Cours Magistraux (CM)
Lieu: AV2 - VEL
Description: 
RIALLAND Ivanne; MMI1-B
```

### Exemple après amélioration

```
Titre: [CM] Culture numerique
Lieu: AV2
Description: 
📚 Enseignant : RIALLAND Ivanne
👥 Groupe : B
```

💡 **Remarques :**

* Les **UID des événements sont conservés** depuis le ICS original de Celcat, ce qui permet à votre calendrier de détecter correctement les mises à jour.
* Les **titres** sont harmonisés avec des tags `[CM]`, `[TP]`, `[TD]`.
* Les **lieux et descriptions** sont nettoyés pour une meilleure lisibilité.
