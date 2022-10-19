$(document).ready(function(){

  //////////////////////////////////////////////////////////////////
  // HEADER DINÂMICO
  // Mostra header somente no início da página.
  // Descomentar caso utilizada a classe .header-dinamico. Caso contrário, deletar.

    $(window).scroll(function(){
      var nav = $(".header-dinamico .container");
      var scroll = $(window).scrollTop();
      if(scroll == 0){
        nav.fadeIn();
      } else {
        nav.fadeOut();
      }
    });

  //////////////////////////////////////////////////////////////////

  // Seu código abaixo

})


function escolherNumeros(){
  let numero1 = document.querySelector('#num1').value;
  let numero2 = document.querySelector('#num2').value; 
  let metodoGelosiaContainer = document.querySelector('.gelosia-container');
  let buttonChoice = document.querySelector('.button-escolha-nums');
  let inputArea = document.querySelector('.inputs-box');
  let metodoContainer = document.querySelector('.gelosia-container');
  let areaMetodo = document.querySelector('.area-gelosia-container');

  objeto.numeroVertical   = numero1;
  objeto.numeroHorizontal = numero2;
  let horizontal          = numero2.length;
  let vertical            = numero1.length;

  if(numero1 !== "" && numero2 !== ""){

    areaMetodo.style.marginLeft = vertical + "%";

    //Varre as linhas da "tabela"
    for (let linha = 0; linha < horizontal+2; linha++) {
      //Primeira linha.
      if(linha === 0){
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('',''))
        for (let coluna = 0; coluna < vertical; coluna++){
          //Preenche com o primeiro número, e coloca vazio na última célula.
          p = criaParagrafosProsCantos(numero1[coluna], 'resultado_cima_' + (coluna + 1))
          if(coluna == 0){
            p.classList.add('marcado')
          }
          metodoGelosiaContainer.appendChild(p)
        }
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('',''))
      }
      //Linhas do meio
      else if(linha < horizontal + 1){
        let lateral = criaParagrafosProsCantos('','lateral_' + (linha))
        metodoGelosiaContainer.appendChild(lateral)
        //Varre as colunas da "tabela" para as demais linhas.
        for (let coluna = 0; coluna < vertical; coluna++){
          //Cria caixas para a tabela, e insere no último elemento um parágrafo vazio.
          let idDiagCima  = 'linha_' + linha + '_coluna_' + (coluna+1) + '_cima';
          let idDiagBaixo = 'linha_' + linha + '_coluna_' + (coluna+1) + '_baixo';
          let idDiagFundoCima = 'linha_' + linha + '_coluna_' + (coluna+1) + '_cimaFundo';
          let idDiagFundoBaixo = 'linha_' + linha + '_coluna_' + (coluna+1) + '_baixoFundo';
          let fundoCima = document.createElement('span');
          fundoCima.classList.add('fundo-somas-cima');
          fundoCima.setAttribute('id', `${idDiagFundoCima}`);
          let fundoBaixo = document.createElement('span');
          fundoBaixo.classList.add('fundo-somas-baixo');
          fundoBaixo.setAttribute('id', `${idDiagFundoBaixo}`);
          objeto.ids.push(idDiagCima)
          objeto.ids.push(idDiagBaixo)
          let elemento = criaElementoBox('linha_' + linha + '_coluna_' + coluna, idDiagCima, idDiagBaixo)
          elemento.appendChild(fundoCima);
          elemento.appendChild(fundoBaixo);
          metodoGelosiaContainer.appendChild(elemento);
        }
        let ultimo = criaParagrafosProsCantos(numero2[linha-1], 'resultado_direita_' + (linha))
        if(linha == 1){
          ultimo.classList.add('marcado')
        }
        metodoGelosiaContainer.appendChild(ultimo)           
      }
      //Última linha.
      else{
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('',''))
        for (let coluna = 1; coluna < vertical+2; coluna++){
          metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('','coluna_baixo_'+coluna))
        }
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('',''))            
      }
    }
    metodoGelosiaContainer.style.width = retornaTamanhoBoxGelosia(vertical)
    escondeElementos([inputArea,buttonChoice,metodoContainer])
    revelaFlexElementos([metodoContainer])
    areaMetodo.appendChild(criaControls(objeto.getDigitoNumero(false, 1),objeto.getDigitoNumero(true, 1)));
  }else{
    alert('preencher')
  }
}
let criaElementoBox = function(boxId, numberId, numberId2){
    let box = document.createElement("div");
    box.classList.add('gelosia-box');
    box.setAttribute('id', `box_${boxId}`);

    let spanFirstNumber = document.createElement("span");
    spanFirstNumber.classList.add('gelosia-span1');
    spanFirstNumber.setAttribute('id', `span_${numberId}`);

    let spanSecondNumber = document.createElement("span");
    spanSecondNumber.classList.add('gelosia-span2');
    spanSecondNumber.setAttribute('id', `span_${numberId2}`);

    let risquinho = document.createElement("span");
    risquinho.classList.add('division-box');

    box.appendChild(spanFirstNumber);
    box.appendChild(spanSecondNumber);
    box.appendChild(risquinho);

    return box;
}
let retornaTamanhoBoxGelosia = function (horizontal){
  let largura = ''
  if(horizontal === 1){
    largura = "230px";//230px
  }else if(horizontal === 2){
    largura = "310px";//310px
  }else if(horizontal === 3){
    largura = "390px";//390px
  }
  return(largura)
}
let escondeElementos = function(elementos){
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style.display = 'none';
  }
}
let revelaFlexElementos = function(elementos){
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style.display = 'flex';
  }
}
let criaParagrafosProsCantos = function(innerHTML,id){
  let p = document.createElement('p')
  p.innerHTML = innerHTML
  p.classList.add('paragrafo_da_caixa')
  p.id = id
  return(p)
}
let dinamicaLateral = function(valor){
    let resto  = valor % 10
    let dezena = Math.floor(valor/10)
    let anterior = objeto.getCenaDoSegundoAto() - 1
    let atual = objeto.getCenaDoSegundoAto()
    let lateralAnt   = document.getElementById('lateral_' + anterior)
    let lateralAtual = document.getElementById('lateral_' + atual)
    let somaString = lateralAnt.innerHTML + "+" + dezena.toString()
    let somaNum = 0
    lateralAnt.classList.add('marcado')
    lateralAtual.classList.add('marcado')
    let lateralAntAnt = document.getElementById('lateral_' + (anterior - 1))
    setTimeout(() => {
      lateralAnt.innerHTML  = somaString
      somaNum = parseInt(lateralAnt.innerHTML[0]) + parseInt(lateralAnt.innerHTML[2])
    }, "1500")
    setTimeout(() => {
      lateralAnt.innerHTML  = somaNum
    }, "3000")
    setTimeout(() => {
      lateralAtual.innerHTML = resto
      // revelaAvanca()
      // revelaInput()
      removeAllMarcados()
    }, "4500")
}
let dinamicaColunaBaixo = function(valor){
  let resto  = valor % 10
  let dezena = Math.floor(valor/10)
  let anterior = objeto.getCenaDoSegundoAto() - objeto.nColunas() - 1
  let atual = objeto.getCenaDoSegundoAto() - objeto.nColunas()
  let colunaAtual = document.getElementById('coluna_baixo_' + atual)

  if(atual > 1){
    let colunaAnterior = document.getElementById('coluna_baixo_' + anterior)
    
    colunaAnterior.classList.add('marcado')
    colunaAtual.classList.add('marcado')
    setTimeout(() => {
      let somaString = colunaAnterior.innerHTML + "+" + dezena.toString()
      colunaAnterior.innerHTML = somaString
    }, "1500")
    setTimeout(() => {
      let somaNum = parseInt(colunaAnterior.innerHTML[0]) + parseInt(colunaAnterior.innerHTML[2])
      colunaAnterior.innerHTML = somaNum
    }, "3000")
    setTimeout(() => {
      colunaAtual.innerHTML = resto
      // revelaAvanca()
      // revelaInput()
      removeAllMarcados()
    }, "4500")
  }
  else{
    let ultimaLinha = document.getElementById('lateral_' + objeto.nLinhas())
    colunaAtual.classList.add('marcado')
    ultimaLinha.classList.add('marcado')
    setTimeout(() => {
      ultimaLinha.innerHTML = ultimaLinha.innerHTML + "+" + dezena.toString()
    }, "1500")
    setTimeout(() => {
      ultimaLinha.innerHTML = parseInt(ultimaLinha.innerHTML[0]) + parseInt(ultimaLinha.innerHTML[2])
    }, "3000")
    setTimeout(() => {
      colunaAtual.innerHTML = resto
      removeAllMarcados()
      // revelaAvanca()
      // revelaInput()
    }, "4500")
  }
}
let atualizaSpan1 = function(e){
  document.querySelector('#controleNum-1').innerHTML = e
}
let atualizaSpan2 = function(e){
  document.querySelector('#controleNum-2').innerHTML = e
}
let zeraInput = function(){
  document.querySelector('.input-num-control').value = ''
}
let criaControls = function(numero1, numero2){
  let boxControls = document.createElement("div");
  boxControls.classList.add('box-controls');

  let areaControls = document.createElement("div");
  areaControls.classList.add('area-controls');

  let spanNum1 = document.createElement("span");
  spanNum1.classList.add('controleNum');
  spanNum1.id = 'controleNum-1'
  spanNum1.innerHTML = numero1;

  let spanNum2 = document.createElement("span");
  spanNum2.classList.add('controleNum');
  spanNum2.id = 'controleNum-2'
  spanNum2.innerHTML = numero2;

  let spanMult = document.createElement("span");
  spanMult.classList.add('controleMult');
  spanMult.innerHTML = "X";

  areaControls.appendChild(spanNum1);
  areaControls.appendChild(spanMult);
  areaControls.appendChild(spanNum2);

  let controlInput = document.createElement("input");
  controlInput.autocomplete = 'off'
  controlInput.id = 'controlInput'
  controlInput.classList.add('input-num-control');
  controlInput.setAttribute('type', 'text');
  controlInput.setAttribute('maxlength', '2');
  controlInput.setAttribute('id', 'numControl');

  let areaIconControl = document.createElement("span");

  let iconControl = document.createElement("i");
  iconControl.id = 'btnAvanca'
  iconControl.addEventListener('click', avanca)
  iconControl.classList.add('fa');
  iconControl.classList.add('fa-angle-right');

  areaIconControl.appendChild(iconControl);

  let quebraLinha = document.createElement("br");

  boxControls.appendChild(areaControls);
  boxControls.appendChild(controlInput);
  boxControls.appendChild(quebraLinha);
  boxControls.appendChild(areaIconControl);
  objeto.cena++

  return boxControls;
}
let limpaAreaControls = function(){
  let controls = document.querySelector('.area-controls')
  controls.innerHTML = ''
}
let removeAllMarcados = function(){
  let marcados = document.querySelectorAll('.marcado')
  let marcadosCopy = [...marcados];
  marcadosCopy.forEach(element => {
    element.classList.remove('marcado')
  });
}
let marcadoTimeOut = function(elemento, tempo){
  setTimeout(() => {
    elemento.classList.add('marcado')
  }, tempo)
}
let escondeAvanca = function(){
  let btn = document.querySelector('#btnAvanca')
  btn.style.display = 'none'
}
let revelaAvanca = function(){
  let btn = document.querySelector('#btnAvanca')
  btn.style.display = 'flex'
}
let escondeInput = function(){
  let input = document.querySelector('#numControl')
  input.style.display = 'none'
}
let revelaInput = function(){
  let input = document.querySelector('#numControl')
  input.style.display = 'flex'
}
