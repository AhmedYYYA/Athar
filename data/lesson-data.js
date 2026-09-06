/* ATHAR — Mission 3: Where examples come from.
   Child-facing, bilingual, deterministic and data-driven. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessons=ATHAR.lessons||{};

ATHAR.lessons['data']={
  id:'data',
  title:{en:'Where examples come from',ar:'من أين تأتي الأمثلة'},
  traces:5,
  badge:{
    id:'example-detective',
    name:{en:'Example Detective',ar:'محقق الأمثلة'},
    line:{en:'You checked where examples came from, whether they fit the task, and whether their labels made sense.',ar:'تحققت من مصدر الأمثلة، وهل تناسب المهمة، وهل تسمياتها صحيحة.'}
  },
  passport:{
    skills:['data-sources','data-relevance','label-quality'],
    safety:[]
  },
  stages:[
    {
      type:'teach',
      kicker:{en:'Mission 3',ar:'المهمة 3'},
      title:{en:'Every example starts somewhere.',ar:'كل مثال يأتي من مكان ما.'},
      body:{
        en:'AI systems can use pictures, words, sounds or numbers as examples. Those examples may be collected by people or recorded by tools such as cameras and sensors.',
        ar:'يمكن لأنظمة الذكاء الاصطناعي استخدام الصور والكلمات والأصوات والأرقام كأمثلة. وقد يجمع الناس هذه الأمثلة أو تسجلها أدوات مثل الكاميرات وأجهزة الاستشعار.'
      },
      ideas:[
        {icon:'eye',label:{en:'Ask where it came from',ar:'اسأل من أين جاء'}},
        {icon:'pattern',label:{en:'Check if it fits the task',ar:'تحقق هل يناسب المهمة'}},
        {icon:'lock',label:{en:'Protect private information',ar:'احمِ المعلومات الخاصة'}}
      ],
      companion:{
        en:'Good examples are not just “more data”. They should make sense for the job.',
        ar:'الأمثلة الجيدة ليست مجرد «بيانات أكثر». يجب أن تكون مناسبة للمهمة.'
      }
    },
    {
      type:'multi',
      kicker:{en:'Choose the examples',ar:'اختر الأمثلة'},
      title:{en:'You are teaching a system to spot ripe strawberries.',ar:'أنت تعلّم نظاماً كيف يكتشف الفراولة الناضجة.'},
      body:{en:'Which examples would actually help?',ar:'أي الأمثلة ستساعد فعلاً؟'},
      options:[
        {id:'ripe',label:{en:'Photos of ripe strawberries',ar:'صور لفراولة ناضجة'},correct:true},
        {id:'unripe',label:{en:'Photos of unripe strawberries',ar:'صور لفراولة غير ناضجة'},correct:true},
        {id:'angles',label:{en:'Strawberries in different light and angles',ar:'فراولة بإضاءات وزوايا مختلفة'},correct:true},
        {id:'address',label:{en:'A child’s home address',ar:'عنوان منزل طفل'},correct:false},
        {id:'cars',label:{en:'Photos of cars',ar:'صور سيارات'},correct:false},
        {id:'same',label:{en:'The exact same strawberry photo 100 times',ar:'صورة الفراولة نفسها ١٠٠ مرة'},correct:false}
      ],
      hint:{en:'Ask two questions: does it match the task, and does it show something useful?',ar:'اسأل سؤالين: هل يناسب المهمة؟ وهل يعرض شيئاً مفيداً؟'},
      after:{en:'Useful examples match the task and show enough variety. Private information and unrelated pictures do not belong.',ar:'الأمثلة المفيدة تناسب المهمة وتعرض تنوعاً كافياً. أما المعلومات الخاصة والصور غير المرتبطة بالمهمة فلا مكان لها.'}
    },
    {
      type:'teach',
      kicker:{en:'Follow the trail',ar:'اتبع الأثر'},
      title:{en:'Examples can be made, collected or recorded.',ar:'يمكن صنع الأمثلة أو جمعها أو تسجيلها.'},
      body:{
        en:'A person might write a sentence. A camera might record an image. A thermometer might record a number. Before trusting a set of examples, it helps to know how they were created.',
        ar:'قد يكتب شخص جملة. وقد تسجل كاميرا صورة. وقد يسجل مقياس الحرارة رقماً. وقبل الوثوق بمجموعة من الأمثلة، من المفيد معرفة كيف أُنشئت.'
      },
      ideas:[
        {icon:'tool',label:{en:'People can create examples',ar:'يمكن للناس إنشاء أمثلة'}},
        {icon:'eye',label:{en:'Tools can record examples',ar:'يمكن للأدوات تسجيل أمثلة'}},
        {icon:'warning',label:{en:'Sources still need checking',ar:'ولا يزال المصدر يحتاج إلى تحقق'}}
      ]
    },
    {
      type:'sort',
      kicker:{en:'Sort the source',ar:'صنّف المصدر'},
      title:{en:'Where did each example come from?',ar:'من أين جاء كل مثال؟'},
      body:{en:'Put each card in the best group.',ar:'ضع كل بطاقة في المجموعة الأنسب.'},
      buckets:[
        {id:'person',label:{en:'Made by a person',ar:'أنشأه شخص'}},
        {id:'tool',label:{en:'Recorded by a tool',ar:'سجلته أداة'}},
        {id:'wrong',label:{en:'Does not belong in the task',ar:'لا يناسب المهمة'}}
      ],
      items:[
        {id:'label',label:{en:'A teacher writes “cat” under a cat photo',ar:'معلم يكتب «قطة» تحت صورة قطة'},bucket:'person'},
        {id:'temp',label:{en:'A thermometer records 31°C',ar:'مقياس حرارة يسجل ٣١°م'},bucket:'tool'},
        {id:'camera',label:{en:'A camera records a leaf image',ar:'كاميرا تسجل صورة ورقة نبات'},bucket:'tool'},
        {id:'password',label:{en:'Someone’s password in a plant project',ar:'كلمة مرور شخص في مشروع عن النباتات'},bucket:'wrong'}
      ],
      hint:{en:'Think about who or what created the example — and whether the task needs it at all.',ar:'فكّر في مَن أو ما الذي أنشأ المثال، وهل تحتاجه المهمة أصلاً.'},
      after:{en:'Knowing the source helps you understand what an example means and whether it belongs.',ar:'معرفة المصدر تساعدك على فهم معنى المثال وما إذا كان مناسباً للمهمة.'}
    },
    {
      type:'teach',
      kicker:{en:'Names matter',ar:'الأسماء مهمة'},
      title:{en:'A label tells the system what an example is.',ar:'التسمية تخبر النظام ما هو المثال.'},
      body:{
        en:'If a dog photo is labelled “cat”, the system receives a bad lesson. People often help by checking labels before examples are used.',
        ar:'إذا سُمّيت صورة كلب «قطة»، فسيتلقى النظام درساً سيئاً. وغالباً يساعد الناس عبر التحقق من التسميات قبل استخدام الأمثلة.'
      },
      ideas:[
        {icon:'eye',label:{en:'Look at the example',ar:'انظر إلى المثال'}},
        {icon:'pattern',label:{en:'Check its label',ar:'تحقق من تسميته'}},
        {icon:'warning',label:{en:'Fix mistakes first',ar:'أصلح الأخطاء أولاً'}}
      ]
    },
    {
      type:'choice',
      kicker:{en:'Catch the label',ar:'اكتشف التسمية'},
      title:{en:'A dog photo is labelled “cat”. What should happen?',ar:'صورة كلب تحمل تسمية «قطة». ماذا يجب أن يحدث؟'},
      body:{en:'Choose the best action.',ar:'اختر أفضل تصرف.'},
      options:[
        {id:'use',label:{en:'Use it anyway — one mistake will not matter',ar:'استخدمها كما هي — خطأ واحد لن يهم'},correct:false},
        {id:'fix',label:{en:'Fix the label before using the example',ar:'صحح التسمية قبل استخدام المثال'},correct:true},
        {id:'repeat',label:{en:'Copy the wrong example many more times',ar:'انسخ المثال الخاطئ مرات كثيرة'},correct:false}
      ],
      hint:{en:'An example teaches the wrong thing if its label is wrong.',ar:'إذا كانت التسمية خاطئة، فالمثال يعلّم الشيء الخطأ.'},
      after:{en:'Correct. Better examples start with accurate labels.',ar:'صحيح. الأمثلة الأفضل تبدأ بتسميات دقيقة.'}
    },
    {
      type:'multi',
      kicker:{en:'Build a better set',ar:'ابنِ مجموعة أفضل'},
      title:{en:'Which choices make a plant-photo set better?',ar:'أي الخيارات تجعل مجموعة صور النباتات أفضل؟'},
      body:{en:'Choose all the helpful choices.',ar:'اختر كل الخيارات المفيدة.'},
      options:[
        {id:'variety',label:{en:'Use different kinds of plants',ar:'استخدم أنواعاً مختلفة من النباتات'},correct:true},
        {id:'light',label:{en:'Include different lighting and angles',ar:'أضف إضاءات وزوايا مختلفة'},correct:true},
        {id:'labels',label:{en:'Check that each plant name is correct',ar:'تحقق من صحة اسم كل نبات'},correct:true},
        {id:'secret',label:{en:'Add children’s phone numbers',ar:'أضف أرقام هواتف الأطفال'},correct:false},
        {id:'duplicate',label:{en:'Use only one photo copied again and again',ar:'استخدم صورة واحدة منسوخة مراراً'},correct:false}
      ],
      hint:{en:'Good sets are useful, varied and carefully checked. They do not need private information.',ar:'المجموعات الجيدة مفيدة ومتنوعة ومتحقق منها بعناية، ولا تحتاج إلى معلومات خاصة.'},
      after:{en:'Exactly. Quality is about relevance, variety and careful checking — not simply collecting more things.',ar:'بالضبط. الجودة تعني الملاءمة والتنوع والتحقق بعناية، وليست مجرد جمع أشياء أكثر.'}
    },
    {
      type:'choice',
      kicker:{en:'Think before sharing',ar:'فكّر قبل المشاركة'},
      title:{en:'A tool asks for your voice recording “to improve AI”. What is the safest first step?',ar:'أداة تطلب تسجيل صوتك «لتحسين الذكاء الاصطناعي». ما الخطوة الأولى الأكثر أماناً؟'},
      body:{en:'Choose one answer.',ar:'اختر إجابة واحدة.'},
      options:[
        {id:'send',label:{en:'Send it immediately because AI needs examples',ar:'أرسله فوراً لأن الذكاء الاصطناعي يحتاج أمثلة'},correct:false},
        {id:'adult',label:{en:'Ask a trusted adult before sharing a recording of yourself',ar:'اسأل شخصاً بالغاً تثق به قبل مشاركة تسجيل لك'},correct:true},
        {id:'secret',label:{en:'Share it but keep it secret from adults',ar:'شاركه لكن لا تخبر الكبار'},correct:false}
      ],
      hint:{en:'Your voice can be personal information. You stay in charge of what you share.',ar:'صوتك قد يكون معلومة شخصية. أنت صاحب القرار فيما تشارك.'},
      after:{en:'Right. Useful data never cancels privacy. A trusted adult should help with decisions about sharing personal recordings.',ar:'صحيح. فائدة البيانات لا تلغي الخصوصية. ويجب أن يساعد شخص بالغ موثوق في قرارات مشاركة التسجيلات الشخصية.'}
    },
    {
      type:'teach',
      kicker:{en:'Keep these questions',ar:'احتفظ بهذه الأسئلة'},
      title:{en:'Three questions for any set of examples.',ar:'ثلاثة أسئلة لأي مجموعة أمثلة.'},
      body:{en:'These questions help you look behind an AI result instead of treating it like magic.',ar:'تساعدك هذه الأسئلة على النظر خلف نتيجة الذكاء الاصطناعي بدلاً من معاملتها كالسحر.'},
      ideas:[
        {icon:'eye',label:{en:'Where did the examples come from?',ar:'من أين جاءت الأمثلة؟'}},
        {icon:'pattern',label:{en:'Do they fit the task?',ar:'هل تناسب المهمة؟'}},
        {icon:'warning',label:{en:'Were they checked and labelled well?',ar:'هل تم التحقق منها وتسميتها جيداً؟'}}
      ],
      companion:{en:'You do not need to know every detail. Knowing what to ask already makes you a stronger thinker.',ar:'لا تحتاج إلى معرفة كل التفاصيل. مجرد معرفة ما الذي تسأل عنه يجعلك مفكراً أقوى.'}
    },
    {
      type:'celebrate',
      kicker:{en:'Trace earned',ar:'أثر جديد'},
      title:{en:'You are an Example Detective.',ar:'أنت الآن محقق للأمثلة.'},
      body:{en:'You can trace where examples came from, choose what fits the task and catch bad labels or unsafe information.',ar:'تستطيع تتبع مصدر الأمثلة، واختيار ما يناسب المهمة، واكتشاف التسميات الخاطئة أو المعلومات غير الآمنة.'}
    }
  ]
};
