import {
  Backdrop,
  Environment,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import Avatar from "../Avatar/Avatar";
import { useRef, FC } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { Vector3 } from "three";

const Scene: FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);

  const handleCameraZoom = () => {
    if (!controlsRef.current) return;

    const target = new Vector3();
    controlsRef.current.target;

    const distance = camera.position.distanceTo(target);
    if (distance < 3) {
      camera.position
        .subVectors(camera.position, target)
        .normalize()
        .multiplyScalar(3)
        .add(target);
    }
  };

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minDistance={8}   
        maxDistance={13} 
        onChange={handleCameraZoom}
        enablePan={false} 
      />

      <Environment preset="sunset"  environmentIntensity={0.5} />

      <Backdrop scale={[50, 10, 5]} floor={1.5} receiveShadow position-z={-4}>
        <meshStandardMaterial color="#440b7d" />
      </Backdrop>
      <SoftShadows size={52} samples={16} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />

      <directionalLight position={[1, 0.1, -5]} intensity={3} color={"yellow"} />
      <directionalLight position={[-1, 0.1, -5]} intensity={8} color={"blue"} />
      <Avatar />
    </>
  );
};

export default Scene;