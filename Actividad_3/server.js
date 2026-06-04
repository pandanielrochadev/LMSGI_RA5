const express = require("express");

const convert = require("xml-js")

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


//---------Añadimos funciones

// xml a Json

function getValor(xml, etiqueta)
{
    const inicio = xml.indexOf("<" + etiqueta + ">") + etiqueta.length + 2;
    const final = xml.indexOf("</" + etiqueta + ">");

    return xml.substring(inicio, final);
}

function xmlToJson(xml)
{
    const alumno = {
        id: Number(getValor(xml, "id")),
        nom: getValor(xml, "nom"),
        edat: Number(getValor(xml, "edat")),
        curs: getValor(xml, "curs")
    };

    return alumno;
}


// Json a xml

function jsonToXML(json)
{
    return "<alumne>\n" +
           "    <id>" + json.id + "</id>\n" +
           "    <nom>" + json.nom + "</nom>\n" +
           "    <edat>" + json.edat + "</edat>\n" +
           "    <curs>" + json.curs + "</curs>\n" +
           "</alumne>";
}

//librerias nuevas 
function xmlToJsonLibreria(xml)
{
    return convert.xml2json(xml, {
        compact: true,
        spaces: 4
    });
}

function jsonToXmlLibreria(json)
{
    return convert.json2xml(json, {
        compact: true,
        spaces: 4
    });
}

// -----

app.post("/xmlToJsonLibreria", (req, res) => {
    const { data } = req.body;

    const result = xmlToJsonLibreria(data);

    res.json({ result });
});

app.post("/jsonToXmlLibreria", (req, res) => {
    const { data } = req.body;

    const result = jsonToXmlLibreria(data);

    res.json({ result });
});


// endpoint d'exemple
//---------Cambiamos el endpoint
app.post("/jsonToXml", (req, res) => {
    const { data } = req.body;

    const objetoJson = JSON.parse(data);

    const result = jsonToXML(objetoJson);

    res.json({ result });
});

//  funcion implementada segun el enunciado
// No utilizado actualmente dede la inferficie
app.post("/xmlToJson", (req, res) => {
    const { data } = req.body;

    const result = xmlToJson(data);

    res.json({
        result: JSON.stringify(result, null, 4)
    });
});

// Consulta la PokeAPI a partir del nombre introducid por el usuario
// devuelve JSON original y tambien una version convertida a XML

app.post("/convertPokemon" , async (req, res) =>{
    const name = req.body.data;

    // Realizamos una peticion a la API de Pokemon
    const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + name);

    const pokemonJson = await response.json();

    //Convertimos el JSON recibido a formato XML utilizando xml-js
    const pokemonXml = convert.js2xml(pokemonJson, {
        compact: true,
        spaces: 4
    });

    res.json({
        result: pokemonJson,
        xml: pokemonXml
    });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});
