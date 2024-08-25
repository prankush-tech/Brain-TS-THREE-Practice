'use client';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import fragmentShader from '../shaders/fragmentShader.glsl';
import vertexShader from '../shaders/vertexShader.glsl';
import { useFrame } from '@react-three/fiber';


type Uniforms = {
	uTime: {
		value: number;
	};
};

const ModelObject: React.FC = () => {
	const uniforms: Uniforms = useMemo(() => {
		return {
			uTime: {
				value: 0.0
			}
		};
	}, []);

	const mesh = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		const { clock } = state;
		if (mesh.current) {
			const material = mesh.current.material as THREE.ShaderMaterial;
			if (material.uniforms) {
				material.uniforms.uTime.value = clock.getElapsedTime();

			}
		}
	});

	return (
		<mesh scale={[ 3, 3, 3 ]} ref={mesh}>
			<planeGeometry args={[ 1, 1, 1 ]} />
			<shaderMaterial
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
				uniforms={uniforms}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
};

export default ModelObject;
