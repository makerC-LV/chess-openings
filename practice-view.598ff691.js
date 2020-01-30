// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/libs/chessground.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.Chessground = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
        o(t[i]);
      }

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util = require("./util");

      function anim(mutation, state) {
        return state.animation.enabled ? animate(mutation, state) : render(mutation, state);
      }

      exports.anim = anim;

      function render(mutation, state) {
        var result = mutation(state);
        state.dom.redraw();
        return result;
      }

      exports.render = render;

      function makePiece(key, piece) {
        return {
          key: key,
          pos: util.key2pos(key),
          piece: piece
        };
      }

      function closer(piece, pieces) {
        return pieces.sort(function (p1, p2) {
          return util.distanceSq(piece.pos, p1.pos) - util.distanceSq(piece.pos, p2.pos);
        })[0];
      }

      function computePlan(prevPieces, current) {
        var anims = {},
            animedOrigs = [],
            fadings = {},
            missings = [],
            news = [],
            prePieces = {};
        var curP, preP, i, vector;

        for (i in prevPieces) {
          prePieces[i] = makePiece(i, prevPieces[i]);
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = util.allKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            curP = current.pieces[key];
            preP = prePieces[key];

            if (curP) {
              if (preP) {
                if (!util.samePiece(curP, preP.piece)) {
                  missings.push(preP);
                  news.push(makePiece(key, curP));
                }
              } else news.push(makePiece(key, curP));
            } else if (preP) missings.push(preP);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        news.forEach(function (newP) {
          preP = closer(newP, missings.filter(function (p) {
            return util.samePiece(newP.piece, p.piece);
          }));

          if (preP) {
            vector = [preP.pos[0] - newP.pos[0], preP.pos[1] - newP.pos[1]];
            anims[newP.key] = vector.concat(vector);
            animedOrigs.push(preP.key);
          }
        });
        missings.forEach(function (p) {
          if (!util.containsX(animedOrigs, p.key)) fadings[p.key] = p.piece;
        });
        return {
          anims: anims,
          fadings: fadings
        };
      }

      function step(state, now) {
        var cur = state.animation.current;

        if (cur === undefined) {
          if (!state.dom.destroyed) state.dom.redrawNow();
          return;
        }

        var rest = 1 - (now - cur.start) * cur.frequency;

        if (rest <= 0) {
          state.animation.current = undefined;
          state.dom.redrawNow();
        } else {
          var ease = easing(rest);

          for (var i in cur.plan.anims) {
            var cfg = cur.plan.anims[i];
            cfg[2] = cfg[0] * ease;
            cfg[3] = cfg[1] * ease;
          }

          state.dom.redrawNow(true);
          requestAnimationFrame(function () {
            var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : performance.now();
            return step(state, now);
          });
        }
      }

      function animate(mutation, state) {
        var prevPieces = Object.assign({}, state.pieces);
        var result = mutation(state);
        var plan = computePlan(prevPieces, state);

        if (!isObjectEmpty(plan.anims) || !isObjectEmpty(plan.fadings)) {
          var alreadyRunning = state.animation.current && state.animation.current.start;
          state.animation.current = {
            start: performance.now(),
            frequency: 1 / state.animation.duration,
            plan: plan
          };
          if (!alreadyRunning) step(state, performance.now());
        } else {
          state.dom.redraw();
        }

        return result;
      }

      function isObjectEmpty(o) {
        for (var _ in o) {
          return false;
        }

        return true;
      }

      function easing(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }
    }, {
      "./util": 18
    }],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var board = require("./board");

      var fen_1 = require("./fen");

      var config_1 = require("./config");

      var anim_1 = require("./anim");

      var drag_1 = require("./drag");

      var explosion_1 = require("./explosion");

      function start(state, redrawAll) {
        function toggleOrientation() {
          board.toggleOrientation(state);
          redrawAll();
        }

        ;
        return {
          set: function set(config) {
            if (config.orientation && config.orientation !== state.orientation) toggleOrientation();
            (config.fen ? anim_1.anim : anim_1.render)(function (state) {
              return config_1.configure(state, config);
            }, state);
          },
          state: state,
          getFen: function getFen() {
            return fen_1.write(state.pieces);
          },
          toggleOrientation: toggleOrientation,
          setPieces: function setPieces(pieces) {
            anim_1.anim(function (state) {
              return board.setPieces(state, pieces);
            }, state);
          },
          selectSquare: function selectSquare(key, force) {
            if (key) anim_1.anim(function (state) {
              return board.selectSquare(state, key, force);
            }, state);else if (state.selected) {
              board.unselect(state);
              state.dom.redraw();
            }
          },
          move: function move(orig, dest) {
            anim_1.anim(function (state) {
              return board.baseMove(state, orig, dest);
            }, state);
          },
          newPiece: function newPiece(piece, key) {
            anim_1.anim(function (state) {
              return board.baseNewPiece(state, piece, key);
            }, state);
          },
          playPremove: function playPremove() {
            if (state.premovable.current) {
              if (anim_1.anim(board.playPremove, state)) return true;
              state.dom.redraw();
            }

            return false;
          },
          playPredrop: function playPredrop(validate) {
            if (state.predroppable.current) {
              var result = board.playPredrop(state, validate);
              state.dom.redraw();
              return result;
            }

            return false;
          },
          cancelPremove: function cancelPremove() {
            anim_1.render(board.unsetPremove, state);
          },
          cancelPredrop: function cancelPredrop() {
            anim_1.render(board.unsetPredrop, state);
          },
          cancelMove: function cancelMove() {
            anim_1.render(function (state) {
              board.cancelMove(state);
              drag_1.cancel(state);
            }, state);
          },
          stop: function stop() {
            anim_1.render(function (state) {
              board.stop(state);
              drag_1.cancel(state);
            }, state);
          },
          explode: function explode(keys) {
            explosion_1.default(state, keys);
          },
          setAutoShapes: function setAutoShapes(shapes) {
            anim_1.render(function (state) {
              return state.drawable.autoShapes = shapes;
            }, state);
          },
          setShapes: function setShapes(shapes) {
            anim_1.render(function (state) {
              return state.drawable.shapes = shapes;
            }, state);
          },
          getKeyAtDomPos: function getKeyAtDomPos(pos) {
            return board.getKeyAtDomPos(pos, board.whitePov(state), state.dom.bounds());
          },
          redrawAll: redrawAll,
          dragNewPiece: function dragNewPiece(piece, event, force) {
            drag_1.dragNewPiece(state, piece, event, force);
          },
          destroy: function destroy() {
            board.stop(state);
            state.dom.unbind && state.dom.unbind();
            state.dom.destroyed = true;
          }
        };
      }

      exports.start = start;
    }, {
      "./anim": 1,
      "./board": 3,
      "./config": 5,
      "./drag": 6,
      "./explosion": 10,
      "./fen": 11
    }],
    3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util_1 = require("./util");

      var premove_1 = require("./premove");

      function callUserFunction(f) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (f) setTimeout(function () {
          return f.apply(void 0, args);
        }, 1);
      }

      exports.callUserFunction = callUserFunction;

      function toggleOrientation(state) {
        state.orientation = util_1.opposite(state.orientation);
        state.animation.current = state.draggable.current = state.selected = undefined;
      }

      exports.toggleOrientation = toggleOrientation;

      function reset(state) {
        state.lastMove = undefined;
        unselect(state);
        unsetPremove(state);
        unsetPredrop(state);
      }

      exports.reset = reset;

      function setPieces(state, pieces) {
        for (var key in pieces) {
          var piece = pieces[key];
          if (piece) state.pieces[key] = piece;else delete state.pieces[key];
        }
      }

      exports.setPieces = setPieces;

      function setCheck(state, color) {
        state.check = undefined;
        if (color === true) color = state.turnColor;
        if (color) for (var k in state.pieces) {
          if (state.pieces[k].role === 'king' && state.pieces[k].color === color) {
            state.check = k;
          }
        }
      }

      exports.setCheck = setCheck;

      function setPremove(state, orig, dest, meta) {
        unsetPredrop(state);
        state.premovable.current = [orig, dest];
        callUserFunction(state.premovable.events.set, orig, dest, meta);
      }

      function unsetPremove(state) {
        if (state.premovable.current) {
          state.premovable.current = undefined;
          callUserFunction(state.premovable.events.unset);
        }
      }

      exports.unsetPremove = unsetPremove;

      function setPredrop(state, role, key) {
        unsetPremove(state);
        state.predroppable.current = {
          role: role,
          key: key
        };
        callUserFunction(state.predroppable.events.set, role, key);
      }

      function unsetPredrop(state) {
        var pd = state.predroppable;

        if (pd.current) {
          pd.current = undefined;
          callUserFunction(pd.events.unset);
        }
      }

      exports.unsetPredrop = unsetPredrop;

      function tryAutoCastle(state, orig, dest) {
        if (!state.autoCastle) return false;
        var king = state.pieces[orig];
        if (!king || king.role !== 'king') return false;
        var origPos = util_1.key2pos(orig);
        if (origPos[0] !== 5) return false;
        if (origPos[1] !== 1 && origPos[1] !== 8) return false;
        var destPos = util_1.key2pos(dest);
        var oldRookPos, newRookPos, newKingPos;

        if (destPos[0] === 7 || destPos[0] === 8) {
          oldRookPos = util_1.pos2key([8, origPos[1]]);
          newRookPos = util_1.pos2key([6, origPos[1]]);
          newKingPos = util_1.pos2key([7, origPos[1]]);
        } else if (destPos[0] === 3 || destPos[0] === 1) {
          oldRookPos = util_1.pos2key([1, origPos[1]]);
          newRookPos = util_1.pos2key([4, origPos[1]]);
          newKingPos = util_1.pos2key([3, origPos[1]]);
        } else return false;

        var rook = state.pieces[oldRookPos];
        if (!rook || rook.role !== 'rook') return false;
        delete state.pieces[orig];
        delete state.pieces[oldRookPos];
        state.pieces[newKingPos] = king;
        state.pieces[newRookPos] = rook;
        return true;
      }

      function baseMove(state, orig, dest) {
        var origPiece = state.pieces[orig],
            destPiece = state.pieces[dest];
        if (orig === dest || !origPiece) return false;
        var captured = destPiece && destPiece.color !== origPiece.color ? destPiece : undefined;
        if (dest == state.selected) unselect(state);
        callUserFunction(state.events.move, orig, dest, captured);

        if (!tryAutoCastle(state, orig, dest)) {
          state.pieces[dest] = origPiece;
          delete state.pieces[orig];
        }

        state.lastMove = [orig, dest];
        state.check = undefined;
        callUserFunction(state.events.change);
        return captured || true;
      }

      exports.baseMove = baseMove;

      function baseNewPiece(state, piece, key, force) {
        if (state.pieces[key]) {
          if (force) delete state.pieces[key];else return false;
        }

        callUserFunction(state.events.dropNewPiece, piece, key);
        state.pieces[key] = piece;
        state.lastMove = [key];
        state.check = undefined;
        callUserFunction(state.events.change);
        state.movable.dests = undefined;
        state.turnColor = util_1.opposite(state.turnColor);
        return true;
      }

      exports.baseNewPiece = baseNewPiece;

      function baseUserMove(state, orig, dest) {
        var result = baseMove(state, orig, dest);

        if (result) {
          state.movable.dests = undefined;
          state.turnColor = util_1.opposite(state.turnColor);
          state.animation.current = undefined;
        }

        return result;
      }

      function userMove(state, orig, dest) {
        if (canMove(state, orig, dest)) {
          var result = baseUserMove(state, orig, dest);

          if (result) {
            var holdTime = state.hold.stop();
            unselect(state);
            var metadata = {
              premove: false,
              ctrlKey: state.stats.ctrlKey,
              holdTime: holdTime
            };
            if (result !== true) metadata.captured = result;
            callUserFunction(state.movable.events.after, orig, dest, metadata);
            return true;
          }
        } else if (canPremove(state, orig, dest)) {
          setPremove(state, orig, dest, {
            ctrlKey: state.stats.ctrlKey
          });
          unselect(state);
          return true;
        }

        unselect(state);
        return false;
      }

      exports.userMove = userMove;

      function dropNewPiece(state, orig, dest, force) {
        if (canDrop(state, orig, dest) || force) {
          var piece = state.pieces[orig];
          delete state.pieces[orig];
          baseNewPiece(state, piece, dest, force);
          callUserFunction(state.movable.events.afterNewPiece, piece.role, dest, {
            predrop: false
          });
        } else if (canPredrop(state, orig, dest)) {
          setPredrop(state, state.pieces[orig].role, dest);
        } else {
          unsetPremove(state);
          unsetPredrop(state);
        }

        delete state.pieces[orig];
        unselect(state);
      }

      exports.dropNewPiece = dropNewPiece;

      function selectSquare(state, key, force) {
        callUserFunction(state.events.select, key);

        if (state.selected) {
          if (state.selected === key && !state.draggable.enabled) {
            unselect(state);
            state.hold.cancel();
            return;
          } else if ((state.selectable.enabled || force) && state.selected !== key) {
            if (userMove(state, state.selected, key)) {
              state.stats.dragged = false;
              return;
            }
          }
        }

        if (isMovable(state, key) || isPremovable(state, key)) {
          setSelected(state, key);
          state.hold.start();
        }
      }

      exports.selectSquare = selectSquare;

      function setSelected(state, key) {
        state.selected = key;

        if (isPremovable(state, key)) {
          state.premovable.dests = premove_1.default(state.pieces, key, state.premovable.castle);
        } else state.premovable.dests = undefined;
      }

      exports.setSelected = setSelected;

      function unselect(state) {
        state.selected = undefined;
        state.premovable.dests = undefined;
        state.hold.cancel();
      }

      exports.unselect = unselect;

      function isMovable(state, orig) {
        var piece = state.pieces[orig];
        return !!piece && (state.movable.color === 'both' || state.movable.color === piece.color && state.turnColor === piece.color);
      }

      function canMove(state, orig, dest) {
        return orig !== dest && isMovable(state, orig) && (state.movable.free || !!state.movable.dests && util_1.containsX(state.movable.dests[orig], dest));
      }

      exports.canMove = canMove;

      function canDrop(state, orig, dest) {
        var piece = state.pieces[orig];
        return !!piece && dest && (orig === dest || !state.pieces[dest]) && (state.movable.color === 'both' || state.movable.color === piece.color && state.turnColor === piece.color);
      }

      function isPremovable(state, orig) {
        var piece = state.pieces[orig];
        return !!piece && state.premovable.enabled && state.movable.color === piece.color && state.turnColor !== piece.color;
      }

      function canPremove(state, orig, dest) {
        return orig !== dest && isPremovable(state, orig) && util_1.containsX(premove_1.default(state.pieces, orig, state.premovable.castle), dest);
      }

      function canPredrop(state, orig, dest) {
        var piece = state.pieces[orig];
        var destPiece = state.pieces[dest];
        return !!piece && dest && (!destPiece || destPiece.color !== state.movable.color) && state.predroppable.enabled && (piece.role !== 'pawn' || dest[1] !== '1' && dest[1] !== '8') && state.movable.color === piece.color && state.turnColor !== piece.color;
      }

      function isDraggable(state, orig) {
        var piece = state.pieces[orig];
        return !!piece && state.draggable.enabled && (state.movable.color === 'both' || state.movable.color === piece.color && (state.turnColor === piece.color || state.premovable.enabled));
      }

      exports.isDraggable = isDraggable;

      function playPremove(state) {
        var move = state.premovable.current;
        if (!move) return false;
        var orig = move[0],
            dest = move[1];
        var success = false;

        if (canMove(state, orig, dest)) {
          var result = baseUserMove(state, orig, dest);

          if (result) {
            var metadata = {
              premove: true
            };
            if (result !== true) metadata.captured = result;
            callUserFunction(state.movable.events.after, orig, dest, metadata);
            success = true;
          }
        }

        unsetPremove(state);
        return success;
      }

      exports.playPremove = playPremove;

      function playPredrop(state, validate) {
        var drop = state.predroppable.current,
            success = false;
        if (!drop) return false;

        if (validate(drop)) {
          var piece = {
            role: drop.role,
            color: state.movable.color
          };

          if (baseNewPiece(state, piece, drop.key)) {
            callUserFunction(state.movable.events.afterNewPiece, drop.role, drop.key, {
              predrop: true
            });
            success = true;
          }
        }

        unsetPredrop(state);
        return success;
      }

      exports.playPredrop = playPredrop;

      function cancelMove(state) {
        unsetPremove(state);
        unsetPredrop(state);
        unselect(state);
      }

      exports.cancelMove = cancelMove;

      function stop(state) {
        state.movable.color = state.movable.dests = state.animation.current = undefined;
        cancelMove(state);
      }

      exports.stop = stop;

      function getKeyAtDomPos(pos, asWhite, bounds) {
        var file = Math.ceil(8 * ((pos[0] - bounds.left) / bounds.width));
        if (!asWhite) file = 9 - file;
        var rank = Math.ceil(8 - 8 * ((pos[1] - bounds.top) / bounds.height));
        if (!asWhite) rank = 9 - rank;
        return file > 0 && file < 9 && rank > 0 && rank < 9 ? util_1.pos2key([file, rank]) : undefined;
      }

      exports.getKeyAtDomPos = getKeyAtDomPos;

      function whitePov(s) {
        return s.orientation === 'white';
      }

      exports.whitePov = whitePov;
    }, {
      "./premove": 13,
      "./util": 18
    }],
    4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var api_1 = require("./api");

      var config_1 = require("./config");

      var state_1 = require("./state");

      var wrap_1 = require("./wrap");

      var events = require("./events");

      var render_1 = require("./render");

      var svg = require("./svg");

      var util = require("./util");

      function Chessground(element, config) {
        var state = state_1.defaults();
        config_1.configure(state, config || {});

        function redrawAll() {
          var prevUnbind = state.dom && state.dom.unbind;

          var relative = state.viewOnly && !state.drawable.visible,
              elements = wrap_1.default(element, state, relative),
              bounds = util.memo(function () {
            return elements.board.getBoundingClientRect();
          }),
              redrawNow = function redrawNow(skipSvg) {
            render_1.default(state);
            if (!skipSvg && elements.svg) svg.renderSvg(state, elements.svg);
          };

          state.dom = {
            elements: elements,
            bounds: bounds,
            redraw: debounceRedraw(redrawNow),
            redrawNow: redrawNow,
            unbind: prevUnbind,
            relative: relative
          };
          state.drawable.prevSvgHash = '';
          redrawNow(false);
          events.bindBoard(state);
          if (!prevUnbind) state.dom.unbind = events.bindDocument(state, redrawAll);
          state.events.insert && state.events.insert(elements);
        }

        redrawAll();
        return api_1.start(state, redrawAll);
      }

      exports.Chessground = Chessground;
      ;

      function debounceRedraw(redrawNow) {
        var redrawing = false;
        return function () {
          if (redrawing) return;
          redrawing = true;
          requestAnimationFrame(function () {
            redrawNow();
            redrawing = false;
          });
        };
      }
    }, {
      "./api": 2,
      "./config": 5,
      "./events": 9,
      "./render": 14,
      "./state": 15,
      "./svg": 16,
      "./util": 18,
      "./wrap": 19
    }],
    5: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var board_1 = require("./board");

      var fen_1 = require("./fen");

      function configure(state, config) {
        if (config.movable && config.movable.dests) state.movable.dests = undefined;
        merge(state, config);

        if (config.fen) {
          state.pieces = fen_1.read(config.fen);
          state.drawable.shapes = [];
        }

        if (config.hasOwnProperty('check')) board_1.setCheck(state, config.check || false);
        if (config.hasOwnProperty('lastMove') && !config.lastMove) state.lastMove = undefined;else if (config.lastMove) state.lastMove = config.lastMove;
        if (state.selected) board_1.setSelected(state, state.selected);
        if (!state.animation.duration || state.animation.duration < 100) state.animation.enabled = false;

        if (!state.movable.rookCastle && state.movable.dests) {
          var rank = state.movable.color === 'white' ? 1 : 8,
              kingStartPos = 'e' + rank,
              dests = state.movable.dests[kingStartPos],
              king = state.pieces[kingStartPos];
          if (!dests || !king || king.role !== 'king') return;
          state.movable.dests[kingStartPos] = dests.filter(function (d) {
            return !(d === 'a' + rank && dests.indexOf('c' + rank) !== -1) && !(d === 'h' + rank && dests.indexOf('g' + rank) !== -1);
          });
        }
      }

      exports.configure = configure;
      ;

      function merge(base, extend) {
        for (var key in extend) {
          if (isObject(base[key]) && isObject(extend[key])) merge(base[key], extend[key]);else base[key] = extend[key];
        }
      }

      function isObject(o) {
        return _typeof(o) === 'object';
      }
    }, {
      "./board": 3,
      "./fen": 11
    }],
    6: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var board = require("./board");

      var util = require("./util");

      var draw_1 = require("./draw");

      var anim_1 = require("./anim");

      function start(s, e) {
        if (e.button !== undefined && e.button !== 0) return;
        if (e.touches && e.touches.length > 1) return;
        var bounds = s.dom.bounds(),
            position = util.eventPosition(e),
            orig = board.getKeyAtDomPos(position, board.whitePov(s), bounds);
        if (!orig) return;
        var piece = s.pieces[orig];
        var previouslySelected = s.selected;
        if (!previouslySelected && s.drawable.enabled && (s.drawable.eraseOnClick || !piece || piece.color !== s.turnColor)) draw_1.clear(s);
        if (e.cancelable !== false && (!e.touches || !s.movable.color || piece || previouslySelected || pieceCloseTo(s, position))) e.preventDefault();
        var hadPremove = !!s.premovable.current;
        var hadPredrop = !!s.predroppable.current;
        s.stats.ctrlKey = e.ctrlKey;

        if (s.selected && board.canMove(s, s.selected, orig)) {
          anim_1.anim(function (state) {
            return board.selectSquare(state, orig);
          }, s);
        } else {
          board.selectSquare(s, orig);
        }

        var stillSelected = s.selected === orig;
        var element = pieceElementByKey(s, orig);

        if (piece && element && stillSelected && board.isDraggable(s, orig)) {
          var squareBounds = computeSquareBounds(orig, board.whitePov(s), bounds);
          s.draggable.current = {
            orig: orig,
            origPos: util.key2pos(orig),
            piece: piece,
            rel: position,
            epos: position,
            pos: [0, 0],
            dec: s.draggable.centerPiece ? [position[0] - (squareBounds.left + squareBounds.width / 2), position[1] - (squareBounds.top + squareBounds.height / 2)] : [0, 0],
            started: s.draggable.autoDistance && s.stats.dragged,
            element: element,
            previouslySelected: previouslySelected,
            originTarget: e.target
          };
          element.cgDragging = true;
          element.classList.add('dragging');
          var ghost = s.dom.elements.ghost;

          if (ghost) {
            ghost.className = "ghost ".concat(piece.color, " ").concat(piece.role);
            util.translateAbs(ghost, util.posToTranslateAbs(bounds)(util.key2pos(orig), board.whitePov(s)));
            util.setVisible(ghost, true);
          }

          processDrag(s);
        } else {
          if (hadPremove) board.unsetPremove(s);
          if (hadPredrop) board.unsetPredrop(s);
        }

        s.dom.redraw();
      }

      exports.start = start;

      function pieceCloseTo(s, pos) {
        var asWhite = board.whitePov(s),
            bounds = s.dom.bounds(),
            radiusSq = Math.pow(bounds.width / 8, 2);

        for (var key in s.pieces) {
          var squareBounds = computeSquareBounds(key, asWhite, bounds),
              center = [squareBounds.left + squareBounds.width / 2, squareBounds.top + squareBounds.height / 2];
          if (util.distanceSq(center, pos) <= radiusSq) return true;
        }

        return false;
      }

      exports.pieceCloseTo = pieceCloseTo;

      function dragNewPiece(s, piece, e, force) {
        var key = 'a0';
        s.pieces[key] = piece;
        s.dom.redraw();
        var position = util.eventPosition(e),
            asWhite = board.whitePov(s),
            bounds = s.dom.bounds(),
            squareBounds = computeSquareBounds(key, asWhite, bounds);
        var rel = [(asWhite ? 0 : 7) * squareBounds.width + bounds.left, (asWhite ? 8 : -1) * squareBounds.height + bounds.top];
        s.draggable.current = {
          orig: key,
          origPos: util.key2pos(key),
          piece: piece,
          rel: rel,
          epos: position,
          pos: [position[0] - rel[0], position[1] - rel[1]],
          dec: [-squareBounds.width / 2, -squareBounds.height / 2],
          started: true,
          element: function element() {
            return pieceElementByKey(s, key);
          },
          originTarget: e.target,
          newPiece: true,
          force: !!force
        };
        processDrag(s);
      }

      exports.dragNewPiece = dragNewPiece;

      function processDrag(s) {
        requestAnimationFrame(function () {
          var cur = s.draggable.current;
          if (!cur) return;
          if (s.animation.current && s.animation.current.plan.anims[cur.orig]) s.animation.current = undefined;
          var origPiece = s.pieces[cur.orig];
          if (!origPiece || !util.samePiece(origPiece, cur.piece)) cancel(s);else {
            if (!cur.started && util.distanceSq(cur.epos, cur.rel) >= Math.pow(s.draggable.distance, 2)) cur.started = true;

            if (cur.started) {
              if (typeof cur.element === 'function') {
                var found = cur.element();
                if (!found) return;
                found.cgDragging = true;
                found.classList.add('dragging');
                cur.element = found;
              }

              cur.pos = [cur.epos[0] - cur.rel[0], cur.epos[1] - cur.rel[1]];
              var translation = util.posToTranslateAbs(s.dom.bounds())(cur.origPos, board.whitePov(s));
              translation[0] += cur.pos[0] + cur.dec[0];
              translation[1] += cur.pos[1] + cur.dec[1];
              util.translateAbs(cur.element, translation);
            }
          }
          processDrag(s);
        });
      }

      function move(s, e) {
        if (s.draggable.current && (!e.touches || e.touches.length < 2)) {
          s.draggable.current.epos = util.eventPosition(e);
        }
      }

      exports.move = move;

      function end(s, e) {
        var cur = s.draggable.current;
        if (!cur) return;
        if (e.type === 'touchend' && e.cancelable !== false) e.preventDefault();

        if (e.type === 'touchend' && cur && cur.originTarget !== e.target && !cur.newPiece) {
          s.draggable.current = undefined;
          return;
        }

        board.unsetPremove(s);
        board.unsetPredrop(s);
        var eventPos = util.eventPosition(e) || cur.epos;
        var dest = board.getKeyAtDomPos(eventPos, board.whitePov(s), s.dom.bounds());

        if (dest && cur.started && cur.orig !== dest) {
          if (cur.newPiece) board.dropNewPiece(s, cur.orig, dest, cur.force);else {
            s.stats.ctrlKey = e.ctrlKey;
            if (board.userMove(s, cur.orig, dest)) s.stats.dragged = true;
          }
        } else if (cur.newPiece) {
          delete s.pieces[cur.orig];
        } else if (s.draggable.deleteOnDropOff && !dest) {
          delete s.pieces[cur.orig];
          board.callUserFunction(s.events.change);
        }

        if (cur && cur.orig === cur.previouslySelected && (cur.orig === dest || !dest)) board.unselect(s);else if (!s.selectable.enabled) board.unselect(s);
        removeDragElements(s);
        s.draggable.current = undefined;
        s.dom.redraw();
      }

      exports.end = end;

      function cancel(s) {
        var cur = s.draggable.current;

        if (cur) {
          if (cur.newPiece) delete s.pieces[cur.orig];
          s.draggable.current = undefined;
          board.unselect(s);
          removeDragElements(s);
          s.dom.redraw();
        }
      }

      exports.cancel = cancel;

      function removeDragElements(s) {
        var e = s.dom.elements;
        if (e.ghost) util.setVisible(e.ghost, false);
      }

      function computeSquareBounds(key, asWhite, bounds) {
        var pos = util.key2pos(key);

        if (!asWhite) {
          pos[0] = 9 - pos[0];
          pos[1] = 9 - pos[1];
        }

        return {
          left: bounds.left + bounds.width * (pos[0] - 1) / 8,
          top: bounds.top + bounds.height * (8 - pos[1]) / 8,
          width: bounds.width / 8,
          height: bounds.height / 8
        };
      }

      function pieceElementByKey(s, key) {
        var el = s.dom.elements.board.firstChild;

        while (el) {
          if (el.cgKey === key && el.tagName === 'PIECE') return el;
          el = el.nextSibling;
        }

        return undefined;
      }
    }, {
      "./anim": 1,
      "./board": 3,
      "./draw": 7,
      "./util": 18
    }],
    7: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var board_1 = require("./board");

      var util_1 = require("./util");

      var brushes = ['green', 'red', 'blue', 'yellow'];

      function start(state, e) {
        if (e.touches && e.touches.length > 1) return;
        e.stopPropagation();
        e.preventDefault();
        e.ctrlKey ? board_1.unselect(state) : board_1.cancelMove(state);
        var pos = util_1.eventPosition(e),
            orig = board_1.getKeyAtDomPos(pos, board_1.whitePov(state), state.dom.bounds());
        if (!orig) return;
        state.drawable.current = {
          orig: orig,
          pos: pos,
          brush: eventBrush(e)
        };
        processDraw(state);
      }

      exports.start = start;

      function processDraw(state) {
        requestAnimationFrame(function () {
          var cur = state.drawable.current;

          if (cur) {
            var mouseSq = board_1.getKeyAtDomPos(cur.pos, board_1.whitePov(state), state.dom.bounds());

            if (mouseSq !== cur.mouseSq) {
              cur.mouseSq = mouseSq;
              cur.dest = mouseSq !== cur.orig ? mouseSq : undefined;
              state.dom.redrawNow();
            }

            processDraw(state);
          }
        });
      }

      exports.processDraw = processDraw;

      function move(state, e) {
        if (state.drawable.current) state.drawable.current.pos = util_1.eventPosition(e);
      }

      exports.move = move;

      function end(state) {
        var cur = state.drawable.current;

        if (cur) {
          if (cur.mouseSq) addShape(state.drawable, cur);
          cancel(state);
        }
      }

      exports.end = end;

      function cancel(state) {
        if (state.drawable.current) {
          state.drawable.current = undefined;
          state.dom.redraw();
        }
      }

      exports.cancel = cancel;

      function clear(state) {
        if (state.drawable.shapes.length) {
          state.drawable.shapes = [];
          state.dom.redraw();
          onChange(state.drawable);
        }
      }

      exports.clear = clear;

      function eventBrush(e) {
        return brushes[((e.shiftKey || e.ctrlKey) && util_1.isRightButton(e) ? 1 : 0) + (e.altKey ? 2 : 0)];
      }

      function addShape(drawable, cur) {
        var sameShape = function sameShape(s) {
          return s.orig === cur.orig && s.dest === cur.dest;
        };

        var similar = drawable.shapes.filter(sameShape)[0];
        if (similar) drawable.shapes = drawable.shapes.filter(function (s) {
          return !sameShape(s);
        });
        if (!similar || similar.brush !== cur.brush) drawable.shapes.push(cur);
        onChange(drawable);
      }

      function onChange(drawable) {
        if (drawable.onChange) drawable.onChange(drawable.shapes);
      }
    }, {
      "./board": 3,
      "./util": 18
    }],
    8: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var board = require("./board");

      var util = require("./util");

      var drag_1 = require("./drag");

      function setDropMode(s, piece) {
        s.dropmode = {
          active: true,
          piece: piece
        };
        drag_1.cancel(s);
      }

      exports.setDropMode = setDropMode;

      function cancelDropMode(s) {
        s.dropmode = {
          active: false
        };
      }

      exports.cancelDropMode = cancelDropMode;

      function drop(s, e) {
        if (!s.dropmode.active) return;
        board.unsetPremove(s);
        board.unsetPredrop(s);
        var piece = s.dropmode.piece;

        if (piece) {
          s.pieces.a0 = piece;
          var position = util.eventPosition(e);
          var dest = position && board.getKeyAtDomPos(position, board.whitePov(s), s.dom.bounds());
          if (dest) board.dropNewPiece(s, 'a0', dest);
        }

        s.dom.redraw();
      }

      exports.drop = drop;
    }, {
      "./board": 3,
      "./drag": 6,
      "./util": 18
    }],
    9: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var drag = require("./drag");

      var draw = require("./draw");

      var drop_1 = require("./drop");

      var util_1 = require("./util");

      function bindBoard(s) {
        if (s.viewOnly) return;
        var boardEl = s.dom.elements.board,
            onStart = startDragOrDraw(s);
        boardEl.addEventListener('touchstart', onStart, {
          passive: false
        });
        boardEl.addEventListener('mousedown', onStart, {
          passive: false
        });

        if (s.disableContextMenu || s.drawable.enabled) {
          boardEl.addEventListener('contextmenu', function (e) {
            return e.preventDefault();
          });
        }
      }

      exports.bindBoard = bindBoard;

      function bindDocument(s, redrawAll) {
        var unbinds = [];

        if (!s.dom.relative && s.resizable) {
          var onResize = function onResize() {
            s.dom.bounds.clear();
            requestAnimationFrame(redrawAll);
          };

          unbinds.push(unbindable(document.body, 'chessground.resize', onResize));
        }

        if (!s.viewOnly) {
          var onmove = dragOrDraw(s, drag.move, draw.move);
          var onend = dragOrDraw(s, drag.end, draw.end);
          ['touchmove', 'mousemove'].forEach(function (ev) {
            return unbinds.push(unbindable(document, ev, onmove));
          });
          ['touchend', 'mouseup'].forEach(function (ev) {
            return unbinds.push(unbindable(document, ev, onend));
          });

          var onScroll = function onScroll() {
            return s.dom.bounds.clear();
          };

          unbinds.push(unbindable(window, 'scroll', onScroll, {
            passive: true
          }));
          unbinds.push(unbindable(window, 'resize', onScroll, {
            passive: true
          }));
        }

        return function () {
          return unbinds.forEach(function (f) {
            return f();
          });
        };
      }

      exports.bindDocument = bindDocument;

      function unbindable(el, eventName, callback, options) {
        el.addEventListener(eventName, callback, options);
        return function () {
          return el.removeEventListener(eventName, callback);
        };
      }

      function startDragOrDraw(s) {
        return function (e) {
          if (s.draggable.current) drag.cancel(s);else if (s.drawable.current) draw.cancel(s);else if (e.shiftKey || util_1.isRightButton(e)) {
            if (s.drawable.enabled) draw.start(s, e);
          } else if (!s.viewOnly) {
            if (s.dropmode.active) drop_1.drop(s, e);else drag.start(s, e);
          }
        };
      }

      function dragOrDraw(s, withDrag, withDraw) {
        return function (e) {
          if (e.shiftKey || util_1.isRightButton(e)) {
            if (s.drawable.enabled) withDraw(s, e);
          } else if (!s.viewOnly) withDrag(s, e);
        };
      }
    }, {
      "./drag": 6,
      "./draw": 7,
      "./drop": 8,
      "./util": 18
    }],
    10: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function explosion(state, keys) {
        state.exploding = {
          stage: 1,
          keys: keys
        };
        state.dom.redraw();
        setTimeout(function () {
          setStage(state, 2);
          setTimeout(function () {
            return setStage(state, undefined);
          }, 120);
        }, 120);
      }

      exports.default = explosion;

      function setStage(state, stage) {
        if (state.exploding) {
          if (stage) state.exploding.stage = stage;else state.exploding = undefined;
          state.dom.redraw();
        }
      }
    }, {}],
    11: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util_1 = require("./util");

      var cg = require("./types");

      exports.initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      var roles = {
        p: 'pawn',
        r: 'rook',
        n: 'knight',
        b: 'bishop',
        q: 'queen',
        k: 'king'
      };
      var letters = {
        pawn: 'p',
        rook: 'r',
        knight: 'n',
        bishop: 'b',
        queen: 'q',
        king: 'k'
      };

      function read(fen) {
        if (fen === 'start') fen = exports.initial;
        var pieces = {};
        var row = 8,
            col = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = fen[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var c = _step2.value;

            switch (c) {
              case ' ':
                return pieces;

              case '/':
                --row;
                if (row === 0) return pieces;
                col = 0;
                break;

              case '~':
                var piece = pieces[util_1.pos2key([col, row])];
                if (piece) piece.promoted = true;
                break;

              default:
                var nb = c.charCodeAt(0);
                if (nb < 57) col += nb - 48;else {
                  ++col;
                  var role = c.toLowerCase();
                  pieces[util_1.pos2key([col, row])] = {
                    role: roles[role],
                    color: c === role ? 'black' : 'white'
                  };
                }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return pieces;
      }

      exports.read = read;

      function write(pieces) {
        return util_1.invRanks.map(function (y) {
          return cg.ranks.map(function (x) {
            var piece = pieces[util_1.pos2key([x, y])];

            if (piece) {
              var letter = letters[piece.role];
              return piece.color === 'white' ? letter.toUpperCase() : letter;
            } else return '1';
          }).join('');
        }).join('/').replace(/1{2,}/g, function (s) {
          return s.length.toString();
        });
      }

      exports.write = write;
    }, {
      "./types": 17,
      "./util": 18
    }],
    12: [function (require, module, exports) {
      module.exports = require("./chessground").Chessground;
    }, {
      "./chessground": 4
    }],
    13: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util = require("./util");

      function diff(a, b) {
        return Math.abs(a - b);
      }

      function pawn(color) {
        return function (x1, y1, x2, y2) {
          return diff(x1, x2) < 2 && (color === 'white' ? y2 === y1 + 1 || y1 <= 2 && y2 === y1 + 2 && x1 === x2 : y2 === y1 - 1 || y1 >= 7 && y2 === y1 - 2 && x1 === x2);
        };
      }

      var knight = function knight(x1, y1, x2, y2) {
        var xd = diff(x1, x2);
        var yd = diff(y1, y2);
        return xd === 1 && yd === 2 || xd === 2 && yd === 1;
      };

      var bishop = function bishop(x1, y1, x2, y2) {
        return diff(x1, x2) === diff(y1, y2);
      };

      var rook = function rook(x1, y1, x2, y2) {
        return x1 === x2 || y1 === y2;
      };

      var queen = function queen(x1, y1, x2, y2) {
        return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2);
      };

      function king(color, rookFiles, canCastle) {
        return function (x1, y1, x2, y2) {
          return diff(x1, x2) < 2 && diff(y1, y2) < 2 || canCastle && y1 === y2 && y1 === (color === 'white' ? 1 : 8) && (x1 === 5 && (util.containsX(rookFiles, 1) && x2 === 3 || util.containsX(rookFiles, 8) && x2 === 7) || util.containsX(rookFiles, x2));
        };
      }

      function rookFilesOf(pieces, color) {
        var backrank = color == 'white' ? '1' : '8';
        return Object.keys(pieces).filter(function (key) {
          var piece = pieces[key];
          return key[1] === backrank && piece && piece.color === color && piece.role === 'rook';
        }).map(function (key) {
          return util.key2pos(key)[0];
        });
      }

      var allPos = util.allKeys.map(util.key2pos);

      function premove(pieces, key, canCastle) {
        var piece = pieces[key],
            pos = util.key2pos(key),
            r = piece.role,
            mobility = r === 'pawn' ? pawn(piece.color) : r === 'knight' ? knight : r === 'bishop' ? bishop : r === 'rook' ? rook : r === 'queen' ? queen : king(piece.color, rookFilesOf(pieces, piece.color), canCastle);
        return allPos.filter(function (pos2) {
          return (pos[0] !== pos2[0] || pos[1] !== pos2[1]) && mobility(pos[0], pos[1], pos2[0], pos2[1]);
        }).map(util.pos2key);
      }

      exports.default = premove;
      ;
    }, {
      "./util": 18
    }],
    14: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util_1 = require("./util");

      var board_1 = require("./board");

      var util = require("./util");

      function render(s) {
        var asWhite = board_1.whitePov(s),
            posToTranslate = s.dom.relative ? util.posToTranslateRel : util.posToTranslateAbs(s.dom.bounds()),
            translate = s.dom.relative ? util.translateRel : util.translateAbs,
            boardEl = s.dom.elements.board,
            pieces = s.pieces,
            curAnim = s.animation.current,
            anims = curAnim ? curAnim.plan.anims : {},
            fadings = curAnim ? curAnim.plan.fadings : {},
            curDrag = s.draggable.current,
            squares = computeSquareClasses(s),
            samePieces = {},
            sameSquares = {},
            movedPieces = {},
            movedSquares = {},
            piecesKeys = Object.keys(pieces);
        var k, p, el, pieceAtKey, elPieceName, anim, fading, pMvdset, pMvd, sMvdset, sMvd;
        el = boardEl.firstChild;

        while (el) {
          k = el.cgKey;

          if (isPieceNode(el)) {
            pieceAtKey = pieces[k];
            anim = anims[k];
            fading = fadings[k];
            elPieceName = el.cgPiece;

            if (el.cgDragging && (!curDrag || curDrag.orig !== k)) {
              el.classList.remove('dragging');
              translate(el, posToTranslate(util_1.key2pos(k), asWhite));
              el.cgDragging = false;
            }

            if (!fading && el.cgFading) {
              el.cgFading = false;
              el.classList.remove('fading');
            }

            if (pieceAtKey) {
              if (anim && el.cgAnimating && elPieceName === pieceNameOf(pieceAtKey)) {
                var pos = util_1.key2pos(k);
                pos[0] += anim[2];
                pos[1] += anim[3];
                el.classList.add('anim');
                translate(el, posToTranslate(pos, asWhite));
              } else if (el.cgAnimating) {
                el.cgAnimating = false;
                el.classList.remove('anim');
                translate(el, posToTranslate(util_1.key2pos(k), asWhite));
                if (s.addPieceZIndex) el.style.zIndex = posZIndex(util_1.key2pos(k), asWhite);
              }

              if (elPieceName === pieceNameOf(pieceAtKey) && (!fading || !el.cgFading)) {
                samePieces[k] = true;
              } else {
                if (fading && elPieceName === pieceNameOf(fading)) {
                  el.classList.add('fading');
                  el.cgFading = true;
                } else {
                  if (movedPieces[elPieceName]) movedPieces[elPieceName].push(el);else movedPieces[elPieceName] = [el];
                }
              }
            } else {
              if (movedPieces[elPieceName]) movedPieces[elPieceName].push(el);else movedPieces[elPieceName] = [el];
            }
          } else if (isSquareNode(el)) {
            var cn = el.className;
            if (squares[k] === cn) sameSquares[k] = true;else if (movedSquares[cn]) movedSquares[cn].push(el);else movedSquares[cn] = [el];
          }

          el = el.nextSibling;
        }

        for (var sk in squares) {
          if (!sameSquares[sk]) {
            sMvdset = movedSquares[squares[sk]];
            sMvd = sMvdset && sMvdset.pop();
            var translation = posToTranslate(util_1.key2pos(sk), asWhite);

            if (sMvd) {
              sMvd.cgKey = sk;
              translate(sMvd, translation);
            } else {
              var squareNode = util_1.createEl('square', squares[sk]);
              squareNode.cgKey = sk;
              translate(squareNode, translation);
              boardEl.insertBefore(squareNode, boardEl.firstChild);
            }
          }
        }

        for (var j in piecesKeys) {
          k = piecesKeys[j];
          p = pieces[k];
          anim = anims[k];

          if (!samePieces[k]) {
            pMvdset = movedPieces[pieceNameOf(p)];
            pMvd = pMvdset && pMvdset.pop();

            if (pMvd) {
              pMvd.cgKey = k;

              if (pMvd.cgFading) {
                pMvd.classList.remove('fading');
                pMvd.cgFading = false;
              }

              var _pos = util_1.key2pos(k);

              if (s.addPieceZIndex) pMvd.style.zIndex = posZIndex(_pos, asWhite);

              if (anim) {
                pMvd.cgAnimating = true;
                pMvd.classList.add('anim');
                _pos[0] += anim[2];
                _pos[1] += anim[3];
              }

              translate(pMvd, posToTranslate(_pos, asWhite));
            } else {
              var pieceName = pieceNameOf(p),
                  pieceNode = util_1.createEl('piece', pieceName),
                  _pos2 = util_1.key2pos(k);

              pieceNode.cgPiece = pieceName;
              pieceNode.cgKey = k;

              if (anim) {
                pieceNode.cgAnimating = true;
                _pos2[0] += anim[2];
                _pos2[1] += anim[3];
              }

              translate(pieceNode, posToTranslate(_pos2, asWhite));
              if (s.addPieceZIndex) pieceNode.style.zIndex = posZIndex(_pos2, asWhite);
              boardEl.appendChild(pieceNode);
            }
          }
        }

        for (var i in movedPieces) {
          removeNodes(s, movedPieces[i]);
        }

        for (var _i in movedSquares) {
          removeNodes(s, movedSquares[_i]);
        }
      }

      exports.default = render;

      function isPieceNode(el) {
        return el.tagName === 'PIECE';
      }

      function isSquareNode(el) {
        return el.tagName === 'SQUARE';
      }

      function removeNodes(s, nodes) {
        for (var i in nodes) {
          s.dom.elements.board.removeChild(nodes[i]);
        }
      }

      function posZIndex(pos, asWhite) {
        var z = 2 + (pos[1] - 1) * 8 + (8 - pos[0]);
        if (asWhite) z = 67 - z;
        return z + '';
      }

      function pieceNameOf(piece) {
        return "".concat(piece.color, " ").concat(piece.role);
      }

      function computeSquareClasses(s) {
        var squares = {};
        var i, k;
        if (s.lastMove && s.highlight.lastMove) for (i in s.lastMove) {
          addSquare(squares, s.lastMove[i], 'last-move');
        }
        if (s.check && s.highlight.check) addSquare(squares, s.check, 'check');

        if (s.selected) {
          addSquare(squares, s.selected, 'selected');

          if (s.movable.showDests) {
            var dests = s.movable.dests && s.movable.dests[s.selected];
            if (dests) for (i in dests) {
              k = dests[i];
              addSquare(squares, k, 'move-dest' + (s.pieces[k] ? ' oc' : ''));
            }
            var pDests = s.premovable.dests;
            if (pDests) for (i in pDests) {
              k = pDests[i];
              addSquare(squares, k, 'premove-dest' + (s.pieces[k] ? ' oc' : ''));
            }
          }
        }

        var premove = s.premovable.current;
        if (premove) for (i in premove) {
          addSquare(squares, premove[i], 'current-premove');
        } else if (s.predroppable.current) addSquare(squares, s.predroppable.current.key, 'current-premove');
        var o = s.exploding;
        if (o) for (i in o.keys) {
          addSquare(squares, o.keys[i], 'exploding' + o.stage);
        }
        return squares;
      }

      function addSquare(squares, key, klass) {
        if (squares[key]) squares[key] += ' ' + klass;else squares[key] = klass;
      }
    }, {
      "./board": 3,
      "./util": 18
    }],
    15: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var fen = require("./fen");

      var util_1 = require("./util");

      function defaults() {
        return {
          pieces: fen.read(fen.initial),
          orientation: 'white',
          turnColor: 'white',
          coordinates: true,
          autoCastle: true,
          viewOnly: false,
          disableContextMenu: false,
          resizable: true,
          addPieceZIndex: false,
          pieceKey: false,
          highlight: {
            lastMove: true,
            check: true
          },
          animation: {
            enabled: true,
            duration: 200
          },
          movable: {
            free: true,
            color: 'both',
            showDests: true,
            events: {},
            rookCastle: true
          },
          premovable: {
            enabled: true,
            showDests: true,
            castle: true,
            events: {}
          },
          predroppable: {
            enabled: false,
            events: {}
          },
          draggable: {
            enabled: true,
            distance: 3,
            autoDistance: true,
            centerPiece: true,
            showGhost: true,
            deleteOnDropOff: false
          },
          dropmode: {
            active: false
          },
          selectable: {
            enabled: true
          },
          stats: {
            dragged: !('ontouchstart' in window)
          },
          events: {},
          drawable: {
            enabled: true,
            visible: true,
            eraseOnClick: true,
            shapes: [],
            autoShapes: [],
            brushes: {
              green: {
                key: 'g',
                color: '#15781B',
                opacity: 1,
                lineWidth: 10
              },
              red: {
                key: 'r',
                color: '#882020',
                opacity: 1,
                lineWidth: 10
              },
              blue: {
                key: 'b',
                color: '#003088',
                opacity: 1,
                lineWidth: 10
              },
              yellow: {
                key: 'y',
                color: '#e68f00',
                opacity: 1,
                lineWidth: 10
              },
              paleBlue: {
                key: 'pb',
                color: '#003088',
                opacity: 0.4,
                lineWidth: 15
              },
              paleGreen: {
                key: 'pg',
                color: '#15781B',
                opacity: 0.4,
                lineWidth: 15
              },
              paleRed: {
                key: 'pr',
                color: '#882020',
                opacity: 0.4,
                lineWidth: 15
              },
              paleGrey: {
                key: 'pgr',
                color: '#4a4a4a',
                opacity: 0.35,
                lineWidth: 15
              }
            },
            pieces: {
              baseUrl: 'https://lichess1.org/assets/piece/cburnett/'
            },
            prevSvgHash: ''
          },
          hold: util_1.timer()
        };
      }

      exports.defaults = defaults;
    }, {
      "./fen": 11,
      "./util": 18
    }],
    16: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util_1 = require("./util");

      function createElement(tagName) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
      }

      exports.createElement = createElement;

      function renderSvg(state, root) {
        var d = state.drawable,
            curD = d.current,
            cur = curD && curD.mouseSq ? curD : undefined,
            arrowDests = {};
        d.shapes.concat(d.autoShapes).concat(cur ? [cur] : []).forEach(function (s) {
          if (s.dest) arrowDests[s.dest] = (arrowDests[s.dest] || 0) + 1;
        });
        var shapes = d.shapes.concat(d.autoShapes).map(function (s) {
          return {
            shape: s,
            current: false,
            hash: shapeHash(s, arrowDests, false)
          };
        });
        if (cur) shapes.push({
          shape: cur,
          current: true,
          hash: shapeHash(cur, arrowDests, true)
        });
        var fullHash = shapes.map(function (sc) {
          return sc.hash;
        }).join('');
        if (fullHash === state.drawable.prevSvgHash) return;
        state.drawable.prevSvgHash = fullHash;
        var defsEl = root.firstChild;
        syncDefs(d, shapes, defsEl);
        syncShapes(state, shapes, d.brushes, arrowDests, root, defsEl);
      }

      exports.renderSvg = renderSvg;

      function syncDefs(d, shapes, defsEl) {
        var brushes = {};
        var brush;
        shapes.forEach(function (s) {
          if (s.shape.dest) {
            brush = d.brushes[s.shape.brush];
            if (s.shape.modifiers) brush = makeCustomBrush(brush, s.shape.modifiers);
            brushes[brush.key] = brush;
          }
        });
        var keysInDom = {};
        var el = defsEl.firstChild;

        while (el) {
          keysInDom[el.getAttribute('cgKey')] = true;
          el = el.nextSibling;
        }

        for (var key in brushes) {
          if (!keysInDom[key]) defsEl.appendChild(renderMarker(brushes[key]));
        }
      }

      function syncShapes(state, shapes, brushes, arrowDests, root, defsEl) {
        var bounds = state.dom.bounds(),
            hashesInDom = {},
            toRemove = [];
        shapes.forEach(function (sc) {
          hashesInDom[sc.hash] = false;
        });
        var el = defsEl.nextSibling,
            elHash;

        while (el) {
          elHash = el.getAttribute('cgHash');
          if (hashesInDom.hasOwnProperty(elHash)) hashesInDom[elHash] = true;else toRemove.push(el);
          el = el.nextSibling;
        }

        toRemove.forEach(function (el) {
          return root.removeChild(el);
        });
        shapes.forEach(function (sc) {
          if (!hashesInDom[sc.hash]) root.appendChild(renderShape(state, sc, brushes, arrowDests, bounds));
        });
      }

      function shapeHash(_ref, arrowDests, current) {
        var orig = _ref.orig,
            dest = _ref.dest,
            brush = _ref.brush,
            piece = _ref.piece,
            modifiers = _ref.modifiers;
        return [current, orig, dest, brush, dest && arrowDests[dest] > 1, piece && pieceHash(piece), modifiers && modifiersHash(modifiers)].filter(function (x) {
          return x;
        }).join('');
      }

      function pieceHash(piece) {
        return [piece.color, piece.role, piece.scale].filter(function (x) {
          return x;
        }).join('');
      }

      function modifiersHash(m) {
        return '' + (m.lineWidth || '');
      }

      function renderShape(state, _ref2, brushes, arrowDests, bounds) {
        var shape = _ref2.shape,
            current = _ref2.current,
            hash = _ref2.hash;
        var el;
        if (shape.piece) el = renderPiece(state.drawable.pieces.baseUrl, orient(util_1.key2pos(shape.orig), state.orientation), shape.piece, bounds);else {
          var orig = orient(util_1.key2pos(shape.orig), state.orientation);

          if (shape.orig && shape.dest) {
            var brush = brushes[shape.brush];
            if (shape.modifiers) brush = makeCustomBrush(brush, shape.modifiers);
            el = renderArrow(brush, orig, orient(util_1.key2pos(shape.dest), state.orientation), current, arrowDests[shape.dest] > 1, bounds);
          } else el = renderCircle(brushes[shape.brush], orig, current, bounds);
        }
        el.setAttribute('cgHash', hash);
        return el;
      }

      function renderCircle(brush, pos, current, bounds) {
        var o = pos2px(pos, bounds),
            widths = circleWidth(bounds),
            radius = (bounds.width + bounds.height) / 32;
        return setAttributes(createElement('circle'), {
          stroke: brush.color,
          'stroke-width': widths[current ? 0 : 1],
          fill: 'none',
          opacity: opacity(brush, current),
          cx: o[0],
          cy: o[1],
          r: radius - widths[1] / 2
        });
      }

      function renderArrow(brush, orig, dest, current, shorten, bounds) {
        var m = arrowMargin(bounds, shorten && !current),
            a = pos2px(orig, bounds),
            b = pos2px(dest, bounds),
            dx = b[0] - a[0],
            dy = b[1] - a[1],
            angle = Math.atan2(dy, dx),
            xo = Math.cos(angle) * m,
            yo = Math.sin(angle) * m;
        return setAttributes(createElement('line'), {
          stroke: brush.color,
          'stroke-width': lineWidth(brush, current, bounds),
          'stroke-linecap': 'round',
          'marker-end': 'url(#arrowhead-' + brush.key + ')',
          opacity: opacity(brush, current),
          x1: a[0],
          y1: a[1],
          x2: b[0] - xo,
          y2: b[1] - yo
        });
      }

      function renderPiece(baseUrl, pos, piece, bounds) {
        var o = pos2px(pos, bounds),
            size = bounds.width / 8 * (piece.scale || 1),
            name = piece.color[0] + (piece.role === 'knight' ? 'n' : piece.role[0]).toUpperCase();
        return setAttributes(createElement('image'), {
          className: "".concat(piece.role, " ").concat(piece.color),
          x: o[0] - size / 2,
          y: o[1] - size / 2,
          width: size,
          height: size,
          href: baseUrl + name + '.svg'
        });
      }

      function renderMarker(brush) {
        var marker = setAttributes(createElement('marker'), {
          id: 'arrowhead-' + brush.key,
          orient: 'auto',
          markerWidth: 4,
          markerHeight: 8,
          refX: 2.05,
          refY: 2.01
        });
        marker.appendChild(setAttributes(createElement('path'), {
          d: 'M0,0 V4 L3,2 Z',
          fill: brush.color
        }));
        marker.setAttribute('cgKey', brush.key);
        return marker;
      }

      function setAttributes(el, attrs) {
        for (var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }

        return el;
      }

      function orient(pos, color) {
        return color === 'white' ? pos : [9 - pos[0], 9 - pos[1]];
      }

      function makeCustomBrush(base, modifiers) {
        var brush = {
          color: base.color,
          opacity: Math.round(base.opacity * 10) / 10,
          lineWidth: Math.round(modifiers.lineWidth || base.lineWidth)
        };
        brush.key = [base.key, modifiers.lineWidth].filter(function (x) {
          return x;
        }).join('');
        return brush;
      }

      function circleWidth(bounds) {
        var base = bounds.width / 512;
        return [3 * base, 4 * base];
      }

      function lineWidth(brush, current, bounds) {
        return (brush.lineWidth || 10) * (current ? 0.85 : 1) / 512 * bounds.width;
      }

      function opacity(brush, current) {
        return (brush.opacity || 1) * (current ? 0.9 : 1);
      }

      function arrowMargin(bounds, shorten) {
        return (shorten ? 20 : 10) / 512 * bounds.width;
      }

      function pos2px(pos, bounds) {
        return [(pos[0] - 0.5) * bounds.width / 8, (8.5 - pos[1]) * bounds.height / 8];
      }
    }, {
      "./util": 18
    }],
    17: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      exports.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    }, {}],
    18: [function (require, module, exports) {
      "use strict";

      var _Array$prototype;

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var cg = require("./types");

      exports.colors = ['white', 'black'];
      exports.invRanks = [8, 7, 6, 5, 4, 3, 2, 1];
      exports.allKeys = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, _toConsumableArray(cg.files.map(function (c) {
        return cg.ranks.map(function (r) {
          return c + r;
        });
      })));

      exports.pos2key = function (pos) {
        return exports.allKeys[8 * pos[0] + pos[1] - 9];
      };

      exports.key2pos = function (k) {
        return [k.charCodeAt(0) - 96, k.charCodeAt(1) - 48];
      };

      function memo(f) {
        var v;

        var ret = function ret() {
          if (v === undefined) v = f();
          return v;
        };

        ret.clear = function () {
          v = undefined;
        };

        return ret;
      }

      exports.memo = memo;

      exports.timer = function () {
        var startAt;
        return {
          start: function start() {
            startAt = performance.now();
          },
          cancel: function cancel() {
            startAt = undefined;
          },
          stop: function stop() {
            if (!startAt) return 0;
            var time = performance.now() - startAt;
            startAt = undefined;
            return time;
          }
        };
      };

      exports.opposite = function (c) {
        return c === 'white' ? 'black' : 'white';
      };

      function containsX(xs, x) {
        return xs !== undefined && xs.indexOf(x) !== -1;
      }

      exports.containsX = containsX;

      exports.distanceSq = function (pos1, pos2) {
        return Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2);
      };

      exports.samePiece = function (p1, p2) {
        return p1.role === p2.role && p1.color === p2.color;
      };

      var posToTranslateBase = function posToTranslateBase(pos, asWhite, xFactor, yFactor) {
        return [(asWhite ? pos[0] - 1 : 8 - pos[0]) * xFactor, (asWhite ? 8 - pos[1] : pos[1] - 1) * yFactor];
      };

      exports.posToTranslateAbs = function (bounds) {
        var xFactor = bounds.width / 8,
            yFactor = bounds.height / 8;
        return function (pos, asWhite) {
          return posToTranslateBase(pos, asWhite, xFactor, yFactor);
        };
      };

      exports.posToTranslateRel = function (pos, asWhite) {
        return posToTranslateBase(pos, asWhite, 100, 100);
      };

      exports.translateAbs = function (el, pos) {
        el.style.transform = "translate(".concat(pos[0], "px,").concat(pos[1], "px)");
      };

      exports.translateRel = function (el, percents) {
        el.style.transform = "translate(".concat(percents[0], "%,").concat(percents[1], "%)");
      };

      exports.setVisible = function (el, v) {
        el.style.visibility = v ? 'visible' : 'hidden';
      };

      exports.eventPosition = function (e) {
        if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
        if (e.touches && e.targetTouches[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
        return undefined;
      };

      exports.isRightButton = function (e) {
        return e.buttons === 2 || e.button === 2;
      };

      exports.createEl = function (tagName, className) {
        var el = document.createElement(tagName);
        if (className) el.className = className;
        return el;
      };
    }, {
      "./types": 17
    }],
    19: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var util_1 = require("./util");

      var types_1 = require("./types");

      var svg_1 = require("./svg");

      function wrap(element, s, relative) {
        element.innerHTML = '';
        element.classList.add('cg-wrap');
        util_1.colors.forEach(function (c) {
          return element.classList.toggle('orientation-' + c, s.orientation === c);
        });
        element.classList.toggle('manipulable', !s.viewOnly);
        var helper = util_1.createEl('cg-helper');
        element.appendChild(helper);
        var container = util_1.createEl('cg-container');
        helper.appendChild(container);
        var board = util_1.createEl('cg-board');
        container.appendChild(board);
        var svg;

        if (s.drawable.visible && !relative) {
          svg = svg_1.createElement('svg');
          svg.appendChild(svg_1.createElement('defs'));
          container.appendChild(svg);
        }

        if (s.coordinates) {
          var orientClass = s.orientation === 'black' ? ' black' : '';
          container.appendChild(renderCoords(types_1.ranks, 'ranks' + orientClass));
          container.appendChild(renderCoords(types_1.files, 'files' + orientClass));
        }

        var ghost;

        if (s.draggable.showGhost && !relative) {
          ghost = util_1.createEl('piece', 'ghost');
          util_1.setVisible(ghost, false);
          container.appendChild(ghost);
        }

        return {
          board: board,
          container: container,
          ghost: ghost,
          svg: svg
        };
      }

      exports.default = wrap;

      function renderCoords(elems, className) {
        var el = util_1.createEl('coords', className);
        var f;

        for (var i in elems) {
          f = util_1.createEl('coord');
          f.textContent = elems[i];
          el.appendChild(f);
        }

        return el;
      }
    }, {
      "./svg": 16,
      "./types": 17,
      "./util": 18
    }]
  }, {}, [12])(12);
});
},{}],"node_modules/pegjs/lib/utils/arrays.js":[function(require,module,exports) {
"use strict";
/* Array utilities. */

var arrays = {
  range: function (start, stop) {
    var length = stop - start,
        result = new Array(length),
        i,
        j;

    for (i = 0, j = start; i < length; i++, j++) {
      result[i] = j;
    }

    return result;
  },
  find: function (array, valueOrPredicate) {
    var length = array.length,
        i;

    if (typeof valueOrPredicate === "function") {
      for (i = 0; i < length; i++) {
        if (valueOrPredicate(array[i])) {
          return array[i];
        }
      }
    } else {
      for (i = 0; i < length; i++) {
        if (array[i] === valueOrPredicate) {
          return array[i];
        }
      }
    }
  },
  indexOf: function (array, valueOrPredicate) {
    var length = array.length,
        i;

    if (typeof valueOrPredicate === "function") {
      for (i = 0; i < length; i++) {
        if (valueOrPredicate(array[i])) {
          return i;
        }
      }
    } else {
      for (i = 0; i < length; i++) {
        if (array[i] === valueOrPredicate) {
          return i;
        }
      }
    }

    return -1;
  },
  contains: function (array, valueOrPredicate) {
    return arrays.indexOf(array, valueOrPredicate) !== -1;
  },
  each: function (array, iterator) {
    var length = array.length,
        i;

    for (i = 0; i < length; i++) {
      iterator(array[i], i);
    }
  },
  map: function (array, iterator) {
    var length = array.length,
        result = new Array(length),
        i;

    for (i = 0; i < length; i++) {
      result[i] = iterator(array[i], i);
    }

    return result;
  },
  pluck: function (array, key) {
    return arrays.map(array, function (e) {
      return e[key];
    });
  },
  every: function (array, predicate) {
    var length = array.length,
        i;

    for (i = 0; i < length; i++) {
      if (!predicate(array[i])) {
        return false;
      }
    }

    return true;
  },
  some: function (array, predicate) {
    var length = array.length,
        i;

    for (i = 0; i < length; i++) {
      if (predicate(array[i])) {
        return true;
      }
    }

    return false;
  }
};
module.exports = arrays;
},{}],"node_modules/pegjs/lib/utils/objects.js":[function(require,module,exports) {
"use strict";
/* Object utilities. */

var objects = {
  keys: function (object) {
    var result = [],
        key;

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        result.push(key);
      }
    }

    return result;
  },
  values: function (object) {
    var result = [],
        key;

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        result.push(object[key]);
      }
    }

    return result;
  },
  clone: function (object) {
    var result = {},
        key;

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = object[key];
      }
    }

    return result;
  },
  defaults: function (object, defaults) {
    var key;

    for (key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        if (!(key in object)) {
          object[key] = defaults[key];
        }
      }
    }
  }
};
module.exports = objects;
},{}],"node_modules/pegjs/lib/utils/classes.js":[function(require,module,exports) {
"use strict";
/* Class utilities */

var classes = {
  subclass: function (child, parent) {
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }
};
module.exports = classes;
},{}],"node_modules/pegjs/lib/grammar-error.js":[function(require,module,exports) {
"use strict";

var classes = require("./utils/classes");
/* Thrown when the grammar contains an error. */


function GrammarError(message, location) {
  this.name = "GrammarError";
  this.message = message;
  this.location = location;

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, GrammarError);
  }
}

