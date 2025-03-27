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

  // Taxas reais do mercado
  const CDI_ANUAL = 14.15; // CDI médio anual (%)
  const SELIC = 14.25; // Selic atual (%)
  const trBacen = 0.1709;
  
  let tempoTotal = unidade === "mes" ? tempo : tempo * 12; // Convertendo para meses, se necessário
  let montante;

  if (investimento === "poupanca") {
      let taxaPoupanca;

      if (SELIC > 8.5) {
          taxaPoupanca = trBacen / 100  + 0.5 / 100 ; // 0,5% ao mês
      } else {
          taxaPoupanca = (0.7 * (SELIC % 100)) / 12; // 70% da Selic ao ano, convertido para mês
      }

      montante = valor * Math.pow(1 + taxaPoupanca, tempoTotal);
  } else {
      // Rendimento baseado no CDI
      let taxaAnual = (taxaCDI / 100) * CDI_ANUAL;
      let taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1; // Convertendo para taxa mensal

      montante = valor * Math.pow(1 + taxaMensal, tempoTotal);
  }

  let rendimento = montante - valor;

  // Imposto de Renda apenas para CDB
  let aliquotaIR = 0;
  if (investimento === "cdb") {
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

  // LCI e LCA são isentos de imposto
  let imposto = (investimento === "lci" || investimento === "lca") ? 0 : rendimento * aliquotaIR;
  let rendimentoLiquido = rendimento - imposto;

  document.getElementById("resultado").innerHTML = `Rendimento após ${tempo} ${unidade}(s):`;
  document.getElementById("rendimentos").innerHTML = investimento === "poupanca"
      ? `Rendimento: R$ ${rendimento.toFixed(2)}`
      : `Bruto: R$ ${rendimento.toFixed(2)}<br> Líquido: R$ ${rendimentoLiquido.toFixed(2)}`;
}
