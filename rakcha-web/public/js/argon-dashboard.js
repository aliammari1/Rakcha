"use strict";
/**
 * @description Sets up perfect scrolling bars on various elements in a given HTML
 * document if the operating system is Windows.
 */
(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if (document.getElementsByClassName('main-content')[0]) {
      var mainpanel = document.querySelector('.main-content');
      var ps = new PerfectScrollbar(mainpanel);
    }

    if (document.getElementsByClassName('sidenav')[0]) {
      var sidebar = document.querySelector('.sidenav');
      var ps1 = new PerfectScrollbar(sidebar);
    }

    if (document.getElementsByClassName('navbar-collapse')[0]) {
      var fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
      var ps2 = new PerfectScrollbar(fixedplugin);
    }

    if (document.getElementsByClassName('fixed-plugin')[0]) {
      var fixedplugin = document.querySelector('.fixed-plugin');
      var ps3 = new PerfectScrollbar(fixedplugin);
    }
  }
})();

// Verify navbar blur on scroll
if (document.getElementById('navbarBlur')) {
  navbarBlurOnScroll('navbarBlur');
}

// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
/**
 * @description Generates a new instance of `bootstrap.Tooltip` using the element
 * passed as argument, `tooltipTriggerEl`.
 * 
 * @param { HTML Element. } tooltipTriggerEl - HTML element that will trigger the
 * display of the tooltip when the user hovers over it, and it is used to initialize
 * the Bootstrap Tooltip component with the provided element.
 * 
 * 		- `tooltipTriggerEl`: A HTMLElement object that represents an HTML element whose
 * event listeners will be bound to for tooltip activation.
 * 
 * @returns { instance of `bootstrap.Tooltip } a new instance of Bootstrap's `Tooltip`
 * class, passed the element for which the tooltip should appear.
 * 
 * 		- `bootstarp`: The Tooltip component is created using the Bootstrap library.
 * 		- `tooltipTriggerEl`: The element that triggered the display of the tooltip.
 */
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// when input is focused add focused class for style
/**
 * @description Adds the class "focused" to an element's parent element if that parent
 * element has the class "input-group".
 * 
 * @param { element. } el - element being focused in the function.
 * 
 * 		- `el`: This is the input parameter to the function, which represents an HTML element.
 * 		- `parentElement`: This property returns the parent element of the input `el`,
 * which is a HTMLDivElement in this case.
 */
function focused(el) {
  if (el.parentElement.classList.contains('input-group')) {
    el.parentElement.classList.add('focused');
  }
}

// when input is focused remove focused class for style
/**
 * @description Removes the focused state from an element's parent Element if the
 * parent element has the class "input-group".
 * 
 * @param { object } el - element for which the focused state is to be managed.
 */
function defocused(el) {
  if (el.parentElement.classList.contains('input-group')) {
    el.parentElement.classList.remove('focused');
  }
}

// helper for adding on all elements multiple attributes
/**
 * @description Sets the attributes of an HTML element based on an options object
 * passed as a parameter. It loops through the keys of the options object and sets
 * each attribute to its corresponding value.
 * 
 * @param { `Element`. } el - element whose attributes are being modified through the
 * `setAttributes()` function.
 * 
 * 		- `el`: A DOM element to set attributes on. It can have various properties such
 * as `tagName`, `className`, `style`, etc.
 * 
 * @param { object } options - settings to be applied to the given element.
 */
function setAttributes(el, options) {
  Object.keys(options).forEach(function(attr) {
    el.setAttribute(attr, options[attr]);
  })
}

// adding on inputs attributes for calling the focused and defocused functions
if (document.querySelectorAll('.input-group').length != 0) {
  var allInputs = document.querySelectorAll('input.form-control');
  allInputs.forEach(el => setAttributes(el, {
    "onfocus": "focused(this)",
    "onfocusout": "defocused(this)"
  }));
}

