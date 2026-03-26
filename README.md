# ESGIS Gabon — Module de Gestion des Absences

Application web de gestion centralisée des absences et retards des étudiants, développée dans le cadre du mémoire de fin d'études de Licence à l'ESGIS Gabon (2023-2024).

---

## Fonctionnalités

- Authentification JWT avec rôles **Admin** et **Enseignant**
- Emploi du temps par professeur avec saisie des présences par séance
- Gestion des filières — les étudiants sont automatiquement filtrés selon la filière du cours
- Enregistrement des absences et retards en temps réel
- Gestion des justificatifs
- Notifications automatiques par email (Nodemailer)
- Rapports analytiques par étudiant, filière ou professeur (export PDF / Excel)
- Interface responsive — mobile, tablette et desktop

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React.js 18 |
| Backend | Node.js + Express |
| Base SQL | MySQL + Sequelize ORM |
| Base NoSQL | MongoDB + Mongoose |
| Auth | JSON Web Token (JWT) |
| Emails | Nodemailer |

---

## Démarrage rapide
```bash
# Frontend
cd frontend && npm install && npm start

# Backend
cd backend && npm install
cp .env.example .env   # configurer DB, JWT, SMTP
node server.js
```

---

## Comptes démo

| Identifiant | Mot de passe | Rôle |
|-------------|--------------|------|
| `admin` | `admin123` | Administrateur |
| `prof.lawson` | `prof123` | Enseignant |
| `prof.boukar` | `prof123` | Enseignant |
| `prof.eya` | `prof123` | Enseignante |

---

## Auteur

**PARAISO Isaac Damien Affolabi** — Licence Développement Logiciel  
Encadrant : **Marcel LAWSON** — ESGIS Gabon, 2023-2024
