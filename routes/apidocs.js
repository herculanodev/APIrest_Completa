const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

// Carregar o arquivo swagger.yaml
const swaggerDocument = yaml.parse(fs.readFileSync(path.join(__dirname, '../swagger.yaml'), 'utf8'));

// Configurar a rota para servir a documentação Swagger
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
