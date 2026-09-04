/* ATHAR Lesson 1 — child-first editorial layer.
   Essential copy is written to be independently understandable by ages 7–9.
   Older learners retain the optional Tell me more layer in lesson1.js. */
(()=>{
const replacements=new Map([
['Discover where AI appears, how examples and patterns matter, and how to use AI wisely.','Let’s find AI in things you know. We will see how it learns from examples, how it can make mistakes, and how to use it safely.'],
['اكتشف أين يظهر الذكاء الاصطناعي، وكيف تؤثر الأمثلة والأنماط، وكيف تستخدمه بوعي.','هيا نبحث عن الذكاء الاصطناعي في أشياء نعرفها. سنرى كيف يتعلم من الأمثلة، وكيف يمكن أن يخطئ، وكيف نستخدمه بأمان.'],
['Find AI','Find AI'],['أتعرف إلى الذكاء الاصطناعي','أجد الذكاء الاصطناعي'],
['Understand it','See how it works'],['أفهمه','أرى كيف يعمل'],
['Check it','Check it'],['أتحقق','أتأكد'],['Use it wisely','Use it safely'],['أستخدمه بوعي','أستخدمه بأمان'],
['Your role','Remember'],['دورك','تذكّر'],
['You remain the thinker. AI remains the tool.','You do the thinking. AI is a tool that can help.'],
['أنت تفكر وتقرر. والذكاء الاصطناعي أداة تساعدك.','أنت تفكر وتقرر. الذكاء الاصطناعي أداة يمكن أن تساعدك.'],
['Where Have You Seen AI?','Where Can We Find AI?'],['أين رأيت الذكاء الاصطناعي؟','أين نجد الذكاء الاصطناعي؟'],
['Tap everything you think might use AI.','Tap the things that you think may use AI. It is okay to guess!'],
['اضغط على كل شيء تعتقد أنه قد يستخدم الذكاء الاصطناعي.','اضغط على الأشياء التي تعتقد أنها قد تستخدم الذكاء الاصطناعي. لا بأس أن تخمّن!'],
['Phone understands voice','A phone that understands your voice'],['هاتف يفهم صوتك','هاتف يفهم صوتك'],
['Map suggests best route','A map that finds a good way to go'],['خريطة تقترح أفضل طريق','خريطة تساعدك في اختيار الطريق'],
['Camera recognises a face or object','A camera that knows a face or an object'],['كاميرا تتعرّف إلى وجه أو شيء','كاميرا تعرف وجهاً أو شيئاً'],
['Robot adapts where to move','A robot that changes where it moves'],['روبوت يكيّف طريقة حركته','روبوت يغيّر طريق حركته'],
['Basic calculator','A simple calculator'],['آلة حاسبة عادية','آلة حاسبة بسيطة'],
['Normal light switch','A light switch'],['مفتاح إضاءة عادي','مفتاح إضاءة'],
['Check my choices','See how I did'],['تحقق من اختياراتي','أرى كيف أجبت'],
['So, What Is AI?','What Is AI?'],['إذن، ما هو الذكاء الاصطناعي؟','ما هو الذكاء الاصطناعي؟'],
['AI is technology that can use information, find patterns and help computers do useful tasks.','AI is a kind of technology. It can look at information, notice things that happen again, and help a computer do a job.'],
['الذكاء الاصطناعي تقنية يمكنها استخدام المعلومات والعثور على الأنماط ومساعدة أجهزة الحاسوب على أداء مهام مفيدة.','الذكاء الاصطناعي نوع من التقنية. يمكنه أن ينظر إلى المعلومات، ويلاحظ الأشياء التي تتكرر، ويساعد الحاسوب على القيام بمهمة.'],
['Patterns','Things that repeat'],['أنماط','أشياء تتكرر'],['Prediction','A good guess'],['تنبؤ','تخمين جيد'],
['What do YOU predict before the system reveals its result?','What is YOUR guess before we see the answer?'],['ما توقعك أنت قبل أن يعرض النظام نتيجته؟','ما تخمينك أنت قبل أن نرى الإجابة؟'],
['Reveal','Show me'],['اعرض النتيجة','أرني الإجابة'],
['Human, Computer or AI?','Person, Computer or AI?'],['إنسان، حاسوب أم ذكاء اصطناعي؟','شخص، حاسوب أم ذكاء اصطناعي؟'],
['Fixed rules are often ordinary computing. Using information and patterns may involve AI.','Some computers follow the same rules every time. AI can use information to notice things and make a good guess.'],
['القواعد الثابتة غالباً حوسبة عادية. وقد يتضمن استخدام المعلومات والأنماط ذكاءً اصطناعياً.','بعض أجهزة الحاسوب تتبع القواعد نفسها كل مرة. يمكن للذكاء الاصطناعي استخدام المعلومات ليلاحظ الأشياء ويقوم بتخمين جيد.'],
['A calculator follows fixed rules','A calculator follows the same rules'],['آلة حاسبة تتبع قواعد ثابتة','الآلة الحاسبة تتبع القواعد نفسها'],
['A map predicts traffic from information','A map uses information to guess the traffic'],['خريطة تتنبأ بحركة المرور من المعلومات','الخريطة تستخدم المعلومات لتتوقع زحمة الطريق'],
['Mariam decides whether she likes a painting','Mariam decides if she likes a picture'],['مريم تقرر إن كانت تحب لوحة','مريم تقرر إن كانت تحب الصورة'],
['Different AI systems can use different abilities—and sometimes several together.','AI can help with different jobs. Look at these examples.'],['يمكن لأنظمة الذكاء الاصطناعي استخدام قدرات مختلفة، وأحياناً عدة قدرات معاً.','يمكن للذكاء الاصطناعي أن يساعد في أعمال مختلفة. انظر إلى هذه الأمثلة.'],
['AI that sees','AI can look at pictures'],['ذكاء اصطناعي يرى','يرى الصور'],['Words & voices','Understands words and voices'],['الكلمات والأصوات','يفهم الكلمات والأصوات'],
['Finds patterns','Finds things that repeat'],['يجد الأنماط','يجد الأشياء التي تتكرر'],['Creates','Makes something new'],['ينشئ','يصنع شيئاً جديداً'],
['Helps machines act','Helps robots move and act'],['يساعد الآلات على العمل','يساعد الروبوتات على الحركة والعمل'],['Predicts & suggests','Makes guesses and suggestions'],['يتوقع ويقترح','يخمّن ويقترح'],
['Teach the AI','Show AI Some Examples'],['علّم الذكاء الاصطناعي','أعطِ الذكاء الاصطناعي أمثلة'],
['People give a machine-learning system examples. It uses them to find patterns that help it make a prediction.','People can show AI lots of examples. AI looks for things that repeat. Then it can make a good guess about something new.'],
['يعطي الناس نظام التعلّم الآلي أمثلة. يستخدمها للعثور على أنماط تساعده على إصدار تنبؤ.','يمكن للناس أن يعطوا الذكاء الاصطناعي أمثلة كثيرة. يبحث عن الأشياء التي تتكرر، ثم يحاول أن يخمّن شيئاً جديداً.'],
['Why might a green apple be harder after only red-apple examples?','The AI only saw red apples. Why might a green apple be tricky?'],['لماذا قد تكون التفاحة الخضراء أصعب بعد أمثلة تحتوي على تفاح أحمر فقط؟','رأى الذكاء الاصطناعي تفاحاً أحمر فقط. لماذا قد تحيّره التفاحة الخضراء؟'],
['The examples were too limited','It did not see enough kinds of apples'],['الأمثلة كانت محدودة','لم يرَ أنواعاً كافية من التفاح'],
['The AI got tired','The AI got sleepy'],['تعب الذكاء الاصطناعي','شعر الذكاء الاصطناعي بالنعاس'],
['Can AI Be Wrong?','Can AI Make a Mistake?'],['هل يمكن للذكاء الاصطناعي أن يخطئ؟','هل يمكن للذكاء الاصطناعي أن يخطئ؟'],
['Check it','Check the answer'],['أتحقق منها','أتأكد من الإجابة'],['Believe it because AI said it','Believe it just because AI said it'],['أصدقها لأن الذكاء الاصطناعي قالها','أصدقها فقط لأن الذكاء الاصطناعي قالها'],
['Never trust AI','Never use AI'],['لا أثق بالذكاء الاصطناعي أبداً','لا أستخدم الذكاء الاصطناعي أبداً'],
['My Three Smart AI Rules','My 3 Smart AI Rules'],['قواعدي الثلاث للاستخدام الذكي','قواعدي الثلاث مع الذكاء الاصطناعي'],
['Think first','I think first'],['أفكر أولاً','أنا أفكر أولاً'],['Check important answers','I check important answers'],['أتحقق من الإجابات المهمة','أتأكد من الإجابات المهمة'],['Keep private things private','I keep private things private'],['أحافظ على معلوماتي الخاصة','أحافظ على معلوماتي الخاصة'],
['Which information should stay private in this practice scenario?','Which things should you NOT share with AI?'],['أي معلومات يجب أن تبقى خاصة في هذا السيناريو التدريبي؟','ما الأشياء التي يجب ألا تشاركها مع الذكاء الاصطناعي؟'],
['Home address','Where you live'],['عنوان المنزل','مكان منزلك'],
['Your First AI Mission','Your First AI Challenge'],['مهمتك الأولى في الذكاء الاصطناعي','تحديك الأول مع الذكاء الاصطناعي'],
['My First AI Discovery','What I Learned Today'],['اكتشافي الأول في الذكاء الاصطناعي','ماذا تعلمت اليوم؟']
]);
function walk(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.nodeValue.trim();if(replacements.has(t)){const before=n.nodeValue;const lead=before.match(/^\s*/)[0],trail=before.match(/\s*$/)[0];n.nodeValue=lead+replacements.get(t)+trail;}}}
let busy=false;function apply(){if(busy)return;busy=true;walk(document.body);document.querySelectorAll('.pattern-box').forEach(el=>{const txt=el.textContent;if(txt.includes('Things that repeat')||txt.includes('أشياء تتكرر'))el.classList.add('concept-pop');});busy=false}
new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',apply);apply();
})();