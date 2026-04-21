const express = require("express");
const path = require("path");

const app = express ();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public"))),
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const rutas = require("./routes/rutas");
app.use("/",rutas);

app.get("/perfil", (req, res) => {
    res.render("perfil");
});

// app.listen(3000, () => {
//     console.log("Servidor en http://localhost:3000");
// });

// =======================

let contactos = [];

app.post("/contactos", (req, res) => {
    contactos.push(req.body);
    res.json(req.body);
});

let favoritos = [];

app.post("/favoritos", (req, res) => {
    favoritos.push(req.body);
    res.json({ ok: true });
});