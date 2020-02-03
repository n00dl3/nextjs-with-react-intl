module.exports = {
  webpack: function(cfg, { buildId, dev, isServer, defaultLoaders, webpack }) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();
      if (isServer) {
        const entryName= `static/${buildId}/pages/_app.js`;
        if (entries[entryName] && !entries[entryName].includes('./polyfills/server.ts')) {
          entries[entryName].unshift('./polyfills/server.ts');
        }
      } else {
        if (entries['main.js'] && !entries['main.js'].includes('./polyfills/client.ts')) {
          entries['main.js'].unshift('./polyfills/client.ts');
        }
      }

      return entries;
    };

    return cfg;
  },
};
