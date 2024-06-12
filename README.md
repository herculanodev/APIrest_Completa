# APIrest_CompletaPrática 10

1. Configurar o VSCode para a realização da prática.

a) Abra o aplicativo VSCode. Certifique-se de estar na pasta onde deseja clonar o repositório (ex:. Documents).

b) Clone o seu repositório backend do GitHub, utilizando o terminal do VSCode. Caso o repositório já exista no seu computador, atualize-o com o repositório remoto.  

c) Abra a pasta do repositório clonado no VSCode.

d) Clique com o botão direito sobre a pasta praticas e abra um terminal integrado.

e) No terminal do VSCode, alterne para a ramificação develop. Se não existir, crie essa ramificação e faça um merge com a ramificação main.


2. Criar um projeto Express para uma API REST.

a) Inicie um novo projeto Express usando o comando npx express-generator --no-view pratica10 no terminal do VSCode. Caso apresente erro, execute o comando npm install express-generator e tente novamente.

b) Acesse a pasta do projeto recém-criado digitando o comando cd pratica10 no terminal e instale as dependências do projeto executando o comando npm install.

c) Instale os pacotes mongoose e dotenv para integrar a api com o banco de dados usando o comando npm install mongoose dotenv.

d) Instale os pacotes swagger-ui-express e yaml para facilitar a documentação da api usando o comando npm install swagger-ui-express yaml.

e) Instale o pacote jsonwebtoken para implementar a segurança da api usando o comando npm install jsonwebtoken. 

f) Instale o pacote nodemon para facilitar o desenvolvimento da api usando o comando npm install --save-dev nodemon.

g) Remova a pasta public e crie as pastas controllers, models e middlewares na pasta pratica10. Remova o arquivo index.js da pasta routes.

h) Adicione os arquivos .env e swagger.yaml na pasta pratica10. Adicione o arquivo auth.js na pasta middlewares. Adicione o arquivo apidocs.js na pasta routes. Adicione o arquivo users.js nas pastas controllers e models.

i) Abra o arquivo package.json no VS Code e insira os scripts “dev”: “nodemon -e yaml,js ./bin/www”. 

j) Abra o arquivo .env e acrescente a constante MONGODB_URL contendo a url de conexão ao banco de dados loja hospedado no MongoDB Altas, e a constante SEGREDO contendo a senha de autenticação do JWT.

k) Abra o arquivo swagger.yaml e crie a estrutura de um Swagger Document.
openapi: 3.0.0
info:
  title: API Segurança
  version: 0.1
tags:
  - name: usuarios
paths:
  /usuarios:
  /usuarios/login:
  /usuarios/renovar:
components:
  schemas:
  securitySchemes:

l) Abra o arquivo apidocs.js da pasta routes e importe os pacotes express, swagger-ui-express, fs e yaml.

m) Crie uma instância de Router a partir da função express().

n) Crie uma instância de File a partir da função fs.readFileSync() que recebe como parâmetros o arquivo ./swagger.yaml e a codificação utf-8.

o) Crie uma instância de SwaggerDocument a partir da função YAML.parse() que recebe como parâmetro a instância de File.

p) Faça a instância de Router usar a função swaggerUI.serve na URL /.

q) Faça a instância de Router responder ao método GET na URL /, devendo chamar a função swaggerUI.setup() que recebe como parâmetro a instância do SwaggerDocument.

r) Exporte a instância de Router para outros módulos do projeto.

s) Abra o arquivo app.js e ajuste o arquivo removendo as linhas de código desnecessárias para o desenvolvimento da API (linhas 2, 6, 15 e 17).

t) Importe o pacote dotenv para carregar as configurações do arquivo .env e o pacote do mongoose para criar uma conexão com o banco de dados.

u) Chame o método mongoose.connect() passando a variável de ambiente MONGODB_URL.

v) Importe o middleware de rotas chamado routerApidocs do arquivo ./routes/apidocs.js.

w) Faça a instância da aplicação Express usar o middleware routerApidocs na URL /api-docs.

x) No terminal do VSCode inicie a execução do projeto usando o comando npm run dev.

y) Abra o navegador e acesse a URL http://localhost:3000/api-docs. Verifique se está exibindo a página de documentação da API.


3. Criar o endpoint POST /usuarios para uma API REST.

a) Abra o arquivo users.js da pasta routes e apague o middleware de rota GET /.

b) Importe o arquivo users.js da pasta controllers na constante controller.

c) Faça a instância de Router responder ao método POST na URL / chamando a função controller.criar

d) Abra o arquivo users.js da pasta controllers e importe os pacotes crypto e jsonwebtoken.

e) Declare uma função crifarSenha() contendo os parâmetros senha e salto. Faça a função declarar a constante hash inicializando com o método crypto.createHmac() com os parâmetros ‘sha512’ e salto, chamar o método hash.update() passando o parâmetro senha como uma string, e retornar a chamada hash.digest() passando o parâmetro ‘hex’.

f) Declare uma função gerarToken() contendo o parâmetro payload. Faça a função declarar a constante expiresIn com o valor 120 e tentar retornar a chamada da função jwt.sign() com os parâmetros payload e process.env.SEGREDO. Caso a função jwt.sign() gere um erro, lance a exceção ‘Erro ao gerar token’.

