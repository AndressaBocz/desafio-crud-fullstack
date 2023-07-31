import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
