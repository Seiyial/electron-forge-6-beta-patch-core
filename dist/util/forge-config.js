"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitialForgeConfig = setInitialForgeConfig;
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash.template"));

var _readPackageJson = _interopRequireDefault(require("./read-package-json"));

var _pluginInterface = _interopRequireDefault(require("./plugin-interface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const underscoreCase = str => str.replace(/(.)([A-Z][a-z]+)/g, '$1_$2').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

const proxify = (object, envPrefix) => {
  const newObject = {};
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object' && !Array.isArray(object[key]) && key !== 'pluginInterface') {
      newObject[key] = proxify(object[key], `${envPrefix}_${underscoreCase(key)}`);
    } else {
      newObject[key] = object[key];
    }
  });
  return new Proxy(newObject, {
    get(target, name) {
      // eslint-disable-next-line no-prototype-builtins
      if (!target.hasOwnProperty(name) && typeof name === 'string') {
        const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`];
        if (envValue) return envValue;
      }

      return target[name];
    },

    getOwnPropertyDescriptor(target, name) {
      const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`]; // eslint-disable-next-line no-prototype-builtins

      if (target.hasOwnProperty(name)) {
        return Object.getOwnPropertyDescriptor(target, name);
      } else if (envValue) {
        return {
          writable: true,
          enumerable: true,
          configurable: true,
          value: envValue
        };
      }
    }

  });
};
/**
 * Sets sensible defaults for the `config.forge` object.
 */


