import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { data } from '@/utils/scene';
import fragmentShader from '../shaders/fragmentShader.glsl';
import vertexShader from '../shaders/vertexShader.glsl';
import { useFrame } from '@react-three/fiber';

type Uniforms = {
	uTime: {
		value: number;
	};
};

type curveProps = THREE.CatmullRomCurve3;

const Tube: React.FC<{ curve: curveProps }> = ({ curve }) => {

    
    const uniforms: Uniforms = useMemo(() => {
      return {
        uTime: {
          value: 1.0
        }
      };
    }, []);

    
	const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
		const { clock } = state;
		if (meshRef.current) {
			const material = meshRef.current.material as THREE.ShaderMaterial;
			if (material.uniforms) {
				material.uniforms.uTime.value = clock.getElapsedTime();
			}
		}
	});

	return (
		<mesh ref={meshRef} >
			<tubeGeometry args={[ curve, 64, 0.001, 2, false ]} />
			<shaderMaterial 
                fragmentShader={fragmentShader} 
                vertexShader={vertexShader} 
                uniforms={uniforms} 
                side={THREE.DoubleSide}
                transparent={true}
                depthTest={false}
                blending = {THREE.AdditiveBlending}
                // wireframe={true}
            />
		</mesh>
	);
};

const Tubes: React.FC<{brainCurves:curveProps[]}> = ({brainCurves}) => {


	return (
		<React.Fragment>
			{brainCurves.map((curve, index) => {
				return <Tube curve={curve} key={index} />;
			})}
		</React.Fragment>
	);
};

export default Tubes;
