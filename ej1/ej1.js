const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.send(`Servidor levantado en el puerto ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto ${PORT}`);
});