// Fixed Plugin
if (document.querySelector('.fixed-plugin')) {
  var fixedPlugin = document.querySelector('.fixed-plugin');
  var fixedPluginButton = document.querySelector('.fixed-plugin-button');
  var fixedPluginButtonNav = document.querySelector('.fixed-plugin-button-nav');
  var fixedPluginCard = document.querySelector('.fixed-plugin .card');
  var fixedPluginCloseButton = document.querySelectorAll('.fixed-plugin-close-button');
  var navbar = document.getElementById('navbarBlur');
  var buttonNavbarFixed = document.getElementById('navbarFixed');

  if (fixedPluginButton) {
    /**
     * @description Modifies the `classList` property of an element (`fixedPlugin`) based
     * on whether it currently contains the class 'show'.
     */
    fixedPluginButton.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  if (fixedPluginButtonNav) {
    /**
     * @description Adds or removes a class `show` from an element `fixedPlugin` based
     * on its current presence in the class list.
     */
    fixedPluginButtonNav.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  /**
   * @description Adds an event listener to an HTML element, specifically a click event,
   * that removes a class named `show` from an HTMLElement reference called `fixedPlugin`.
   * 
   * @param { HTML element. } el - element whose click event is being handled by the function.
   * 
   * 		- `onclick`: This is an event handler that defines an action to perform when the
   * element is clicked. The function passed as an argument will be called when the
   * event occurs.
   */
  fixedPluginCloseButton.forEach(function(el) {
    /**
     * @description Hides the CSS class "show" from an HTML element's CSS style.
     */
    el.onclick = function() {
      fixedPlugin.classList.remove('show');
    }
  })

  /**
   * @description Removes the 'show' class from elements that are not part of the fixated
   * plugin or card when a click event occurs.
   * 
   * @param { object } e - event object that triggered the function, which is used to
   * determine whether to remove the 'show' class from the element.
   */
  document.querySelector('body').onclick = function(e) {
    if (e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest('.fixed-plugin .card') != fixedPluginCard) {
      fixedPlugin.classList.remove('show');
    }
  }

  if (navbar) {
    if (navbar.getAttribute('data-scroll') == 'true' && buttonNavbarFixed) {
      buttonNavbarFixed.setAttribute("checked", "true");
    }
  }

}

//Set Sidebar Color
/**
 * @description Updates the color of a specific sidebar element and its related
 * elements by removing the `active` class and adding a new class based on the specified
 * data-color attribute.
 * 
 * @param { object } a - element whose styles will be applied or updated.
 */
function sidebarColor(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-color");

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');
  sidebar.setAttribute("data-color", color);

  if (document.querySelector('#sidenavCard')) {
    var sidenavCard = document.querySelector('#sidenavCard+.btn+.btn');
    let sidenavCardClasses = ['btn', 'btn-sm', 'w-100', 'mb-0', 'bg-gradient-' + color];
    sidenavCard.removeAttribute('class');
    sidenavCard.classList.add(...sidenavCardClasses);
  }
}

// Set Sidebar Type
/**
 * @description Updates the design of a sidenav by adding or removing class names,
 * changing logo images based on body darkness state, and adjusting text color.
 * 
 * @param { HTML element. } a - element being processed, which is used to retrieve
 * the parent element's children, remove the `active` class from it, and add the
 * `data-class` attribute's value as the element's new class.
 * 
 * 		- `parent`: A NodeList of elements within the `a` element's parent node.
 * 		- `color`: The attribute value of the `data-class` attribute on the `a` element.
 * 		- `body`: The `<body>` element of the HTML document.
 * 		- `bodyWhite`: The `<body>` element when the `dark-version` class is not present.
 * 		- `bodyDark`: A boolean indicating whether the `dark-version` class is present
 * on the `<body>` element.
 * 		- `colors`: An array of class names associated with the `data-class` attribute
 * of the `a` element's parent nodes.
 * 		- `sidebar`: The `.sidenav` element in the HTML document.
 * 		- `textWhites`: A NodeList of elements with the class `.text-white` within the
 * `.sidenav` element.
 * 		- `textDarks`: A NodeList of elements with the class `.text-dark` within the
 * `.sidenav` element.
 * 		- `navbarBrand`: The `.navbar-brand` element within the `<nav>` element in the
 * HTML document.
 * 		- `navbarBrandImg`: The value of the `.src` attribute of the `navbarBrand` element.
 * 
 * 	In summary, the `a` element is passed as a parameter to the function and its
 * properties are used to perform various operations related to removing classes and
 * modifying image sources based on the value of the `color` attribute.
 */
function sidebarType(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-class");
  var body = document.querySelector("body");
  var bodyWhite = document.querySelector("body:not(.dark-version)");
  var bodyDark = body.classList.contains('dark-version');

  var colors = [];

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
    colors.push(parent[i].getAttribute('data-class'));
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');

  for (var i = 0; i < colors.length; i++) {
    sidebar.classList.remove(colors[i]);
  }

  sidebar.classList.add(color);


  // Remove text-white/text-dark classes
  if (color == 'bg-white') {
    var textWhites = document.querySelectorAll('.sidenav .text-white');
    for (let i = 0; i < textWhites.length; i++) {
      textWhites[i].classList.remove('text-white');
      textWhites[i].classList.add('text-dark');
    }
  } else {
    var textDarks = document.querySelectorAll('.sidenav .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  if (color == 'bg-default' && bodyDark) {
    var textDarks = document.querySelectorAll('.navbar-brand .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  // Remove logo-white/logo-dark

  if ((color == 'bg-white') && bodyWhite) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  } else {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;
    if (navbarBrandImg.includes('logo-ct-dark.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
      navbarBrand.src = navbarBrandImgNew;
    }
  }

  if (color == 'bg-white' && bodyDark) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  }
}

// Set Navbar Fixed
/**
 * @description Adds or removes class names to an element and a scroll event listener,
 * based on whether an attribute is set on the element.
 * 
 * @param { boolean } el - 🛏️ element that triggers the fixed navbar behavior, and
 * it is used to determine whether or not to apply the fixed navbar style based on
 * its attribute "checked".
 */
function navbarFixed(el) {
  let classes = ['position-sticky', 'bg-white', 'left-auto', 'top-2', 'z-index-sticky'];
  const navbar = document.getElementById('navbarBlur');

  if (!el.getAttribute("checked")) {
    toggleNavLinksColor('blur');
    navbar.classList.add(...classes);
    navbar.setAttribute('data-scroll', 'true');
    navbarBlurOnScroll('navbarBlur');
    el.setAttribute("checked", "true");
  } else {
    toggleNavLinksColor('transparent');
    navbar.classList.remove(...classes);
    navbar.setAttribute('data-scroll', 'false');
    navbarBlurOnScroll('navbarBlur');
    el.removeAttribute("checked");
  }
}

// Set Navbar Minimized
/**
 * @description Is called when an input element with the name "sidenav" is clicked,
 * and it controls the display state of a sidenav element based on the checked attribute
 * of the input.
 * 
 * @param { HTMLInputElement (or similar). } el - element to which the function is
 * applied, and determines whether or not the sidenav is pinned or hidden.
 * 
 * 		- `getAttribute("checked")`: Returns a Boolean value indicating whether the
 * element is checked or not.
 * 		- `classList`: A list of class names that can be added or removed from an element.
 * 		- `[0]`: Refer to the first occurrence of an array in a specific context, such
 * as an array of elements returned by document.getElementsByClassName() call.
 */
function navbarMinimize(el) {
  var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];

  if (!el.getAttribute("checked")) {
    sidenavShow.classList.remove('g-sidenav-pinned');
    sidenavShow.classList.add('g-sidenav-hidden');
    el.setAttribute("checked", "true");
  } else {
    sidenavShow.classList.remove('g-sidenav-hidden');
    sidenavShow.classList.add('g-sidenav-pinned');
    el.removeAttribute("checked");
  }
}

/**
 * @description Changes the color scheme of navigational links, sidenav toggler and
 * associated text elements based on input provided as a parameter.
 * 
 * @param { string } type - state change desired for the links, either "blur" or
 * "transparent", which determines the class removals and additions applied to the
 * links and toggle line elements in the `toggleNavLinksColor()` function.
 */
function toggleNavLinksColor(type) {
  let navLinks = document.querySelectorAll('.navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a, .navbar-main h6')
  let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

  if (type === "blur") {
    navLinks.forEach(element => {
      element.classList.remove('text-white')
    });

    navLinksToggler.forEach(element => {
      element.classList.add('bg-dark')
      element.classList.remove('bg-white')
    });
  } else if (type === "transparent") {
    navLinks.forEach(element => {
      element.classList.add('text-white')
    });

    navLinksToggler.forEach(element => {
      element.classList.remove('bg-dark')
      element.classList.add('bg-white')
    });
  }
}


// Navbar blur on scroll
/**
 * @description Modifies the CSS class of a navbar element based on the scrolling
 * position of the window. When the user scrolls down past a certain distance, the
 * navbar becomes blurred and its links change color. When the user scrolls back up,
 * the navbar returns to normal.
 * 
 * @param { string } id - id of the navbar element that the function will apply the
 * scroll-related behaviors to.
 */
function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
  let scrollDistance = 5;
  let classes = ['bg-white', 'left-auto', 'position-sticky'];
  let toggleClasses = ['shadow-none'];

  if (navbarScrollActive == 'true') {
    window.onscroll = debounce(function() {
      if (window.scrollY > scrollDistance) {
        blurNavbar();
      } else {
        transparentNavbar();
      }
    }, 10);
  } else {
    window.onscroll = debounce(function() {
      transparentNavbar();
    }, 10);
  }

  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    var content = document.querySelector('.main-content');
    if (navbarScrollActive == 'true') {
      content.addEventListener('ps-scroll-y', debounce(function() {
        if (content.scrollTop > scrollDistance) {
          blurNavbar();
        } else {
          transparentNavbar();
        }
      }, 10));
    } else {
      content.addEventListener('ps-scroll-y', debounce(function() {
        transparentNavbar();
      }, 10));
    }
  }

  /**
   * @description Adds and removes classes from the navbar and toggle links color based
   * on blur mode.
   */
  function blurNavbar() {
    navbar.classList.add(...classes)
    navbar.classList.remove(...toggleClasses)

    toggleNavLinksColor('blur');
  }

  /**
   * @description Modifies the classes of a `< navbar>` element, and adds or removes
   * classes to toggle the links' colors.
   */
  function transparentNavbar() {
    navbar.classList.remove(...classes)
    navbar.classList.add(...toggleClasses)

    toggleNavLinksColor('transparent');
  }
}


// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/**
 * @description Provides a wrapping function that schedules a call to the passed
 * function after a delay, with optional immediate execution. It removes any previous
 * timeout and resets its timer for the new delay.
 * 
 * @param { functions. } func - function to be debounced, which is the main functionality
 * of the `debounce` function.
 * 
 * 		- `func`: This is the function that needs to be debounced. It is the first
 * argument passed to the function.
 * 		- `wait`: This is the time in milliseconds to wait before calling the `func`
 * again after it has been debounced. It is the second argument passed to the function.
 * 		- `immediate`: This is a boolean parameter that indicates whether the `func`
 * should be called immediately or not. If it is set to `true`, the `func` will be
 * called immediately even if there is no `timeout`. If it is set to `false`, the
 * `func` will only be called after the waiting period has elapsed.
 * 
 * @param { number } wait - amount of time to delay before calling the function again
 * after it has been activated.
 * 
 * @param { boolean } immediate - immediately execute the provided function after
 * calling debounce function without setting a timeout.
 * 
 * @returns { anonymous function } a function that delays executing the given function
 * until after a specified wait time has passed, optionally allowing immediate execution.
 * 
 * 		- `func`: The function that will be executed after the wait time has elapsed.
 * 		- `wait`: The amount of time to wait before executing the function again.
 * 		- `immediate`: A boolean value indicating whether the function should be executed
 * immediately or not.
 * 		- `timeout`: A timer that is set to execute the function again after the wait
 * time has elapsed.
 * 		- `context`: The context in which the function will be executed.
 * 		- `args`: The arguments passed to the function when it is called.
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

/**
 * @description Toggles the display of a side navigation menu based on the class name
 * of the body element and updates the sidenav's background color and opacity after
 * a delay.
 */
function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function() {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}

let html = document.getElementsByTagName('html')[0];

/**
 * @description Updates `body` class if a specific condition is met, removing any
 * class added by it if `sidenav-toggler-line` class is not found on the target element.
 * 
 * @param { event. } e - Event object that triggers the function, which checks if the
 * current URL fragment contains the class name "sidenav-toggler-line" and removes
 * the "sidebar-pinned" class from the body element if it does not contain the
 * "sidenav-toggler-line" class.
 * 
 * 		- `body`: The element to which the event occurred, which is a HTMLElement object.
 * 		- `classList`: A property that returns a list of classes applied to an element.
 * 		- `className`: A string that represents the class name(s) to be removed from the
 * `body` element.
 * 		- `target`: The element that triggered the event, which is also a HTMLElement object.
 * 		- `e.target.classList`: A property that returns a list of classes applied to the
 * triggering element (`e.target`).
 */
html.addEventListener("click", function(e) {
  if (body.classList.contains('g-sidenav-pinned') && !e.target.classList.contains('sidenav-toggler-line')) {
    body.classList.remove(className);
  }
});

// Resize navbar color depends on configurator active type of sidenav

let referenceButtons = document.querySelector('[data-class]');

window.addEventListener("resize", navbarColorOnResize);

/**
 * @description Checks the width of the window and adjusts the class of the sidenav
 * based on whether the reference buttons are active and their data-class value.
 */
function navbarColorOnResize() {
  if (window.innerWidth > 1200) {
    if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
      sidenav.classList.remove('bg-white');
    } else {
      if (!body.classList.contains('dark-version')) {
        sidenav.classList.add('bg-white');
      }
    }
  } else {
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
  }
}

