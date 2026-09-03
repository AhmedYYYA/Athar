(() => {
  "use strict";

  /* ==========================================================
     ATHAR v3 — Application state and controlled content
     Front-end demonstration only. No live AI or real child data.
     ========================================================== */

  const I18N = Object.freeze({
    en: {
      navPurpose: "Why ATHAR",
      navJourney: "Learning journey",
      navSafety: "Safety",
      navProduct: "Experience",
      eyebrow: "UAE-born • Child-safe • AI-ready",
      heroTitle: "Leave a better trace in the age of AI.",
      heroText:
        "ATHAR helps children aged 7–12 build judgment, creativity and independence to use AI responsibly—without letting AI do the thinking for them.",
      ctaPrimary: "Enter the experience",
      ctaSecondary: "See how learning works",
      trust1: "No unrestricted child chat",
      trust2: "Adult-supervised practice",
      trust3: "No advertising",
      explore: "Explore",
      learn: "Learn",
      create: "Create",
      impact: "Impact",
      purposeKicker: "THE IDEA",
      purposeTitle:
        "AI literacy that strengthens the child, not dependence on the tool.",
      purposeText:
        "ATHAR is designed around one governing principle: the child remains the thinker. AI remains the tool.",
      journeyKicker: "EXPLORE • LEARN • CREATE • IMPACT",
      journeyTitle: "A visible journey from curiosity to responsible impact.",
      superTitle: "A thinking routine children can reuse anywhere.",
      superText:
        "State the goal, use helpful details, pick the output, examine the result and refine the work.",
      safetyKicker: "CHILD-SAFE BY DESIGN",
      safetyTitle: "Safety is architecture, not a disclaimer.",
      safetyText:
        "ATHAR separates prevention, detection, response, recovery and assurance so child-facing AI practice remains bounded and supervised.",
      safetyPassport: "Safety Passport",
      safetyPassportText:
        "Learners demonstrate core safety habits before guided open practice is available.",
      skillsPassport: "Skills Passport",
      skillsPassportText:
        "Evidence-based progress across judgment, ethics, AI technique and creation.",
      productKicker: "ATHAR V3 INTERACTIVE DEMO",
      productTitle:
        "See the product through the eyes of a child, parent and educator.",
      productText:
        "This demonstration is intentionally front-end only: no live AI, no authentication, no payments and no real child data.",
      roleChild: "Young Explorer",
      roleParent: "Parent",
      roleEducator: "Educator",
      demoStatus: "Safety-first demo",
      closing: "The child remains the thinker. AI remains the tool.",
      footerLine: "UAE-born • Child-safe • AI-ready",
      footerDisclaimer:
        "Concept demonstration. Brand identity controlled to ATHAR production standards."
    },
    ar: {
      navPurpose: "لماذا أثر",
      navJourney: "رحلة التعلم",
      navSafety: "السلامة",
      navProduct: "التجربة",
      eyebrow: "من الإمارات • آمن للطفل • جاهزية للذكاء الاصطناعي",
      heroTitle: "اترك أثراً أفضل في عصر الذكاء الاصطناعي.",
      heroText:
        "تساعد «أثر» الأطفال من 7 إلى 12 عاماً على بناء الحكم والإبداع والاستقلالية لاستخدام الذكاء الاصطناعي بمسؤولية، مع بقاء الطفل هو المفكّر.",
      ctaPrimary: "ادخل التجربة",
      ctaSecondary: "شاهد كيف يحدث التعلم",
      trust1: "لا توجد محادثة طفل غير مقيدة",
      trust2: "ممارسة بإشراف بالغ",
      trust3: "لا إعلانات",
      explore: "نكتشف",
      learn: "نتعلم",
      create: "نبتكر",
      impact: "نؤثر",
      purposeKicker: "الفكرة",
      purposeTitle: "ثقافة ذكاء اصطناعي تقوّي الطفل بدلاً من الاعتماد على الأداة.",
      purposeText:
        "صُممت «أثر» حول مبدأ حاكم واحد: يبقى الطفل هو المفكّر، ويبقى الذكاء الاصطناعي هو الأداة.",
      journeyKicker: "نكتشف • نتعلم • نبتكر • نؤثر",
      journeyTitle: "رحلة واضحة من الفضول إلى الأثر المسؤول.",
      superTitle: "روتين تفكير يستطيع الطفل استخدامه في أي سياق.",
      superText:
        "حدد الهدف، استخدم التفاصيل المفيدة، اختر المخرجات، افحص النتيجة ثم حسّن العمل.",
      safetyKicker: "السلامة بالتصميم",
      safetyTitle: "السلامة بنية معمارية وليست عبارة تنبيه.",
      safetyText:
        "تفصل «أثر» بين الوقاية والكشف والاستجابة والتعافي والتحقق لضمان بقاء ممارسة الذكاء الاصطناعي للطفل مضبوطة وتحت الإشراف.",
      safetyPassport: "جواز السلامة",
      safetyPassportText:
        "يثبت المتعلم عادات السلامة الأساسية قبل إتاحة الممارسة المفتوحة الموجهة.",
      skillsPassport: "جواز المهارات",
      skillsPassportText:
        "تقدم قائم على الأدلة في الحكم والأخلاقيات وتقنيات الذكاء الاصطناعي والإبداع.",
      productKicker: "تجربة أثر V3 التفاعلية",
      productTitle: "شاهد المنتج من منظور الطفل وولي الأمر والمعلم.",
      productText:
        "هذا العرض واجهة أمامية فقط: لا يوجد ذكاء اصطناعي مباشر أو تسجيل دخول أو دفع أو بيانات أطفال حقيقية.",
      roleChild: "المستكشف الصغير",
      roleParent: "ولي الأمر",
      roleEducator: "المعلم",
      demoStatus: "عرض يضع السلامة أولاً",
      closing: "يبقى الطفل هو المفكّر. ويبقى الذكاء الاصطناعي هو الأداة.",
      footerLine: "من الإمارات • آمن للطفل • جاهزية للذكاء الاصطناعي",
      footerDisclaimer: "عرض مفاهيمي. الهوية البصرية مضبوطة وفق معايير إنتاج أثر."
    }
  });

  const PRINCIPLES = Object.freeze({
    en: [
      ["Human agency", "The child sets the goal, makes choices and owns the final work.", "#0EA7A1"],
      ["Judgment before trust", "Learners are taught to question confidence, verify claims and notice uncertainty.", "#178DCE"],
      ["Creation over copying", "AI supports ideation and refinement without replacing original thought.", "#F7931E"],
      ["Responsible impact", "Learning includes ethics, privacy, safety and consequences for other people.", "#7457C8"]
    ],
    ar: [
      ["الوكالة الإنسانية", "الطفل يحدد الهدف ويتخذ القرارات ويتحمل ملكية العمل النهائي.", "#0EA7A1"],
      ["الحكم قبل الثقة", "يتعلم الطفل مساءلة الثقة والتحقق من الادعاءات وملاحظة عدم اليقين.", "#178DCE"],
      ["الابتكار لا النسخ", "يدعم الذكاء الاصطناعي توليد الأفكار والتحسين دون أن يحل محل التفكير الأصلي.", "#F7931E"],
      ["الأثر المسؤول", "يشمل التعلم الأخلاقيات والخصوصية والسلامة وتأثير القرارات على الآخرين.", "#7457C8"]
    ]
  });

  const JOURNEY = Object.freeze({
    en: [
      ["01", "Explore", "Ask better questions and notice what matters.", "#0EA7A1"],
      ["02", "Learn", "Build knowledge, judgment and verification habits.", "#178DCE"],
      ["03", "Create", "Turn ideas into original work and useful solutions.", "#F7931E"],
      ["04", "Impact", "Apply learning responsibly and leave a positive trace.", "#7457C8"]
    ],
    ar: [
      ["01", "نكتشف", "نطرح أسئلة أفضل ونلاحظ ما يهم.", "#0EA7A1"],
      ["02", "نتعلم", "نبني المعرفة والحكم وعادات التحقق.", "#178DCE"],
      ["03", "نبتكر", "نحوّل الأفكار إلى أعمال أصلية وحلول مفيدة.", "#F7931E"],
      ["04", "نؤثر", "نطبق التعلم بمسؤولية ونترك أثراً إيجابياً.", "#7457C8"]
    ]
  });

  const SUPER = Object.freeze({
    en: [["S", "State"], ["U", "Use"], ["P", "Pick"], ["E", "Examine"], ["R", "Refine"]],
    ar: [["S", "حدد"], ["U", "استخدم"], ["P", "اختر"], ["E", "افحص"], ["R", "حسّن"]]
  });

  const SAFETY = Object.freeze({
    en: [
      ["01", "Prevent", "Age-bounded experiences, adult controls and no unrestricted child chatbot."],
      ["02", "Detect", "Safety classifiers, prompt checks and model-response inspection."],
      ["03", "Respond", "Coaching, blocking and adult escalation proportionate to event severity."],
      ["04", "Recover", "Return the learner to a safe state and preserve essential evidence only."],
      ["05", "Assure", "Release gates, red-team testing, privacy review and Arabic parity checks."]
    ],
    ar: [
      ["01", "الوقاية", "تجارب مقيدة بالعمر وتحكم للبالغ وعدم وجود محادثة طفل غير مقيدة."],
      ["02", "الكشف", "فحوص سلامة للمدخلات والمخرجات وتصنيف الأحداث."],
      ["03", "الاستجابة", "توجيه أو حجب أو تصعيد للبالغ بما يتناسب مع مستوى الحدث."],
      ["04", "التعافي", "إعادة المتعلم إلى حالة آمنة مع حفظ الحد الأدنى من الأدلة الضرورية."],
      ["05", "التحقق", "بوابات إصدار واختبارات خصومية ومراجعة خصوصية وتكافؤ عربي."]
    ]
  });

  const DEMO = Object.freeze({
    child: {
      en: {
        name: "Maya",
        sub: "Young Explorer • Age 10",
        title: "Good morning, Maya",
        desc: "Your next learning mission is ready.",
        metrics: [["4", "Completed missions"], ["6/6", "Safety Passport"], ["72%", "Skills pathway"], ["7", "Day streak"]],
        card: "Mission 04 — Can AI be wrong?",
        copy: "Compare two answers, find the weak claim and explain how you would verify it before trusting the result.",
        side: "Recent activity",
        activity: ["Completed “Ask before you trust”", "Earned Verification badge", "Parent enabled Guided Practice"]
      },
      ar: {
        name: "مايا",
        sub: "مستكشفة صغيرة • 10 أعوام",
        title: "صباح الخير يا مايا",
        desc: "مهمتك التعليمية التالية جاهزة.",
        metrics: [["4", "مهمات مكتملة"], ["6/6", "جواز السلامة"], ["72%", "مسار المهارات"], ["7", "أيام متتالية"]],
        card: "المهمة 04 — هل يمكن للذكاء الاصطناعي أن يخطئ؟",
        copy: "قارني بين إجابتين، واكتشفي الادعاء الضعيف، ثم اشرحي كيف ستتحققين منه قبل الوثوق بالنتيجة.",
        side: "النشاط الأخير",
        activity: ["أكملت «اسأل قبل أن تثق»", "حصلت على شارة التحقق", "فعّل ولي الأمر الممارسة الموجهة"]
      }
    },
    parent: {
      en: {
        name: "ATHAR Family",
        sub: "Parent supervision view",
        title: "Family overview",
        desc: "Learning and safety signals without routine transcript surveillance.",
        metrics: [["3", "Children"], ["11", "Missions"], ["0", "Critical alerts"], ["86%", "Weekly engagement"]],
        card: "Learning insight — Verification",
        copy: "Maya is improving at spotting uncertain answers and checking supporting evidence. No intervention is required.",
        side: "Adult controls",
        activity: ["Guided Practice: ON", "Weekly summary ready", "No critical safety events"]
      },
      ar: {
        name: "عائلة أثر",
        sub: "واجهة إشراف ولي الأمر",
        title: "نظرة عامة للأسرة",
        desc: "إشارات تعلم وسلامة دون مراقبة اعتيادية للمحادثات.",
        metrics: [["3", "أطفال"], ["11", "مهمة"], ["0", "تنبيهات حرجة"], ["86%", "التفاعل الأسبوعي"]],
        card: "مؤشر التعلم — التحقق",
        copy: "تتحسن مايا في اكتشاف الإجابات غير المؤكدة والتحقق من الأدلة الداعمة. لا يلزم تدخل حالياً.",
        side: "تحكم البالغ",
        activity: ["الممارسة الموجهة: مفعلة", "الملخص الأسبوعي جاهز", "لا توجد أحداث سلامة حرجة"]
      }
    },
    educator: {
      en: {
        name: "Cohort 5A",
        sub: "Educator dashboard",
        title: "Cohort dashboard",
        desc: "Learning evidence, safety status and intervention signals across the group.",
        metrics: [["18", "Learners"], ["84%", "Completion"], ["2", "Need support"], ["91%", "Safety Passport"]],
        card: "Cohort insight — Examine",
        copy: "Most learners identify obvious errors. The next activity targets subtle confidence cues and source quality.",
        side: "Cohort activity",
        activity: ["Mission 04 assigned", "2 learners flagged for support", "Arabic parity review passed"]
      },
      ar: {
        name: "المجموعة 5A",
        sub: "لوحة المعلم",
        title: "لوحة المجموعة",
        desc: "أدلة التعلم وحالة السلامة وإشارات التدخل على مستوى المجموعة.",
        metrics: [["18", "متعلماً"], ["84%", "الإكمال"], ["2", "يحتاجون دعماً"], ["91%", "جواز السلامة"]],
        card: "مؤشر المجموعة — الفحص",
        copy: "يكتشف معظم المتعلمين الأخطاء الواضحة. يركز النشاط التالي على مؤشرات الثقة وجودة المصدر.",
        side: "نشاط المجموعة",
        activity: ["تم إسناد المهمة 04", "متعلّمان يحتاجان دعماً", "اجتازت مراجعة التكافؤ العربي"]
      }
    }
  });

  const ICONS = Object.freeze([
    '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="4"/><path d="M29 29l10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M21 14v14M14 21h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 12c7-3 12-3 16 0v25c-4-3-9-3-16 0V12Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M40 12c-7-3-12-3-16 0v25c4-3 9-3 16 0V12Z" fill="none" stroke="currentColor" stroke-width="3"/></svg>',
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 35l8-20 14-5-5 14-17 11Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="27" cy="18" r="3" fill="currentColor"/><path d="M12 36l-3 5 6-2" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 7l4 10 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1 4-10Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>'
  ]);

  const SUPER_TONES = Object.freeze(["#0EA7A1", "#178DCE", "#7457C8", "#F7931E", "#F9B719"]);

  const state = {
    language: "en",
    role: "child",
    lastFocusedElement: null
  };

  /* ==========================================================
     DOM helpers
     ========================================================== */

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const elements = {
    languageButton: $("#langBtn"),
    menuButton: $("#menuBtn"),
    mobileNav: $("#mobileNav"),
    principlesGrid: $("#principlesGrid"),
    journeyGrid: $("#journeyGrid"),
    superSteps: $("#superSteps"),
    safetyStack: $("#safetyStack"),
    profileCard: $("#profileCard"),
    sidebarNav: $("#sidebarNav"),
    demoHeading: $("#demoHeading"),
    metricGrid: $("#metricGrid"),
    primaryCard: $("#primaryCard"),
    secondaryCard: $("#secondaryCard"),
    missionModal: $("#missionModal"),
    modalClose: $("#modalClose"),
    missionTitle: $("#missionTitle"),
    missionPrompt: $("#missionPrompt"),
    answerGrid: $("#answerGrid"),
    missionFeedback: $("#missionFeedback")
  };

  /* ==========================================================
     Language / document direction
     ========================================================== */

  function applyLanguage() {
    const t = I18N[state.language];
    const isArabic = state.language === "ar";

    document.documentElement.lang = state.language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    elements.languageButton.textContent = isArabic ? "English" : "العربية";

    $$('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.hasOwn(t, key)) {
        element.textContent = t[key];
      }
    });

    renderStaticContent();
    renderDemo();
  }

  /* ==========================================================
     Static content rendering
     ========================================================== */

  function renderStaticContent() {
    const language = state.language;

    elements.principlesGrid.innerHTML = PRINCIPLES[language]
      .map(
        ([title, copy, tone], index) => `
          <article class="principle-card">
            <div class="icon-tile" style="background:${tone}18;color:${tone}">
              ${ICONS[index]}
            </div>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `
      )
      .join("");

    elements.journeyGrid.innerHTML = JOURNEY[language]
      .map(
        ([step, title, copy, tone], index) => `
          <article class="journey-card" style="--tone:${tone}">
            <span class="journey-index">${step}</span>
            <div class="icon-tile">${ICONS[index]}</div>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `
      )
      .join("");

    elements.superSteps.innerHTML = SUPER[language]
      .map(
        ([letter, label], index) => `
          <div class="super-step" style="--step:${SUPER_TONES[index]}">
            <strong>${letter}</strong>
            <span>${label}</span>
          </div>
        `
      )
      .join("");

    elements.safetyStack.innerHTML = SAFETY[language]
      .map(
        ([number, title, copy]) => `
          <div class="safety-item">
            <div class="num">${number}</div>
            <div>
              <b>${title}</b>
              <span>${copy}</span>
            </div>
          </div>
        `
      )
      .join("");
  }

  /* ==========================================================
     Product demo rendering
     ========================================================== */

  function renderDemo() {
    const d = DEMO[state.role][state.language];
    const isArabic = state.language === "ar";
    const progress = state.role === "child" ? 72 : state.role === "parent" ? 86 : 84;

    const sidebarLabels = isArabic
      ? ["نظرة عامة", "المهمات", "جواز السلامة", "جواز المهارات"]
      : ["Overview", "Missions", "Safety Passport", "Skills Passport"];

    elements.profileCard.innerHTML = `
      <strong>${d.name}</strong>
      <small>${d.sub}</small>
    `;

    elements.sidebarNav.innerHTML = sidebarLabels
      .map(
        (label, index) => `
          <div class="sidebar-item ${index === 0 ? "active" : ""}">
            <span class="sidebar-dot" aria-hidden="true"></span>
            ${label}
          </div>
        `
      )
      .join("");

    elements.demoHeading.innerHTML = `
      <div>
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
      </div>
      <span class="context-chip">${isArabic ? "بيئة تجريبية" : "Demo environment"}</span>
    `;

    elements.metricGrid.innerHTML = d.metrics
      .map(
        ([value, label]) => `
          <div class="metric">
            <strong>${value}</strong>
            <span>${label}</span>
          </div>
        `
      )
      .join("");

    elements.primaryCard.innerHTML = `
      <h4>${d.card}</h4>
      <p>${d.copy}</p>
      <div class="progress" aria-label="Progress ${progress}%">
        <span style="width:${progress}%"></span>
      </div>
      ${state.role === "child" ? renderMissionRows() : renderControlledStatus()}
    `;

    elements.secondaryCard.innerHTML = `
      <h4>${d.side}</h4>
      ${d.activity
        .map(
          (item) => `
            <div class="activity-row">
              <span class="activity-dot" aria-hidden="true"></span>
              <span>${item}</span>
            </div>
          `
        )
        .join("")}
    `;

    bindDynamicMissionButtons();
  }

  function renderMissionRows() {
    const isArabic = state.language === "ar";
    const rows = isArabic
      ? [
          [4, "هل يمكن للذكاء الاصطناعي أن يخطئ؟", "جاهزة الآن"],
          [5, "تحقق من المصدر", "مقفلة حتى المهمة 04"],
          [6, "ابتكر ثم تأمل", "مقفلة حتى المهمة 05"]
        ]
      : [
          [4, "Can AI be wrong?", "Ready now"],
          [5, "Check the source", "Locked until Mission 04"],
          [6, "Create, then reflect", "Locked until Mission 05"]
        ];

    return rows
      .map(
        ([number, title, status], index) => `
          <div class="mission-row">
            <div class="mission-num">${number}</div>
            <div>
              <strong>${title}</strong>
              <small>${status}</small>
            </div>
            <button
              class="mission-action js-open-mission"
              type="button"
              ${index > 0 ? "disabled aria-disabled=\"true\"" : ""}
            >
              ${isArabic ? "ابدأ" : "Start"}
            </button>
          </div>
        `
      )
      .join("");
  }

  function renderControlledStatus() {
    const isArabic = state.language === "ar";

    return `
      <div class="mission-row">
        <div class="mission-num">✓</div>
        <div>
          <strong>${isArabic ? "الحالة المضبوطة الحالية" : "Current controlled status"}</strong>
          <small>${isArabic ? "إعدادات يديرها البالغ" : "Adult-managed settings"}</small>
        </div>
        <button class="mission-action js-open-mission" type="button">
          ${isArabic ? "مراجعة" : "Review"}
        </button>
      </div>
    `;
  }

  function bindDynamicMissionButtons() {
    $$(".js-open-mission", elements.primaryCard).forEach((button) => {
      if (!button.disabled) {
        button.addEventListener("click", openMission);
      }
    });
  }

  /* ==========================================================
     Mission dialog
     ========================================================== */

  function openMission(event) {
    const isArabic = state.language === "ar";
    state.lastFocusedElement = event?.currentTarget || document.activeElement;

    elements.missionTitle.textContent = isArabic ? "مهمة التحقق" : "Verification mission";
    elements.missionPrompt.textContent = isArabic
      ? "يقول الذكاء الاصطناعي: «هذه الحقيقة مؤكدة دائماً ولا تحتاج إلى مصدر». ما أفضل استجابة؟"
      : "AI says: “This fact is always correct and does not need a source.” What is the best response?";

    const answers = isArabic
      ? ["أثق بها مباشرة", "أتحقق من مصدر مناسب", "أشاركها قبل التحقق"]
      : ["Trust it immediately", "Check an appropriate source", "Share it before checking"];

    elements.answerGrid.innerHTML = answers
      .map(
        (answer, index) => `
          <button class="answer" type="button" data-answer-index="${index}">
            ${answer}
          </button>
        `
      )
      .join("");

    elements.missionFeedback.textContent = "";
    elements.missionFeedback.className = "feedback";

    elements.missionModal.hidden = false;
    document.body.style.overflow = "hidden";

    $$(".answer", elements.answerGrid).forEach((button) => {
      button.addEventListener("click", handleAnswer);
    });

    requestAnimationFrame(() => elements.modalClose.focus());
  }

  function handleAnswer(event) {
    const selectedIndex = Number(event.currentTarget.dataset.answerIndex);
    const isArabic = state.language === "ar";
    const isCorrect = selectedIndex === 1;

    elements.missionFeedback.textContent = isCorrect
      ? isArabic
        ? "صحيح — التحقق جزء أساسي من الحكم الجيد."
        : "Correct — verification is part of good judgment."
      : isArabic
        ? "حاول مرة أخرى. الثقة لا تعني الدقة."
        : "Try again. Confidence is not the same as accuracy.";

    elements.missionFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  }

  function closeMission() {
    if (elements.missionModal.hidden) return;

    elements.missionModal.hidden = true;
    document.body.style.overflow = "";

    if (state.lastFocusedElement instanceof HTMLElement) {
      state.lastFocusedElement.focus();
    }
  }

  /* ==========================================================
     Navigation / controls
     ========================================================== */

  function toggleLanguage() {
    state.language = state.language === "en" ? "ar" : "en";
    applyLanguage();
  }

  function toggleMobileMenu() {
    const isOpen = elements.mobileNav.classList.toggle("open");
    elements.menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  function closeMobileMenu() {
    elements.mobileNav.classList.remove("open");
    elements.menuButton.setAttribute("aria-expanded", "false");
  }

  function setRole(button) {
    $$(".role-button").forEach((roleButton) => {
      const selected = roleButton === button;
      roleButton.classList.toggle("active", selected);
      roleButton.setAttribute("aria-selected", String(selected));
    });

    state.role = button.dataset.role;
    renderDemo();
  }

  function bindEvents() {
    elements.languageButton.addEventListener("click", toggleLanguage);
    elements.menuButton.addEventListener("click", toggleMobileMenu);
    elements.modalClose.addEventListener("click", closeMission);

    $$(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    $$(".role-button").forEach((button) => {
      button.addEventListener("click", () => setRole(button));
    });

    elements.missionModal.addEventListener("click", (event) => {
      if (event.target === elements.missionModal) {
        closeMission();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMission();
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================
     Bootstrap
     ========================================================== */

  function init() {
    bindEvents();
    applyLanguage();
  }

  init();
})();
