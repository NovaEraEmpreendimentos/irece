// Tabelas de taxas
const taxasAbaixo5k = {
    1: 10.50, 2: 11.16, 3: 11.63, 4: 12.19, 5: 12.75, 6: 13.22,
    7: 13.97, 8: 14.44, 9: 14.72, 10: 15.25, 11: 16.03, 12: 16.58,
    13: 19.40, 14: 19.87, 15: 20.34, 16: 20.81, 17: 21.28, 18: 21.75
};

const taxasAcima5k = {
    1: 10.25, 2: 10.91, 3: 11.38, 4: 11.94, 5: 12.50, 6: 12.97,
    7: 13.73, 8: 14.20, 9: 14.48, 10: 14.53, 11: 15.87, 12: 16.25,
    13: 17.07, 14: 17.56, 15: 18.04, 16: 18.52, 17: 19.00, 18: 19.49
};

// Elementos DOM
const loanAmountInput = document.getElementById('loanAmount');
const installmentsSelect = document.getElementById('installments');
const generatePrintBtn = document.getElementById('generatePrint');
const tableBody = document.getElementById('tableBody');
const printModal = document.getElementById('printModal');
const printContent = document.getElementById('printContent');
const downloadPrintBtn = document.getElementById('downloadPrint');
const closePrintBtn = document.getElementById('closePrint');
const closeModal = document.querySelector('.close');

// Variáveis globais
let currentSimulation = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateTable();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    loanAmountInput.addEventListener('input', updateTable);
    installmentsSelect.addEventListener('change', updateTable);
    
    generatePrintBtn.addEventListener('click', generatePrint);
    downloadPrintBtn.addEventListener('click', downloadPrint);
    closePrintBtn.addEventListener('click', closePrintModal);
    closeModal.addEventListener('click', closePrintModal);
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === printModal) {
            closePrintModal();
        }
    });
}



// Calcular valores
function calculateValues(loanAmount, parcelas, taxa) {
    // Valor a Receber = Valor do empréstimo - taxa
    const valorReceber = loanAmount - (loanAmount * taxa / 100);
    
    // Parcela a Receber = Valor do empréstimo / parcelas
    const parcelaReceber = loanAmount / parcelas;
    
    // Valor a Cobrar = Valor que o cliente precisa pagar para receber o valor desejado
    const valorCobrar = loanAmount / (1 - taxa / 100);
    
    // Parcela a Cobrar = Valor a Cobrar / parcelas
    const parcelaCobrar = valorCobrar / parcelas;
    
    return {
        valorReceber: valorReceber,
        parcelaReceber: parcelaReceber,
        valorCobrar: valorCobrar,
        parcelaCobrar: parcelaCobrar
    };
}

// Formatar valor em Real
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Formatar porcentagem
function formatPercentage(value) {
    return value.toFixed(2) + '%';
}

// Atualizar tabela
function updateTable() {
    const loanAmount = parseFloat(loanAmountInput.value) || 0;
    const selectedInstallments = installmentsSelect.value;
    
    // Detectar automaticamente a faixa baseada no valor
    const isAbove5k = loanAmount >= 5000;
    const taxas = isAbove5k ? taxasAcima5k : taxasAbaixo5k;
    
    tableBody.innerHTML = '';
    
    for (let parcelas = 1; parcelas <= 18; parcelas++) {
        const taxa = taxas[parcelas];
        const row = document.createElement('tr');
        
        // Destacar linha selecionada
        if (selectedInstallments && parseInt(selectedInstallments) === parcelas) {
            row.classList.add('selected-row');
            row.style.background = 'rgba(245, 158, 11, 0.2)';
            row.style.border = '1px solid rgba(245, 158, 11, 0.5)';
        }
        
        if (loanAmount > 0) {
            const valores = calculateValues(loanAmount, parcelas, taxa);
            
            row.innerHTML = `
                <td><strong>${parcelas}x</strong></td>
                <td class="highlight-rate">${formatPercentage(taxa)}</td>
                <td class="highlight-value">${formatCurrency(valores.valorReceber)}</td>
                <td>${formatCurrency(valores.parcelaReceber)}</td>
                <td class="highlight-value">${formatCurrency(valores.valorCobrar)}</td>
                <td>${formatCurrency(valores.parcelaCobrar)}</td>
            `;
        } else {
            row.innerHTML = `
                <td><strong>${parcelas}x</strong></td>
                <td class="highlight-rate">${formatPercentage(taxa)}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            `;
        }
        
        tableBody.appendChild(row);
    }
}