// Deactivate sidenav type buttons on resize and small screens
window.addEventListener("resize", sidenavTypeOnResize);
window.addEventListener("load", sidenavTypeOnResize);

/**
 * @description Modifies the disabled state of element class on resize.
 */
function sidenavTypeOnResize() {
  let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
  if (window.innerWidth < 1200) {
    elements.forEach(function(el) {
      el.classList.add('disabled');
    });
  } else {
    elements.forEach(function(el) {
      el.classList.remove('disabled');
    });
  }
}


// Tabs navigation

var total = document.querySelectorAll('.nav-pills');

/**
 * @description Modifies a `div` element and its ancestor `li` elements upon mouseover,
 * by adding CSS styles for `transform`, `transition`, and `height` or `width`. It
 * also sets an event listener on the `li` element to toggle the styles when clicked.
 * 
 * @param { HTML Element. } item - element that contains the moving tab, and it is
 * used to create and modify the moving tab's styles and behavior within the function.
 * 
 * 		- `item`: A HTMLElement representing an HTML element that contains other elements
 * inside it.
 * 		- `i`: A number representing the index of the current item in the array of items.
 * 
 * 	The properties of `item` include:
 * 
 * 		- `querySelector()` methods to retrieve child elements, such as `<li>` and
 * `<nav-link>`, and
 * 		- The `style` property, which contains various CSS properties, including `padding`,
 * `width`, `transition`, etc.
 * 
 * 	Note that the function modifies the `style` property of `moving_div`, which is a
 * newly created HTML element inside `item`.
 * 
 * @param { integer } i - 0-based index of the `li` element within its parent `ul`
 * element, which is used to determine the position and width of the moving tab.
 */