classes.subclass(GrammarError, Error);
module.exports = GrammarError;
},{"./utils/classes":"node_modules/pegjs/lib/utils/classes.js"}],"node_modules/pegjs/lib/parser.js":[function(require,module,exports) {
/* eslint-env node, amd */

/* eslint no-unused-vars: 0 */

/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
"use strict";

function peg$subclass(child, parent) {
  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function (expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function (expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },
    "class": function (expectation) {
      var escapedParts = "",
          i;

      for (i = 0; i < expectation.parts.length; i++) {
        escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
      }

      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function (expectation) {
      return "any character";
    },
    end: function (expectation) {
      return "end of input";
    },
    other: function (expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return '\\x' + hex(ch);
    });
  }

  function classEscape(s) {
    return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return '\\x' + hex(ch);
    });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i,
        j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }

      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},
      peg$startRuleFunctions = {
    Grammar: peg$parseGrammar
  },
      peg$startRuleFunction = peg$parseGrammar,
      peg$c0 = function (initializer, rules) {
    return {
      type: "grammar",
      initializer: extractOptional(initializer, 0),
      rules: extractList(rules, 0),
      location: location()
    };
  },
      peg$c1 = function (code) {
    return {
      type: "initializer",
      code: code,
      location: location()
    };
  },
      peg$c2 = "=",
      peg$c3 = peg$literalExpectation("=", false),
      peg$c4 = function (name, displayName, expression) {
    return {
      type: "rule",
      name: name,
      expression: displayName !== null ? {
        type: "named",
        name: displayName[0],
        expression: expression,
        location: location()
      } : expression,
      location: location()
    };
  },
      peg$c5 = "/",
      peg$c6 = peg$literalExpectation("/", false),
      peg$c7 = function (head, tail) {
    return tail.length > 0 ? {
      type: "choice",
      alternatives: buildList(head, tail, 3),
      location: location()
    } : head;
  },
      peg$c8 = function (expression, code) {
    return code !== null ? {
      type: "action",
      expression: expression,
      code: code[1],
      location: location()
    } : expression;
  },
      peg$c9 = function (head, tail) {
    return tail.length > 0 ? {
      type: "sequence",
      elements: buildList(head, tail, 1),
      location: location()
    } : head;
  },
      peg$c10 = ":",
      peg$c11 = peg$literalExpectation(":", false),
      peg$c12 = function (label, expression) {
    return {
      type: "labeled",
      label: label,
      expression: expression,
      location: location()
    };
  },
      peg$c13 = function (operator, expression) {
    return {
      type: OPS_TO_PREFIXED_TYPES[operator],
      expression: expression,
      location: location()
    };
  },
      peg$c14 = "$",
      peg$c15 = peg$literalExpectation("$", false),
      peg$c16 = "&",
      peg$c17 = peg$literalExpectation("&", false),
      peg$c18 = "!",
      peg$c19 = peg$literalExpectation("!", false),
      peg$c20 = function (expression, operator) {
    return {
      type: OPS_TO_SUFFIXED_TYPES[operator],
      expression: expression,
      location: location()
    };
  },
      peg$c21 = "?",
      peg$c22 = peg$literalExpectation("?", false),
      peg$c23 = "*",
      peg$c24 = peg$literalExpectation("*", false),
      peg$c25 = "+",
      peg$c26 = peg$literalExpectation("+", false),
      peg$c27 = "(",
      peg$c28 = peg$literalExpectation("(", false),
      peg$c29 = ")",
      peg$c30 = peg$literalExpectation(")", false),
      peg$c31 = function (expression) {
    /*
     * The purpose of the "group" AST node is just to isolate label scope. We
     * don't need to put it around nodes that can't contain any labels or
     * nodes that already isolate label scope themselves. This leaves us with
     * "labeled" and "sequence".
     */
    return expression.type === 'labeled' || expression.type === 'sequence' ? {
      type: "group",
      expression: expression
    } : expression;
  },
      peg$c32 = function (name) {
    return {
      type: "rule_ref",
      name: name,
      location: location()
    };
  },
      peg$c33 = function (operator, code) {
    return {
      type: OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
      code: code,
      location: location()
    };
  },
      peg$c34 = peg$anyExpectation(),
      peg$c35 = peg$otherExpectation("whitespace"),
      peg$c36 = "\t",
      peg$c37 = peg$literalExpectation("\t", false),
      peg$c38 = "\x0B",
      peg$c39 = peg$literalExpectation("\x0B", false),
      peg$c40 = "\f",
      peg$c41 = peg$literalExpectation("\f", false),
      peg$c42 = " ",
      peg$c43 = peg$literalExpectation(" ", false),
      peg$c44 = "\xA0",
      peg$c45 = peg$literalExpectation("\xA0", false),
      peg$c46 = "\uFEFF",
      peg$c47 = peg$literalExpectation("\uFEFF", false),
      peg$c48 = /^[\n\r\u2028\u2029]/,
      peg$c49 = peg$classExpectation(["\n", "\r", "\u2028", "\u2029"], false, false),
      peg$c50 = peg$otherExpectation("end of line"),
      peg$c51 = "\n",
      peg$c52 = peg$literalExpectation("\n", false),
      peg$c53 = "\r\n",
      peg$c54 = peg$literalExpectation("\r\n", false),
      peg$c55 = "\r",
      peg$c56 = peg$literalExpectation("\r", false),
      peg$c57 = "\u2028",
      peg$c58 = peg$literalExpectation("\u2028", false),
      peg$c59 = "\u2029",
      peg$c60 = peg$literalExpectation("\u2029", false),
      peg$c61 = peg$otherExpectation("comment"),
      peg$c62 = "/*",
      peg$c63 = peg$literalExpectation("/*", false),
      peg$c64 = "*/",
      peg$c65 = peg$literalExpectation("*/", false),
      peg$c66 = "//",
      peg$c67 = peg$literalExpectation("//", false),
      peg$c68 = function (name) {
    return name;
  },
      peg$c69 = peg$otherExpectation("identifier"),
      peg$c70 = function (head, tail) {
    return head + tail.join("");
  },
      peg$c71 = "_",
      peg$c72 = peg$literalExpectation("_", false),
      peg$c73 = "\\",
      peg$c74 = peg$literalExpectation("\\", false),
      peg$c75 = function (sequence) {
    return sequence;
  },
      peg$c76 = "\u200C",
      peg$c77 = peg$literalExpectation("\u200C", false),
      peg$c78 = "\u200D",
      peg$c79 = peg$literalExpectation("\u200D", false),
      peg$c80 = peg$otherExpectation("literal"),
      peg$c81 = "i",
      peg$c82 = peg$literalExpectation("i", false),
      peg$c83 = function (value, ignoreCase) {
    return {
      type: "literal",
      value: value,
      ignoreCase: ignoreCase !== null,
      location: location()
    };
  },
      peg$c84 = peg$otherExpectation("string"),
      peg$c85 = "\"",
      peg$c86 = peg$literalExpectation("\"", false),
      peg$c87 = function (chars) {
    return chars.join("");
  },
      peg$c88 = "'",
      peg$c89 = peg$literalExpectation("'", false),
      peg$c90 = function () {
    return text();
  },
      peg$c91 = peg$otherExpectation("character class"),
      peg$c92 = "[",
      peg$c93 = peg$literalExpectation("[", false),
      peg$c94 = "^",
      peg$c95 = peg$literalExpectation("^", false),
      peg$c96 = "]",
      peg$c97 = peg$literalExpectation("]", false),
      peg$c98 = function (inverted, parts, ignoreCase) {
    return {
      type: "class",
      parts: filterEmptyStrings(parts),
      inverted: inverted !== null,
      ignoreCase: ignoreCase !== null,
      location: location()
    };
  },
      peg$c99 = "-",
      peg$c100 = peg$literalExpectation("-", false),
      peg$c101 = function (begin, end) {
    if (begin.charCodeAt(0) > end.charCodeAt(0)) {
      error("Invalid character range: " + text() + ".");
    }

    return [begin, end];
  },
      peg$c102 = function () {
    return "";
  },
      peg$c103 = "0",
      peg$c104 = peg$literalExpectation("0", false),
      peg$c105 = function () {
    return "\0";
  },
      peg$c106 = "b",
      peg$c107 = peg$literalExpectation("b", false),
      peg$c108 = function () {
    return "\b";
  },
      peg$c109 = "f",
      peg$c110 = peg$literalExpectation("f", false),
      peg$c111 = function () {
    return "\f";
  },
      peg$c112 = "n",
      peg$c113 = peg$literalExpectation("n", false),
      peg$c114 = function () {
    return "\n";
  },
      peg$c115 = "r",
      peg$c116 = peg$literalExpectation("r", false),
      peg$c117 = function () {
    return "\r";
  },
      peg$c118 = "t",
      peg$c119 = peg$literalExpectation("t", false),
      peg$c120 = function () {
    return "\t";
  },
      peg$c121 = "v",
      peg$c122 = peg$literalExpectation("v", false),
      peg$c123 = function () {
    return "\x0B";
  },
      peg$c124 = "x",
      peg$c125 = peg$literalExpectation("x", false),
      peg$c126 = "u",
      peg$c127 = peg$literalExpectation("u", false),
      peg$c128 = function (digits) {
    return String.fromCharCode(parseInt(digits, 16));
  },
      peg$c129 = /^[0-9]/,
      peg$c130 = peg$classExpectation([["0", "9"]], false, false),
      peg$c131 = /^[0-9a-f]/i,
      peg$c132 = peg$classExpectation([["0", "9"], ["a", "f"]], false, true),
      peg$c133 = ".",
      peg$c134 = peg$literalExpectation(".", false),
      peg$c135 = function () {
    return {
      type: "any",
      location: location()
    };
  },
      peg$c136 = peg$otherExpectation("code block"),
      peg$c137 = "{",
      peg$c138 = peg$literalExpectation("{", false),
      peg$c139 = "}",
      peg$c140 = peg$literalExpectation("}", false),
      peg$c141 = function (code) {
    return code;
  },
      peg$c142 = /^[{}]/,
      peg$c143 = peg$classExpectation(["{", "}"], false, false),
      peg$c144 = /^[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137-\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148-\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C-\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA-\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9-\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC-\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF-\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F-\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0-\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB-\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE-\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6-\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FC7\u1FD0-\u1FD3\u1FD6-\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6-\u1FF7\u210A\u210E-\u210F\u2113\u212F\u2134\u2139\u213C-\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65-\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73-\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3-\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]/,
      peg$c145 = peg$classExpectation([["a", "z"], "\xB5", ["\xDF", "\xF6"], ["\xF8", "\xFF"], "\u0101", "\u0103", "\u0105", "\u0107", "\u0109", "\u010B", "\u010D", "\u010F", "\u0111", "\u0113", "\u0115", "\u0117", "\u0119", "\u011B", "\u011D", "\u011F", "\u0121", "\u0123", "\u0125", "\u0127", "\u0129", "\u012B", "\u012D", "\u012F", "\u0131", "\u0133", "\u0135", ["\u0137", "\u0138"], "\u013A", "\u013C", "\u013E", "\u0140", "\u0142", "\u0144", "\u0146", ["\u0148", "\u0149"], "\u014B", "\u014D", "\u014F", "\u0151", "\u0153", "\u0155", "\u0157", "\u0159", "\u015B", "\u015D", "\u015F", "\u0161", "\u0163", "\u0165", "\u0167", "\u0169", "\u016B", "\u016D", "\u016F", "\u0171", "\u0173", "\u0175", "\u0177", "\u017A", "\u017C", ["\u017E", "\u0180"], "\u0183", "\u0185", "\u0188", ["\u018C", "\u018D"], "\u0192", "\u0195", ["\u0199", "\u019B"], "\u019E", "\u01A1", "\u01A3", "\u01A5", "\u01A8", ["\u01AA", "\u01AB"], "\u01AD", "\u01B0", "\u01B4", "\u01B6", ["\u01B9", "\u01BA"], ["\u01BD", "\u01BF"], "\u01C6", "\u01C9", "\u01CC", "\u01CE", "\u01D0", "\u01D2", "\u01D4", "\u01D6", "\u01D8", "\u01DA", ["\u01DC", "\u01DD"], "\u01DF", "\u01E1", "\u01E3", "\u01E5", "\u01E7", "\u01E9", "\u01EB", "\u01ED", ["\u01EF", "\u01F0"], "\u01F3", "\u01F5", "\u01F9", "\u01FB", "\u01FD", "\u01FF", "\u0201", "\u0203", "\u0205", "\u0207", "\u0209", "\u020B", "\u020D", "\u020F", "\u0211", "\u0213", "\u0215", "\u0217", "\u0219", "\u021B", "\u021D", "\u021F", "\u0221", "\u0223", "\u0225", "\u0227", "\u0229", "\u022B", "\u022D", "\u022F", "\u0231", ["\u0233", "\u0239"], "\u023C", ["\u023F", "\u0240"], "\u0242", "\u0247", "\u0249", "\u024B", "\u024D", ["\u024F", "\u0293"], ["\u0295", "\u02AF"], "\u0371", "\u0373", "\u0377", ["\u037B", "\u037D"], "\u0390", ["\u03AC", "\u03CE"], ["\u03D0", "\u03D1"], ["\u03D5", "\u03D7"], "\u03D9", "\u03DB", "\u03DD", "\u03DF", "\u03E1", "\u03E3", "\u03E5", "\u03E7", "\u03E9", "\u03EB", "\u03ED", ["\u03EF", "\u03F3"], "\u03F5", "\u03F8", ["\u03FB", "\u03FC"], ["\u0430", "\u045F"], "\u0461", "\u0463", "\u0465", "\u0467", "\u0469", "\u046B", "\u046D", "\u046F", "\u0471", "\u0473", "\u0475", "\u0477", "\u0479", "\u047B", "\u047D", "\u047F", "\u0481", "\u048B", "\u048D", "\u048F", "\u0491", "\u0493", "\u0495", "\u0497", "\u0499", "\u049B", "\u049D", "\u049F", "\u04A1", "\u04A3", "\u04A5", "\u04A7", "\u04A9", "\u04AB", "\u04AD", "\u04AF", "\u04B1", "\u04B3", "\u04B5", "\u04B7", "\u04B9", "\u04BB", "\u04BD", "\u04BF", "\u04C2", "\u04C4", "\u04C6", "\u04C8", "\u04CA", "\u04CC", ["\u04CE", "\u04CF"], "\u04D1", "\u04D3", "\u04D5", "\u04D7", "\u04D9", "\u04DB", "\u04DD", "\u04DF", "\u04E1", "\u04E3", "\u04E5", "\u04E7", "\u04E9", "\u04EB", "\u04ED", "\u04EF", "\u04F1", "\u04F3", "\u04F5", "\u04F7", "\u04F9", "\u04FB", "\u04FD", "\u04FF", "\u0501", "\u0503", "\u0505", "\u0507", "\u0509", "\u050B", "\u050D", "\u050F", "\u0511", "\u0513", "\u0515", "\u0517", "\u0519", "\u051B", "\u051D", "\u051F", "\u0521", "\u0523", "\u0525", "\u0527", "\u0529", "\u052B", "\u052D", "\u052F", ["\u0561", "\u0587"], ["\u13F8", "\u13FD"], ["\u1D00", "\u1D2B"], ["\u1D6B", "\u1D77"], ["\u1D79", "\u1D9A"], "\u1E01", "\u1E03", "\u1E05", "\u1E07", "\u1E09", "\u1E0B", "\u1E0D", "\u1E0F", "\u1E11", "\u1E13", "\u1E15", "\u1E17", "\u1E19", "\u1E1B", "\u1E1D", "\u1E1F", "\u1E21", "\u1E23", "\u1E25", "\u1E27", "\u1E29", "\u1E2B", "\u1E2D", "\u1E2F", "\u1E31", "\u1E33", "\u1E35", "\u1E37", "\u1E39", "\u1E3B", "\u1E3D", "\u1E3F", "\u1E41", "\u1E43", "\u1E45", "\u1E47", "\u1E49", "\u1E4B", "\u1E4D", "\u1E4F", "\u1E51", "\u1E53", "\u1E55", "\u1E57", "\u1E59", "\u1E5B", "\u1E5D", "\u1E5F", "\u1E61", "\u1E63", "\u1E65", "\u1E67", "\u1E69", "\u1E6B", "\u1E6D", "\u1E6F", "\u1E71", "\u1E73", "\u1E75", "\u1E77", "\u1E79", "\u1E7B", "\u1E7D", "\u1E7F", "\u1E81", "\u1E83", "\u1E85", "\u1E87", "\u1E89", "\u1E8B", "\u1E8D", "\u1E8F", "\u1E91", "\u1E93", ["\u1E95", "\u1E9D"], "\u1E9F", "\u1EA1", "\u1EA3", "\u1EA5", "\u1EA7", "\u1EA9", "\u1EAB", "\u1EAD", "\u1EAF", "\u1EB1", "\u1EB3", "\u1EB5", "\u1EB7", "\u1EB9", "\u1EBB", "\u1EBD", "\u1EBF", "\u1EC1", "\u1EC3", "\u1EC5", "\u1EC7", "\u1EC9", "\u1ECB", "\u1ECD", "\u1ECF", "\u1ED1", "\u1ED3", "\u1ED5", "\u1ED7", "\u1ED9", "\u1EDB", "\u1EDD", "\u1EDF", "\u1EE1", "\u1EE3", "\u1EE5", "\u1EE7", "\u1EE9", "\u1EEB", "\u1EED", "\u1EEF", "\u1EF1", "\u1EF3", "\u1EF5", "\u1EF7", "\u1EF9", "\u1EFB", "\u1EFD", ["\u1EFF", "\u1F07"], ["\u1F10", "\u1F15"], ["\u1F20", "\u1F27"], ["\u1F30", "\u1F37"], ["\u1F40", "\u1F45"], ["\u1F50", "\u1F57"], ["\u1F60", "\u1F67"], ["\u1F70", "\u1F7D"], ["\u1F80", "\u1F87"], ["\u1F90", "\u1F97"], ["\u1FA0", "\u1FA7"], ["\u1FB0", "\u1FB4"], ["\u1FB6", "\u1FB7"], "\u1FBE", ["\u1FC2", "\u1FC4"], ["\u1FC6", "\u1FC7"], ["\u1FD0", "\u1FD3"], ["\u1FD6", "\u1FD7"], ["\u1FE0", "\u1FE7"], ["\u1FF2", "\u1FF4"], ["\u1FF6", "\u1FF7"], "\u210A", ["\u210E", "\u210F"], "\u2113", "\u212F", "\u2134", "\u2139", ["\u213C", "\u213D"], ["\u2146", "\u2149"], "\u214E", "\u2184", ["\u2C30", "\u2C5E"], "\u2C61", ["\u2C65", "\u2C66"], "\u2C68", "\u2C6A", "\u2C6C", "\u2C71", ["\u2C73", "\u2C74"], ["\u2C76", "\u2C7B"], "\u2C81", "\u2C83", "\u2C85", "\u2C87", "\u2C89", "\u2C8B", "\u2C8D", "\u2C8F", "\u2C91", "\u2C93", "\u2C95", "\u2C97", "\u2C99", "\u2C9B", "\u2C9D", "\u2C9F", "\u2CA1", "\u2CA3", "\u2CA5", "\u2CA7", "\u2CA9", "\u2CAB", "\u2CAD", "\u2CAF", "\u2CB1", "\u2CB3", "\u2CB5", "\u2CB7", "\u2CB9", "\u2CBB", "\u2CBD", "\u2CBF", "\u2CC1", "\u2CC3", "\u2CC5", "\u2CC7", "\u2CC9", "\u2CCB", "\u2CCD", "\u2CCF", "\u2CD1", "\u2CD3", "\u2CD5", "\u2CD7", "\u2CD9", "\u2CDB", "\u2CDD", "\u2CDF", "\u2CE1", ["\u2CE3", "\u2CE4"], "\u2CEC", "\u2CEE", "\u2CF3", ["\u2D00", "\u2D25"], "\u2D27", "\u2D2D", "\uA641", "\uA643", "\uA645", "\uA647", "\uA649", "\uA64B", "\uA64D", "\uA64F", "\uA651", "\uA653", "\uA655", "\uA657", "\uA659", "\uA65B", "\uA65D", "\uA65F", "\uA661", "\uA663", "\uA665", "\uA667", "\uA669", "\uA66B", "\uA66D", "\uA681", "\uA683", "\uA685", "\uA687", "\uA689", "\uA68B", "\uA68D", "\uA68F", "\uA691", "\uA693", "\uA695", "\uA697", "\uA699", "\uA69B", "\uA723", "\uA725", "\uA727", "\uA729", "\uA72B", "\uA72D", ["\uA72F", "\uA731"], "\uA733", "\uA735", "\uA737", "\uA739", "\uA73B", "\uA73D", "\uA73F", "\uA741", "\uA743", "\uA745", "\uA747", "\uA749", "\uA74B", "\uA74D", "\uA74F", "\uA751", "\uA753", "\uA755", "\uA757", "\uA759", "\uA75B", "\uA75D", "\uA75F", "\uA761", "\uA763", "\uA765", "\uA767", "\uA769", "\uA76B", "\uA76D", "\uA76F", ["\uA771", "\uA778"], "\uA77A", "\uA77C", "\uA77F", "\uA781", "\uA783", "\uA785", "\uA787", "\uA78C", "\uA78E", "\uA791", ["\uA793", "\uA795"], "\uA797", "\uA799", "\uA79B", "\uA79D", "\uA79F", "\uA7A1", "\uA7A3", "\uA7A5", "\uA7A7", "\uA7A9", "\uA7B5", "\uA7B7", "\uA7FA", ["\uAB30", "\uAB5A"], ["\uAB60", "\uAB65"], ["\uAB70", "\uABBF"], ["\uFB00", "\uFB06"], ["\uFB13", "\uFB17"], ["\uFF41", "\uFF5A"]], false, false),
      peg$c146 = /^[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5-\u06E6\u07F4-\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C-\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D-\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C-\uA69D\uA717-\uA71F\uA770\uA788\uA7F8-\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3-\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E-\uFF9F]/,
      peg$c147 = peg$classExpectation([["\u02B0", "\u02C1"], ["\u02C6", "\u02D1"], ["\u02E0", "\u02E4"], "\u02EC", "\u02EE", "\u0374", "\u037A", "\u0559", "\u0640", ["\u06E5", "\u06E6"], ["\u07F4", "\u07F5"], "\u07FA", "\u081A", "\u0824", "\u0828", "\u0971", "\u0E46", "\u0EC6", "\u10FC", "\u17D7", "\u1843", "\u1AA7", ["\u1C78", "\u1C7D"], ["\u1D2C", "\u1D6A"], "\u1D78", ["\u1D9B", "\u1DBF"], "\u2071", "\u207F", ["\u2090", "\u209C"], ["\u2C7C", "\u2C7D"], "\u2D6F", "\u2E2F", "\u3005", ["\u3031", "\u3035"], "\u303B", ["\u309D", "\u309E"], ["\u30FC", "\u30FE"], "\uA015", ["\uA4F8", "\uA4FD"], "\uA60C", "\uA67F", ["\uA69C", "\uA69D"], ["\uA717", "\uA71F"], "\uA770", "\uA788", ["\uA7F8", "\uA7F9"], "\uA9CF", "\uA9E6", "\uAA70", "\uAADD", ["\uAAF3", "\uAAF4"], ["\uAB5C", "\uAB5F"], "\uFF70", ["\uFF9E", "\uFF9F"]], false, false),
      peg$c148 = /^[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A-\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
      peg$c149 = peg$classExpectation(["\xAA", "\xBA", "\u01BB", ["\u01C0", "\u01C3"], "\u0294", ["\u05D0", "\u05EA"], ["\u05F0", "\u05F2"], ["\u0620", "\u063F"], ["\u0641", "\u064A"], ["\u066E", "\u066F"], ["\u0671", "\u06D3"], "\u06D5", ["\u06EE", "\u06EF"], ["\u06FA", "\u06FC"], "\u06FF", "\u0710", ["\u0712", "\u072F"], ["\u074D", "\u07A5"], "\u07B1", ["\u07CA", "\u07EA"], ["\u0800", "\u0815"], ["\u0840", "\u0858"], ["\u08A0", "\u08B4"], ["\u0904", "\u0939"], "\u093D", "\u0950", ["\u0958", "\u0961"], ["\u0972", "\u0980"], ["\u0985", "\u098C"], ["\u098F", "\u0990"], ["\u0993", "\u09A8"], ["\u09AA", "\u09B0"], "\u09B2", ["\u09B6", "\u09B9"], "\u09BD", "\u09CE", ["\u09DC", "\u09DD"], ["\u09DF", "\u09E1"], ["\u09F0", "\u09F1"], ["\u0A05", "\u0A0A"], ["\u0A0F", "\u0A10"], ["\u0A13", "\u0A28"], ["\u0A2A", "\u0A30"], ["\u0A32", "\u0A33"], ["\u0A35", "\u0A36"], ["\u0A38", "\u0A39"], ["\u0A59", "\u0A5C"], "\u0A5E", ["\u0A72", "\u0A74"], ["\u0A85", "\u0A8D"], ["\u0A8F", "\u0A91"], ["\u0A93", "\u0AA8"], ["\u0AAA", "\u0AB0"], ["\u0AB2", "\u0AB3"], ["\u0AB5", "\u0AB9"], "\u0ABD", "\u0AD0", ["\u0AE0", "\u0AE1"], "\u0AF9", ["\u0B05", "\u0B0C"], ["\u0B0F", "\u0B10"], ["\u0B13", "\u0B28"], ["\u0B2A", "\u0B30"], ["\u0B32", "\u0B33"], ["\u0B35", "\u0B39"], "\u0B3D", ["\u0B5C", "\u0B5D"], ["\u0B5F", "\u0B61"], "\u0B71", "\u0B83", ["\u0B85", "\u0B8A"], ["\u0B8E", "\u0B90"], ["\u0B92", "\u0B95"], ["\u0B99", "\u0B9A"], "\u0B9C", ["\u0B9E", "\u0B9F"], ["\u0BA3", "\u0BA4"], ["\u0BA8", "\u0BAA"], ["\u0BAE", "\u0BB9"], "\u0BD0", ["\u0C05", "\u0C0C"], ["\u0C0E", "\u0C10"], ["\u0C12", "\u0C28"], ["\u0C2A", "\u0C39"], "\u0C3D", ["\u0C58", "\u0C5A"], ["\u0C60", "\u0C61"], ["\u0C85", "\u0C8C"], ["\u0C8E", "\u0C90"], ["\u0C92", "\u0CA8"], ["\u0CAA", "\u0CB3"], ["\u0CB5", "\u0CB9"], "\u0CBD", "\u0CDE", ["\u0CE0", "\u0CE1"], ["\u0CF1", "\u0CF2"], ["\u0D05", "\u0D0C"], ["\u0D0E", "\u0D10"], ["\u0D12", "\u0D3A"], "\u0D3D", "\u0D4E", ["\u0D5F", "\u0D61"], ["\u0D7A", "\u0D7F"], ["\u0D85", "\u0D96"], ["\u0D9A", "\u0DB1"], ["\u0DB3", "\u0DBB"], "\u0DBD", ["\u0DC0", "\u0DC6"], ["\u0E01", "\u0E30"], ["\u0E32", "\u0E33"], ["\u0E40", "\u0E45"], ["\u0E81", "\u0E82"], "\u0E84", ["\u0E87", "\u0E88"], "\u0E8A", "\u0E8D", ["\u0E94", "\u0E97"], ["\u0E99", "\u0E9F"], ["\u0EA1", "\u0EA3"], "\u0EA5", "\u0EA7", ["\u0EAA", "\u0EAB"], ["\u0EAD", "\u0EB0"], ["\u0EB2", "\u0EB3"], "\u0EBD", ["\u0EC0", "\u0EC4"], ["\u0EDC", "\u0EDF"], "\u0F00", ["\u0F40", "\u0F47"], ["\u0F49", "\u0F6C"], ["\u0F88", "\u0F8C"], ["\u1000", "\u102A"], "\u103F", ["\u1050", "\u1055"], ["\u105A", "\u105D"], "\u1061", ["\u1065", "\u1066"], ["\u106E", "\u1070"], ["\u1075", "\u1081"], "\u108E", ["\u10D0", "\u10FA"], ["\u10FD", "\u1248"], ["\u124A", "\u124D"], ["\u1250", "\u1256"], "\u1258", ["\u125A", "\u125D"], ["\u1260", "\u1288"], ["\u128A", "\u128D"], ["\u1290", "\u12B0"], ["\u12B2", "\u12B5"], ["\u12B8", "\u12BE"], "\u12C0", ["\u12C2", "\u12C5"], ["\u12C8", "\u12D6"], ["\u12D8", "\u1310"], ["\u1312", "\u1315"], ["\u1318", "\u135A"], ["\u1380", "\u138F"], ["\u1401", "\u166C"], ["\u166F", "\u167F"], ["\u1681", "\u169A"], ["\u16A0", "\u16EA"], ["\u16F1", "\u16F8"], ["\u1700", "\u170C"], ["\u170E", "\u1711"], ["\u1720", "\u1731"], ["\u1740", "\u1751"], ["\u1760", "\u176C"], ["\u176E", "\u1770"], ["\u1780", "\u17B3"], "\u17DC", ["\u1820", "\u1842"], ["\u1844", "\u1877"], ["\u1880", "\u18A8"], "\u18AA", ["\u18B0", "\u18F5"], ["\u1900", "\u191E"], ["\u1950", "\u196D"], ["\u1970", "\u1974"], ["\u1980", "\u19AB"], ["\u19B0", "\u19C9"], ["\u1A00", "\u1A16"], ["\u1A20", "\u1A54"], ["\u1B05", "\u1B33"], ["\u1B45", "\u1B4B"], ["\u1B83", "\u1BA0"], ["\u1BAE", "\u1BAF"], ["\u1BBA", "\u1BE5"], ["\u1C00", "\u1C23"], ["\u1C4D", "\u1C4F"], ["\u1C5A", "\u1C77"], ["\u1CE9", "\u1CEC"], ["\u1CEE", "\u1CF1"], ["\u1CF5", "\u1CF6"], ["\u2135", "\u2138"], ["\u2D30", "\u2D67"], ["\u2D80", "\u2D96"], ["\u2DA0", "\u2DA6"], ["\u2DA8", "\u2DAE"], ["\u2DB0", "\u2DB6"], ["\u2DB8", "\u2DBE"], ["\u2DC0", "\u2DC6"], ["\u2DC8", "\u2DCE"], ["\u2DD0", "\u2DD6"], ["\u2DD8", "\u2DDE"], "\u3006", "\u303C", ["\u3041", "\u3096"], "\u309F", ["\u30A1", "\u30FA"], "\u30FF", ["\u3105", "\u312D"], ["\u3131", "\u318E"], ["\u31A0", "\u31BA"], ["\u31F0", "\u31FF"], ["\u3400", "\u4DB5"], ["\u4E00", "\u9FD5"], ["\uA000", "\uA014"], ["\uA016", "\uA48C"], ["\uA4D0", "\uA4F7"], ["\uA500", "\uA60B"], ["\uA610", "\uA61F"], ["\uA62A", "\uA62B"], "\uA66E", ["\uA6A0", "\uA6E5"], "\uA78F", "\uA7F7", ["\uA7FB", "\uA801"], ["\uA803", "\uA805"], ["\uA807", "\uA80A"], ["\uA80C", "\uA822"], ["\uA840", "\uA873"], ["\uA882", "\uA8B3"], ["\uA8F2", "\uA8F7"], "\uA8FB", "\uA8FD", ["\uA90A", "\uA925"], ["\uA930", "\uA946"], ["\uA960", "\uA97C"], ["\uA984", "\uA9B2"], ["\uA9E0", "\uA9E4"], ["\uA9E7", "\uA9EF"], ["\uA9FA", "\uA9FE"], ["\uAA00", "\uAA28"], ["\uAA40", "\uAA42"], ["\uAA44", "\uAA4B"], ["\uAA60", "\uAA6F"], ["\uAA71", "\uAA76"], "\uAA7A", ["\uAA7E", "\uAAAF"], "\uAAB1", ["\uAAB5", "\uAAB6"], ["\uAAB9", "\uAABD"], "\uAAC0", "\uAAC2", ["\uAADB", "\uAADC"], ["\uAAE0", "\uAAEA"], "\uAAF2", ["\uAB01", "\uAB06"], ["\uAB09", "\uAB0E"], ["\uAB11", "\uAB16"], ["\uAB20", "\uAB26"], ["\uAB28", "\uAB2E"], ["\uABC0", "\uABE2"], ["\uAC00", "\uD7A3"], ["\uD7B0", "\uD7C6"], ["\uD7CB", "\uD7FB"], ["\uF900", "\uFA6D"], ["\uFA70", "\uFAD9"], "\uFB1D", ["\uFB1F", "\uFB28"], ["\uFB2A", "\uFB36"], ["\uFB38", "\uFB3C"], "\uFB3E", ["\uFB40", "\uFB41"], ["\uFB43", "\uFB44"], ["\uFB46", "\uFBB1"], ["\uFBD3", "\uFD3D"], ["\uFD50", "\uFD8F"], ["\uFD92", "\uFDC7"], ["\uFDF0", "\uFDFB"], ["\uFE70", "\uFE74"], ["\uFE76", "\uFEFC"], ["\uFF66", "\uFF6F"], ["\uFF71", "\uFF9D"], ["\uFFA0", "\uFFBE"], ["\uFFC2", "\uFFC7"], ["\uFFCA", "\uFFCF"], ["\uFFD2", "\uFFD7"], ["\uFFDA", "\uFFDC"]], false, false),
      peg$c150 = /^[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
      peg$c151 = peg$classExpectation(["\u01C5", "\u01C8", "\u01CB", "\u01F2", ["\u1F88", "\u1F8F"], ["\u1F98", "\u1F9F"], ["\u1FA8", "\u1FAF"], "\u1FBC", "\u1FCC", "\u1FFC"], false, false),
      peg$c152 = /^[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178-\u0179\u017B\u017D\u0181-\u0182\u0184\u0186-\u0187\u0189-\u018B\u018E-\u0191\u0193-\u0194\u0196-\u0198\u019C-\u019D\u019F-\u01A0\u01A2\u01A4\u01A6-\u01A7\u01A9\u01AC\u01AE-\u01AF\u01B1-\u01B3\u01B5\u01B7-\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A-\u023B\u023D-\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9-\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0-\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E-\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D-\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]/,
      peg$c153 = peg$classExpectation([["A", "Z"], ["\xC0", "\xD6"], ["\xD8", "\xDE"], "\u0100", "\u0102", "\u0104", "\u0106", "\u0108", "\u010A", "\u010C", "\u010E", "\u0110", "\u0112", "\u0114", "\u0116", "\u0118", "\u011A", "\u011C", "\u011E", "\u0120", "\u0122", "\u0124", "\u0126", "\u0128", "\u012A", "\u012C", "\u012E", "\u0130", "\u0132", "\u0134", "\u0136", "\u0139", "\u013B", "\u013D", "\u013F", "\u0141", "\u0143", "\u0145", "\u0147", "\u014A", "\u014C", "\u014E", "\u0150", "\u0152", "\u0154", "\u0156", "\u0158", "\u015A", "\u015C", "\u015E", "\u0160", "\u0162", "\u0164", "\u0166", "\u0168", "\u016A", "\u016C", "\u016E", "\u0170", "\u0172", "\u0174", "\u0176", ["\u0178", "\u0179"], "\u017B", "\u017D", ["\u0181", "\u0182"], "\u0184", ["\u0186", "\u0187"], ["\u0189", "\u018B"], ["\u018E", "\u0191"], ["\u0193", "\u0194"], ["\u0196", "\u0198"], ["\u019C", "\u019D"], ["\u019F", "\u01A0"], "\u01A2", "\u01A4", ["\u01A6", "\u01A7"], "\u01A9", "\u01AC", ["\u01AE", "\u01AF"], ["\u01B1", "\u01B3"], "\u01B5", ["\u01B7", "\u01B8"], "\u01BC", "\u01C4", "\u01C7", "\u01CA", "\u01CD", "\u01CF", "\u01D1", "\u01D3", "\u01D5", "\u01D7", "\u01D9", "\u01DB", "\u01DE", "\u01E0", "\u01E2", "\u01E4", "\u01E6", "\u01E8", "\u01EA", "\u01EC", "\u01EE", "\u01F1", "\u01F4", ["\u01F6", "\u01F8"], "\u01FA", "\u01FC", "\u01FE", "\u0200", "\u0202", "\u0204", "\u0206", "\u0208", "\u020A", "\u020C", "\u020E", "\u0210", "\u0212", "\u0214", "\u0216", "\u0218", "\u021A", "\u021C", "\u021E", "\u0220", "\u0222", "\u0224", "\u0226", "\u0228", "\u022A", "\u022C", "\u022E", "\u0230", "\u0232", ["\u023A", "\u023B"], ["\u023D", "\u023E"], "\u0241", ["\u0243", "\u0246"], "\u0248", "\u024A", "\u024C", "\u024E", "\u0370", "\u0372", "\u0376", "\u037F", "\u0386", ["\u0388", "\u038A"], "\u038C", ["\u038E", "\u038F"], ["\u0391", "\u03A1"], ["\u03A3", "\u03AB"], "\u03CF", ["\u03D2", "\u03D4"], "\u03D8", "\u03DA", "\u03DC", "\u03DE", "\u03E0", "\u03E2", "\u03E4", "\u03E6", "\u03E8", "\u03EA", "\u03EC", "\u03EE", "\u03F4", "\u03F7", ["\u03F9", "\u03FA"], ["\u03FD", "\u042F"], "\u0460", "\u0462", "\u0464", "\u0466", "\u0468", "\u046A", "\u046C", "\u046E", "\u0470", "\u0472", "\u0474", "\u0476", "\u0478", "\u047A", "\u047C", "\u047E", "\u0480", "\u048A", "\u048C", "\u048E", "\u0490", "\u0492", "\u0494", "\u0496", "\u0498", "\u049A", "\u049C", "\u049E", "\u04A0", "\u04A2", "\u04A4", "\u04A6", "\u04A8", "\u04AA", "\u04AC", "\u04AE", "\u04B0", "\u04B2", "\u04B4", "\u04B6", "\u04B8", "\u04BA", "\u04BC", "\u04BE", ["\u04C0", "\u04C1"], "\u04C3", "\u04C5", "\u04C7", "\u04C9", "\u04CB", "\u04CD", "\u04D0", "\u04D2", "\u04D4", "\u04D6", "\u04D8", "\u04DA", "\u04DC", "\u04DE", "\u04E0", "\u04E2", "\u04E4", "\u04E6", "\u04E8", "\u04EA", "\u04EC", "\u04EE", "\u04F0", "\u04F2", "\u04F4", "\u04F6", "\u04F8", "\u04FA", "\u04FC", "\u04FE", "\u0500", "\u0502", "\u0504", "\u0506", "\u0508", "\u050A", "\u050C", "\u050E", "\u0510", "\u0512", "\u0514", "\u0516", "\u0518", "\u051A", "\u051C", "\u051E", "\u0520", "\u0522", "\u0524", "\u0526", "\u0528", "\u052A", "\u052C", "\u052E", ["\u0531", "\u0556"], ["\u10A0", "\u10C5"], "\u10C7", "\u10CD", ["\u13A0", "\u13F5"], "\u1E00", "\u1E02", "\u1E04", "\u1E06", "\u1E08", "\u1E0A", "\u1E0C", "\u1E0E", "\u1E10", "\u1E12", "\u1E14", "\u1E16", "\u1E18", "\u1E1A", "\u1E1C", "\u1E1E", "\u1E20", "\u1E22", "\u1E24", "\u1E26", "\u1E28", "\u1E2A", "\u1E2C", "\u1E2E", "\u1E30", "\u1E32", "\u1E34", "\u1E36", "\u1E38", "\u1E3A", "\u1E3C", "\u1E3E", "\u1E40", "\u1E42", "\u1E44", "\u1E46", "\u1E48", "\u1E4A", "\u1E4C", "\u1E4E", "\u1E50", "\u1E52", "\u1E54", "\u1E56", "\u1E58", "\u1E5A", "\u1E5C", "\u1E5E", "\u1E60", "\u1E62", "\u1E64", "\u1E66", "\u1E68", "\u1E6A", "\u1E6C", "\u1E6E", "\u1E70", "\u1E72", "\u1E74", "\u1E76", "\u1E78", "\u1E7A", "\u1E7C", "\u1E7E", "\u1E80", "\u1E82", "\u1E84", "\u1E86", "\u1E88", "\u1E8A", "\u1E8C", "\u1E8E", "\u1E90", "\u1E92", "\u1E94", "\u1E9E", "\u1EA0", "\u1EA2", "\u1EA4", "\u1EA6", "\u1EA8", "\u1EAA", "\u1EAC", "\u1EAE", "\u1EB0", "\u1EB2", "\u1EB4", "\u1EB6", "\u1EB8", "\u1EBA", "\u1EBC", "\u1EBE", "\u1EC0", "\u1EC2", "\u1EC4", "\u1EC6", "\u1EC8", "\u1ECA", "\u1ECC", "\u1ECE", "\u1ED0", "\u1ED2", "\u1ED4", "\u1ED6", "\u1ED8", "\u1EDA", "\u1EDC", "\u1EDE", "\u1EE0", "\u1EE2", "\u1EE4", "\u1EE6", "\u1EE8", "\u1EEA", "\u1EEC", "\u1EEE", "\u1EF0", "\u1EF2", "\u1EF4", "\u1EF6", "\u1EF8", "\u1EFA", "\u1EFC", "\u1EFE", ["\u1F08", "\u1F0F"], ["\u1F18", "\u1F1D"], ["\u1F28", "\u1F2F"], ["\u1F38", "\u1F3F"], ["\u1F48", "\u1F4D"], "\u1F59", "\u1F5B", "\u1F5D", "\u1F5F", ["\u1F68", "\u1F6F"], ["\u1FB8", "\u1FBB"], ["\u1FC8", "\u1FCB"], ["\u1FD8", "\u1FDB"], ["\u1FE8", "\u1FEC"], ["\u1FF8", "\u1FFB"], "\u2102", "\u2107", ["\u210B", "\u210D"], ["\u2110", "\u2112"], "\u2115", ["\u2119", "\u211D"], "\u2124", "\u2126", "\u2128", ["\u212A", "\u212D"], ["\u2130", "\u2133"], ["\u213E", "\u213F"], "\u2145", "\u2183", ["\u2C00", "\u2C2E"], "\u2C60", ["\u2C62", "\u2C64"], "\u2C67", "\u2C69", "\u2C6B", ["\u2C6D", "\u2C70"], "\u2C72", "\u2C75", ["\u2C7E", "\u2C80"], "\u2C82", "\u2C84", "\u2C86", "\u2C88", "\u2C8A", "\u2C8C", "\u2C8E", "\u2C90", "\u2C92", "\u2C94", "\u2C96", "\u2C98", "\u2C9A", "\u2C9C", "\u2C9E", "\u2CA0", "\u2CA2", "\u2CA4", "\u2CA6", "\u2CA8", "\u2CAA", "\u2CAC", "\u2CAE", "\u2CB0", "\u2CB2", "\u2CB4", "\u2CB6", "\u2CB8", "\u2CBA", "\u2CBC", "\u2CBE", "\u2CC0", "\u2CC2", "\u2CC4", "\u2CC6", "\u2CC8", "\u2CCA", "\u2CCC", "\u2CCE", "\u2CD0", "\u2CD2", "\u2CD4", "\u2CD6", "\u2CD8", "\u2CDA", "\u2CDC", "\u2CDE", "\u2CE0", "\u2CE2", "\u2CEB", "\u2CED", "\u2CF2", "\uA640", "\uA642", "\uA644", "\uA646", "\uA648", "\uA64A", "\uA64C", "\uA64E", "\uA650", "\uA652", "\uA654", "\uA656", "\uA658", "\uA65A", "\uA65C", "\uA65E", "\uA660", "\uA662", "\uA664", "\uA666", "\uA668", "\uA66A", "\uA66C", "\uA680", "\uA682", "\uA684", "\uA686", "\uA688", "\uA68A", "\uA68C", "\uA68E", "\uA690", "\uA692", "\uA694", "\uA696", "\uA698", "\uA69A", "\uA722", "\uA724", "\uA726", "\uA728", "\uA72A", "\uA72C", "\uA72E", "\uA732", "\uA734", "\uA736", "\uA738", "\uA73A", "\uA73C", "\uA73E", "\uA740", "\uA742", "\uA744", "\uA746", "\uA748", "\uA74A", "\uA74C", "\uA74E", "\uA750", "\uA752", "\uA754", "\uA756", "\uA758", "\uA75A", "\uA75C", "\uA75E", "\uA760", "\uA762", "\uA764", "\uA766", "\uA768", "\uA76A", "\uA76C", "\uA76E", "\uA779", "\uA77B", ["\uA77D", "\uA77E"], "\uA780", "\uA782", "\uA784", "\uA786", "\uA78B", "\uA78D", "\uA790", "\uA792", "\uA796", "\uA798", "\uA79A", "\uA79C", "\uA79E", "\uA7A0", "\uA7A2", "\uA7A4", "\uA7A6", "\uA7A8", ["\uA7AA", "\uA7AD"], ["\uA7B0", "\uA7B4"], "\uA7B6", ["\uFF21", "\uFF3A"]], false, false),
      peg$c154 = /^[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0982-\u0983\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0B02-\u0B03\u0B3E\u0B40\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82-\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0D02-\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82-\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2-\u0DF3\u0F3E-\u0F3F\u0F7F\u102B-\u102C\u1031\u1038\u103B-\u103C\u1056-\u1057\u1062-\u1064\u1067-\u106D\u1083-\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7-\u17C8\u1923-\u1926\u1929-\u192B\u1930-\u1931\u1933-\u1938\u1A19-\u1A1A\u1A55\u1A57\u1A61\u1A63-\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B82\u1BA1\u1BA6-\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1C24-\u1C2B\u1C34-\u1C35\u1CE1\u1CF2-\u1CF3\u302E-\u302F\uA823-\uA824\uA827\uA880-\uA881\uA8B4-\uA8C3\uA952-\uA953\uA983\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uAA2F-\uAA30\uAA33-\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE-\uAAEF\uAAF5\uABE3-\uABE4\uABE6-\uABE7\uABE9-\uABEA\uABEC]/,
      peg$c155 = peg$classExpectation(["\u0903", "\u093B", ["\u093E", "\u0940"], ["\u0949", "\u094C"], ["\u094E", "\u094F"], ["\u0982", "\u0983"], ["\u09BE", "\u09C0"], ["\u09C7", "\u09C8"], ["\u09CB", "\u09CC"], "\u09D7", "\u0A03", ["\u0A3E", "\u0A40"], "\u0A83", ["\u0ABE", "\u0AC0"], "\u0AC9", ["\u0ACB", "\u0ACC"], ["\u0B02", "\u0B03"], "\u0B3E", "\u0B40", ["\u0B47", "\u0B48"], ["\u0B4B", "\u0B4C"], "\u0B57", ["\u0BBE", "\u0BBF"], ["\u0BC1", "\u0BC2"], ["\u0BC6", "\u0BC8"], ["\u0BCA", "\u0BCC"], "\u0BD7", ["\u0C01", "\u0C03"], ["\u0C41", "\u0C44"], ["\u0C82", "\u0C83"], "\u0CBE", ["\u0CC0", "\u0CC4"], ["\u0CC7", "\u0CC8"], ["\u0CCA", "\u0CCB"], ["\u0CD5", "\u0CD6"], ["\u0D02", "\u0D03"], ["\u0D3E", "\u0D40"], ["\u0D46", "\u0D48"], ["\u0D4A", "\u0D4C"], "\u0D57", ["\u0D82", "\u0D83"], ["\u0DCF", "\u0DD1"], ["\u0DD8", "\u0DDF"], ["\u0DF2", "\u0DF3"], ["\u0F3E", "\u0F3F"], "\u0F7F", ["\u102B", "\u102C"], "\u1031", "\u1038", ["\u103B", "\u103C"], ["\u1056", "\u1057"], ["\u1062", "\u1064"], ["\u1067", "\u106D"], ["\u1083", "\u1084"], ["\u1087", "\u108C"], "\u108F", ["\u109A", "\u109C"], "\u17B6", ["\u17BE", "\u17C5"], ["\u17C7", "\u17C8"], ["\u1923", "\u1926"], ["\u1929", "\u192B"], ["\u1930", "\u1931"], ["\u1933", "\u1938"], ["\u1A19", "\u1A1A"], "\u1A55", "\u1A57", "\u1A61", ["\u1A63", "\u1A64"], ["\u1A6D", "\u1A72"], "\u1B04", "\u1B35", "\u1B3B", ["\u1B3D", "\u1B41"], ["\u1B43", "\u1B44"], "\u1B82", "\u1BA1", ["\u1BA6", "\u1BA7"], "\u1BAA", "\u1BE7", ["\u1BEA", "\u1BEC"], "\u1BEE", ["\u1BF2", "\u1BF3"], ["\u1C24", "\u1C2B"], ["\u1C34", "\u1C35"], "\u1CE1", ["\u1CF2", "\u1CF3"], ["\u302E", "\u302F"], ["\uA823", "\uA824"], "\uA827", ["\uA880", "\uA881"], ["\uA8B4", "\uA8C3"], ["\uA952", "\uA953"], "\uA983", ["\uA9B4", "\uA9B5"], ["\uA9BA", "\uA9BB"], ["\uA9BD", "\uA9C0"], ["\uAA2F", "\uAA30"], ["\uAA33", "\uAA34"], "\uAA4D", "\uAA7B", "\uAA7D", "\uAAEB", ["\uAAEE", "\uAAEF"], "\uAAF5", ["\uABE3", "\uABE4"], ["\uABE6", "\uABE7"], ["\uABE9", "\uABEA"], "\uABEC"], false, false),
      peg$c156 = /^[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2-\u09E3\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62-\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC-\u0CCD\u0CE2-\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62-\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099-\u309A\uA66F\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA825-\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/,
      peg$c157 = peg$classExpectation([["\u0300", "\u036F"], ["\u0483", "\u0487"], ["\u0591", "\u05BD"], "\u05BF", ["\u05C1", "\u05C2"], ["\u05C4", "\u05C5"], "\u05C7", ["\u0610", "\u061A"], ["\u064B", "\u065F"], "\u0670", ["\u06D6", "\u06DC"], ["\u06DF", "\u06E4"], ["\u06E7", "\u06E8"], ["\u06EA", "\u06ED"], "\u0711", ["\u0730", "\u074A"], ["\u07A6", "\u07B0"], ["\u07EB", "\u07F3"], ["\u0816", "\u0819"], ["\u081B", "\u0823"], ["\u0825", "\u0827"], ["\u0829", "\u082D"], ["\u0859", "\u085B"], ["\u08E3", "\u0902"], "\u093A", "\u093C", ["\u0941", "\u0948"], "\u094D", ["\u0951", "\u0957"], ["\u0962", "\u0963"], "\u0981", "\u09BC", ["\u09C1", "\u09C4"], "\u09CD", ["\u09E2", "\u09E3"], ["\u0A01", "\u0A02"], "\u0A3C", ["\u0A41", "\u0A42"], ["\u0A47", "\u0A48"], ["\u0A4B", "\u0A4D"], "\u0A51", ["\u0A70", "\u0A71"], "\u0A75", ["\u0A81", "\u0A82"], "\u0ABC", ["\u0AC1", "\u0AC5"], ["\u0AC7", "\u0AC8"], "\u0ACD", ["\u0AE2", "\u0AE3"], "\u0B01", "\u0B3C", "\u0B3F", ["\u0B41", "\u0B44"], "\u0B4D", "\u0B56", ["\u0B62", "\u0B63"], "\u0B82", "\u0BC0", "\u0BCD", "\u0C00", ["\u0C3E", "\u0C40"], ["\u0C46", "\u0C48"], ["\u0C4A", "\u0C4D"], ["\u0C55", "\u0C56"], ["\u0C62", "\u0C63"], "\u0C81", "\u0CBC", "\u0CBF", "\u0CC6", ["\u0CCC", "\u0CCD"], ["\u0CE2", "\u0CE3"], "\u0D01", ["\u0D41", "\u0D44"], "\u0D4D", ["\u0D62", "\u0D63"], "\u0DCA", ["\u0DD2", "\u0DD4"], "\u0DD6", "\u0E31", ["\u0E34", "\u0E3A"], ["\u0E47", "\u0E4E"], "\u0EB1", ["\u0EB4", "\u0EB9"], ["\u0EBB", "\u0EBC"], ["\u0EC8", "\u0ECD"], ["\u0F18", "\u0F19"], "\u0F35", "\u0F37", "\u0F39", ["\u0F71", "\u0F7E"], ["\u0F80", "\u0F84"], ["\u0F86", "\u0F87"], ["\u0F8D", "\u0F97"], ["\u0F99", "\u0FBC"], "\u0FC6", ["\u102D", "\u1030"], ["\u1032", "\u1037"], ["\u1039", "\u103A"], ["\u103D", "\u103E"], ["\u1058", "\u1059"], ["\u105E", "\u1060"], ["\u1071", "\u1074"], "\u1082", ["\u1085", "\u1086"], "\u108D", "\u109D", ["\u135D", "\u135F"], ["\u1712", "\u1714"], ["\u1732", "\u1734"], ["\u1752", "\u1753"], ["\u1772", "\u1773"], ["\u17B4", "\u17B5"], ["\u17B7", "\u17BD"], "\u17C6", ["\u17C9", "\u17D3"], "\u17DD", ["\u180B", "\u180D"], "\u18A9", ["\u1920", "\u1922"], ["\u1927", "\u1928"], "\u1932", ["\u1939", "\u193B"], ["\u1A17", "\u1A18"], "\u1A1B", "\u1A56", ["\u1A58", "\u1A5E"], "\u1A60", "\u1A62", ["\u1A65", "\u1A6C"], ["\u1A73", "\u1A7C"], "\u1A7F", ["\u1AB0", "\u1ABD"], ["\u1B00", "\u1B03"], "\u1B34", ["\u1B36", "\u1B3A"], "\u1B3C", "\u1B42", ["\u1B6B", "\u1B73"], ["\u1B80", "\u1B81"], ["\u1BA2", "\u1BA5"], ["\u1BA8", "\u1BA9"], ["\u1BAB", "\u1BAD"], "\u1BE6", ["\u1BE8", "\u1BE9"], "\u1BED", ["\u1BEF", "\u1BF1"], ["\u1C2C", "\u1C33"], ["\u1C36", "\u1C37"], ["\u1CD0", "\u1CD2"], ["\u1CD4", "\u1CE0"], ["\u1CE2", "\u1CE8"], "\u1CED", "\u1CF4", ["\u1CF8", "\u1CF9"], ["\u1DC0", "\u1DF5"], ["\u1DFC", "\u1DFF"], ["\u20D0", "\u20DC"], "\u20E1", ["\u20E5", "\u20F0"], ["\u2CEF", "\u2CF1"], "\u2D7F", ["\u2DE0", "\u2DFF"], ["\u302A", "\u302D"], ["\u3099", "\u309A"], "\uA66F", ["\uA674", "\uA67D"], ["\uA69E", "\uA69F"], ["\uA6F0", "\uA6F1"], "\uA802", "\uA806", "\uA80B", ["\uA825", "\uA826"], "\uA8C4", ["\uA8E0", "\uA8F1"], ["\uA926", "\uA92D"], ["\uA947", "\uA951"], ["\uA980", "\uA982"], "\uA9B3", ["\uA9B6", "\uA9B9"], "\uA9BC", "\uA9E5", ["\uAA29", "\uAA2E"], ["\uAA31", "\uAA32"], ["\uAA35", "\uAA36"], "\uAA43", "\uAA4C", "\uAA7C", "\uAAB0", ["\uAAB2", "\uAAB4"], ["\uAAB7", "\uAAB8"], ["\uAABE", "\uAABF"], "\uAAC1", ["\uAAEC", "\uAAED"], "\uAAF6", "\uABE5", "\uABE8", "\uABED", "\uFB1E", ["\uFE00", "\uFE0F"], ["\uFE20", "\uFE2F"]], false, false),
      peg$c158 = /^[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/,
      peg$c159 = peg$classExpectation([["0", "9"], ["\u0660", "\u0669"], ["\u06F0", "\u06F9"], ["\u07C0", "\u07C9"], ["\u0966", "\u096F"], ["\u09E6", "\u09EF"], ["\u0A66", "\u0A6F"], ["\u0AE6", "\u0AEF"], ["\u0B66", "\u0B6F"], ["\u0BE6", "\u0BEF"], ["\u0C66", "\u0C6F"], ["\u0CE6", "\u0CEF"], ["\u0D66", "\u0D6F"], ["\u0DE6", "\u0DEF"], ["\u0E50", "\u0E59"], ["\u0ED0", "\u0ED9"], ["\u0F20", "\u0F29"], ["\u1040", "\u1049"], ["\u1090", "\u1099"], ["\u17E0", "\u17E9"], ["\u1810", "\u1819"], ["\u1946", "\u194F"], ["\u19D0", "\u19D9"], ["\u1A80", "\u1A89"], ["\u1A90", "\u1A99"], ["\u1B50", "\u1B59"], ["\u1BB0", "\u1BB9"], ["\u1C40", "\u1C49"], ["\u1C50", "\u1C59"], ["\uA620", "\uA629"], ["\uA8D0", "\uA8D9"], ["\uA900", "\uA909"], ["\uA9D0", "\uA9D9"], ["\uA9F0", "\uA9F9"], ["\uAA50", "\uAA59"], ["\uABF0", "\uABF9"], ["\uFF10", "\uFF19"]], false, false),
      peg$c160 = /^[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]/,
      peg$c161 = peg$classExpectation([["\u16EE", "\u16F0"], ["\u2160", "\u2182"], ["\u2185", "\u2188"], "\u3007", ["\u3021", "\u3029"], ["\u3038", "\u303A"], ["\uA6E6", "\uA6EF"]], false, false),
      peg$c162 = /^[_\u203F-\u2040\u2054\uFE33-\uFE34\uFE4D-\uFE4F\uFF3F]/,
      peg$c163 = peg$classExpectation(["_", ["\u203F", "\u2040"], "\u2054", ["\uFE33", "\uFE34"], ["\uFE4D", "\uFE4F"], "\uFF3F"], false, false),
      peg$c164 = /^[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
      peg$c165 = peg$classExpectation([" ", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u202F", "\u205F", "\u3000"], false, false),
      peg$c166 = "break",
      peg$c167 = peg$literalExpectation("break", false),
      peg$c168 = "case",
      peg$c169 = peg$literalExpectation("case", false),
      peg$c170 = "catch",
      peg$c171 = peg$literalExpectation("catch", false),
      peg$c172 = "class",
      peg$c173 = peg$literalExpectation("class", false),
      peg$c174 = "const",
      peg$c175 = peg$literalExpectation("const", false),
      peg$c176 = "continue",
      peg$c177 = peg$literalExpectation("continue", false),
      peg$c178 = "debugger",
      peg$c179 = peg$literalExpectation("debugger", false),
      peg$c180 = "default",
      peg$c181 = peg$literalExpectation("default", false),
      peg$c182 = "delete",
      peg$c183 = peg$literalExpectation("delete", false),
      peg$c184 = "do",
      peg$c185 = peg$literalExpectation("do", false),
      peg$c186 = "else",
      peg$c187 = peg$literalExpectation("else", false),
      peg$c188 = "enum",
      peg$c189 = peg$literalExpectation("enum", false),
      peg$c190 = "export",
      peg$c191 = peg$literalExpectation("export", false),
      peg$c192 = "extends",
      peg$c193 = peg$literalExpectation("extends", false),
      peg$c194 = "false",
      peg$c195 = peg$literalExpectation("false", false),
      peg$c196 = "finally",
      peg$c197 = peg$literalExpectation("finally", false),
      peg$c198 = "for",
      peg$c199 = peg$literalExpectation("for", false),
      peg$c200 = "function",
      peg$c201 = peg$literalExpectation("function", false),
      peg$c202 = "if",
      peg$c203 = peg$literalExpectation("if", false),
      peg$c204 = "import",
      peg$c205 = peg$literalExpectation("import", false),
      peg$c206 = "instanceof",
      peg$c207 = peg$literalExpectation("instanceof", false),
      peg$c208 = "in",
      peg$c209 = peg$literalExpectation("in", false),
      peg$c210 = "new",
      peg$c211 = peg$literalExpectation("new", false),
      peg$c212 = "null",
      peg$c213 = peg$literalExpectation("null", false),
      peg$c214 = "return",
      peg$c215 = peg$literalExpectation("return", false),
      peg$c216 = "super",
      peg$c217 = peg$literalExpectation("super", false),
      peg$c218 = "switch",
      peg$c219 = peg$literalExpectation("switch", false),
      peg$c220 = "this",
      peg$c221 = peg$literalExpectation("this", false),
      peg$c222 = "throw",
      peg$c223 = peg$literalExpectation("throw", false),
      peg$c224 = "true",
      peg$c225 = peg$literalExpectation("true", false),
      peg$c226 = "try",
      peg$c227 = peg$literalExpectation("try", false),
      peg$c228 = "typeof",
      peg$c229 = peg$literalExpectation("typeof", false),
      peg$c230 = "var",
      peg$c231 = peg$literalExpectation("var", false),
      peg$c232 = "void",
      peg$c233 = peg$literalExpectation("void", false),
      peg$c234 = "while",
      peg$c235 = peg$literalExpectation("while", false),
      peg$c236 = "with",
      peg$c237 = peg$literalExpectation("with", false),
      peg$c238 = ";",
      peg$c239 = peg$literalExpectation(";", false),
      peg$currPos = 0,
      peg$savedPos = 0,
      peg$posDetailsCache = [{
    line: 1,
    column: 1
  }],
      peg$maxFailPos = 0,
      peg$maxFailExpected = [],
      peg$silentFails = 0,
      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return {
      type: "literal",
      text: text,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$anyExpectation() {
    return {
      type: "any"
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$otherExpectation(description) {
    return {
      type: "other",
      description: description
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos],
        p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
  }

  function peg$parseGrammar() {
    var s0, s1, s2, s3, s4, s5, s6;
    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parseInitializer();

      if (s3 !== peg$FAILED) {
        s4 = peg$parse__();

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$parseRule();

        if (s5 !== peg$FAILED) {
          s6 = peg$parse__();

          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parseRule();

            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();

              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseInitializer() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parseCodeBlock();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseEOS();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseRule() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parseIdentifierName();

    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();

      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parseStringLiteral();

        if (s4 !== peg$FAILED) {
          s5 = peg$parse__();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s4 = peg$c2;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c3);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse__();

            if (s5 !== peg$FAILED) {
              s6 = peg$parseChoiceExpression();

              if (s6 !== peg$FAILED) {
                s7 = peg$parseEOS();

                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c4(s1, s3, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseChoiceExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parseActionExpression();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse__();

      if (s4 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s5 = peg$c5;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s5 !== peg$FAILED) {
          s6 = peg$parse__();

          if (s6 !== peg$FAILED) {
            s7 = peg$parseActionExpression();

            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse__();

        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }

          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();

            if (s6 !== peg$FAILED) {
              s7 = peg$parseActionExpression();

              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c7(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseActionExpression() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$parseSequenceExpression();

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse__();

      if (s3 !== peg$FAILED) {
        s4 = peg$parseCodeBlock();

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c8(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSequenceExpression() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parseLabeledExpression();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse__();

      if (s4 !== peg$FAILED) {
        s5 = peg$parseLabeledExpression();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse__();

        if (s4 !== peg$FAILED) {
          s5 = peg$parseLabeledExpression();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c9(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseLabeledExpression() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parseIdentifier();

    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c10;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parse__();

          if (s4 !== peg$FAILED) {
            s5 = peg$parsePrefixedExpression();

            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c12(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parsePrefixedExpression();
    }

    return s0;
  }

  function peg$parsePrefixedExpression() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsePrefixedOperator();

    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseSuffixedExpression();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c13(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parseSuffixedExpression();
    }

    return s0;
  }

  function peg$parsePrefixedOperator() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 36) {
      s0 = peg$c14;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c15);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 38) {
        s0 = peg$c16;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c17);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 33) {
          s0 = peg$c18;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c19);
          }
        }
      }
    }

    return s0;
  }

  function peg$parseSuffixedExpression() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsePrimaryExpression();

    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseSuffixedOperator();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c20(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parsePrimaryExpression();
    }

    return s0;
  }

  function peg$parseSuffixedOperator() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 63) {
      s0 = peg$c21;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c22);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 42) {
        s0 = peg$c23;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c24);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 43) {
          s0 = peg$c25;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }
      }
    }

    return s0;
  }

  function peg$parsePrimaryExpression() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$parseLiteralMatcher();

    if (s0 === peg$FAILED) {
      s0 = peg$parseCharacterClassMatcher();

      if (s0 === peg$FAILED) {
        s0 = peg$parseAnyMatcher();

        if (s0 === peg$FAILED) {
          s0 = peg$parseRuleReferenceExpression();

          if (s0 === peg$FAILED) {
            s0 = peg$parseSemanticPredicateExpression();

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.charCodeAt(peg$currPos) === 40) {
                s1 = peg$c27;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c28);
                }
              }

              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();

                if (s2 !== peg$FAILED) {
                  s3 = peg$parseChoiceExpression();

                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();

                    if (s4 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s5 = peg$c29;
                        peg$currPos++;
                      } else {
                        s5 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c30);
                        }
                      }

                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c31(s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseRuleReferenceExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parseIdentifierName();

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$currPos;
      s4 = peg$parse__();

      if (s4 !== peg$FAILED) {
        s5 = peg$currPos;
        s6 = peg$parseStringLiteral();

        if (s6 !== peg$FAILED) {
          s7 = peg$parse__();

          if (s7 !== peg$FAILED) {
            s6 = [s6, s7];
            s5 = s6;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }

        if (s5 === peg$FAILED) {
          s5 = null;
        }

        if (s5 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s6 = peg$c2;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c3);
            }
          }

          if (s6 !== peg$FAILED) {
            s4 = [s4, s5, s6];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c32(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSemanticPredicateExpression() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parseSemanticPredicateOperator();

    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseCodeBlock();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c33(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSemanticPredicateOperator() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 38) {
      s0 = peg$c16;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c17);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 33) {
        s0 = peg$c18;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c19);
        }
      }
    }

    return s0;
  }

  function peg$parseSourceCharacter() {
    var s0;

    if (input.length > peg$currPos) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c34);
      }
    }

    return s0;
  }

  function peg$parseWhiteSpace() {
    var s0, s1;
    peg$silentFails++;

    if (input.charCodeAt(peg$currPos) === 9) {
      s0 = peg$c36;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c37);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 11) {
        s0 = peg$c38;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 12) {
          s0 = peg$c40;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c41);
          }
        }

        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s0 = peg$c42;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }

          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 160) {
              s0 = peg$c44;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }

            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 65279) {
                s0 = peg$c46;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c47);
                }
              }

              if (s0 === peg$FAILED) {
                s0 = peg$parseZs();
              }
            }
          }
        }
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c35);
      }
    }

    return s0;
  }

  function peg$parseLineTerminator() {
    var s0;

    if (peg$c48.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c49);
      }
    }

    return s0;
  }

  function peg$parseLineTerminatorSequence() {
    var s0, s1;
    peg$silentFails++;

    if (input.charCodeAt(peg$currPos) === 10) {
      s0 = peg$c51;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c52);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c53) {
        s0 = peg$c53;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c54);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 13) {
          s0 = peg$c55;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c56);
          }
        }

        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 8232) {
            s0 = peg$c57;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c58);
            }
          }

          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 8233) {
              s0 = peg$c59;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c60);
              }
            }
          }
        }
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c50);
      }
    }

    return s0;
  }

  function peg$parseComment() {
    var s0, s1;
    peg$silentFails++;
    s0 = peg$parseMultiLineComment();

    if (s0 === peg$FAILED) {
      s0 = peg$parseSingleLineComment();
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c61);
      }
    }

    return s0;
  }

  function peg$parseMultiLineComment() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c62) {
      s1 = peg$c62;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c63);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;

      if (input.substr(peg$currPos, 2) === peg$c64) {
        s5 = peg$c64;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c65);
        }
      }

      peg$silentFails--;

      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseSourceCharacter();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;

        if (input.substr(peg$currPos, 2) === peg$c64) {
          s5 = peg$c64;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c65);
          }
        }

        peg$silentFails--;

        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c64) {
          s3 = peg$c64;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c65);
          }
        }

        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMultiLineCommentNoLineTerminator() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c62) {
      s1 = peg$c62;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c63);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;

      if (input.substr(peg$currPos, 2) === peg$c64) {
        s5 = peg$c64;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c65);
        }
      }

      if (s5 === peg$FAILED) {
        s5 = peg$parseLineTerminator();
      }

      peg$silentFails--;

      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseSourceCharacter();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;

        if (input.substr(peg$currPos, 2) === peg$c64) {
          s5 = peg$c64;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c65);
          }
        }

        if (s5 === peg$FAILED) {
          s5 = peg$parseLineTerminator();
        }

        peg$silentFails--;

        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c64) {
          s3 = peg$c64;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c65);
          }
        }

        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSingleLineComment() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c66) {
      s1 = peg$c66;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c67);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;
      s5 = peg$parseLineTerminator();
      peg$silentFails--;

      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseSourceCharacter();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseLineTerminator();
        peg$silentFails--;

        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseIdentifier() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = peg$parseReservedWord();
    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseIdentifierName();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c68(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseIdentifierName() {
    var s0, s1, s2, s3;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseIdentifierStart();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseIdentifierPart();

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseIdentifierPart();
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c70(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c69);
      }
    }

    return s0;
  }

  function peg$parseIdentifierStart() {
    var s0, s1, s2;
    s0 = peg$parseUnicodeLetter();

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 36) {
        s0 = peg$c14;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 95) {
          s0 = peg$c71;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c72);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c73;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c74);
            }
          }

          if (s1 !== peg$FAILED) {
            s2 = peg$parseUnicodeEscapeSequence();

            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c75(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }

    return s0;
  }

  function peg$parseIdentifierPart() {
    var s0;
    s0 = peg$parseIdentifierStart();

    if (s0 === peg$FAILED) {
      s0 = peg$parseUnicodeCombiningMark();

      if (s0 === peg$FAILED) {
        s0 = peg$parseNd();

        if (s0 === peg$FAILED) {
          s0 = peg$parsePc();

          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 8204) {
              s0 = peg$c76;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c77);
              }
            }

            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 8205) {
                s0 = peg$c78;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c79);
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseUnicodeLetter() {
    var s0;
    s0 = peg$parseLu();

    if (s0 === peg$FAILED) {
      s0 = peg$parseLl();

      if (s0 === peg$FAILED) {
        s0 = peg$parseLt();

        if (s0 === peg$FAILED) {
          s0 = peg$parseLm();

          if (s0 === peg$FAILED) {
            s0 = peg$parseLo();

            if (s0 === peg$FAILED) {
              s0 = peg$parseNl();
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseUnicodeCombiningMark() {
    var s0;
    s0 = peg$parseMn();

    if (s0 === peg$FAILED) {
      s0 = peg$parseMc();
    }

    return s0;
  }

  function peg$parseReservedWord() {
    var s0;
    s0 = peg$parseKeyword();

    if (s0 === peg$FAILED) {
      s0 = peg$parseFutureReservedWord();

      if (s0 === peg$FAILED) {
        s0 = peg$parseNullToken();

        if (s0 === peg$FAILED) {
          s0 = peg$parseBooleanLiteral();
        }
      }
    }

    return s0;
  }

  function peg$parseKeyword() {
    var s0;
    s0 = peg$parseBreakToken();

    if (s0 === peg$FAILED) {
      s0 = peg$parseCaseToken();

      if (s0 === peg$FAILED) {
        s0 = peg$parseCatchToken();

        if (s0 === peg$FAILED) {
          s0 = peg$parseContinueToken();

          if (s0 === peg$FAILED) {
            s0 = peg$parseDebuggerToken();

            if (s0 === peg$FAILED) {
              s0 = peg$parseDefaultToken();

              if (s0 === peg$FAILED) {
                s0 = peg$parseDeleteToken();

                if (s0 === peg$FAILED) {
                  s0 = peg$parseDoToken();

                  if (s0 === peg$FAILED) {
                    s0 = peg$parseElseToken();

                    if (s0 === peg$FAILED) {
                      s0 = peg$parseFinallyToken();

                      if (s0 === peg$FAILED) {
                        s0 = peg$parseForToken();

                        if (s0 === peg$FAILED) {
                          s0 = peg$parseFunctionToken();

                          if (s0 === peg$FAILED) {
                            s0 = peg$parseIfToken();

                            if (s0 === peg$FAILED) {
                              s0 = peg$parseInstanceofToken();

                              if (s0 === peg$FAILED) {
                                s0 = peg$parseInToken();

                                if (s0 === peg$FAILED) {
                                  s0 = peg$parseNewToken();

                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parseReturnToken();

                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parseSwitchToken();

                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parseThisToken();

                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parseThrowToken();

                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parseTryToken();

                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parseTypeofToken();

                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parseVarToken();

                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$parseVoidToken();

                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$parseWhileToken();

                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$parseWithToken();
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseFutureReservedWord() {
    var s0;
    s0 = peg$parseClassToken();

    if (s0 === peg$FAILED) {
      s0 = peg$parseConstToken();

      if (s0 === peg$FAILED) {
        s0 = peg$parseEnumToken();

        if (s0 === peg$FAILED) {
          s0 = peg$parseExportToken();

          if (s0 === peg$FAILED) {
            s0 = peg$parseExtendsToken();

            if (s0 === peg$FAILED) {
              s0 = peg$parseImportToken();

              if (s0 === peg$FAILED) {
                s0 = peg$parseSuperToken();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseBooleanLiteral() {
    var s0;
    s0 = peg$parseTrueToken();

    if (s0 === peg$FAILED) {
      s0 = peg$parseFalseToken();
    }

    return s0;
  }

  function peg$parseLiteralMatcher() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseStringLiteral();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 105) {
        s2 = peg$c81;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c82);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c83(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c80);
      }
    }

    return s0;
  }

  function peg$parseStringLiteral() {
    var s0, s1, s2, s3;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c85;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c86);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseDoubleStringCharacter();

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseDoubleStringCharacter();
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s3 = peg$c85;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c86);
          }
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c87(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c88;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c89);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseSingleStringCharacter();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseSingleStringCharacter();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c88;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c89);
            }
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c87(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c84);
      }
    }

    return s0;
  }

  function peg$parseDoubleStringCharacter() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;

    if (input.charCodeAt(peg$currPos) === 34) {
      s2 = peg$c85;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c86);
      }
    }

    if (s2 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 92) {
        s2 = peg$c73;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = peg$parseLineTerminator();
      }
    }

    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseSourceCharacter();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c90();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c73;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseEscapeSequence();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c75(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseLineContinuation();
      }
    }

    return s0;
  }

  function peg$parseSingleStringCharacter() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;

    if (input.charCodeAt(peg$currPos) === 39) {
      s2 = peg$c88;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c89);
      }
    }

    if (s2 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 92) {
        s2 = peg$c73;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = peg$parseLineTerminator();
      }
    }

    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseSourceCharacter();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c90();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c73;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseEscapeSequence();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c75(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseLineContinuation();
      }
    }

    return s0;
  }

  function peg$parseCharacterClassMatcher() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 91) {
      s1 = peg$c92;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c93);
      }
    }

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 94) {
        s2 = peg$c94;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c95);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseClassCharacterRange();

        if (s4 === peg$FAILED) {
          s4 = peg$parseClassCharacter();
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseClassCharacterRange();

          if (s4 === peg$FAILED) {
            s4 = peg$parseClassCharacter();
          }
        }

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s4 = peg$c96;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c97);
            }
          }

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 105) {
              s5 = peg$c81;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c82);
              }
            }

            if (s5 === peg$FAILED) {
              s5 = null;
            }

            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c98(s2, s3, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c91);
      }
    }

    return s0;
  }

  function peg$parseClassCharacterRange() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parseClassCharacter();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 45) {
        s2 = peg$c99;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c100);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parseClassCharacter();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c101(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseClassCharacter() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;

    if (input.charCodeAt(peg$currPos) === 93) {
      s2 = peg$c96;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c97);
      }
    }

    if (s2 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 92) {
        s2 = peg$c73;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = peg$parseLineTerminator();
      }
    }

    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseSourceCharacter();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c90();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c73;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseEscapeSequence();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c75(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseLineContinuation();
      }
    }

    return s0;
  }

  function peg$parseLineContinuation() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 92) {
      s1 = peg$c73;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c74);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseLineTerminatorSequence();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c102();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseEscapeSequence() {
    var s0, s1, s2, s3;
    s0 = peg$parseCharacterEscapeSequence();

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c103;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c104);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseDecimalDigit();
        peg$silentFails--;

        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c105();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseHexEscapeSequence();

        if (s0 === peg$FAILED) {
          s0 = peg$parseUnicodeEscapeSequence();
        }
      }
    }

    return s0;
  }

  function peg$parseCharacterEscapeSequence() {
    var s0;
    s0 = peg$parseSingleEscapeCharacter();

    if (s0 === peg$FAILED) {
      s0 = peg$parseNonEscapeCharacter();
    }

    return s0;
  }

  function peg$parseSingleEscapeCharacter() {
    var s0, s1;

    if (input.charCodeAt(peg$currPos) === 39) {
      s0 = peg$c88;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c89);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 34) {
        s0 = peg$c85;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c86);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 92) {
          s0 = peg$c73;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c74);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 98) {
            s1 = peg$c106;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c107);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c108();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 102) {
              s1 = peg$c109;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c110);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c111();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.charCodeAt(peg$currPos) === 110) {
                s1 = peg$c112;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c113);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c114();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 114) {
                  s1 = peg$c115;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c116);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c117();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.charCodeAt(peg$currPos) === 116) {
                    s1 = peg$c118;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c119);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c120();
                  }

                  s0 = s1;

                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;

                    if (input.charCodeAt(peg$currPos) === 118) {
                      s1 = peg$c121;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c122);
                      }
                    }

                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c123();
                    }

                    s0 = s1;
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseNonEscapeCharacter() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = peg$parseEscapeCharacter();

    if (s2 === peg$FAILED) {
      s2 = peg$parseLineTerminator();
    }

    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseSourceCharacter();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c90();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseEscapeCharacter() {
    var s0;
    s0 = peg$parseSingleEscapeCharacter();

    if (s0 === peg$FAILED) {
      s0 = peg$parseDecimalDigit();

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 120) {
          s0 = peg$c124;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c125);
          }
        }

        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 117) {
            s0 = peg$c126;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c127);
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseHexEscapeSequence() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 120) {
      s1 = peg$c124;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c125);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$currPos;
      s4 = peg$parseHexDigit();

      if (s4 !== peg$FAILED) {
        s5 = peg$parseHexDigit();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s2 = input.substring(s2, peg$currPos);
      } else {
        s2 = s3;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c128(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseUnicodeEscapeSequence() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 117) {
      s1 = peg$c126;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c127);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$currPos;
      s4 = peg$parseHexDigit();

      if (s4 !== peg$FAILED) {
        s5 = peg$parseHexDigit();

        if (s5 !== peg$FAILED) {
          s6 = peg$parseHexDigit();

          if (s6 !== peg$FAILED) {
            s7 = peg$parseHexDigit();

            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s2 = input.substring(s2, peg$currPos);
      } else {
        s2 = s3;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c128(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDecimalDigit() {
    var s0;

    if (peg$c129.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c130);
      }
    }

    return s0;
  }

  function peg$parseHexDigit() {
    var s0;

    if (peg$c131.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c132);
      }
    }

    return s0;
  }

  function peg$parseAnyMatcher() {
    var s0, s1;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 46) {
      s1 = peg$c133;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c134);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c135();
    }

    s0 = s1;
    return s0;
  }

  function peg$parseCodeBlock() {
    var s0, s1, s2, s3;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c137;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c138);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseCode();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 125) {
          s3 = peg$c139;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c140);
          }
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c141(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c136);
      }
    }

    return s0;
  }

  function peg$parseCode() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = [];
    s2 = [];
    s3 = peg$currPos;
    s4 = peg$currPos;
    peg$silentFails++;

    if (peg$c142.test(input.charAt(peg$currPos))) {
      s5 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s5 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c143);
      }
    }

    peg$silentFails--;

    if (s5 === peg$FAILED) {
      s4 = void 0;
    } else {
      peg$currPos = s4;
      s4 = peg$FAILED;
    }

    if (s4 !== peg$FAILED) {
      s5 = peg$parseSourceCharacter();

      if (s5 !== peg$FAILED) {
        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }

    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;

        if (peg$c142.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c143);
          }
        }

        peg$silentFails--;

        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
    } else {
      s2 = peg$FAILED;
    }

    if (s2 === peg$FAILED) {
      s2 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s3 = peg$c137;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c138);
        }
      }

      if (s3 !== peg$FAILED) {
        s4 = peg$parseCode();

        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s5 = peg$c139;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c140);
            }
          }

          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;

      if (peg$c142.test(input.charAt(peg$currPos))) {
        s5 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s5 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c143);
        }
      }

      peg$silentFails--;

      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseSourceCharacter();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;

          if (peg$c142.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c143);
            }
          }

          peg$silentFails--;

          if (s5 === peg$FAILED) {
            s4 = void 0;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        s2 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s3 = peg$c137;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c138);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parseCode();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c139;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c140);
              }
            }

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parseLl() {
    var s0;

    if (peg$c144.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c145);
      }
    }

    return s0;
  }

  function peg$parseLm() {
    var s0;

    if (peg$c146.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c147);
      }
    }

    return s0;
  }

  function peg$parseLo() {
    var s0;

    if (peg$c148.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c149);
      }
    }

    return s0;
  }

  function peg$parseLt() {
    var s0;

    if (peg$c150.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c151);
      }
    }

    return s0;
  }

  function peg$parseLu() {
    var s0;

    if (peg$c152.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c153);
      }
    }

    return s0;
  }

  function peg$parseMc() {
    var s0;

    if (peg$c154.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c155);
      }
    }

    return s0;
  }

  function peg$parseMn() {
    var s0;

    if (peg$c156.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c157);
      }
    }

    return s0;
  }

  function peg$parseNd() {
    var s0;

    if (peg$c158.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c159);
      }
    }

    return s0;
  }

  function peg$parseNl() {
    var s0;

    if (peg$c160.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c161);
      }
    }

    return s0;
  }

  function peg$parsePc() {
    var s0;

    if (peg$c162.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c163);
      }
    }

    return s0;
  }

  function peg$parseZs() {
    var s0;

    if (peg$c164.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c165);
      }
    }

    return s0;
  }

  function peg$parseBreakToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c166) {
      s1 = peg$c166;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c167);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCaseToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c168) {
      s1 = peg$c168;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c169);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCatchToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c170) {
      s1 = peg$c170;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c171);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseClassToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c172) {
      s1 = peg$c172;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c173);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseConstToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c174) {
      s1 = peg$c174;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c175);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseContinueToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 8) === peg$c176) {
      s1 = peg$c176;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c177);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDebuggerToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 8) === peg$c178) {
      s1 = peg$c178;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c179);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDefaultToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 7) === peg$c180) {
      s1 = peg$c180;
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c181);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDeleteToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c182) {
      s1 = peg$c182;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c183);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDoToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c184) {
      s1 = peg$c184;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c185);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseElseToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c186) {
      s1 = peg$c186;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c187);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseEnumToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c188) {
      s1 = peg$c188;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c189);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExportToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c190) {
      s1 = peg$c190;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c191);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExtendsToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 7) === peg$c192) {
      s1 = peg$c192;
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c193);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFalseToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c194) {
      s1 = peg$c194;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c195);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFinallyToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 7) === peg$c196) {
      s1 = peg$c196;
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c197);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseForToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 3) === peg$c198) {
      s1 = peg$c198;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c199);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFunctionToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 8) === peg$c200) {
      s1 = peg$c200;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c201);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseIfToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c202) {
      s1 = peg$c202;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c203);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseImportToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c204) {
      s1 = peg$c204;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c205);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseInstanceofToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 10) === peg$c206) {
      s1 = peg$c206;
      peg$currPos += 10;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c207);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseInToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c208) {
      s1 = peg$c208;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c209);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNewToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 3) === peg$c210) {
      s1 = peg$c210;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c211);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNullToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c212) {
      s1 = peg$c212;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c213);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseReturnToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c214) {
      s1 = peg$c214;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c215);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSuperToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c216) {
      s1 = peg$c216;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c217);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSwitchToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c218) {
      s1 = peg$c218;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c219);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseThisToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c220) {
      s1 = peg$c220;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c221);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseThrowToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c222) {
      s1 = peg$c222;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c223);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTrueToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c224) {
      s1 = peg$c224;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c225);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTryToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 3) === peg$c226) {
      s1 = peg$c226;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c227);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTypeofToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c228) {
      s1 = peg$c228;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c229);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVarToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 3) === peg$c230) {
      s1 = peg$c230;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c231);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVoidToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c232) {
      s1 = peg$c232;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c233);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseWhileToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c234) {
      s1 = peg$c234;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c235);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseWithToken() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c236) {
      s1 = peg$c236;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c237);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parseIdentifierPart();
      peg$silentFails--;

      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parse__() {
    var s0, s1;
    s0 = [];
    s1 = peg$parseWhiteSpace();

    if (s1 === peg$FAILED) {
      s1 = peg$parseLineTerminatorSequence();

      if (s1 === peg$FAILED) {
        s1 = peg$parseComment();
      }
    }

    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseWhiteSpace();

      if (s1 === peg$FAILED) {
        s1 = peg$parseLineTerminatorSequence();

        if (s1 === peg$FAILED) {
          s1 = peg$parseComment();
        }
      }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;
    s0 = [];
    s1 = peg$parseWhiteSpace();

    if (s1 === peg$FAILED) {
      s1 = peg$parseMultiLineCommentNoLineTerminator();
    }

    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseWhiteSpace();

      if (s1 === peg$FAILED) {
        s1 = peg$parseMultiLineCommentNoLineTerminator();
      }
    }

    return s0;
  }

  function peg$parseEOS() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 59) {
        s2 = peg$c238;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c239);
        }
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        s2 = peg$parseSingleLineComment();

        if (s2 === peg$FAILED) {
          s2 = null;
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseLineTerminatorSequence();

          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse__();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseEOF();

          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parseEOF() {
    var s0, s1;
    s0 = peg$currPos;
    peg$silentFails++;

    if (input.length > peg$currPos) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c34);
      }
    }

    peg$silentFails--;

    if (s1 === peg$FAILED) {
      s0 = void 0;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  var OPS_TO_PREFIXED_TYPES = {
    "$": "text",
    "&": "simple_and",
    "!": "simple_not"
  };
  var OPS_TO_SUFFIXED_TYPES = {
    "?": "optional",
    "*": "zero_or_more",
    "+": "one_or_more"
  };
  var OPS_TO_SEMANTIC_PREDICATE_TYPES = {
    "&": "semantic_and",
    "!": "semantic_not"
  };

  function filterEmptyStrings(array) {
    var result = [],
        i;

    for (i = 0; i < array.length; i++) {
      if (array[i] !== "") {
        result.push(array[i]);
      }
    }

    return result;
  }

  function extractOptional(optional, index) {
    return optional ? optional[index] : null;
  }

  function extractList(list, index) {
    var result = new Array(list.length),
        i;

    for (i = 0; i < list.length; i++) {
      result[i] = list[i][index];
    }

    return result;
  }

  function buildList(head, tail, index) {
    return [head].concat(extractList(tail, index));
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
},{}],"node_modules/pegjs/lib/compiler/visitor.js":[function(require,module,exports) {
"use strict";

var objects = require("../utils/objects"),
    arrays = require("../utils/arrays");
/* Simple AST node visitor builder. */


var visitor = {
  build: function (functions) {
    function visit(node) {
      return functions[node.type].apply(null, arguments);
    }

    function visitNop() {}

    function visitExpression(node) {
      var extraArgs = Array.prototype.slice.call(arguments, 1);
      visit.apply(null, [node.expression].concat(extraArgs));
    }

    function visitChildren(property) {
      return function (node) {
        var extraArgs = Array.prototype.slice.call(arguments, 1);
        arrays.each(node[property], function (child) {
          visit.apply(null, [child].concat(extraArgs));
        });
      };
    }

    var DEFAULT_FUNCTIONS = {
      grammar: function (node) {
        var extraArgs = Array.prototype.slice.call(arguments, 1);

        if (node.initializer) {
          visit.apply(null, [node.initializer].concat(extraArgs));
        }

        arrays.each(node.rules, function (rule) {
          visit.apply(null, [rule].concat(extraArgs));
        });
      },
      initializer: visitNop,
      rule: visitExpression,
      named: visitExpression,
      choice: visitChildren("alternatives"),
      action: visitExpression,
      sequence: visitChildren("elements"),
      labeled: visitExpression,
      text: visitExpression,
      simple_and: visitExpression,
      simple_not: visitExpression,
      optional: visitExpression,
      zero_or_more: visitExpression,
      one_or_more: visitExpression,
      group: visitExpression,
      semantic_and: visitNop,
      semantic_not: visitNop,
      rule_ref: visitNop,
      literal: visitNop,
      "class": visitNop,
      any: visitNop
    };
    objects.defaults(functions, DEFAULT_FUNCTIONS);
    return visit;
  }
};
module.exports = visitor;
},{"../utils/objects":"node_modules/pegjs/lib/utils/objects.js","../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js"}],"node_modules/pegjs/lib/compiler/asts.js":[function(require,module,exports) {
"use strict";

var arrays = require("../utils/arrays"),
    visitor = require("./visitor");
/* AST utilities. */


var asts = {
  findRule: function (ast, name) {
    return arrays.find(ast.rules, function (r) {
      return r.name === name;
    });
  },
  indexOfRule: function (ast, name) {
    return arrays.indexOf(ast.rules, function (r) {
      return r.name === name;
    });
  },
  alwaysConsumesOnSuccess: function (ast, node) {
    function consumesTrue() {
      return true;
    }

    function consumesFalse() {
      return false;
    }

    function consumesExpression(node) {
      return consumes(node.expression);
    }

    var consumes = visitor.build({
      rule: consumesExpression,
      named: consumesExpression,
      choice: function (node) {
        return arrays.every(node.alternatives, consumes);
      },
      action: consumesExpression,
      sequence: function (node) {
        return arrays.some(node.elements, consumes);
      },
      labeled: consumesExpression,
      text: consumesExpression,
      simple_and: consumesFalse,
      simple_not: consumesFalse,
      optional: consumesFalse,
      zero_or_more: consumesFalse,
      one_or_more: consumesExpression,
      group: consumesExpression,
      semantic_and: consumesFalse,
      semantic_not: consumesFalse,
      rule_ref: function (node) {
        return consumes(asts.findRule(ast, node.name));
      },
      literal: function (node) {
        return node.value !== "";
      },
      "class": consumesTrue,
      any: consumesTrue
    });
    return consumes(node);
  }
};
module.exports = asts;
},{"../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","./visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/report-undefined-rules.js":[function(require,module,exports) {
"use strict";

var GrammarError = require("../../grammar-error"),
    asts = require("../asts"),
    visitor = require("../visitor");
/* Checks that all referenced rules exist. */


function reportUndefinedRules(ast) {
  var check = visitor.build({
    rule_ref: function (node) {
      if (!asts.findRule(ast, node.name)) {
        throw new GrammarError("Rule \"" + node.name + "\" is not defined.", node.location);
      }
    }
  });
  check(ast);
}

module.exports = reportUndefinedRules;
},{"../../grammar-error":"node_modules/pegjs/lib/grammar-error.js","../asts":"node_modules/pegjs/lib/compiler/asts.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/report-duplicate-rules.js":[function(require,module,exports) {
"use strict";

var GrammarError = require("../../grammar-error"),
    visitor = require("../visitor");
/* Checks that each rule is defined only once. */


function reportDuplicateRules(ast) {
  var rules = {};
  var check = visitor.build({
    rule: function (node) {
      if (rules.hasOwnProperty(node.name)) {
        throw new GrammarError("Rule \"" + node.name + "\" is already defined " + "at line " + rules[node.name].start.line + ", " + "column " + rules[node.name].start.column + ".", node.location);
      }

      rules[node.name] = node.location;
    }
  });
  check(ast);
}

module.exports = reportDuplicateRules;
},{"../../grammar-error":"node_modules/pegjs/lib/grammar-error.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/report-duplicate-labels.js":[function(require,module,exports) {
"use strict";

var GrammarError = require("../../grammar-error"),
    arrays = require("../../utils/arrays"),
    objects = require("../../utils/objects"),
    visitor = require("../visitor");
/* Checks that each label is defined only once within each scope. */


function reportDuplicateLabels(ast) {
  function checkExpressionWithClonedEnv(node, env) {
    check(node.expression, objects.clone(env));
  }

  var check = visitor.build({
    rule: function (node) {
      check(node.expression, {});
    },
    choice: function (node, env) {
      arrays.each(node.alternatives, function (alternative) {
        check(alternative, objects.clone(env));
      });
    },
    action: checkExpressionWithClonedEnv,
    labeled: function (node, env) {
      if (env.hasOwnProperty(node.label)) {
        throw new GrammarError("Label \"" + node.label + "\" is already defined " + "at line " + env[node.label].start.line + ", " + "column " + env[node.label].start.column + ".", node.location);
      }

      check(node.expression, env);
      env[node.label] = node.location;
    },
    text: checkExpressionWithClonedEnv,
    simple_and: checkExpressionWithClonedEnv,
    simple_not: checkExpressionWithClonedEnv,
    optional: checkExpressionWithClonedEnv,
    zero_or_more: checkExpressionWithClonedEnv,
    one_or_more: checkExpressionWithClonedEnv,
    group: checkExpressionWithClonedEnv
  });
  check(ast);
}

module.exports = reportDuplicateLabels;
},{"../../grammar-error":"node_modules/pegjs/lib/grammar-error.js","../../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../../utils/objects":"node_modules/pegjs/lib/utils/objects.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/report-infinite-recursion.js":[function(require,module,exports) {
"use strict";

var arrays = require("../../utils/arrays"),
    GrammarError = require("../../grammar-error"),
    asts = require("../asts"),
    visitor = require("../visitor");
/*
 * Reports left recursion in the grammar, which prevents infinite recursion in
 * the generated parser.
 *
 * Both direct and indirect recursion is detected. The pass also correctly
 * reports cases like this:
 *
 *   start = "a"? start
 *
 * In general, if a rule reference can be reached without consuming any input,
 * it can lead to left recursion.
 */


function reportInfiniteRecursion(ast) {
  var visitedRules = [];
  var check = visitor.build({
    rule: function (node) {
      visitedRules.push(node.name);
      check(node.expression);
      visitedRules.pop(node.name);
    },
    sequence: function (node) {
      arrays.every(node.elements, function (element) {
        check(element);
        return !asts.alwaysConsumesOnSuccess(ast, element);
      });
    },
    rule_ref: function (node) {
      if (arrays.contains(visitedRules, node.name)) {
        visitedRules.push(node.name);
        throw new GrammarError("Possible infinite loop when parsing (left recursion: " + visitedRules.join(" -> ") + ").", node.location);
      }

      check(asts.findRule(ast, node.name));
    }
  });
  check(ast);
}

module.exports = reportInfiniteRecursion;
},{"../../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../../grammar-error":"node_modules/pegjs/lib/grammar-error.js","../asts":"node_modules/pegjs/lib/compiler/asts.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/report-infinite-repetition.js":[function(require,module,exports) {
"use strict";

var GrammarError = require("../../grammar-error"),
    asts = require("../asts"),
    visitor = require("../visitor");
/*
 * Reports expressions that don't consume any input inside |*| or |+| in the
 * grammar, which prevents infinite loops in the generated parser.
 */


function reportInfiniteRepetition(ast) {
  var check = visitor.build({
    zero_or_more: function (node) {
      if (!asts.alwaysConsumesOnSuccess(ast, node.expression)) {
        throw new GrammarError("Possible infinite loop when parsing (repetition used with an expression that may not consume any input).", node.location);
      }
    },
    one_or_more: function (node) {
      if (!asts.alwaysConsumesOnSuccess(ast, node.expression)) {
        throw new GrammarError("Possible infinite loop when parsing (repetition used with an expression that may not consume any input).", node.location);
      }
    }
  });
  check(ast);
}

module.exports = reportInfiniteRepetition;
},{"../../grammar-error":"node_modules/pegjs/lib/grammar-error.js","../asts":"node_modules/pegjs/lib/compiler/asts.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/passes/remove-proxy-rules.js":[function(require,module,exports) {
"use strict";

var arrays = require("../../utils/arrays"),
    visitor = require("../visitor");
/*
 * Removes proxy rules -- that is, rules that only delegate to other rule.
 */


function removeProxyRules(ast, options) {
  function isProxyRule(node) {
    return node.type === "rule" && node.expression.type === "rule_ref";
  }

  function replaceRuleRefs(ast, from, to) {
    var replace = visitor.build({
      rule_ref: function (node) {
        if (node.name === from) {
          node.name = to;
        }
      }
    });
    replace(ast);
  }

  var indices = [];
  arrays.each(ast.rules, function (rule, i) {
    if (isProxyRule(rule)) {
      replaceRuleRefs(ast, rule.name, rule.expression.name);

      if (!arrays.contains(options.allowedStartRules, rule.name)) {
        indices.push(i);
      }
    }
  });
  indices.reverse();
  arrays.each(indices, function (i) {
    ast.rules.splice(i, 1);
  });
}

module.exports = removeProxyRules;
},{"../../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js"}],"node_modules/pegjs/lib/compiler/opcodes.js":[function(require,module,exports) {
"use strict";
/* Bytecode instruction opcodes. */

var opcodes = {
  /* Stack Manipulation */
  PUSH: 0,
  // PUSH c
  PUSH_UNDEFINED: 1,
  // PUSH_UNDEFINED
  PUSH_NULL: 2,
  // PUSH_NULL
  PUSH_FAILED: 3,
  // PUSH_FAILED
  PUSH_EMPTY_ARRAY: 4,
  // PUSH_EMPTY_ARRAY
  PUSH_CURR_POS: 5,
  // PUSH_CURR_POS
  POP: 6,
  // POP
  POP_CURR_POS: 7,
  // POP_CURR_POS
  POP_N: 8,
  // POP_N n
  NIP: 9,
  // NIP
  APPEND: 10,
  // APPEND
  WRAP: 11,
  // WRAP n
  TEXT: 12,
  // TEXT

  /* Conditions and Loops */
  IF: 13,
  // IF t, f
  IF_ERROR: 14,
  // IF_ERROR t, f
  IF_NOT_ERROR: 15,
  // IF_NOT_ERROR t, f
  WHILE_NOT_ERROR: 16,
  // WHILE_NOT_ERROR b

  /* Matching */
  MATCH_ANY: 17,
  // MATCH_ANY a, f, ...
  MATCH_STRING: 18,
  // MATCH_STRING s, a, f, ...
  MATCH_STRING_IC: 19,
  // MATCH_STRING_IC s, a, f, ...
  MATCH_REGEXP: 20,
  // MATCH_REGEXP r, a, f, ...
  ACCEPT_N: 21,
  // ACCEPT_N n
  ACCEPT_STRING: 22,
  // ACCEPT_STRING s
  FAIL: 23,
  // FAIL e

  /* Calls */
  LOAD_SAVED_POS: 24,
  // LOAD_SAVED_POS p
  UPDATE_SAVED_POS: 25,
  // UPDATE_SAVED_POS
  CALL: 26,
  // CALL f, n, pc, p1, p2, ..., pN

  /* Rules */
  RULE: 27,
  // RULE r

  /* Failure Reporting */
  SILENT_FAILS_ON: 28,
  // SILENT_FAILS_ON
  SILENT_FAILS_OFF: 29 // SILENT_FAILS_OFF

};
module.exports = opcodes;
},{}],"node_modules/pegjs/lib/compiler/js.js":[function(require,module,exports) {
"use strict";

function hex(ch) {
  return ch.charCodeAt(0).toString(16).toUpperCase();
}
/* JavaScript code generation helpers. */


var js = {
  stringEscape: function (s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a string
     * literal except for the closing quote character, backslash, carriage
     * return, line separator, paragraph separator, and line feed. Any character
     * may appear in the form of an escape sequence.
     *
     * For portability, we also escape all control and non-ASCII characters.
     * Note that the "\v" escape sequence is not used because IE does not like
     * it.
     */
    return s.replace(/\\/g, '\\\\') // backslash
    .replace(/"/g, '\\"') // closing double quote
    .replace(/\0/g, '\\0') // null
    .replace(/\x08/g, '\\b') // backspace
    .replace(/\t/g, '\\t') // horizontal tab
    .replace(/\n/g, '\\n') // line feed
    .replace(/\f/g, '\\f') // form feed
    .replace(/\r/g, '\\r') // carriage return
    .replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\xFF]/g, function (ch) {
      return '\\x' + hex(ch);
    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
      return '\\u0' + hex(ch);
    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
      return '\\u' + hex(ch);
    });
  },
  regexpClassEscape: function (s) {
    /*
     * Based on ECMA-262, 5th ed., 7.8.5 & 15.10.1.
     *
     * For portability, we also escape all control and non-ASCII characters.
     */
    return s.replace(/\\/g, '\\\\') // backslash
    .replace(/\//g, '\\/') // closing slash
    .replace(/\]/g, '\\]') // closing bracket
    .replace(/\^/g, '\\^') // caret
    .replace(/-/g, '\\-') // dash
    .replace(/\0/g, '\\0') // null
    .replace(/\t/g, '\\t') // horizontal tab
    .replace(/\n/g, '\\n') // line feed
    .replace(/\v/g, '\\x0B') // vertical tab
    .replace(/\f/g, '\\f') // form feed
    .replace(/\r/g, '\\r') // carriage return
    .replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\xFF]/g, function (ch) {
      return '\\x' + hex(ch);
    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
      return '\\u0' + hex(ch);
    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
      return '\\u' + hex(ch);
    });
  }
};
module.exports = js;
},{}],"node_modules/pegjs/lib/compiler/passes/generate-bytecode.js":[function(require,module,exports) {
"use strict";

var arrays = require("../../utils/arrays"),
    objects = require("../../utils/objects"),
    asts = require("../asts"),
    visitor = require("../visitor"),
    op = require("../opcodes"),
    js = require("../js");
/* Generates bytecode.
 *
 * Instructions
 * ============
 *
 * Stack Manipulation
 * ------------------
 *
 *  [0] PUSH c
 *
 *        stack.push(consts[c]);
 *
 *  [1] PUSH_UNDEFINED
 *
 *        stack.push(undefined);
 *
 *  [2] PUSH_NULL
 *
 *        stack.push(null);
 *
 *  [3] PUSH_FAILED
 *
 *        stack.push(FAILED);
 *
 *  [4] PUSH_EMPTY_ARRAY
 *
 *        stack.push([]);
 *
 *  [5] PUSH_CURR_POS
 *
 *        stack.push(currPos);
 *
 *  [6] POP
 *
 *        stack.pop();
 *
 *  [7] POP_CURR_POS
 *
 *        currPos = stack.pop();
 *
 *  [8] POP_N n
 *
 *        stack.pop(n);
 *
 *  [9] NIP
 *
 *        value = stack.pop();
 *        stack.pop();
 *        stack.push(value);
 *
 * [10] APPEND
 *
 *        value = stack.pop();
 *        array = stack.pop();
 *        array.push(value);
 *        stack.push(array);
 *
 * [11] WRAP n
 *
 *        stack.push(stack.pop(n));
 *
 * [12] TEXT
 *
 *        stack.push(input.substring(stack.pop(), currPos));
 *
 * Conditions and Loops
 * --------------------
 *
 * [13] IF t, f
 *
 *        if (stack.top()) {
 *          interpret(ip + 3, ip + 3 + t);
 *        } else {
 *          interpret(ip + 3 + t, ip + 3 + t + f);
 *        }
 *
 * [14] IF_ERROR t, f
 *
 *        if (stack.top() === FAILED) {
 *          interpret(ip + 3, ip + 3 + t);
 *        } else {
 *          interpret(ip + 3 + t, ip + 3 + t + f);
 *        }
 *
 * [15] IF_NOT_ERROR t, f
 *
 *        if (stack.top() !== FAILED) {
 *          interpret(ip + 3, ip + 3 + t);
 *        } else {
 *          interpret(ip + 3 + t, ip + 3 + t + f);
 *        }
 *
 * [16] WHILE_NOT_ERROR b
 *
 *        while(stack.top() !== FAILED) {
 *          interpret(ip + 2, ip + 2 + b);
 *        }
 *
 * Matching
 * --------
 *
 * [17] MATCH_ANY a, f, ...
 *
 *        if (input.length > currPos) {
 *          interpret(ip + 3, ip + 3 + a);
 *        } else {
 *          interpret(ip + 3 + a, ip + 3 + a + f);
 *        }
 *
 * [18] MATCH_STRING s, a, f, ...
 *
 *        if (input.substr(currPos, consts[s].length) === consts[s]) {
 *          interpret(ip + 4, ip + 4 + a);
 *        } else {
 *          interpret(ip + 4 + a, ip + 4 + a + f);
 *        }
 *
 * [19] MATCH_STRING_IC s, a, f, ...
 *
 *        if (input.substr(currPos, consts[s].length).toLowerCase() === consts[s]) {
 *          interpret(ip + 4, ip + 4 + a);
 *        } else {
 *          interpret(ip + 4 + a, ip + 4 + a + f);
 *        }
 *
 * [20] MATCH_REGEXP r, a, f, ...
 *
 *        if (consts[r].test(input.charAt(currPos))) {
 *          interpret(ip + 4, ip + 4 + a);
 *        } else {
 *          interpret(ip + 4 + a, ip + 4 + a + f);
 *        }
 *
 * [21] ACCEPT_N n
 *
 *        stack.push(input.substring(currPos, n));
 *        currPos += n;
 *
 * [22] ACCEPT_STRING s
 *
 *        stack.push(consts[s]);
 *        currPos += consts[s].length;
 *
 * [23] FAIL e
 *
 *        stack.push(FAILED);
 *        fail(consts[e]);
 *
 * Calls
 * -----
 *
 * [24] LOAD_SAVED_POS p
 *
 *        savedPos = stack[p];
 *
 * [25] UPDATE_SAVED_POS
 *
 *        savedPos = currPos;
 *
 * [26] CALL f, n, pc, p1, p2, ..., pN
 *
 *        value = consts[f](stack[p1], ..., stack[pN]);
 *        stack.pop(n);
 *        stack.push(value);
 *
 * Rules
 * -----
 *
 * [27] RULE r
 *
 *        stack.push(parseRule(r));
 *
 * Failure Reporting
 * -----------------
 *
 * [28] SILENT_FAILS_ON
 *
 *        silentFails++;
 *
 * [29] SILENT_FAILS_OFF
 *
 *        silentFails--;
 */


function generateBytecode(ast) {
  var consts = [];

  function addConst(value) {
    var index = arrays.indexOf(consts, value);
    return index === -1 ? consts.push(value) - 1 : index;
  }

  function addFunctionConst(params, code) {
    return addConst("function(" + params.join(", ") + ") {" + code + "}");
  }

  function buildSequence() {
    return Array.prototype.concat.apply([], arguments);
  }

  function buildCondition(condCode, thenCode, elseCode) {
    return condCode.concat([thenCode.length, elseCode.length], thenCode, elseCode);
  }

  function buildLoop(condCode, bodyCode) {
    return condCode.concat([bodyCode.length], bodyCode);
  }

  function buildCall(functionIndex, delta, env, sp) {
    var params = arrays.map(objects.values(env), function (p) {
      return sp - p;
    });
    return [op.CALL, functionIndex, delta, params.length].concat(params);
  }

  function buildSimplePredicate(expression, negative, context) {
    return buildSequence([op.PUSH_CURR_POS], [op.SILENT_FAILS_ON], generate(expression, {
      sp: context.sp + 1,
      env: objects.clone(context.env),
      action: null
    }), [op.SILENT_FAILS_OFF], buildCondition([negative ? op.IF_ERROR : op.IF_NOT_ERROR], buildSequence([op.POP], [negative ? op.POP : op.POP_CURR_POS], [op.PUSH_UNDEFINED]), buildSequence([op.POP], [negative ? op.POP_CURR_POS : op.POP], [op.PUSH_FAILED])));
  }

  function buildSemanticPredicate(code, negative, context) {
    var functionIndex = addFunctionConst(objects.keys(context.env), code);
    return buildSequence([op.UPDATE_SAVED_POS], buildCall(functionIndex, 0, context.env, context.sp), buildCondition([op.IF], buildSequence([op.POP], negative ? [op.PUSH_FAILED] : [op.PUSH_UNDEFINED]), buildSequence([op.POP], negative ? [op.PUSH_UNDEFINED] : [op.PUSH_FAILED])));
  }

  function buildAppendLoop(expressionCode) {
    return buildLoop([op.WHILE_NOT_ERROR], buildSequence([op.APPEND], expressionCode));
  }

  var generate = visitor.build({
    grammar: function (node) {
      arrays.each(node.rules, generate);
      node.consts = consts;
    },
    rule: function (node) {
      node.bytecode = generate(node.expression, {
        sp: -1,
        // stack pointer
        env: {},
        // mapping of label names to stack positions
        action: null // action nodes pass themselves to children here

      });
    },
    named: function (node, context) {
      var nameIndex = addConst('peg$otherExpectation("' + js.stringEscape(node.name) + '")');
      /*
       * The code generated below is slightly suboptimal because |FAIL| pushes
       * to the stack, so we need to stick a |POP| in front of it. We lack a
       * dedicated instruction that would just report the failure and not touch
       * the stack.
       */

      return buildSequence([op.SILENT_FAILS_ON], generate(node.expression, context), [op.SILENT_FAILS_OFF], buildCondition([op.IF_ERROR], [op.FAIL, nameIndex], []));
    },
    choice: function (node, context) {
      function buildAlternativesCode(alternatives, context) {
        return buildSequence(generate(alternatives[0], {
          sp: context.sp,
          env: objects.clone(context.env),
          action: null
        }), alternatives.length > 1 ? buildCondition([op.IF_ERROR], buildSequence([op.POP], buildAlternativesCode(alternatives.slice(1), context)), []) : []);
      }

      return buildAlternativesCode(node.alternatives, context);
    },
    action: function (node, context) {
      var env = objects.clone(context.env),
          emitCall = node.expression.type !== "sequence" || node.expression.elements.length === 0,
          expressionCode = generate(node.expression, {
        sp: context.sp + (emitCall ? 1 : 0),
        env: env,
        action: node
      }),
          functionIndex = addFunctionConst(objects.keys(env), node.code);
      return emitCall ? buildSequence([op.PUSH_CURR_POS], expressionCode, buildCondition([op.IF_NOT_ERROR], buildSequence([op.LOAD_SAVED_POS, 1], buildCall(functionIndex, 1, env, context.sp + 2)), []), [op.NIP]) : expressionCode;
    },
    sequence: function (node, context) {
      function buildElementsCode(elements, context) {
        var processedCount, functionIndex;

        if (elements.length > 0) {
          processedCount = node.elements.length - elements.slice(1).length;
          return buildSequence(generate(elements[0], {
            sp: context.sp,
            env: context.env,
            action: null
          }), buildCondition([op.IF_NOT_ERROR], buildElementsCode(elements.slice(1), {
            sp: context.sp + 1,
            env: context.env,
            action: context.action
          }), buildSequence(processedCount > 1 ? [op.POP_N, processedCount] : [op.POP], [op.POP_CURR_POS], [op.PUSH_FAILED])));
        } else {
          if (context.action) {
            functionIndex = addFunctionConst(objects.keys(context.env), context.action.code);
            return buildSequence([op.LOAD_SAVED_POS, node.elements.length], buildCall(functionIndex, node.elements.length, context.env, context.sp), [op.NIP]);
          } else {
            return buildSequence([op.WRAP, node.elements.length], [op.NIP]);
          }
        }
      }

      return buildSequence([op.PUSH_CURR_POS], buildElementsCode(node.elements, {
        sp: context.sp + 1,
        env: context.env,
        action: context.action
      }));
    },
    labeled: function (node, context) {
      var env = objects.clone(context.env);
      context.env[node.label] = context.sp + 1;
      return generate(node.expression, {
        sp: context.sp,
        env: env,
        action: null
      });
    },
    text: function (node, context) {
      return buildSequence([op.PUSH_CURR_POS], generate(node.expression, {
        sp: context.sp + 1,
        env: objects.clone(context.env),
        action: null
      }), buildCondition([op.IF_NOT_ERROR], buildSequence([op.POP], [op.TEXT]), [op.NIP]));
    },
    simple_and: function (node, context) {
      return buildSimplePredicate(node.expression, false, context);
    },
    simple_not: function (node, context) {
      return buildSimplePredicate(node.expression, true, context);
    },
    optional: function (node, context) {
      return buildSequence(generate(node.expression, {
        sp: context.sp,
        env: objects.clone(context.env),
        action: null
      }), buildCondition([op.IF_ERROR], buildSequence([op.POP], [op.PUSH_NULL]), []));
    },
    zero_or_more: function (node, context) {
      var expressionCode = generate(node.expression, {
        sp: context.sp + 1,
        env: objects.clone(context.env),
        action: null
      });
      return buildSequence([op.PUSH_EMPTY_ARRAY], expressionCode, buildAppendLoop(expressionCode), [op.POP]);
    },
    one_or_more: function (node, context) {
      var expressionCode = generate(node.expression, {
        sp: context.sp + 1,
        env: objects.clone(context.env),
        action: null
      });
      return buildSequence([op.PUSH_EMPTY_ARRAY], expressionCode, buildCondition([op.IF_NOT_ERROR], buildSequence(buildAppendLoop(expressionCode), [op.POP]), buildSequence([op.POP], [op.POP], [op.PUSH_FAILED])));
    },
    group: function (node, context) {
      return generate(node.expression, {
        sp: context.sp,
        env: objects.clone(context.env),
        action: null
      });
    },
    semantic_and: function (node, context) {
      return buildSemanticPredicate(node.code, false, context);
    },
    semantic_not: function (node, context) {
      return buildSemanticPredicate(node.code, true, context);
    },
    rule_ref: function (node) {
      return [op.RULE, asts.indexOfRule(ast, node.name)];
    },
    literal: function (node) {
      var stringIndex, expectedIndex;

      if (node.value.length > 0) {
        stringIndex = addConst('"' + js.stringEscape(node.ignoreCase ? node.value.toLowerCase() : node.value) + '"');
        expectedIndex = addConst('peg$literalExpectation(' + '"' + js.stringEscape(node.value) + '", ' + node.ignoreCase + ')');
        /*
         * For case-sensitive strings the value must match the beginning of the
         * remaining input exactly. As a result, we can use |ACCEPT_STRING| and
         * save one |substr| call that would be needed if we used |ACCEPT_N|.
         */

        return buildCondition(node.ignoreCase ? [op.MATCH_STRING_IC, stringIndex] : [op.MATCH_STRING, stringIndex], node.ignoreCase ? [op.ACCEPT_N, node.value.length] : [op.ACCEPT_STRING, stringIndex], [op.FAIL, expectedIndex]);
      } else {
        stringIndex = addConst('""');
        return [op.PUSH, stringIndex];
      }
    },
    "class": function (node) {
      var regexp, parts, regexpIndex, expectedIndex;

      if (node.parts.length > 0) {
        regexp = '/^[' + (node.inverted ? '^' : '') + arrays.map(node.parts, function (part) {
          return part instanceof Array ? js.regexpClassEscape(part[0]) + '-' + js.regexpClassEscape(part[1]) : js.regexpClassEscape(part);
        }).join('') + ']/' + (node.ignoreCase ? 'i' : '');
      } else {
        /*
         * IE considers regexps /[]/ and /[^]/ as syntactically invalid, so we
         * translate them into equivalents it can handle.
         */
        regexp = node.inverted ? '/^[\\S\\s]/' : '/^(?!)/';
      }

      parts = '[' + arrays.map(node.parts, function (part) {
        return part instanceof Array ? '["' + js.stringEscape(part[0]) + '", "' + js.stringEscape(part[1]) + '"]' : '"' + js.stringEscape(part) + '"';
      }).join(', ') + ']';
      regexpIndex = addConst(regexp);
      expectedIndex = addConst('peg$classExpectation(' + parts + ', ' + node.inverted + ', ' + node.ignoreCase + ')');
      return buildCondition([op.MATCH_REGEXP, regexpIndex], [op.ACCEPT_N, 1], [op.FAIL, expectedIndex]);
    },
    any: function () {
      var expectedIndex = addConst('peg$anyExpectation()');
      return buildCondition([op.MATCH_ANY], [op.ACCEPT_N, 1], [op.FAIL, expectedIndex]);
    }
  });
  generate(ast);
}

module.exports = generateBytecode;
},{"../../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../../utils/objects":"node_modules/pegjs/lib/utils/objects.js","../asts":"node_modules/pegjs/lib/compiler/asts.js","../visitor":"node_modules/pegjs/lib/compiler/visitor.js","../opcodes":"node_modules/pegjs/lib/compiler/opcodes.js","../js":"node_modules/pegjs/lib/compiler/js.js"}],"node_modules/pegjs/lib/compiler/passes/generate-js.js":[function(require,module,exports) {
"use strict";

var arrays = require("../../utils/arrays"),
    objects = require("../../utils/objects"),
    asts = require("../asts"),
    op = require("../opcodes"),
    js = require("../js");
/* Generates parser JavaScript code. */


function generateJS(ast, options) {
  /* These only indent non-empty lines to avoid trailing whitespace. */
  function indent2(code) {
    return code.replace(/^(.+)$/gm, '  $1');
  }

  function indent6(code) {
    return code.replace(/^(.+)$/gm, '      $1');
  }

  function indent10(code) {
    return code.replace(/^(.+)$/gm, '          $1');
  }

  function generateTables() {
    if (options.optimize === "size") {
      return ['peg$consts = [', indent2(ast.consts.join(',\n')), '],', '', 'peg$bytecode = [', indent2(arrays.map(ast.rules, function (rule) {
        return 'peg$decode("' + js.stringEscape(arrays.map(rule.bytecode, function (b) {
          return String.fromCharCode(b + 32);
        }).join('')) + '")';
      }).join(',\n')), '],'].join('\n');
    } else {
      return arrays.map(ast.consts, function (c, i) {
        return 'peg$c' + i + ' = ' + c + ',';
      }).join('\n');
    }
  }

  function generateRuleHeader(ruleNameCode, ruleIndexCode) {
    var parts = [];
    parts.push('');

    if (options.trace) {
      parts.push(['peg$tracer.trace({', '  type:     "rule.enter",', '  rule:     ' + ruleNameCode + ',', '  location: peg$computeLocation(startPos, startPos)', '});', ''].join('\n'));
    }

    if (options.cache) {
      parts.push(['var key    = peg$currPos * ' + ast.rules.length + ' + ' + ruleIndexCode + ',', '    cached = peg$resultsCache[key];', '', 'if (cached) {', '  peg$currPos = cached.nextPos;', ''].join('\n'));

      if (options.trace) {
        parts.push(['if (cached.result !== peg$FAILED) {', '  peg$tracer.trace({', '    type:   "rule.match",', '    rule:   ' + ruleNameCode + ',', '    result: cached.result,', '    location: peg$computeLocation(startPos, peg$currPos)', '  });', '} else {', '  peg$tracer.trace({', '    type: "rule.fail",', '    rule: ' + ruleNameCode + ',', '    location: peg$computeLocation(startPos, startPos)', '  });', '}', ''].join('\n'));
      }

      parts.push(['  return cached.result;', '}', ''].join('\n'));
    }

    return parts.join('\n');
  }

  function generateRuleFooter(ruleNameCode, resultCode) {
    var parts = [];

    if (options.cache) {
      parts.push(['', 'peg$resultsCache[key] = { nextPos: peg$currPos, result: ' + resultCode + ' };'].join('\n'));
    }

    if (options.trace) {
      parts.push(['', 'if (' + resultCode + ' !== peg$FAILED) {', '  peg$tracer.trace({', '    type:   "rule.match",', '    rule:   ' + ruleNameCode + ',', '    result: ' + resultCode + ',', '    location: peg$computeLocation(startPos, peg$currPos)', '  });', '} else {', '  peg$tracer.trace({', '    type: "rule.fail",', '    rule: ' + ruleNameCode + ',', '    location: peg$computeLocation(startPos, startPos)', '  });', '}'].join('\n'));
    }

    parts.push(['', 'return ' + resultCode + ';'].join('\n'));
    return parts.join('\n');
  }

  function generateInterpreter() {
    var parts = [];

    function generateCondition(cond, argsLength) {
      var baseLength = argsLength + 3,
          thenLengthCode = 'bc[ip + ' + (baseLength - 2) + ']',
          elseLengthCode = 'bc[ip + ' + (baseLength - 1) + ']';
      return ['ends.push(end);', 'ips.push(ip + ' + baseLength + ' + ' + thenLengthCode + ' + ' + elseLengthCode + ');', '', 'if (' + cond + ') {', '  end = ip + ' + baseLength + ' + ' + thenLengthCode + ';', '  ip += ' + baseLength + ';', '} else {', '  end = ip + ' + baseLength + ' + ' + thenLengthCode + ' + ' + elseLengthCode + ';', '  ip += ' + baseLength + ' + ' + thenLengthCode + ';', '}', '', 'break;'].join('\n');
    }

    function generateLoop(cond) {
      var baseLength = 2,
          bodyLengthCode = 'bc[ip + ' + (baseLength - 1) + ']';
      return ['if (' + cond + ') {', '  ends.push(end);', '  ips.push(ip);', '', '  end = ip + ' + baseLength + ' + ' + bodyLengthCode + ';', '  ip += ' + baseLength + ';', '} else {', '  ip += ' + baseLength + ' + ' + bodyLengthCode + ';', '}', '', 'break;'].join('\n');
    }

    function generateCall() {
      var baseLength = 4,
          paramsLengthCode = 'bc[ip + ' + (baseLength - 1) + ']';
      return ['params = bc.slice(ip + ' + baseLength + ', ip + ' + baseLength + ' + ' + paramsLengthCode + ');', 'for (i = 0; i < ' + paramsLengthCode + '; i++) {', '  params[i] = stack[stack.length - 1 - params[i]];', '}', '', 'stack.splice(', '  stack.length - bc[ip + 2],', '  bc[ip + 2],', '  peg$consts[bc[ip + 1]].apply(null, params)', ');', '', 'ip += ' + baseLength + ' + ' + paramsLengthCode + ';', 'break;'].join('\n');
    }

    parts.push(['function peg$decode(s) {', '  var bc = new Array(s.length), i;', '', '  for (i = 0; i < s.length; i++) {', '    bc[i] = s.charCodeAt(i) - 32;', '  }', '', '  return bc;', '}', '', 'function peg$parseRule(index) {'].join('\n'));

    if (options.trace) {
      parts.push(['  var bc       = peg$bytecode[index],', '      ip       = 0,', '      ips      = [],', '      end      = bc.length,', '      ends     = [],', '      stack    = [],', '      startPos = peg$currPos,', '      params, i;'].join('\n'));
    } else {
      parts.push(['  var bc    = peg$bytecode[index],', '      ip    = 0,', '      ips   = [],', '      end   = bc.length,', '      ends  = [],', '      stack = [],', '      params, i;'].join('\n'));
    }

    parts.push(indent2(generateRuleHeader('peg$ruleNames[index]', 'index')));
    parts.push([
    /*
     * The point of the outer loop and the |ips| & |ends| stacks is to avoid
     * recursive calls for interpreting parts of bytecode. In other words, we
     * implement the |interpret| operation of the abstract machine without
     * function calls. Such calls would likely slow the parser down and more
     * importantly cause stack overflows for complex grammars.
     */
    '  while (true) {', '    while (ip < end) {', '      switch (bc[ip]) {', '        case ' + op.PUSH + ':', // PUSH c
    '          stack.push(peg$consts[bc[ip + 1]]);', '          ip += 2;', '          break;', '', '        case ' + op.PUSH_UNDEFINED + ':', // PUSH_UNDEFINED
    '          stack.push(void 0);', '          ip++;', '          break;', '', '        case ' + op.PUSH_NULL + ':', // PUSH_NULL
    '          stack.push(null);', '          ip++;', '          break;', '', '        case ' + op.PUSH_FAILED + ':', // PUSH_FAILED
    '          stack.push(peg$FAILED);', '          ip++;', '          break;', '', '        case ' + op.PUSH_EMPTY_ARRAY + ':', // PUSH_EMPTY_ARRAY
    '          stack.push([]);', '          ip++;', '          break;', '', '        case ' + op.PUSH_CURR_POS + ':', // PUSH_CURR_POS
    '          stack.push(peg$currPos);', '          ip++;', '          break;', '', '        case ' + op.POP + ':', // POP
    '          stack.pop();', '          ip++;', '          break;', '', '        case ' + op.POP_CURR_POS + ':', // POP_CURR_POS
    '          peg$currPos = stack.pop();', '          ip++;', '          break;', '', '        case ' + op.POP_N + ':', // POP_N n
    '          stack.length -= bc[ip + 1];', '          ip += 2;', '          break;', '', '        case ' + op.NIP + ':', // NIP
    '          stack.splice(-2, 1);', '          ip++;', '          break;', '', '        case ' + op.APPEND + ':', // APPEND
    '          stack[stack.length - 2].push(stack.pop());', '          ip++;', '          break;', '', '        case ' + op.WRAP + ':', // WRAP n
    '          stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));', '          ip += 2;', '          break;', '', '        case ' + op.TEXT + ':', // TEXT
    '          stack.push(input.substring(stack.pop(), peg$currPos));', '          ip++;', '          break;', '', '        case ' + op.IF + ':', // IF t, f
    indent10(generateCondition('stack[stack.length - 1]', 0)), '', '        case ' + op.IF_ERROR + ':', // IF_ERROR t, f
    indent10(generateCondition('stack[stack.length - 1] === peg$FAILED', 0)), '', '        case ' + op.IF_NOT_ERROR + ':', // IF_NOT_ERROR t, f
    indent10(generateCondition('stack[stack.length - 1] !== peg$FAILED', 0)), '', '        case ' + op.WHILE_NOT_ERROR + ':', // WHILE_NOT_ERROR b
    indent10(generateLoop('stack[stack.length - 1] !== peg$FAILED')), '', '        case ' + op.MATCH_ANY + ':', // MATCH_ANY a, f, ...
    indent10(generateCondition('input.length > peg$currPos', 0)), '', '        case ' + op.MATCH_STRING + ':', // MATCH_STRING s, a, f, ...
    indent10(generateCondition('input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]', 1)), '', '        case ' + op.MATCH_STRING_IC + ':', // MATCH_STRING_IC s, a, f, ...
    indent10(generateCondition('input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]', 1)), '', '        case ' + op.MATCH_REGEXP + ':', // MATCH_REGEXP r, a, f, ...
    indent10(generateCondition('peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))', 1)), '', '        case ' + op.ACCEPT_N + ':', // ACCEPT_N n
    '          stack.push(input.substr(peg$currPos, bc[ip + 1]));', '          peg$currPos += bc[ip + 1];', '          ip += 2;', '          break;', '', '        case ' + op.ACCEPT_STRING + ':', // ACCEPT_STRING s
    '          stack.push(peg$consts[bc[ip + 1]]);', '          peg$currPos += peg$consts[bc[ip + 1]].length;', '          ip += 2;', '          break;', '', '        case ' + op.FAIL + ':', // FAIL e
    '          stack.push(peg$FAILED);', '          if (peg$silentFails === 0) {', '            peg$fail(peg$consts[bc[ip + 1]]);', '          }', '          ip += 2;', '          break;', '', '        case ' + op.LOAD_SAVED_POS + ':', // LOAD_SAVED_POS p
    '          peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];', '          ip += 2;', '          break;', '', '        case ' + op.UPDATE_SAVED_POS + ':', // UPDATE_SAVED_POS
    '          peg$savedPos = peg$currPos;', '          ip++;', '          break;', '', '        case ' + op.CALL + ':', // CALL f, n, pc, p1, p2, ..., pN
    indent10(generateCall()), '', '        case ' + op.RULE + ':', // RULE r
    '          stack.push(peg$parseRule(bc[ip + 1]));', '          ip += 2;', '          break;', '', '        case ' + op.SILENT_FAILS_ON + ':', // SILENT_FAILS_ON
    '          peg$silentFails++;', '          ip++;', '          break;', '', '        case ' + op.SILENT_FAILS_OFF + ':', // SILENT_FAILS_OFF
    '          peg$silentFails--;', '          ip++;', '          break;', '', '        default:', '          throw new Error("Invalid opcode: " + bc[ip] + ".");', '      }', '    }', '', '    if (ends.length > 0) {', '      end = ends.pop();', '      ip = ips.pop();', '    } else {', '      break;', '    }', '  }'].join('\n'));
    parts.push(indent2(generateRuleFooter('peg$ruleNames[index]', 'stack[0]')));
    parts.push('}');
    return parts.join('\n');
  }

  function generateRuleFunction(rule) {
    var parts = [],
        code;

    function c(i) {
      return "peg$c" + i;
    } // |consts[i]| of the abstract machine


    function s(i) {
      return "s" + i;
    } // |stack[i]| of the abstract machine


    var stack = {
      sp: -1,
      maxSp: -1,
      push: function (exprCode) {
        var code = s(++this.sp) + ' = ' + exprCode + ';';

        if (this.sp > this.maxSp) {
          this.maxSp = this.sp;
        }

        return code;
      },
      pop: function (n) {
        var values;

        if (n === void 0) {
          return s(this.sp--);
        } else {
          values = arrays.map(arrays.range(this.sp - n + 1, this.sp + 1), s);
          this.sp -= n;
          return values;
        }
      },
      top: function () {
        return s(this.sp);
      },
      index: function (i) {
        return s(this.sp - i);
      }
    };

    function compile(bc) {
      var ip = 0,
          end = bc.length,
          parts = [],
          value;

      function compileCondition(cond, argCount) {
        var baseLength = argCount + 3,
            thenLength = bc[ip + baseLength - 2],
            elseLength = bc[ip + baseLength - 1],
            baseSp = stack.sp,
            thenCode,
            elseCode,
            thenSp,
            elseSp;
        ip += baseLength;
        thenCode = compile(bc.slice(ip, ip + thenLength));
        thenSp = stack.sp;
        ip += thenLength;

        if (elseLength > 0) {
          stack.sp = baseSp;
          elseCode = compile(bc.slice(ip, ip + elseLength));
          elseSp = stack.sp;
          ip += elseLength;

          if (thenSp !== elseSp) {
            throw new Error("Branches of a condition must move the stack pointer in the same way.");
          }
        }

        parts.push('if (' + cond + ') {');
        parts.push(indent2(thenCode));

        if (elseLength > 0) {
          parts.push('} else {');
          parts.push(indent2(elseCode));
        }

        parts.push('}');
      }

      function compileLoop(cond) {
        var baseLength = 2,
            bodyLength = bc[ip + baseLength - 1],
            baseSp = stack.sp,
            bodyCode,
            bodySp;
        ip += baseLength;
        bodyCode = compile(bc.slice(ip, ip + bodyLength));
        bodySp = stack.sp;
        ip += bodyLength;

        if (bodySp !== baseSp) {
          throw new Error("Body of a loop can't move the stack pointer.");
        }

        parts.push('while (' + cond + ') {');
        parts.push(indent2(bodyCode));
        parts.push('}');
      }

      function compileCall() {
        var baseLength = 4,
            paramsLength = bc[ip + baseLength - 1];
        var value = c(bc[ip + 1]) + '(' + arrays.map(bc.slice(ip + baseLength, ip + baseLength + paramsLength), function (p) {
          return stack.index(p);
        }).join(', ') + ')';
        stack.pop(bc[ip + 2]);
        parts.push(stack.push(value));
        ip += baseLength + paramsLength;
      }

      while (ip < end) {
        switch (bc[ip]) {
          case op.PUSH:
            // PUSH c
            parts.push(stack.push(c(bc[ip + 1])));
            ip += 2;
            break;

          case op.PUSH_CURR_POS:
            // PUSH_CURR_POS
            parts.push(stack.push('peg$currPos'));
            ip++;
            break;

          case op.PUSH_UNDEFINED:
            // PUSH_UNDEFINED
            parts.push(stack.push('void 0'));
            ip++;
            break;

          case op.PUSH_NULL:
            // PUSH_NULL
            parts.push(stack.push('null'));
            ip++;
            break;

          case op.PUSH_FAILED:
            // PUSH_FAILED
            parts.push(stack.push('peg$FAILED'));
            ip++;
            break;

          case op.PUSH_EMPTY_ARRAY:
            // PUSH_EMPTY_ARRAY
            parts.push(stack.push('[]'));
            ip++;
            break;

          case op.POP:
            // POP
            stack.pop();
            ip++;
            break;

          case op.POP_CURR_POS:
            // POP_CURR_POS
            parts.push('peg$currPos = ' + stack.pop() + ';');
            ip++;
            break;

          case op.POP_N:
            // POP_N n
            stack.pop(bc[ip + 1]);
            ip += 2;
            break;

          case op.NIP:
            // NIP
            value = stack.pop();
            stack.pop();
            parts.push(stack.push(value));
            ip++;
            break;

          case op.APPEND:
            // APPEND
            value = stack.pop();
            parts.push(stack.top() + '.push(' + value + ');');
            ip++;
            break;

          case op.WRAP:
            // WRAP n
            parts.push(stack.push('[' + stack.pop(bc[ip + 1]).join(', ') + ']'));
            ip += 2;
            break;

          case op.TEXT:
            // TEXT
            parts.push(stack.push('input.substring(' + stack.pop() + ', peg$currPos)'));
            ip++;
            break;

          case op.IF:
            // IF t, f
            compileCondition(stack.top(), 0);
            break;

          case op.IF_ERROR:
            // IF_ERROR t, f
            compileCondition(stack.top() + ' === peg$FAILED', 0);
            break;

          case op.IF_NOT_ERROR:
            // IF_NOT_ERROR t, f
            compileCondition(stack.top() + ' !== peg$FAILED', 0);
            break;

          case op.WHILE_NOT_ERROR:
            // WHILE_NOT_ERROR b
            compileLoop(stack.top() + ' !== peg$FAILED', 0);
            break;

          case op.MATCH_ANY:
            // MATCH_ANY a, f, ...
            compileCondition('input.length > peg$currPos', 0);
            break;

          case op.MATCH_STRING:
            // MATCH_STRING s, a, f, ...
            compileCondition(eval(ast.consts[bc[ip + 1]]).length > 1 ? 'input.substr(peg$currPos, ' + eval(ast.consts[bc[ip + 1]]).length + ') === ' + c(bc[ip + 1]) : 'input.charCodeAt(peg$currPos) === ' + eval(ast.consts[bc[ip + 1]]).charCodeAt(0), 1);
            break;

          case op.MATCH_STRING_IC:
            // MATCH_STRING_IC s, a, f, ...
            compileCondition('input.substr(peg$currPos, ' + eval(ast.consts[bc[ip + 1]]).length + ').toLowerCase() === ' + c(bc[ip + 1]), 1);
            break;

          case op.MATCH_REGEXP:
            // MATCH_REGEXP r, a, f, ...
            compileCondition(c(bc[ip + 1]) + '.test(input.charAt(peg$currPos))', 1);
            break;

          case op.ACCEPT_N:
            // ACCEPT_N n
            parts.push(stack.push(bc[ip + 1] > 1 ? 'input.substr(peg$currPos, ' + bc[ip + 1] + ')' : 'input.charAt(peg$currPos)'));
            parts.push(bc[ip + 1] > 1 ? 'peg$currPos += ' + bc[ip + 1] + ';' : 'peg$currPos++;');
            ip += 2;
            break;

          case op.ACCEPT_STRING:
            // ACCEPT_STRING s
            parts.push(stack.push(c(bc[ip + 1])));
            parts.push(eval(ast.consts[bc[ip + 1]]).length > 1 ? 'peg$currPos += ' + eval(ast.consts[bc[ip + 1]]).length + ';' : 'peg$currPos++;');
            ip += 2;
            break;

          case op.FAIL:
            // FAIL e
            parts.push(stack.push('peg$FAILED'));
            parts.push('if (peg$silentFails === 0) { peg$fail(' + c(bc[ip + 1]) + '); }');
            ip += 2;
            break;

          case op.LOAD_SAVED_POS:
            // LOAD_SAVED_POS p
            parts.push('peg$savedPos = ' + stack.index(bc[ip + 1]) + ';');
            ip += 2;
            break;

          case op.UPDATE_SAVED_POS:
            // UPDATE_SAVED_POS
            parts.push('peg$savedPos = peg$currPos;');
            ip++;
            break;

          case op.CALL:
            // CALL f, n, pc, p1, p2, ..., pN
            compileCall();
            break;

          case op.RULE:
            // RULE r
            parts.push(stack.push("peg$parse" + ast.rules[bc[ip + 1]].name + "()"));
            ip += 2;
            break;

          case op.SILENT_FAILS_ON:
            // SILENT_FAILS_ON
            parts.push('peg$silentFails++;');
            ip++;
            break;

          case op.SILENT_FAILS_OFF:
            // SILENT_FAILS_OFF
            parts.push('peg$silentFails--;');
            ip++;
            break;

          default:
            throw new Error("Invalid opcode: " + bc[ip] + ".");
        }
      }

      return parts.join('\n');
    }

    code = compile(rule.bytecode);
    parts.push('function peg$parse' + rule.name + '() {');

    if (options.trace) {
      parts.push(['  var ' + arrays.map(arrays.range(0, stack.maxSp + 1), s).join(', ') + ',', '      startPos = peg$currPos;'].join('\n'));
    } else {
      parts.push('  var ' + arrays.map(arrays.range(0, stack.maxSp + 1), s).join(', ') + ';');
    }

    parts.push(indent2(generateRuleHeader('"' + js.stringEscape(rule.name) + '"', asts.indexOfRule(ast, rule.name))));
    parts.push(indent2(code));
    parts.push(indent2(generateRuleFooter('"' + js.stringEscape(rule.name) + '"', s(0))));
    parts.push('}');
    return parts.join('\n');
  }

  function generateToplevel() {
    var parts = [],
        startRuleIndices,
        startRuleIndex,
        startRuleFunctions,
        startRuleFunction,
        ruleNames;
    parts.push(['function peg$subclass(child, parent) {', '  function ctor() { this.constructor = child; }', '  ctor.prototype = parent.prototype;', '  child.prototype = new ctor();', '}', '', 'function peg$SyntaxError(message, expected, found, location) {', '  this.message  = message;', '  this.expected = expected;', '  this.found    = found;', '  this.location = location;', '  this.name     = "SyntaxError";', '', '  if (typeof Error.captureStackTrace === "function") {', '    Error.captureStackTrace(this, peg$SyntaxError);', '  }', '}', '', 'peg$subclass(peg$SyntaxError, Error);', '', 'peg$SyntaxError.buildMessage = function(expected, found) {', '  var DESCRIBE_EXPECTATION_FNS = {', '        literal: function(expectation) {', '          return "\\\"" + literalEscape(expectation.text) + "\\\"";', '        },', '', '        "class": function(expectation) {', '          var escapedParts = "",', '              i;', '', '          for (i = 0; i < expectation.parts.length; i++) {', '            escapedParts += expectation.parts[i] instanceof Array', '              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])', '              : classEscape(expectation.parts[i]);', '          }', '', '          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";', '        },', '', '        any: function(expectation) {', '          return "any character";', '        },', '', '        end: function(expectation) {', '          return "end of input";', '        },', '', '        other: function(expectation) {', '          return expectation.description;', '        }', '      };', '', '  function hex(ch) {', '    return ch.charCodeAt(0).toString(16).toUpperCase();', '  }', '', '  function literalEscape(s) {', '    return s', '      .replace(/\\\\/g, \'\\\\\\\\\')', // backslash
    '      .replace(/"/g,  \'\\\\"\')', // closing double quote
    '      .replace(/\\0/g, \'\\\\0\')', // null
    '      .replace(/\\t/g, \'\\\\t\')', // horizontal tab
    '      .replace(/\\n/g, \'\\\\n\')', // line feed
    '      .replace(/\\r/g, \'\\\\r\')', // carriage return
    '      .replace(/[\\x00-\\x0F]/g,          function(ch) { return \'\\\\x0\' + hex(ch); })', '      .replace(/[\\x10-\\x1F\\x7F-\\x9F]/g, function(ch) { return \'\\\\x\'  + hex(ch); });', '  }', '', '  function classEscape(s) {', '    return s', '      .replace(/\\\\/g, \'\\\\\\\\\')', // backslash
    '      .replace(/\\]/g, \'\\\\]\')', // closing bracket
    '      .replace(/\\^/g, \'\\\\^\')', // caret
    '      .replace(/-/g,  \'\\\\-\')', // dash
    '      .replace(/\\0/g, \'\\\\0\')', // null
    '      .replace(/\\t/g, \'\\\\t\')', // horizontal tab
    '      .replace(/\\n/g, \'\\\\n\')', // line feed
    '      .replace(/\\r/g, \'\\\\r\')', // carriage return
    '      .replace(/[\\x00-\\x0F]/g,          function(ch) { return \'\\\\x0\' + hex(ch); })', '      .replace(/[\\x10-\\x1F\\x7F-\\x9F]/g, function(ch) { return \'\\\\x\'  + hex(ch); });', '  }', '', '  function describeExpectation(expectation) {', '    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);', '  }', '', '  function describeExpected(expected) {', '    var descriptions = new Array(expected.length),', '        i, j;', '', '    for (i = 0; i < expected.length; i++) {', '      descriptions[i] = describeExpectation(expected[i]);', '    }', '', '    descriptions.sort();', '', '    if (descriptions.length > 0) {', '      for (i = 1, j = 1; i < descriptions.length; i++) {', '        if (descriptions[i - 1] !== descriptions[i]) {', '          descriptions[j] = descriptions[i];', '          j++;', '        }', '      }', '      descriptions.length = j;', '    }', '', '    switch (descriptions.length) {', '      case 1:', '        return descriptions[0];', '', '      case 2:', '        return descriptions[0] + " or " + descriptions[1];', '', '      default:', '        return descriptions.slice(0, -1).join(", ")', '          + ", or "', '          + descriptions[descriptions.length - 1];', '    }', '  }', '', '  function describeFound(found) {', '    return found ? "\\"" + literalEscape(found) + "\\"" : "end of input";', '  }', '', '  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";', '};', ''].join('\n'));

    if (options.trace) {
      parts.push(['function peg$DefaultTracer() {', '  this.indentLevel = 0;', '}', '', 'peg$DefaultTracer.prototype.trace = function(event) {', '  var that = this;', '', '  function log(event) {', '    function repeat(string, n) {', '       var result = "", i;', '', '       for (i = 0; i < n; i++) {', '         result += string;', '       }', '', '       return result;', '    }', '', '    function pad(string, length) {', '      return string + repeat(" ", length - string.length);', '    }', '', '    if (typeof console === "object") {', // IE 8-10
      '      console.log(', '        event.location.start.line + ":" + event.location.start.column + "-"', '          + event.location.end.line + ":" + event.location.end.column + " "', '          + pad(event.type, 10) + " "', '          + repeat("  ", that.indentLevel) + event.rule', '      );', '    }', '  }', '', '  switch (event.type) {', '    case "rule.enter":', '      log(event);', '      this.indentLevel++;', '      break;', '', '    case "rule.match":', '      this.indentLevel--;', '      log(event);', '      break;', '', '    case "rule.fail":', '      this.indentLevel--;', '      log(event);', '      break;', '', '    default:', '      throw new Error("Invalid event type: " + event.type + ".");', '  }', '};', ''].join('\n'));
    }

    parts.push(['function peg$parse(input, options) {', '  options = options !== void 0 ? options : {};', '', '  var peg$FAILED = {},', ''].join('\n'));

    if (options.optimize === "size") {
      startRuleIndices = '{ ' + arrays.map(options.allowedStartRules, function (r) {
        return r + ': ' + asts.indexOfRule(ast, r);
      }).join(', ') + ' }';
      startRuleIndex = asts.indexOfRule(ast, options.allowedStartRules[0]);
      parts.push(['      peg$startRuleIndices = ' + startRuleIndices + ',', '      peg$startRuleIndex   = ' + startRuleIndex + ','].join('\n'));
    } else {
      startRuleFunctions = '{ ' + arrays.map(options.allowedStartRules, function (r) {
        return r + ': peg$parse' + r;
      }).join(', ') + ' }';
      startRuleFunction = 'peg$parse' + options.allowedStartRules[0];
      parts.push(['      peg$startRuleFunctions = ' + startRuleFunctions + ',', '      peg$startRuleFunction  = ' + startRuleFunction + ','].join('\n'));
    }

    parts.push('');
    parts.push(indent6(generateTables()));
    parts.push(['', '      peg$currPos          = 0,', '      peg$savedPos         = 0,', '      peg$posDetailsCache  = [{ line: 1, column: 1 }],', '      peg$maxFailPos       = 0,', '      peg$maxFailExpected  = [],', '      peg$silentFails      = 0,', // 0 = report failures, > 0 = silence failures
    ''].join('\n'));

    if (options.cache) {
      parts.push(['      peg$resultsCache = {},', ''].join('\n'));
    }

    if (options.trace) {
      if (options.optimize === "size") {
        ruleNames = '[' + arrays.map(ast.rules, function (r) {
          return '"' + js.stringEscape(r.name) + '"';
        }).join(', ') + ']';
        parts.push(['      peg$ruleNames = ' + ruleNames + ',', ''].join('\n'));
      }

      parts.push(['      peg$tracer = "tracer" in options ? options.tracer : new peg$DefaultTracer(),', ''].join('\n'));
    }

    parts.push(['      peg$result;', ''].join('\n'));

    if (options.optimize === "size") {
      parts.push(['  if ("startRule" in options) {', '    if (!(options.startRule in peg$startRuleIndices)) {', '      throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");', '    }', '', '    peg$startRuleIndex = peg$startRuleIndices[options.startRule];', '  }'].join('\n'));
    } else {
      parts.push(['  if ("startRule" in options) {', '    if (!(options.startRule in peg$startRuleFunctions)) {', '      throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");', '    }', '', '    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];', '  }'].join('\n'));
    }

    parts.push(['', '  function text() {', '    return input.substring(peg$savedPos, peg$currPos);', '  }', '', '  function location() {', '    return peg$computeLocation(peg$savedPos, peg$currPos);', '  }', '', '  function expected(description, location) {', '    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)', '', '    throw peg$buildStructuredError(', '      [peg$otherExpectation(description)],', '      input.substring(peg$savedPos, peg$currPos),', '      location', '    );', '  }', '', '  function error(message, location) {', '    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)', '', '    throw peg$buildSimpleError(message, location);', '  }', '', '  function peg$literalExpectation(text, ignoreCase) {', '    return { type: "literal", text: text, ignoreCase: ignoreCase };', '  }', '', '  function peg$classExpectation(parts, inverted, ignoreCase) {', '    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };', '  }', '', '  function peg$anyExpectation() {', '    return { type: "any" };', '  }', '', '  function peg$endExpectation() {', '    return { type: "end" };', '  }', '', '  function peg$otherExpectation(description) {', '    return { type: "other", description: description };', '  }', '', '  function peg$computePosDetails(pos) {', '    var details = peg$posDetailsCache[pos], p;', '', '    if (details) {', '      return details;', '    } else {', '      p = pos - 1;', '      while (!peg$posDetailsCache[p]) {', '        p--;', '      }', '', '      details = peg$posDetailsCache[p];', '      details = {', '        line:   details.line,', '        column: details.column', '      };', '', '      while (p < pos) {', '        if (input.charCodeAt(p) === 10) {', '          details.line++;', '          details.column = 1;', '        } else {', '          details.column++;', '        }', '', '        p++;', '      }', '', '      peg$posDetailsCache[pos] = details;', '      return details;', '    }', '  }', '', '  function peg$computeLocation(startPos, endPos) {', '    var startPosDetails = peg$computePosDetails(startPos),', '        endPosDetails   = peg$computePosDetails(endPos);', '', '    return {', '      start: {', '        offset: startPos,', '        line:   startPosDetails.line,', '        column: startPosDetails.column', '      },', '      end: {', '        offset: endPos,', '        line:   endPosDetails.line,', '        column: endPosDetails.column', '      }', '    };', '  }', '', '  function peg$fail(expected) {', '    if (peg$currPos < peg$maxFailPos) { return; }', '', '    if (peg$currPos > peg$maxFailPos) {', '      peg$maxFailPos = peg$currPos;', '      peg$maxFailExpected = [];', '    }', '', '    peg$maxFailExpected.push(expected);', '  }', '', '  function peg$buildSimpleError(message, location) {', '    return new peg$SyntaxError(message, null, null, location);', '  }', '', '  function peg$buildStructuredError(expected, found, location) {', '    return new peg$SyntaxError(', '      peg$SyntaxError.buildMessage(expected, found),', '      expected,', '      found,', '      location', '    );', '  }', ''].join('\n'));

    if (options.optimize === "size") {
      parts.push(indent2(generateInterpreter()));
      parts.push('');
    } else {
      arrays.each(ast.rules, function (rule) {
        parts.push(indent2(generateRuleFunction(rule)));
        parts.push('');
      });
    }

    if (ast.initializer) {
      parts.push(indent2(ast.initializer.code));
      parts.push('');
    }

    if (options.optimize === "size") {
      parts.push('  peg$result = peg$parseRule(peg$startRuleIndex);');
    } else {
      parts.push('  peg$result = peg$startRuleFunction();');
    }

    parts.push(['', '  if (peg$result !== peg$FAILED && peg$currPos === input.length) {', '    return peg$result;', '  } else {', '    if (peg$result !== peg$FAILED && peg$currPos < input.length) {', '      peg$fail(peg$endExpectation());', '    }', '', '    throw peg$buildStructuredError(', '      peg$maxFailExpected,', '      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,', '      peg$maxFailPos < input.length', '        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)', '        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)', '    );', '  }', '}'].join('\n'));
    return parts.join('\n');
  }

  function generateWrapper(toplevelCode) {
    function generateGeneratedByComment() {
      return ['/*', ' * Generated by PEG.js 0.10.0.', ' *', ' * http://pegjs.org/', ' */'].join('\n');
    }

    function generateParserObject() {
      return options.trace ? ['{', '  SyntaxError:   peg$SyntaxError,', '  DefaultTracer: peg$DefaultTracer,', '  parse:         peg$parse', '}'].join('\n') : ['{', '  SyntaxError: peg$SyntaxError,', '  parse:       peg$parse', '}'].join('\n');
    }

    var generators = {
      bare: function () {
        return [generateGeneratedByComment(), '(function() {', '  "use strict";', '', indent2(toplevelCode), '', indent2('return ' + generateParserObject() + ';'), '})()'].join('\n');
      },
      commonjs: function () {
        var parts = [],
            dependencyVars = objects.keys(options.dependencies),
            requires = arrays.map(dependencyVars, function (variable) {
          return variable + ' = require("' + js.stringEscape(options.dependencies[variable]) + '")';
        });
        parts.push([generateGeneratedByComment(), '', '"use strict";', ''].join('\n'));

        if (requires.length > 0) {
          parts.push('var ' + requires.join(', ') + ';');
          parts.push('');
        }

        parts.push([toplevelCode, '', 'module.exports = ' + generateParserObject() + ';', ''].join('\n'));
        return parts.join('\n');
      },
      amd: function () {
        var dependencyIds = objects.values(options.dependencies),
            dependencyVars = objects.keys(options.dependencies),
            dependencies = '[' + arrays.map(dependencyIds, function (id) {
          return '"' + js.stringEscape(id) + '"';
        }).join(', ') + ']',
            params = dependencyVars.join(', ');
        return [generateGeneratedByComment(), 'define(' + dependencies + ', function(' + params + ') {', '  "use strict";', '', indent2(toplevelCode), '', indent2('return ' + generateParserObject() + ';'), '});', ''].join('\n');
      },
      globals: function () {
        return [generateGeneratedByComment(), '(function(root) {', '  "use strict";', '', indent2(toplevelCode), '', indent2('root.' + options.exportVar + ' = ' + generateParserObject() + ';'), '})(this);', ''].join('\n');
      },
      umd: function () {
        var parts = [],
            dependencyIds = objects.values(options.dependencies),
            dependencyVars = objects.keys(options.dependencies),
            dependencies = '[' + arrays.map(dependencyIds, function (id) {
          return '"' + js.stringEscape(id) + '"';
        }).join(', ') + ']',
            requires = arrays.map(dependencyIds, function (id) {
          return 'require("' + js.stringEscape(id) + '")';
        }).join(', '),
            params = dependencyVars.join(', ');
        parts.push([generateGeneratedByComment(), '(function(root, factory) {', '  if (typeof define === "function" && define.amd) {', '    define(' + dependencies + ', factory);', '  } else if (typeof module === "object" && module.exports) {', '    module.exports = factory(' + requires + ');'].join('\n'));

        if (options.exportVar !== null) {
          parts.push(['  } else {', '    root.' + options.exportVar + ' = factory();'].join('\n'));
        }

        parts.push(['  }', '})(this, function(' + params + ') {', '  "use strict";', '', indent2(toplevelCode), '', indent2('return ' + generateParserObject() + ';'), '});', ''].join('\n'));
        return parts.join('\n');
      }
    };
    return generators[options.format]();
  }

  ast.code = generateWrapper(generateToplevel());
}

module.exports = generateJS;
},{"../../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../../utils/objects":"node_modules/pegjs/lib/utils/objects.js","../asts":"node_modules/pegjs/lib/compiler/asts.js","../opcodes":"node_modules/pegjs/lib/compiler/opcodes.js","../js":"node_modules/pegjs/lib/compiler/js.js"}],"node_modules/pegjs/lib/compiler/index.js":[function(require,module,exports) {
"use strict";

var arrays = require("../utils/arrays"),
    objects = require("../utils/objects");

var compiler = {
  /*
   * AST node visitor builder. Useful mainly for plugins which manipulate the
   * AST.
   */
  visitor: require("./visitor"),

  /*
   * Compiler passes.
   *
   * Each pass is a function that is passed the AST. It can perform checks on it
   * or modify it as needed. If the pass encounters a semantic error, it throws
   * |peg.GrammarError|.
   */
  passes: {
    check: {
      reportUndefinedRules: require("./passes/report-undefined-rules"),
      reportDuplicateRules: require("./passes/report-duplicate-rules"),
      reportDuplicateLabels: require("./passes/report-duplicate-labels"),
      reportInfiniteRecursion: require("./passes/report-infinite-recursion"),
      reportInfiniteRepetition: require("./passes/report-infinite-repetition")
    },
    transform: {
      removeProxyRules: require("./passes/remove-proxy-rules")
    },
    generate: {
      generateBytecode: require("./passes/generate-bytecode"),
      generateJS: require("./passes/generate-js")
    }
  },

  /*
   * Generates a parser from a specified grammar AST. Throws |peg.GrammarError|
   * if the AST contains a semantic error. Note that not all errors are detected
   * during the generation and some may protrude to the generated parser and
   * cause its malfunction.
   */
  compile: function (ast, passes, options) {
    options = options !== void 0 ? options : {};
    var stage;
    options = objects.clone(options);
    objects.defaults(options, {
      allowedStartRules: [ast.rules[0].name],
      cache: false,
      dependencies: {},
      exportVar: null,
      format: "bare",
      optimize: "speed",
      output: "parser",
      trace: false
    });

    for (stage in passes) {
      if (passes.hasOwnProperty(stage)) {
        arrays.each(passes[stage], function (p) {
          p(ast, options);
        });
      }
    }

    switch (options.output) {
      case "parser":
        return eval(ast.code);

      case "source":
        return ast.code;
    }
  }
};
module.exports = compiler;
},{"../utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","../utils/objects":"node_modules/pegjs/lib/utils/objects.js","./visitor":"node_modules/pegjs/lib/compiler/visitor.js","./passes/report-undefined-rules":"node_modules/pegjs/lib/compiler/passes/report-undefined-rules.js","./passes/report-duplicate-rules":"node_modules/pegjs/lib/compiler/passes/report-duplicate-rules.js","./passes/report-duplicate-labels":"node_modules/pegjs/lib/compiler/passes/report-duplicate-labels.js","./passes/report-infinite-recursion":"node_modules/pegjs/lib/compiler/passes/report-infinite-recursion.js","./passes/report-infinite-repetition":"node_modules/pegjs/lib/compiler/passes/report-infinite-repetition.js","./passes/remove-proxy-rules":"node_modules/pegjs/lib/compiler/passes/remove-proxy-rules.js","./passes/generate-bytecode":"node_modules/pegjs/lib/compiler/passes/generate-bytecode.js","./passes/generate-js":"node_modules/pegjs/lib/compiler/passes/generate-js.js"}],"node_modules/pegjs/lib/peg.js":[function(require,module,exports) {
"use strict";

var arrays = require("./utils/arrays"),
    objects = require("./utils/objects");

var peg = {
  /* PEG.js version (uses semantic versioning). */
  VERSION: "0.10.0",
  GrammarError: require("./grammar-error"),
  parser: require("./parser"),
  compiler: require("./compiler"),

  /*
   * Generates a parser from a specified grammar and returns it.
   *
   * The grammar must be a string in the format described by the metagramar in
   * the parser.pegjs file.
   *
   * Throws |peg.parser.SyntaxError| if the grammar contains a syntax error or
   * |peg.GrammarError| if it contains a semantic error. Note that not all
   * errors are detected during the generation and some may protrude to the
   * generated parser and cause its malfunction.
   */
  generate: function (grammar, options) {
    options = options !== void 0 ? options : {};

    function convertPasses(passes) {
      var converted = {},
          stage;

      for (stage in passes) {
        if (passes.hasOwnProperty(stage)) {
          converted[stage] = objects.values(passes[stage]);
        }
      }

      return converted;
    }

    options = objects.clone(options);
    var plugins = "plugins" in options ? options.plugins : [],
        config = {
      parser: peg.parser,
      passes: convertPasses(peg.compiler.passes)
    };
    arrays.each(plugins, function (p) {
      p.use(config, options);
    });
    return peg.compiler.compile(config.parser.parse(grammar), config.passes, options);
  }
};
module.exports = peg;
},{"./utils/arrays":"node_modules/pegjs/lib/utils/arrays.js","./utils/objects":"node_modules/pegjs/lib/utils/objects.js","./grammar-error":"node_modules/pegjs/lib/grammar-error.js","./parser":"node_modules/pegjs/lib/parser.js","./compiler":"node_modules/pegjs/lib/compiler/index.js"}],"node_modules/chess.js/chess.js":[function(require,module,exports) {
var define;
/*
 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

/* minified license below  */

/* @license
 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */

var Chess = function(fen) {

  /* jshint indent: false */

  var BLACK = 'b';
  var WHITE = 'w';

  var EMPTY = -1;

  var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';

  var SYMBOLS = 'pnbrqkPNBRQK';

  var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14,  18, 33, 31,  14],
    b: [-17, -15,  17,  15],
    r: [-16,   1,  16,  -1],
    q: [-17, -16, -15,   1,  17, 16, 15,  -1],
    k: [-17, -16, -15,   1,  17, 16, 15,  -1]
  };

  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };

  var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;

  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h1, flag: BITS.KSIDE_CASTLE}],
    b: [{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h8, flag: BITS.KSIDE_CASTLE}]
  };

  var board = new Array(128);
  var kings = {w: EMPTY, b: EMPTY};
  var turn = WHITE;
  var castling = {w: 0, b: 0};
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }

  function clear() {
    board = new Array(128);
    kings = {w: EMPTY, b: EMPTY};
    turn = WHITE;
    castling = {w: 0, b: 0};
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    header = {};
    update_setup(generate_fen());
  }

  function reset() {
    load(DEFAULT_POSITION);
  }

  function load(fen) {
    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;

    if (!validate_fen(fen).valid) {
      return false;
    }

    clear();

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = (piece < 'a') ? WHITE : BLACK;
        put({type: piece.toLowerCase(), color: color}, algebraic(square));
        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }

    ep_square = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);

    update_setup(generate_fen());

    return true;
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen) {
    var errors = {
       0: 'No errors.',
       1: 'FEN string must contain six space-delimited fields.',
       2: '6th field (move number) must be a positive integer.',
       3: '5th field (half move counter) must be a non-negative integer.',
       4: '4th field (en-passant square) is invalid.',
       5: '3rd field (castling availability) is invalid.',
       6: '2nd field (side to move) is invalid.',
       7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
       8: '1st field (piece positions) is invalid [consecutive numbers].',
       9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    };

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return {valid: false, error_number: 1, error: errors[1]};
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) <= 0)) {
      return {valid: false, error_number: 2, error: errors[2]};
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) < 0)) {
      return {valid: false, error_number: 3, error: errors[3]};
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return {valid: false, error_number: 4, error: errors[4]};
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if( !/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return {valid: false, error_number: 5, error: errors[5]};
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return {valid: false, error_number: 6, error: errors[6]};
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return {valid: false, error_number: 7, error: errors[7]};
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0;
      var previous_was_number = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return {valid: false, error_number: 8, error: errors[8]};
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return {valid: false, error_number: 9, error: errors[9]};
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return {valid: false, error_number: 10, error: errors[10]};
      }
    }

    if ((tokens[3][1] == '3' && tokens[1] == 'w') ||
        (tokens[3][1] == '6' && tokens[1] == 'b')) {
          return {valid: false, error_number: 11, error: errors[11]};
    }

    /* everything's okay! */
    return {valid: true, error_number: 0, error: errors[0]};
  }

  function generate_fen() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;

        fen += (color === WHITE) ?
                 piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = '';
    if (castling[WHITE] & BITS.KSIDE_CASTLE) { cflags += 'K'; }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) { cflags += 'Q'; }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) { cflags += 'k'; }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) { cflags += 'q'; }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    var epflags = (ep_square === EMPTY) ? '-' : algebraic(ep_square);

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
  }

  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' &&
          typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function update_setup(fen) {
    if (history.length > 0) return;

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1';
      header['FEN'] = fen;
    } else {
      delete header['SetUp'];
      delete header['FEN'];
    }
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return (piece) ? {type: piece.type, color: piece.color} : null;
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false;
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false;
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (piece.type == KING &&
        !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
      return false;
    }

    board[sq] = {type: piece.type, color: piece.color};
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }

    update_setup(generate_fen());

    return true;
  }

  function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }

    update_setup(generate_fen());

    return piece;
  }

  function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
        move.captured = PAWN;
    }
    return move;
  }

  function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (board[from].type === PAWN &&
         (rank(to) === RANK_8 || rank(to) === RANK_1)) {
          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
          for (var i = 0, len = pieces.length; i < len; i++) {
            moves.push(build_move(board, from, to, flags, pieces[i]));
          }
      } else {
       moves.push(build_move(board, from, to, flags));
      }
    }

    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = {b: RANK_7, w: RANK_2};

    var first_sq = SQUARES.a8;
    var last_sq = SQUARES.h1;
    var single_square = false;

    /* do we want legal moves? */
    var legal = (typeof options !== 'undefined' && 'legal' in options) ?
                options.legal : true;

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        first_sq = last_sq = SQUARES[options.square];
        single_square = true;
      } else {
        /* invalid square */
        return [];
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
            add_move(board, moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue;

          if (board[square] != null &&
              board[square].color === them) {
              add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
              add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break;

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us) break;
              add_move(board, moves, i, square, BITS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break;
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if ((!single_square) || last_sq === kings[us]) {
      /* king-side castling */
      if (castling[us] & BITS.KSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from + 2;

        if (board[castling_from + 1] == null &&
            board[castling_to]       == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from + 1) &&
            !attacked(them, castling_to)) {
          add_move(board, moves, kings[us] , castling_to,
                   BITS.KSIDE_CASTLE);
        }
      }

      /* queen-side castling */
      if (castling[us] & BITS.QSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from - 2;

        if (board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)) {
          add_move(board, moves, kings[us], castling_to,
                   BITS.QSIDE_CASTLE);
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves;
    }

    /* filter out illegal moves */
    var legal_moves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }

    return legal_moves;
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move, sloppy) {

    var output = '';

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O';
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O';
    } else {
      var disambiguator = get_disambiguator(move, sloppy);

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';
      }

      output += algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase();
      }
    }

    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    undo_move();

    return output;
  }

  // parses all of the decorators out of a SAN string
  function stripped_san(move) {
    return move.replace(/=/,'').replace(/[+#]?[?!]*$/,'');
  }

  function attacked(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue;

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true;
          } else {
            if (piece.color === BLACK) return true;
          }
          continue;
        }

        /* if the piece is a knight or a king */
        if (piece.type === 'n' || piece.type === 'k') return true;

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (board[j] != null) { blocked = true; break; }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }

  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }

  function in_check() {
    return king_attacked(turn);
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }

  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }

  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;

    for (var i = SQUARES.a8; i<= SQUARES.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 0x88) { i += 7; continue; }

      var piece = board[i];
      if (piece) {
        pieces[piece.type] = (piece.type in pieces) ?
                              pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }

    /* k vs. k */
    if (num_pieces === 2) { return true; }

    /* k vs. kn .... or .... k vs. kb */
    else if (num_pieces === 3 && (pieces[BISHOP] === 1 ||
                                 pieces[KNIGHT] === 1)) { return true; }

    /* kb vs. kb where any number of bishops are all on the same color */
    else if (num_pieces === pieces[BISHOP] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) { return true; }
    }

    return false;
  }

  function in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undo_move();
      if (!move) break;
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen().split(' ').slice(0,4).join(' ');

      /* has the position occurred three or move times */
      positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }

    return repetition;
  }

  function push(move) {
    history.push({
      move: move,
      kings: {b: kings.b, w: kings.w},
      turn: turn,
      castling: {b: castling.b, w: castling.w},
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number
    });
  }

  function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = {type: move.promotion, color: us};
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }

      /* turn off castling */
      castling[us] = '';
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move.from === ROOKS[us][i].square &&
            castling[us] & ROOKS[us][i].flag) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move.to === ROOKS[them][i].square &&
            castling[them] & ROOKS[them][i].flag) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }

    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }

  function undo_move() {
    var old = history.pop();
    if (old == null) { return null; }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;

    var us = turn;
    var them = swap_color(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece;  // to undo any promotions
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = {type: move.captured, color: them};
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = {type: PAWN, color: them};
    }


    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }

      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }

    return move;
  }

  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move, sloppy) {
    var moves = generate_moves({legal: !sloppy});

    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var same_rank = 0;
    var same_file = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from;
      var ambig_to = moves[i].to;
      var ambig_piece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++;

        if (rank(from) === rank(ambig_from)) {
          same_rank++;
        }

        if (file(from) === file(ambig_from)) {
          same_file++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from);
      }
      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      else if (same_file > 0) {
        return algebraic(from).charAt(1);
      }
      /* else use the file symbol */
      else {
        return algebraic(from).charAt(0);
      }
    }

    return '';
  }

  function ascii() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |';
      }

      /* empty piece */
      if (board[i] == null) {
        s += ' . ';
      } else {
        var piece = board[i].type;
        var color = board[i].color;
        var symbol = (color === WHITE) ?
                     piece.toUpperCase() : piece.toLowerCase();
        s += ' ' + symbol + ' ';
      }

      if ((i + 1) & 0x88) {
        s += '|\n';
        i += 8;
      }
    }
    s += '   +------------------------+\n';
    s += '     a  b  c  d  e  f  g  h\n';

    return s;
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function move_from_san(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?!
    var clean_move = stripped_san(move);

    // if we're using the sloppy parser run a regex to grab piece, to, and from
    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
    if (sloppy) {
      var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (matches) {
        var piece = matches[1];
        var from = matches[2];
        var to = matches[3];
        var promotion = matches[4];
      }
    }

    var moves = generate_moves();
    for (var i = 0, len = moves.length; i < len; i++) {
      // try the strict parser first, then the sloppy parser if requested
      // by the user
      if ((clean_move === stripped_san(move_to_san(moves[i]))) ||
          (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))) {
        return moves[i];
      } else {
        if (matches &&
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[from] == moves[i].from &&
            SQUARES[to] == moves[i].to &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
          return moves[i];
        }
      }
    }

    return null;
  }


  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i) {
    return i >> 4;
  }

  function file(i) {
    return i & 15;
  }

  function algebraic(i){
    var f = file(i), r = rank(i);
    return 'abcdefgh'.substring(f,f+1) + '87654321'.substring(r,r+1);
  }

  function swap_color(c) {
    return c === WHITE ? BLACK : WHITE;
  }

  function is_digit(c) {
    return '0123456789'.indexOf(c) !== -1;
  }

  /* pretty = external move object */
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move, false);
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = '';

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move;
  }

  function clone(obj) {
    var dupe = (obj instanceof Array) ? [] : {};

    for (var property in obj) {
      if (typeof property === 'object') {
        dupe[property] = clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe;
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({legal: false});
    var nodes = 0;
    var color = turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }

    return nodes;
  }

  return {
    /***************************************************************************
     * PUBLIC CONSTANTS (is there a better way to do this?)
     **************************************************************************/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function() {
                /* from the ECMA-262 spec (section 12.6.4):
                 * "The mechanics of enumerating the properties ... is
                 * implementation dependent"
                 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
                 * ordered correctly
                 */
                var keys = [];
                for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
                  if (i & 0x88) { i += 7; continue; }
                  keys.push(algebraic(i));
                }
                return keys;
              })(),
    FLAGS: FLAGS,

    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function(fen) {
      return load(fen);
    },

    reset: function() {
      return reset();
    },

    moves: function(options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves(options);
      var moves = [];

      for (var i = 0, len = ugly_moves.length; i < len; i++) {

        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (typeof options !== 'undefined' && 'verbose' in options &&
            options.verbose) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], false));
        }
      }

      return moves;
    },

    in_check: function() {
      return in_check();
    },

    in_checkmate: function() {
      return in_checkmate();
    },

    in_stalemate: function() {
      return in_stalemate();
    },

    in_draw: function() {
      return half_moves >= 100 ||
             in_stalemate() ||
             insufficient_material() ||
             in_threefold_repetition();
    },

    insufficient_material: function() {
      return insufficient_material();
    },

    in_threefold_repetition: function() {
      return in_threefold_repetition();
    },

    game_over: function() {
      return half_moves >= 100 ||
             in_checkmate() ||
             in_stalemate() ||
             insufficient_material() ||
             in_threefold_repetition();
    },

    validate_fen: function(fen) {
      return validate_fen(fen);
    },

    fen: function() {
      return generate_fen();
    },

    pgn: function(options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
       */
      var newline = (typeof options === 'object' &&
                     typeof options.newline_char === 'string') ?
                     options.newline_char : '\n';
      var max_width = (typeof options === 'object' &&
                       typeof options.max_width === 'number') ?
                       options.max_width : 0;
      var result = [];
      var header_exists = false;

      /* add the PGN header headerrmation */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push('[' + i + ' \"' + header[i] + '\"]' + newline);
        header_exists = true;
      }

      if (header_exists && history.length) {
        result.push(newline);
      }

      /* pop all of history onto reversed_history */
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      var moves = [];
      var move_string = '';

      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
      while (reversed_history.length > 0) {
        var move = reversed_history.pop();

        /* if the position started with black to move, start PGN with 1. ... */
        if (!history.length && move.color === 'b') {
          move_string = move_number + '. ...';
        } else if (move.color === 'w') {
          /* store the previous generated move_string if we have one */
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + '.';
        }

        move_string = move_string + ' ' + move_to_san(move, false);
        make_move(move);
      }

      /* are there any other leftover moves? */
      if (move_string.length) {
        moves.push(move_string);
      }

      /* is there a result? */
      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result);
      }

      /* history should be back to what is was before we started generating PGN,
       * so join together moves
       */
      if (max_width === 0) {
        return result.join('') + moves.join(' ');
      }

      /* wrap the PGN output at max_width */
      var current_width = 0;
      for (var i = 0; i < moves.length; i++) {
        /* if the current move will push past max_width */
        if (current_width + moves[i].length > max_width && i !== 0) {

          /* don't end the line with whitespace */
          if (result[result.length - 1] === ' ') {
            result.pop();
          }

          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(' ');
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }

      return result.join('');
    },

    load_pgn: function(pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
                    options.sloppy : false;

      function mask(str) {
        return str.replace(/\\/g, '\\');
      }

      function has_keys(object) {
        for (var key in object) {
          return true;
        }
        return false;
      }

      function parse_pgn_header(header, options) {
        var newline_char = (typeof options === 'object' &&
                            typeof options.newline_char === 'string') ?
                            options.newline_char : '\r?\n';
        var header_obj = {};
        var headers = header.split(new RegExp(mask(newline_char)));
        var key = '';
        var value = '';

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
          if (trim(key).length > 0) {
            header_obj[key] = value;
          }
        }

        return header_obj;
      }

      var newline_char = (typeof options === 'object' &&
                          typeof options.newline_char === 'string') ?
                          options.newline_char : '\r?\n';
      var regex = new RegExp('^(\\[(.|' + mask(newline_char) + ')*\\])' +
                             '(' + mask(newline_char) + ')*' +
                             '1.(' + mask(newline_char) + '|.)*$', 'g');

      /* get header part of the PGN file */
      var header_string = pgn.replace(regex, '$1');

      /* no info part given, begins with moves */
      if (header_string[0] !== '[') {
        header_string = '';
      }

      reset();

      /* parse PGN header */
      var headers = parse_pgn_header(header_string, options);
      for (var key in headers) {
        set_header([key, headers[key]]);
      }

      /* load the starting position indicated by [Setup '1'] and
      * [FEN position] */
      if (headers['SetUp'] === '1') {
          if (!(('FEN' in headers) && load(headers['FEN']))) {
            return false;
          }
      }

      /* delete header to get the moves */
      var ms = pgn.replace(header_string, '').replace(new RegExp(mask(newline_char), 'g'), ' ');

      /* delete comments */
      ms = ms.replace(/(\{[^}]+\})+?/g, '');

      /* delete recursive annotation variations */
      var rav_regex = /(\([^\(\)]+\))+?/g
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, '');
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, '');

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, '');

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, '');

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));

      /* delete empty entries */
      moves = moves.join(',').replace(/,,+/g, ',').split(',');
      var move = '';

      for (var half_move = 0; half_move < moves.length - 1; half_move++) {
        move = move_from_san(moves[half_move], sloppy);

        /* move not possible! (don't clear the board to examine to show the
         * latest valid position)
         */
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }

      /* examine last move */
      move = moves[moves.length - 1];
      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
        if (has_keys(header) && typeof header.Result === 'undefined') {
          set_header(['Result', move]);
        }
      }
      else {
        move = move_from_san(move, sloppy);
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }
      return true;
    },

    header: function() {
      return set_header(arguments);
    },

    ascii: function() {
      return ascii();
    },

    turn: function() {
      return turn;
    },

    move: function(move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
                    options.sloppy : false;

      var move_obj = null;

      if (typeof move === 'string') {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === 'object') {
        var moves = generate_moves();

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (move.from === algebraic(moves[i].from) &&
              move.to === algebraic(moves[i].to) &&
              (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)) {
            move_obj = moves[i];
            break;
          }
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null;
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var pretty_move = make_pretty(move_obj);

      make_move(move_obj);

      return pretty_move;
    },

    undo: function() {
      var move = undo_move();
      return (move) ? make_pretty(move) : null;
    },

    clear: function() {
      return clear();
    },

    put: function(piece, square) {
      return put(piece, square);
    },

    get: function(square) {
      return get(square);
    },

    remove: function(square) {
      return remove(square);
    },

    perft: function(depth) {
      return perft(depth);
    },

    square_color: function(square) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square];
        return ((rank(sq_0x88) + file(sq_0x88)) % 2 === 0) ? 'light' : 'dark';
      }

      return null;
    },

    history: function(options) {
      var reversed_history = [];
      var move_history = [];
      var verbose = (typeof options !== 'undefined' && 'verbose' in options &&
                     options.verbose);

      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move));
        }
        make_move(move);
      }

      return move_history;
    }

  };
};

