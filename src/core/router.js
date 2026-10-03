export class ScreenRouter {
    constructor(onRouteChange) {
        this.history = ['home'];
        this.onRouteChange = onRouteChange;
    }

    current() {
        return this.history[this.history.length - 1];
    }

    canGoBack() {
        return this.history.length > 1;
    }

    goTo(screenId) {
        this.history.push(screenId);
        this.onRouteChange(this.current(), this.canGoBack());
    }

    back() {
        if (!this.canGoBack()) {
            return;
        }

        this.history.pop();
        this.onRouteChange(this.current(), this.canGoBack());
    }

    home() {
        this.history = ['home'];
        this.onRouteChange(this.current(), this.canGoBack());
    }
}
