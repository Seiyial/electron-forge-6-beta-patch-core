"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const EXTENSION = '.forge.publish';

class PublishState {
  static loadFromDirectory(directory, rootDir) {
    return _asyncToGenerator(function* () {
      if (!(yield _fsExtra.default.exists(directory))) {
        throw new Error(`Attempted to load publish state from a missing directory: ${directory}`);
      }

      const publishes = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (yield _fsExtra.default.readdir(directory))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const dirName = _step.value;

          const subDir = _path.default.resolve(directory, dirName);

          const states = [];

          if ((yield _fsExtra.default.stat(subDir)).isDirectory()) {
            const filePaths = (yield _fsExtra.default.readdir(subDir)).filter(fileName => fileName.endsWith(EXTENSION)).map(fileName => _path.default.resolve(subDir, fileName));
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = filePaths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                const filePath = _step2.value;
                const state = new PublishState(filePath);
                yield state.load();
                state.state.artifacts = state.state.artifacts.map(artifactPath => _path.default.resolve(rootDir, artifactPath));
                states.push(state);
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
          }

          publishes.push(states);
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

      return publishes;
    })();
  }

  static saveToDirectory(directory, artifacts, rootDir) {
    return _asyncToGenerator(function* () {
      const id = _crypto.default.createHash('SHA256').update(JSON.stringify(artifacts)).digest('hex');

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = artifacts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const artifact = _step3.value;
          artifact.artifacts = artifact.artifacts.map(artifactPath => _path.default.relative(rootDir, artifactPath));
          const state = new PublishState(_path.default.resolve(directory, id, 'null'), '', false);
          state.setState(artifact);
          yield state.saveToDisk();
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
    })();
  }

  constructor(filePath, hasHash = true) {
    this.dir = _path.default.dirname(filePath);
    this.path = filePath;
    this.hasHash = hasHash;
  }

  generateHash() {
    const content = JSON.stringify(this.state || {});
    return _crypto.default.createHash('SHA256').update(content).digest('hex');
  }

  setState(state) {
    this.state = state;
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.state = yield _fsExtra.default.readJson(_this.path);
    })();
  }

  saveToDisk() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.hasHash) {
        _this2.path = _path.default.resolve(_this2.dir, `${_this2.generateHash()}${EXTENSION}`);
        _this2.hasHash = true;
      }

      yield _fsExtra.default.mkdirs(_path.default.dirname(_this2.path));
      yield _fsExtra.default.writeJson(_this2.path, _this2.state);
    })();
  }

}

