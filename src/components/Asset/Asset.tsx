import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Mesh, MeshStandardMaterial, BufferGeometry } from "three";
import { GLTF } from "three-stdlib"; 

interface Props {
  color: string,
  url: any;
  skeleton: any; 
}

interface AttachedItem {
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
}

const Asset: React.FC<Props> = ({ url, skeleton, color }) => {
  const gltf = useGLTF(url) as GLTF;  

  useEffect(() => {
    gltf.scene.traverse((item) => {
      if (item instanceof Mesh) {
        if (item.material.name.includes('Color_')) {
          item.material.color.set(color)
        }
      }
    })
  }, [color, gltf])

  const attachedItems = useMemo<AttachedItem[]>(() => {
    const items: AttachedItem[] = [];
    gltf.scene.traverse((item) => { 
      if (item instanceof Mesh) { 
        items.push({
          geometry: item.geometry,
          material: item.material as MeshStandardMaterial, 
        });
      }
    });
    return items;
  }, [gltf.scene]);

  return (
    <>
      {attachedItems.map((item, index) => (
        <skinnedMesh
          key={index}
          geometry={item.geometry}
          material={item.material}
          receiveShadow
          castShadow
          skeleton={skeleton}
        />
      ))}
    </>
  );
};

export default Asset;