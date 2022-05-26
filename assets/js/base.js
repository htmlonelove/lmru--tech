/*
* Copyright 2018 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

    (function () {
        var getFirstBrowserLanguage = function () {
        var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language

        if (Array.isArray(nav.languages)) {
          for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i]
            if (language && language.length) {
              return language
            }
          }
        }

        // support for other well known properties in browsers
        for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
          language = nav[browserLanguagePropertyKeys[i]]
          if (language && language.length) {
            return language
          }
        }
        return 'en'
      }
    
      var preferLang = getFirstBrowserLanguage()
      if (window.location.pathname == '/' && !getCookie("redirected") && preferLang.indexOf('ru') == -1) {
        setCookie("redirected", true, 365);
        window.location.replace('/en/');
      }
    })()

        class Accordions {
            constructor() {
              this._openHeight = 0;
              this._windowWidth = window.innerWidth;
              this._documentClickHandler = this._documentClickHandler.bind(this);
              this._windowResizeHandler = this._windowResizeHandler.bind(this);
              this._init();
            }
    
            _init() {
              this.fullUpdate();
              document.addEventListener('click', this._documentClickHandler);
              window.addEventListener('resize', this._windowResizeHandler);
    
              const contents = document.querySelectorAll('[data-accordion="content"]');
              contents.forEach(element => {
                  const links = element.querySelectorAll('a');
                  
                  links.forEach(link => {
                      link.setAttribute('tabindex', '-1');
                  });
              });
            }
    
            _documentClickHandler(evt) {
              const target = evt.target;
              if (!target.closest('[data-accordion="button"]')) {
                return;
              }
    
              evt.preventDefault();
              const element = target.closest('[data-accordion="element"]');
              if (element.classList.contains('is-active')) {
                this.closeAccordion(element);
                return;
              }
              this.openAccordion(element);
            }
    
            _windowResizeHandler() {
              if (this._windowWidth === window.innerWidth) {
                return;
              }
              this._windowWidth = window.innerWidth;
              this.updateAccordionsHeight();
            }
    
            closeAllAccordion(parent) {
              const elements = parent.querySelectorAll('[data-accordion="element"]');
              elements.forEach((element) => {
                const currentParent = element.closest('[data-accordion="parent"]');
                if (currentParent === parent) {
                  this.closeAccordion(element);
                }
              });
            }
    

            updateAccordionsHeight(element = null) {
              if (element) {
                const content = element.querySelector('[data-accordion="content"]');
                content.style.transition = 'none';
                content.style.maxHeight = `${content.scrollHeight}px`;
                setTimeout(() => {
                  content.style.transition = null;
                });
                return;
              }
              const openElements = document.querySelectorAll('[data-accordion="element"].is-active');
              openElements.forEach((openElement) => {
                const content = openElement.querySelector('[data-accordion="content"]');
                content.style.transition = 'none';
                content.style.maxHeight = `${content.scrollHeight}px`;
                setTimeout(() => {
                  content.style.transition = null;
                });
              });
            }
    
            fullUpdate(parent = null, transition = false) {
              let openElements;
              if (parent) {
                openElements = parent.querySelectorAll('[data-accordion="element"].is-active');
              } else {
                openElements = document.querySelectorAll('[data-accordion="element"].is-active');
              }
              openElements.forEach((openElement) => {
                const innerParent = openElement.querySelector('[data-accordion="parent"]');
                if (innerParent) {
                  return;
                }
                this.openAccordion(openElement, transition);
              });
            }
    
            openAccordion(element, transition = true) {
              const parentElement = element.closest('[data-accordion="parent"]');
              const contentElement = element.querySelector('[data-accordion="content"]');
              const contentElementLinks = contentElement.querySelectorAll('a');
              this._openHeight += contentElement.scrollHeight;
              
              if (parentElement.hasAttribute('data-single')) {
                  this.closeAllAccordion(parentElement);
                }
                
                contentElementLinks.forEach(element => {
                  element.removeAttribute('tabindex');
                });
              element.classList.add('is-active');
              if (transition) {
                contentElement.style.maxHeight = `${this._openHeight}px`;
              } else {
                contentElement.style.transition = 'none';
                contentElement.style.maxHeight = `${this._openHeight}px`;
                setTimeout(() => {
                  contentElement.style.transition = null;
                });
              }
    
              if (parentElement.closest('[data-accordion="element"]')) {
                this.openAccordion(parentElement.closest('[data-accordion="element"]'), transition);
                return;
              }
    
              this._openHeight = 0;
            }
    
            closeAccordion(element, transition = true) {
              const contentElement = element.querySelector('[data-accordion="content"]');
              
              
              if (!contentElement) {
                  return;
              }
              
              element.classList.remove('is-active');
              
              if (transition) {
                contentElement.style.maxHeight = '0';
              } else {
                contentElement.style.transition = 'none';
                contentElement.style.maxHeight = '0';
                setTimeout(() => {
                  contentElement.style.transition = null;
                });
              }
            }
        }
       
            const maxWidthAccordions = document.querySelector('[data-accordion = "parent"]').dataset.accordionMaxWidth;
            let clientWidth = document.documentElement.clientWidth;
            
            const mediaQuery = window.matchMedia(`(max-width: ${maxWidthAccordions}px)`);
            const breakpoint = window.matchMedia(`(max-width:1024px)`);
    
            let accordions;
            const initAccordions = () => {
                accordions = new Accordions();
                // Используйте в разработке экспортируемую переменную accordions, window сделан для бэкэнда
                window.accordions = accordions;
            };
  
            const breakpointChecker = () => {
            if (breakpoint.matches) {
              initAccordions();
            } 
            };
            
            setTimeout(() => {
              breakpoint.addListener(breakpointChecker);
              breakpointChecker();
            }, 500);
          });          

    class ScrollLock {
        constructor() {
          this._iosChecker = iosChecker;
          this._lockClass = this._iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
          this._scrollTop = null;
          this._fixedBlockElements = document.querySelectorAll('[data-fix-block]');
        }

        _getScrollbarWidth() {
          return window.innerWidth - document.documentElement.clientWidth;
        }

        _getBodyScrollTop() {
          return (
            self.pageYOffset ||
            (document.documentElement && document.documentElement.ScrollTop) ||
            (document.body && document.body.scrollTop)
          );
        }

        disableScrolling() {
          this._scrollTop = document.body.dataset.scroll = document.body.dataset.scroll ? document.body.dataset.scroll : this._getBodyScrollTop();
          if (this._getScrollbarWidth()) {
            document.body.style.paddingRight = `${this._getScrollbarWidth()}px`;
            this._fixedBlockElements.forEach((block) => {
              block.style.paddingRight = `${this._getScrollbarWidth()}px`;
            });
          }
          document.body.style.top = `-${this._scrollTop}px`;
          document.body.classList.add(this._lockClass);
        }

        enableScrolling() {
          document.body.classList.remove(this._lockClass);
          window.scrollTo(0, +document.body.dataset.scroll);
          document.body.style.paddingRight = null;
          document.body.style.top = null;
          this._fixedBlockElements.forEach((block) => {
            block.style.paddingRight = null;
          });
          document.body.removeAttribute('data-scroll');
          this._scrollTop = null;
        }
    }

      const iosChecker = () => {
        return [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
      };

      window.scrollLock = new ScrollLock();
      iosChecker();

      const glossaryItems = document.querySelectorAll('.glossary__item');
      
      const glossaryOpen = (evt) => {
        const glossary = evt.currentTarget.parentElement;
        const glossaryCloseBtn = glossary.querySelector('.glossary__close-btn');
        const content = glossary.querySelector('.glossary__text');
        const overlay = document.createElement('div');
        const isInline = glossary.classList.contains('glossary--inline');
        overlay.classList.add('overlay');
        document.body.append(overlay);
        let centerX = document.documentElement.clientWidth / 2;
        let openButtonX = evt.currentTarget.getBoundingClientRect().x;

        if (openButtonX < centerX) {
          content.style.left = '0px';
        } else {
          content.style.right = '0px';
        };
        if (glossaryCloseBtn) {
          glossaryCloseBtn.addEventListener('click', () => {
            glossary.classList.remove('show');
            if (overlay) {
              overlay.remove();
            }
          });
        }
            glossary.classList.add('show');
            if (content.getBoundingClientRect().width === 250) {
              if (openButtonX < centerX) {
                content.style.left = '-30px';
              } else {
                content.style.right = '-30px';
              };
            }

            if (content.getBoundingClientRect().width === 210) {
              if (openButtonX < centerX && (!isInline)) {
                content.style.left = '-40px';
              } else {
                content.style.right = '-20%';
              };
            }
      }
      const onOverlayClick = (evt) => {
        const overlay = document.querySelector('.overlay');
        if (!glossaryItems && !overlay) {
            return;
        }
          


          if (evt.target === overlay) {
            glossaryItems.forEach(element => {
              element.parentElement.classList.remove('show');
            });
            overlay.remove();
          }
      }
      
          glossaryItems.forEach(element => {
              element.addEventListener('click', glossaryOpen);
          });

          window.addEventListener('click', onOverlayClick);



            window.addEventListener('load', () => {
              const links = document.querySelectorAll('a[href]');
          
              links.forEach(link => {
                const href = link.getAttribute('href');
                const isAnchor = href.includes('#');
                
                if (isAnchor) {
                  const id = href.substring(1);
                  const item = document.getElementById(id);
    
                  
                  if (!item) {
                    return;
                  }
                  
                  link.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    const header = document.querySelector('header');
                    const headerHeight = header.offsetHeight;
                    const scroll = item.offsetTop - headerHeight - 50;  
    
                    window.scrollTo({
                      top: scroll,
                      left: 0,
                      behavior: "smooth"
                    })      
                    
                  })
                }
    
                });
                
              const badge = document.querySelector('.animation-badge');
              if (badge) {
                badge.classList.add('active');
              }
            });
