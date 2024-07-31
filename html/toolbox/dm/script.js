class System {
    constructor(svgRootId) {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.svgRoot = document.getElementById(svgRootId);
    }

    createPolylines(startY, incrementX, numLines, classList) {
        // const svgNS = "http://www.w3.org/2000/svg";
        let y = startY;
        for (let i = 0; i < numLines; i++) {
            let polyline = document.createElementNS(svgNS, "polyline");
            polyline.setAttribute("points", `265,${y} ${265 + incrementX},${y}`);
            polyline.setAttribute("id", `line-${i}`);
            if (classList && classList[i]) {
                polyline.setAttribute("class", classList[i]);
            }
            document.getElementById("svgRoot").appendChild(polyline);
            y += 40; // Increment y by 40 for each line
        }
    }

    changeClass(lineId, newClass) {
        let line = document.getElementById(lineId);
        if (line) {
            line.setAttribute("class", newClass);
        }
    }
}



// function changeClass(lineId, newClass) {
//     let line = document.getElementById(lineId);
//     if (line) {
//         line.setAttribute("class", newClass);
//     }
// }

// Initialize with some lines
window.onload = function() {

    const lineManager = new System('svgRoot');
    lineManager.createPolylines(855, 290, 12, ["", "dashed-line", "hidden", "hidden", "", "", "", "", "", "", "", ""]);
    // createPolylines(855, 290, 12, ["", "dashed-line", "hidden", "", "", "", "", "", "", "", "", ""]);
};

// Using the class
// document.addEventListener("DOMContentLoaded", () => {
//     const lineManager = new System('svgRoot');
//     lineManager.createPolylines(855, 290, 12, ["", "dashed-line", "hidden", "hidden", "", "", "", "", "", "", "", ""]);
// });