g) Abra o arquivo users da pasta models e importe o pacote mongoose. Crie um esquema userSchema a partir do construtor mongoose.Schema(). Declare no construtor os atributos email, senha e salto. ambos do tipo String.

h) Exporte uma instância do modelo Mongoose chamado Usuario, com o esquema userSchema, para outros módulos do projeto.

i) Abra o arquivo users da pasta controllers e importe o modelo Usuario do arquivo ../models/users.js.

j) Declare uma função assíncrona criar() contendo os parâmetros req e res. Faça a função declarar a constante salto inicializando com a função crypto.randomBytes(16).toString(‘hex’). declarar a constante senhaCifrada inicializando com a função cifrarSenha() com os parâmetros req.body.senha e salto,  declarar a constante novoUsuario inicializando com a função assíncrona Usuario.create() com o parâmetro {email: req.body.email, senha: senhaCifrada, salto}, e retornar a resposta res.status(201).json(novoUsuario).

k) Exporte a função criar() para os outros módulos do projeto.

l) Abra o arquivo swagger.yaml e adicione o método post para a rota /usuarios.

m) Adicione a tag usuarios para o método post, defina o corpo da requisição contendo um JSON do tipo object com as propriedades email e senha, e a resposta 201 contendo um JSON do esquema Usuario.

n) Dentro de schemas, crie o esquema Usuario do tipo object com as propriedades são email, senha e saldo, ambas do tipo string.

o) Recarregue a página da documentação da API no navegador e teste a chamada ao endpoint POST /usuarios.


4. Criar o endpoint POST /usuarios/login para uma API REST.

a) Abra o arquivo users.js da pasta routes e faça a instância de Router responder ao método POST na URL /login chamando a função controller.entrar.

b) Abra o arquivo users.js da pasta controllers e declare uma função assíncrona entrar() contendo os parâmetros req e res.

c) Faça a função entrar() declarar a constante usuarioEncontrado inicializando com o método assíncrono Produto.findOne() com o parâmetro req.body.email. 

d) Se o usuário é encontrado, declare a constante senhaCifrada inicializando com a função cifrarSenha com os parâmetros req.body.senha e usuarioEncontrado.salto. Senão, retorne a resposta res.status(401).json({ msg: ‘Credenciais inválidas’ }). 

e) Se a senhaCifrada é igual a usuarioEncontrado.senha retorne a resposta res.json({ token: gerarToken({ email: req.body.email }). Senão, retorne a resposta res.status(401).json({ msg: ‘Credenciais inválidas’ }). 

f) Exporte a função entrar() para os outros módulos do projeto.

g) Abra o arquivo swagger.yaml e adicione o método post para a rota /usuarios/login.

h) Adicione a tag usuarios para o método post, defina o corpo da requisição contendo um JSON do tipo object com as propriedades email e senha, e as respostas 201 contendo um JSON do esquema Usuario, e 401 contendo um JSON do esquema Mensagem..

i) Dentro de schemas, crie o esquema Mensagem do tipo object com a propriedade msg do tipo string.

j) Recarregue a página da documentação da API no navegador e teste a chamada ao endpoint POST /usuarios/login.


5. Criar o endpoint POST /usuarios/renovar para uma API REST.

a) Abra o arquivo auth.js da pasta middlewares e importe o pacote jsonwebtoken.

b) Declare uma função verificarToken contendo os parâmetros req, res e next.

c) Faça a função verificarToken() extrair o token do cabeçalho da requisição (Dica: const token = req.headers[‘autorization’].

d) Se existe o token, tente declarar a constante payload inicializando com a função jwt.verify() com os parâmetors token e process.env.SEGREDO, adicionar a req.user o objeto payload e chamar a função next(). Caso a função jwt.verify() gere um erro, lance a resposta res.status(401).({ msg: ‘Token invalido’}).

e) Se não existe o token no cabeçalho da requisição retorne a resposta res.status(400).json({msg: ‘token não informado’});

f) Exporte a função verificarTokeb() para os outros módulos do projeto.

g) Abra o arquivo users.js da pasta routes e importe o arquivo auth.js na constante auth.

h) Faça a instância de Router responder ao método POST na URL /renovar chamando as funções auth.verificarToken e controller.renovar.

i) Abra o arquivo users.js da pasta controllers e declare uma função assíncrona renovar() contendo os parâmetros req e res.

j) Faça a função renovar() retornar a resposta res.json({ token: gerarToken({ email: req.user.email }).

k) Exporte a função renovar() para os outros módulos do projeto.

l) Abra o arquivo swagger.yaml e adicione o método post para a rota /usuarios/renovar.

m) Adicione a tag usuarios para o método post, adicione a segurança JWTAuth e as respostas 200, 400 e 401, ambas contendo um JSON do esquema Mensagem.

n) Dentro de securitySchemas, crie o esquema de segurança JWTAuth do tipo apiKey, com parâmetro authorization no cabeçalho.

o) Recarregue a página da documentação da API no navegador e teste a chamada ao endpoint POST /usuarios/renovar.


6. Subir as modificações no GitHub.

a) Adicionar todas as modificações realizadas no projeto no stage.

b) Crie um novo commit com as modificações adicionadas.

c) Enviar o commit para o branch develop do seu repositório no GitHub.

