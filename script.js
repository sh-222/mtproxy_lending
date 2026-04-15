function copyProxy() {
  const proxyUrl = document.getElementById('proxyUrl').innerText;
  
  // Use clipboard API
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

function showToast() {
  const toast = document.getElementById('copyToast');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.querySelectorAll('.link-item, .btn-connect').forEach(item => {
  item.addEventListener('click', () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  });
});
