module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current' // Asegura compatibilidad con tu versión de Node.js
        },
        modules: false // Muy importante: Le dice a Babel que no transforme los módulos ES (import/export) a CommonJS
      }
    ]
  ]
};