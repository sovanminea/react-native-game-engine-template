import { Vector3, Euler, Group } from "three";
import ExpoTHREE from "expo-three";
import Sprite from "./sprite";
import { add } from "../utils/three";

const spriteSheet = ExpoTHREE.loadAsync(
	require("../../assets/spritesheets/cuphead.png")
);

export default async ({ parent, x = 0, y = 0, z = 0}) => {
	
	const group = new Group();

	const sprite = await Sprite({
		parent: group,
		x,
		y,
		z,
		spriteSheet,
		columns: 16,
		rows: 8,
		actions: {
			sad: {
				start: { row: 2, column: 0 },
				end: { row: 2, column: 8 }
			},
			joy: {
				start: { row: 0,  column: 0 },
				end: { row: 0, column: 11 },
				loop: false
			},
			walkSouth: {
				start: { row: 1, column: 0 },
				end: { row: 1, column: 12 }
			},
			walkSouthEast: {
				start: { row: 3, column: 0 },
				end: { row: 3, column: 15 }
			},
			walkEast: {
				start: { row: 4, column: 0 },
				end: { row: 4, column: 13 }
			},
			walkNorthEast: {
				start: { row: 6, column: 0 },
				end: { row: 6, column: 14 }
			},
			walkNorth: {
				start: { row: 7, column: 1 },
				end: { row: 7, column: 15 }
			},
			walkNorthWest: {
				start: { row: 6, column: 0 },
				end: { row: 6, column: 14 },
				flipX: true
			},
			walkWest: {
				start: { row: 4, column: 0 },
				end: { row: 4, column: 13 },
				flipX: true
			},
			walkSouthWest: {
				start: { row: 3, column: 0 },
				end: { row: 3, column: 15 },
				flipX: true
			},
			walkSouthAgain: {
				start: { row: 1, column: 0 },
				end: { row: 1, column: 12 }
			}
		}
	});

	sprite.timelines.actionCycle = {
		while: true,
		index: -1,
		update(self, entities, cycle, { stickController }) {
			const test = cycle.index;

			if (stickController.a && !stickController.previous.a)
				cycle.index--;
			else if (stickController.b && !stickController.previous.b)
				cycle.index++;

			if (test != cycle.index) {
				const keys = Object.keys(self.actions);
				const key = keys[Math.abs(cycle.index) % keys.length];

				self.actions[key]()
			}
		}
	};

	add(parent, group);

	return { ...sprite, ...{ model: group }};
};
