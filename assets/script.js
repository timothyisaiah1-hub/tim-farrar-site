/* Timothy Farrar executive site — shared interactions */
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* Active nav highlight by filename */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* Journey timeline accordion */
  document.querySelectorAll('.tl-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.tl-item');
      item.classList.toggle('is-open');
    });
  });
  var firstTl = document.querySelector('.tl-item');
  if (firstTl) firstTl.classList.add('is-open');

  /* Resume view toggle */
  document.querySelectorAll('.resume-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-view');
      document.querySelectorAll('.resume-toggle button').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.resume-view').forEach(function (v) { v.classList.remove('active'); });
      btn.classList.add('active');
      var view = document.getElementById(target);
      if (view) view.classList.add('active');
    });
  });

  /* Contact form (prototype only — no backend) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.querySelector('#form-note');
      if (note) note.style.display = 'block';
      form.reset();
    });
  }

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = 'none'; io.unobserve(en.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    el.style.opacity = 0; el.style.transform = 'translateY(16px)'; el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
});
