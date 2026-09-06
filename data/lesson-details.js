/* ATHAR — Mission 5: Add the useful bits.
   Deepens U in SUPER: Use helpful details without oversharing. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessons=ATHAR.lessons||{};

ATHAR.lessons['details']={
  id:'details',
  title:{en:'Add the useful bits',ar:'أضف التفاصيل المفيدة'},
  traces:5,
  badge:{
    id:'detail-designer',
    name:{en:'Detail Designer',ar:'مصمم التفاصيل'},
    line:{en:'You chose details that help the task and left private information out.',ar:'اخترت تفاصيل تساعد المهمة وأبقيت المعلومات الخاصة خارجها.'}
  },
  passport:{
    skills:['relevant-details','safe-details','useful-limits'],
    safety:[]
  },
  stages:[
    {
      type:'teach',
      kicker:{en:'Mission 5',ar:'المهمة 5'},
      title:{en:'Good details make a request easier to use.',ar:'التفاصيل الجيدة تجعل الطلب أسهل للاستخدام.'},
      body:{en:'A helpful detail tells the tool something it needs for the task. You do not need to tell it everything about you.',ar:'التفصيل المفيد يخبر الأداة بشيء تحتاجه للمهمة. ولا تحتاج إلى إخبارها بكل شيء عنك.'},
      ideas:[
        {icon:'eye',label:{en:'Fits the task',ar:'يناسب المهمة'}},
        {icon:'tool',label:{en:'Helps the answer',ar:'يساعد الإجابة'}},
        {icon:'lock',label:{en:'Keeps private things out',ar:'يبقي المعلومات الخاصة خارجاً'}}
      ],
      companion:{en:'Useful details are about the job, not about revealing who you are.',ar:'التفاصيل المفيدة تتعلق بالمهمة، لا بكشف معلوماتك الشخصية.'}
    },
    {
      type:'choice',
      kicker:{en:'Choose the better detail',ar:'اختر التفصيل الأفضل'},
      title:{en:'You want three ideas for a class science poster. Which detail helps most?',ar:'تريد ثلاث أفكار لملصق علوم صفي. أي تفصيل يساعد أكثر؟'},
      options:[
        {id:'topic',label:{en:'The poster is about the water cycle.',ar:'الملصق عن دورة الماء.'},correct:true},
        {id:'shoe',label:{en:'My shoe size is 35.',ar:'مقاس حذائي ٣٥.'},correct:false},
        {id:'street',label:{en:'I live on this exact street...',ar:'أنا أسكن في هذا الشارع بالتحديد...'},correct:false}
      ],
      hint:{en:'Ask: will this detail change the answer in a useful way?',ar:'اسأل: هل سيغيّر هذا التفصيل الإجابة بطريقة مفيدة؟'},
      after:{en:'The topic helps the task. Your shoe size and exact address do not.',ar:'موضوع الملصق يساعد المهمة. أما مقاس الحذاء والعنوان الدقيق فلا يساعدان.'}
    },
    {
      type:'sort',
      kicker:{en:'Sort the details',ar:'صنّف التفاصيل'},
      title:{en:'Helpful, not needed, or private?',ar:'مفيد، غير لازم، أم خاص؟'},
      body:{en:'Put each detail where it belongs.',ar:'ضع كل تفصيل في مكانه المناسب.'},
      buckets:[
        {id:'help',label:{en:'Helpful',ar:'مفيد'}},
        {id:'extra',label:{en:'Not needed',ar:'غير لازم'}},
        {id:'private',label:{en:'Private',ar:'خاص'}}
      ],
      items:[
        {id:'age',label:{en:'The game is for children aged 8.',ar:'اللعبة لأطفال بعمر ٨ سنوات.'},bucket:'help'},
        {id:'indoors',label:{en:'It must work indoors.',ar:'يجب أن تصلح داخل المنزل.'},bucket:'help'},
        {id:'snack',label:{en:'I ate toast this morning.',ar:'أكلت خبزاً محمصاً هذا الصباح.'},bucket:'extra'},
        {id:'password',label:{en:'My password is...',ar:'كلمة مروري هي...'},bucket:'private'}
      ],
      hint:{en:'Helpful details change the task. Private details should stay out even if they are true.',ar:'التفاصيل المفيدة تغيّر المهمة. أما التفاصيل الخاصة فيجب أن تبقى خارجها حتى لو كانت صحيحة.'},
      after:{en:'Exactly. More detail is not always better. The right detail is better.',ar:'بالضبط. المزيد من التفاصيل ليس دائماً أفضل. التفاصيل المناسبة هي الأفضل.'}
    },
    {
      type:'teach',
      kicker:{en:'Useful limits',ar:'حدود مفيدة'},
      title:{en:'A limit can make the answer fit your real need.',ar:'يمكن للحد المفيد أن يجعل الإجابة تناسب حاجتك الحقيقية.'},
      body:{en:'A useful limit might be time, length, age, materials, number of ideas, or where you will use the answer.',ar:'قد يكون الحد المفيد وقتاً، أو طولاً، أو عمراً، أو مواد متاحة، أو عدداً من الأفكار، أو مكان استخدام الإجابة.'},
      ideas:[
        {icon:'pattern',label:{en:'3 ideas',ar:'٣ أفكار'}},
        {icon:'warning',label:{en:'10 minutes',ar:'١٠ دقائق'}},
        {icon:'tool',label:{en:'Use things already at home',ar:'استخدم أشياء موجودة في المنزل'}}
      ]
    },
    {
      type:'multi',
      kicker:{en:'Pick the useful limits',ar:'اختر الحدود المفيدة'},
      title:{en:'You need a quick classroom activity. Which details help?',ar:'تحتاج نشاطاً صفياً سريعاً. أي التفاصيل تساعد؟'},
      body:{en:'Choose every useful and safe detail.',ar:'اختر كل تفصيل مفيد وآمن.'},
      options:[
        {id:'time',label:{en:'It should take 10 minutes.',ar:'يجب أن يستغرق ١٠ دقائق.'},correct:true},
        {id:'group',label:{en:'It is for groups of four children.',ar:'هو لمجموعات من أربعة أطفال.'},correct:true},
        {id:'paper',label:{en:'Use only paper and pencils.',ar:'استخدم الورق والأقلام فقط.'},correct:true},
        {id:'phone',label:{en:'My personal phone number is...',ar:'رقم هاتفي الشخصي هو...'},correct:false},
        {id:'birthday',label:{en:'My full date of birth is...',ar:'تاريخ ميلادي الكامل هو...'},correct:false}
      ],
      hint:{en:'Keep details that shape the activity. Leave identifying details out.',ar:'احتفظ بالتفاصيل التي تشكل النشاط. واترك التفاصيل التي تكشف هويتك خارجاً.'},
      after:{en:'Time, group size and materials shape the answer. Your phone number and full birth date do not belong there.',ar:'الوقت وحجم المجموعة والمواد تشكّل الإجابة. أما رقم الهاتف وتاريخ الميلاد الكامل فلا مكان لهما.'}
    },
    {
      type:'choice',
      kicker:{en:'Enough, not everything',ar:'ما يكفي، لا كل شيء'},
      title:{en:'Which request gives enough useful detail without becoming messy?',ar:'أي طلب يعطي تفاصيل مفيدة كافية من دون أن يصبح مزدحماً؟'},
      options:[
        {id:'thin',label:{en:'Give me an activity.',ar:'أعطني نشاطاً.'},correct:false},
        {id:'fit',label:{en:'Give me 3 ten-minute science activities for four 9-year-olds using paper and pencils.',ar:'أعطني ٣ أنشطة علوم مدة كل منها ١٠ دقائق لأربعة أطفال بعمر ٩ سنوات باستخدام الورق والأقلام.'},correct:true},
        {id:'messy',label:{en:'Give me an activity. I like blue, ate cereal, live near...',ar:'أعطني نشاطاً. أحب الأزرق، وأكلت الحبوب، وأسكن قرب...'},correct:false}
      ],
      hint:{en:'Keep the details that change what a good answer looks like.',ar:'احتفظ بالتفاصيل التي تغيّر شكل الإجابة الجيدة.'},
      after:{en:'The best request has enough task detail and no unnecessary personal information.',ar:'أفضل طلب يحتوي على تفاصيل كافية للمهمة من دون معلومات شخصية غير لازمة.'}
    },
    {
      type:'choice',
      kicker:{en:'Privacy check',ar:'تحقق من الخصوصية'},
      title:{en:'A tool asks for your exact home address to suggest a classroom poster. What should you do?',ar:'تطلب منك أداة عنوان منزلك الدقيق لتقترح ملصقاً صفياً. ماذا تفعل؟'},
      options:[
        {id:'share',label:{en:'Share it because the tool asked.',ar:'أشاركه لأن الأداة طلبته.'},correct:false},
        {id:'skip',label:{en:'Leave it out. It is private and not needed for the task.',ar:'أتركه خارجاً. فهو خاص وغير لازم للمهمة.'},correct:true},
        {id:'more',label:{en:'Add my phone number too.',ar:'أضيف رقم هاتفي أيضاً.'},correct:false}
      ],
      hint:{en:'A request from a tool does not make private information necessary.',ar:'طلب الأداة للمعلومة لا يجعل المعلومات الخاصة ضرورية.'},
      after:{en:'Correct. You decide what is appropriate to share. The tool does not get to decide that for you.',ar:'صحيح. أنت من يقرر ما المناسب مشاركته. الأداة لا تقرر ذلك بدلاً منك.'}
    },
    {
      type:'teach',
      kicker:{en:'Keep this rule',ar:'احتفظ بهذه القاعدة'},
      title:{en:'Useful details are specific — not secret.',ar:'التفاصيل المفيدة محددة — وليست سرية.'},
      body:{en:'Before adding a detail, ask two questions: Does it help the task? Is it safe to share? If either answer is no, leave it out.',ar:'قبل إضافة أي تفصيل، اسأل سؤالين: هل يساعد المهمة؟ وهل من الآمن مشاركته؟ إذا كانت إجابة أي منهما لا، فاتركه خارجاً.'},
      ideas:[
        {icon:'eye',label:{en:'Does it help?',ar:'هل يساعد؟'}},
        {icon:'lock',label:{en:'Is it safe?',ar:'هل هو آمن؟'}},
        {icon:'tool',label:{en:'If not, leave it out',ar:'إن لم يكن، فاتركه'}}
      ],
      companion:{en:'You do not owe a tool personal information just because it asks.',ar:'لست ملزماً بإعطاء الأداة معلومات شخصية لمجرد أنها طلبتها.'}
    },
    {
      type:'celebrate',
      kicker:{en:'Trace earned',ar:'أثر جديد'},
      title:{en:'You are a Detail Designer.',ar:'أنت الآن مصمم للتفاصيل.'},
      body:{en:'You can choose details that shape a useful answer, set helpful limits and keep private information out.',ar:'تستطيع اختيار تفاصيل تشكّل إجابة مفيدة، ووضع حدود مناسبة، وإبقاء المعلومات الخاصة خارجاً.'}
    }
  ]
};
