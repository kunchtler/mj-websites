import { Simulator, TimeConductor } from "musicaljuggling";
import { TimeControls } from "./TimeControls";
import styles from "./simulator.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { pattern as pattern1 } from "./jugglingPattern";
import { Affix } from "@mantine/core";
import { VRButton } from "./VRButton";
import { HTMLMesh, InteractiveGroup, XRControllerModelFactory } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

//TODO : Handle timecontrol styles better ?
// TODO : When separation of canvas and simulator, see where to put simulator.onVRstart/end.

function App() {
    // const [pattern, setPattern] = useState<JugglingAppParams>(pattern1);
    // const [playbackRate, setPlaybackRate] = useState(1);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const rendererRef = useRef<WebGLRenderer>(null);
    const simulatorRef = useRef<Simulator>(null);
    const [timeConductor, setTimeConductor] = useState<TimeConductor>(new TimeConductor());
    const [showVRButton, setShowVRButton] = useState(false); //TODO : Find better solution to this.
    const timeControlsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create renderer using the existing canvas
        const simulator = new Simulator({
            canvas: canvasRef.current!,
            enableAudio: true,
            scene: { backgroundColor: "#444444" },
            timeConductor: timeConductor
        });
        simulator.setupPattern(pattern1);

        const scene = simulator.scene;
        const renderer = simulator.renderer;

        // const elem = document.createElement("button");
        // elem.textContent = "BUTTON";
        // elem.addEventListener("click", () => {
        //     console.log("CLICKED");
        //     scene.background = new THREE.Color(Math.random(), Math.random(), Math.random());
        //     simulator.requestRenderIfNotRequested();
        // });
        // document.body.append(elem);
        // const mesh = new HTMLMesh(elem);
        const mesh = new HTMLMesh(timeControlsRef.current!);
        mesh.position.x = -0.75;
        mesh.position.y = 1.5;
        mesh.position.z = -0.5;
        mesh.rotation.y = Math.PI / 4;
        mesh.scale.setScalar(2);
        const group = new InteractiveGroup();

        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -5)]);

        const controller1 = renderer.xr.getController(0);
        controller1.add(new THREE.Line(geometry));
        scene.add(controller1);

        const controller2 = renderer.xr.getController(1);
        controller2.add(new THREE.Line(geometry));
        scene.add(controller2);

        const controllerModelFactory = new XRControllerModelFactory();

        const controllerGrip1 = renderer.xr.getControllerGrip(0);
        controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
        scene.add(controllerGrip1);

        const controllerGrip2 = renderer.xr.getControllerGrip(1);
        controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
        scene.add(controllerGrip2);

        group.listenToPointerEvents(simulator.renderer, simulator.camera);
        group.listenToXRControllerEvents(controller1);
        group.listenToXRControllerEvents(controller2);
        scene.add(group);
        group.add(mesh);
        // const renderer = simulator.renderer;
        // rendererRef.current = renderer;
        simulatorRef.current = simulator;
        // const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.xr.enabled = true;

        // Add VRButton to the DOM
        // document.body.appendChild(VRButtonThree.createButton(renderer));

        // renderer.setAnimationLoop(simulator.render);

        setShowVRButton(true);

        return () => {
            simulator.dispose();
            timeConductor.dispose();
        };
    }, [timeConductor]);

    // useEffect(() => {
    //     simulatorRef.current!.scene.background = new THREE.Color(sceneBackgroundColor);
    //     simulatorRef.current!.requestRenderIfNotRequested();
    // }, [sceneBackgroundColor]);

    // useEffect(() => {
    //     simulatorRef.current!.reset();
    //     simulatorRef.current!.setupPattern(pattern);
    // }, [pattern]);

    // useEffect(() => {
    //     simulatorRef.current!.timeController.playbackRate = playbackRate ?? 1;
    // }, [playbackRate]);

    let vrButton: ReactNode;
    if (showVRButton) {
        vrButton = (
            <Affix position={{ bottom: "md", right: "md" }}>
                <VRButton
                    renderer={simulatorRef.current!.renderer}
                    onVRStart={simulatorRef.current!.onVRstart}
                    onVREnd={simulatorRef.current!.onVRend}
                />
            </Affix>
        );
    } else {
        vrButton = <></>;
    }

    return (
        <>
            <canvas ref={canvasRef} className={styles.simulator} />
            <div ref={timeControlsRef} className={styles.timecontrols}>
                <TimeControls timeConductor={timeConductor} />
            </div>
            {vrButton}
            {/* <ColorPicker onChange={handleBackgroundColorChange}></ColorPicker> */}
        </>
    );
    // return (
    //     <>
    //         <canvas ref={canvasRef} />
    //         {showVRButton ? (
    //             <VRButton renderer={/*rendererRef.current!*/ simulatorRef.current!.renderer} />
    //         ) : (
    //             <></>
    //         )}
    //     </>
    // );
}

export default App;