/* export Chess object if using node or any other CommonJS compatible
 * environment */
if (typeof exports !== 'undefined') exports.Chess = Chess;
/* export Chess object for any RequireJS compatible environment */
if (typeof define !== 'undefined') define( function () { return Chess;  });

},{}],"utils/pgnutils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNext = exports.mergeTrees = exports.parseMultiple = exports.allChildrenPlayed = exports.updatePlayedStatus = exports.addCommentAndNags = exports.promoteNode = exports.deleteNode = exports.addNode = exports.parsepgn = void 0;

var _pegjs = require("pegjs");

var _chess = require("chess.js");

var grammar = "{\n    function flatten(a, acc = []) {\n        for (var i = 0; i < a.length; i++) {\n            if (Array.isArray(a[i])) {\n                flatten(a[i], acc);\n            } else {\n                acc.push(a[i]);\n            }\n        }\n        return acc;\n    }\n    function make_header(hn,hv) {\n        var m = {};\n        m[hn] = hv;\n        return m;\n    }\n    function make_move(move_number, move, nags, ravs, comment) {\n        var m = {};\n        if (move_number) m.move_number = move_number;\n        if (move) m.move = move;\n        if (nags && nags.length) m.nags = nags;\n        if (ravs && ravs.length) m.ravs = ravs;\n        if (comment) m.comment = comment;\n        return m;\n    }\n    function make_rav(moves, result) {\n        return {\n            moves, \n            result\n        };\n    }\n    function make_game(h, c, m, r) {\n        h = h || [];\n        return {\n            headers: h.reduce((acc, x) => Object.assign(acc, x), {}),\n            comment: c,\n            moves: m || [],\n            result: r\n        };\n    }\n}\n\nstart = gs:(game newline*)* EOF {return gs.map(function(g) { return g[0]})}\n\ngame = \n    whitespace*\n    h:headers? \n    c:comment? \n    whitespace* \n    mr:(m:movetext whitespace+ r:result {return [m, r]} / r:result {return [null, r]}) \n    whitespace* {return make_game(h, c, mr[0], mr[1])}\n\nEOF = !.\ndouble_quote = '\"'\nstring = double_quote str:[^\"]* double_quote {return str.join('')}\ninteger = a:[1-9] b:[0-9]* {return parseInt(a+b.join(''), 10)}\nsymbol = chars:[A-Za-z0-9_-]+ {return chars.join('')}\nws = ' ' / '\\f' / '\\t'\nwhitespace = ws / newline\nnewline = '\\n'\n\nheader = '[' hn:symbol ws+ hv:string ']' whitespace* { return make_header(hn,hv) }\nheaders = hs:header+ {return hs}\n\npiece = [NKQRB]\nrank = [a-h]\nfile = [1-8]\ncheck = \"+\"\ncheckmate = \"#\"\ncapture = \"x\"\nperiod = \".\"\nresult = \"1-0\" / \"0-1\" / \"*\" / \"1/2-1/2\"\nmove_number = mn:integer period? (period period)? {return mn}\nsquare = r:rank f:file {return r+f}\npromotion = \"=\" [QRBN]\nnag = chars:(\"$\" integer) {return chars.join('')}\nnag_alts = \"!!\" / \"??\" / \"!?\" / \"?!\" / \"!\" / \"?\"\ncontinuation = period period period\n\ncomment_chars = [^}]\ncomment = \"{\" cc:comment_chars* \"}\" {return cc.join('');}\n\npawn_half_move = (r:rank c:capture)? square promotion?\npiece_half_move = piece capture? square\npiece_disambiguation_half_move = piece (rank / file) capture? square\ncastle_half_move = (\"O-O-O\" / \"O-O\")\n\nhalf_move = m:(continuation? \n    (castle_half_move / \n     piece_disambiguation_half_move / \n     piece_half_move / \n     pawn_half_move) \n    (check / checkmate)? \n    nag_alts?) {return flatten(m).join('');}\n\nmove = mn:move_number? \n       whitespace*\n       m:half_move \n       nags:(whitespace+ n:nag {return n})*\n       com:(whitespace+ c2:comment {return c2})?\n       (whitespace+ comment)*\n       ravs:(whitespace+ r:rav {return r})*\n       {return make_move(mn, m, nags, ravs, com)}\n\nmovetext = first:move rest:(whitespace+ move)* {return first ? [first].concat(rest.map(function(m) {return m[1]})) : []}\n\nrav = \"(\" \n    whitespace* \n    m:movetext \n    whitespace* \n    r:result?\n    whitespace*\n    \")\" {return make_rav(m, r)}\n\n";
var parser = (0, _pegjs.generate)(grammar);
/*
    Returns a node of the form 
    { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' 
        move_number,
        comment,
        fen,
        idx,  // unique index
        parent,
        children:[], 
        played: []  //(for trainer)
    }

 */

