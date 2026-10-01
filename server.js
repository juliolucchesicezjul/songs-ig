// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  { id: 1, nome: "Linkin Park", pais: "Estados Unidos" },
  { id: 2, nome: "I Prevail", pais: "Estados Unidos" },
  { id: 3, nome: "Billie Eilish", pais: "Estados Unidos" },
];

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----
const musicas = [
  { id: 1, titulo: "In the End", artistaId: 1, duracao: "210" },
  { id: 2, titulo: "A Line in the Sand", artistaId: 1, duracao: "450" },
  { id: 3, titulo: "There's Fear in Letting Go", artistaId: 2, duracao: "280" },
  { id: 4, titulo: "Bow Down", artistaId: 2, duracao: "240" },
  { id: 5, titulo: "L´AMOUR DE MA VIE", artistaId: 3, duracao: "300" },
  { id: 6, titulo: "Happier Than Ever", artistaId: 3, duracao: "360" },
];

// 1) LISTAR ARTISTAS
app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// 2) LISTAR MUSICAS (juntando cada musica com o seu artista)
app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);

    return {
      id: m.id,
      titulo: m.titulo,
      duracao: Number(m.duracao),
      artista: artista ? artista.nome : "desconhecido",
      pais: artista ? artista.pais : "desconhecido",
    };
  });

  res.status(200).json(resultado);
});
app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doartista = musicas.filter((m) => m.artistaId === id);
  res.status(200).json(doartista);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


