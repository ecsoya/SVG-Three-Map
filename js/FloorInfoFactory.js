FloorInfoFactory = function (graph) {

    this.floorInfo = {
        svg: $("#svg2"),
        width: 1196,
        height: 1444,
        graph: graph,
        leaveDoor: [{
            cellX: "58",
            cellY: "43",
            to: [-1, 1],
            type: "1",
            channel: 1,
        },
            {
                cellX: "73",
                cellY: "43",
                to: [-1, 1],
                type: "1",
                channel: 2,
            },
            {
                cellX: "55",
                cellY: "61",
                to: [-1, 1],
                type: "3",
                channel: 4,
            }
        ],
        comingDoor: [{
            cellX: "58",
            cellY: "43",
            to: [-1, 1],
            type: "1",
            channel: 1,
        },
            {
                cellX: "73",
                cellY: "43",
                to: [-1, 1],
                type: "1",
                channel: 2,
            },
            {
                cellX: "55",
                cellY: "61",
                to: [-1, 1],
                type: "3",
                channel: 4,
            }
        ],
        leaveDoor1: {
            cellX: "58",
            cellY: "43",
            to: [1, 16] //可以去的层数
        },
        comingDoor1: {
            cellX: "58",
            cellY: "43",
            to: [1, 16] //可以去的层数
        },
        leaveDoor2: {
            cellX: "73",
            cellY: "43",
            to: [1, 16] //可以去的层数
        },
        comingDoor2: {
            cellX: "73",
            cellY: "43",
            to: [1, 16] //可以去的层数
        },
        leaveCarDoor1: {
            cellX: "55",
            cellY: "61",
            to: [1, 16] //可以去的层数
        },
        comingCarDoor1: {
            cellX: "55",
            cellY: "61",
            to: [1, 16] //可以去的层数
        },
        floor: 2
    };

}