import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import brainFragment from '../shaders/brainFragment.glsl';
import brainVertex from '../shaders/brainVertex.glsl';
import { useFrame } from '@react-three/fiber';

type curveprops = THREE.CatmullRomCurve3;

type Uniforms = {
	uTime: {
		value: number;
	};
};
type Point = {
	currentOffset: number;
	speed: number;
	curve: THREE.CatmullRomCurve3;
	curPosition: number;
};

const randomRange: (min: number, max: number) => number = (min, max) => Math.random() * (max - min) + min;

const Particles: React.FC<{ brainCurves: curveprops[] }> = ({ brainCurves }) => {
	const myPoints = useRef<Point[]>([]);
	const brainGeo = useRef<THREE.BufferGeometry>(null);
	const density: number = 4;
	const numberOfPoints: number = density * brainCurves.length;
	let position = useMemo(() => {
		let position = [];
		for (let i = 0; i < numberOfPoints; i++) {
			position.push(randomRange(-1, 1), randomRange(-1, 1), randomRange(-1, 1));
		}
		return new Float32Array(position);
	}, []);

	useEffect(() => {
		if (brainCurves.length > 0) {
			for (let i = 0; i < numberOfPoints; i++) {
				for (let j = 0; j < density; j++) {
					myPoints.current.push({
						currentOffset: Math.random(),
						speed: Math.random() * 0.01,
						curve: brainCurves[i],
						curPosition: Math.random()
					});
				}
			}
		} else {
			console.warn('brainCurves is empty or not initialized.');
		}
	}, []);

	useFrame(() => {
		let currentPositions;
		if (brainGeo.current && brainCurves.length > 0) {
			currentPositions = brainGeo.current.attributes.position.array;
			for (let i = 0; i < myPoints.current.length; i++) {
				const point = myPoints.current[i];

				if (point.curve) {
					point.curPosition += point.speed;
					point.curPosition = point.curPosition % 1;

					let curPoint = point.curve.getPointAt(point.curPosition);

					currentPositions[i * 3] = curPoint.x;
					currentPositions[i * 3 + 1] = curPoint.y;
					currentPositions[i * 3 + 2] = curPoint.z;
				} else {
					console.warn(`Point at index ${i} has an undefined curve.`);
				}
			}
			brainGeo.current.attributes.position.needsUpdate = true;
		}
	});

	const uniforms: Uniforms = useMemo(() => {
		return {
			uTime: {
				value: 1.0
			}
		};
	}, []);

	return (
		<points>
			<bufferGeometry attach="geometry" ref={brainGeo}>
				<bufferAttribute
					attach="attributes-position"
					count={position.length / 5}
					array={position}
					itemSize={3}
				/>
			</bufferGeometry>
			<shaderMaterial
				fragmentShader={brainFragment}
				vertexShader={brainVertex}
				uniforms={uniforms}
				side={THREE.DoubleSide}
				transparent={true}
				depthTest={false}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
};

export default Particles;