total.forEach(function(item, i) {
  var moving_div = document.createElement('div');
  var first_li = item.querySelector('li:first-child .nav-link');
  var tab = first_li.cloneNode();
  tab.innerHTML = "-";

  moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
  moving_div.appendChild(tab);
  item.appendChild(moving_div);

  var list_length = item.getElementsByTagName("li").length;

  moving_div.style.padding = '0px';
  moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
  moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
  moving_div.style.transition = '.5s ease';

  /**
   * @description When called on a Li element, calculates the position of an associated
   * moving div element using offsetHeight/Width or offsetParent properties of its
   * descendants and sets the styles accordingly for flex column or block layouts.
   * 
   * @param { Event. } event - event object that triggered the function, providing
   * information about the target element and its position in the document hierarchy.
   * 
   * 		- `target`: The element that triggered the event, which is retrieved using the
   * `getEventTarget()` method.
   * 		- `li`: A reference to the immediate child of the `target` element that matches
   * the `LI` HTML tag.
   * 		- `nodes`: An array of elements obtained by applying the `children` property on
   * the parent element of the `li` reference.
   * 		- `index`: The zero-based index of the current `li` element in the `nodes` array.
   * 		- `item`: A reference to the element that contains the moving div.
   * 		- `moving_div`: A reference to a CSS style class on an HTML element that is used
   * to position the moving tab.
   */
  item.onmouseover = function(event) {
    let target = getEventTarget(event);
    let li = target.closest('li'); // get reference
    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;
      /**
       * @description Calculates the total offset height and width of elements inside a
       * container element based on their indices and sets the `transform` and `width` CSS
       * properties of an element to achieve a smooth scrolling effect when the element is
       * scrolled.
       */
      item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
        moving_div = item.querySelector('.moving-tab');
        let sum = 0;
        if (item.classList.contains('flex-column')) {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          }
          moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
          moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        } else {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
          }
          moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
          moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        }
      }
    }
  }
});


