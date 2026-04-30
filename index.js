const express = requiere('express');
const app = express();
const port = 2026;
app.use(express.json());

app.listen(port, () => {
    console.log("Servidor abierto");
})