function setInitialForgeConfig(packageJSON) {
  const _packageJSON$name = packageJSON.name,
        name = _packageJSON$name === void 0 ? '' : _packageJSON$name;
  /* eslint-disable no-param-reassign */

  packageJSON.config.forge.makers[0].config.name = name.replace(/-/g, '_');
  /* eslint-enable no-param-reassign */
}

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    const packageJSON = yield (0, _readPackageJson.default)(dir);
    let forgeConfig = packageJSON.config.forge;

    if (typeof forgeConfig === 'string' && ((yield _fsExtra.default.pathExists(_path.default.resolve(dir, forgeConfig))) || (yield _fsExtra.default.pathExists(_path.default.resolve(dir, `${forgeConfig}.js`))))) {
      try {
        forgeConfig = require(_path.default.resolve(dir, forgeConfig));
      } catch (err) {
        console.error(`Failed to load: ${_path.default.resolve(dir, forgeConfig)}`);
        throw err;
      }
    } else if (typeof forgeConfig !== 'object') {
      throw new Error('Expected packageJSON.config.forge to be an object or point to a requirable JS file');
    }

    forgeConfig = Object.assign({
      packagerConfig: {},
      rebuildConfig: {},
      makers: [],
      publishers: [],
      plugins: []
    }, forgeConfig);
    const templateObj = Object.assign({}, packageJSON, {
      year: new Date().getFullYear()
    });

    const template = obj => {
      Object.keys(obj).forEach(objKey => {
        if (typeof obj[objKey] === 'object' && obj !== null) {
          template(obj[objKey]);
        } else if (typeof obj[objKey] === 'string') {
          obj[objKey] = (0, _lodash.default)(obj[objKey])(templateObj); // eslint-disable-line

          if (obj[objKey].startsWith('require:')) {
            obj[objKey] = require(_path.default.resolve(dir, obj[objKey].substr(8))); // eslint-disable-line
          }
        }
      });
    };

    template(forgeConfig);
    forgeConfig.pluginInterface = new _pluginInterface.default(dir, forgeConfig);
    return proxify(forgeConfig, 'ELECTRON_FORGE');
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2ZvcmdlLWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJ1bmRlcnNjb3JlQ2FzZSIsInN0ciIsInJlcGxhY2UiLCJ0b1VwcGVyQ2FzZSIsInByb3hpZnkiLCJvYmplY3QiLCJlbnZQcmVmaXgiLCJuZXdPYmplY3QiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIkFycmF5IiwiaXNBcnJheSIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibmFtZSIsImhhc093blByb3BlcnR5IiwiZW52VmFsdWUiLCJwcm9jZXNzIiwiZW52IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJzZXRJbml0aWFsRm9yZ2VDb25maWciLCJwYWNrYWdlSlNPTiIsImNvbmZpZyIsImZvcmdlIiwibWFrZXJzIiwiZGlyIiwiZm9yZ2VDb25maWciLCJwYXRoRXhpc3RzIiwicmVzb2x2ZSIsInJlcXVpcmUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsImFzc2lnbiIsInBhY2thZ2VyQ29uZmlnIiwicmVidWlsZENvbmZpZyIsInB1Ymxpc2hlcnMiLCJwbHVnaW5zIiwidGVtcGxhdGVPYmoiLCJ5ZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwidGVtcGxhdGUiLCJvYmoiLCJvYmpLZXkiLCJzdGFydHNXaXRoIiwic3Vic3RyIiwicGx1Z2luSW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxpQkFBaUJDLE9BQU9BLElBQUlDLE9BQUosQ0FBWSxtQkFBWixFQUFpQyxPQUFqQyxFQUEwQ0EsT0FBMUMsQ0FBa0Qsb0JBQWxELEVBQXdFLE9BQXhFLEVBQWlGQyxXQUFqRixFQUE5Qjs7QUFFQSxNQUFNQyxVQUFVLENBQUNDLE1BQUQsRUFBU0MsU0FBVCxLQUF1QjtBQUNyQyxR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QUMyQjtBQUNsRTtBQUNGO0FBQ0YsT0FURDtBQVVELEtBWEQ7O0FBYUFKLGFBQVNqQixXQUFUO0FBRUFBLGdCQUFZc0IsZUFBWixHQUE4Qiw2QkFBb0J2QixHQUFwQixFQUF5QkMsV0FBekIsQ0FBOUI7QUFFQSxXQUFPN0IsUUFBUTZCLFdBQVIsRUFBcUIsZ0JBQXJCLENBQVA7QUFDRCxHIiwiZmlsZSI6ImZvcmdlLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBfdGVtcGxhdGUgZnJvbSAnbG9kYXNoLnRlbXBsYXRlJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgUGx1Z2luSW50ZXJmYWNlIGZyb20gJy4vcGx1Z2luLWludGVyZmFjZSc7XG5cbmNvbnN0IHVuZGVyc2NvcmVDYXNlID0gc3RyID0+IHN0ci5yZXBsYWNlKC8oLikoW0EtWl1bYS16XSspL2csICckMV8kMicpLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMV8kMicpLnRvVXBwZXJDYXNlKCk7XG5cbmNvbnN0IHByb3hpZnkgPSAob2JqZWN0LCBlbnZQcmVmaXgpID0+IHtcbiAgY29uc3QgbmV3T2JqZWN0ID0ge307XG5cbiAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkgJiYga2V5ICE9PSAncGx1Z2luSW50ZXJmYWNlJykge1xuICAgICAgbmV3T2JqZWN0W2tleV0gPSBwcm94aWZ5KG9iamVjdFtrZXldLCBgJHtlbnZQcmVmaXh9XyR7dW5kZXJzY29yZUNhc2Uoa2V5KX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3T2JqZWN0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgUHJveHkobmV3T2JqZWN0LCB7XG4gICAgZ2V0KHRhcmdldCwgbmFtZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGVudlZhbHVlID0gcHJvY2Vzcy5lbnZbYCR7ZW52UHJlZml4fV8ke3VuZGVyc2NvcmVDYXNlKG5hbWUpfWBdO1xuICAgICAgICBpZiAoZW52VmFsdWUpIHJldHVybiBlbnZWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXJnZXRbbmFtZV07XG4gICAgfSxcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBuYW1lKSB7XG4gICAgICBjb25zdCBlbnZWYWx1ZSA9IHByb2Nlc3MuZW52W2Ake2VudlByZWZpeH1fJHt1bmRlcnNjb3JlQ2FzZShuYW1lKX1gXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBuYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoZW52VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IGVudlZhbHVlIH07XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFNldHMgc2Vuc2libGUgZGVmYXVsdHMgZm9yIHRoZSBgY29uZmlnLmZvcmdlYCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRJbml0aWFsRm9yZ2VDb25maWcocGFja2FnZUpTT04pIHtcbiAgY29uc3QgeyBuYW1lID0gJycgfSA9IHBhY2thZ2VKU09OO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZS5tYWtlcnNbMF0uY29uZmlnLm5hbWUgPSBuYW1lLnJlcGxhY2UoLy0vZywgJ18nKTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyKSA9PiB7XG4gIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG4gIGxldCBmb3JnZUNvbmZpZyA9IHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZTtcbiAgaWYgKHR5cGVvZiBmb3JnZUNvbmZpZyA9PT0gJ3N0cmluZycgJiYgKGF3YWl0IGZzLnBhdGhFeGlzdHMocGF0aC5yZXNvbHZlKGRpciwgZm9yZ2VDb25maWcpKSB8fCBhd2FpdCBmcy5wYXRoRXhpc3RzKHBhdGgucmVzb2x2ZShkaXIsIGAke2ZvcmdlQ29uZmlnfS5qc2ApKSkpIHtcbiAgICB0cnkge1xuICAgICAgZm9yZ2VDb25maWcgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShkaXIsIGZvcmdlQ29uZmlnKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gbG9hZDogJHtwYXRoLnJlc29sdmUoZGlyLCBmb3JnZUNvbmZpZyl9YCk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JnZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZSB0byBiZSBhbiBvYmplY3Qgb3IgcG9pbnQgdG8gYSByZXF1aXJhYmxlIEpTIGZpbGUnKTtcbiAgfVxuICBmb3JnZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBhY2thZ2VyQ29uZmlnOiB7fSxcbiAgICByZWJ1aWxkQ29uZmlnOiB7fSxcbiAgICBtYWtlcnM6IFtdLFxuICAgIHB1Ymxpc2hlcnM6IFtdLFxuICAgIHBsdWdpbnM6IFtdLFxuICB9LCBmb3JnZUNvbmZpZyk7XG5cbiAgY29uc3QgdGVtcGxhdGVPYmogPSBPYmplY3QuYXNzaWduKHt9LCBwYWNrYWdlSlNPTiwgeyB5ZWFyOiAobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSB9KTtcbiAgY29uc3QgdGVtcGxhdGUgPSAob2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChvYmpLZXkpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW29iaktleV0gPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgICAgICB0ZW1wbGF0ZShvYmpbb2JqS2V5XSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpbb2JqS2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb2JqW29iaktleV0gPSBfdGVtcGxhdGUob2JqW29iaktleV0pKHRlbXBsYXRlT2JqKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAob2JqW29iaktleV0uc3RhcnRzV2l0aCgncmVxdWlyZTonKSkge1xuICAgICAgICAgIG9ialtvYmpLZXldID0gcmVxdWlyZShwYXRoLnJlc29sdmUoZGlyLCBvYmpbb2JqS2V5XS5zdWJzdHIoOCkpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdGVtcGxhdGUoZm9yZ2VDb25maWcpO1xuXG4gIGZvcmdlQ29uZmlnLnBsdWdpbkludGVyZmFjZSA9IG5ldyBQbHVnaW5JbnRlcmZhY2UoZGlyLCBmb3JnZUNvbmZpZyk7XG5cbiAgcmV0dXJuIHByb3hpZnkoZm9yZ2VDb25maWcsICdFTEVDVFJPTl9GT1JHRScpO1xufTtcbiJdfQ==