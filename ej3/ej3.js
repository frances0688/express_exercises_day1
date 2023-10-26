const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const items = [
	{
		id: 1,
		nombre: "Taza de Harry Potter",
		precio: 300,
	},
	{
		id: 2,
		nombre: "FIFA 23 PS5",
		precio: 1000,
	},
	{
		id: 3,
		nombre: "Figura Goku Super Saiyan",
		precio: 100,
	},
	{
		id: 4,
		nombre: "Zelda Breath of the Wild",
		precio: 200,
	},
	{
		id: 5,
		nombre: "Skin Valorant",
		precio: 120,
	},
	{
		id: 6,
		nombre: "Taza de Star Wars",
		precio: 220,
	},
];

app.get("/productos", (req, res) => {
	res.send({ description: "Productos", items });
});

app.post("/productos/create", (req, res) => {
	const newProduct = {
		id: items.length + 1,
		nombre: req.body.nombre,
		precio: req.body.precio,
	};
	items.push(newProduct);
	res.status(201).send(items);
});

app.put("/productos/update/:id", (req, res) => {
	const found = items.some(
		(item) => item.id == req.params.id
	);
	if (found) {
		items.forEach((item) => {
			if (item.id == req.params.id) {
				item.nombre = req.body.nombre;
				item.precio = req.body.precio;
			}
		});
		res.send(items);
	} else {
		res
			.status(404)
			.send(
				`El producto con id ${req.params.id} no existe.`
			);
	}
});

app.delete("/productos/delete/:id", (req, res) => {
	const found = items.some(
		(item) => item.id == req.params.id
	);
	if (found) {
		res.send(
			items.filter((item) => item.id != req.params.id)
		);
	} else {
		res
			.status(404)
			.send(
				`El producto con id ${req.params.id} no existe.`
			);
	}
});

app.get("/productos/filtrado", (req, res) => {
	items.some(
		(item) => item.precio >= 50 && item.precio <= 250
	)
		? res.send(
				items.filter(
					(item) => item.precio >= 50 && item.precio <= 250
				)
		  )
		: res
				.status(404)
				.send(
					`No existe un producto de con precio entre 50 y 250.`
				);
});

app.get("/productos/id/:id", (req, res) => {
	items.some((item) => item.id == req.params.id)
		? res.send(
				items.filter((item) => item.id == req.params.id)
		  )
		: res
				.status(404)
				.send(
					`El producto con id ${req.params.id} no existe.`
				);
});

app.get("/productos/price/:precio", (req, res) => {
	items.some((item) => item.precio == req.params.precio)
		? res.send(
				items.filter(
					(item) => item.precio == req.params.precio
				)
		  )
		: res
				.status(404)
				.send(
					`No existe un producto de precio ${req.params.precio}.`
				);
});

app.get("/productos/:nombre", (req, res) => {
	items.some((item) => item.nombre == req.params.nombre)
		? res.send(
				items.filter(
					(item) => item.nombre == req.params.nombre
				)
		  )
		: res
				.status(404)
				.send(
					`No existe un producto de nombre ${req.params.nombre}.`
				);
});

app.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto ${PORT}`);
});