// Gerar print
function generatePrint() {
    const loanAmount = parseFloat(loanAmountInput.value);
    const installments = installmentsSelect.value;
    
    if (!loanAmount || !installments) {
        alert('Por favor, preencha o valor do empréstimo e selecione o número de parcelas.');
        return;
    }
    
    // Detectar automaticamente a faixa baseada no valor
    const isAbove5k = loanAmount >= 5000;
    const loanType = isAbove5k ? 'above5k' : 'below5k';
    const taxas = isAbove5k ? taxasAcima5k : taxasAbaixo5k;
    const taxa = taxas[parseInt(installments)];
    const valores = calculateValues(loanAmount, parseInt(installments), taxa);
    
    currentSimulation = {
        loanAmount,
        installments: parseInt(installments),
        taxa,
        valores,
        loanType
    };
    
    generatePrintContent();
    printModal.style.display = 'block';
}

// Gerar conteúdo do print
function generatePrintContent() {
    const sim = currentSimulation;
    
    printContent.innerHTML = `
        <div class="print-header">
            <div class="print-logo">
                <img src="logo.jpg" alt="Nova Era Soluções" class="print-logo-image">
            </div>
            <div class="print-title">Nova Era Soluções</div>
            <div class="print-subtitle">Soluções em Crédito</div>
        </div>
        
        <div class="print-section-title">
            <h2>Simulação de Empréstimo</h2>
        </div>
        
        <div class="print-section print-highlight">
            <h3>Se você passa ${formatCurrency(sim.loanAmount)}</h3>
            <div class="print-info">
                <div class="print-item">
                    <span class="print-label">Você recebe:</span>
                    <span class="print-value">${formatCurrency(sim.valores.valorReceber)}</span>
                </div>
                <div class="print-item">
                    <span class="print-label">Parcela a Pagar:</span>
                    <span class="print-value">${sim.installments}x ${formatCurrency(sim.valores.parcelaReceber)}</span>
                </div>
            </div>
        </div>
        
        <div class="print-section print-highlight">
            <h3>Se você quer receber ${formatCurrency(sim.loanAmount)}</h3>
            <div class="print-info">
                <div class="print-item">
                    <span class="print-label">Você passa:</span>
                    <span class="print-value">${formatCurrency(sim.valores.valorCobrar)}</span>
                </div>
                <div class="print-item">
                    <span class="print-label">Parcela a Pagar:</span>
                    <span class="print-value">${sim.installments}x ${formatCurrency(sim.valores.parcelaCobrar)}</span>
                </div>
            </div>
        </div>
        
        <div class="print-contact">
            <p><i class="fas fa-phone"></i> Contato: (74) 99975-9815 (74) 99942-5460</p>
            <p><i class="fas fa-envelope"></i> E-mail: novaerasolucoes.ba@gmail.com</p>
            <p><i class="fab fa-instagram"></i> Instagram:@novaera_solucoes_irece</p>
            <p><i class="fas fa-map-marker-alt"></i> Endereço: Avenida Tertuliano Cambuí, 388</p>
            <p>Irecê - BA</p>
        </div>
    `;
}

// Download do print
function downloadPrint() {
    const printElement = printContent;
    
    html2canvas(printElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: printElement.scrollWidth,
        height: printElement.scrollHeight
    }).then(canvas => {
        // Converter para JPG
        const link = document.createElement('a');
        link.download = `simulacao-emprestimo-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    }).catch(error => {
        console.error('Erro ao gerar imagem:', error);
        alert('Erro ao gerar a imagem. Tente novamente.');
    });
}

// Fechar modal
function closePrintModal() {
    printModal.style.display = 'none';
}

// Adicionar animações e efeitos
document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada dos cards
    const cards = document.querySelectorAll('.simulator-card, .table-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Efeito de digitação no título
    const title = document.querySelector('.header h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }
});

// Validação de entrada
loanAmountInput.addEventListener('input', function() {
    let value = this.value.replace(/[^\d.,]/g, '');
    value = value.replace(',', '.');
    this.value = value;
});

// Adicionar tooltips informativos
function addTooltips() {
    const tooltips = {
        'loanAmount': 'Digite o valor que você deseja emprestar ou receber',
        'loanType': 'Selecione a faixa de valor para aplicar as taxas corretas',
        'installments': 'Escolha em quantas parcelas deseja dividir o pagamento'
    };
    
    Object.keys(tooltips).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltips[id];
        }
    });
}

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', addTooltips);

