let avanca = function(){
    let input = document.querySelector('.input-num-control')
    let valor = parseInt(input.value)
    let time = 0
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
        //let cenaDoSegundoAto = objeto.cena - objeto.getNumeroDeCelulas()
        let cenaDoSegundoAtoNovo =  7 - (objeto.nLinhas() + objeto.nColunas())
        objeto.descoloreTodasAsDiagonais()
        objeto.coloreDiagonal(cenaDoSegundoAtoNovo)
        limpaAreaControls()
        objeto.preencheSpansDiagonal(cenaDoSegundoAtoNovo)
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
        if(objeto.somaDiagonal(objeto.getCenaDoSegundoAtoCorrigida()) != valor){
          alert('Valor está errado')
          return 0
        }
        //dinâmica da parte de baixo
        if(objeto.getCenaDoSegundoAto() <= objeto.nLinhas()){
          let id = objeto.nLinhas()+1-objeto.getCenaDoSegundoAto()
          let elemento = document.getElementById('coluna_baixo_' + id)
          let teveResiduo = false
          if(elemento.innerHTML != ""){
            let residuo = parseInt(elemento.innerHTML)
            elemento.classList.add('marcado')
            let valorGuardado = valor
            setTimeout(() => {
              elemento.innerHTML = valorGuardado + "+" + residuo
            }, time)

            time = time + 1500

            setTimeout(() => {
              elemento.innerHTML = (valorGuardado + residuo).toString()
            }, time)

            time = time + 1500

            valor = valor + residuo
            teveResiduo = true
          }
          if(!teveResiduo){
            elemento.innerHTML = valor
          }
          if(valor >= 10){
            escondeAvanca()
            escondeInput()
            time = time + 1500
            time = dinamicaColunaBaixo(valor, time)
            time = time + 1000
          }
          else{
            revelaAvanca()
            revelaInput()
            elemento.innerHTML = valor
            time = 0
          }

        }
        //dinâmica das colunas na parte de baixo
        else{
          let id = objeto.nLinhas() - (objeto.getCenaDoSegundoAto() - objeto.nColunas() - 1)
          let elemento = document.getElementById('lateral_' + id)
          let teveResiduo = false
          if(elemento.innerHTML != ""){
            let residuo = parseInt(elemento.innerHTML)
            elemento.classList.add('marcado')
            let valorGuardado = valor
            setTimeout(() => {
              elemento.innerHTML = valorGuardado + "+" + residuo
            }, time)

            time = time + 1500

            setTimeout(() => {
              elemento.innerHTML = (valorGuardado + residuo).toString()
            }, time)

            time = time + 1500

            valor = valor + residuo
            teveResiduo = true
          }
          if(!teveResiduo){
            elemento.innerHTML = valor
          }
          elemento.innerHTML = valor
          if(valor >= 10){
            escondeAvanca()
            escondeInput()
            time = time + 1500
            time = dinamicaLateral(valor, time)
            time = time + 1000
          }
          else{
            revelaAvanca()
            revelaInput()
            elemento.innerHTML = valor
            time = 0
          }
        }
        setTimeout(() => {
          objeto.descoloreTodasAsDiagonais()
          revelaAvanca()
          revelaInput()
        }, time)
        //Atualização da cena.
        objeto.cena++
        
        if(objeto.getNumeroDeDiagonais() >= objeto.getCenaDoSegundoAto()){
          limpaAreaControls()
          setTimeout(() => {
            objeto.preencheSpansDiagonal(objeto.getCenaDoSegundoAtoCorrigida())
            objeto.coloreDiagonal(objeto.getCenaDoSegundoAtoCorrigida())
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
          time = time + 1000
          setTimeout(() => {
            objeto.finaliza()
          }, time)
        }
      }
      else{
      }
    }
}
