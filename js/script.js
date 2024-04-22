
(function() {
    "use strict";

    //helper function for querying
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    //help functioner for event listener
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    //onscroll listener
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
    
    //scrolling functionality
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          // Add 'active' class to the closest parent <li> element
          if (!navbarlink.closest('li').classList.contains('active')){
            navbarlink.closest('li').classList.add('active');
          }
          
        } else {
          // Remove 'active' class from the closest parent <li> element
          if (navbarlink.closest('li').classList.contains('active')){
            navbarlink.closest('li').classList.remove('active');
          }
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }
  

    //back to top button
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    // menu button
    on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bx-menu')
      this.classList.toggle('bx-x-circle')
    })
  
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
        console.log('here');
        let body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bx-menu')
          navbarToggle.classList.toggle('bx-x-circle')
        }
        scrollto(this.hash)
      }
    }, true)

    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
  })()
