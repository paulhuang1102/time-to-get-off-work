const iField = document.querySelector('#input-field');

const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth() + 1;
const nowDate = new Date().getDate();
var data = [];
var now, distance, totalHours, theTime;

function counter() {
    data = [];
    now = new Date().getTime();
    distance = theTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours < 1) {
        data.push(1, minutes, seconds);
    } else {
        data.push(hours, minutes, seconds);
    }

    document.getElementById("clock").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s ";

    if (distance < 0) {
        document.getElementById("clock").innerHTML = "EXPIRED";
        document.querySelector('body').style.backgroundImage = 'url(./img/1.jpg)';
        data.push(0, 0, 0);
        return;
    }

    requestAnimationFrame(counter);

}

const tau = 2 * Math.PI;

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
    return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
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
    return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
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
    return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
            d.endAngle = interpolate(t);
            return arcH(d);
        };
    };
}


function draw() {
    d3.interval(function() {
        foregroundS.transition()
            .duration(750)
            .attrTween("d", arcTweenS((1 - (data[2] - 1) / 60) * tau));

        foregroundM.transition()
            .duration(750)
            .attrTween("d", arcTweenM((1 - data[1] / 60) * tau));

        foregroundH.transition()
            .duration(750)
            .attrTween("d", arcTweenH((data[0] / totalHours) * tau));
    }, 1000);
}


// function draw() {
//     foregroundS.transition()
//         .attrTween("d", arcTweenS((1 - data[2] / 60) * tau));

//     foregroundM.transition()
//         .attrTween("d", arcTweenM((1 - data[1] / 60) * tau));

//     foregroundH.transition()
//         .attrTween("d", arcTweenH((data[0] / totalHours) * tau));

//     requestAnimationFrame(draw);
// }

iField.addEventListener('submit', function(e) {
    e.preventDefault();
    const time = iField.querySelector('input').value;
    // add regex
    const m = time.match(/[0-9]+\:[0-9]/);
    if (m === null) {
        alert('Please enter correct time format');
        return;
    }

    theTime = new Date(nowYear + '-' + nowMonth + '-' + nowDate + ' ' + time).getTime();
    now = new Date().getTime();
    distance = theTime - now;
    totalHours = (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    if (totalHours < 1) {
        totalHours = 1;
    }
    document.querySelector('body').style.backgroundImage = '';


    counter();
    draw();

});