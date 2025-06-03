// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ** Funcionalidade de Rolagem Suave para Links Âncora **
    const navLinks = document.querySelectorAll('#main-header nav ul li a, #main-header nav a.logo, .hero-content a.btn-hero');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const header = document.getElementById('main-header');
                    let headerOffset = header ? header.offsetHeight : 0;
                    let elementPosition = targetSection.getBoundingClientRect().top;
                    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    if (targetId === '#inicio') {
                        offsetPosition = 0; // Rola para o topo absoluto para a seção #inicio
                    }

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ** Integração do Formulário de Contato com MonkeySheet API **
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previne o envio padrão do formulário

            const formData = new FormData(contactForm);
            const name = formData.get('nome') || "Usuário"; // Pega o nome para a mensagem de alerta

            // !!! IMPORTANTE: Substitua 'YOUR_MONKEYSHEET_API_ENDPOINT' pela URL real da sua API MonkeySheet !!!
            const MONKEYSHEET_API_ENDPOINT = 'https://api.sheetmonkey.io/form/ar1AaBqoBMDkkd3MyhSswG';

            // Adiciona um campo extra se o MonkeySheet esperar um nome específico para a "planilha" ou "folha"
            // Por exemplo, se o MonkeySheet espera um campo chamado 'spreadsheetName' ou 'sheetName':
            // formData.append('spreadsheetName', 'ContatosPortfolio'); // Exemplo

            fetch(MONKEYSHEET_API_ENDPOINT, {
                method: 'POST',
                body: formData // FormData é enviado como 'multipart/form-data' ou 'x-www-form-urlencoded' dependendo do servidor
                // Se a API esperar JSON, você precisará converter formData para um objeto e depois para JSON:
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Ou response.text() se a API não retornar JSON
                }
                // Se a resposta não for OK, tenta pegar mais detalhes do erro
                return response.json().then(errorData => { // Tenta ler o corpo do erro como JSON
                    throw new Error(`Erro na API: ${response.status} ${response.statusText}. Detalhes: ${JSON.stringify(errorData)}`);
                }).catch(() => { // Se o corpo do erro não for JSON ou falhar ao ler
                    throw new Error(`Erro na API: ${response.status} ${response.statusText}. A resposta não continha detalhes de erro em JSON.`);
                });
            })
            .then(data => {
                // Sucesso! A API do MonkeySheet processou os dados.
                alert(`Obrigada pelo contato, ${name}! Sua mensagem foi enviada com sucesso.`);
                contactForm.reset(); // Limpa o formulário
                console.log('Sucesso:', data); // Opcional: log da resposta da API
            })
            .catch(error => {
                // Erro ao enviar para a API do MonkeySheet
                console.error('Erro ao enviar formulário:', error);
                alert(`Desculpe, ${name}. Houve um problema ao enviar sua mensagem. Por favor, tente novamente mais tarde ou contate-me por outro meio.\nDetalhe do erro: ${error.message}`);
            });
        });
    }

    // ** Atualizar Ano no Rodapé **
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});