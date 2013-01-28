// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.ManagedView = (function(_super) {

    __extends(ManagedView, _super);

    function ManagedView() {
      this.removeViews = __bind(this.removeViews, this);

      this.renderViews = __bind(this.renderViews, this);

      this.collectViews = __bind(this.collectViews, this);

      this.remove = __bind(this.remove, this);

      this.render = __bind(this.render, this);
      return ManagedView.__super__.constructor.apply(this, arguments);
    }

    ManagedView.prototype._configure = function(options) {
      if (options.insert) {
        this.insert = options.insert;
      }
      this.views = options.views || {};
      if (_(this.insert).isFunction()) {
        this.insertOnce = _.once(this.insert);
      }
      return ManagedView.__super__._configure.apply(this, arguments);
    };

    ManagedView.prototype.render = function() {
      if (typeof this.beforeRender === "function") {
        this.beforeRender();
      }
      if (typeof this.insertOnce === "function") {
        this.insertOnce();
      }
      this.$el.html(typeof this.template === "function" ? this.template(this) : void 0);
      this.renderViews();
      if (typeof this.afterRender === "function") {
        this.afterRender();
      }
      this.trigger("render");
      return this;
    };

    ManagedView.prototype.remove = function() {
      if (typeof this.beforeRemove === "function") {
        this.beforeRemove();
      }
      this.removeViews();
      ManagedView.__super__.remove.apply(this, arguments);
      if (typeof this.afterRemove === "function") {
        this.afterRemove();
      }
      this.trigger("remove");
      return this;
    };

    ManagedView.prototype.collectViews = function() {
      var views,
        _this = this;
      views = [];
      _(this.views).each(function(view, name) {
        var viewChild, _i, _len, _results;
        if (_(view).isArray()) {
          _results = [];
          for (_i = 0, _len = view.length; _i < _len; _i++) {
            viewChild = view[_i];
            _results.push(views.push(viewChild));
          }
          return _results;
        } else {
          return views.push(view);
        }
      });
      return views;
    };

    ManagedView.prototype.renderViews = function() {
      var _this = this;
      return _(this.views).each(function(view, name) {
        var $el, childView, insert, _i, _len, _results;
        $el = _this.$(name);
        if (name.length === 0) {
          $el = _this.$el;
        }
        if (_(view).isArray()) {
          _results = [];
          for (_i = 0, _len = view.length; _i < _len; _i++) {
            childView = view[_i];
            insert = "append";
            if (_(childView.insert).isString()) {
              insert = childView.insert;
            }
            $el[insert](childView.el);
            _results.push(childView.render());
          }
          return _results;
        } else {
          if (!view.insert) {
            $el.replaceWith(view.el);
          }
          return view.render();
        }
      });
    };

    ManagedView.prototype.removeViews = function() {
      var view, _i, _len, _ref;
      _ref = this.collectViews();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        view.remove();
      }
      return this.views = {};
    };

    return ManagedView;

  })(Backbone.View);

  Backbone.View = Backbone.ManagedView;

}).call(this);