exports.default = PublishState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3B1Ymxpc2gtc3RhdGUuanMiXSwibmFtZXMiOlsiRVhURU5TSU9OIiwiUHVibGlzaFN0YXRlIiwibG9hZEZyb21EaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJyb290RGlyIiwiZXhpc3RzIiwiRXJyb3IiLCJwdWJsaXNoZXMiLCJyZWFkZGlyIiwiZGlyTmFtZSIsInN1YkRpciIsInJlc29sdmUiLCJzdGF0ZXMiLCJzdGF0IiwiaXNEaXJlY3RvcnkiLCJmaWxlUGF0aHMiLCJmaWx0ZXIiLCJmaWxlTmFtZSIsImVuZHNXaXRoIiwibWFwIiwiZmlsZVBhdGgiLCJzdGF0ZSIsImxvYWQiLCJhcnRpZmFjdHMiLCJhcnRpZmFjdFBhdGgiLCJwdXNoIiwic2F2ZVRvRGlyZWN0b3J5IiwiaWQiLCJjcmVhdGVIYXNoIiwidXBkYXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImRpZ2VzdCIsImFydGlmYWN0IiwicmVsYXRpdmUiLCJzZXRTdGF0ZSIsInNhdmVUb0Rpc2siLCJjb25zdHJ1Y3RvciIsImhhc0hhc2giLCJkaXIiLCJkaXJuYW1lIiwicGF0aCIsImdlbmVyYXRlSGFzaCIsImNvbnRlbnQiLCJyZWFkSnNvbiIsIm1rZGlycyIsIndyaXRlSnNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxZQUFZLGdCQUFsQjs7QUFFZSxNQUFNQyxZQUFOLENBQW1CO0FBQ2hDLFNBQWFDLGlCQUFiLENBQStCQyxTQUEvQixFQUEwQ0MsT0FBMUMsRUFBbUQ7QUFBQTtBQUNqRCxVQUFJLFFBQU8saUJBQUdDLE1BQUgsQ0FBVUYsU0FBVixDQUFQLENBQUosRUFBaUM7QUFDL0IsY0FBTSxJQUFJRyxLQUFKLENBQVcsNkRBQTRESCxTQUFVLEVBQWpGLENBQU47QUFDRDs7QUFFRCxZQUFNSSxZQUFZLEVBQWxCO0FBTGlEO0FBQUE7QUFBQTs7QUFBQTtBQU1qRCxvQ0FBNEIsaUJBQUdDLE9BQUgsQ0FBV0wsU0FBWCxDQUE1QiwrSEFBbUQ7QUFBQSxnQkFBeENNLE9BQXdDOztBQUNqRCxnQkFBTUMsU0FBUyxjQUFLQyxPQUFMLENBQWFSLFNBQWIsRUFBd0JNLE9BQXhCLENBQWY7O0FBQ0EsZ0JBQU1HLFNBQVMsRUFBZjs7QUFDQSxjQUFJLE9BQU8saUJBQUdDLElBQUgsQ0FBUUgsTUFBUixDQUFQLEVBQXdCSSxXQUF4QixFQUFKLEVBQTJDO0FBQ3pDLGtCQUFNQyxZQUFZLE9BQU8saUJBQUdQLE9BQUgsQ0FBV0UsTUFBWCxDQUFQLEVBQ2ZNLE1BRGUsQ0FDUkMsWUFBWUEsU0FBU0MsUUFBVCxDQUFrQmxCLFNBQWxCLENBREosRUFFZm1CLEdBRmUsQ0FFWEYsWUFBWSxjQUFLTixPQUFMLENBQWFELE1BQWIsRUFBcUJPLFFBQXJCLENBRkQsQ0FBbEI7QUFEeUM7QUFBQTtBQUFBOztBQUFBO0FBS3pDLG9DQUF1QkYsU0FBdkIsbUlBQWtDO0FBQUEsc0JBQXZCSyxRQUF1QjtBQUNoQyxzQkFBTUMsUUFBUSxJQUFJcEIsWUFBSixDQUFpQm1CLFFBQWpCLENBQWQ7QUFDQSxzQkFBTUMsTUFBTUMsSUFBTixFQUFOO0FBQ0FELHNCQUFNQSxLQUFOLENBQVlFLFNBQVosR0FBd0JGLE1BQU1BLEtBQU4sQ0FBWUUsU0FBWixDQUFzQkosR0FBdEIsQ0FBMEJLLGdCQUFnQixjQUFLYixPQUFMLENBQWFQLE9BQWIsRUFBc0JvQixZQUF0QixDQUExQyxDQUF4QjtBQUNBWix1QkFBT2EsSUFBUCxDQUFZSixLQUFaO0FBQ0Q7QUFWd0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVcxQzs7QUFDRGQsb0JBQVVrQixJQUFWLENBQWViLE1BQWY7QUFDRDtBQXRCZ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF1QmpELGFBQU9MLFNBQVA7QUF2QmlEO0FBd0JsRDs7QUFFRCxTQUFhbUIsZUFBYixDQUE2QnZCLFNBQTdCLEVBQXdDb0IsU0FBeEMsRUFBbURuQixPQUFuRCxFQUE0RDtBQUFBO0FBQzFELFlBQU11QixLQUFLLGdCQUFPQyxVQUFQLENBQWtCLFFBQWxCLEVBQTRCQyxNQUE1QixDQUFtQ0MsS0FBS0MsU0FBTCxDQUFlUixTQUFmLENBQW5DLEVBQThEUyxNQUE5RCxDQUFxRSxLQUFyRSxDQUFYOztBQUQwRDtBQUFBO0FBQUE7O0FBQUE7QUFFMUQsOEJBQXVCVCxTQUF2QixtSUFBa0M7QUFBQSxnQkFBdkJVLFFBQXVCO0FBQ2hDQSxtQkFBU1YsU0FBVCxHQUFxQlUsU0FBU1YsU0FBVCxDQUFtQkosR0FBbkIsQ0FBdUJLLGdCQUFnQixjQUFLVSxRQUFMLENBQWM5QixPQUFkLEVBQXVCb0IsWUFBdkIsQ0FBdkMsQ0FBckI7QUFDQSxnQkFBTUgsUUFBUSxJQUFJcEIsWUFBSixDQUFpQixjQUFLVSxPQUFMLENBQWFSLFNBQWIsRUFBd0J3QixFQUF4QixFQUE0QixNQUE1QixDQUFqQixFQUFzRCxFQUF0RCxFQUEwRCxLQUExRCxDQUFkO0FBQ0FOLGdCQUFNYyxRQUFOLENBQWVGLFFBQWY7QUFDQSxnQkFBTVosTUFBTWUsVUFBTixFQUFOO0FBQ0Q7QUFQeUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUTNEOztBQUVEQyxjQUFZakIsUUFBWixFQUFzQmtCLFVBQVUsSUFBaEMsRUFBc0M7QUFDcEMsU0FBS0MsR0FBTCxHQUFXLGNBQUtDLE9BQUwsQ0FBYXBCLFFBQWIsQ0FBWDtBQUNBLFNBQUtxQixJQUFMLEdBQVlyQixRQUFaO0FBQ0EsU0FBS2tCLE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUVESSxpQkFBZTtBQUNiLFVBQU1DLFVBQVViLEtBQUtDLFNBQUwsQ0FBZSxLQUFLVixLQUFMLElBQWMsRUFBN0IsQ0FBaEI7QUFDQSxXQUFPLGdCQUFPTyxVQUFQLENBQWtCLFFBQWxCLEVBQTRCQyxNQUE1QixDQUFtQ2MsT0FBbkMsRUFBNENYLE1BQTVDLENBQW1ELEtBQW5ELENBQVA7QUFDRDs7QUFFREcsV0FBU2QsS0FBVCxFQUFnQjtBQUNkLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNEOztBQUVLQyxNQUFOLEdBQWE7QUFBQTs7QUFBQTtBQUNYLFlBQUtELEtBQUwsU0FBbUIsaUJBQUd1QixRQUFILENBQVksTUFBS0gsSUFBakIsQ0FBbkI7QUFEVztBQUVaOztBQUVLTCxZQUFOLEdBQW1CO0FBQUE7O0FBQUE7QUFDakIsVUFBSSxDQUFDLE9BQUtFLE9BQVYsRUFBbUI7QUFDakIsZUFBS0csSUFBTCxHQUFZLGNBQUs5QixPQUFMLENBQWEsT0FBSzRCLEdBQWxCLEVBQXdCLEdBQUUsT0FBS0csWUFBTCxFQUFvQixHQUFFMUMsU0FBVSxFQUExRCxDQUFaO0FBQ0EsZUFBS3NDLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBRUQsWUFBTSxpQkFBR08sTUFBSCxDQUFVLGNBQUtMLE9BQUwsQ0FBYSxPQUFLQyxJQUFsQixDQUFWLENBQU47QUFDQSxZQUFNLGlCQUFHSyxTQUFILENBQWEsT0FBS0wsSUFBbEIsRUFBd0IsT0FBS3BCLEtBQTdCLENBQU47QUFQaUI7QUFRbEI7O0FBaEUrQiIsImZpbGUiOiJwdWJsaXNoLXN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBFWFRFTlNJT04gPSAnLmZvcmdlLnB1Ymxpc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoU3RhdGUge1xuICBzdGF0aWMgYXN5bmMgbG9hZEZyb21EaXJlY3RvcnkoZGlyZWN0b3J5LCByb290RGlyKSB7XG4gICAgaWYgKCFhd2FpdCBmcy5leGlzdHMoZGlyZWN0b3J5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0ZWQgdG8gbG9hZCBwdWJsaXNoIHN0YXRlIGZyb20gYSBtaXNzaW5nIGRpcmVjdG9yeTogJHtkaXJlY3Rvcnl9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHVibGlzaGVzID0gW107XG4gICAgZm9yIChjb25zdCBkaXJOYW1lIG9mIGF3YWl0IGZzLnJlYWRkaXIoZGlyZWN0b3J5KSkge1xuICAgICAgY29uc3Qgc3ViRGlyID0gcGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgZGlyTmFtZSk7XG4gICAgICBjb25zdCBzdGF0ZXMgPSBbXTtcbiAgICAgIGlmICgoYXdhaXQgZnMuc3RhdChzdWJEaXIpKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVQYXRocyA9IChhd2FpdCBmcy5yZWFkZGlyKHN1YkRpcikpXG4gICAgICAgICAgLmZpbHRlcihmaWxlTmFtZSA9PiBmaWxlTmFtZS5lbmRzV2l0aChFWFRFTlNJT04pKVxuICAgICAgICAgIC5tYXAoZmlsZU5hbWUgPT4gcGF0aC5yZXNvbHZlKHN1YkRpciwgZmlsZU5hbWUpKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoIG9mIGZpbGVQYXRocykge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IFB1Ymxpc2hTdGF0ZShmaWxlUGF0aCk7XG4gICAgICAgICAgYXdhaXQgc3RhdGUubG9hZCgpO1xuICAgICAgICAgIHN0YXRlLnN0YXRlLmFydGlmYWN0cyA9IHN0YXRlLnN0YXRlLmFydGlmYWN0cy5tYXAoYXJ0aWZhY3RQYXRoID0+IHBhdGgucmVzb2x2ZShyb290RGlyLCBhcnRpZmFjdFBhdGgpKTtcbiAgICAgICAgICBzdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHB1Ymxpc2hlcy5wdXNoKHN0YXRlcyk7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoZXM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgc2F2ZVRvRGlyZWN0b3J5KGRpcmVjdG9yeSwgYXJ0aWZhY3RzLCByb290RGlyKSB7XG4gICAgY29uc3QgaWQgPSBjcnlwdG8uY3JlYXRlSGFzaCgnU0hBMjU2JykudXBkYXRlKEpTT04uc3RyaW5naWZ5KGFydGlmYWN0cykpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgZm9yIChjb25zdCBhcnRpZmFjdCBvZiBhcnRpZmFjdHMpIHtcbiAgICAgIGFydGlmYWN0LmFydGlmYWN0cyA9IGFydGlmYWN0LmFydGlmYWN0cy5tYXAoYXJ0aWZhY3RQYXRoID0+IHBhdGgucmVsYXRpdmUocm9vdERpciwgYXJ0aWZhY3RQYXRoKSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IG5ldyBQdWJsaXNoU3RhdGUocGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgaWQsICdudWxsJyksICcnLCBmYWxzZSk7XG4gICAgICBzdGF0ZS5zZXRTdGF0ZShhcnRpZmFjdCk7XG4gICAgICBhd2FpdCBzdGF0ZS5zYXZlVG9EaXNrKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZmlsZVBhdGgsIGhhc0hhc2ggPSB0cnVlKSB7XG4gICAgdGhpcy5kaXIgPSBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgIHRoaXMucGF0aCA9IGZpbGVQYXRoO1xuICAgIHRoaXMuaGFzSGFzaCA9IGhhc0hhc2g7XG4gIH1cblxuICBnZW5lcmF0ZUhhc2goKSB7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUgfHwge30pO1xuICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaCgnU0hBMjU2JykudXBkYXRlKGNvbnRlbnQpLmRpZ2VzdCgnaGV4Jyk7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIGFzeW5jIGxvYWQoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGF3YWl0IGZzLnJlYWRKc29uKHRoaXMucGF0aCk7XG4gIH1cblxuICBhc3luYyBzYXZlVG9EaXNrKCkge1xuICAgIGlmICghdGhpcy5oYXNIYXNoKSB7XG4gICAgICB0aGlzLnBhdGggPSBwYXRoLnJlc29sdmUodGhpcy5kaXIsIGAke3RoaXMuZ2VuZXJhdGVIYXNoKCl9JHtFWFRFTlNJT059YCk7XG4gICAgICB0aGlzLmhhc0hhc2ggPSB0cnVlO1xuICAgIH1cblxuICAgIGF3YWl0IGZzLm1rZGlycyhwYXRoLmRpcm5hbWUodGhpcy5wYXRoKSk7XG4gICAgYXdhaXQgZnMud3JpdGVKc29uKHRoaXMucGF0aCwgdGhpcy5zdGF0ZSk7XG4gIH1cbn1cbiJdfQ==