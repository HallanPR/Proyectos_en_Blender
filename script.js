(function() {
            'use strict';

            const preloader = document.getElementById('preloader');
            const mainContent = document.getElementById('main-content');

            // Detectar si se llegó con el parámetro ?volver=true
            const urlParams = new URLSearchParams(window.location.search);
            const isReturning = urlParams.has('volver');

            if (isReturning) {
                // Ocultar preloader y mostrar contenido inmediatamente
                preloader.style.display = 'none';
                mainContent.classList.add('visible');
                mainContent.style.display = 'block';
                // Limpiar el parámetro de la URL para que no se mantenga al recargar
                if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
                return; // Salir, no ejecutar la carga del preloader
            }

            // Si no tiene el parámetro, mostrar el preloader normalmente
            const MIN_DISPLAY_TIME = 1500;
            const preloadImg = document.getElementById('preload-img');

            const imgLoaded = new Promise((resolve) => {
                if (preloadImg.complete) {
                    resolve();
                    return;
                }
                preloadImg.onload = () => resolve();
                preloadImg.onerror = () => {
                    console.warn('La imagen no se encontró. Continuando.');
                    resolve();
                };
            });

            const minTime = new Promise((resolve) => {
                setTimeout(resolve, MIN_DISPLAY_TIME);
            });

            Promise.all([imgLoaded, minTime])
                .then(() => {
                    preloader.classList.add('hidden');
                    mainContent.classList.add('visible');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 900);
                })
                .catch(() => {
                    preloader.classList.add('hidden');
                    mainContent.classList.add('visible');
                });

        })();