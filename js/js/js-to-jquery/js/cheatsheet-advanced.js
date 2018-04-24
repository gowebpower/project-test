
# Javascript Cheat Sheet
For using vanilla javascript without jQuery

## Query Selectors
document.body.getElementsByTagName()
document.getElementsByClassName()
document.getElementById()
document.querySelector()
document.querySelectorAll()

## CSS properties
<element>.style.<properyName> = "propertyValue"

## Add/Remove CSS class
var addClass = function(element, className) {

  // For stable ver
  // ---- if element cannot be found
  if(!elements) return;

  // ---- if passed elements are just string, not document.querySelector.
  if( typeof(elements) === 'string' ){
    elements = document.querySelectorAll(elements); 
 
  }

  for(var i=0; i < elements.length; i++ ){

     // ---- If className not found
    if( elements[i].className.indexOf(className) == -1 ) { 

 
      // If there is at least a class, make sure add a space when adding className.
      if(elements[i].className != '' ){

        elements[i].className+= ' '+ className;

      } else elements[i].className += className;


    }

    // For modern browser

    // elements[i].classList.add(className);

  }

}

var removeClass = function(element, className) {

  // ---- if element cannot be found
  if(!elements) return;

  // ---- if passed elements are just string, not document.querySelector.
  if( typeof(elements) === 'string' ){
    elements = document.querySelectorAll(elements); 
 
  }

  var regex = new RegExp('(^| )' + className + '($| )', 'g');

  for(var i=0; i < elements.length; i++ ){

    elements[i].className = elements[i].className.replace(regex, ' ');

    // For modern browser
    // elements[i].classList.remove(className); regex not needed.
    
  }
}

## Attributes
<element>.getAttribute()
<element>.setAttribute()

## Navigating the DOM Tree
<element>.childNodes
<element>.parentNode
<element>.firstChild
<element>.lastChild
<element>.previousSibling
<element>.nextSibling

## Creating new elements
document.createElement()
document.createTextNode()

## Changing the document
document.body.appendChild()
document.body.replaceChild()
document.body.insertBefore()

## Element Layout
<element>.offsetWidth
<element>.offsetHeight
<element>.clientWidth
<element>.clientHeight
<element>.getBoundingClientRect()

## Current scroll position
pageXOffset
pageYOffset

## Event Listeners
<element>.addEventListener("click",function(e){})
<element>.removeEventListener("click", <eventListenerName>);
<event>.target
<event>.preventDefault()
<event>.stopPropagation()

## Arrays
Array.forEach()
Array.push()
Arrar.pop()
Array.filter()
Array.indexOf()
Array.length

## Objects
Object.create(null)
Object.getPrototypeOf()
Object.setPrototypeOf()

## Meta Code
var myFunction = new Function("arg1,arg2", "return arg1 + arg2;");

## Ajax

function ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
            this.responseText;
       }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send(); 
}

function ajax(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
  });
  req.send(null);
}

## Animations (this needs some work)
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

$("#book").animate({
  opacity: 0.25,
  left: "+=50",
  height: "toggle"
}, 5000, function() {
  // Animation complete.
});

## Extend
Object.prototype.extend = function(obj) {
   for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
         this[i] = obj[i];
      }
   }
};

## Loops
arr.forEach(function(){
  
});

for(var i in obj) {
  
}

for(var i=0,c=arr.length;i<c;i++) {
  
}

for(var i=0,c=arr.length;i<c;i++) {
  for(var j=0,k=arr.length;j<k;j++) {
    
  }
}

## Dependency Injection
(function(module){
  
}(Module))

# Redux

## Component
var Component = (function($, Actions, store){

var instanceId = 0;

  var z = function(jcont,opts) {
      instanceId++;
      this.id = instanceId;
      this.$el = $(build());
      jcont.append(this.$el);
      this.opts = opts;
      init(this);
  };

  var init = function(t) {
      render();
      store.subscribe(render);
      setupButtons(t);
  };

  var build = function() {
      return [
          '<div class="counter">',
            '<p>Clicked:<span class="value">0</span> times',
              '<button class="increment">+</button>',
              '<button class="decrement">-</button>',
              '<button class="incrementIfOdd">Increment if odd</button>',
              '<button class="incrementAsync">Increment async</button>',
            '</p>',
          '</div>'
      ].join('\n')
  };

  var render = function() {
      var $el = store.getState().Counter.$el;
      var id = store.getState().Counter.id;
      if (id) {
          var value = store.getState().Counter.values[id];
          $el.find('.value').html(value.toString());
      }
  };

  var setupButtons = function(t) {

      t.$el.find('button.increment').on('click',function(){
          Actions.increment(t.id,t.$el);
      });

      t.$el.find('button.decrement').on('click',function(){
          Actions.decrement(t.id,t.$el);
      });

      t.$el.find('button.incrementIfOdd').on('click',function(){
          if (store.getState().Counter.values[t.id] % 2 !== 0) {
            Actions.increment(t.id,t.$el);
          }
      });

      t.$el.find('button.incrementAsync').on('click',function(){
          setTimeout(function() {
            Actions.increment(t.id,t.$el);
          }, 1000);
      });
  };

  return z;
  
}(jQuery, App.Actions.Counter, App.Store))