var parsepgn = function parsepgn(pgn) {
  var r1 = parser.parse(pgn)[0]; // simple array representation

  console.log("Base structure:", r1); // pprint(r1.moves, "")

  var game = (0, _chess.Chess)();
  return parseOneGame(r1, game);
};

exports.parsepgn = parsepgn;

function parseOneGame(baseGame, game) {
  game.reset();
  var root = {
    fen: game.fen(),
    children: [],
    played: new Set(),
    move_number: 0
  };

  if (baseGame.moves.length > 0) {
    convert(baseGame.moves.slice(), game, root);
  }

  return root;
}

function convert(moves, game, parent) {
  // console.log("Entering" + moves[0])
  var cmove = moves[0];
  var movestr = cmove.move.replace(/\./g, '');
  var node = game.move(movestr); // -> { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' }

  if (node == null) {
    console.log("Unknown move: ", cmove, parent.san);
    return;
  }

  node.fen = game.fen();
  addNode(node, parent, cmove.comment, cmove.nags, cmove.move_number);

  if (moves.length > 1) {
    // console.log(moves.length, "making rec call")
    moves.shift();
    convert(moves, game, node);

    if (cmove.ravs) {
      cmove.ravs.forEach(function (rav) {
        game.load(parent.fen);
        convert(rav.moves.slice(), game, parent);
      });
    }
  }
}

