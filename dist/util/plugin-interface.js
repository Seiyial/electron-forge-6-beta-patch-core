"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:plugins');

class PluginInterface {
  constructor(dir, forgeConfig) {
    this.plugins = forgeConfig.plugins.map(plugin => {
      if (plugin.__isElectronForgePlugin) {
        return plugin;
      } else if (Array.isArray(plugin)) {
        if (typeof plugin[0] !== 'string') {
          throw `Expected plugin[0] to be a string but found ${plugin[0]}`;
        }

        let opts = {};
        if (typeof plugin[1] !== 'undefined') opts = plugin[1];

        const pluginModule = require(plugin[0]);

        const Plugin = pluginModule.default || pluginModule.CompilePlugin || pluginModule;
        
        // console.log("PLUGIN", Plugin);
        return new Plugin(opts);
      }

      throw `Expected plugin to either be a plugin instance or [string, object] but found ${plugin}`; // eslint-disable-line
    });
    Object.defineProperty(this, 'config', {
      value: forgeConfig,
      enumerable: false,
      configurable: false,
      writable: false
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const plugin = _step.value;
        plugin.init(dir, forgeConfig, _asyncOra.asyncOra);
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

    this.triggerHook = this.triggerHook.bind(this);
    this.overrideStartLogic = this.overrideStartLogic.bind(this);
  }

  triggerHook(hookName, hookArgs) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const plugin = _step2.value;

          if (typeof plugin.getHook === 'function') {
            const hook = plugin.getHook(hookName);
            if (hook) yield hook(...hookArgs);
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
    })();
  }

  overrideStartLogic(opts) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let newStartFn;
      const claimed = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _this2.plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const plugin = _step3.value;

          if (typeof plugin.startLogic === 'function') {
            claimed.push(plugin.name);
            newStartFn = plugin.startLogic;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      if (claimed.length > 1) throw `Multiple plugins tried to take control of the start command, please remove one of them\n --> ${claimed.join(', ')}`;

      if (claimed.length === 1) {
        d(`plugin: "${claimed[0]}" has taken control of the start command`);
        return yield newStartFn(opts);
      }

      return false;
    })();
  }

}