// Tabs navigation resize

/**
 * @description Modifies the CSS styles of `moving-tab` elements based on their
 * position within a list and resizes them according to screen width.
 * 
 * @param { object } event - triggered event, whose details are utilized to manipulate
 * the `total` array of elements and adjust their CSS styles accordingly.
 */
window.addEventListener('resize', function(event) {
  /**
   * @description Creates a new `div` element with the class names `'moving-tab'`,
   * `'position-absolute'`, and `'nav-link'`; appends it to the specified item element;
   * sets the padding and transition properties of the new `div`; and, if the item
   * element has a parent `<ul>` element, gets an array of its child nodes, calculates
   * the position and size of the moving tab based on the position of the active tab,
   * and sets those properties on the new `div`.
   * 
   * @param { object } item - element that contains the tab navigation links, and is
   * used to manipulate the style of the moving tab.
   * 
   * @param { number } i - 0-based index of the current item being animated, which is
   * used to determine the position and size of the moving tab.
   */
  total.forEach(function(item, i) {
    item.querySelector('.moving-tab').remove();
    var moving_div = document.createElement('div');
    var tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }
  });

  if (window.innerWidth < 991) {
    /**
     * @description Modifies an element's class list by adding `flex-column` and `on-resize`
     * if it does not already contain `flex-column`.
     * 
     * @param { object } item - element to which the flex layout will be applied.
     * 
     * @param { integer } i - 2D array index of the current element being traversed, which
     * is used to apply the transformation only to that specific element.
     */
    total.forEach(function(item, i) {
      if (!item.classList.contains('flex-column')) {
        item.classList.add('flex-column', 'on-resize');
      }
    });
  } else {
    /**
     * @description Removes class names from an element based on a condition.
     * 
     * @param { object } item - element to which the logic in the function is applied.
     * 
     * @param { integer } i - 1-based index of the element being processed in the array
     * of items passed to the function.
     */
    total.forEach(function(item, i) {
      if (item.classList.contains('on-resize')) {
        item.classList.remove('flex-column', 'on-resize');
      }
    })
  }
});


