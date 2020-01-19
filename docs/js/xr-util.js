
const XR_MODE_INLINE = 'inline';
const XR_MODE_VR = 'immersive-vr';
const XR_MODE_AR = 'immersive-ar';

/**
 * 参考：https://github.com/immersive-web/webxr-samples/blob/master/immersive-vr-session.html
 */
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

        /*
        this.scene = new Scene();
        this.scene.addNode(new Gltf2Node({url: 'media/gltf/space/space.gltf'}));
        */
    }

    async isSupported(mode) {
        try {
            return await navigator.xr.isSessionSupported(mode);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async startVR() {
        try {
            this.session = await navigator.xr.requestSession(XR_MODE_VR);

            this.session.addEventListener('end', {/* TODO */ });

            /*
            this.gl = createWebGLContext({ xrCompatible: true });

            this.renderer = new Renderer(gl);
            this.scene.setRenderer(renderer);

            this.session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });

            this.session.requestReferenceSpace('local').then((refSpace) => {
                this.xrRefSpace = refSpace;
                this.session.requestAnimationFrame(onXRFrame);
            });
            */

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

    /*
    onXRFrame(t, frame) {
        this.scene.startFrame();
        frame.session.requestAnimationFrame(this.onXRFrame);

        this.resultscene.endFrame();
    }

    animate() {
        renderer.setAnimationLoop(render);
    }

    render() {
        renderer.render(scene, camera);
    }
    */
}
