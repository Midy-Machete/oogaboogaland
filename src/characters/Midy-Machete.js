(() => {
  "use strict";
  const BL = window.BL;
  const { makeVox, voxelGeometry } = BL.models;
  const { createNode, addChild } = BL.scene;
  // Midy-Machete: Bitcoin warrior queen with Junior at her side.
  const RED = "#ff2438", RED_CORE = "#ffe2d9";
  const GOLD = "#f3b82c", GOLD_HI = "#ffe077", BLACK = "#211c25";
  const dogVox = (k) => {
    const v = makeVox(), c = (hex) => k.color(hex);
    const tan = c("#c58b55"), dark = c("#986039"), cream = c("#f1d5a9");
    const eye = c("#201715"), nose = c("#30201b"), gold = c(GOLD), collar = c(BLACK);
    for (const [x,z] of [[-1,1],[1,1],[-1,-3],[1,-3]]) {
      v.fill(x,x,1,2,z,z,tan); v.set(x,0,z,cream);
    }
    v.fill(-1,1,3,5,-3,2,tan);
    v.fill(-1,1,3,4,2,2,cream);
    v.fill(-1,1,6,8,2,4,tan);
    v.fill(-1,1,6,6,2,2,collar);
    v.set(0,6,3,gold); // Bitcoin collar pendant
    v.set(-1,7,4,eye); v.set(1,7,4,eye);
    v.set(0,6,5,cream); v.set(0,7,5,cream); v.set(0,7,6,nose);
    // Long, floppy ears hang down either side of Junior's face.
    for (const x of [-2,2]) {
      v.fill(x,x,3,8,2,3,dark);
      v.fill(x,x,4,6,4,4,tan);
    }
    v.set(0,5,-4,tan); v.set(0,6,-4,tan); v.set(0,7,-3,cream);
    return v;
  };
  const crownVox = (k) => {
    const v = makeVox(), gold = k.color(GOLD), hi = k.color(GOLD_HI), gem = k.color("#e77d19");
    // A low royal band and five tall crenellated gold points.
    v.fill(-1,7,8,9,-1,6,gold);
    v.fill(0,6,10,10,0,5,hi);
    for (const x of [0,2,4,6]) {
      v.fill(x,x,11,12,0,1,hi);
      v.fill(x,x,11,12,5,6,hi);
    }
    v.fill(-1,0,11,12,2,4,gold); v.fill(6,7,11,12,2,4,gold);
    v.set(3,10,6,gem); v.set(3,11,6,hi);
    return v;
  };
  const swordPalette = ["#a8b5c4", "#f5f5e8", "#efb632", "#29242b"];
  const swordGoldPalette = ["#f3c344", "#fff3a8", "#f7d65c", "#3c3023"];
  const swordVox = () => {
    const v = makeVox();
    // Half-size voxels; blade extends upward from the hand grip.
    v.fill(-1,1,-6,-1,0,1,3);
    v.fill(-4,4,0,1,0,1,2);
    v.fill(-2,2,2,16,0,1,0);
    v.fill(0,0,2,16,-1,-1,1);
    v.fill(-1,1,17,19,0,0,1);
    v.set(0,20,0,1);
    return v;
  };
  BL.characters.add({
    handle: "Midy-Machete",
    github: "Midy-Machete",
    display: "Midy-Machete",
    joined: 1792943472,
    lastCommit: 1792943472,
    look: {
      face: "default", noPupils: true, height: 1.04, hatY: 13,
      skin: "#c88762", hair: "#1d1420", fur: "#c58b55",
      portrait: { min: [-1, -2, 0], max: [7, 6, 8] }
    },
    voice: {
      poke: "Stack sats!",
      idle: [
        "GM, humble plebs!",
        "Not your keys, not your coins.",
        "Proof of work, every day.",
        "Junior, let's go explore!",
        "Bitcoin warrior queen reporting for duty."
      ]
    },
    dress: {
      torso(k, v) {
        const armor = k.color(BLACK), gold = k.color(GOLD), hi = k.color(GOLD_HI);
        const skin = k.skinJ;
        v.fill(1,7,3,7,1,4,armor);
        v.fill(1,1,7,7,1,4,skin);
        v.fill(7,7,7,7,1,4,skin);
        v.fill(1,7,3,3,4,4,gold);
        v.fill(1,1,4,7,4,4,gold);
        v.fill(7,7,4,7,4,4,gold);
        v.fill(2,6,6,6,4,4,armor);
        v.fill(3,5,6,7,4,4,skin);
        v.set(4,5,4,gold); v.set(4,4,4,hi); // golden Bitcoin chest medallion
      },
      club(k) {
        const v = swordVox(), unit = k.u / 2;
        const origin = { x: -0.5 * unit, y: 0, z: 0 };
        return {
          default: voxelGeometry(v, { unit, palette: swordPalette, origin }),
          gold: voxelGeometry(v, { unit, palette: swordGoldPalette, origin }),
          rest: { x: 0.95, z: 0 }, carry: { x: 0.95, z: 0 }
        };
      },
      crown(k,v) {
        const dark = k.color("#160e1b"), shine = k.color("#302132");
        for (let y=1; y<=8; y++) for (let z=-1; z<=6; z++) {
          for (const x of [-1,7]) v.set(x,y,z,dark);
        }
        // Long dark locks extend below the head on both sides.
        for (const x of [-1,7]) for (let y=-6; y<=0; y++) {
          v.set(x,y,0,dark); v.set(x,y,2,shine); v.set(x,y,4,dark);
        }
        v.fill(0,6,7,8,-1,-1,dark);
      },
      eyes(k,v) {
        const red = k.color(RED), core = k.color(RED_CORE);
        for (const x0 of [0,5]) {
          for (let x=x0; x<=x0+1; x++) for (let y=2; y<=3; y++) {
            v.set(x,y,5,red); k.eyeCells.push([x,y]);
          }
          v.set(x0+(x0 ? 0 : 1),3,5,core);
        }
        k.headEmissive = { [red]: 1, [core]: 1.4 };
        return true;
      },
      headgear(k) {
        addChild(k.parts.head, createNode({
          geometry: k.vg(crownVox(k), { x: -3.5*k.u, y: 0, z: -3*k.u })
        }));
      },
      extras(k) {
        // Junior stays parented to the character, beside and slightly behind her.
        const s = 0.7, h = k.h;
        k.parts.dog = createNode({
          position: { x: 0.55*h, y: -5*k.u, z: -0.25*h },
          scale: { x:s, y:s, z:s },
          geometry: k.vg(dogVox(k), { x:-0.5*k.u, y:0, z:-0.5*k.u })
        });
        addChild(k.root,k.parts.dog);
      }
    }
  });
})();
