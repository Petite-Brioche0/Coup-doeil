(() => {
  const secure = (value) => value.replace(/[<>]/g, "").trim();

  const setStatus = (form, message, isError = false) => {
    const status = form.querySelector("[data-status]");
    if (!status) return;
    status.textContent = message;
    status.setAttribute("role", "status");
    status.style.color = isError ? "#b02b2b" : "inherit";
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendToEndpoint = async (form, payload) => {
    const endpoint = form.dataset.endpoint;
    if (!endpoint) return false;
    const submission = {
      ...payload,
      formType: form.dataset.form || "formulaire",
      page: window.location.href,
      submittedAt: new Date().toISOString(),
      _template: "table",
      _captcha: "false",
    };
    if (form.dataset.subject && !submission._subject) {
      submission._subject = form.dataset.subject;
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error("send-failed");
    return true;
  };

  const handleContactForm = () => {
    const form = document.querySelector('[data-form="contact"]');
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = secure(data.get("name"));
      const email = secure(data.get("email"));
      const subject = secure(data.get("subject"));
      const message = secure(data.get("message"));
      if (!name || !validateEmail(email) || !message) {
        setStatus(form, "Merci de remplir tous les champs obligatoires.", true);
        return;
      }
      const payload = { name, email, subject, message };
      try {
        setStatus(form, "Envoi en cours, merci de patienter...");
        await sendToEndpoint(form, payload);
        form.reset();
        setStatus(
          form,
          "Message envoyé ! Nous revenons vers vous sous 48h ouvrées."
        );
      } catch (error) {
        console.error("Contact form submission failed", error);
        setStatus(
          form,
          "Impossible d'envoyer le message. Merci de réessayer dans un instant.",
          true
        );
      }
    });
  };

  const handleRegistrationToggle = () => {
    const container = document.querySelector("[data-form-switch]");
    if (!container) return;

    const buttons = Array.from(
      container.querySelectorAll("[data-toggle-target]")
    );
    const panels = Array.from(container.querySelectorAll("[data-form-panel]"));
    if (!buttons.length || !panels.length) return;

    const normalize = (value = "") => {
      const slug = (value || "").toString().toLowerCase();
      if (["visitor", "visiteur", "visiteurs"].includes(slug)) return "visitor";
      if (["artist", "artiste", "artistes"].includes(slug)) return "artist";
      return null;
    };

    const showPanel = (target, updateUrl = false) => {
      const normalized = normalize(target) || "artist";
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.formPanel !== normalized;
      });
      buttons.forEach((button) => {
        const isActive = button.dataset.toggleTarget === normalized;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("role", normalized);
        window.history.replaceState({}, "", url);
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        showPanel(button.dataset.toggleTarget, true);
      });
    });

    const url = new URL(window.location.href);
    const fromParam = normalize(url.searchParams.get("role"));
    const fromHash = normalize(window.location.hash.replace("#", ""));
    const fallback = normalize(container.dataset.default) || "artist";
    showPanel(fromParam || fromHash || fallback);
  };

  document.addEventListener("DOMContentLoaded", () => {
    handleRegistrationToggle();
    handleContactForm();
  });
})();
