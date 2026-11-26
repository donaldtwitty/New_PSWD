// Purposeful Solutions Web Design: contact form
// The form builds an email for the visitor to send. To have it submit directly,
// replace the submit handler below with a POST to your form handler.
(function(){
  var form=document.getElementById('lead');
  if(!form)return;
  var res=document.getElementById('result'),
      msgEl=document.getElementById('result-msg'),txt=document.getElementById('result-text'),
      mail=document.getElementById('mail-link'),copy=document.getElementById('copy-btn'),
      need=document.getElementById('need');

  // pricing.html links here as contact.html?package=Starter|Standard|Pro
  var pkg=new URLSearchParams(location.search).get('package');
  if(pkg){
    Array.prototype.forEach.call(need.options,function(o){if(o.text===pkg+' website')need.value=o.value;});
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(id){return document.getElementById(id).value.trim();};
    res.classList.add('on');
    if(!v('name')||!/^\S+@\S+\.\S+$/.test(v('email'))){
      msgEl.textContent='Add your name and a valid email address so we can reply.';
      txt.textContent='';mail.style.display=copy.style.display='none';return;
    }
    var body='Name: '+v('name')+'\nEmail: '+v('email')+'\nOrganization: '+v('org')+'\nNeed: '+v('need')+
      '\nCurrent site: '+(v('url')||'none')+'\n\n'+(v('msg')||'(no details added)');
    txt.textContent=body;
    mail.style.display=copy.style.display='';
    mail.href='mailto:info@purposefulsolutionswebdesign.com?subject='+encodeURIComponent(v('need')+' request from '+v('name'))+'&body='+encodeURIComponent(body);
    msgEl.textContent='Your request is ready. Send it from your email app, or copy it and email info@purposefulsolutionswebdesign.com.';
  });

  copy.addEventListener('click',function(){
    try{navigator.clipboard.writeText(txt.textContent).then(function(){copy.textContent='Copied';},function(){copy.textContent='Select the text above to copy';});}
    catch(err){copy.textContent='Select the text above to copy';}
  });
})();
