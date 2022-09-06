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

  let arrayNums = [];
  arrayNums.push(numero1.charAt(0), numero1.charAt(1), numero1.charAt(2), numero2.charAt(0), numero2.charAt(1), numero2.charAt(2));
  let arrayFiltered = arrayNums.filter(Boolean);

  console.log(arrayFiltered)

  let vertical = numero2.length;
  let horizontal = numero1.length;

  if(horizontal === 3){
    areaMetodo.style.marginLeft = "3%";
  }

  if(numero1 !== "" && numero2 !== ""){
    //Varre as linhas da "tabela"
    for (let i = 0; i < vertical+1; i++) {
      if(i === 0){
        //Varre as colunas da "tabela" para a primeira linha.
        for (let j = 0; j < horizontal+1; j++){
          //Preenche com o primeiro número, e coloca vazio na última célula.
          let p = (j < horizontal) ? criaParagrafosProsCantos(numero1[j]) : criaParagrafosProsCantos('')
          metodoGelosiaContainer.appendChild(p)
        }
      }else{
        //Varre as colunas da "tabela" para as demais linhas.
        for (let j = 0; j < horizontal+1; j++){
          //Cria caixas para a tabela, e insere no último elemento um parágrafo vazio.
          let elemento = (j < horizontal) ? criaElementoBox(1, 1, 1) : criaParagrafosProsCantos(numero2[i-1])
          metodoGelosiaContainer.appendChild(elemento);
        } 
      }
    }
    metodoGelosiaContainer.style.width = retornaTamanhoBoxGelosia(horizontal)
    escondeElementos([inputArea,buttonChoice,metodoContainer])
    revelaFlexElementos([metodoContainer])
    areaMetodo.appendChild(criaControls(arrayFiltered[0], arrayFiltered[2]));

    let next = document.querySelector('.fa-angle-right');
    let responseInput = document.querySelector('#numControl');
    let teste = function(){
      let mult = arrayFiltered[0] * arrayFiltered[2];
      let responseUser = responseInput.value;
      let responseNum1 = document.querySelector('#controleNum1');
      let responseNum2 = document.querySelector('#controleNum2');
      console.log(mult);
      console.log(responseUser);

      if(responseUser == mult){
        console.log('tudo certo');
        responseNum1.innerHTML = arrayFiltered[1];
        mult = arrayFiltered[1] * arrayFiltered[2];
        responseUser.innerHTML = "";
      }else{
        console.log('resposta errada');
        responseInput.style.border = "3px solid red";
        responseInput.classList.add('error-input');
        setTimeout(function(){responseInput.classList.remove('error-input')}, 300);
      }
    }

    next.addEventListener('click', teste);
  }else{
    alert("Por favor insira 2 números.")
  }
}

let criaElementoBox = function(boxId, numberId, numberId2){
    let box = document.createElement("div");
    box.classList.add('gelosia-box');
    box.setAttribute('id', `box${boxId}`);

    let spanFirstNumber = document.createElement("span");
    spanFirstNumber.classList.add('gelosia-span1');
    spanFirstNumber.setAttribute('id', `span${numberId}`);

    let spanSecondNumber = document.createElement("span");
    spanSecondNumber.classList.add('gelosia-span2');
    spanSecondNumber.setAttribute('id', `span${numberId2}`);

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

let criaControls = function(numero1, numero2){
  let boxControls = document.createElement("div");
  boxControls.classList.add('box-controls');

  let areaControls = document.createElement("div");
  areaControls.classList.add('area-controls');

  let spanNum1 = document.createElement("span");
  spanNum1.classList.add('controleNum');
  spanNum1.setAttribute('id', 'controleNum1');
  spanNum1.innerHTML = numero1;

  let spanNum2 = document.createElement("span");
  spanNum2.classList.add('controleNum');
  spanNum2.setAttribute('id', 'controleNum2');
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
