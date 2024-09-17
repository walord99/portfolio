import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import "../css/Background.css";
import { ShaderMaterial } from "three";
import { sliderData, silderGroup } from "../pages/BackgroundSettings";

function GradMesh({ settings }: { settings: silderGroup[] }) {
  const [fragment, setFragment] = useState<string | null>(null);
  const { viewport } = useThree();
  const materialRef = useRef<ShaderMaterial | null>(null);
  const uniforms = useMemo(
    () => ({
      u_resolution: { value: [window.innerWidth, window.innerHeight] },
      u_seed1: { value: Math.round(Math.random() * 100000) },
      u_seed2: { value: Math.round(Math.random() * 100000) },
      u_seed3: { value: Math.round(Math.random() * 100000) },
      u_time1: { value: 0 },
      u_time2: { value: 0 },
      u_time3: { value: 0 },
      u_min1: { value: settings[0].min.currentValue },
      u_min2: { value: settings[1].min.currentValue },
      u_min3: { value: settings[2].min.currentValue },
      u_max1: { value: settings[0].max.currentValue },
      u_max2: { value: settings[1].max.currentValue },
      u_max3: { value: settings[2].max.currentValue },
      u_scale1: { value: settings[0].scale.currentValue / 50 + 0.2},
      u_scale2: { value: settings[1].scale.currentValue / 50 + 0.2},
      u_scale3: { value: settings[2].scale.currentValue / 50 + 0.2},
    }),
    []
  );
  useEffect(() => {
    fetch("/glsl/background.frag")
      .then((res) => res.text())
      .then((text) => setFragment(text));
    console.log(uniforms);
  }),
    [];

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_min1.value = settings[0].min.currentValue;
      materialRef.current.uniforms.u_min2.value = settings[1].min.currentValue;
      materialRef.current.uniforms.u_min3.value = settings[2].min.currentValue;
      materialRef.current.uniforms.u_max1.value = settings[0].max.currentValue;
      materialRef.current.uniforms.u_max2.value = settings[1].max.currentValue;
      materialRef.current.uniforms.u_max3.value = settings[2].max.currentValue;
      materialRef.current.uniforms.u_scale1.value =
        settings[0].scale.currentValue / 50 + 0.2;
      materialRef.current.uniforms.u_scale2.value =
        settings[1].scale.currentValue / 50 + 0.2;
      materialRef.current.uniforms.u_scale3.value =
        settings[2].scale.currentValue / 50 + 0.2;
      materialRef.current.uniforms.u_time1.value +=
        (delta * settings[0].speed.currentValue) / 100 ;
      materialRef.current.uniforms.u_time2.value +=
        (delta * settings[1].speed.currentValue) / 100;
      materialRef.current.uniforms.u_time3.value +=
        (delta * settings[2].speed.currentValue) / 100 ;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {fragment ? (
        <shaderMaterial
          ref={materialRef}
          fragmentShader={fragment}
          uniforms={uniforms}
        />
      ) : null}
    </mesh>
  );
}

function GradientBackground({ settings }: { settings: silderGroup[] }) {
  return (
    <div id="background-container">
      <Canvas>
        <GradMesh settings={settings} />
      </Canvas>
    </div>
  );
}

export default GradientBackground;
