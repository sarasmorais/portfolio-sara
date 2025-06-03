// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ** Funcionalidade de Alternância de Tema (Dark/Light Mode) REMOVIDA **

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

    // ** Simulação de Envio de Formulário de Contato **
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('nome');
            const name = nameInput ? nameInput.value : "Usuário";
            alert(`Obrigada pelo contato, ${name}! Sua mensagem foi recebida (simulação).`);
            contactForm.reset();
        });
    }

    // ** Atualizar Ano no Rodapé **
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});