
const XR_MODE_INLINE = 'inline';
const XR_MODE_VR = 'immersive-vr';
const XR_MODE_AR = 'immersive-ar';

class XrUtil {
    constructor() {
        this.support = { inline: false, vr: false, ar: false };
    }

    async init() {
        const result = await Promise.all([
            this.isSupported(XR_MODE_INLINE),
            this.isSupported(XR_MODE_VR),
            this.isSupported(XR_MODE_AR),
        ]);

        this.support.inline = result[0];
        this.support.vr = result[1];
        this.support.ar = result[2];
    }

    async isSupported(mode) {
        try {
            return await navigator.xr.isSessionSupported(mode);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async start(mode) {
        try {
            this.session = await navigator.xr.requestSession(mode);
            this.requestID = this.session.requestAnimationFrame((time, xrFrame) => {
                console.log(time, xrFrame);
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async end() {
        if (this.session) {
            this.session.end();
            this.session = null;
        }
    }

}
