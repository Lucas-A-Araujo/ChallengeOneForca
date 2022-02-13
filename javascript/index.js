var charadas = [
	{ charada: 'Já dei muitas voltas, porem não sai do lugar. O que eu sou?', resposta: "RELOGIO" },
	{ charada: 'A mãe de Mary teve quatro filhos. Abril, Maio e Junho foram os três primeiros. Qual o nome da 4ª criança?', resposta: "MARY" },
	{ charada: 'Tenho rabo, mas não sou cão; Não tenho asas, mas sei voar; Se me largarem, não subo, mas saio ao vento a brincar. Quem sou eu?', resposta: "PIPA" },
	{ charada: 'Eu sou seu irmão, mas você não é meu irmão. O que você é de mim?', resposta: "IRMA" },
	{ charada: 'Subindo o sol vai se encurtando, descendo o sol vai se alongando. O que é?', resposta: "SOMBRA" },
	{ charada: 'Tenho coroa, mas não sou rei; tenho espinhos, mas não sou peixe. O que eu sou?', resposta: "ABACAXI" },
	{ charada: 'Tem chapéu, mas não tem cabeça; tem boca, mas não fala; tem asa, mas não voa. O que é?', resposta: "BULE" },
	{ charada: 'De dia fico no céu e de noite fico na água. O que eu sou? ', resposta: "DENTADURA" },
	{ charada: 'Eu falo, mas não tenho boca. Eu ouço, mas não tenho ouvidos. Não tenho corpo, mas vivo com o vento. Quem sou eu?', resposta: "ECO" },
	{ charada: 'Quando precisa de mim, você me atira para longe, até um lugar onde ninguém pode me ver. Mas quando já não precisa mais, você me traz de volta. Quem sou eu?', resposta: "ANCORA" },
	{ charada: 'Nós podemos machucar sem fazer um único movimento. Podemos envenenar sem tocar. Carregamos a verdade e a mentira. E não devemos ser julgadas pelo nosso tamanho Quem somos nós?', resposta: "PALAVRAS" },
	{ charada: 'Ponha os dedos nos meus olhos que eu abrirei as minhas potentes mandíbulas. E vou devorar tudo o que vier pela frente: roupas, penas, papéis. Quem sou eu?', resposta: "TESOURA" },
	{ charada: 'Eu posso guardar tudo dentro de mim. Tudo o que você pode imaginar: o vento, as florestas, o mundo, o universo e até Deus. Tudo o que vier à sua cabeça você pode encontrar dentro de mim. Quem sou eu?', resposta: "ALFABETO" }
]

let enigma = {};
let toleranciaErros = 6;
let erros = 0;
let chutes = [];
let palavraEstado = null;
const desenhos = [
  'forca', 
  'cabeca', 
  'corpo', 
  'bracoDieito', 
  'bracoEsquerdo',
  'pernaDireita',
  'PernaEsquerda',
]

let Desenho = (part) => {
  switch (part) {
     case 'forca' :
       context.strokeStyle = '#222';
       context.lineWidth = 5; 
       context.beginPath();
       context.moveTo(175, 225);
       context.lineTo(5, 225);
       context.moveTo(35, 225);
       context.lineTo(35, 5);
       context.lineTo(100, 5);
       context.lineTo(100, 25);
       context.stroke();
       break;

     case 'cabeca':
       context.lineWidth = 5;
       context.beginPath();
       context.arc(100, 50, 25, 0, Math.PI*2, true);
       context.closePath();
       context.stroke();
       break;
     
     case 'corpo':
       context.beginPath();
       context.moveTo(100, 75);
       context.lineTo(100, 140);
       context.stroke();
       break;

     case 'bracoDieito':
       context.beginPath();
       context.moveTo(100, 85);
       context.lineTo(60, 100);
       context.stroke();
       break;

     case 'bracoEsquerdo':
       context.beginPath();
       context.moveTo(100, 85);
       context.lineTo(140, 100);
       context.stroke();
       break;

     case 'pernaDireita':
       context.beginPath();
       context.moveTo(100, 140);
       context.lineTo(80, 190);
       context.stroke();
       break;

     case 'PernaEsquerda':
       context.beginPath();
       context.moveTo(100, 140);
       context.lineTo(125, 190);
       context.stroke();
     break;
  } 
}

const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");

recomecarForca = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function escolherPalavra() {
  enigma = charadas[Math.floor(Math.random() * charadas.length)];
  document.getElementById('charada').innerHTML = enigma.charada;
  Desenho(desenhos[erros])
}

function verificarLetra(letra) {
  chutes.indexOf(letra) === -1 ? chutes.push(letra) : null;
  document.getElementById(letra).setAttribute('disabled', true);

  if (enigma.resposta.indexOf(letra) >= 0) {
    palavraCharada();
    verificarVitoria();
  } else if (enigma.resposta.indexOf(letra) === -1) {
    erros++;
    atualizarErros();
    verificarDerrota();
    atualizarDesenho();
  }
}

function atualizarDesenho() {
  Desenho(desenhos[erros])
}

function verificarVitoria() {
  if (palavraEstado === enigma.resposta) {
    document.getElementById('charada').innerHTML = 'Você venceu. Parabens!';
    recomecarForca()
  }

}

function verificarDerrota() {
  if (erros === toleranciaErros) {
    document.getElementById('marcacao').innerHTML = 'A resposta era: ' + enigma.resposta;
    document.getElementById('charada').innerHTML = 'Fim de jogo';
  }

}

function palavraCharada() {
  palavraEstado = enigma.resposta.split('').map(letter => (chutes.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('marcacao').innerHTML = palavraEstado;
}

function atualizarErros() {
  document.getElementById('erros').innerHTML = erros;
}

function reset() {
  erros = 0;
  chutes = [];

  let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for(let i=0; i<letras.length; i++) {
    document.getElementById(letras[i]).disabled = false
  }

  recomecarForca()
  escolherPalavra();
  palavraCharada();
  atualizarErros();
}

function generateButtons() {
  let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letra =>
    `
      <button
        class="button button-lg button-primary margin-2"
        id='` + letra + `'
        onClick="verificarLetra('` + letra + `')"
      >
        ` + letra + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

document.getElementById('toleranciaErros').innerHTML = toleranciaErros;

function iniciar(){
  generateButtons();
  escolherPalavra();
  palavraCharada();

}