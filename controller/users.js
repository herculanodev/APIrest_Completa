const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/users'); // Importe o modelo

// Função cifrarSenha
function cifrarSenha(senha, salto) {
  const hash = crypto.createHmac('sha512', salto);
  hash.update(senha);
  return hash.digest('hex');
}

// Função gerarToken
function gerarToken(payload) {
  const expiresIn = 120;
  try {
    return jwt.sign(payload, process.env.SEGREDO, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar token');
  }
}

// Função assíncrona criar
async function criar(req, res) {
  const salto = crypto.randomBytes(16).toString('hex');
  const senhaCifrada = cifrarSenha(req.body.senha, salto);
  try {
    const novoUsuario = await Usuario.create({ email: req.body.email, senha: senhaCifrada, salto });
    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

// Função assíncrona entrar
async function entrar(req, res) {
  try {
    const usuarioEncontrado = await Usuario.findOne({ email: req.body.email });
    if (usuarioEncontrado) {
      const senhaCifrada = cifrarSenha(req.body.senha, usuarioEncontrado.salto);
      if (senhaCifrada === usuarioEncontrado.senha) {
        return res.json({ token: gerarToken({ email: req.body.email }) });
      }
    }
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao tentar entrar' });
  }
}

// Exportar as funções criar e entrar
module.exports = { criar, entrar };
