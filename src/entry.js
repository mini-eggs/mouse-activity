/**
 * Default options
 */

var def = {};
def["el"] = document;
def["delay"] = 1500;

/**
 * Small util funcs
 */

var debounce = (t, f) => {
  var instance;
  return (...args) => {
    clearTimeout(instance);
    instance = setTimeout(f, t, ...args);
  };
};

var throttle = (t, f) => {
  var instance;
  return (...args) => {
    if (!instance) {
      f(args);
      instance = true;
      setTimeout(() => (instance = false), t);
    }
  };
};

/**
 * Main,
 * lots of space sizing hax.
 */

var mouse = (opts = {}) => {
  opts = { ...def, ...opts };

  var self = {};
  var onActive = () => {};
  var onInactive = () => {};
  var onMouseActive = throttle(opts["delay"], e => onActive(e));
  var onMouseInactive = debounce(opts["delay"], e => onInactive(e));
  var add = HTMLElement.prototype.addEventListener.bind(opts["el"]);
  var remove = HTMLElement.prototype.removeEventListener.bind(opts["el"]);

  self["init"] = () =>
    add("mousedown", onMouseActive) ||
    add("mousedown", onMouseInactive) ||
    add("mousemove", onMouseActive) ||
    add("mousemove", onMouseInactive) ||
    self;

  self["active"] = f => ((onActive = f), self);

  self["inactive"] = f => ((onInactive = f), self);

  self["destroy"] = () =>
    remove("mousedown", onMouseActive) ||
    remove("mousedown", onMouseInactive) ||
    remove("mousemove", onMouseActive) ||
    remove("mousemove", onMouseInactive) ||
    self;

  return self["init"]();
};

/**
 * Module, UMD, Webpack things.
 */

mouse["debounce"] = debounce;
mouse["throttle"] = throttle;

if (typeof module !== "undefined") {
  module["exports"] = mouse;
} else {
  window["mouseActivity"] = mouse;
}