var addNode = function addNode(node, parent, comment, nags, moveNum) {
  node.children = [];
  node.played = new Set();
  node.move_number = moveNum ? moveNum : parent == null ? 1 : node.color == 'b' ? parent.move_number : parent.move_number + 1;
  addCommentAndNags(node, comment, nags);
  node.parent = parent;
  parent.children.push(node);
};

exports.addNode = addNode;

var deleteNode = function deleteNode(node) {
  if (node.parent) {
    var index = node.parent.children.indexOf(node);

    if (index !== -1) {
      node.parent.children.splice(index, 1);
    }
  }
};

exports.deleteNode = deleteNode;

var promoteNode = function promoteNode(node) {
  if (node.parent) {
    var index = node.parent.children.indexOf(node);

    if (index !== -1) {
      node.parent.children.splice(index, 1);
    }

    node.parent.children.unshift(node);
  }
};

exports.promoteNode = promoteNode;

var addCommentAndNags = function addCommentAndNags(node, comment, nags) {
  if (comment && comment.indexOf('[%') < 0) {
    node.comment = comment;
  }

  if (nags) {
    node.nags = nags;
  }
};

exports.addCommentAndNags = addCommentAndNags;

var updatePlayedStatus = function updatePlayedStatus(node) {
  if (allChildrenPlayed(node)) {
    if (node.parent) {
      node.parent.played.add(node);
      updatePlayedStatus(node.parent);
    }
  }
};

