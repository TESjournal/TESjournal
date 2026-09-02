(function(){
  function applyLang(lang){
    document.body.classList.remove('lang-fa','lang-en');
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang;
    var btn = document.querySelector('.lang-toggle');
    if(btn){
      btn.textContent = lang === 'fa' ? 'English' : 'فارسی';
    }
    try{ localStorage.setItem('site-lang', lang); }catch(e){}
  }

  function initLang(){
    var saved = 'fa';
    try{ saved = localStorage.getItem('site-lang') || 'fa'; }catch(e){}
    applyLang(saved);
    var btn = document.querySelector('.lang-toggle');
    if(btn){
      btn.addEventListener('click', function(){
        var current = document.body.classList.contains('lang-en') ? 'en' : 'fa';
        applyLang(current === 'fa' ? 'en' : 'fa');
      });
    }
  }

  function initContactForm(){
    var form = document.getElementById('contact-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var ok = true;

      [name, email, message].forEach(function(field){
        var err = field.parentElement.querySelector('.error-msg');
        if(!field.value.trim()){
          err.classList.add('show');
          ok = false;
        } else {
          err.classList.remove('show');
        }
      });

      var emailErr = email.parentElement.querySelector('.error-msg');
      if(email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        emailErr.textContent = emailErr.getAttribute('data-invalid');
        emailErr.classList.add('show');
        ok = false;
      }

      if(!ok) return;

      var subject = encodeURIComponent('پیام از سایت تجهیزات سبز — ' + name.value.trim());
      var body = encodeURIComponent(message.value.trim() + '\n\n' + email.value.trim());
      window.location.href = 'mailto:TESjournaler@gmail.com?subject=' + subject + '&body=' + body;

      var success = form.querySelector('.success-msg');
      if(success) success.classList.add('show');
      form.reset();
    });

    [ 'name', 'email', 'message' ].forEach(function(id){
      var field = form.querySelector('#' + id);
      if(field){
        field.addEventListener('input', function(){
          var err = field.parentElement.querySelector('.error-msg');
          if(err) err.classList.remove('show');
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initLang();
    initContactForm();
  });
})();
