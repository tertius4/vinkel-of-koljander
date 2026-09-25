class ScreenState {
    screenWidth: number = $state(window.innerWidth);
    isMobile: boolean = $state(window.innerWidth <= 768);

    constructor() {
        this.screenWidth = window.innerWidth;
        window.addEventListener("resize", () => {
            this.screenWidth = window.innerWidth;
            this.isMobile = window.innerWidth <= 768;
        });
    }
}

export default new ScreenState();