import {
    asCubic,
    asSvg,
    group,
    pathFromCubics,
    points,
    polygon,
    rect,
    svgDoc,
    vertices,
} from "@thi.ng/geom";
import * as ti from "@thi.ng/iterators"
import { simplify } from "@thi.ng/geom-resample";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { canvas } from "@thi.ng/hdom-canvas";
import { PI, TAU } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { map, mapcat, normRange } from "@thi.ng/transducers";
import { cycle } from "@thi.ng/transducers/cycle";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { cartesian2, Vec } from "@thi.ng/vectors";
import { checkbox, slider } from "./controllers";
import {
    animationStream,
    AppState,
    mainStream,
    scaleStream,
} from "./stream-state";

const edge = window.innerWidth * 0.7;
const width = edge;
const height = edge;
const radius = (width / 2) * 0.8;
const center = [width / 2, height / 2];

const rndInt = (min: number, max: number) => SYSTEM.minmax(min, max) | 0;

const startingCircles: Array<[number, number, boolean]> = [
    [radius / 1,  5, false],
    [radius / 2,  11, true],
    [radius / 4, 17, false],
    [radius / 8, 5, true],
];

const pointsInCircle = (
    _center: Vec,
    _radius: number,
    _num: number,
    _angle: number
) => [
    ...map(
        (index) => cartesian2(null, [_radius, index * TAU + _angle], _center),
        normRange(_num, false)
    ),
];

mainStream.transform(map(appRender), updateDOM());

const blah = cycle(
  map((x: number) => 300 + (100 * Math.sin(x * 0.001)),
  // map((x: number) => 500 + (100 * Math.sin(x * 0.01)),
      ti.range(1000))
);


function computeVoronoi(state: AppState) {
    const delta = state.frameValue / blah.next().value;

    const startPoints = [
        ...mapcat(
            ([rad, density, clockwise]) =>
                pointsInCircle(
                    center,
                    rad,
                    density,
                    clockwise ? delta : PI - delta
                ),
            startingCircles
        ),
    ];

    const bounds = rect([width, height], { fill: "111111" }); //color
    const mesh = new DVMesh();
    mesh.addKeys(startPoints, 0.01);
    const cells = mesh.voronoi(vertices(bounds));

    const voronoi = [
        bounds,

        group(
            { fill: "white", "stroke-width": 1}, //color
            cells.map((cell) =>
                pathFromCubics(
                    asCubic(polygon(simplify(cell, 0.5, true)), {
                        scale: state.scaleValue,
                    })
                )
            )
        ),

        points(startPoints, {
            size: 2,
            shape: "circle",
            fill: "111111", //color
        }),
    ];

    return voronoi;
}

function appRender(state: AppState) {
    return [
        "div.ma3.flex.flex-row.flex-column-l.flex-column-m.sans-serif",
        [
            [
                "div.pr3.flex.justify-center",
                [
                    "div.mv3",
                    slider(
                        state.scaleValue,
                        (x: number) => scaleStream.next(x),
                        0,
                        1.2,
                        0.01,
                        "Tangent scale factor"
                    ),
                ],
            ],
            [
                "div.flex.justify-center",
                [canvas, { width, height }, ...computeVoronoi(state)],
            ],
        ],
    ];
}

// if (process.env.NODE_ENV !== "production") {
//     const hot = (<any>module).hot;
//     hot && hot.dispose(() => mainStream.done());
// }
