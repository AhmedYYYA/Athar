const fs=require('fs');
const required=['login.html','register.html','account-help.html','child-profile.html','css/account-v12.css','js/account-v12.js','docs/identity/Stage8_Identity_Accounts_Consent_Architecture.md','docs/identity/Stage8_Backend_Identity_ADR.md','docs/identity/Stage8_Data_API_Contract_Draft.md'];
let checks=0;function ok(c,m){checks++;if(!c)throw new Error(m)}
for(const f of required){ok(fs.existsSync(f),`Missing Stage 8 file: ${f}`)}
const login=fs.readFileSync('login.html','utf8');const register=fs.readFileSync('register.html','utf8');const child=fs.readFileSync('child-profile.html','utf8');const js=fs.readFileSync('js/account-v12.js','utf8');
ok(login.includes('Prototype only'), 'Login must disclose prototype status');
ok(register.includes('Create an adult account'),'Registration must be adult-first');
ok(!register.toLowerCase().includes('child email'),'Registration should not request child email');
ok(child.includes('not a child account'),'Child profile page must distinguish profile from account');
ok(child.includes('adult-consent')&&child.includes('child-assent'),'Child profile setup must represent consent and assent separately');
ok(!child.match(/type="(?:email|tel)"/i),'Child profile must not request child email/phone');
ok(login.includes('data-ar=')&&register.includes('data-ar=')&&child.includes('data-ar='),'Account UX must be bilingual');
ok(js.includes("localStorage.setItem('athar-lang'"),'Account UX must preserve language preference only');
ok(!js.includes('password')&&!js.includes('email'),'Prototype JS must not process credentials');
const adr=fs.readFileSync('docs/identity/Stage8_Backend_Identity_ADR.md','utf8');
ok(adr.includes('Default deny')||adr.includes('default deny'),'ADR must require default-deny authorization');
ok(adr.includes('HttpOnly'),'ADR must address secure session-cookie handling');
console.log(`Stage 8 identity/consent integrity: ${checks}/${checks} checks passed`);