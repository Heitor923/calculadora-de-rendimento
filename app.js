// Função para exibir a seção de Calculadora e ocultar a de Explicações
function mostrarCalculadora() {
    document.getElementById('calculadora').classList.remove('d-none');  // Exibe a calculadora
    document.getElementById('explicacao').classList.add('d-none');     // Esconde as explicações
  }
  
  // Função para exibir a seção de Explicações e ocultar a de Calculadora
  function mostrarExplicacoes() {
    document.getElementById('calculadora').classList.add('d-none');    // Esconde a calculadora
    document.getElementById('explicacao').classList.remove('d-none');  // Exibe as explicações
  }
  
  // Função para calcular o rendimento
  function calcularRendimento() {
    const valor = parseFloat(document.getElementById("valor").value);
    const taxaCDI = parseFloat(document.getElementById("taxa").value);
    const tempo = parseInt(document.getElementById("tempo").value);
    const unidade = document.getElementById("unidade").value;
    const investimento = document.getElementById("investimento").value;
  
    // Validação de entrada
    if (isNaN(valor) || isNaN(taxaCDI) || isNaN(tempo) || valor <= 0 || taxaCDI <= 0 || tempo <= 0) {
      alert("Preencha todos os campos corretamente com valores positivos.");
      return;
    }
  
    // Definição da taxa de CDI
    const CDI_ANUAL = 13.65; // CDI médio anual em %
    let taxaAnual = (taxaCDI / 100) * CDI_ANUAL; // Ajusta a taxa com base no CDI real
    let taxaPeriodo = unidade === "mes" ? (taxaAnual / 12) / 100 : (taxaAnual / 100); // Ajuste para o período
    let tempoTotal = unidade === "mes" ? tempo : tempo * 12; // Convertendo para meses, se necessário
  
    let montante;
    if (investimento === "poupanca") {
      let taxaPoupanca = 0.5 / 100; // 0,5% ao mês fixo
      montante = valor * Math.pow(1 + taxaPoupanca, tempoTotal);
    } else {
      montante = valor * Math.pow(1 + taxaPeriodo, tempoTotal);
    }
  
    let rendimento = montante - valor;
  
    // Imposto de Renda
    let aliquotaIR = 0;
    if (investimento === "cdb" || investimento === "tesouro_direto") {
      if (tempoTotal <= 180) {
        aliquotaIR = 0.225; // 22,5%
      } else if (tempoTotal <= 360) {
        aliquotaIR = 0.20; // 20%
      } else if (tempoTotal <= 720) {
        aliquotaIR = 0.175; // 17,5%
      } else {
        aliquotaIR = 0.15; // 15%
      }
    }
  
    let imposto = rendimento * aliquotaIR;
    let rendimentoLiquido = rendimento - imposto;
  
    document.getElementById("resultado").innerHTML = `Rendimento após ${tempo} ${unidade}(s):`;
    document.getElementById("rendimentos").innerHTML = investimento === "poupanca"
      ? `Rendimento: R$ ${rendimento.toFixed(2)}`
      : `Bruto: R$ ${rendimento.toFixed(2)}<br> Líquido: R$ ${rendimentoLiquido.toFixed(2)}`;
  }