exports.updatePlayedStatus = updatePlayedStatus;

var allChildrenPlayed = function allChildrenPlayed(node) {
  for (var i = 0; i < node.children.length; i++) {
    if (!node.played.has(node.children[i])) {
      return false;
    }
  }

  return true;
};

exports.allChildrenPlayed = allChildrenPlayed;

var parseMultiple = function parseMultiple(multipgn) {
  var games = parser.parse(multipgn);
  var game = (0, _chess.Chess)();
  var root = parseOneGame(games[0], game);

  for (var i = 1; i < games.length; i++) {
    var newRoot = parseOneGame(games[i], game);
    mergeTrees(root, newRoot);
  }

  return root;
};

exports.parseMultiple = parseMultiple;

var mergeTrees = function mergeTrees(node1, node2) {
  console.log(node1.san, node2.san);

  if (node1.fen === node2.fen) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var child2 = _step.value;
        var matching = node1.children.filter(function (child) {
          return child2.fen === child.fen;
        });

        if (matching.length === 0) {
          node1.children.push(child2);
        } else {
          mergeTrees(matching[0], child2);
        }
      };

      for (var _iterator = node2.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    throw "Positions do not match";
  }
};

exports.mergeTrees = mergeTrees;

var findNext = function findNext(current, from, to) {
  for (var i = 0; i < current.children.length; i++) {
    var node = current.children[i];

    if (node.from == from && node.to == to) {
      return node;
    }
  }

  return null;
};