/**
 * @description Determines the target element of an event, either by providing a
 * explicit `e` object or by defaulting to the `window.event` object if none is
 * provided. It returns the target element or its parent element if it's a reference
 * to a nested element.
 * 
 * @param { object } e - event object or a reference to it, which is used to obtain
 * the target element of the event.
 * 
 * @returns { object } the event target or the element that the event occurred on,
 * if neither `e` nor `window.event` are provided.
 */
function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

// End tabs navigation

// Light Mode / Dark Mode
/**
 * @description Toggles between light and dark themes based on the checkbox value,
 * updating class names and attribute values accordingly.
 * 
 * @param { HTMLInputElement, which is of typeHTMLElement due to its initialization
 * as an input element within a JavaScript function. } el - HTML element that triggered
 * the dark mode change and is used to remove the `checked` attribute from the element
 * after switching modes, preventing accidental triggering of the dark mode toggle again.
 * 
 * 	1/ `el`: The deserialized input `el` is aHTMLElement object, which represents an
 * HTML element in the DOM.
 * 	2/ `checked`: `el` has a boolean attribute called `checked`, which indicates
 * whether the element is selected or not.
 * 	3/ `classList`: `el` has a `classList` property that contains an array of strings
 * representing the element's class names. These can be manipulated using the `add()`
 * and `remove()` methods.
 * 	4/ ` attributes`: `el` has an `attributes` property that contains an object of
 * attribute name-value pairs, where each pair represents a single attribute of the
 * element.
 * 	5/ `style`: `el` has a `style` property that contains an object of style properties
 * and values, where each property is a valid CSS property name, and each value is a
 * string representing the value of the property for this element.
 * 	6/ `innerHTML`: `el` has an `innerhtml` property that contains the element's inner
 * HTML content as a string. This can be manipulated using the `textContent` or
 * `outerHTML` properties.
 * 	7/ `nodeType`: `el` has a `nodeType` property that indicates whether the element
 * is a node of a specific type (such as ELEMENT_NODE, TEXT_NODE, etc.).
 * 	8/ `ownerDocument`: `el` has an `ownerDocument` property that refers to the
 * document object representing the container document for this element.
 * 	9/ `parentNode`: `el` has a `parentNode` property that refers to the parent element
 * of this element in the DOM tree.
 * 	10/ `children`: `el` has a `children` property that contains an array of child
 * elements, if any.
 * 	11/ `firstChild`: `el` has a `firstChild` property that refers to the first child
 * element of this element, or `null` if there are no child elements.
 * 	12/ `lastChild`: `el` has a `lastChild` property that refers to the last child
 * element of this element, or `null` if there are no child elements.
 * 	13/ `appendChild`: `el` has an `appendChild()` method that allows adding a new
 * child element to this element in the DOM tree.
 * 	14/ `removeChild`: `el` has a `removeChild()` method that removes one of its child
 * elements from the DOM tree.
 * 
 * 	These properties can be used to manipulate the element's class list, attributes,
 * style, inner HTML content, and other aspects of its structure and presentation in
 * the DOM.
 */
