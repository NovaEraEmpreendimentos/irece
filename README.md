# Simulador de Empréstimo - Nova Era Soluções

Um simulador de empréstimos moderno e responsivo com design elegante e funcionalidades avançadas.

## 🚀 Funcionalidades

- **Simulação de Empréstimos**: Calcule valores e parcelas com base em taxas reais
- **Duas Faixas de Taxas**: Abaixo e acima de R$ 5.000
- **Tabela Dinâmica**: Visualização completa de todas as opções de parcelamento
- **Geração de Print**: Crie relatórios em imagem para compartilhar
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Tema Escuro Moderno**: Interface elegante com gradientes azuis

## 📊 Cálculos Implementados

### Valor a Receber
- Fórmula: `Valor do Empréstimo - (Valor × Taxa%)`
- Representa o valor líquido que o cliente recebe

### Parcela a Receber
- Fórmula: `Valor do Empréstimo ÷ Número de Parcelas`
- Valor de cada parcela baseado no valor solicitado

### Valor a Cobrar
- Fórmula: `Valor do Empréstimo ÷ (1 - Taxa%)`
- Valor total necessário para o cliente receber o valor desejado

### Parcela a Cobrar
- Fórmula: `Valor a Cobrar ÷ Número de Parcelas`
- Valor de cada parcela baseado no valor a cobrar

## 🎨 Design Features

- **Gradiente Azul**: Tema moderno com tons de azul
- **Glassmorphism**: Efeitos de vidro com blur e transparência
- **Animações Suaves**: Transições e hover effects
- **Tipografia Moderna**: Fonte Inter para melhor legibilidade
- **Ícones FontAwesome**: Interface rica em elementos visuais

## 📱 Responsividade

- **Desktop**: Layout completo com grid responsivo
- **Tablet**: Adaptação automática dos elementos
- **Mobile**: Interface otimizada para telas pequenas
- **Touch Friendly**: Botões e campos adequados para touch

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Flexbox, Grid, Gradientes, Animações
- **JavaScript ES6+**: Lógica de cálculos e interatividade
- **html2canvas**: Geração de imagens para print
- **FontAwesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Inter

## 📦 Como Usar

### 1. Clone ou Download
```bash
git clone [seu-repositorio]
cd simulador-emprestimo
```

### 2. Abrir no Navegador
Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.

### 3. Deploy no GitHub Pages
1. Faça upload dos arquivos para seu repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main como source
4. Sua página estará disponível em: `https://[seu-usuario].github.io/[nome-do-repo]`

### 4. Deploy em Outros Serviços
- **Netlify**: Arraste a pasta para netlify.com
- **Vercel**: Conecte seu repositório GitHub
- **Surge.sh**: Use o comando `surge` na pasta do projeto

## 🎯 Como Usar o Simulador

1. **Digite o Valor**: Insira o valor do empréstimo desejado
2. **Selecione a Faixa**: Escolha entre "Abaixo de R$ 5.000" ou "Acima de R$ 5.000"
3. **Escolha as Parcelas**: Selecione o número de parcelas (1x a 18x)
4. **Visualize a Tabela**: Veja todos os cálculos automaticamente
5. **Gere o Print**: Clique em "Gerar Print" para criar um relatório

## 📋 Tabelas de Taxas

### Abaixo de R$ 5.000
| Parcelas | Taxa (%) |
|----------|----------|
| 1x       | 10,50%   |
| 2x       | 11,16%   |
| 3x       | 11,63%   |
| ...      | ...      |
| 18x      | 21,75%   |

### Acima de R$ 5.000
| Parcelas | Taxa (%) |
|----------|----------|
| 1x       | 10,25%   |
| 2x       | 10,91%   |
| 3x       | 11,38%   |
| ...      | ...      |
| 18x      | 19,49%   |

## 🔧 Personalização

### Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
/* Gradiente principal */
background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);

/* Cor de destaque */
color: #f59e0b;
```

### Taxas
Modifique as tabelas no arquivo `script.js`:
```javascript
const taxasAbaixo5k = {
    1: 10.50, 2: 11.16, // ... suas taxas
};
```

### Informações de Contato
Atualize os dados no arquivo `script.js` na função `generatePrintContent()`.

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🐛 Solução de Problemas

### Print não funciona
- Verifique se o html2canvas está carregando
- Teste em modo incógnito
- Verifique o console para erros

### Layout quebrado no mobile
- Verifique a meta tag viewport
- Teste em diferentes dispositivos
- Use as ferramentas de desenvolvedor

### Cálculos incorretos
- Verifique as tabelas de taxas
- Confirme as fórmulas implementadas
- Teste com valores conhecidos

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 👨‍💻 Desenvolvido por

**Nova Era Soluções**
- 📞 Contato: 75 98134-2511
- 📧 E-mail: novaerasolucoes.ba@gmail.com
- 📱 Instagram: @novaera_solucoes
- 📍 Endereço: Avenida Teodônio Vilela Nº 310, Feira de Santana

---

💡 **Dica**: Para melhor performance, mantenha os arquivos CSS e JS minificados em produção.

