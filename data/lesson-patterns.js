/* ATHAR — Mission 2: Spotting patterns.
   Child-facing, bilingual, deterministic and data-driven. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessons=ATHAR.lessons||{};

ATHAR.lessons['patterns']={
  id:'patterns',
  title:{en:'Spotting patterns',ar:'اكتشاف الأنماط'},
  traces:5,
  badge:{
    id:'pattern-spotter',
    name:{en:'Pattern Spotter',ar:'مكتشف الأنماط'},
    line:{en:'You found patterns and knew when you needed more examples.',ar:'اكتشفت الأنماط وعرفت متى تحتاج إلى أمثلة أكثر.'}
  },
  passport:{
    skills:['patterns','examples','uncertainty'],
    safety:[]
  },
  stages:[
    {
      type:'teach',
      kicker:{en:'Mission 2',ar:'المهمة 2'},
      title:{en:'Your brain spots patterns every day.',ar:'عقلك يلاحظ الأنماط كل يوم.'},
      body:{
        en:'A pattern is something that repeats, or changes in a regular way. Patterns can help us make a good guess about what may happen next.',
        ar:'النمط هو شيء يتكرر، أو يتغيّر بطريقة منتظمة. ويمكن للنمط أن يساعدنا على تخمين ما قد يحدث بعد ذلك.'
      },
      ideas:[
        {icon:'eye',label:{en:'Look closely',ar:'انظر جيداً'}},
        {icon:'pattern',label:{en:'Find what repeats',ar:'ابحث عمّا يتكرر'}},
        {icon:'guess',label:{en:'Guess what comes next',ar:'خمّن ما يأتي بعده'}}
      ],
      companion:{
        en:'You already do this without a computer. AI can use patterns too.',
        ar:'أنت تفعل هذا من دون حاسوب. والذكاء الاصطناعي يمكنه استخدام الأنماط أيضاً.'
      }
    },
    {
      type:'multi',
      kicker:{en:'Spot it',ar:'اكتشفه'},
      title:{en:'Which rows have a clear pattern?',ar:'أي الصفوف فيه نمط واضح؟'},
      body:{en:'Choose every row where you can predict what comes next.',ar:'اختر كل صف تستطيع أن تتوقع ما سيأتي بعده.'},
      options:[
        {id:'ab',label:{en:'🔵 🟡 🔵 🟡 🔵 …',ar:'🔵 🟡 🔵 🟡 🔵 …'},correct:true},
        {id:'abc',label:{en:'⭐ 🌙 ☁️ ⭐ 🌙 ☁️ …',ar:'⭐ 🌙 ☁️ ⭐ 🌙 ☁️ …'},correct:true},
        {id:'random',label:{en:'🐱 🚲 🍉 ✈️ 🧤 …',ar:'🐱 🚲 🍉 ✈️ 🧤 …'},correct:false},
        {id:'count',label:{en:'1, 2, 3, 4, 5 …',ar:'١، ٢، ٣، ٤، ٥ …'},correct:true}
      ],
      hint:{en:'Ask: can I use what I see to guess the next item?',ar:'اسأل نفسك: هل أستطيع استخدام ما أراه لتخمين الشيء التالي؟'},
      after:{en:'A useful pattern gives you a reason for your next guess. A random row does not.',ar:'النمط المفيد يعطيك سبباً لتخمين ما سيأتي. أما الصف العشوائي فلا يفعل.'}
    },
    {
      type:'teach',
      kicker:{en:'The idea',ar:'الفكرة'},
      title:{en:'A pattern helps with a guess. It does not prove everything.',ar:'النمط يساعدك على التخمين، لكنه لا يثبت كل شيء.'},
      body:{
        en:'Seeing something repeat can be useful. But a few examples may not tell the whole story. Good thinkers ask: do I have enough examples?',
        ar:'رؤية شيء يتكرر قد تكون مفيدة. لكن أمثلة قليلة قد لا تخبرك بالقصة كاملة. المفكر الجيد يسأل: هل لدي أمثلة كافية؟'
      },
      ideas:[
        {icon:'pattern',label:{en:'Notice the pattern',ar:'لاحظ النمط'}},
        {icon:'guess',label:{en:'Make a careful guess',ar:'ضع تخميناً حذراً'}},
        {icon:'warning',label:{en:'Stay ready to check',ar:'كن مستعداً للتحقق'}}
      ]
    },
    {
      type:'sort',
      kicker:{en:'Sort it',ar:'صنّفه'},
      title:{en:'Pattern, or not enough information?',ar:'نمط، أم لا توجد معلومات كافية؟'},
      body:{en:'Put each card where it belongs.',ar:'ضع كل بطاقة في مكانها الصحيح.'},
      buckets:[
        {id:'pattern',label:{en:'Clear pattern',ar:'نمط واضح'}},
        {id:'more',label:{en:'Need more examples',ar:'أحتاج أمثلة أكثر'}}
      ],
      items:[
        {id:'days',label:{en:'Monday, Tuesday, Wednesday, Thursday',ar:'الاثنين، الثلاثاء، الأربعاء، الخميس'},bucket:'pattern'},
        {id:'bus',label:{en:'Three red buses all turned left',ar:'ثلاث حافلات حمراء انعطفت يساراً'},bucket:'more'},
        {id:'shapes',label:{en:'▲ ● ▲ ● ▲ ●',ar:'▲ ● ▲ ● ▲ ●'},bucket:'pattern'},
        {id:'dogs',label:{en:'Two dogs I met were brown',ar:'كلبان قابلتهما كانا بنيين'},bucket:'more'}
      ],
      hint:{en:'Repeating sequences are strong patterns. Two or three examples may be too few for a big claim.',ar:'التسلسل المتكرر نمط واضح. أما مثالان أو ثلاثة فقد لا تكفي للحكم على شيء كبير.'},
      after:{en:'Good pattern spotting also means knowing when you do not have enough information.',ar:'اكتشاف النمط الجيد يعني أيضاً أن تعرف متى لا تكون لديك معلومات كافية.'}
    },
    {
      type:'train',
      kicker:{en:'Try it',ar:'جرّبه'},
      title:{en:'Show the system more kinds of cats.',ar:'أرِ النظام أنواعاً أكثر من القطط.'},
      body:{en:'Watch how useful, varied examples can improve a guess.',ar:'شاهد كيف يمكن للأمثلة المفيدة والمتنوعة أن تحسّن التخمين.'},
      steps:[
        {label:{en:'No examples yet',ar:'لا أمثلة بعد'},confidence:8,guess:{en:'I do not know what a cat looks like.',ar:'لا أعرف كيف تبدو القطة.'}},
        {label:{en:'1 cat example',ar:'مثال واحد لقطة'},confidence:28,guess:{en:'Maybe anything furry is a cat?',ar:'ربما كل شيء له فرو هو قطة؟'}},
        {label:{en:'10 different cat examples',ar:'١٠ أمثلة مختلفة للقطط'},confidence:61,guess:{en:'I am starting to notice what cats share.',ar:'بدأت ألاحظ ما تشترك فيه القطط.'}},
        {label:{en:'Many varied cat examples',ar:'أمثلة كثيرة ومتنوعة للقطط'},confidence:88,guess:{en:'This looks like a cat — but I can still be wrong.',ar:'هذا يبدو كقطة — لكن ما زال يمكن أن أخطئ.'}}
      ],
      after:{en:'Useful, varied examples can improve a system. They still do not make every answer certain.',ar:'الأمثلة المفيدة والمتنوعة قد تحسّن النظام، لكنها لا تجعل كل إجابة مؤكدة.'},
      companion:{en:'Different examples matter more than showing the exact same picture again and again.',ar:'الأمثلة المختلفة أهم من عرض الصورة نفسها مرات كثيرة.'}
    },
    {
      type:'choice',
      kicker:{en:'Think first',ar:'فكّر أولاً'},
      title:{en:'Three red buses turned left. What can you safely say?',ar:'ثلاث حافلات حمراء انعطفت يساراً. ماذا يمكنك أن تقول بأمان؟'},
      body:{en:'Choose the best answer.',ar:'اختر أفضل إجابة.'},
      options:[
        {id:'all',label:{en:'Every red bus will always turn left',ar:'كل حافلة حمراء ستنعطف دائماً يساراً'},correct:false},
        {id:'more',label:{en:'I need more examples before I make that rule',ar:'أحتاج إلى أمثلة أكثر قبل أن أضع هذه القاعدة'},correct:true},
        {id:'colour',label:{en:'The colour red makes buses turn left',ar:'اللون الأحمر يجعل الحافلات تنعطف يساراً'},correct:false}
      ],
      hint:{en:'A few examples can start a question. They may not be enough to make a rule.',ar:'بضعة أمثلة قد تبدأ سؤالاً، لكنها قد لا تكفي لوضع قاعدة.'},
      after:{en:'Exactly. A pattern can be interesting without being enough to prove a rule.',ar:'بالضبط. قد يكون النمط مثيراً للاهتمام من دون أن يكون كافياً لإثبات قاعدة.'}
    },
    {
      type:'multi',
      kicker:{en:'Choose examples',ar:'اختر الأمثلة'},
      title:{en:'Which examples would help a cat system learn better?',ar:'أي أمثلة تساعد نظاماً يتعلم القطط بشكل أفضل؟'},
      body:{en:'Pick the useful, varied examples.',ar:'اختر الأمثلة المفيدة والمتنوعة.'},
      options:[
        {id:'poses',label:{en:'Cats sitting, running and sleeping',ar:'قطط تجلس وتجري وتنام'},correct:true},
        {id:'colours',label:{en:'Cats with different colours and sizes',ar:'قطط بألوان وأحجام مختلفة'},correct:true},
        {id:'same',label:{en:'The exact same cat photo 50 times',ar:'صورة القطة نفسها ٥٠ مرة'},correct:false},
        {id:'food',label:{en:'Pictures of sandwiches',ar:'صور شطائر'},correct:false}
      ],
      hint:{en:'Useful examples match the task and show different versions of the thing you want the system to recognise.',ar:'الأمثلة المفيدة تناسب المهمة وتعرض أشكالاً مختلفة للشيء الذي تريد من النظام أن يتعرف إليه.'},
      after:{en:'Variety helps a system notice what matters instead of memorising one picture.',ar:'التنوع يساعد النظام على ملاحظة ما يهم بدلاً من حفظ صورة واحدة.'}
    },
    {
      type:'teach',
      kicker:{en:'Keep these',ar:'احتفظ بهذه'},
      title:{en:'Three pattern rules you can use anywhere.',ar:'ثلاث قواعد للأنماط يمكنك استخدامها في أي مكان.'},
      body:{en:'You can use these with AI, schoolwork, games and everyday decisions.',ar:'يمكنك استخدام هذه القواعد مع الذكاء الاصطناعي، وفي المدرسة، والألعاب، وقراراتك اليومية.'},
      ideas:[
        {icon:'pattern',label:{en:'Look for what repeats',ar:'ابحث عمّا يتكرر'}},
        {icon:'eye',label:{en:'Use varied examples',ar:'استخدم أمثلة متنوعة'}},
        {icon:'warning',label:{en:'A good guess is not proof',ar:'التخمين الجيد ليس دليلاً'}}
      ],
      companion:{en:'You are not trying to be certain all the time. You are learning when to be careful.',ar:'لست بحاجة إلى أن تكون متأكداً دائماً. أنت تتعلم متى تكون حذراً.'}
    },
    {
      type:'celebrate',
      kicker:{en:'Trace earned',ar:'أثر جديد'},
      title:{en:'You are a Pattern Spotter.',ar:'أنت الآن مكتشف للأنماط.'},
      body:{en:'You can find a pattern, choose better examples and notice when a guess needs more evidence.',ar:'تستطيع اكتشاف النمط، واختيار أمثلة أفضل، ومعرفة متى يحتاج التخمين إلى دليل أكثر.'}
    }
  ]
};
