/* ATHAR — Mission: What is AI?
   Content is data. The engine renders it; no stage has bespoke code.
   Rhythm: read a little -> do something -> get feedback -> next idea. */

window.ATHAR = window.ATHAR || {};

ATHAR.lessons = ATHAR.lessons || {};

ATHAR.lessons['what-is-ai'] = {
  id: 'what-is-ai',
  title: { en: 'What is AI?', ar: 'ما هو الذكاء الاصطناعي؟' },
  traces: 5,
  badge: {
    id: 'first-trace',
    name: { en: 'First trace', ar: 'الأثر الأول' },
    line: { en: 'You found AI, understood it, and checked it.', ar: 'وجدتَ الذكاء الاصطناعي، وفهمتَه، وتحققتَ منه.' }
  },

  stages: [

    /* 0 — entry */
    {
      type: 'teach',
      kicker: { en: 'Your first mission', ar: 'مهمتك الأولى' },
      title: { en: 'Let us go and find AI.', ar: 'هيا نبحث عن الذكاء الاصطناعي.' },
      body: {
        en: 'It is already around you. By the end of this mission you will be able to spot it, explain it, and catch it when it gets something wrong.',
        ar: 'إنه موجود حولك بالفعل. في نهاية هذه المهمة ستعرف كيف تكتشفه، وتشرحه، وتمسك عليه خطأه.'
      },
      companion: {
        en: 'I will be here if you want a hint. But you make every choice.',
        ar: 'سأكون هنا إن أردت تلميحًا. لكن القرار كله لك.'
      }
    },

    /* 1 — multi select: spotting AI */
    {
      type: 'multi',
      kicker: { en: 'Spot it', ar: 'اكتشفه' },
      title: { en: 'Which of these use AI?', ar: 'أيٌّ من هذه يستخدم الذكاء الاصطناعي؟' },
      body: { en: 'Pick all the ones you think use AI.', ar: 'اختر كل ما تظن أنه يستخدم الذكاء الاصطناعي.' },
      options: [
        { id: 'voice',  label: { en: 'A voice assistant', ar: 'مساعد صوتي' }, correct: true },
        { id: 'calc',   label: { en: 'A calculator', ar: 'آلة حاسبة' }, correct: false },
        { id: 'video',  label: { en: 'Videos picked for you', ar: 'مقاطع مختارة لك' }, correct: true },
        { id: 'lamp',   label: { en: 'A light switch', ar: 'مفتاح الإضاءة' }, correct: false },
        { id: 'face',   label: { en: 'A phone that knows your face', ar: 'هاتف يعرف وجهك' }, correct: true },
        { id: 'clock',  label: { en: 'A wall clock', ar: 'ساعة حائط' }, correct: false }
      ],
      hint: {
        en: 'A calculator always does the exact same thing. AI learns from examples instead.',
        ar: 'الآلة الحاسبة تفعل الشيء نفسه دائمًا. أما الذكاء الاصطناعي فيتعلّم من الأمثلة.'
      },
      after: {
        en: 'A calculator, a switch and a clock follow fixed rules every time. The others learned from examples.',
        ar: 'الحاسبة والمفتاح والساعة تتبع قواعد ثابتة في كل مرة. أما البقية فتعلّمت من الأمثلة.'
      }
    },

    /* 2 — teach: the definition */
    {
      type: 'teach',
      kicker: { en: 'The idea', ar: 'الفكرة' },
      title: { en: 'AI learns from examples and finds patterns.', ar: 'الذكاء الاصطناعي يتعلّم من الأمثلة ويجد الأنماط.' },
      body: {
        en: 'That is what makes it different from a calculator. Nobody wrote down every answer for it. It looked at a lot of examples and worked out the pattern.',
        ar: 'هذا ما يميّزه عن الآلة الحاسبة. لم يكتب أحد كل الإجابات له، بل نظر إلى أمثلة كثيرة واستنتج النمط.'
      },
      ideas: [
        { icon: 'eye',     label: { en: 'It sees examples', ar: 'يرى أمثلة' } },
        { icon: 'pattern', label: { en: 'It finds a pattern', ar: 'يجد نمطًا' } },
        { icon: 'guess',   label: { en: 'It makes a guess', ar: 'يضع تخمينًا' } }
      ],
      companion: {
        en: 'Notice the last one. A guess can be wrong — hold on to that.',
        ar: 'انتبه للأخيرة. التخمين قد يكون خاطئًا — تذكّر ذلك.'
      }
    },

    /* 3 — sort task */
    {
      type: 'sort',
      kicker: { en: 'Sort it', ar: 'صنّفه' },
      title: { en: 'Who is doing the thinking?', ar: 'من الذي يفكّر هنا؟' },
      body: { en: 'Put each card where it belongs.', ar: 'ضع كل بطاقة في مكانها الصحيح.' },
      buckets: [
        { id: 'human', label: { en: 'A person', ar: 'إنسان' } },
        { id: 'fixed', label: { en: 'Fixed rules', ar: 'قواعد ثابتة' } },
        { id: 'ai',    label: { en: 'AI', ar: 'ذكاء اصطناعي' } }
      ],
      items: [
        { id: 'story',   label: { en: 'Writing a poem about your grandmother', ar: 'كتابة قصيدة عن جدتك' }, bucket: 'human' },
        { id: 'sum',     label: { en: 'Adding 47 and 58', ar: 'جمع ٤٧ و ٥٨' }, bucket: 'fixed' },
        { id: 'suggest', label: { en: 'Suggesting a song you might like', ar: 'اقتراح أغنية قد تعجبك' }, bucket: 'ai' },
        { id: 'sorry',   label: { en: 'Deciding to say sorry to a friend', ar: 'أن تقرر الاعتذار لصديق' }, bucket: 'human' }
      ],
      hint: {
        en: 'Ask yourself: does it need feelings? Does it always give the same answer? Or did it learn?',
        ar: 'اسأل نفسك: هل يحتاج مشاعر؟ هل يعطي الإجابة نفسها دائمًا؟ أم أنه تعلّم؟'
      },
      after: {
        en: 'Only a person decides to say sorry. AI can suggest — it cannot care.',
        ar: 'الإنسان وحده يقرر أن يعتذر. الذكاء الاصطناعي يقترح، لكنه لا يشعر.'
      }
    },

    /* 4 — train the AI (interactive pattern demo) */
    {
      type: 'train',
      kicker: { en: 'Try it', ar: 'جرّبه' },
      title: { en: 'Teach it what a cat looks like.', ar: 'علّمه كيف تبدو القطة.' },
      body: {
        en: 'Give it examples one at a time and watch its guess get better.',
        ar: 'أعطِه مثالًا تلو الآخر، وراقب كيف يتحسّن تخمينه.'
      },
      steps: [
        { label: { en: 'No examples yet', ar: 'لا أمثلة بعد' }, confidence: 8,  guess: { en: 'I have no idea.', ar: 'لا فكرة لديّ.' } },
        { label: { en: '1 example', ar: 'مثال واحد' },     confidence: 30, guess: { en: 'Something with fur?', ar: 'شيء له فرو؟' } },
        { label: { en: '10 examples', ar: '١٠ أمثلة' },     confidence: 62, guess: { en: 'Maybe a cat. Maybe a dog.', ar: 'ربما قطة. أو ربما كلب.' } },
        { label: { en: '100 examples', ar: '١٠٠ مثال' },    confidence: 91, guess: { en: 'That is a cat.', ar: 'هذه قطة.' } }
      ],
      after: {
        en: 'More good examples, better guesses. That is the whole trick — there is no magic in it.',
        ar: 'كلما زادت الأمثلة الجيدة، تحسّن التخمين. هذه هي الحيلة كلها — ولا سحر فيها.'
      },
      companion: {
        en: 'And if you only ever showed it black cats? It might miss a ginger one.',
        ar: 'وماذا لو أريتَه قططًا سوداء فقط؟ قد لا يعرف القطة البرتقالية.'
      }
    },

    /* 5 — spot the mistake */
    {
      type: 'choice',
      kicker: { en: 'Catch it', ar: 'أمسك الخطأ' },
      title: { en: 'AI answered a question. Is it right?', ar: 'أجاب الذكاء الاصطناعي عن سؤال. هل إجابته صحيحة؟' },
      quote: {
        q: { en: 'How many legs does a spider have?', ar: 'كم رجلًا للعنكبوت؟' },
        a: { en: 'A spider has six legs.', ar: 'للعنكبوت ست أرجل.' }
      },
      options: [
        { id: 'right', label: { en: 'That is correct', ar: 'إجابة صحيحة' }, correct: false },
        { id: 'wrong', label: { en: 'That is wrong — spiders have eight', ar: 'خطأ — للعنكبوت ثماني أرجل' }, correct: true },
        { id: 'unsure', label: { en: 'I should check before I believe it', ar: 'يجب أن أتحقق قبل أن أصدّق' }, correct: true }
      ],
      hint: {
        en: 'Count them next time you see one. Eight.',
        ar: 'عُدّها في المرة القادمة. ثماني.'
      },
      after: {
        en: 'It sounded completely sure — and it was wrong. Sounding sure is not the same as being right.',
        ar: 'بدا واثقًا تمامًا — وكان مخطئًا. أن يبدو واثقًا شيء، وأن يكون صحيحًا شيء آخر.'
      }
    },

    /* 6 — privacy choice */
    {
      type: 'multi',
      kicker: { en: 'Protect it', ar: 'احمِه' },
      title: { en: 'Which of these do you keep private?', ar: 'أيٌّ من هذه تبقيه خاصًا؟' },
      body: { en: 'Choose everything you should not type into an AI tool.', ar: 'اختر كل ما لا ينبغي أن تكتبه في أداة ذكاء اصطناعي.' },
      options: [
        { id: 'home',   label: { en: 'Where you live', ar: 'أين تسكن' }, correct: true },
        { id: 'colour', label: { en: 'Your favourite colour', ar: 'لونك المفضل' }, correct: false },
        { id: 'school', label: { en: 'Your school name', ar: 'اسم مدرستك' }, correct: true },
        { id: 'dino',   label: { en: 'A question about dinosaurs', ar: 'سؤال عن الديناصورات' }, correct: false },
        { id: 'phone',  label: { en: 'Your phone number', ar: 'رقم هاتفك' }, correct: true },
        { id: 'photo',  label: { en: 'A photo of your face', ar: 'صورة وجهك' }, correct: true }
      ],
      hint: {
        en: 'Ask: could a stranger use this to find me?',
        ar: 'اسأل: هل يمكن لشخص غريب أن يستخدم هذا ليصل إليّ؟'
      },
      after: {
        en: 'Anything that could help someone find you stays with you. Dinosaurs are safe.',
        ar: 'كل ما قد يساعد أحدًا على الوصول إليك يبقى عندك. أما الديناصورات فآمنة.'
      }
    },

    /* 7 — assemble the rules */
    {
      type: 'teach',
      kicker: { en: 'Your rules', ar: 'قواعدك' },
      title: { en: 'Three rules you now own.', ar: 'ثلاث قواعد صارت لك.' },
      body: {
        en: 'You worked these out yourself in this mission. They hold for every AI tool you ever meet.',
        ar: 'استنتجتها بنفسك في هذه المهمة. وهي تصلح لكل أداة ذكاء اصطناعي تقابلها.'
      },
      ideas: [
        { icon: 'tool',    label: { en: 'It is a tool, not a person', ar: 'إنه أداة، وليس شخصًا' } },
        { icon: 'warning', label: { en: 'It can be wrong', ar: 'قد يكون مخطئًا' } },
        { icon: 'lock',    label: { en: 'Private stays private', ar: 'الخاص يبقى خاصًا' } }
      ],
      companion: {
        en: 'If you only remember one: you are the thinker. It helps.',
        ar: 'إن لم تتذكر إلا واحدة: أنت من يفكّر. وهو يساعد.'
      }
    },

    /* 8 — reward */
    {
      type: 'celebrate',
      title: { en: 'Mission complete', ar: 'اكتملت المهمة' },
      body: {
        en: 'You can spot AI, explain how it learns, catch it being wrong, and protect what is yours.',
        ar: 'صرتَ تكتشف الذكاء الاصطناعي، وتشرح كيف يتعلّم، وتمسك عليه خطأه، وتحمي ما يخصّك.'
      }
    }
  ]
};
