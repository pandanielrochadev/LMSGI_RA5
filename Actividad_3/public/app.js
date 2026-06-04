// boton prinicpal
// busca un pokemon, muestra su imagne y ensela XML generado
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convertPokemon", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();

  //console.log(json.result.name);
  //console.log(json.result.sprites.front_default);
  //console.log(json.result.abilities);

  // Creamos dinamicamente una imagen utilizando el sprike de pokemon
  const img = document.createElement("img");

  // Asignamos la URL de la imagen obtenida desde la PokeAPI
  img.src = json.result.sprites.front_default;

  document.body.appendChild(img);

  // añadir habilidades

  let textoHabilidades = "";

  for (const habilidad of json.result.abilities) {

    textoHabilidades += habilidad.ability.name + "\n";
  }

  //alert(textoHabilidades);
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value =
  json.xml;
});


// Segundo boton
// Muestra unicamente las habilidades del Pokemon

const btnHabilidades = document.getElementById("btnHabilidades");

btnHabilidades.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/convertPokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();

  let textoHabilidades = "";

  // Recorremos el array de habilidades y guardamos sus nombres en un texto
  for (const habilidad of json.result.abilities) {
    textoHabilidades += habilidad.ability.name + "\n";
  }

  document.getElementById("output").value = textoHabilidades;

})
