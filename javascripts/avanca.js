let avanca = function(){
    let input = document.querySelector('.input-num-control')
    let valor = input.value
    //Primeiro ato
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
        objeto.coloreDiagonal(cenaDoSegundoAto)
        limpaAreaControls()
        objeto.preencheSpansDiagonal(cenaDoSegundoAto)
      }
      removeAllMarcados()
      if(objeto.verificaFimDo1Ato()){
        objeto.atualizaResultadosCimaEDireita()
      }
    }
    //Segundo ato
    else{
      revelaAvanca()
      revelaInput()
      if(objeto.getNumeroDeDiagonais() >= objeto.getCenaDoSegundoAto()){
        let time = "0"
        if(objeto.somaDiagonal(objeto.getCenaDoSegundoAto()) != valor){
          alert('Valor está errado')
          return 0
        }
        //dinâmica das laterais
        if(objeto.getCenaDoSegundoAto() <= objeto.nColunas()){
          let elemento = document.getElementById('lateral_' + objeto.getCenaDoSegundoAto())
          elemento.innerHTML = valor
          if(valor >= 10){
            escondeAvanca()
            escondeInput()
            dinamicaLateral(valor)
            time = "7000"
          }
          else{
            revelaAvanca()
            revelaInput()
            elemento.innerHTML = valor
            time = "0"
          }
  
        }
        //dinâmica das colunas na parte de baixo
        else{
          let id = objeto.getCenaDoSegundoAto() - objeto.nColunas()
          let elemento = document.getElementById('coluna_baixo_' + id)
          elemento.innerHTML = valor
          if(valor >= 10){
            escondeAvanca()
            escondeInput()
            dinamicaColunaBaixo(valor)
            time = "7000"
          }
          else{
            revelaAvanca()
            revelaInput()
            elemento.innerHTML = valor
            time = "0"
          }
        }
        setTimeout(() => {
          objeto.descoloreTodasAsDiagonais()
          revelaAvanca()
          revelaInput()
        }, time)
        objeto.cena++
        
        if(objeto.getNumeroDeDiagonais() >= objeto.getCenaDoSegundoAto()){
          limpaAreaControls()
          setTimeout(() => {
            objeto.preencheSpansDiagonal(objeto.getCenaDoSegundoAto())
            objeto.coloreDiagonal(objeto.getCenaDoSegundoAto())
            zeraInput()
            revelaAvanca()
            revelaInput()
          }, time)
        }
        else{
          zeraInput()
          limpaAreaControls()
          objeto.descoloreTodasAsDiagonais()
          objeto.escondeTodosOsTriangulosDiagonais()
          objeto.voltaDiagonaisCorPreta()
          objeto.finaliza()
        }
      }
      else{
      }
    }
  }
