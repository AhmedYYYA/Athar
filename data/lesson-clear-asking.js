/* ATHAR — Mission 4: Say what you mean.
   Introduces the first SUPER behaviours: State goal, Use helpful details, Pick output. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessons=ATHAR.lessons||{};

ATHAR.lessons['clear-asking']={
  id:'clear-asking',
  title:{en:'Say what you mean',ar:'قل ما تقصد'},
  traces:5,
  badge:{
    id:'clear-communicator',
    name:{en:'Clear Communicator',ar:'متحدث واضح'},
    line:{en:'You gave a clear goal, useful details and the kind of answer you wanted.',ar:'حددت هدفاً واضحاً، وأضفت تفاصيل مفيدة، وذكرت شكل الإجابة التي تريدها.'}
  },
  passport:{
    skills:['state-goal','useful-details','pick-output'],
    safety:[]
  },
  stages:[
    {
      type:'teach',
      kicker:{en:'Mission 4',ar:'المهمة 4'},
      title:{en:'You choose the goal. The tool needs to understand it.',ar:'أنت تختار الهدف. والأداة تحتاج أن تفهمه.'},
      body:{
        en:'A clear request tells an AI tool what you want it to help with. You stay in charge of the goal and the final choice.',
        ar:'الطلب الواضح يخبر أداة الذكاء الاصطناعي بما تريد مساعدتها فيه. أنت تبقى صاحب الهدف والقرار النهائي.'
      },
      ideas:[
        {icon:'tool',label:{en:'State the goal',ar:'حدد الهدف'}},
        {icon:'eye',label:{en:'Add useful details',ar:'أضف تفاصيل مفيدة'}},
        {icon:'pattern',label:{en:'Say what kind of answer you want',ar:'اذكر شكل الإجابة التي تريدها'}}
      ],
      companion:{en:'Clear asking is not about fancy words. It is about knowing what you want.',ar:'الطلب الواضح لا يحتاج كلمات معقدة. المهم أن تعرف ما الذي تريده.'}
    },
    {
      type:'choice',
      kicker:{en:'Pick the clearer request',ar:'اختر الطلب الأوضح'},
      title:{en:'Which request gives a clearer goal?',ar:'أي طلب يوضح الهدف بشكل أفضل؟'},
      body:{en:'Choose the better one.',ar:'اختر الأفضل.'},
      options:[
        {id:'vague',label:{en:'Help me with something.',ar:'ساعدني في شيء.'},correct:false},
        {id:'clear',label:{en:'Give me three ideas for a rainy-day game for two children.',ar:'أعطني ثلاث أفكار للعبة في يوم ممطر لطفلين.'},correct:true},
        {id:'nothing',label:{en:'Do it.',ar:'افعلها.'},correct:false}
      ],
      hint:{en:'Can the tool tell what the job actually is?',ar:'هل تستطيع الأداة معرفة ما هي المهمة فعلاً؟'},
      after:{en:'The clearer request gives the tool a job to help with. You still choose whether the ideas are useful.',ar:'الطلب الأوضح يعطي الأداة مهمة تساعد فيها. وأنت ما زلت تقرر إن كانت الأفكار مفيدة.'}
    },
    {
      type:'teach',
      kicker:{en:'SUPER starts here',ar:'هنا تبدأ SUPER'},
      title:{en:'Start with S, U and P.',ar:'ابدأ بـ S وU وP.'},
      body:{en:'State the goal. Use helpful details. Pick the kind of output you want. These three steps make your request easier to understand.',ar:'حدد الهدف. استخدم تفاصيل مفيدة. اختر شكل المخرَج الذي تريده. هذه الخطوات الثلاث تجعل طلبك أسهل للفهم.'},
      ideas:[
        {icon:'tool',label:{en:'S — State goal',ar:'S — حدد الهدف'}},
        {icon:'eye',label:{en:'U — Use helpful details',ar:'U — استخدم تفاصيل مفيدة'}},
        {icon:'pattern',label:{en:'P — Pick output',ar:'P — اختر المخرَج'}}
      ]
    },
    {
      type:'sort',
      kicker:{en:'Build the request',ar:'ابنِ الطلب'},
      title:{en:'What job does each detail do?',ar:'ما وظيفة كل تفصيل؟'},
      body:{en:'Sort each card into Goal, Helpful detail or Output.',ar:'صنّف كل بطاقة إلى هدف أو تفصيل مفيد أو مخرَج.'},
      buckets:[
        {id:'goal',label:{en:'Goal',ar:'الهدف'}},
        {id:'detail',label:{en:'Helpful detail',ar:'تفصيل مفيد'}},
        {id:'output',label:{en:'Output',ar:'المخرَج'}}
      ],
      items:[
        {id:'goal1',label:{en:'Help me make a recycling poster',ar:'ساعدني في إعداد ملصق عن إعادة التدوير'},bucket:'goal'},
        {id:'age',label:{en:'It is for children aged 9',ar:'هو لأطفال بعمر ٩ سنوات'},bucket:'detail'},
        {id:'three',label:{en:'Give me 3 short facts',ar:'أعطني ٣ حقائق قصيرة'},bucket:'output'},
        {id:'wall',label:{en:'It will hang on a classroom wall',ar:'سيُعلّق على جدار الصف'},bucket:'detail'}
      ],
      hint:{en:'The goal says what you are doing. Details add useful context. The output says what form the answer should take.',ar:'الهدف يوضح ما الذي تفعله. التفاصيل تضيف سياقاً مفيداً. والمخرَج يوضح شكل الإجابة.'},
      after:{en:'Exactly. A strong request is built from a clear job, useful context and a useful output.',ar:'بالضبط. الطلب القوي يتكون من مهمة واضحة، وسياق مفيد، ومخرَج مناسب.'}
    },
    {
      type:'multi',
      kicker:{en:'Useful or too much?',ar:'مفيد أم زائد؟'},
      title:{en:'You want ideas for a class poster. Which details help?',ar:'تريد أفكاراً لملصق صفي. أي التفاصيل تساعد؟'},
      body:{en:'Choose the details that are useful and safe.',ar:'اختر التفاصيل المفيدة والآمنة.'},
      options:[
        {id:'topic',label:{en:'The poster is about saving water',ar:'الملصق عن ترشيد الماء'},correct:true},
        {id:'audience',label:{en:'It is for primary-school students',ar:'هو لطلاب المرحلة الابتدائية'},correct:true},
        {id:'short',label:{en:'Use short, easy sentences',ar:'استخدم جملاً قصيرة وسهلة'},correct:true},
        {id:'password',label:{en:'My password is 1234...',ar:'كلمة مروري هي ١٢٣٤...'},correct:false},
        {id:'address',label:{en:'My exact home address is...',ar:'عنوان منزلي بالتفصيل هو...'},correct:false}
      ],
      hint:{en:'A useful detail helps with the task. Private information does not make the answer better.',ar:'التفصيل المفيد يساعد في المهمة. المعلومات الخاصة لا تجعل الإجابة أفضل.'},
      after:{en:'Good. Helpful detail is not the same as personal detail. Keep private information out of the request.',ar:'أحسنت. التفصيل المفيد ليس هو التفصيل الشخصي. أبقِ المعلومات الخاصة خارج الطلب.'}
    },
    {
      type:'choice',
      kicker:{en:'Pick the output',ar:'اختر المخرَج'},
      title:{en:'You need something you can read quickly in class. What should you ask for?',ar:'تحتاج شيئاً تقرؤه بسرعة في الصف. ماذا تطلب؟'},
      body:{en:'Choose the most useful output.',ar:'اختر المخرَج الأكثر فائدة.'},
      options:[
        {id:'long',label:{en:'A 2,000-word essay',ar:'مقال من ٢٠٠٠ كلمة'},correct:false},
        {id:'bullets',label:{en:'Five short bullet points',ar:'خمس نقاط قصيرة'},correct:true},
        {id:'any',label:{en:'Anything you want',ar:'أي شيء تريده'},correct:false}
      ],
      hint:{en:'Think about where and how you will use the answer.',ar:'فكّر أين وكيف ستستخدم الإجابة.'},
      after:{en:'Right. Choosing the output helps the tool give you something you can actually use.',ar:'صحيح. اختيار المخرَج يساعد الأداة على إعطائك شيئاً تستطيع استخدامه فعلاً.'}
    },
    {
      type:'choice',
      kicker:{en:'Improve it',ar:'حسّنه'},
      title:{en:'The answer is too long. What is the best next move?',ar:'الإجابة طويلة جداً. ما أفضل خطوة تالية؟'},
      body:{en:'Choose what you would do.',ar:'اختر ما ستفعله.'},
      options:[
        {id:'accept',label:{en:'Use it even though it does not fit',ar:'استخدمها رغم أنها لا تناسب'},correct:false},
        {id:'refine',label:{en:'Ask for a shorter answer with 3 key points',ar:'اطلب إجابة أقصر فيها ٣ نقاط رئيسية'},correct:true},
        {id:'blame',label:{en:'Assume the tool knows what I meant',ar:'افترض أن الأداة تعرف ما كنت أقصده'},correct:false}
      ],
      hint:{en:'If the result does not fit your goal, make the request clearer.',ar:'إذا لم تناسب النتيجة هدفك، اجعل طلبك أوضح.'},
      after:{en:'Exactly. You can improve the request instead of accepting a weak result.',ar:'بالضبط. يمكنك تحسين الطلب بدلاً من قبول نتيجة ضعيفة.'}
    },
    {
      type:'teach',
      kicker:{en:'Stay the thinker',ar:'ابقَ أنت المفكر'},
      title:{en:'Clear asking helps. Checking still matters.',ar:'الطلب الواضح يساعد. والتحقق ما زال مهماً.'},
      body:{en:'A clear request can improve the answer, but it cannot guarantee the answer is correct. You still examine important results and decide what to use.',ar:'قد يحسّن الطلب الواضح الإجابة، لكنه لا يضمن أنها صحيحة. ما زلت تتحقق من النتائج المهمة وتقرر ما الذي تستخدمه.'},
      ideas:[
        {icon:'tool',label:{en:'You set the goal',ar:'أنت تحدد الهدف'}},
        {icon:'eye',label:{en:'You examine the result',ar:'أنت تفحص النتيجة'}},
        {icon:'warning',label:{en:'You make the final choice',ar:'أنت تتخذ القرار النهائي'}}
      ],
      companion:{en:'The best request still needs your judgement afterwards.',ar:'حتى أفضل طلب يحتاج إلى حكمك بعد ظهور النتيجة.'}
    },
    {
      type:'celebrate',
      kicker:{en:'Trace earned',ar:'أثر جديد'},
      title:{en:'You are a Clear Communicator.',ar:'أنت الآن متحدث واضح.'},
      body:{en:'You can state a goal, choose useful details and ask for an output that fits what you need.',ar:'تستطيع تحديد الهدف، واختيار التفاصيل المفيدة، وطلب مخرَج يناسب ما تحتاجه.'}
    }
  ]
};
