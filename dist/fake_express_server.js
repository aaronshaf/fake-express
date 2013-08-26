(function() {
  var FakeExpressServer, FakeServerRequest, FakeServerResponse, module;

  FakeServerRequest = (function() {
    function FakeServerRequest() {}

    return FakeServerRequest;

  })();

  FakeServerResponse = (function() {
    function FakeServerResponse(xhr) {
      this.xhr = xhr;
      this.statusCode = 200;
      this.headers = {
        'Content-Type': 'application/json'
      };
    }

    FakeServerResponse.prototype.status = function(code) {
      this.statusCode(code);
      return this;
    };

    FakeServerResponse.prototype.set = function(field, value) {
      var header, _results;
      if (value && typeof field === 'string') {
        return this[field] = value;
      } else if (typeof field === 'object') {
        _results = [];
        for (header in field) {
          value = field[header];
          _results.push(this[header] = value);
        }
        return _results;
      }
    };

    FakeServerResponse.prototype.get = function(field) {
      return this[field];
    };

    FakeServerResponse.prototype.send = function(statusCode, body) {
      if (typeof status === 'number') {
        return xhr.respond(statusCode, this.headers, body);
      }
      if (typeof statusCode === 'string' && !body) {
        return xhr.respond(this.statusCode, this.headers, statusCode);
      }
    };

    FakeServerResponse.prototype.json = function(status, body) {
      this.set('Content-Type', 'application/json');
      return this.send(status, body);
    };

    FakeServerResponse.prototype.type = function(type) {
      return this.headers['Content-Type'] = type;
    };

    FakeServerResponse.prototype.links = function(links) {
      var header, link, uri;
      header = [];
      for (uri in links) {
        link = links[uri];
        header.push("<" + link + ">; rel=\"" + uri + "\"");
      }
      return this.set('Link', header.join(','));
    };

    return FakeServerResponse;

  })();

  FakeExpressServer = (function() {
    function FakeExpressServer() {
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
    }

    FakeExpressServer.prototype.get = function(url, callback) {
      return this.server.respondWith(url, function(xhr) {
        callback(new FakeServerRequest(xhr), new FakeServerResponse);
        return xhr.respond(200, {
          'Content-Type': 'application/json'
        });
      });
    };

    return FakeExpressServer;

  })();

  module = FakeExpressServer;

  if (typeof define === 'function' && (typeof define !== "undefined" && define !== null ? define.amd : void 0)) {
    define(function() {
      return module;
    });
  } else {
    window.FakeExpressServer = module;
  }

}).call(this);

/*
//@ sourceMappingURL=fake_express_server.js.map
*/