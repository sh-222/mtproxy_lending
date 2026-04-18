// Base64 encoded proxy URL to hide it from simple crawlers
const encodedProxy = "dGc6Ly9wcm94eT9zZXJ2ZXI9Mi4yNi45MS4xOTUmcG9ydD04ODQzJnNlY3JldD1lZTQwNjY2NmZmMmUzNWJlZGYxMGE0Y2M2MmFjNGI4NTcxNzY2OTZkNjU2ZjJlNjM2ZjZk";

/**
 * Decodes the proxy URL from Base64
 */
function getDecodedProxy() {
  try {
    return atob(encodedProxy);
  } catch (e) {
    console.error("Error decoding proxy:", e);
    return "";
  }
}

/**
 * Connects to the proxy by redirecting to the tg:// link
 */
function connectProxy() {
  const proxyUrl = getDecodedProxy();
  if (proxyUrl) {
    window.location.href = proxyUrl;
  }
}

/**
 * Copies the decoded proxy URL to the clipboard
 */
function copyProxy() {
  const proxyUrl = getDecodedProxy();
  
  if (!proxyUrl) return;

  // Use modern Clipboard API
  navigator.clipboard.writeText(proxyUrl).then(() => {
    showToast();
  }).catch(err => {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = proxyUrl;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  });
}

/**
 * Shows a toast notification
 */
function showToast() {
  const toast = document.getElementById('copyToast');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Populates the UI with a masked version of the proxy
 */
function initProxyUI() {
  const proxyUrlElement = document.getElementById('proxyUrl');
  if (proxyUrlElement) {
    const proxyUrl = getDecodedProxy();
    // Show masked version: tg://proxy?server=2.26...
    const masked = proxyUrl.substring(0, 25) + "...";
    proxyUrlElement.innerText = masked;
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initProxyUI();
  
  // Add haptic feedback for mobile
  document.querySelectorAll('.link-item, .btn-connect').forEach(item => {
    item.addEventListener('click', () => {
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    });
  });
});

