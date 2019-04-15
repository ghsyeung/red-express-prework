const express = require("express");
const app = express();
const PORT = process.env.PORT || 3555;

require('./setupAPI')(app);

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`); });