exports.findNext = findNext;
},{"pegjs":"node_modules/pegjs/lib/peg.js","chess.js":"node_modules/chess.js/chess.js"}],"actions/game-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardFlippedAction = exports.BOARD_FLIPPED = exports.hintClickedAction = exports.HINT_CLICKED = exports.autoPlayChangedAction = exports.AUTOPLAY_CHANGED = exports.hidePgnChangedAction = exports.HIDE_PGN_CHANGED = exports.playerMadeMoveAction = exports.PLAYER_MADE_MOVE = exports.positionChangedAction = exports.POSITION_CHANGED = exports.gameChangedAction = exports.GAME_CHANGED = void 0;
// move made   ( orig, dest, capturedPiece )
// current changed
var GAME_CHANGED = 'gameChanged';
exports.GAME_CHANGED = GAME_CHANGED;

var gameChangedAction = function gameChangedAction(root, engineColor) {
  return {
    type: GAME_CHANGED,
    root: root,
    engineColor: engineColor
  };
};

exports.gameChangedAction = gameChangedAction;
var POSITION_CHANGED = 'positionChanged';
exports.POSITION_CHANGED = POSITION_CHANGED;

var positionChangedAction = function positionChangedAction(node) {
  return {
    type: POSITION_CHANGED,
    node: node
  };
};

