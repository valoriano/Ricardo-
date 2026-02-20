/* =====================================================
   1. MENU MOBILE
===================================================== */

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".main-nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


/* =====================================================
   2. BASE DE CONHECIMENTO
===================================================== */

const KNOWLEDGE = {

  empresa: {
    nome: "PixelWork Agency",
    descricao: "Agência digital especializada em Web, Apps e Branding estratégico.",
    tecnologias: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "Firebase",
      "APIs REST",
      "Android Studio"
    ],
    metodologia: [
      "Análise estratégica",
      "Planeamento estrutural",
      "Design UX/UI",
      "Desenvolvimento técnico",
      "Testes e otimização",
      "Entrega final"
    ]
  },

  apps: {
    educativo: "Aplicativo educativo com sistema de aulas, progresso, quizzes e painel administrativo.",
    ecommerce: "App de vendas com catálogo, carrinho, checkout e integração de pagamento.",
    servicos: "Aplicativo de agendamento, gestão de utilizadores e painel administrativo.",
    social: "Aplicativo com login, perfil, feed e interação entre utilizadores."
  },

  sites: {
    institucional: "Site empresarial com apresentação, serviços e contacto.",
    loja: "E-commerce com produtos, carrinho e checkout.",
    portfolio: "Site para apresentação profissional de projetos.",
    blog: "Plataforma de conteúdo com painel de gestão."
  }

};


/* =====================================================
   3. ESTADO GLOBAL DA IA
===================================================== */

const STATE = {
  etapa: "inicio",       // inicio | tipoApp | tipoSite | final
  projeto: null,
  categoria: null
};


/* =====================================================
   4. FUNÇÕES AUXILIARES
===================================================== */

function calcularOrcamento() {

  if (STATE.projeto === "app")
    return "Estimativa média entre 150€ e 400€, dependendo das funcionalidades.";

  if (STATE.projeto === "site")
    return "Estimativa média entre 80€ e 250€.";

  if (STATE.projeto === "branding")
    return "Identidade visual entre 60€ e 180€.";

  return "O valor depende da complexidade do projeto.";
}


function respostaSaudacao() {
  return "Olá. Como posso ajudar hoje? Está interessado em site, app ou branding?";
}


/* =====================================================
   5. MOTOR PRINCIPAL DA IA
===================================================== */

function responder(mensagemOriginal) {

  const msg = mensagemOriginal.toLowerCase().trim();

  /* ---------- SAUDAÇÕES ---------- */
  if (["oi", "olá", "ola"].includes(msg)) {
    STATE.etapa = "inicio";
    return respostaSaudacao();
  }

  /* ---------- AGRADECIMENTO ---------- */
  if (msg.includes("obrigado") || msg.includes("valeu")) {
    return "Disponha. Se quiser avançar com o projeto, posso estruturar agora.";
  }

  /* ---------- DESPEDIDA ---------- */
  if (msg.includes("tchau") || msg.includes("até logo")) {
    return "Até breve. Quando quiser desenvolver o projeto, estou disponível.";
  }

  /* ---------- TECNOLOGIAS ---------- */
  if (msg.includes("tecnologia")) {
    return "Utilizamos tecnologias modernas como: " +
      KNOWLEDGE.empresa.tecnologias.join(", ");
  }

  /* ---------- METODOLOGIA ---------- */
  if (msg.includes("processo") || msg.includes("metodologia")) {
    return "Trabalhamos seguindo as etapas: " +
      KNOWLEDGE.empresa.metodologia.join(" → ");
  }

  /* ---------- PREÇO ---------- */
  if (msg.includes("preço") || msg.includes("valor")) {
    return calcularOrcamento();
  }

  /* ---------- PROJETO APP ---------- */
  if (msg.includes("app")) {
    STATE.projeto = "app";
    STATE.etapa = "tipoApp";
    return "Que tipo de app deseja? educativo, ecommerce, servicos ou social?";
  }

  if (STATE.etapa === "tipoApp") {
    if (KNOWLEDGE.apps[msg]) {
      STATE.categoria = msg;
      STATE.etapa = "final";
      return KNOWLEDGE.apps[msg] +
        "\n\n" + calcularOrcamento() +
        "\n\nDeseja que eu estruture as funcionalidades completas?";
    }
    return "Pode especificar: educativo, ecommerce, servicos ou social?";
  }

  /* ---------- PROJETO SITE ---------- */
  if (msg.includes("site")) {
    STATE.projeto = "site";
    STATE.etapa = "tipoSite";
    return "Qual tipo de site? institucional, loja, portfolio ou blog?";
  }

  if (STATE.etapa === "tipoSite") {
    if (KNOWLEDGE.sites[msg]) {
      STATE.categoria = msg;
      STATE.etapa = "final";
      return KNOWLEDGE.sites[msg] +
        "\n\n" + calcularOrcamento() +
        "\n\nQuer que eu monte a estrutura detalhada das páginas?";
    }
    return "Informe: institucional, loja, portfolio ou blog.";
  }

  /* ---------- BRANDING ---------- */
  if (msg.includes("logo") || msg.includes("marca") || msg.includes("branding")) {
    STATE.projeto = "branding";
    STATE.etapa = "final";
    return "Branding inclui logotipo profissional, paleta estratégica, tipografia moderna e manual básico." +
      "\n\n" + calcularOrcamento() +
      "\n\nQuer iniciar o conceito visual?";
  }

  /* ---------- CONFIRMAÇÃO ---------- */
  if (msg === "sim" && STATE.etapa === "final") {
    return "Perfeito. Vou estruturar o projeto com arquitetura técnica e funcionalidades detalhadas.";
  }

  return "Pode explicar melhor o que pretende desenvolver?";
}


/* =====================================================
   6. SISTEMA DE CHAT
===================================================== */

const aiButton = document.getElementById("ai-button");
const aiChat = document.getElementById("ai-chat");
const closeAI = document.getElementById("close-ai");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

if (aiButton && aiChat) {
  aiButton.onclick = () => aiChat.style.display = "flex";
}

if (closeAI && aiChat) {
  closeAI.onclick = () => aiChat.style.display = "none";
}

if (sendBtn) {
  sendBtn.onclick = enviarMensagem;
}

function enviarMensagem() {

  const mensagem = userInput.value.trim();
  if (!mensagem) return;

  adicionarMensagem("Você", mensagem);
  userInput.value = "";

  setTimeout(() => {
    const resposta = responder(mensagem);
    adicionarMensagem("IA", resposta);
  }, 300);
}


/* =====================================================
   7. UI CHAT
===================================================== */

function adicionarMensagem(remetente, texto) {

  if (!chatMessages) return;

  const msg = document.createElement("div");
  msg.className = "chat-message";

  msg.innerHTML = `<strong>${remetente}:</strong> ${texto}`;

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =====================================================
   8. FORMULÁRIO CONTACTO
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    contactForm.reset();
  });
    }
