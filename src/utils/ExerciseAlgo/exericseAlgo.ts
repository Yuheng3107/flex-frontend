/*
1: Side Squat
2: Front Squat
3: Push-Ups
4: Knee Push-Ups
5: Hamstring Stretch Left Leg (side view)
6: Hamstring Stretch Right Leg (side view)
7: Arm Circles
8: Jump Rope
*/
function getExercise(x: number) {
    if (x === -1) return {
        evalPoses: [
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]),
        ],
        scoreThreshold: 0.7,
        scoreDeviation: 0.002,
        angleWeights: new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
        angleThresholds: [[
            new Float32Array([0.1,0.1]),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ],],
        minRepTime: 1500,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
    if (x === 1) return {
        // side squat
        evalPoses: [new Float32Array([0, 0, 0, 0, 0, 0, 1.378, 0, 0, 0, 0, 0, 0.639, 0, 0, 0])],
        scoreThreshold: 0.7,
        scoreDeviation: 0.02,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.15, 0.15]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.15, 0]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ]],
        minRepTime: 2000,
        glossary: [[
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Squat not low enough", "Squat too low"],
            ["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Leaning forward too much", ""],
            ["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
    if (x === 2) return {
        // front squat
        evalPoses: [new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 2.466, 0, 0, 2.430, 0, 0, 0, 0]),new Float32Array(2),new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 2.639, 0, 0, 0, 0, 0, 0, 0,])],
        scoreThreshold: 0.9,
        scoreDeviation: 0.02,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0, 0]),
            new Float32Array(2),new Float32Array(2),
            new Float32Array([0.25, 0.25]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ],[],[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0, 0.1]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ]],
        minRepTime: 2000,
        glossary: [[
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["", ""],
            ["", ""],["", ""],
            ["Squat not low enough", "Squat too low"],
            ["", ""],["", ""],["", ""],["", ""],
        ],[],[
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["", "Knees collapse inwards"],
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
    if (x === 3) return {
        // push up
        evalPoses: [
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.702, 0, 0, 1.650]),
        ],
        scoreThreshold: 0.6,
        scoreDeviation: 0.005,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 10]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0, 0.1]),
            new Float32Array(2),new Float32Array(2),
            new Float32Array([0.1, 0]),
        ],],
        minRepTime: 1500,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["", "Sagging back"],
            ["", ""],["", ""],
            ["Not low enough", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
      if (x === 4) return {
        // push up
        evalPoses: [
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.723, 0, 0, 1.780]),
        ],
        scoreThreshold: 0.6,
        scoreDeviation: 0.005,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 10]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0, 0.1]),
            new Float32Array(2),new Float32Array(2),
            new Float32Array([0.07, 0]),
        ],],
        minRepTime: 1500,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["", "Hips sagging"],
            ["", ""],["", ""],
            ["Not low enough", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
    if (x === 5) return {
        // hamstring left leg
        evalPoses: [
            new Float32Array([0, 0, 0, 0, 0, 0, 1.929, 0, 0, 0, 0, 0, 0.659, 0, 0, 0, ]),
        ],
        scoreThreshold: 0.8,
        scoreDeviation: 0.03,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.1, 0]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.1, 0]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ],],
        minRepTime: 2500,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Leg bent too little",""],
            ["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Rounded back", ""],
            ["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
      if (x === 6) return {
        // hamstring right leg
        evalPoses: [
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 1.929, 0, 0, 0, 0, 0, 0.659, 0, 0, ]),
        ],
        scoreThreshold: 0.8,
        scoreDeviation: 0.03,
        angleWeights: new Float32Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.1, 0]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
            new Float32Array([0.1, 0]),
            new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ],],
        minRepTime: 2500,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Leg bent too little",""],
            ["", ""],["", ""],["", ""],
            ["Rounded back", ""],
            ["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [8,8],
      };
      if (x === 7) return {
        // arm circles
        evalPoses: [
            new Float32Array([1.344, 1.344, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]),
        ],
        scoreThreshold: 0.54,
        scoreDeviation: 0.05,
        angleWeights: new Float32Array([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),
        ],],
        minRepTime: 700,
        glossary: [
          [
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],
            ["Leg bent too little"],
            ["", ""],["", ""],["", ""],
            ["Rounded back", ""],
            ["", ""],["", ""],["", ""],
        ]],
        minSwitchPoseCount: [1,1],
      };
      if (x === 8) return {
        // jump rope
        evalPoses: [new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])],
        scoreThreshold: 0.9,
        scoreDeviation: 0.02,
        angleWeights: new Float32Array([
            0, 0, 0, 
            0, 0, 1, 
            0, 0, 1, 
            0, 0, 0, 
            0, 0, 0, 
            0]),
        angleThresholds: [[
            new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),new Float32Array(2),]],
        minRepTime: 1,
        glossary: [[
            ["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],["", ""],]],
        minSwitchPoseCount: [2,2],
      };
}

export default getExercise;