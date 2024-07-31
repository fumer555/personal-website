class SVGSystemManager {
    constructor(svgRootId) {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.svgRoot = document.getElementById(svgRootId);
    }

    createX(x, y) {
        let x1 = x - 8;
        let x2 = x + 8;
        let y1 = y - 10;
        let y2 = y + 10;
        let pathData = `M${x1},${y1} L${x2},${y2} M${x1},${y2} L${x2},${y1}`;
        let path = document.createElementNS(this.svgNS, "path");
        path.setAttribute("d", pathData);
        path.setAttribute("class", "cross"); // Ensure you have a 'cross' class defined in your CSS
        this.svgRoot.appendChild(path);
    }

    createPolylines(startY, incrementX, numLines, classList) {
        let y = startY;
        for (let i = 0; i < numLines; i++) {
            let polyline = document.createElementNS(this.svgNS, "polyline");
            polyline.setAttribute("points", `265,${y} ${265 + incrementX},${y}`);
            polyline.setAttribute("id", `line-${i}`);
            if (classList && classList[i]) {
                polyline.setAttribute("class", classList[i]);
            }
            this.svgRoot.appendChild(polyline);
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

// Using the class
document.addEventListener("DOMContentLoaded", () => {
    const systemManager = new SVGSystemManager('svgRoot');
    systemManager.createPolylines(855, 290, 12, ["", "dashed-line", "hidden", "", "", "", "", "", "", "", "", ""]);
    systemManager.createX(300, 1175);
});
