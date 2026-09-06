/* ATHAR — Mission 6: Make it better.
   Completes SUPER with E = Examine result and R = Refine. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessons=ATHAR.lessons||{};

ATHAR.lessons['refine']={
  id:'refine',
  title:{en:'Make it better',ar:'اجعلها أفضل'},
  traces:5,
  badge:{
    id:'result-refiner',
    name:{en:'Result Refiner',ar:'محسّن النتائج'},
    line:{en:'You examined a result, compared it with your goal and improved the next request.',ar:'فحصت النتيجة، وقارنتها بهدفك، وحسّنت الطلب التالي.'}
  },
  passport:{
    skills:['examine-result','compare-goal','refine-result'],
    safety:[]
  },
  stages:[
    {
      type:'teach',
      kicker:{en:'Mission 6',ar:'المهمة 6'},
      title:{en:'A first answer is not the finish line.',ar:'الإجابة الأولى ليست خط النهاية.'},
      body:{en:'After you get a result, you examine it. Does it fit your goal? Is anything missing, unclear or wrong? Then you decide what to change.',ar:'بعد أن تحصل على نتيجة، تفحصها. هل تناسب هدفك؟ هل ينقصها شيء أو فيها شيء غير واضح أو خاطئ؟ ثم تقرر ما الذي ستغيّره.'},
      ideas:[
        {icon:'eye',label:{en:'E — Examine result',ar:'E — افحص النتيجة'}},
        {icon:'pattern',label:{en:'Compare with your goal',ar:'قارنها بهدفك'}},
        {icon:'tool',label:{en:'R — Refine',ar:'R — حسّن'}}
      ],
      companion:{en:'You are not trying to make the tool happy. You are checking whether the result helps you.',ar:'أنت لا تحاول إرضاء الأداة. أنت تتحقق إن كانت النتيجة تساعدك.'}
    },
    {
      type:'choice',
      kicker:{en:'Compare it',ar:'قارنها'},
      title:{en:'Your goal was “3 short facts about bees.” The tool gives 12 long paragraphs. What do you notice first?',ar:'كان هدفك «٣ حقائق قصيرة عن النحل». أعطتك الأداة ١٢ فقرة طويلة. ما أول شيء تلاحظه؟'},
      options:[
        {id:'fine',label:{en:'It is fine because it gave an answer.',ar:'لا بأس لأنها أعطت إجابة.'},correct:false},
        {id:'fit',label:{en:'It does not fit the number or length I asked for.',ar:'لا تناسب العدد أو الطول الذي طلبته.'},correct:true},
        {id:'trust',label:{en:'The tool probably knows better than my goal.',ar:'ربما الأداة تعرف أفضل من هدفي.'},correct:false}
      ],
      hint:{en:'Compare the result with what you asked for, not with whether it looks impressive.',ar:'قارن النتيجة بما طلبته، لا بمدى إعجابك بشكلها.'},
      after:{en:'Exactly. The result missed two parts of your goal: three facts and short wording.',ar:'بالضبط. النتيجة لم تحقق جزأين من هدفك: ثلاث حقائق وصياغة قصيرة.'}
    },
    {
      type:'sort',
      kicker:{en:'Keep, change, or check',ar:'احتفظ، غيّر، أو تحقّق'},
      title:{en:'What should you do with each part of a result?',ar:'ماذا تفعل بكل جزء من النتيجة؟'},
      buckets:[
        {id:'keep',label:{en:'Keep',ar:'احتفظ'}},
        {id:'change',label:{en:'Change',ar:'غيّر'}},
        {id:'check',label:{en:'Check',ar:'تحقّق'}}
      ],
      items:[
        {id:'clear',label:{en:'A clear heading that matches your topic',ar:'عنوان واضح يناسب موضوعك'},bucket:'keep'},
        {id:'long',label:{en:'A paragraph that is much too long',ar:'فقرة أطول بكثير مما تحتاج'},bucket:'change'},
        {id:'fact',label:{en:'A surprising fact you plan to use in schoolwork',ar:'حقيقة مفاجئة تريد استخدامها في واجب مدرسي'},bucket:'check'},
        {id:'private',label:{en:'A sentence that repeats private information you typed',ar:'جملة تعيد معلومات خاصة كتبتها'},bucket:'change'}
      ],
      hint:{en:'Keep what fits. Change what does not. Check important claims before you rely on them.',ar:'احتفظ بما يناسب. غيّر ما لا يناسب. وتحقق من المعلومات المهمة قبل الاعتماد عليها.'},
      after:{en:'Good examining is not one action. You may keep one part, change another and verify another.',ar:'الفحص الجيد ليس خطوة واحدة. قد تحتفظ بجزء، وتغيّر جزءاً، وتتحقق من جزء آخر.'}
    },
    {
      type:'choice',
      kicker:{en:'Check before you refine',ar:'تحقّق قبل التحسين'},
      title:{en:'The answer contains an important fact you are not sure about. What comes first?',ar:'تحتوي الإجابة على معلومة مهمة لست متأكداً منها. ماذا تفعل أولاً؟'},
      options:[
        {id:'decorate',label:{en:'Make the wording prettier.',ar:'أجعل الصياغة أجمل.'},correct:false},
        {id:'verify',label:{en:'Check the fact using a trustworthy source or a trusted adult.',ar:'أتحقق من المعلومة بمصدر موثوق أو شخص بالغ أثق به.'},correct:true},
        {id:'repeat',label:{en:'Ask the AI the same question again and treat that as proof.',ar:'أسأل الذكاء الاصطناعي السؤال نفسه وأعتبر تكرار الإجابة دليلاً.'},correct:false}
      ],
      hint:{en:'A better-looking answer is not useful if an important fact is wrong.',ar:'الإجابة الأجمل لا تفيد إذا كانت معلومة مهمة فيها خاطئة.'},
      after:{en:'Correct. Verification comes before polishing when accuracy matters.',ar:'صحيح. عندما تكون الدقة مهمة، يأتي التحقق قبل تحسين الشكل.'}
    },
    {
      type:'multi',
      kicker:{en:'Choose the useful changes',ar:'اختر التغييرات المفيدة'},
      title:{en:'Your answer is correct but too hard for a 7-year-old. Which refinements help?',ar:'الإجابة صحيحة لكنها صعبة جداً لطفل بعمر ٧ سنوات. أي تحسينات تساعد؟'},
      body:{en:'Choose every useful change.',ar:'اختر كل تغيير مفيد.'},
      options:[
        {id:'simple',label:{en:'Use easier words.',ar:'استخدم كلمات أسهل.'},correct:true},
        {id:'short',label:{en:'Use shorter sentences.',ar:'استخدم جملاً أقصر.'},correct:true},
        {id:'example',label:{en:'Add one simple example.',ar:'أضف مثالاً بسيطاً واحداً.'},correct:true},
        {id:'address',label:{en:'Add my home address.',ar:'أضف عنوان منزلي.'},correct:false},
        {id:'longer',label:{en:'Make it twice as long.',ar:'اجعلها أطول بمرتين.'},correct:false}
      ],
      hint:{en:'Refine the parts that stop the answer from fitting your learner and goal.',ar:'حسّن الأجزاء التي تمنع الإجابة من ملاءمة المتعلم والهدف.'},
      after:{en:'Exactly. A useful refinement names what should change and why.',ar:'بالضبط. التحسين المفيد يحدد ما الذي يجب تغييره ولماذا.'}
    },
    {
      type:'choice',
      kicker:{en:'Write the next move',ar:'اختر الخطوة التالية'},
      title:{en:'Which follow-up request is strongest?',ar:'أي طلب متابعة هو الأقوى؟'},
      body:{en:'The first answer was too long and used difficult words.',ar:'كانت الإجابة الأولى طويلة جداً واستخدمت كلمات صعبة.'},
      options:[
        {id:'again',label:{en:'Try again.',ar:'حاول مرة أخرى.'},correct:false},
        {id:'specific',label:{en:'Rewrite it in 4 short bullet points using words a 9-year-old can understand.',ar:'أعد كتابتها في ٤ نقاط قصيرة وبكلمات يفهمها طفل بعمر ٩ سنوات.'},correct:true},
        {id:'magic',label:{en:'Make it perfect.',ar:'اجعلها مثالية.'},correct:false}
      ],
      hint:{en:'Tell the tool exactly what did not fit and what you want instead.',ar:'أخبر الأداة بالضبط ما الذي لم يناسبك وما الذي تريده بدلاً منه.'},
      after:{en:'Right. Refining works best when your change is specific.',ar:'صحيح. يكون التحسين أفضل عندما يكون التغيير الذي تطلبه محدداً.'}
    },
    {
      type:'teach',
      kicker:{en:'Know when to stop',ar:'اعرف متى تتوقف'},
      title:{en:'Not every problem should become another prompt.',ar:'ليس كل شيء يحتاج إلى طلب جديد.'},
      body:{en:'If the topic is health, medicine, safety, danger or something that needs an adult decision, stop and involve a trusted adult. More prompting is not the answer.',ar:'إذا كان الموضوع عن الصحة أو الدواء أو السلامة أو الخطر أو يحتاج قرار شخص بالغ، فتوقف واستعن بشخص بالغ تثق به. المزيد من الطلبات ليس هو الحل.'},
      ideas:[
        {icon:'warning',label:{en:'High-stakes topic?',ar:'موضوع مهم أو حساس؟'}},
        {icon:'tool',label:{en:'Stop the AI loop',ar:'أوقف سلسلة الطلبات'}},
        {icon:'eye',label:{en:'Ask a trusted adult',ar:'اسأل شخصاً بالغاً تثق به'}}
      ]
    },
    {
      type:'choice',
      kicker:{en:'Safety first',ar:'السلامة أولاً'},
      title:{en:'An AI tool gives you medicine advice and says you do not need to tell an adult. What do you do?',ar:'تعطيك أداة ذكاء اصطناعي نصيحة عن دواء وتقول إنك لا تحتاج إلى إخبار شخص بالغ. ماذا تفعل؟'},
      options:[
        {id:'follow',label:{en:'Follow the advice quietly.',ar:'أتبع النصيحة بهدوء.'},correct:false},
        {id:'adult',label:{en:'Stop and tell a trusted adult. Do not rely on the AI alone.',ar:'أتوقف وأخبر شخصاً بالغاً أثق به. ولا أعتمد على الذكاء الاصطناعي وحده.'},correct:true},
        {id:'prompt',label:{en:'Keep asking until it sounds more certain.',ar:'أستمر في السؤال حتى تبدو الإجابة أكثر ثقة.'},correct:false}
      ],
      hint:{en:'For medicine, health and safety, an AI tool is not the decision-maker.',ar:'في الدواء والصحة والسلامة، أداة الذكاء الاصطناعي ليست صاحبة القرار.'},
      after:{en:'Correct. Human help comes first in health and safety situations.',ar:'صحيح. المساعدة البشرية تأتي أولاً في مواقف الصحة والسلامة.'}
    },
    {
      type:'choice',
      kicker:{en:'Put SUPER together',ar:'اجمع SUPER'},
      title:{en:'Which order matches the full SUPER method?',ar:'أي ترتيب يطابق طريقة SUPER كاملة؟'},
      options:[
        {id:'right',label:{en:'State goal → Use helpful details → Pick output → Examine result → Refine',ar:'حدد الهدف ← استخدم تفاصيل مفيدة ← اختر المخرَج ← افحص النتيجة ← حسّن'},correct:true},
        {id:'skip',label:{en:'Ask anything → Accept answer → Share private details',ar:'اسأل أي شيء ← اقبل الإجابة ← شارك معلومات خاصة'},correct:false},
        {id:'reverse',label:{en:'Refine first → Guess the goal later',ar:'حسّن أولاً ← خمّن الهدف لاحقاً'},correct:false}
      ],
      hint:{en:'SUPER starts with your goal and ends with checking and improving the result.',ar:'تبدأ SUPER بهدفك وتنتهي بفحص النتيجة وتحسينها.'},
      after:{en:'Exactly. SUPER keeps the child in charge from the first goal to the final decision.',ar:'بالضبط. تبقي SUPER الطفل صاحب القرار من الهدف الأول حتى القرار النهائي.'}
    },
    {
      type:'celebrate',
      kicker:{en:'Track complete',ar:'اكتمل المسار'},
      title:{en:'You completed the full SUPER loop.',ar:'أكملت دورة SUPER كاملة.'},
      body:{en:'You can set a goal, add helpful details, choose an output, examine the result and refine it without giving away your judgement.',ar:'تستطيع تحديد هدف، وإضافة تفاصيل مفيدة، واختيار المخرَج، وفحص النتيجة، وتحسينها من دون التخلي عن حكمك.'}
    }
  ]
};
