const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();
app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require materie prime routes
const materiePrimeRoutes = require('./src/materieprime/materie-prime.routes');
const tipoPortateRoutes = require('./src/tipoportate/tipoportate.routes');
const versionePortateRoutes = require('./src/versioneportate/versioneportate.routes');
const portateRoutes = require('./src/portate/portate.routes');
const bomRoutes = require('./src/distintebase/distinte-base.routes');
const optionsRoutes = require('./src/options/options.routes');

const menuRoutes = require('./src/menu/menu.routes');
const menuStrutturaRoutes = require('./src/menustruttura/menu-struttura.routes');

const clientiRoutes = require('./src/clienti/clienti.routes');
const scuoleRoutes = require('./src/scuole/scuole.routes');
const ordinescuolaRoutes = require('./src/ordinescuola/ordine-scuola.routes');
const plessiRoutes = require('./src/plessi/plessi.routes');
const turniRoutes = require('./src/turni/turni.routes');

// using as middleware
app.use('/api/v1/materieprime', materiePrimeRoutes);
app.use('/api/v1/distintebase', bomRoutes);
app.use('/api/v1/opzioni', optionsRoutes);
app.use('/api/v1/tipoportate', tipoPortateRoutes);
app.use('/api/v1/versioneportate', versionePortateRoutes);
app.use('/api/v1/portate', portateRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/menustruttura', menuStrutturaRoutes);


app.use('/api/v1/clienti', clientiRoutes);
app.use('/api/v1/scuole', scuoleRoutes);
app.use('/api/v1/ordinescuola', ordinescuolaRoutes);
app.use('/api/v1/plessi', plessiRoutes);
app.use('/api/v1/turni', turniRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});