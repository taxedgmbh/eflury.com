// Modern Web Features Implementation
// Web Share API, Web Push, File System Access, etc.

// Web Share API
export function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      url: window.location.href
    }).catch((err) => {
      console.log('Share cancelled or failed:', err);
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

// Web Push Notification (requires user permission)
export async function requestNotificationPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Register for push notifications
      const registration = await navigator.serviceWorker.ready;
      // You would subscribe to push service here
      console.log('Notification permission granted');
      return true;
    }
  }
  return false;
}

// Clipboard API
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// File System Access API (for file uploads)
export async function selectFile(accept?: string[]) {
  if ('showOpenFilePicker' in window) {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: accept ? [{
          accept: accept.reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {} as Record<string, string[]>)
        }] : []
      });
      const file = await fileHandle.getFile();
      return file;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('File selection cancelled or failed:', err);
      }
      return null;
    }
  } else {
    // Fallback to traditional file input
    return new Promise<File | null>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      if (accept) input.accept = accept.join(',');
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0] || null;
        resolve(file);
      };
      input.click();
    });
  }
}

// Performance monitoring
export function measurePerformance() {
  if ('PerformanceObserver' in window) {
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    } catch (e) {
      console.log('PerformanceObserver not fully supported');
    }
  }
}

// Battery API (if available)
export async function getBatteryInfo() {
  if ('getBattery' in navigator) {
    try {
      const battery = await (navigator as any).getBattery();
      return {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    } catch (err) {
      return null;
    }
  }
  return null;
}

// Network Information API
export function getNetworkInfo() {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
  }
  return null;
}

