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
    idsDiagonaisNova: [
      ['span_linha_3_coluna_3_baixo'],
      ['span_linha_2_coluna_3_baixo','span_linha_3_coluna_3_cima' ,'span_linha_3_coluna_2_baixo'], 
      ['span_linha_1_coluna_3_baixo','span_linha_2_coluna_3_cima' ,'span_linha_2_coluna_2_baixo','span_linha_3_coluna_2_cima' ,'span_linha_3_coluna_1_baixo'],
      ['span_linha_1_coluna_3_cima' ,'span_linha_1_coluna_2_baixo','span_linha_2_coluna_2_cima' ,'span_linha_2_coluna_1_baixo','span_linha_3_coluna_1_cima' ],
      ['span_linha_1_coluna_2_cima' ,'span_linha_1_coluna_1_baixo','span_linha_2_coluna_1_cima' ],
      ['span_linha_1_coluna_1_cima'],
    ],
    idsDiagonaisCimaBaixo:[
      ['linha_1_coluna_1_cimaFundo'],
      ['linha_1_coluna_2_cimaFundo','linha_1_coluna_1_baixoFundo','linha_2_coluna_1_cimaFundo'],
      ['linha_1_coluna_3_cimaFundo','linha_1_coluna_2_baixoFundo','linha_2_coluna_2_cimaFundo','linha_2_coluna_1_baixoFundo','linha_3_coluna_1_cimaFundo'],
      ['linha_1_coluna_3_baixoFundo','linha_2_coluna_3_cimaFundo','linha_2_coluna_2_baixoFundo','linha_3_coluna_2_cimaFundo','linha_3_coluna_1_baixoFundo','linha_3_coluna_1_baixoFundo'],
      ['linha_2_coluna_3_baixoFundo','linha_3_coluna_3_cimaFundo','linha_3_coluna_2_baixoFundo'],
      ['linha_3_coluna_3_baixoFundo']
    ],
    idsDiagonaisCimaBaixoNova:[
      ['linha_3_coluna_3_baixoFundo'],
      ['linha_2_coluna_3_baixoFundo','linha_3_coluna_3_cimaFundo','linha_3_coluna_2_baixoFundo'],
      ['linha_1_coluna_3_baixoFundo','linha_2_coluna_3_cimaFundo','linha_2_coluna_2_baixoFundo','linha_3_coluna_2_cimaFundo','linha_3_coluna_1_baixoFundo','linha_3_coluna_1_baixoFundo'],
      ['linha_1_coluna_3_cimaFundo','linha_1_coluna_2_baixoFundo','linha_2_coluna_2_cimaFundo','linha_2_coluna_1_baixoFundo','linha_3_coluna_1_cimaFundo'],
      ['linha_1_coluna_2_cimaFundo','linha_1_coluna_1_baixoFundo','linha_2_coluna_1_cimaFundo'],
      ['linha_1_coluna_1_cimaFundo'],
    ],
    somaDiagonal : function(n){
      let soma = 0
      for (let i = 0; i < this.idsDiagonaisNova[n-1].length; i++) {
        let id = this.idsDiagonaisNova[n-1][i];
        let elemento = document.getElementById(id)
        if(document.body.contains(elemento)){
          soma += parseInt(elemento.innerHTML)
        }
      }
      return(soma)
    },
    coloreDiagonal : function(n){
      this.voltaDiagonaisCorPreta()
      this.escondeTodosOsTriangulosDiagonais()
      for (let i = 0; i < this.idsDiagonaisCimaBaixoNova[n-1].length; i++) {
        let id = this.idsDiagonaisCimaBaixoNova[n-1][i];
        let elemento = document.getElementById(id)
        if(document.body.contains(elemento)){
          elemento.style.display = 'flex'
        }
      }
      for (let i = 0; i < this.idsDiagonaisNova[n-1].length; i++) {
        let id = this.idsDiagonaisNova[n-1][i];
        let elemento = document.getElementById(id)      
        if(document.body.contains(elemento)){
          elemento.style.backgroundColor = '#FF9600'
          elemento.style.color = 'white'
        }
      }
    },
    voltaDiagonaisCorPreta : function(){
      for (let i = 0; i < 6; i++) {
        let diagonal = this.idsDiagonaisNova[i];
        for (let j = 0; j < diagonal.length; j++) {
          let id = diagonal[j];
          let elemento = document.getElementById(id)
          if(document.body.contains(elemento)){
            elemento.style.color = 'black'
          }
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
    escondeTodosOsTriangulosDiagonais: function(){
      for (let i = 0; i < 6; i++) {
        let diagonal = this.idsDiagonaisCimaBaixoNova[i];
        for (let j = 0; j < diagonal.length; j++) {
          let id = diagonal[j];
          let elemento = document.getElementById(id)
          if(document.body.contains(elemento)){
            elemento.style.display = 'none'
          }
        }
      }    
    },
    preencheSpansDiagonal : function(n){
      let areaControls = document.querySelector('.area-controls')
      for (let i = 0; i < this.idsDiagonaisNova[n-1].length; i++) {
        let id = this.idsDiagonaisNova[n-1][i];
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
    atualizaResultadosCimaEDireita: function(){
        let resultadoDireita = document.querySelector('#' + 'resultado_direita_' + this.nQualLinhaEstou())
        let resultadoCima    = document.querySelector('#' + 'resultado_cima_' + this.nQualColunaEstou())
        resultadoDireita.classList.add('marcado')
        resultadoCima.classList.add('marcado')
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
      nDiagonais = linha + coluna
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
      //return(7 - (objeto.nLinhas() + objeto.nColunas()) + this.cena)
    },
    getCenaDoSegundoAtoCorrigida : function(){
      return(this.getCenaDoSegundoAto() + 6 -this.nLinhas() -this.nColunas())
    },
    finaliza : function(){
      let controls = document.querySelector('.box-controls');
      controls.style.display = 'none';

      let numero1 = document.querySelector('#num1').value;
      let numero2 = document.querySelector('#num2').value; 
      let resultado = numero1 * numero2;
      let areaMetodo = document.querySelector('.area-gelosia-container');
      let fraseResultado = fraseFinal(numero1, numero2, resultado);

      // setTimeout(() => {areaMetodo.appendChild(botaoNew())}, 1000);

      escondeAvanca()
      escondeInput()
      let linhas = this.nLinhas();
      let colunas = this.nColunas();
      let laterais = []
      let baixos = []
      let delay = 500
      for (let i = 1; i <= colunas; i++) {
        laterais.push(document.querySelector('#lateral_' + i))
      }
      for (let i = 1; i <= linhas; i++) {
        baixos.push(document.querySelector('#coluna_baixo_'+ i))
      }
      laterais.forEach(lateral => {
        marcadoTimeOut(lateral, delay.toString())
        delay += 500
      });
      for (let i = 0; i < baixos.length; i++) {
        let baixo = baixos[i];
        marcadoTimeOut(baixo, delay.toString())
        delay += 500
        if(i == (baixos.length - 1)){
          setTimeout(() => {
            areaMetodo.appendChild(fraseResultado);
            areaMetodo.appendChild(botaoNew())
          }, delay.toString());
          
        }
      }
    }
  }
