var defaultOptions = {
  ["el"]: document,
  ["delay"]: 1500
};

export var debounce = (t, f) => {
  var instance;
  return function() {
    clearTimeout(instance);
    instance = setTimeout(() => f.apply(this, arguments), t);
  };
};

export var throttle = (t, f) => {
  var instance;
  return function() {
    if (!instance) {
      f.apply(this, arguments);
      instance = true;
      setTimeout(() => (instance = false), t);
    }
  };
};

export var mouse = opts => {
  opts = { ...defaultOptions, opts };
  var onActive = () => {};
  var onInactive = () => {};
  var onMouseActive = throttle(opts["delay"], e => onActive(e));
  var onMouseInactive = debounce(opts["delay"], e => onInactive(e));

  opts["el"].addEventListener("mousedown", onMouseActive);
  opts["el"].addEventListener("mousedown", onMouseInactive);
  opts["el"].addEventListener("mousemove", onMouseActive);
  opts["el"].addEventListener("mousemove", onMouseInactive);

  var self = {
    ["active"]: f => {
      onActive = f;
      return self;
    },
    ["inactive"]: f => {
      onInactive = f;
      return self;
    },
    ["destroy"]: () => {
      opts["el"].removeEventListener("mousedown", onMouseActive);
      opts["el"].removeEventListener("mousedown", onMouseInactive);
      opts["el"].removeEventListener("mousemove", onMouseActive);
      opts["el"].removeEventListener("mousemove", onMouseInactive);
    }
  };

  return self;
};
