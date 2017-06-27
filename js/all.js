const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth() + 1;
const nowDate = new Date().getDate();
const offTime = '17:30'; //Your get off work time
const theTime = new Date(nowYear + '-' + nowMonth + '-' + nowDate + '-' + offTime).getTime();
var data = [];
var totalHours = 8.5; //Your total working hours

var x = setInterval(function () {
    data = [];
    var now = new Date().getTime();
    var distance = theTime - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    data.push(hours, minutes, seconds);

    document.getElementById("clock").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("clock").innerHTML = "EXPIRED";
        document.querySelector('body').style.backgroundImage = 'url(./img/1.jpg)';
    }

}, 1000);

var tau = 2 * Math.PI;

var arcS = d3.arc()
    .innerRadius(240)
    .outerRadius(300)
    .startAngle(0);

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var backgroundS = g.append("path")
    .datum({ endAngle: tau })
    .style("fill", "#ddd")
    .attr("d", arcS);

var foregroundS = g.append("path")
    .datum({ endAngle: 0 })
    .style("fill", "#87B4FF")
    .attr("d", arcS);


function arcTweenS(newAngle) {
    return function (d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arcS(d);
        };
    };
}

var arcM = d3.arc()
    .innerRadius(180)
    .outerRadius(240)
    .startAngle(0);

var backgroundM = g.append("path")
    .datum({ endAngle: tau })
    .style("fill", "#888")
    .attr("d", arcM);

var foregroundM = g.append("path")
    .datum({ endAngle: 0 })
    .style("fill", "87FFAE")
    .attr("d", arcM);

function arcTweenM(newAngle) {
    return function (d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arcM(d);
        };
    };
}

var arcH = d3.arc()
    .innerRadius(120)
    .outerRadius(180)
    .startAngle(0);

var backgroundH = g.append("path")
    .datum({ endAngle: tau })
    .style("fill", "#666")
    .attr("d", arcH);

var foregroundH = g.append("path")
    .datum({ endAngle: 0 })
    .style("fill", "#F0E68C")
    .attr("d", arcH);

function arcTweenH(newAngle) {
    return function (d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arcH(d);
        };
    };
}

d3.interval(function () {
    foregroundS.transition()
        .duration(750)
        .attrTween("d", arcTweenS((1 - data[2] / 60) * tau));

    foregroundM.transition()
        .duration(750)
        .attrTween("d", arcTweenM((1 - data[1] / 60) * tau));

    foregroundH.transition()
        .duration(750)
        .attrTween("d", arcTweenH((1 - data[0] / totalHours) * tau));
}, 1000);