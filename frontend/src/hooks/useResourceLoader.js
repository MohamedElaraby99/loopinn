import { useState, useEffect, useCallback, useRef } from 'react';

export const useResourceLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedResources, setLoadedResources] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [loadingStage, setLoadingStage] = useState('initializing');
  const observerRef = useRef(null);
  const trackedResources = useRef(new Set());
  const progressTimeoutRef = useRef(null);

  // Smooth progress updates
  const updateProgressSmoothly = useCallback((newProgress) => {
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }
    
    progressTimeoutRef.current = setTimeout(() => {
      setProgress(prev => {
        const diff = newProgress - prev;
        const step = Math.max(1, Math.abs(diff) / 10);
        
        if (Math.abs(diff) <= step) {
          return newProgress;
        }
        
        return prev + (diff > 0 ? step : -step);
      });
    }, 50);
  }, [progress]);

  // Update loading stage based on progress
  const updateLoadingStage = useCallback((currentProgress) => {
    if (currentProgress === 0) setLoadingStage('initializing');
    else if (currentProgress < 25) setLoadingStage('loading-assets');
    else if (currentProgress < 50) setLoadingStage('preparing-content');
    else if (currentProgress < 75) setLoadingStage('almost-ready');
    else if (currentProgress < 100) setLoadingStage('finalizing');
    else setLoadingStage('ready');
  }, []);

  const trackResource = useCallback((resource, type = 'unknown') => {
    // Create a unique identifier for the resource
    const resourceId = `${type}-${resource.src || resource.href || resource.id || Math.random()}`;
    
    // Skip if already tracked
    if (trackedResources.current.has(resourceId)) {
      return Promise.resolve();
    }
    
    trackedResources.current.add(resourceId);
    
    return new Promise((resolve) => {
      if (type === 'image') {
        if (resource.complete) {
          resolve();
        } else {
          resource.addEventListener('load', () => resolve());
          resource.addEventListener('error', () => resolve()); // Count errors as loaded too
        }
      } else if (type === 'stylesheet') {
        if (resource.sheet) {
          resolve();
        } else {
          resource.addEventListener('load', () => resolve());
          resource.addEventListener('error', () => resolve());
        }
      } else if (type === 'script') {
        if (resource.complete || resource.readyState === 'complete') {
          resolve();
        } else {
          resource.addEventListener('load', () => resolve());
          resource.addEventListener('error', () => resolve());
        }
      } else {
        resolve();
      }
    });
  });

  const trackNewResources = useCallback(() => {
    // Track any new images that might have been added
    const allImages = Array.from(document.querySelectorAll('img'));
    const newImages = allImages.filter(img => !trackedResources.current.has(`image-${img.src || img.id || Math.random()}`));
    
    if (newImages.length > 0) {
      newImages.forEach(img => {
        trackResource(img, 'image').then(() => {
          setLoadedResources(prev => prev + 1);
          const newProgress = Math.min(((loadedResources + 1) / totalResources) * 100, 100);
          updateProgressSmoothly(newProgress);
          updateLoadingStage(newProgress);
        });
      });
      setTotalResources(prev => prev + newImages.length);
    }
  }, [loadedResources, totalResources, trackResource, updateProgressSmoothly, updateLoadingStage]);

  const loadAllResources = useCallback(async () => {
    let currentLoaded = 0;
    let currentTotal = 0;

    // Track images
    const images = Array.from(document.querySelectorAll('img'));
    currentTotal += images.length;

    // Track stylesheets
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    currentTotal += stylesheets.length;

    // Track scripts
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    currentTotal += scripts.length;

    // Track fonts
    if ('fonts' in document) {
      currentTotal += 1;
    }

    // If no resources to track, set minimum loading time
    if (currentTotal === 0) {
      currentTotal = 1;
      setTimeout(() => {
        updateProgressSmoothly(100);
        updateLoadingStage(100);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setTotalResources(currentTotal);

    // Load all resources
    const loadPromises = [];

    // Load images
    images.forEach(img => {
      loadPromises.push(
        trackResource(img, 'image').then(() => {
          currentLoaded++;
          setLoadedResources(currentLoaded);
          const newProgress = Math.min((currentLoaded / currentTotal) * 100, 100);
          updateProgressSmoothly(newProgress);
          updateLoadingStage(newProgress);
        })
      );
    });

    // Load stylesheets
    stylesheets.forEach(link => {
      loadPromises.push(
        trackResource(link, 'stylesheet').then(() => {
          currentLoaded++;
          setLoadedResources(currentLoaded);
          const newProgress = Math.min((currentLoaded / currentTotal) * 100, 100);
          updateProgressSmoothly(newProgress);
          updateLoadingStage(newProgress);
        })
      );
    });

    // Load scripts
    scripts.forEach(script => {
      loadPromises.push(
        trackResource(script, 'script').then(() => {
          currentLoaded++;
          setLoadedResources(currentLoaded);
          const newProgress = Math.min((currentLoaded / currentTotal) * 100, 100);
          updateProgressSmoothly(newProgress);
          updateLoadingStage(newProgress);
        })
      );
    });

    // Load fonts
    if ('fonts' in document) {
      loadPromises.push(
        document.fonts.ready.then(() => {
          currentLoaded++;
          setLoadedResources(currentLoaded);
          const newProgress = Math.min((currentLoaded / currentTotal) * 100, 100);
          updateProgressSmoothly(newProgress);
          updateLoadingStage(newProgress);
        })
      );
    }

    // Wait for all resources to load
    await Promise.all(loadPromises);

    // Add a small delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [updateProgressSmoothly, updateLoadingStage]);

  useEffect(() => {
    // Start loading after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadAllResources();
    }, 150);

    // Set up MutationObserver to track dynamic content
    if (window.MutationObserver) {
      observerRef.current = new MutationObserver((mutations) => {
        let hasNewResources = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Check for new images
                const newImages = node.querySelectorAll ? node.querySelectorAll('img') : [];
                if (newImages.length > 0) {
                  hasNewResources = true;
                }
                
                // Check if the node itself is an image
                if (node.tagName === 'IMG') {
                  hasNewResources = true;
                }
              }
            });
          }
        });
        
        if (hasNewResources) {
          // Small delay to ensure DOM is updated
          setTimeout(() => {
            trackNewResources();
          }, 100);
        }
      });
      
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Fallback: if loading takes too long, force completion
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        updateProgressSmoothly(100);
        updateLoadingStage(100);
        setIsLoading(false);
      }
    }, 12000); // 12 second fallback

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadAllResources, isLoading, trackNewResources, updateProgressSmoothly, updateLoadingStage]);

  // Function to manually track new resources (can be called from components)
  const trackResources = useCallback(() => {
    trackNewResources();
  }, [trackNewResources]);

  return { 
    isLoading, 
    progress, 
    loadedResources, 
    totalResources, 
    loadingStage,
    trackResources 
  };
};
