/* ATHAR — curriculum map.
   Six tracks, deliberately wider than "learn to code": understanding,
   instructing, judging, protecting, creating, and the machinery underneath. */

window.ATHAR = window.ATHAR || {};

ATHAR.curriculum = {
  tracks: [
    {
      id: 'understand',
      name: { en: 'Understand it', ar: 'افهمه' },
      blurb: {
        en: 'What AI actually is, how it learns from examples, and where it already lives in your day.',
        ar: 'ما هو الذكاء الاصطناعي فعلًا، وكيف يتعلّم من الأمثلة، وأين تجده في يومك.'
      },
      lessons: [
        { id: 'what-is-ai', name: { en: 'What is AI?', ar: 'ما هو الذكاء الاصطناعي؟' }, traces: 5, ready: true },
        { id: 'patterns',   name: { en: 'Spotting patterns', ar: 'اكتشاف الأنماط' }, traces: 5, ready: false },
        { id: 'data',       name: { en: 'Where examples come from', ar: 'من أين تأتي الأمثلة' }, traces: 5, ready: false }
      ]
    },
    {
      id: 'instruct',
      name: { en: 'Ask it well', ar: 'أحسِن سؤاله' },
      blurb: {
        en: 'Saying what you actually want. Clear goals, useful details, and improving a weak result.',
        ar: 'أن تقول ما تريده بوضوح: هدف واضح، وتفاصيل مفيدة، وتحسين النتيجة الضعيفة.'
      },
      lessons: [
        { id: 'clear-asking', name: { en: 'Say what you mean', ar: 'قل ما تقصد' }, traces: 5, ready: false },
        { id: 'details',      name: { en: 'Add the useful bits', ar: 'أضف التفاصيل المفيدة' }, traces: 5, ready: false },
        { id: 'refine',       name: { en: 'Make it better', ar: 'اجعلها أفضل' }, traces: 5, ready: false }
      ]
    },
    {
      id: 'judge',
      name: { en: 'Check it', ar: 'تحقّق منه' },
      blurb: {
        en: 'AI sounds sure even when it is wrong. Learning to notice, doubt, and verify.',
        ar: 'يبدو الذكاء الاصطناعي واثقًا حتى حين يخطئ. تعلّم أن تلاحظ وتشكّ وتتحقق.'
      },
      lessons: [
        { id: 'can-be-wrong', name: { en: 'When AI is wrong', ar: 'حين يخطئ' }, traces: 5, ready: false },
        { id: 'verify',       name: { en: 'Checking a fact', ar: 'التحقق من معلومة' }, traces: 5, ready: false },
        { id: 'fairness',     name: { en: 'Is it fair to everyone?', ar: 'هل هو منصف للجميع؟' }, traces: 5, ready: false }
      ]
    },
    {
      id: 'protect',
      name: { en: 'Protect yourself', ar: 'احمِ نفسك' },
      blurb: {
        en: 'What stays private, what is safe to share, and when to bring in a trusted adult.',
        ar: 'ما يبقى خاصًا، وما يمكن مشاركته بأمان، ومتى تلجأ إلى شخص بالغ تثق به.'
      },
      lessons: [
        { id: 'private',   name: { en: 'Private means private', ar: 'الخاص يبقى خاصًا' }, traces: 5, ready: false },
        { id: 'not-human', name: { en: 'A tool, not a friend', ar: 'أداة، لا صديق' }, traces: 5, ready: false }
      ]
    },
    {
      id: 'create',
      name: { en: 'Create with it', ar: 'أبدع به' },
      blurb: {
        en: 'Making things where your idea leads and the tool assists — and saying who did what.',
        ar: 'أن تصنع أشياء تقودها فكرتك وتساعدك الأداة — وأن توضّح من فعل ماذا.'
      },
      lessons: [
        { id: 'my-idea',   name: { en: 'Whose idea was it?', ar: 'فكرة من كانت؟' }, traces: 5, ready: false },
        { id: 'credit',    name: { en: 'Giving credit', ar: 'نسب العمل لأصحابه' }, traces: 5, ready: false }
      ]
    },
    {
      id: 'build',
      name: { en: 'See inside', ar: 'انظر في داخله' },
      blurb: {
        en: 'The machinery underneath: steps, rules and logic — the ground floor of coding.',
        ar: 'ما تحت الغطاء: خطوات وقواعد ومنطق — الأساس الأول للبرمجة.'
      },
      lessons: [
        { id: 'steps',  name: { en: 'Thinking in steps', ar: 'التفكير بالخطوات' }, traces: 5, ready: false },
        { id: 'rules',  name: { en: 'If this, then that', ar: 'إذا حدث هذا، فافعل ذاك' }, traces: 5, ready: false },
        { id: 'loops',  name: { en: 'Doing it again', ar: 'التكرار' }, traces: 5, ready: false }
      ]
    }
  ],

  /* Flattened order used by the trail for lock/unlock logic. */
  order: function () {
    var out = [];
    this.tracks.forEach(function (track) {
      track.lessons.forEach(function (l) {
        out.push({ trackId: track.id, trackName: track.name, lesson: l });
      });
    });
    return out;
  }
};
