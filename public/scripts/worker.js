if ('serviceWorker' in navigator) {
  const serviceWorker = '../service-worker.js';
  window.addEventListener('load', async function () {
    const worker = await navigator.serviceWorker.register(serviceWorker);
    console.log('Service Worker Registered');
    console.log(worker);
  })
}
