function requestFullscreen() {
  const docEl = document.documentElement;
  
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  } else if (docEl.webkitRequestFullscreen) {
    docEl.webkitRequestFullscreen();
  } else if (docEl.msRequestFullscreen) {
    docEl.msRequestFullscreen();
  }
}

// Request fullscreen on page load
document.addEventListener('DOMContentLoaded', () => {
  // Try immediately
  requestFullscreen();
  
  // Also try on first user interaction (some browsers block auto fullscreen)
  const tryFullscreen = () => {
    requestFullscreen();
    document.removeEventListener('click', tryFullscreen);
    document.removeEventListener('keydown', tryFullscreen);
  };
  
  document.addEventListener('click', tryFullscreen);
  document.addEventListener('keydown', tryFullscreen);
});

// Handle ESC key to exit fullscreen gracefully
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    console.log('Exited fullscreen');
  }
});
