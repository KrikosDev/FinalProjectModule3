const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const uri = "mongodb+srv://adam:2usoSfm3edko1qzr@cluster0.l9yt0.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});