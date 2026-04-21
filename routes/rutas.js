const express = require("express");
const router = express.Router();

// =======================
// VISTAS
// =======================

// Página principal
router.get("/", (req, res) => {
    res.render("perfil"); // puedes cambiar a index si quieres
});

// Perfil
router.get("/perfil", (req, res) => {
    res.render("perfil");
});

// Galería (Álbum)
router.get("/galeria", (req, res) => {
    res.render("galeria");
});

// Noticias (puedes usarlo como prueba AJAX)
router.get("/noticias", (req, res) => {
    res.render("noticias");
});

// =======================
// DATOS (API)
// =======================

let contactos = [];
let favoritos = [];
let likes = 0;

// Contactos (AJAX)
router.post("/api/contactos", (req, res) => {
    contactos.push(req.body);
    res.json(req.body);
});

// Favoritos
router.post("/api/favoritos", (req, res) => {
    favoritos.push(req.body);
    res.json({ ok: true });
});

// Likes
router.post("/api/like", (req, res) => {
    likes++;
    res.json({ likes });
});

module.exports = router;