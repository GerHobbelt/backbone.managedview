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
      this.views || (this.views = {});
      if (options.views) {
        this.views = options.views;
      }
      if (options.insert) {
        this.insert = options.insert;
      }
      if (_.isFunction(this.insert)) {
        this.insertOnce = _.once(this.insert);
      }
      return ManagedView.__super__._configure.apply(this, arguments);
    };

    ManagedView.prototype.render = function() {
      if (!this.manage) {
        return ManagedView.__super__.render.apply(this, arguments);
      }
      if (typeof this.beforeRender === "function") {
        this.beforeRender();
      }
      if (typeof this.insertOnce === "function") {
        this.insertOnce();
      }
      this.delegateEvents();
      this.$el.empty().append(typeof this.template === "function" ? this.template(this) : void 0);
      this.renderViews();
      if (typeof this.afterRender === "function") {
        this.afterRender();
      }
      this.trigger("render");
      return this;
    };

    ManagedView.prototype.remove = function() {
      if (!this.manage) {
        return ManagedView.__super__.remove.apply(this, arguments);
      }
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
      var childView, name, view, views, _i, _len, _ref;
      views = [];
      _ref = this.views;
      for (name in _ref) {
        view = _ref[name];
        if (_.isArray(view)) {
          for (_i = 0, _len = view.length; _i < _len; _i++) {
            childView = view[_i];
            views.push(childView);
          }
        } else {
          views.push(view);
        }
      }
      return views;
    };

    ManagedView.prototype.renderViews = function() {
      var $el, childView, insert, name, view, _ref, _results;
      _ref = this.views;
      _results = [];
      for (name in _ref) {
        view = _ref[name];
        $el = this.$(name);
        if (name.length === 0) {
          $el = this.$el;
        }
        if (_.isArray(view)) {
          _results.push((function() {
            var _i, _len, _results1;
            _results1 = [];
            for (_i = 0, _len = view.length; _i < _len; _i++) {
              childView = view[_i];
              insert = childView.insert || "append";
              $el[insert](childView.el);
              _results1.push(childView.render());
            }
            return _results1;
          })());
        } else {
          if (!view.insert) {
            $el.replaceWith(view.el);
          }
          _results.push(view.render());
        }
      }
      return _results;
    };

    ManagedView.prototype.removeViews = function() {
      _.invoke(this.collectViews(), "remove");
      return this.views = {};
    };

    return ManagedView;

  })(Backbone.View);

  Backbone.View = Backbone.ManagedView;

}).call(this);
