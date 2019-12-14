import { Ellipse, Point, reflection, lineByPoints } from './p144';
import { initChart, drawBeam } from './p144.chart';

var startPoint = new Point(0.0, 10.1);
var nextPoint = new Point(1.4, -9.6);
var ellipse = new Ellipse(4, 1, 100);
var line = lineByPoints(startPoint, nextPoint);

var counter = 0;
var next = function(nextPoint, line, ellipse) {
    counter++;
    var result = reflection(nextPoint, line, ellipse);

    drawBeam(nextPoint, result[0], counter).fadeOut(100);

    nextPoint = result[0];
    line = result[1];

    if (nextPoint.x <= 0.01 && nextPoint.x >= -0.01 &&
        nextPoint.y <= 10.01 && nextPoint.y >= 9.99)
    {
        console.log('Done', counter, nextPoint);
    } else {
        setTimeout(function() {
            next(nextPoint, line, ellipse);
        }, 200)
    }
}

initChart();
next(nextPoint, line, ellipse);
