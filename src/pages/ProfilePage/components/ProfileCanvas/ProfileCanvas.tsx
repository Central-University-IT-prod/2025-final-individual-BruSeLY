import { Canvas } from '@react-three/fiber';
import Scene from '../../../../components/Scene/Scene';

const ProfileCanvas = () => (
  <Canvas
    camera={{
      position: [-1, 1, 5],
      fov: 20,
    }}
  >
    <color attach="background" args={['#440b7d']} />
    <group position-y={-1}>
      <Scene />
    </group>
  </Canvas>
);

export default ProfileCanvas;