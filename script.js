// Configuração do WhatsApp
const WHATSAPP_NUMBER = "5534988263756" // Número do WhatsApp (código do país + DDD + número)

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      // Fecha o menu mobile se estiver aberto
      const nav = document.getElementById("nav")
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        document.querySelector(".menu-toggle i").classList.remove("fa-xmark")
        document.querySelector(".menu-toggle i").classList.add("fa-bars")
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Menu Toggle Mobile
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    const icon = menuToggle.querySelector("i")
    icon.classList.toggle("fa-bars")
    icon.classList.toggle("fa-xmark")
  })

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("active")
      const icon = menuToggle.querySelector("i")
      icon.classList.remove("fa-xmark")
      icon.classList.add("fa-bars")
    }
  })
}

// Animação de scroll para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação aos cards
document.querySelectorAll(".card, .area-card, .info-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease-out"
  observer.observe(el)
})

// Integração com WhatsApp no formulário
const form = document.getElementById("contactForm")
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Pegar valores dos campos
    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()
    const telefone = document.getElementById("telefone").value.trim()
    const assunto = document.getElementById("assunto").value.trim()
    const mensagem = document.getElementById("mensagem").value.trim()

    // Validação básica
    if (!nome || !email || !telefone || !assunto || !mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return false
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.")
      return false
    }

    // Montar mensagem para WhatsApp
    const mensagemWhatsApp =
      `🔔 *Nova mensagem do site*\n\n` +
      `👤 *Nome:* ${nome}\n` +
      `📧 *E-mail:* ${email}\n` +
      `📱 *Telefone:* ${telefone}\n` +
      `📋 *Assunto:* ${assunto}\n\n` +
      `💬 *Mensagem:*\n${mensagem}`

    // Codificar mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagemWhatsApp)

    // Criar link do WhatsApp
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemEncoded}`

    // Abrir WhatsApp em nova aba
    window.open(whatsappLink, "_blank")

    // Limpar formulário
    form.reset()

    // Feedback visual
    const btnEnviar = form.querySelector(".btn-enviar")
    const textoOriginal = btnEnviar.innerHTML
    btnEnviar.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem Enviada!'
    btnEnviar.style.backgroundColor = "#4CAF50"

    setTimeout(() => {
      btnEnviar.innerHTML = textoOriginal
      btnEnviar.style.backgroundColor = ""
    }, 3000)
  })
}

// Highlight do menu ativo ao rolar a página
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav a")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  // Adicionar sombra ao header ao rolar
  const header = document.getElementById("header")
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)"
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.15)"
  }
})

// Prevenção de envio duplo
let formEnviando = false
if (form) {
  form.addEventListener("submit", (e) => {
    if (formEnviando) {
      e.preventDefault()
      return false
    }
    formEnviando = true
    setTimeout(() => {
      formEnviando = false
    }, 2000)
  })
}

// Máscara para telefone (opcional - melhoria UX)
const telefoneInput = document.getElementById("telefone")
if (telefoneInput) {
  telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3")
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2")
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, "($1")
    }

    e.target.value = value
  })
}

console.log("✅ Site Daniel Coutinho Advocacia carregado com sucesso!")
console.log("📱 WhatsApp configurado:", WHATSAPP_NUMBER)
