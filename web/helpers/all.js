export async function cargarPage(app, htmlContent, script, listener) {
    try {
        const response = await fetch(htmlContent);
        const html = await response.text();
        app.innerHTML = html;

        await loadScript(script); // Espera a que se cargue el script

        const event = new CustomEvent(listener, {
            detail: { message: "Contenido cargado dinámicamente" }
        });
        app.dispatchEvent(event);
    } catch (error) {
        console.error("Error al cargar el HTML:", error);
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Eliminar todos los scripts existentes
        const existingScripts = document.querySelectorAll('script');
        existingScripts.forEach(script => {
            if (script.id != "bootstrap") {
                console.log(`Eliminando script: ${script.src}`);
                script.remove();
            }
        });

        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        script.onload = () => {
            console.log(`Script cargado: ${src}`);
            resolve();
        };
        script.onerror = () => reject(new Error(`Error al cargar el script: ${src}`));
        document.body.appendChild(script);
    });
}
