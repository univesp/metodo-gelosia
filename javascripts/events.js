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
  let buttonChoice = document.querySelector('.button-escolha-nums');

  let inputArea = document.querySelector('.inputs-box');

  let metodoContainer = document.querySelector('.gelosia-container');
  let areaMetodo = document.querySelector('.area-gelosia-container');


  let vertical = numero2.length;
  let horizontal = numero1.length;

  if(horizontal === 3){
    areaMetodo.style.marginLeft = "3%";
  }

  if(numero1 !== "" && numero2 !== ""){
    for (let i = 0; i < vertical+1; i++) {
      if(i === 0){
        for (let j = 0; j < horizontal+1; j++){
          let p = document.createElement('p');
          if(j < horizontal){
            
            p.innerHTML = numero1[j];
          }else{
            p.innerHTML = '';
          }
          
          p.style.width = "70px";
          p.style.height = "50px";
          p.style.fontWeight = "bold";
          p.style.fontSize = "28px";
          p.style.position = "relative";
          p.style.left = "27px";
          p.style.top = "10px";
          metodoGelosiaContainer.appendChild(p)
        }
      }else{
        for (let j = 0; j < horizontal+1; j++){
          if(j < horizontal){
            let boxMetodoGelosia = criaElementoBox(1, 1, 1);
            metodoGelosiaContainer.appendChild(boxMetodoGelosia);
          }else{
            
            let p = document.createElement('p');
            p.innerHTML = numero2[i-1];
            p.style.width = "70px";
            p.style.height = "50px";
            p.style.fontWeight = "bold";
            p.style.fontSize = "28px";
            p.style.position = "relative";
            p.style.left = "15px";
            p.style.top = "10px";
            metodoGelosiaContainer.appendChild(p);
          }
          
        }
        if(horizontal === 1){
          metodoGelosiaContainer.style.width = "150px";
    
        }else if(horizontal === 2){
          metodoGelosiaContainer.style.width = "230px";
    
        }else if(horizontal === 3){
          metodoGelosiaContainer.style.width = "310px";
    
        }
      }
    }
  
    inputArea.style.display = 'none';
    buttonChoice.style.display = 'none';
    metodoContainer.style.display = 'flex';
  
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