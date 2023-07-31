// serviceWorker.js
export default function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('ServiceWorker registrado com sucesso:', registration.scope);
        }).catch(error => {
          console.error('Falha ao registrar o ServiceWorker:', error);
        });
      });
    }
  }
  