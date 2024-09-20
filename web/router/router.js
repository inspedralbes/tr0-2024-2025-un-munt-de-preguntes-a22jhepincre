class Router {
    constructor(rootElement) {
        this.routes = new Map();
        this.rootElement = rootElement || document.body;
        this.init();
    }

    addRoute(path, { template, script }) {
        this.routes.set(path, { template, script });
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.rootElement.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('data-route'));
            }
        });

        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.hash.slice(1) || '/';
        const route = this.routes.get(path) || this.routes.get('*');

        if (!route) {
            console.error('Route not found');
            return;
        }

        try {
            const html = await this.loadTemplate(route.template);
            this.rootElement.innerHTML = html;
            if (route.script) {
                await this.loadScript(route.script);
            }
        } catch (error) {
            console.error('Error handling route:', error);
        }
    }

    async loadTemplate(templatePath) {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${templatePath}`);
        }
        return await response.text();
    }

    async loadScript(scriptPath) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.type = 'module';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    navigateTo(path) {
        window.location.hash = path;
    }
}

export default Router;