exports.positionChangedAction = positionChangedAction;
var PLAYER_MADE_MOVE = 'playerMadeMove';
exports.PLAYER_MADE_MOVE = PLAYER_MADE_MOVE;

var playerMadeMoveAction = function playerMadeMoveAction(newCurrent) {
  return {
    type: PLAYER_MADE_MOVE,
    newCurrent: newCurrent
  };
};

exports.playerMadeMoveAction = playerMadeMoveAction;
var HIDE_PGN_CHANGED = 'hidePgnChanged';
exports.HIDE_PGN_CHANGED = HIDE_PGN_CHANGED;

var hidePgnChangedAction = function hidePgnChangedAction(checked) {
  return {
    type: HIDE_PGN_CHANGED,
    checked: checked
  };
};

exports.hidePgnChangedAction = hidePgnChangedAction;
var AUTOPLAY_CHANGED = 'autoPlayChanged';
exports.AUTOPLAY_CHANGED = AUTOPLAY_CHANGED;

var autoPlayChangedAction = function autoPlayChangedAction(checked) {
  return {
    type: AUTOPLAY_CHANGED,
    checked: checked
  };
};

exports.autoPlayChangedAction = autoPlayChangedAction;
var HINT_CLICKED = 'hintClicked';
exports.HINT_CLICKED = HINT_CLICKED;

var hintClickedAction = function hintClickedAction() {
  return {
    type: HINT_CLICKED
  };
};

exports.hintClickedAction = hintClickedAction;
var BOARD_FLIPPED = 'boardFlipped';
exports.BOARD_FLIPPED = BOARD_FLIPPED;

var boardFlippedAction = function boardFlippedAction(checked) {
  return {
    type: BOARD_FLIPPED,
    checked: checked
  };
};

exports.boardFlippedAction = boardFlippedAction;
},{}],"components/chessboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.init = void 0;

var _chessground = _interopRequireDefault(require("../assets/libs/chessground"));

var _pgnutils = require("../utils/pgnutils");

var _gameActions = require("../actions/game-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(boardId, nextFunc, store) {
  var ground;
  var options = {
    resizable: true,
    // orientation: 'black',
    // fen: '2r3k1/pp2Qpbp/4b1p1/3p4/3n1PP1/2N4P/Pq6/R2K1B1R w -'
    events: {
      // change: onchange, // called after the situation changes on the board
      // called after a piece has been moved.
      // capturedPiece is undefined or like {color: 'white'; 'role': 'queen'}
      move: function move(orig, dest, capturedPiece) {
        return onMove(orig, dest, capturedPiece, nextFunc, store);
      } // dropNewPiece: onDropNewPiece,
      // select: onSelect, // called when a square is selected
      // insert: onInsert // when the board DOM has been (re)inserted

    }
  };
  resizeBoard();
  ground = (0, _chessground.default)(document.getElementById(boardId), options);
  store.subscribe(function () {
    // console.log(store.getState())
    var _store$getState = store.getState(),
        current = _store$getState.current,
        engineColor = _store$getState.engineColor,
        hint = _store$getState.hint;

    var options = {
      fen: current.fen,
      orientation: engineColor === 'white' ? 'black' : 'white'
    };
    window.setTimeout(function () {
      ground.set(options);

      if (hint) {
        var shapes = getHintShapes(current);
        ground.setShapes(shapes);
      }
    }, 100);
  });
  return ground;
};

exports.init = init;

function getHintShapes(current) {
  var arr = [];
  current.children.forEach(function (child) {
    arr.push({
      orig: child.from,
      dest: child.to,
      brush: 'red'
    });
  });
  return arr;
}

function onMove(orig, dest, capturedPiece, nextFunc, store) {
  var _store$getState2 = store.getState(),
      current = _store$getState2.current;

  var next = nextFunc(orig, dest);
  store.dispatch((0, _gameActions.playerMadeMoveAction)(next));
}

function resizeBoard() {
  var boardElem = document.getElementById("dirty");
  var parentElem = boardElem.parentNode;
  var rect = parentElem.getBoundingClientRect();
  var maxw = rect.width - 10;
  var w8 = maxw - maxw % 8;
  boardElem.style.width = w8 + "px";
  boardElem.style.height = w8 + "px";
}

var _default = {
  init: init
};
exports.default = _default;
},{"../assets/libs/chessground":"assets/libs/chessground.js","../utils/pgnutils":"utils/pgnutils.js","../actions/game-actions":"actions/game-actions.js"}],"games.js":[function(require,module,exports) {
var test_game = "\n[White \"me\"]\n[Black \"you\"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 \n(3. ...Nf6 {is the two knights}) \n4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *";
var budapest_gambit = "\n[Event \"?\"]\n[Site \"?\"]\n[Date \"????.??.??\"]\n[Round \"?\"]\n[White \"Budapest\"]\n[Black \"Gambit\"]\n[Result \"?\"]\n\n 1.d4 Nf6 2.c4 e5 3.dxe5\n     ( 3.d5 Bc5 4.Bg5 Bxf2+ 5.Kxf2 Ne4+ {This is a mistake, with precise play white can get a better position.}\n         ( 5...Ng4+ 6.Kf3 Qxg5)\n     6.Ke3 Nxg5 7.h4 {The knight is trapped.})\n 3...Ng4\n     ( 3...Ne4 4.Qc2 Bb4+ 5.Nd2 d6 6.exd6\n         ( 6.Qxe4 O-O)\n     6...Bf5 7.Qa4+ Nc6 8.a3 Nc5 9.Qb5 a6 10.dxc7 Qxc7 11.axb4 axb5 12.Rxa8+ Bc8 13.bxc5 O-O 14.cxb5 Nb4 15.c6 {Better\n    for white.})\n 4.Nf3\n     ( 4.Qd4 d6 5.exd6 Nc6\n         ( 5...Bxd6 6.Qxg7\n             ( 6.Qe4+ Be6 7.Qxb7 Nd7 {Black is down two pawns, but is much better developed} 8.e3 O-O 9.Nf3 Nc5 10.Qb5\n            Rb8 11.Qc6\n                 ( 11.Qa5 Nd3+ 12.Bxd3\n                     ( 12.Ke2 Nxc1+ 13.Kd1 Nxf2+)\n                 12...Bb4+ {Losing the queen})\n             11...Rb6 {Traps the queen})\n\n             ( 6.Nf3 O-O 7.Nc3\n                 ( 7.h3 Nc6 8.Qe4 Re8 9.Qc2 Nb4 10.Qc3 Nd3+ 11.Qxd3\n                     ( 11.Kd2 Bb4)\n                 11...Bb4+ {Any blocking move can be met by capturing the queen.} 12.Bd2\n                     ( 12.Nc3 Qxd3)\n\n                     ( 12.Kd1 Nxf2+)\n                 12...Qxd3 13.Bxb4 Qc2)\n             7...Nc6 8.Qd1 Bc5 9.Qxd8\n                 ( 9.e3 Qxd1+ 10.Nxd1 Nb4 {Attacking c2} 11.Rb1\n                     ( 11.Ke2 Bf5)\n\n                     ( 11.Kd2 Rd8+ 12.Nd4 Bxd4 13.exd4 Rxd4+)\n                 11...Bf5)\n             9...Bxf2+ 10.Kd1 Rxd8+)\n\n             ( 6.h3 Nc6)\n         6...Be5 7.Qg5 Qxg5 8.Bxg5 Bxb2 {Black is a rook ahead.})\n     6.Qe4+ Be6 7.dxc7 Qd1+ 8.Kxd1 Nxf2+ 9.Ke1 Nxe4 {Black is better})\n\n     ( 4.Qd5 Nc6 5.f4\n         ( 5.Nf3 d6 6.Bg5\n             ( 6.exd6 Be6 7.Qd1\n                 ( 7.Qe4 Qxd6 8.Bf4 Qd1+ 9.Kxd1 Nxf2+)\n\n                 ( 7.Qd3 Nb4 8.dxc7 Nxd3+)\n             7...Bxd6 8.h3 Nxf2 9.Kxf2 Bg3+ 10.Kxg3 Qxd1)\n         6...Be7 7.Bxe7 Nxe7 8.Qe4 dxe5 9.Nxe5 Qd1+ 10.Kxd1 Nxf2+)\n     5...Nb4 6.Qe4 {Mistake by white} 6...Bc5 7.e3 Bxe3 8.Bxe3 Nxe3 9.Qxe3 Nc2+)\n\n     ( 4.e6 Bb4+ 5.Bd2 Qf6 6.Nf3 Qxb2 7.Bxb4 Qxb4+)\n\n     ( 4.Bf4 Bb4+ 5.Nd2 d6 6.exd6 Qf6)\n 4...Nc6\n     ( 4...Bc5 {This move forces white to play e3, blocking his dark square bishop. Black can then continue to go\n    after the pawn} 5.e3 Nc6 6.Qd5\n         ( 6.Be2 {White gives the pawn back. How should black play for a good middle game?} 6...Ngxe5 7.Nxe5 Nxe5 8.a3\n        a5 {Stopping b4} 9.O-O O-O 10.Nc3 Re8 {Have the option for the dark square bishop to fall back to f8} 11.b3 Ra6\n         12.Bb2 Rh6 13.Nd5 d6 14.b4 {At this point black can launch an attack.} 14...Qh4 15.h3 Bxh3 16.g3 Qe4 17.f3\n        Bxe3+ 18.Nxe3 Qxe3+ 19.Rf2 Qg5 20.g4 Qh4 {With mate to follow soon.})\n     6...Qe7)\n 5.Bf4 Bb4+ 6.Nbd2 Qe7 7.a3 Ngxe5 8.axb4\n     ( 8.Nxe5 Nxe5 9.Bxe5 Bxd2+ 10.Qxd2 Qxe5 {With a normal game})\n 8...Nd3# {Checkmate} *";
var scotch_gambit = "\n [White \"me\"]\n[Black \"you\"]\n 1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Bc4  {  If you had seen this, i hope you enjoy the scotch gambit. And if you like this and find it useful, pls leave a like and share this study. If it goes well i would do another one, i hope you enjoy this!  } Bc5  {  Black protects the pawn  } \n (Bb4+ 5.c3 dxc3 6.bxc3 Bc5  {  we can attack the same way  } \n   (6...Ba5 7.O-O \n  ) \n   (6...Bd6 7.O-O \n  ) \n   (6...Bf8  {  blunder, black failed to develop pieces  } \n  ) 7.Bxf7+ Kxf7 8.Qd5+  {  the king would be chased all over  } \n) \n (Be7 5.c3 \n   (5.O-O  {  white is ready to develop pieces  } \n  ) 5...dxc3 \n   (5...Nf6 6.e5 Ne4 \n     (6...d5  {  this is a blunder  } 7.exf6 dxc4 8.fxe7 \n    ) 7.Bd5 \n  ) 6.Qd5 Nh6  {  best way to defend  } 7.Bxh6 O-O  {  best move for black yet losing material  } 8.Nxc3 gxh6 9.Qh5  {  the bishop can be sacrificed for aggressive advantage, black can't hold on for long  } \n) \n (Nf6 5.e5 Ng4  {  the strongest defence for black  } \n   (5...Ne4 \n  ) 6.O-O Ngxe5 7.Nxe5 Nxe5 8.Re1  {  this pins the knight  } d6  {  protects  } 9.f4  {  the knight is now lost, leading to material advantage  } \n) 5.Ng5  {  Attacks f7  } \n (5.c3 dxc3 \n   (5...Nf6 6.e5 Ng8  {  causing lost of momentum  } \n  ) 6.Bxf7+ Kf8 \n   (6...Kxf7 7.Qd5+ Kg6  {  worst move  } \n     (7...Kf6 8.Bg5+ Kg6 9.Qf5+ Kh5 10.g4# \n    ) \n     (7...Ke8  {  safest move  } 8.Qxc5 \n    ) 8.Qf5# \n  ) 7.Nxc3  {  White has better development  } \n) 5...Nh6 6.Qh5  {  Aggressive but easily stabilised  } * "; // let gamemap = {
//     "Select a game" : {
//         'pgn': '[White "me"]\n[Black "you"]\n *',
//         'engineColor': 'black'
//     },
//     "Budapest gambit" : {
//         'pgn': budapest_gambit,
//         'engineColor': 'white'
//     },
//     "Scotch gambit" : {
//         'pgn': scotch_gambit,
//         'engineColor': 'black'
//     },
//     "Test game": {
//         'pgn': test_game,
//         'engineColor': 'black'
//     }
// }

var gamemap = {
  "Select a game": {
    'pgn': 'empty-game.pgn',
    'engineColor': 'black'
  },
  "Budapest gambit": {
    'pgn': 'budapest-gambit.pgn',
    'engineColor': 'white'
  },
  "Scotch gambit": {
    'pgn': 'scotch-gambit.pgn',
    'engineColor': 'black'
  },
  "Test game": {
    'pgn': 'test-game.pgn',
    'engineColor': 'black'
  }
};
exports.gamemap = gamemap;
},{}],"utils/documentutils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyToClipboard = exports.configureButton = void 0;

var configureButton = function configureButton(id, onClick) {
  document.getElementById(id).addEventListener("click", onClick);
};

exports.configureButton = configureButton;

var copyToClipboard = function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
};

exports.copyToClipboard = copyToClipboard;
},{}],"node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"node_modules/symbol-observable/es/ponyfill.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"node_modules/symbol-observable/es/index.js"}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editStore = exports.practiceStore = void 0;

var _redux = require("redux");

var _gameActions = require("../actions/game-actions");

var _pgnutils = require("../utils/pgnutils");

var _games = require("../games");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialStatePractice = {
  currentRoot: null,
  current: null,
  engineColor: 'white',
  hidePGN: false,
  autoPlay: false,
  hint: false
};
var emptyTree = (0, _pgnutils.parsepgn)("[White \"me\"]\n[Black \"you\"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 \n(3. ...Nf6 {is the two knights}) \n4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *");
var initialStateEdit = {
  currentRoot: emptyTree,
  current: emptyTree,
  engineColor: 'black',
  hidePGN: false,
  autoPlay: false,
  hint: false
};

var practiceReducer = function practiceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStatePractice;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer(state, action);
};

var editReducer = function editReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStateEdit;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer(state, action);
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _gameActions.POSITION_CHANGED:
      return _objectSpread({}, state, {
        hint: false,
        current: action.node
      });

    case _gameActions.GAME_CHANGED:
      return _objectSpread({}, state, {
        currentRoot: action.root,
        current: action.root,
        engineColor: action.engineColor,
        hint: false
      });

    case _gameActions.PLAYER_MADE_MOVE:
      return _objectSpread({}, state, {
        current: action.newCurrent
      });

    case _gameActions.HIDE_PGN_CHANGED:
      return _objectSpread({}, state, {
        hidePGN: action.checked
      });

    case _gameActions.AUTOPLAY_CHANGED:
      return _objectSpread({}, state, {
        autoPlay: action.checked
      });

    case _gameActions.HINT_CLICKED:
      return _objectSpread({}, state, {
        hint: true
      });

    case _gameActions.BOARD_FLIPPED:
      return _objectSpread({}, state, {
        engineColor: action.checked ? 'white' : 'black'
      });

    default:
      return state;
  }
};

var practiceStore = (0, _redux.createStore)(practiceReducer);
exports.practiceStore = practiceStore;
var editStore = (0, _redux.createStore)(editReducer);
exports.editStore = editStore;
var currentState = initialStateEdit;
editStore.subscribe(function () {
  var state = editStore.getState();
  console.log(currentState, state);
  currentState = state;
});
},{"redux":"node_modules/redux/es/redux.js","../actions/game-actions":"actions/game-actions.js","../utils/pgnutils":"utils/pgnutils.js","../games":"games.js"}],"utils/showpgn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPGNText = exports.displayFormattedPgn = void 0;

var _pgnutils = require("./pgnutils");

/*
 Uses CSS styles: 

move div has classes: 'pgnelement', 'move', 'level0', level1, ...
                        played or unplayed, and possibly currentmove
comment div has classes:  pgnelement', 'comment', 'level0', level1, ...

variation div has classes: 'pgnelement', 'variation', 'level0', level1,...

*/
var displayFormattedPgn = function displayFormattedPgn(pgndiv, root, current, hidePGN, setCurrent) {
  pgndiv.innerHTML = '';

  if (!hidePGN) {
    // console.log('displayFormattedPGN:', "Current:" + current.san)
    appendElements(root, pgndiv, 0, current, true, setCurrent);

    if (current) {
      var currentDiv = document.getElementById(nodeId(current)); // console.log('displayFormattedPGN:', currentDiv.offsetTop)

      pgndiv.scrollTop = currentDiv.offsetTop; // currentDiv.scrollIntoView(false, {block:"nearest"})
    }
  }
};

exports.displayFormattedPgn = displayFormattedPgn;

function appendElements(node, parentElem, varDepth, current, writeNode, setCurrent) {
  var isCurrent = node === current;

  if (writeNode) {
    parentElem.appendChild(makeNodeDiv(node, varDepth, isCurrent, setCurrent));
  }

  if (node.children.length > 1) {
    parentElem.appendChild(makeNodeDiv(node.children[0], varDepth, node.children[0] === current, setCurrent));

    for (var i = 1; i < node.children.length; i++) {
      var varDiv = makeVarDiv(varDepth);
      parentElem.appendChild(varDiv);
      var child = node.children[i];
      addTextChild(varDiv, '(');
      appendElements(child, varDiv, varDepth + 1, current, true, setCurrent);
      addTextChild(varDiv, ')');
    }

    appendElements(node.children[0], parentElem, varDepth, current, false, setCurrent);
  } else if (node.children.length > 0) {
    appendElements(node.children[0], parentElem, varDepth, current, true, setCurrent);
  }
}

function makeNodeDiv(node, varDepth, isCurrent, setCurrent) {
  var div = document.createElement("div");
  div.id = nodeId(node);
  div.classList.add('pgnelement', 'move', 'level' + varDepth);

  if (node.san) {
    if (isCurrent) {
      div.classList.add('currentmove');
    }

    if ((0, _pgnutils.allChildrenPlayed)(node)) {
      div.classList.add('played');
    } else {
      div.classList.add('unplayed');
    }

    if (node.color == 'w') {
      div.appendChild(document.createTextNode(node.move_number + "."));
    } else if (firstInVariation(node) || firstAfterVariation(node)) {
      div.appendChild(document.createTextNode(node.move_number + "..."));
    }

    div.appendChild(document.createTextNode(node.san));

    if (node.comment) {
      var cdiv = addTextChild(div, ['{', node.comment, '}'].join(' '));
      cdiv.classList.add('pgnelement', 'comment', 'level' + varDepth);
    }
  }

  div.onclick = function (ev) {
    setCurrent(node);
  };

  return div;
}

function addTextChild(parentDiv, text) {
  var cdiv = document.createElement("div");
  cdiv.appendChild(document.createTextNode(text));
  parentDiv.appendChild(cdiv);
  return cdiv;
}

function makeVarDiv(varDepth) {
  var div = document.createElement("div");
  div.classList.add('pgnelement', 'variation', 'level' + varDepth);
  return div;
}

function firstInVariation(node) {
  return node.parent && node.parent.children.length > 1 && node != node.parent.children[0];
}

function firstAfterVariation(node) {
  return node.parent.parent && node.parent.parent.children.length > 1 && node.parent == node.parent.parent.children[0] && node == node.parent.children[0];
}

function nodeId(node) {
  var id = "";

  while (node.parent) {
    id += node.parent.children.indexOf(node);
    node = node.parent;
  }

  return id ? id : 'ROOT';
}

var pgnBuffer;

var getPGNText = function getPGNText(root) {
  pgnBuffer = "";
  writePGN(root.children[0], "", true, "  ");
  return pgnBuffer;
};

exports.getPGNText = getPGNText;

var writePGN = function writePGN(node, currentIndent, writeNodeFirst, indent) {
  if (writeNodeFirst) {
    writeNode(node);
  }

  if (node.children.length > 1) {
    writeNode(node.children[0]);

    for (var i = 1; i < node.children.length; i++) {
      pgnBuffer += '\n' + currentIndent + ' (';
      writePGN(node.children[i], currentIndent + indent, true, indent);
      pgnBuffer += '\n' + currentIndent + ') ';
    }

    writePGN(node.children[0], currentIndent, false, indent);
  } else if (node.children.length > 0) {
    writePGN(node.children[0], currentIndent, true, indent);
  }
};

var writeNode = function writeNode(node) {
  if (node.color == 'w') {
    pgnBuffer += node.move_number + ".";
  } else if (firstInVariation(node) || firstAfterVariation(node)) {
    pgnBuffer += node.move_number + "...";
  }

  pgnBuffer += node.san + ' ';

  if (node.comment) {
    pgnBuffer += [' {', node.comment, '} '].join(' ');
  }
};
},{"./pgnutils":"utils/pgnutils.js"}],"components/practice-controls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.init = void 0;

var _pgnutils = require("../utils/pgnutils");

var _games = require("../games");

var _gameActions = require("../actions/game-actions");

var _documentutils = require("../utils/documentutils");

var _store = require("../store");

var _showpgn = require("../utils/showpgn");

var init = function init(selectDivId) {
  configureSelect(selectDivId, _store.practiceStore);
  configureButtons(_store.practiceStore);
};

exports.init = init;

function configureSelect(divId) {
  var seldiv = document.getElementById(divId);
  var sel = document.createElement("select");

  for (var key in _games.gamemap) {
    var option = document.createElement("option");
    option.value = key;
    option.text = key;
    sel.appendChild(option);
  }

  seldiv.appendChild(sel);
  sel.addEventListener("change", function (event) {
    return onSelect(event);
  });
}

function onSelect(event) {
  console.log('onSelect');
  var pgn = _games.gamemap[event.target.value];
  var file = './games/' + pgn['pgn'];
  console.log(file);
  fetch(file).then(function (response) {
    console.log("Response is:");
    console.log(response);
    return response.text();
  }).then(function (text) {
    console.log(text);
    var root = (0, _pgnutils.parsepgn)(text);

    _store.practiceStore.dispatch((0, _gameActions.gameChangedAction)(root, pgn['engineColor']));
  });
}

function configureButtons() {
  (0, _documentutils.configureButton)('play', function () {
    console.log('Play');
  });
  (0, _documentutils.configureButton)('hint', function (event) {
    return _store.practiceStore.dispatch((0, _gameActions.hintClickedAction)());
  });
  (0, _documentutils.configureButton)('autoplay', function (event) {
    return _store.practiceStore.dispatch((0, _gameActions.autoPlayChangedAction)(event.target.checked));
  });
  (0, _documentutils.configureButton)('hidepgn', function (event) {
    return _store.practiceStore.dispatch((0, _gameActions.hidePgnChangedAction)(event.target.checked));
  });
  (0, _documentutils.configureButton)('copy', function (event) {
    var _store$getState = _store.practiceStore.getState(),
        currentRoot = _store$getState.currentRoot;

    var text = (0, _showpgn.getPGNText)(currentRoot);
    (0, _documentutils.copyToClipboard)(text);
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{"../utils/pgnutils":"utils/pgnutils.js","../games":"games.js","../actions/game-actions":"actions/game-actions.js","../utils/documentutils":"utils/documentutils.js","../store":"store/index.js","../utils/showpgn":"utils/showpgn.js"}],"components/pgnviewer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.init = void 0;

var _showpgn = require("../utils/showpgn");

var _gameActions = require("../actions/game-actions");

var init = function init(divId, store) {
  var onClick = function onClick(node) {
    store.dispatch((0, _gameActions.positionChangedAction)(node));
  };

  store.subscribe(function () {
    var _store$getState = store.getState(),
        currentRoot = _store$getState.currentRoot,
        current = _store$getState.current,
        hidePGN = _store$getState.hidePGN;

    var pgnDiv = document.getElementById(divId);
    (0, _showpgn.displayFormattedPgn)(pgnDiv, currentRoot, current, hidePGN, onClick);
  });
};

exports.init = init;
var _default = {
  init: init
};
exports.default = _default;
},{"../utils/showpgn":"utils/showpgn.js","../actions/game-actions":"actions/game-actions.js"}],"components/fen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.init = void 0;

var init = function init(divId, store) {
  store.subscribe(function () {
    var _store$getState = store.getState(),
        current = _store$getState.current;

    var fendiv = document.getElementById(divId);
    fendiv.innerHTML = '';
    fendiv.appendChild(document.createTextNode(current.fen));
  });
};

exports.init = init;
var _default = {
  init: init
};
exports.default = _default;
},{}],"utils/gameutils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEngineMove = void 0;

var isEngineMove = function isEngineMove(current, engineColor) {
  return current && (current.color === 'w' && engineColor === 'black' || current.color === 'b' && engineColor === 'white');
};

exports.isEngineMove = isEngineMove;
},{}],"views/practice-view.js":[function(require,module,exports) {
"use strict";

var _chessboard = _interopRequireDefault(require("../components/chessboard"));

var _practiceControls = _interopRequireDefault(require("../components/practice-controls"));

var _pgnviewer = _interopRequireDefault(require("../components/pgnviewer"));

var _fen = _interopRequireDefault(require("../components/fen"));

var _store = require("../store");

var _gameutils = require("../utils/gameutils");

var _gameActions = require("../actions/game-actions");

var _pgnutils = require("../utils/pgnutils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var computeNewPosition = function computeNewPosition(orig, dest) {
  var _store$getState = _store.practiceStore.getState(),
      current = _store$getState.current,
      engineColor = _store$getState.engineColor,
      autoPlay = _store$getState.autoPlay;

  var next = (0, _pgnutils.findNext)(current, orig, dest);

  if (next) {
    current = next;
  }

  return current;
};

var localCurrent = null;

var triggerEngineMove = function triggerEngineMove() {
  var _store$getState2 = _store.practiceStore.getState(),
      currentRoot = _store$getState2.currentRoot,
      current = _store$getState2.current,
      engineColor = _store$getState2.engineColor,
      autoPlay = _store$getState2.autoPlay; // exit if the game is over


  if (current.children.length === 0) {
    console.log("End of variation");
    (0, _pgnutils.updatePlayedStatus)(current);
    window.setTimeout(function () {
      _store.practiceStore.dispatch((0, _gameActions.positionChangedAction)(currentRoot));
    }, 2000);
    return;
  }

  if (localCurrent !== current && autoPlay && (0, _gameutils.isEngineMove)(current, engineColor)) {
    window.setTimeout(makeNextMove, 500);
  }

  localCurrent = current;
};

var makeNextMove = function makeNextMove() {
  var _store$getState3 = _store.practiceStore.getState(),
      currentRoot = _store$getState3.currentRoot,
      current = _store$getState3.current,
      engineColor = _store$getState3.engineColor;

  var possibleMoves = current.children;

  if (possibleMoves.length === 0) {
    return;
  }

  var move;
  var idx = 0;

  while (idx < possibleMoves.length) {
    if (!current.played.has(possibleMoves[idx])) {
      move = possibleMoves[idx];
      break;
    }

    idx++;
  }

  if (!move) {
    console.log("Choosing random move");
    var randomIdx = Math.floor(Math.random() * possibleMoves.length);
    move = possibleMoves[randomIdx];
  }

  var from = move.from;
  var to = move.to;
  console.log('' + from + ':' + to);
  current = move;

  _store.practiceStore.dispatch((0, _gameActions.positionChangedAction)(current));
};

_practiceControls.default.init('game-select');

_pgnviewer.default.init('pgndisplay', _store.practiceStore);

_fen.default.init('fen', _store.practiceStore);

_chessboard.default.init('dirty', computeNewPosition, _store.practiceStore);

_store.practiceStore.subscribe(function () {
  triggerEngineMove();
});
},{"../components/chessboard":"components/chessboard.js","../components/practice-controls":"components/practice-controls.js","../components/pgnviewer":"components/pgnviewer.js","../components/fen":"components/fen.js","../store":"store/index.js","../utils/gameutils":"utils/gameutils.js","../actions/game-actions":"actions/game-actions.js","../utils/pgnutils":"utils/pgnutils.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52556" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","views/practice-view.js"], null)
//# sourceMappingURL=/practice-view.598ff691.js.map