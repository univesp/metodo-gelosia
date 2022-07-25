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
  let metodoGelosiaContainer = document.querySelector('.gelosia-container')

  let inputArea = document.querySelector('.inputs-box');

  let metodoContainer = document.querySelector('.gelosia-container');

  let arrayNums = [];

  arrayNums.push(numero1.charAt(0), numero1.charAt(1), numero1.charAt(2), numero2.charAt(0), numero2.charAt(1), numero2.charAt(2));

  let arrayFiltered = arrayNums.filter(Boolean);
  
  arrayFiltered.forEach(nums => {
    let boxMetodoGelosia = criaElementoBox();
    metodoGelosiaContainer.appendChild(boxMetodoGelosia);
  })
  

  if(numero1 === "" || numero2 === ""){
    alert('Por favor insira 2 números.')
  }else{
    console.log(numero1.length)

    inputArea.style.display = 'none';
  
    metodoContainer.style.display = 'flex';
  }
 
}

let criaElementoBox = function(){
    let box = document.createElement("div");
    box.classList.add('gelosia-box');
    box.setAttribute('id', 'teste');

    let spanFirstNumber = document.createElement("span");
    spanFirstNumber.classList.add('gelosia-span1');

    let spanSecondNumber = document.createElement("span");
    spanSecondNumber.classList.add('gelosia-span2');

    let risquinho = document.createElement("span");
    risquinho.classList.add('division-box');

    box.appendChild(spanFirstNumber);
    box.appendChild(spanSecondNumber);
    box.appendChild(risquinho);

    return box;
}