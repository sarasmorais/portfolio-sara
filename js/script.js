// Espera o DOM estar completamente carregado para executar o script
document.addEventListener("DOMContentLoaded", () => {
  // ** Funcionalidade de Rolagem Suave para Links Âncora **
  const navLinks = document.querySelectorAll(
    "#main-header nav ul li a, #main-header nav a.logo, .hero-content a.btn-hero",
  )

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetId = href
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const header = document.getElementById("main-header")
          const headerOffset = header ? header.offsetHeight : 0
          const elementPosition = targetSection.getBoundingClientRect().top
          let offsetPosition = elementPosition + window.pageYOffset - headerOffset

          if (targetId === "#inicio") {
            offsetPosition = 0
          }

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ** Animação dos números das estatísticas **
  function animateNumbers() {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current)
      }, 20)
    })
  }

  // ** Intersection Observer para animações **
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("hero-stats")) {
          animateNumbers()
        }
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    observer.observe(heroStats)
  }

  // ** Efeito de digitação melhorado **
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }
    type()
  }

  // Aplicar efeito de digitação ao nome
  const typingElement = document.querySelector(".typing-animation")
  if (typingElement) {
    const originalText = typingElement.textContent
    setTimeout(() => {
      typeWriter(typingElement, originalText, 150)
    }, 1000)
  }

  // ** Animação das partículas **
  function createParticles() {
    const particlesContainer = document.querySelector(".particles-container")
    if (!particlesContainer) return

    // Adicionar mais partículas dinamicamente
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 6 + "s"
      particle.style.animationDuration = Math.random() * 3 + 4 + "s"
      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  // ** Efeito parallax suave **
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-icon")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ** Funções para exibir mensagens de sucesso e erro **
  function showSuccessMessage(name) {
    // Criar elemento de mensagem de sucesso
    const successDiv = document.createElement('div')
    successDiv.className = 'form-message success-message'
    successDiv.innerHTML = `
      <div class="message-content">
        <div class="message-icon">✅</div>
        <div class="message-text">
          <h3>Mensagem Enviada!</h3>
          <p>Obrigada pelo contato, ${name}! Sua mensagem foi enviada com sucesso.</p>
          <p>Retornarei em breve.</p>
        </div>
      </div>
    `
    
    // Adicionar estilos
    successDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
      min-width: 300px;
      animation: slideIn 0.5s ease-out;
    `
    
    // Adicionar animação CSS
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from { 
          transform: translate(-50%, -50%) scale(0.7); 
          opacity: 0; 
        }
        to { 
          transform: translate(-50%, -50%) scale(1); 
          opacity: 1; 
        }
      }
      .form-message .message-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .form-message .message-icon {
        font-size: 2em;
      }
      .form-message h3 {
        margin: 0 0 10px 0;
        font-size: 1.3em;
      }
      .form-message p {
        margin: 5px 0;
        font-size: 0.95em;
      }
    `
    document.head.appendChild(style)
    
    // Adicionar ao DOM
    document.body.appendChild(successDiv)
    
    // Remover após 4 segundos
    setTimeout(() => {
      successDiv.style.animation = 'slideIn 0.5s ease-out reverse'
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 500)
    }, 4000)
  }

  function showErrorMessage(name, errorDetails) {
    // Criar elemento de mensagem de erro
    const errorDiv = document.createElement('div')
    errorDiv.className = 'form-message error-message'
    errorDiv.innerHTML = `
      <div class="message-content">
        <div class="message-icon">❌</div>
        <div class="message-text">
          <h3>Erro no Envio</h3>
          <p>Desculpe, ${name}. Houve um problema ao enviar sua mensagem.</p>
          <p>Por favor, tente novamente ou contate-me por outro meio.</p>
        </div>
      </div>
    `
    
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #f44336, #d32f2f);
      color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
      min-width: 300px;
      animation: slideIn 0.5s ease-out;
    `
    
    document.body.appendChild(errorDiv)
    
    // Remover após 5 segundos
    setTimeout(() => {
      errorDiv.style.animation = 'slideIn 0.5s ease-out reverse'
      setTimeout(() => {
        document.body.removeChild(errorDiv)
      }, 500)
    }, 5000)
  }
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const name = formData.get("nome") || "Usuário"

      // ** ADICIONANDO DATA E HORA DO ENVIO **
      const now = new Date()
      
      // Formato brasileiro com timezone
      const dataHoraBrasil = now.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      
      // Formato ISO para backup
      const timestampISO = now.toISOString()
      
    //   // Adicionar os timestamps ao formData
    //   formData.append('data_envio', dataHoraBrasil)
    //   formData.append('timestamp', timestampISO)
      
      // Opcional: apenas a data (sem hora)
      const apenasData = now.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
      formData.append('data', apenasData)
      
      // Opcional: apenas a hora
      const apenasHora = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
      formData.append('hora', apenasHora)

      const MONKEYSHEET_API_ENDPOINT = "https://api.sheetmonkey.io/form/ar1AaBqoBMDkkd3MyhSswG"

      // Adicionar indicador de carregamento
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Enviando..."
      submitButton.disabled = true

      fetch(MONKEYSHEET_API_ENDPOINT, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          // SheetMonkey geralmente retorna status 200 mesmo com sucesso
          if (response.ok || response.status === 200) {
            // Não tenta fazer parse JSON, apenas considera sucesso se status for OK
            return { success: true, status: response.status }
          } else {
            throw new Error(`Erro no envio: ${response.status}`)
          }
        })
        .then((data) => {
          // Exibir mensagem de sucesso personalizada
          showSuccessMessage(name)
          // Limpar o formulário
          contactForm.reset()
          console.log("Formulário enviado com sucesso:", data)
        })
        .catch((error) => {
          console.error("Erro ao enviar formulário:", error)
          showErrorMessage(name, error.message)
        })
        .finally(() => {
          submitButton.textContent = originalText
          submitButton.disabled = false
        })
    })
  }

  // ** Atualizar Ano no Rodapé **
  const currentYearSpan = document.getElementById("currentYear")
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // ** Smooth reveal para seções **
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // ** Efeito de hover nos cards de projeto **
  const projectCards = document.querySelectorAll(".projeto-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // ** Animação de fade-in para elementos quando entram na viewport **
  const fadeElements = document.querySelectorAll(".projeto-card, .skill-item-rosa, .sobre-mim-wrapper")

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  fadeElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    fadeObserver.observe(element)
  })
})