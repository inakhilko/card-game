function _createForOfIteratorHelper(e, t) {
  var r =
    ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
  if (!r) {
    if (
      Array.isArray(e) ||
      (r = _unsupportedIterableToArray(e)) ||
      (t && e && "number" == typeof e.length)
    ) {
      r && (e = r);
      var n = 0,
        a = function () {};
      return {
        s: a,
        n: function () {
          return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
        },
        e: function (e) {
          throw e;
        },
        f: a,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var o,
    c = !0,
    i = !1;
  return {
    s: function () {
      r = r.call(e);
    },
    n: function () {
      var e = r.next();
      return (c = e.done), e;
    },
    e: function (e) {
      (i = !0), (o = e);
    },
    f: function () {
      try {
        c || null == r.return || r.return();
      } finally {
        if (i) throw o;
      }
    },
  };
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === r && e.constructor && (r = e.constructor.name),
      "Map" === r || "Set" === r
        ? Array.from(e)
        : "Arguments" === r ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        ? _arrayLikeToArray(e, t)
        : void 0
    );
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
import "./styles.css";
import "./normalize.css";
function createNumbersArray(e) {
  for (var t = [], r = 1; r <= (e * e) / 2; r++) t.push(r), t.push(r);
  return t;
}
function shuffle(e) {
  for (var t = e.length - 1; t > 0; t--) {
    var r = Math.floor(Math.random() * (t + 1)),
      n = [e[r], e[t]];
    (e[t] = n[0]), (e[r] = n[1]);
  }
  return e;
}
function formCreator() {
  var e = document.querySelector(".root"),
    t = document.createElement("form");
  t.classList.add("form");
  var r = document.createElement("input");
  r.classList.add("input"),
    (r.type = "number"),
    (r.placeholder = "Введите четное число");
  var n = document.createElement("button");
  (n.innerHTML = "Начать игру"),
    n.classList.add("btn"),
    t.append(r),
    t.append(n),
    (e.innerHTML = ""),
    e.append(t),
    (t.onsubmit = function (e) {
      e.preventDefault(),
        r.value >= 2 && r.value <= 10 && r.value % 2 == 0
          ? startGame(r.value)
          : startGame(4);
    });
}
function buttonsCreator(e) {
  var t = document.createElement("div");
  t.classList.add("buttons");
  var r = document.createElement("button");
  r.classList.add("btn"), (r.innerHTML = "Сыграть ещё раз");
  var n = document.createElement("button");
  n.classList.add("btn"),
    (n.innerHTML = "Поменять поле"),
    t.append(r),
    t.append(n),
    document.querySelector(".root").append(t),
    r.addEventListener("click", function (t) {
      startGame(e);
    }),
    n.addEventListener("click", function (e) {
      formCreator();
    });
}
function startGame(e) {
  var t = null,
    r = !0,
    n = 0,
    a = shuffle(createNumbersArray(e)),
    o = document.querySelector(".root");
  o.innerHTML = "";
  var c = document.createElement("div");
  c.classList.add("time-container"), o.append(c);
  var i = 60,
    l = function () {
      var t = document.querySelector(".time-container"),
        n = Math.trunc(i / 60)
          .toString()
          .padStart(2, "0"),
        a = (i % 60).toString().padStart(2, "0");
      if (i < 0) {
        clearInterval(u), buttonsCreator(e), (r = !1);
        var o,
          c = _createForOfIteratorHelper(document.querySelectorAll(".card"));
        try {
          for (c.s(); !(o = c.n()).done; ) {
            var l = o.value;
            l.classList.add("card--opened"), l.classList.add("failed");
          }
        } catch (e) {
          c.e(e);
        } finally {
          c.f();
        }
      } else {
        var d = "".concat(n, ":").concat(a);
        t.innerHTML = d;
      }
      --i;
    };
  l();
  for (var u = setInterval(l, 1e3), d = 0; d < e; d++) {
    var s = document.createElement("div");
    s.classList.add("row");
    for (
      var m = function () {
          var o = document.createElement("div"),
            c = document.createElement("div"),
            i = document.createElement("div"),
            l = a[d * e + f];
          (c.innerText = l),
            c.classList.add("front"),
            i.classList.add("back"),
            o.append(c, i),
            o.addEventListener("click", function a(o) {
              if (r)
                if (
                  (o.currentTarget.classList.toggle("card--opened"), null === t)
                )
                  (t = {
                    element: o.currentTarget,
                    value: l,
                    function: a,
                  }).element.removeEventListener("click", t.function);
                else {
                  var c = o.currentTarget;
                  (r = !1),
                    setTimeout(function () {
                      t.value === l
                        ? (t.element.classList.add("done"),
                          c.classList.add("done"),
                          (n += 2) === e * e && buttonsCreator(e),
                          c.removeEventListener("click", a))
                        : (t.element.classList.remove("card--opened"),
                          t.element.addEventListener("click", t.function),
                          c.classList.remove("card--opened")),
                        (t = null),
                        (r = !0);
                    }, 1200);
                }
            }),
            o.classList.add("card"),
            s.append(o);
        },
        f = 0;
      f < e;
      f++
    )
      m();
    o.append(s);
  }
}
formCreator();
