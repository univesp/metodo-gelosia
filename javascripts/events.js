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
  numeroHorizontal: 0,
  numeroVertical: 0,
  ids:[],
  cena:0,
  getDigitoNumero : function(vertical, digito){
    let number = ''
    
    if(vertical){
      if (this.numeroVertical < 10){
        number = '0' + this.numeroVertical;
      }
      else{
        number = this.numeroVertical.toString();
      }
    }
    else{
      if (this.numeroHorizontal < 10){
        number = '0' + this.numeroHorizontal;
      }
      else{
        number = this.numeroHorizontal.toString();
      }
    }
    return(number[digito-1])
  },
  multiplicacaoConformeCena : function(){
    let verticalTamanho = this.numeroVertical.toString().length
    let horizontalTamanho = this.numeroHorizontal.toString().length
    let linha = Math.floor(this.cena/verticalTamanho)
    let coluna = this.cena % horizontalTamanho
    let valor1 = parseInt(this.numeroVertical.toString()[linha])
    let valor2 = parseInt(this.numeroHorizontal.toString()[coluna])
    return(valor1*valor2)
  },
  atualizaSpans: function(){
    let verticalTamanho = this.numeroVertical.toString().length
    let horizontalTamanho = this.numeroHorizontal.toString().length
    let linha = Math.floor(this.cena/verticalTamanho)
    let coluna = (this.cena % horizontalTamanho) 
    console.log('linha: ', linha, ' coluna: ', coluna, ' span1 : ', this.numeroVertical.toString()[linha], ' span2: ', this.numeroHorizontal.toString()[coluna])
    atualizaSpan1(parseInt(this.numeroHorizontal.toString()[coluna]))
    atualizaSpan2(parseInt(this.numeroVertical.toString()[linha]))
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

  objeto.numeroHorizontal = numero1;
  objeto.numeroVertical = numero2;
  let vertical = numero2.length;
  let horizontal = numero1.length;

  if(horizontal === 3){
    areaMetodo.style.marginLeft = "3%";
  }

  if(numero1 !== "" && numero2 !== ""){
    //Varre as linhas da "tabela"
    for (let linha = 0; linha < vertical+1; linha++) {
      if(linha === 0){
        //Varre as colunas da "tabela" para a primeira linha.
        for (let coluna = 0; coluna < horizontal+1; coluna++){
          //Preenche com o primeiro número, e coloca vazio na última célula.
          let p = (coluna < horizontal) ? criaParagrafosProsCantos(numero1[coluna]) : criaParagrafosProsCantos('')
          metodoGelosiaContainer.appendChild(p)
        }
      }else{
        //Varre as colunas da "tabela" para as demais linhas.
        for (let coluna = 0; coluna < horizontal+1; coluna++){
          //Cria caixas para a tabela, e insere no último elemento um parágrafo vazio.
          if(coluna < horizontal){
            objeto.ids.push('linha_' + linha + '_coluna_' + coluna + '_cima')
            objeto.ids.push('linha_' + linha + '_coluna_' + coluna + '_baixo')
          }
          console.log(objeto)
          let elemento = (coluna < horizontal) ? criaElementoBox('linha_' + linha + '_coluna_' + coluna, 'linha_' + linha + '_coluna_' + coluna + '_cima', 'linha_' + linha + '_coluna_' + coluna + '_baixo') : criaParagrafosProsCantos(numero2[linha-1])
          metodoGelosiaContainer.appendChild(elemento);
        } 
      }
    }
    metodoGelosiaContainer.style.width = retornaTamanhoBoxGelosia(horizontal)
    escondeElementos([inputArea,buttonChoice,metodoContainer])
    revelaFlexElementos([metodoContainer])
    areaMetodo.appendChild(criaControls(objeto.getDigitoNumero(false, 1),objeto.getDigitoNumero(true, 1)));
  }else{
    alert("Por favor insira 2 números.")
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
    largura = "150px";
  }else if(horizontal === 2){
    largura = "230px";
  }else if(horizontal === 3){
    largura = "310px";
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

let criaParagrafosProsCantos = function(innerHTML){
  let p = document.createElement('p')
  p.innerHTML = innerHTML
  p.classList.add('paragrafo_da_caixa')
  return(p)
}

let avanca = function(){
  let input = document.querySelector('.input-num-control')
  let valor = input.value
  let letra = ''
  console.log('#' + objeto.ids[objeto.cena], document.querySelector('#' + objeto.ids[objeto.cena]))
  let primeiroTriangulo = document.querySelector('#span_' + objeto.ids[2*objeto.cena]) 
  let segundoTriangulo = document.querySelector('#span_' + objeto.ids[2*objeto.cena+1]) 
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
  objeto.atualizaSpans();
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

  return boxControls;
}

