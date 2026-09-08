import { createClient } from 'npm:@supabase/supabase-js@2';
const allowedOrigin='https://ahmedyyya.github.io';
const cors={ 'Access-Control-Allow-Origin':allowedOrigin,'Vary':'Origin','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Content-Type':'application/json' };
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS') return new Response('ok',{headers:cors});
 if(req.headers.get('Origin') && req.headers.get('Origin')!==allowedOrigin) return new Response(JSON.stringify({error:'origin_not_allowed'}),{status:403,headers:cors});
 if(req.method!=='POST') return new Response(JSON.stringify({error:'method_not_allowed'}),{status:405,headers:cors});
 try{
  const auth=req.headers.get('Authorization'); if(!auth) return new Response(JSON.stringify({error:'unauthorized'}),{status:401,headers:cors});
  const userClient=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_ANON_KEY')!,{global:{headers:{Authorization:auth}}});
  const token=auth.replace('Bearer ','');
  const {data:{user},error:userError}=await userClient.auth.getUser(token);
  if(userError||!user) return new Response(JSON.stringify({error:'unauthorized'}),{status:401,headers:cors});
  const body=await req.json(); const childId=String(body.child_profile_id||''); const action=String(body.action||'');
  if(!childId) return new Response(JSON.stringify({error:'invalid_child'}),{status:400,headers:cors});
  const admin=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  if(action==='withdraw-consent'||action==='withdraw-assent'){
    const {data,error}=await admin.rpc('withdraw_child_permissions',{p_adult_user_id:user.id,p_child_profile_id:childId,p_withdraw_consent:action==='withdraw-consent',p_withdraw_assent:action==='withdraw-assent'});
    if(error){console.error(error);return new Response(JSON.stringify({error:'permission_update_failed'}),{status:403,headers:cors});}
    return new Response(JSON.stringify({result:data}),{status:200,headers:cors});
  }
  if(action==='request-delete'||action==='request-export'){
    const privacyAction=action==='request-delete'?'delete':'export';
    const {data,error}=await admin.rpc('create_privacy_request',{p_adult_user_id:user.id,p_child_profile_id:childId,p_action:privacyAction});
    if(error){console.error(error);return new Response(JSON.stringify({error:'privacy_request_failed'}),{status:403,headers:cors});}
    return new Response(JSON.stringify({request_id:data,action:privacyAction}),{status:201,headers:cors});
  }
  return new Response(JSON.stringify({error:'invalid_action'}),{status:400,headers:cors});
 }catch(e){console.error(e);return new Response(JSON.stringify({error:'server_error'}),{status:500,headers:cors});}
});