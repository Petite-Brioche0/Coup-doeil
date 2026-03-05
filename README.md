<div align="center">
  <img src="coupdoeil-site/assets/img/logo/nobg_logo_dark.png" alt="Coup d'Oeil" height="140" />
  <br/><br/>

  <a href="https://petite-brioche0.github.io/Coup-doeil/coupdoeil-site/">
    <img src="https://img.shields.io/badge/🌐%20Site%20web-GitHub%20Pages-d64f59?style=for-the-badge" alt="GitHub Pages" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/Licence-MIT-f6ae2d?style=for-the-badge" alt="MIT License" />
  &nbsp;
  <img src="https://img.shields.io/badge/Vanilla-JS%20%7C%20HTML%20%7C%20CSS-1fa387?style=for-the-badge" alt="Stack" />

  <br/><br/>

  <p><strong>Un marché de créateurs inclusif à Lyon</strong><br/>
  <em>An inclusive creator market in Lyon, France</em></p>
</div>

---

**Table of contents**

| 🇫🇷 Français | 🇬🇧 English |
|---|---|
| [À propos](#-à-propos) | [About](#-about) |
| [Valeurs](#-valeurs) | [Values](#-values) |
| [Fonctionnalités](#-fonctionnalités) | [Features](#-features) |
| [Stack technique](#-stack-technique) | [Tech stack](#-tech-stack) |
| [Structure du projet](#-structure-du-projet) | [Project structure](#-project-structure) |
| [Lancer en local](#-lancer-en-local) | [Running locally](#-running-locally) |
| [Équipe](#-équipe) | [Team](#-team) |
| [Licence](#-licence) | [License](#-license) |

---

## 🇫🇷 Français

### 🎨 À propos

**Coup d'Oeil** est le site web de l'association **RONDS & COULEURS**, qui organise des marchés de créateurs à Lyon. Le projet réunit des artistes et artisans locaux autour de valeurs fortes : inclusivité, créations entièrement faites main, zéro intelligence artificielle, zéro dropshipping.

Chaque édition est un espace de rencontre entre le public et des créateurs émergents — étudiants en art, illustrateurs, bijoutiers, peintres — dans une atmosphère bienveillante et accessible à tous.

<div align="center">

| 📅 Édition | 📍 Lieu | 👥 Visiteurs | Statut |
|:---:|:---:|:---:|:---:|
| Saint-Valentin — 7 fév. 2026 | Lyon | 282 | ✅ Terminée |
| Printemps — 19 avr. 2026 | Lyon | — | 🔜 À venir |

</div>

---

### 💛 Valeurs

<table>
  <tr>
    <td align="center" width="25%">🤝<br/><strong>Inclusivité</strong><br/><sub>Un safe space ouvert à toutes et tous, quelles que soient les identités et origines</sub></td>
    <td align="center" width="25%">✋<br/><strong>Authenticité</strong><br/><sub>Uniquement des créations originales faites main</sub></td>
    <td align="center" width="25%">🚫<br/><strong>Zéro IA</strong><br/><sub>Aucune œuvre générée par intelligence artificielle</sub></td>
    <td align="center" width="25%">🌱<br/><strong>Soutien aux émergents</strong><br/><sub>Accompagner les artistes et étudiants dans l'entrepreneuriat créatif</sub></td>
  </tr>
</table>

---

### ✨ Fonctionnalités

- 🎨 **Galerie d'artistes filtrable** — par catégorie et par édition
- 🌙 **Mode clair / sombre** — avec sauvegarde de la préférence utilisateur
- 📬 **Formulaires** — contact visiteurs et inscription exposants
- 🖼️ **Carrousels d'images** — galeries artistes et photos d'événements avec navigation tactile
- 📱 **Design responsive** — adapté mobile, tablette et desktop
- ♿ **Accessibilité** — ARIA, navigation clavier, lecteurs d'écran
- ⚡ **Entièrement statique** — aucune dépendance externe, aucun build requis

---

### 🛠️ Stack technique

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique et accessible |
| **CSS3** | Variables CSS, Grid, Flexbox, thèmes clair/sombre |
| **JavaScript ES6+** | Filtres, carrousels, formulaires, `localStorage` |

> Aucun framework, aucune librairie, aucune dépendance — **vanilla uniquement**.

---

### 📁 Structure du projet

```
coupdoeil-site/
├── index.html
├── pages/
│   ├── about.html              ← L'équipe et l'histoire du projet
│   ├── artists.html            ← Galerie des artistes
│   ├── events.html             ← Calendrier des éditions
│   ├── contact.html            ← Formulaire de contact / inscription
│   ├── edition-printemps.html  ← Récap de l'édition printemps
│   └── legal.html / privacy.html / cookies.html
└── assets/
    ├── css/
    │   ├── main.css            ← Styles principaux & thèmes
    │   └── forms.css           ← Styles des formulaires
    ├── js/
    │   ├── main.js             ← Fonctionnalités globales
    │   ├── artists.js          ← Galerie & filtres artistes
    │   └── forms.js            ← Gestion des formulaires
    ├── img/                    ← Images, logos, photos d'événements
    └── fonts/                  ← Polices personnalisées
```

---

### 🚀 Lancer en local

Aucune installation requise. Deux options :

**Option 1 — Ouverture directe**
```
coupdoeil-site/index.html
```
Glissez-déposez le fichier dans votre navigateur.

**Option 2 — Serveur local** *(recommandé pour éviter les erreurs CORS)*
```bash
# Avec l'extension VS Code Live Server
# Clic droit sur index.html → "Open with Live Server"
```

---

### 👥 Équipe

Le projet est porté par **8 membres bénévoles** de l'association RONDS & COULEURS :

<div align="center">

| Membre | Rôle |
|:---:|:---|
| **Mae** | Cheffe de projet |
| **Léna** | Co-fondatrice |
| **Eli** | Relations & Illustration |
| **Romane** | Graphiste |
| **Maëlla** | Responsable Relations |
| **Noémie** | Assistante graphiste & Communication |
| **Camille** | Vidéaste |
| **Michel** | Développeur web |

</div>

→ [Découvrir l'équipe complète](https://petite-brioche0.github.io/Coup-doeil/coupdoeil-site/pages/about.html)

---

### 📄 Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---
---

## 🇬🇧 English

### 🎨 About

**Coup d'Oeil** is the website for the association **RONDS & COULEURS**, which organizes independent creator markets in Lyon, France. The project brings together local artists and makers around core values: inclusivity, entirely handmade creations, zero artificial intelligence, and zero dropshipping.

Each edition is a meeting point between the public and emerging creators — art students, illustrators, jewelers, painters — in a welcoming and accessible atmosphere.

<div align="center">

| 📅 Edition | 📍 Location | 👥 Visitors | Status |
|:---:|:---:|:---:|:---:|
| Valentine's — Feb 7, 2026 | Lyon | 282 | ✅ Done |
| Spring — Apr 19, 2026 | Lyon | — | 🔜 Upcoming |

</div>

---

### 💛 Values

<table>
  <tr>
    <td align="center" width="25%">🤝<br/><strong>Inclusivity</strong><br/><sub>A safe space open to everyone, regardless of identity or background</sub></td>
    <td align="center" width="25%">✋<br/><strong>Authenticity</strong><br/><sub>Original, handmade creations only</sub></td>
    <td align="center" width="25%">🚫<br/><strong>Zero AI</strong><br/><sub>No AI-generated artwork whatsoever</sub></td>
    <td align="center" width="25%">🌱<br/><strong>Supporting emerging artists</strong><br/><sub>Helping art students and new creators build their entrepreneurial path</sub></td>
  </tr>
</table>

---

### ✨ Features

- 🎨 **Filterable artist gallery** — by category and by edition
- 🌙 **Light / dark mode** — with user preference persistence
- 📬 **Forms** — visitor contact and exhibitor registration
- 🖼️ **Image carousels** — artist galleries and event photos with touch support
- 📱 **Responsive design** — mobile, tablet and desktop
- ♿ **Accessibility** — ARIA, keyboard navigation, screen reader support
- ⚡ **Fully static** — no external dependencies, no build step required

---

### 🛠️ Tech stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

| Technology | Usage |
|---|---|
| **HTML5** | Semantic and accessible structure |
| **CSS3** | CSS variables, Grid, Flexbox, light/dark themes |
| **JavaScript ES6+** | Filters, carousels, forms, `localStorage` |

> No framework, no library, no dependency — **vanilla only**.

---

### 📁 Project structure

```
coupdoeil-site/
├── index.html
├── pages/
│   ├── about.html              ← Team and project history
│   ├── artists.html            ← Artist gallery
│   ├── events.html             ← Edition calendar
│   ├── contact.html            ← Contact / registration form
│   ├── edition-printemps.html  ← Spring edition recap
│   └── legal.html / privacy.html / cookies.html
└── assets/
    ├── css/
    │   ├── main.css            ← Main styles & themes
    │   └── forms.css           ← Form styles
    ├── js/
    │   ├── main.js             ← Global features
    │   ├── artists.js          ← Gallery & artist filters
    │   └── forms.js            ← Form handling
    ├── img/                    ← Images, logos, event photos
    └── fonts/                  ← Custom fonts
```

---

### 🚀 Running locally

No installation required. Two options:

**Option 1 — Direct open**
```
coupdoeil-site/index.html
```
Drag and drop the file into your browser.

**Option 2 — Local server** *(recommended to avoid CORS issues)*
```bash
# With the VS Code Live Server extension
# Right-click on index.html → "Open with Live Server"
```

---

### 👥 Team

The project is run by **8 volunteer members** of the RONDS & COULEURS association:

<div align="center">

| Member | Role |
|:---:|:---|
| **Mae** | Project Lead |
| **Léna** | Co-founder |
| **Eli** | Relationships & Illustrator |
| **Romane** | Graphic Designer |
| **Maëlla** | Relationships Manager |
| **Noémie** | Graphic Assistant & Communication |
| **Camille** | Video Producer |
| **Michel** | Web Developer |

</div>

→ [Meet the full team](https://petite-brioche0.github.io/Coup-doeil/coupdoeil-site/pages/about.html)

---

### 📄 License

This project is distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
