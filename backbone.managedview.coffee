class Backbone.ManagedView extends Backbone.View
  _configure: (options) ->
    if options.insert
      @insert = options.insert
    @views = options.views || {}
    if _(@insert).isFunction()
      @insertOnce = _.once @insert
    super

  # Render view and its sub-views
  render: =>
    @beforeRender?()
    @insertOnce?()
    @$el.html @template?(this)
    @renderViews()
    @afterRender?()
    @trigger "render"
    return this

  # Remove view and its sub-views
  remove: =>
    super
    @removeViews()
    @afterRemove?()
    @trigger "remove"
    return this

  # Collect all view instances and return as a flat array
  collectViews: =>
    views = []
    _(@views).each (view, name) =>
      if _(view).isArray()
        for viewChild in view
          views.push viewChild
      else
        views.push view
    return views

  # Render all view instances in @views and insert them to the DOM
  renderViews: =>
    _(@views).each (view, name) =>
      $el = @$(name)
      $el = @$el if name.length is 0
      if _(view).isArray()
        for childView in view
          insert = "append"
          if _(childView.insert).isString()
            insert = childView.insert
          $el[insert] childView.el
          childView.render()
      else
        unless view.insert
          $el.replaceWith view.el
        view.render()

  # Remove all view instances in @views
  removeViews: =>
    for view in @collectViews()
      view.remove()
    @views = {}

Backbone.View = Backbone.ManagedView
