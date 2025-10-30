/**
 * Service Worker - Forced Uninstall
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.unregister(),
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    ]).then(() => self.clients.matchAll())
     .then(clients => clients.forEach(client => client.navigate(client.url)))
  );
});
