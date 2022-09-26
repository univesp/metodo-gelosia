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

let objeto = {
  cena: 0,
  numeroVertical: 0,
  numeroHorizontal: 0,
  ids: [],
  idsDiagonais: [
    ['span_linha_1_coluna_1_cima'],
    ['span_linha_1_coluna_2_cima' ,'span_linha_1_coluna_1_baixo','span_linha_2_coluna_1_cima' ],
    ['span_linha_1_coluna_3_cima' ,'span_linha_1_coluna_2_baixo','span_linha_2_coluna_2_cima' ,'span_linha_2_coluna_1_baixo','span_linha_3_coluna_1_cima' ],
    ['span_linha_1_coluna_3_baixo','span_linha_2_coluna_3_cima' ,'span_linha_2_coluna_2_baixo','span_linha_3_coluna_2_cima' ,'span_linha_3_coluna_1_baixo'],
    ['span_linha_2_coluna_3_baixo','span_linha_3_coluna_3_cima' ,'span_linha_3_coluna_2_baixo'],
    ['span_linha_3_coluna_3_baixo'],  
  ],
  somaDiagonal : function(n){
    let soma = 0
    for (let i = 0; i < this.idsDiagonais[n-1].length; i++) {
      let id = this.idsDiagonais[n-1][i];
      let elemento = document.getElementById(id)
      if(document.body.contains(elemento)){
        soma += parseInt(elemento.innerHTML)
      }
    }
    return(soma)
  },
  coloreDiagonal : function(n){
    for (let i = 0; i < this.idsDiagonais[n-1].length; i++) {
      let id = this.idsDiagonais[n-1][i];
      let elemento = document.getElementById(id)
      if(document.body.contains(elemento)){
        elemento.style.backgroundColor = 'red'
      }
    }
  },
  descoloreTodasAsDiagonais : function(){
    for (let i = 0; i < 6; i++) {
      let diagonal = this.idsDiagonais[i];
      for (let j = 0; j < diagonal.length; j++) {
        let id = diagonal[j];
        let elemento = document.getElementById(id)
        if(document.body.contains(elemento)){
          elemento.style.backgroundColor = 'white'
        }
      }
    }
  },
  preencheSpansDiagonal : function(n){
    let areaControls = document.querySelector('.area-controls')
    for (let i = 0; i < this.idsDiagonais[n-1].length; i++) {
      let id = this.idsDiagonais[n-1][i];
      let elemento = document.getElementById(id)
      if(document.body.contains(elemento)){
        let valor = elemento.innerHTML;
        let span = document.createElement('span')
        span.innerHTML = valor
        span.classList.add('controleNum')
        areaControls.appendChild(span)
        let simboloMais = document.createElement('span')
        simboloMais.classList.add('controleMult')
        simboloMais.innerHTML = '+'
        areaControls.appendChild(simboloMais)
      }
    }
    areaControls.removeChild(areaControls.lastElementChild);
  },
  getDigitoNumero : function(vertical, digito){
    let number = ''
    if(vertical)
      number = this.numeroHorizontal.toString()
    else
      number = this.numeroVertical.toString()
    return(number[digito-1])
  },
  multiplicacaoConformeCena : function(){
    let linha = this.nQualLinhaEstou()
    let coluna = this.nQualColunaEstou()
    let valor1 = parseInt(this.numeroHorizontal.toString()[linha-1])
    let valor2 = parseInt(this.numeroVertical.toString()[coluna-1])
    return(valor1*valor2)
  },
  atualizaSpans: function(){
    let qualLinhaEstou  = this.nQualLinhaEstou()
    let qualColunaEstou = this.nQualColunaEstou()
    atualizaSpan1(parseInt(this.numeroVertical.toString()[qualColunaEstou-1]))
    atualizaSpan2(parseInt(this.numeroHorizontal.toString()[qualLinhaEstou-1]))
  },
  verificaFimDo1Ato: function(){
    return ((this.cena-1) < this.getNumeroDeCelulas())
  },
  getNumeroDeCelulas: function(){
    let digitoHorizontal = this.numeroVertical.toString().length
    let digitoVertical = this.numeroHorizontal.toString().length
    return(digitoHorizontal*digitoVertical)
  },
  getNumeroDeDiagonais: function(){
    let linha  = this.numeroVertical.toString().length
    let coluna = this.numeroHorizontal.toString().length
    let nDiagonais = 0
    nDiagonais = linha == coluna ? 2*linha : Math.max(linha,coluna)+1
    return(nDiagonais)
  },
  nLinhas: function(){
    return(this.numeroVertical.toString().length)
  },
  nColunas: function(){
    return(this.numeroHorizontal.toString().length)
  },
  nQualColunaEstou: function(){
    let coluna = 0
    if(this.cena % this.numeroVertical.toString().length == 0){
      coluna = this.numeroVertical.toString().length
    }
    else{
      coluna = this.cena % this.numeroVertical.toString().length
    } 
    return(coluna)
  },
  nQualLinhaEstou: function(){
    let linha = 0
    if(this.cena % this.numeroVertical.toString().length == 0){
      linha = this.cena / this.numeroVertical.toString().length
    }
    else{
      linha = Math.ceil(this.cena/this.numeroVertical.toString().length)
    }
    return(linha) 
  },
  getCenaDoSegundoAto : function(){
    return(this.cena - this.getNumeroDeCelulas())
  }
}
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
          p = criaParagrafosProsCantos(numero1[coluna])
          metodoGelosiaContainer.appendChild(p)
        }
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('',''))
      }
      //Linhas do meio
      else if(linha < horizontal + 1){
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos('','lateral_' + (linha)))
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
        metodoGelosiaContainer.appendChild(criaParagrafosProsCantos(numero2[linha-1]))           
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
let avanca = function(){
  let input = document.querySelector('.input-num-control')
  let valor = input.value
  if(objeto.verificaFimDo1Ato()){
    let letra = ''
    let primeiroTriangulo = document.querySelector('#span_' + objeto.ids[2*(objeto.cena-1)]) 
    let segundoTriangulo = document.querySelector('#span_' + objeto.ids[2*(objeto.cena-1)+1]) 
    if(valor < 10){
      letra = '0' + valor;
    }
    else{
      letra = valor.toString();
    }
    if(objeto.multiplicacaoConformeCena() != valor){
      alert('Valor está errado')
      return 0
    }
    zeraInput()
    primeiroTriangulo.innerHTML = letra[0]
    segundoTriangulo.innerHTML = letra[1]
    objeto.cena++;
    if(objeto.verificaFimDo1Ato()){
      objeto.atualizaSpans();
    }
    else{
      let cenaDoSegundoAto = objeto.cena - objeto.getNumeroDeCelulas()
      objeto.descoloreTodasAsDiagonais()
      objeto.descoloreTodasAsDiagonais()
      objeto.coloreDiagonal(cenaDoSegundoAto)
      limpaAreaControls()
      objeto.preencheSpansDiagonal(cenaDoSegundoAto)
    }
  }
  else{
    if(objeto.getNumeroDeDiagonais() >= objeto.getCenaDoSegundoAto()){
      if(objeto.somaDiagonal(objeto.getCenaDoSegundoAto()) != valor){
        alert('Valor está errado')
        return 0
      }
      if(objeto.getCenaDoSegundoAto() <= objeto.nColunas()){
        let elemento = document.getElementById('lateral_' + objeto.getCenaDoSegundoAto())
        elemento.innerHTML = valor
      }
      else{
        let id = objeto.getCenaDoSegundoAto() - objeto.nColunas()
        let elemento = document.getElementById('coluna_baixo_' + id)
        elemento.innerHTML = valor
      }
      objeto.descoloreTodasAsDiagonais()
      objeto.cena++
      if(objeto.getNumeroDeDiagonais() >= objeto.getCenaDoSegundoAto()){
        limpaAreaControls()
        objeto.preencheSpansDiagonal(objeto.getCenaDoSegundoAto())
        objeto.coloreDiagonal(objeto.getCenaDoSegundoAto())
        zeraInput()
      }
      else{
        zeraInput()
        limpaAreaControls()
        alert('ACABOU - VERIFICAR O QUE OCORRE AGORA')
      }

    }
    else{
      console.log('acabou')
    }

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
  controlInput.classList.add('input-num-control');
  controlInput.setAttribute('type', 'text');
  controlInput.setAttribute('maxlength', '2');
  controlInput.setAttribute('id', 'numControl');

  let areaIconControl = document.createElement("span");

  let iconControl = document.createElement("i");
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

