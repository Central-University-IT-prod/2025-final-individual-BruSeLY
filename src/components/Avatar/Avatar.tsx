import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { Group, SkinnedMesh } from 'three';
import { UserAvatar } from '../../flow/types';
import { useUserStore } from '../../flow/store/UserStore';
import Asset from '../Asset/Asset';

interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = (props) => {
  const group = useRef<Group>(null);
  const { nodes } = useGLTF('./assets/models/Armature.glb');
  const { animations } = useFBX('./assets/models/Idle.fbx');
  const { actions } = useAnimations(animations, group);
  const user = useUserStore((state) => state.user);
  const userAvatar = user?.avatar;
  const priorityOrder: (keyof UserAvatar)[] = ['bottom', 'top', 'head', 'hair'];
  
  useEffect(() => {
    actions['mixamo.com']?.play();
  }, [actions]);
  
  const hasOutfit001 = userAvatar?.bottom?.name === 'Outfit.001';
  const avatarKeys = userAvatar
    ? (Object.keys(userAvatar) as Array<keyof UserAvatar>)
        .filter((key) => key !== 'bodyType' && key !== 'bottom')
        .sort((a, b) => {
          const aIndex = priorityOrder.indexOf(a);
          const bIndex = priorityOrder.indexOf(b);

          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;

          return a.localeCompare(b);
        })
    : [];

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {avatarKeys.map((key) => {
            const part = userAvatar?.[key];
            if (part && !Array.isArray(part) && part.name) {
              return (
                <Suspense key={`${key}-${part.name}-${part.color}`}>
                  <Asset
                    color={part.color}
                    url={`./assets/models/${part.name}.glb`}
                    skeleton={(nodes.Plane as SkinnedMesh)?.skeleton}
                  />
                </Suspense>
              );
            }
            return null;
          })}
        </group>
      </group>
    </group>
  );
};

export default Avatar;