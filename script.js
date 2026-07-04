// Base64 encoded proxy URLs
const encodedDD = "dGc6Ly9wcm94eT9zZXJ2ZXI9Mi4yNi45MS4xOTUmcG9ydD04NDQzJnNlY3JldD1kZDQwNjY2NmZmMmUzNWJlZGYxMGE0Y2M2MmFjNGI4NTcx";
const encodedEE = "dGc6Ly9wcm94eT9zZXJ2ZXI9Mi4yNi45MS4xOTUmcG9ydD04NDQzJnNlY3JldD1lZTQwNjY2NmZmMmUzNWJlZGYxMGE0Y2M2MmFjNGI4NTcxNzY2OTZkNjU2ZjJlNjM2ZDZk";

function getDecodedDD() { return atob(encodedDD); }
function getDecodedEE() { return atob(encodedEE); }

function connectDD() { window.location.href = getDecodedDD(); }
function connectEE() { window.location.href = getDecodedEE(); }

function copyDD() {
  const url = getDecodedDD();
  navigator.clipboard.writeText(url).then(() => showToast());
}
function copyEE() {
  const url = getDecodedEE();
  navigator.clipboard.writeText(url).then(() => showToast());
}

function showToast() {
  const toast = document.getElementById('copyToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function initProxyUI() {
  const ddEl = document.getElementById('proxyDD');
  const eeEl = document.getElementById('proxyEE');
  if (ddEl) ddEl.innerText = getDecodedDD().substring(0, 28) + "...";
  if (eeEl) eeEl.innerText = getDecodedEE().substring(0, 28) + "...";
}

document.addEventListener('DOMContentLoaded', () => {
  initProxyUI();
  document.querySelectorAll('.btn-connect, .btn-copy').forEach(item => {
    item.addEventListener('click', () => {
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(10);
    });
  });
});
