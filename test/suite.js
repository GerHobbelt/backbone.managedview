// Generated by CoffeeScript 1.4.0
(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $(function() {
    module("default variables");
    test("views", function() {
      var view;
      view = new Backbone.View;
      view.views["header"] = "headerView";
      return equal(view.views["header"], "headerView");
    });
    module("render", {
      setup: function() {
        _this.Layout = (function(_super) {

          __extends(Layout, _super);

          function Layout() {
            _this.afterRender = __bind(_this.afterRender, this);

            _this.beforeRender = __bind(_this.beforeRender, this);

            _this.insert = __bind(_this.insert, this);
            return Layout.__super__.constructor.apply(this, arguments);
          }

          Layout.prototype.id = "app";

          Layout.prototype.template = _.template("<header></header><div id='content'>test</div>");

          Layout.prototype.manage = true;

          Layout.prototype.initialize = function() {
            return this.insertCount = 0;
          };

          Layout.prototype.insert = function() {
            $("body").append(this.el);
            return this.insertCount += 1;
          };

          Layout.prototype.beforeRender = function() {
            return this.beforeRenderCalled = true;
          };

          Layout.prototype.afterRender = function() {
            return this.afterRenderCalled = true;
          };

          return Layout;

        })(Backbone.View);
        _this.Header = (function(_super) {

          __extends(Header, _super);

          function Header() {
            _this.beforeRender = __bind(_this.beforeRender, this);
            return Header.__super__.constructor.apply(this, arguments);
          }

          Header.prototype.tagName = "header";

          Header.prototype.template = _.template("<p>header</p><div id='items'></div>");

          Header.prototype.manage = true;

          Header.prototype.beforeRender = function() {
            _(this.views["#items"]).invoke("remove");
            this.views["#items"] = [];
            this.views["#items"].push(new Item);
            return this.views["#items"].push(new Item);
          };

          return Header;

        })(Backbone.View);
        return _this.Item = (function(_super) {

          __extends(Item, _super);

          function Item() {
            return Item.__super__.constructor.apply(this, arguments);
          }

          Item.prototype.className = "item";

          Item.prototype.template = _.template("<p>item name</p>");

          Item.prototype.manage = true;

          Item.prototype.insert = "prepend";

          return Item;

        })(Backbone.View);
      },
      teardown: function() {
        return $("#app").remove();
      }
    });
    test("render view", function() {
      var layout;
      layout = new Layout;
      layout.render();
      return equal($("#app #content").html(), "test");
    });
    test("render view and subviews", function() {
      var layout;
      layout = new Layout;
      layout.views["header"] = new Header;
      layout.render();
      equal($("#app #content").html(), "test");
      equal($("#app header p").html(), "header");
      equal($("#app header #items .item").length, 2);
      layout.render();
      equal($("#app #content").html(), "test");
      equal($("#app header p").html(), "header");
      return equal($("#app header #items .item").length, 2);
    });
    test("beforeRender", function() {
      var layout;
      layout = new Layout;
      equal(layout.beforeRenderCalled, void 0);
      layout.render();
      return equal(layout.beforeRenderCalled, true);
    });
    test("afterRender", function() {
      var layout;
      layout = new Layout;
      equal(layout.afterRenderCalled, void 0);
      layout.render();
      return equal(layout.afterRenderCalled, true);
    });
    test("insert only once", function() {
      var layout;
      layout = new Layout;
      equal(layout.insertCount, 0);
      layout.render();
      equal(layout.insertCount, 1);
      layout.render();
      return equal(layout.insertCount, 1);
    });
    module("remove", {
      setup: function() {
        _this.Layout = (function(_super) {

          __extends(Layout, _super);

          function Layout() {
            _this.afterRemove = __bind(_this.afterRemove, this);

            _this.insert = __bind(_this.insert, this);
            return Layout.__super__.constructor.apply(this, arguments);
          }

          Layout.prototype.id = "app";

          Layout.prototype.template = _.template("<header></header><div id='content'>test</div>");

          Layout.prototype.manage = true;

          Layout.prototype.insert = function() {
            return $("body").append(this.el);
          };

          Layout.prototype.afterRemove = function() {
            return this.afterRemoveCalled = true;
          };

          return Layout;

        })(Backbone.View);
        return _this.Header = (function(_super) {

          __extends(Header, _super);

          function Header() {
            return Header.__super__.constructor.apply(this, arguments);
          }

          Header.prototype.tagName = "header";

          Header.prototype.template = _.template("<p>header</p>");

          Header.prototype.manage = true;

          return Header;

        })(Backbone.View);
      },
      teardown: function() {
        return $("#app").remove();
      }
    });
    test("remove view", function() {
      var layout;
      layout = new Layout;
      layout.render();
      equal($("#app #content").length, 1);
      layout.remove();
      equal($("#app #content").length, 0);
      return equal($("#app").length, 0);
    });
    test("remove view and subviews", function() {
      var layout;
      layout = new Layout;
      layout.views["header"] = new Header;
      layout.render();
      equal($("#app #content").length, 1);
      equal($("#app header p").length, 1);
      layout.remove();
      equal($("#app #content").length, 0);
      return equal($("#app header p").length, 0);
    });
    test("afterRemove", function() {
      var layout;
      layout = new Layout;
      layout.render();
      equal(layout.afterRemoveCalled, void 0);
      layout.remove();
      return equal(layout.afterRemoveCalled, true);
    });
    module("utility functions", {
      setup: function() {
        _this.Layout = (function(_super) {

          __extends(Layout, _super);

          function Layout() {
            return Layout.__super__.constructor.apply(this, arguments);
          }

          return Layout;

        })(Backbone.View);
        _this.Header = (function(_super) {

          __extends(Header, _super);

          function Header() {
            return Header.__super__.constructor.apply(this, arguments);
          }

          return Header;

        })(Backbone.View);
        _this.Footer = (function(_super) {

          __extends(Footer, _super);

          function Footer() {
            return Footer.__super__.constructor.apply(this, arguments);
          }

          return Footer;

        })(Backbone.View);
        return _this.Item = (function(_super) {

          __extends(Item, _super);

          function Item() {
            return Item.__super__.constructor.apply(this, arguments);
          }

          return Item;

        })(Backbone.View);
      },
      teardown: function() {}
    });
    return test("collectViews", function() {
      var footer, header, item1, item2, layout;
      layout = new Layout;
      header = new Header;
      footer = new Footer;
      item1 = new Item;
      item2 = new Item;
      layout.views["header"] = header;
      layout.views["footer"] = footer;
      layout.views[".items"] = [item1, item2];
      return deepEqual(layout.collectViews(), [header, footer, item1, item2]);
    });
  });

}).call(this);
