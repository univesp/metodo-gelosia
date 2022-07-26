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
  let numerosMultiplicados = numero1 * numero2;
  let metodoGelosiaContainer = document.querySelector('.gelosia-container');
  let buttonChoice = document.querySelector('.button-escolha-nums')

  let inputArea = document.querySelector('.inputs-box');

  let metodoContainer = document.querySelector('.gelosia-container');

  let arrayNums = [];

  arrayNums.push(numero1.charAt(0), numero1.charAt(1), numero1.charAt(2), numero2.charAt(0), numero2.charAt(1), numero2.charAt(2));

  let arrayFiltered = arrayNums.filter(Boolean);

  

  if(numero1 === "" || numero2 === ""){
    alert('Por favor insira 2 números.');
    
  }else{

      if(arrayFiltered.length === 2){
        for (let i = 0; i < 1; i++) {
          let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
          metodoGelosiaContainer.appendChild(boxMetodoGelosia);
          metodoGelosiaContainer.style.width = '150px';
        }
    } else if(arrayFiltered.length === 3){
      for (let i = 0; i < 2; i++) {
        let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
        metodoGelosiaContainer.appendChild(boxMetodoGelosia);
        metodoGelosiaContainer.style.width = '100px';
      }
    } else if(arrayFiltered.length === 4 && numero1.length === 2 && numero2.length === 2){
      for (let i = 0; i < 4; i++) {
        let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
        metodoGelosiaContainer.appendChild(boxMetodoGelosia);
        metodoGelosiaContainer.style.width = '150px';
      }
    } else if(arrayFiltered.length === 4 && numero1.length === 1 && numero2.length === 3 || numero1.length === 3 && numero2.length === 1){
      for (let i = 0; i < 3; i++) {
        let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
        metodoGelosiaContainer.appendChild(boxMetodoGelosia);
        metodoGelosiaContainer.style.width = '100px';
      }
    } else if(arrayFiltered.length === 5){
      for (let i = 0; i < 6; i++) {
        let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
        metodoGelosiaContainer.appendChild(boxMetodoGelosia);
        metodoGelosiaContainer.style.width = '150px';
      }
    }
    else if(arrayFiltered.length === 6){
      for (let i = 0; i < 9; i++) {
        let boxMetodoGelosia = criaElementoBox(i+1, i+1, i+2);
        metodoGelosiaContainer.appendChild(boxMetodoGelosia);
        metodoGelosiaContainer.style.width = '230px';
      }
    }

    inputArea.style.display = 'none';
    buttonChoice.style.display = 'none';
  
    metodoContainer.style.display = 'flex';
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