exports.default = PluginInterface;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3BsdWdpbi1pbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiZCIsIlBsdWdpbkludGVyZmFjZSIsImNvbnN0cnVjdG9yIiwiZGlyIiwiZm9yZ2VDb25maWciLCJwbHVnaW5zIiwibWFwIiwicGx1Z2luIiwiX19pc0VsZWN0cm9uRm9yZ2VQbHVnaW4iLCJBcnJheSIsImlzQXJyYXkiLCJvcHRzIiwicGx1Z2luTW9kdWxlIiwicmVxdWlyZSIsIlBsdWdpbiIsImRlZmF1bHQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiaW5pdCIsInRyaWdnZXJIb29rIiwiYmluZCIsIm92ZXJyaWRlU3RhcnRMb2dpYyIsImhvb2tOYW1lIiwiaG9va0FyZ3MiLCJnZXRIb29rIiwiaG9vayIsIm5ld1N0YXJ0Rm4iLCJjbGFpbWVkIiwic3RhcnRMb2dpYyIsInB1c2giLCJuYW1lIiwibGVuZ3RoIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLG9CQUFNLHdCQUFOLENBQVY7O0FBRWUsTUFBTUMsZUFBTixDQUFzQjtBQUNuQ0MsY0FBWUMsR0FBWixFQUFpQkMsV0FBakIsRUFBOEI7QUFDNUIsU0FBS0MsT0FBTCxHQUFlRCxZQUFZQyxPQUFaLENBQW9CQyxHQUFwQixDQUF5QkMsTUFBRCxJQUFZO0FBQ2pELFVBQUlBLE9BQU9DLHVCQUFYLEVBQW9DO0FBQ2xDLGVBQU9ELE1BQVA7QUFDRCxPQUZELE1BRU8sSUFBSUUsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFBMkI7QUFDaEMsWUFBSSxPQUFPQSxPQUFPLENBQVAsQ0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUNqQyxnQkFBTywrQ0FBOENBLE9BQU8sQ0FBUCxDQUFVLEVBQS9EO0FBQ0Q7O0FBQ0QsWUFBSUksT0FBTyxFQUFYO0FBQ0EsWUFBSSxPQUFPSixPQUFPLENBQVAsQ0FBUCxLQUFxQixXQUF6QixFQUFzQ0ksT0FBT0osT0FBTyxDQUFQLENBQVA7O0FBQ3RDLGNBQU1LLGVBQWVDLFFBQVFOLE9BQU8sQ0FBUCxDQUFSLENBQXJCOztBQUNBLGNBQU1PLFNBQVNGLGFBQWFHLE9BQWIsSUFBd0JILFlBQXZDO0FBQ0EsZUFBTyxJQUFJRSxNQUFKLENBQVdILElBQVgsQ0FBUDtBQUNEOztBQUNELFlBQU8sZ0ZBQStFSixNQUFPLEVBQTdGLENBYmlELENBYStDO0FBQ2pHLEtBZGMsQ0FBZjtBQWVBUyxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLFFBQTVCLEVBQXNDO0FBQ3BDQyxhQUFPZCxXQUQ2QjtBQUVwQ2Usa0JBQVksS0FGd0I7QUFHcENDLG9CQUFjLEtBSHNCO0FBSXBDQyxnQkFBVTtBQUowQixLQUF0QztBQWhCNEI7QUFBQTtBQUFBOztBQUFBO0FBdUI1QiwyQkFBcUIsS0FBS2hCLE9BQTFCLDhIQUFtQztBQUFBLGNBQXhCRSxNQUF3QjtBQUNqQ0EsZUFBT2UsSUFBUCxDQUFZbkIsR0FBWixFQUFpQkMsV0FBakI7QUFDRDtBQXpCMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUEyQjVCLFNBQUttQixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBQW5CO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsS0FBS0Esa0JBQUwsQ0FBd0JELElBQXhCLENBQTZCLElBQTdCLENBQTFCO0FBQ0Q7O0FBRUtELGFBQU4sQ0FBa0JHLFFBQWxCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3BDLDhCQUFxQixNQUFLdEIsT0FBMUIsbUlBQW1DO0FBQUEsZ0JBQXhCRSxNQUF3Qjs7QUFDakMsY0FBSSxPQUFPQSxPQUFPcUIsT0FBZCxLQUEwQixVQUE5QixFQUEwQztBQUN4QyxrQkFBTUMsT0FBT3RCLE9BQU9xQixPQUFQLENBQWVGLFFBQWYsQ0FBYjtBQUNBLGdCQUFJRyxJQUFKLEVBQVUsTUFBTUEsS0FBSyxHQUFHRixRQUFSLENBQU47QUFDWDtBQUNGO0FBTm1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9yQzs7QUFFS0Ysb0JBQU4sQ0FBeUJkLElBQXpCLEVBQStCO0FBQUE7O0FBQUE7QUFDN0IsVUFBSW1CLFVBQUo7QUFDQSxZQUFNQyxVQUFVLEVBQWhCO0FBRjZCO0FBQUE7QUFBQTs7QUFBQTtBQUc3Qiw4QkFBcUIsT0FBSzFCLE9BQTFCLG1JQUFtQztBQUFBLGdCQUF4QkUsTUFBd0I7O0FBQ2pDLGNBQUksT0FBT0EsT0FBT3lCLFVBQWQsS0FBNkIsVUFBakMsRUFBNkM7QUFDM0NELG9CQUFRRSxJQUFSLENBQWExQixPQUFPMkIsSUFBcEI7QUFDQUoseUJBQWF2QixPQUFPeUIsVUFBcEI7QUFDRDtBQUNGO0FBUjRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUzdCLFVBQUlELFFBQVFJLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0IsTUFBTyxnR0FBK0ZKLFFBQVFLLElBQVIsQ0FBYSxJQUFiLENBQW1CLEVBQXpIOztBQUN4QixVQUFJTCxRQUFRSSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCbkMsVUFBRyxZQUFXK0IsUUFBUSxDQUFSLENBQVcsMENBQXpCO0FBQ0EscUJBQWFELFdBQVduQixJQUFYLENBQWI7QUFDRDs7QUFDRCxhQUFPLEtBQVA7QUFkNkI7QUFlOUI7O0FBeERrQyIsImZpbGUiOiJwbHVnaW4taW50ZXJmYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6cGx1Z2lucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW5JbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcihkaXIsIGZvcmdlQ29uZmlnKSB7XG4gICAgdGhpcy5wbHVnaW5zID0gZm9yZ2VDb25maWcucGx1Z2lucy5tYXAoKHBsdWdpbikgPT4ge1xuICAgICAgaWYgKHBsdWdpbi5fX2lzRWxlY3Ryb25Gb3JnZVBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW5bMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgYEV4cGVjdGVkIHBsdWdpblswXSB0byBiZSBhIHN0cmluZyBidXQgZm91bmQgJHtwbHVnaW5bMF19YDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0cyA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIHBsdWdpblsxXSAhPT0gJ3VuZGVmaW5lZCcpIG9wdHMgPSBwbHVnaW5bMV07XG4gICAgICAgIGNvbnN0IHBsdWdpbk1vZHVsZSA9IHJlcXVpcmUocGx1Z2luWzBdKTtcbiAgICAgICAgY29uc3QgUGx1Z2luID0gcGx1Z2luTW9kdWxlLmRlZmF1bHQgfHwgcGx1Z2luTW9kdWxlO1xuICAgICAgICByZXR1cm4gbmV3IFBsdWdpbihvcHRzKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGBFeHBlY3RlZCBwbHVnaW4gdG8gZWl0aGVyIGJlIGEgcGx1Z2luIGluc3RhbmNlIG9yIFtzdHJpbmcsIG9iamVjdF0gYnV0IGZvdW5kICR7cGx1Z2lufWA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbmZpZycsIHtcbiAgICAgIHZhbHVlOiBmb3JnZUNvbmZpZyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgcGx1Z2luLmluaXQoZGlyLCBmb3JnZUNvbmZpZywgYXN5bmNPcmEpO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlckhvb2sgPSB0aGlzLnRyaWdnZXJIb29rLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vdmVycmlkZVN0YXJ0TG9naWMgPSB0aGlzLm92ZXJyaWRlU3RhcnRMb2dpYy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYXN5bmMgdHJpZ2dlckhvb2soaG9va05hbWUsIGhvb2tBcmdzKSB7XG4gICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbi5nZXRIb29rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IGhvb2sgPSBwbHVnaW4uZ2V0SG9vayhob29rTmFtZSk7XG4gICAgICAgIGlmIChob29rKSBhd2FpdCBob29rKC4uLmhvb2tBcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBvdmVycmlkZVN0YXJ0TG9naWMob3B0cykge1xuICAgIGxldCBuZXdTdGFydEZuO1xuICAgIGNvbnN0IGNsYWltZWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luLnN0YXJ0TG9naWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2xhaW1lZC5wdXNoKHBsdWdpbi5uYW1lKTtcbiAgICAgICAgbmV3U3RhcnRGbiA9IHBsdWdpbi5zdGFydExvZ2ljO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2xhaW1lZC5sZW5ndGggPiAxKSB0aHJvdyBgTXVsdGlwbGUgcGx1Z2lucyB0cmllZCB0byB0YWtlIGNvbnRyb2wgb2YgdGhlIHN0YXJ0IGNvbW1hbmQsIHBsZWFzZSByZW1vdmUgb25lIG9mIHRoZW1cXG4gLS0+ICR7Y2xhaW1lZC5qb2luKCcsICcpfWA7XG4gICAgaWYgKGNsYWltZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICBkKGBwbHVnaW46IFwiJHtjbGFpbWVkWzBdfVwiIGhhcyB0YWtlbiBjb250cm9sIG9mIHRoZSBzdGFydCBjb21tYW5kYCk7XG4gICAgICByZXR1cm4gYXdhaXQgbmV3U3RhcnRGbihvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=