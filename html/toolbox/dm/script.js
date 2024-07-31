class SVGLineManager {
    constructor(svgRootId) {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.svgRoot = document.getElementById(svgRootId);
        this.setupDownloadListener();
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
            y += 40;
        }
    }

    changeClass(lineId, newClass) {
        let line = document.getElementById(lineId);
        if (line) {
            line.setAttribute("class", newClass);
        }
    }

    createX(x, y) {
        let x1 = x - 8;
        let x2 = x + 8;
        let y1 = y - 10;
        let y2 = y + 10;
        let pathData = `M${x1},${y1} L${x2},${y2} M${x1},${y2} L${x2},${y1}`;
        let path = document.createElementNS(this.svgNS, "path");
        path.setAttribute("d", pathData);
        path.setAttribute("class", "cross");
        this.svgRoot.appendChild(path);
    }

    setupDownloadListener() {
        this.svgRoot.addEventListener('dblclick', () => this.downloadImage());
    }

    downloadImage() {
        let svgData = new XMLSerializer().serializeToString(this.svgRoot);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();

        img.onload = () => {
            canvas.width = this.svgRoot.clientWidth;
            canvas.height = this.svgRoot.clientHeight;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                let url = URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.href = url;
                link.download = "image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lineManager = new SVGLineManager('svgRoot');
    lineManager.createPolylines(855, 290, 12, ["", "dashed-line", "hidden", "", "", "", "", "", "", "", "", ""]);
    lineManager.createX(300, 1175);
});
