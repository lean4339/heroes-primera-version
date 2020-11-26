// Require de Express
const express = require("express");

// Require de FS
const fs = require("fs");
const { hrtime } = require("process");

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server corre en puerto 3030'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', function(req,res){
	res.send("Ni Superman, Iron Man o la Mujer Maravilla son tan importantes como las y los heroes de carne y hueso que encontraras en este sitio. Esperamos que ellas y ellos te sirvan como inspiracion para cumplir tus objetivos. Recuerda: Nunca pares de creer en ti!")
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let id = req.params.id;
	let heroe= null;
	for (let i = 0; i < heroes.length; i++){
		if(Number(id)== heroes[i].id){
			heroe= heroes[i] 
		}
	}
	if(heroe !== null){
		res.send(`Hola mi nombre es: ${heroe.nombre} y soy ${heroe.profesion}`)
	}
	else{
		res.send("Que numero pusiste la puta que pario")
	}
	
	// Si se encuentra al héroe se envía el nombre y su profesión
	// Si NO se encuentra se envía el mensaje de no encontrado
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/bio/:id/:ok?', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let id = req.params.id;
	let heroe;
	let ok = req.params.ok
	for (let i = 0; i < heroes.length; i++){
		if(Number(id)== heroes[i].id){
			heroe= heroes[i] 
		}
	}
	if (heroe == null && ok == "undefined"){
		res.send("No se encuentra el heroe")
	}
	switch(true){
		case heroe== null && ok == "undefined":
			res.send("No se encuentra el heroe o la heroina");
			break;
		case heroe== null && ok == "ok":
			res.send("No se encuentra el heroe o la heroina");
			break;
		case heroe !== null && ok !== "ok":
			res.send(`Hola soy ${heroe.nombre} lamento que no desees saber mas de mi`);
			break;
		case heroe !== null && ok == "ok":
			res.send(`Hola soy ${heroe.nombre} y esta es mi historia ${heroe.resenia}`);
			break;
	}
	// Si NO se encuentra al héroe se envía un mensaje
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error
	});

// Ruta Créditos
app.get("/creditos", function(req,res){
	res.send("Bueno lo hice solito solito jaja ")
})

// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});