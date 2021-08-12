class Plugin {
  constructor (opt) {
    this.t = opt.t
  }

  ProgramEnter (path, state, context) {
    console.log('进来')
  }

  ProgramExit (path, state, context) {
    console.log('退出')
  }

  Identifier (path, state) {
    console.log('pathj', path.node.name)
  }
}


module.exports = function ({types: t}) {
  const methods = [
    'Identifier'
  ]
  let plugins = null

  function applyInstance(method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context])
      }
    }
  }

  const Program = {
    enter (path, state) {
      plugins = state.opts.options.map(opt => {
        return new Plugin({
          t,
          path,
          ...opt
        })
      })
      applyInstance('ProgramEnter', arguments, this)
    },
    exit (path, state) {
      applyInstance('ProgramExit', arguments, this)
    },
  }


  const ret = {
    visitor: { Program }
  }

  for (const method of methods) {
    ret.visitor[method] = function() {
      applyInstance(method, arguments, ret.visitor)
    }
  }

  return ret
}