function darkMode(el) {
  const body = document.getElementsByTagName('body')[0];
  const hr = document.querySelectorAll('div:not(.sidenav) > hr');
  const sidebar = document.querySelector('.sidenav');
  const sidebarWhite = document.querySelectorAll('.sidenav.bg-white');
  const hr_card = document.querySelectorAll('div:not(.bg-gradient-dark) hr');
  const text_btn = document.querySelectorAll('button:not(.btn) > .text-dark');
  const text_span = document.querySelectorAll('span.text-dark, .breadcrumb .text-dark');
  const text_span_white = document.querySelectorAll('span.text-white');
  const text_strong = document.querySelectorAll('strong.text-dark');
  const text_strong_white = document.querySelectorAll('strong.text-white');
  const text_nav_link = document.querySelectorAll('a.nav-link.text-dark');
  const secondary = document.querySelectorAll('.text-secondary');
  const bg_gray_100 = document.querySelectorAll('.bg-gray-100');
  const bg_gray_600 = document.querySelectorAll('.bg-gray-600');
  const btn_text_dark = document.querySelectorAll('.btn.btn-link.text-dark, .btn .ni.text-dark');
  const btn_text_white = document.querySelectorAll('.btn.btn-link.text-white, .btn .ni.text-white');
  const card_border = document.querySelectorAll('.card.border');
  const card_border_dark = document.querySelectorAll('.card.border.border-dark');
  const svg = document.querySelectorAll('g');
  const navbarBrand = document.querySelector('.navbar-brand-img');
  const navbarBrandImg = navbarBrand.src;
  const navLinks = document.querySelectorAll('.navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a, .navbar-main h6');
  const cardNavLinksIcons = document.querySelectorAll('.card .nav .nav-link i');
  const cardNavSpan = document.querySelectorAll('.card .nav .nav-link span');


  if (!el.getAttribute("checked")) {
    body.classList.add('dark-version');
    if (navbarBrandImg.includes('logo-ct-dark.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
      navbarBrand.src = navbarBrandImgNew;
    }
    for (var i = 0; i < cardNavLinksIcons.length; i++) {
      if (cardNavLinksIcons[i].classList.contains('text-dark')) {
        cardNavLinksIcons[i].classList.remove('text-dark');
        cardNavLinksIcons[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < cardNavSpan.length; i++) {
      if (cardNavSpan[i].classList.contains('text-sm')) {
        cardNavSpan[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < hr.length; i++) {
      if (hr[i].classList.contains('dark')) {
        hr[i].classList.remove('dark');
        hr[i].classList.add('light');
      }
    }
    for (var i = 0; i < hr_card.length; i++) {
      if (hr_card[i].classList.contains('dark')) {
        hr_card[i].classList.remove('dark');
        hr_card[i].classList.add('light');
      }
    }
    for (var i = 0; i < text_btn.length; i++) {
      if (text_btn[i].classList.contains('text-dark')) {
        text_btn[i].classList.remove('text-dark');
        text_btn[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_span.length; i++) {
      if (text_span[i].classList.contains('text-dark')) {
        text_span[i].classList.remove('text-dark');
        text_span[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_strong.length; i++) {
      if (text_strong[i].classList.contains('text-dark')) {
        text_strong[i].classList.remove('text-dark');
        text_strong[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_nav_link.length; i++) {
      if (text_nav_link[i].classList.contains('text-dark')) {
        text_nav_link[i].classList.remove('text-dark');
        text_nav_link[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < secondary.length; i++) {
      if (secondary[i].classList.contains('text-secondary')) {
        secondary[i].classList.remove('text-secondary');
        secondary[i].classList.add('text-white');
        secondary[i].classList.add('opacity-8');
      }
    }
    for (var i = 0; i < bg_gray_100.length; i++) {
      if (bg_gray_100[i].classList.contains('bg-gray-100')) {
        bg_gray_100[i].classList.remove('bg-gray-100');
        bg_gray_100[i].classList.add('bg-gray-600');
      }
    }
    for (var i = 0; i < btn_text_dark.length; i++) {
      btn_text_dark[i].classList.remove('text-dark');
      btn_text_dark[i].classList.add('text-white');
    }
    for (var i = 0; i < sidebarWhite.length; i++) {
      sidebarWhite[i].classList.remove('bg-white');
    }
    for (var i = 0; i < svg.length; i++) {
      if (svg[i].hasAttribute('fill')) {
        svg[i].setAttribute('fill', '#fff');
      }
    }
    for (var i = 0; i < card_border.length; i++) {
      card_border[i].classList.add('border-dark');
    }
    el.setAttribute("checked", "true");
  } else {
    body.classList.remove('dark-version');
    sidebar.classList.add('bg-white');
    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
    for (var i = 0; i < navLinks.length; i++) {
      if (navLinks[i].classList.contains('text-dark')) {
        navLinks[i].classList.add('text-white');
        navLinks[i].classList.remove('text-dark');
      }
    }
    for (var i = 0; i < cardNavLinksIcons.length; i++) {
      if (cardNavLinksIcons[i].classList.contains('text-white')) {
        cardNavLinksIcons[i].classList.remove('text-white');
        cardNavLinksIcons[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < cardNavSpan.length; i++) {
      if (cardNavSpan[i].classList.contains('text-white')) {
        cardNavSpan[i].classList.remove('text-white');
      }
    }
    for (var i = 0; i < hr.length; i++) {
      if (hr[i].classList.contains('light')) {
        hr[i].classList.add('dark');
        hr[i].classList.remove('light');
      }
    }
    for (var i = 0; i < hr_card.length; i++) {
      if (hr_card[i].classList.contains('light')) {
        hr_card[i].classList.add('dark');
        hr_card[i].classList.remove('light');
      }
    }
    for (var i = 0; i < text_btn.length; i++) {
      if (text_btn[i].classList.contains('text-white')) {
        text_btn[i].classList.remove('text-white');
        text_btn[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < text_span_white.length; i++) {
      if (text_span_white[i].classList.contains('text-white') && !text_span_white[i].closest('.sidenav') && !text_span_white[i].closest('.card.bg-gradient-dark')) {
        text_span_white[i].classList.remove('text-white');
        text_span_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < text_strong_white.length; i++) {
      if (text_strong_white[i].classList.contains('text-white')) {
        text_strong_white[i].classList.remove('text-white');
        text_strong_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < secondary.length; i++) {
      if (secondary[i].classList.contains('text-white')) {
        secondary[i].classList.remove('text-white');
        secondary[i].classList.remove('opacity-8');
        secondary[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < bg_gray_600.length; i++) {
      if (bg_gray_600[i].classList.contains('bg-gray-600')) {
        bg_gray_600[i].classList.remove('bg-gray-600');
        bg_gray_600[i].classList.add('bg-gray-100');
      }
    }
    for (var i = 0; i < svg.length; i++) {
      if (svg[i].hasAttribute('fill')) {
        svg[i].setAttribute('fill', '#252f40');
      }
    }
    for (var i = 0; i < btn_text_white.length; i++) {
      if (!btn_text_white[i].closest('.card.bg-gradient-dark')) {
        btn_text_white[i].classList.remove('text-white');
        btn_text_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < card_border_dark.length; i++) {
      card_border_dark[i].classList.remove('border-dark');
    }
    el.removeAttribute("checked");
  }
}