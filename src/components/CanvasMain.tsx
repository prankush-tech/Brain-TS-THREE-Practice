'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import Tubes from './Tube';
import Particles from './Particles';
import { data } from '@/utils/scene';

type curveProps = THREE.CatmullRomCurve3;

let brainCurves: curveProps[] = [];
const PATHS = data.economics[0].paths;

const CanvasMain: React.FC<{ curves: curveProps }> = ({ curves }) => {
	PATHS.forEach((path) => {
		let points: THREE.Vector3[] = [];
		for (let i = 0; i < path.length; i = i + 3) {
			points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
		}
		let curve = new THREE.CatmullRomCurve3(points);
		brainCurves.push(curve);
	});

	return (
		<Canvas camera={{ position: [ 0, 0, 0.3 ], near: 0.001, far: 10 }}>
			<Tubes brainCurves={brainCurves} />
			<Particles brainCurves={brainCurves} />
			<ambientLight/>
			<OrbitControls />
		</Canvas>
	);
};

export default CanvasMain;
