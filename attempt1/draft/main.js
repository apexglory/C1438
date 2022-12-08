"use strict"

let svgWidth = 1200
let svgHeight = 1000

let margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 100
}

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

let data

// cant get data because of CORS
/*(async function () {
    data = await d3.json("myDailyTime.json").then(buildVisualization)
})();*/

buildVisualization()

function buildVisualization(data) {
    let renderData = organizeData(data);
    drawVisualization(renderData, svg);
    return data;
}

function organizeData(data) {
    /*This piece of code is to classify the data according to the date, and then put each day's data into an array*/
    const _data = [
        {
            "date": "17/10/2022",
            "exercise time": 100,
            "learn time": 2,
            "calories": 1157,
            "feel": 2
        },
        {
            "date": "18/10/2022",
            "exercise time": 80,
            "learn time": 3,
            "calories": 1023,
            "feel": 3
        },
        {
            "date": "19/10/2022",
            "exercise time": 120,
            "learn time": 1.5,
            "calories": 1732,
            "feel": 1
        },
        {
            "date": "20/10/2022",
            "exercise time": 60,
            "learn time": 4,
            "calories": 2265,
            "feel": 4
        },
        {
            "date": "21/10/2022",
            "exercise time": 30,
            "learn time": 5,
            "calories": 2680,
            "feel": 5
        },
        {
            "date": "22/10/2022",
            "exercise time": 45,
            "learn time": 1.5,
            "calories": 1705,
            "feel": 2
        },
        {
            "date": "23/10/2022",
            "exercise time": 55,
            "learn time": 1.75,
            "calories": 1698,
            "feel": 3
        },
        {
            "date": "24/10/2022",
            "exercise time": 70,
            "learn time": 2.75,
            "calories": 1600,
            "feel": 4
        },
        {
            "date": "25/10/2022",
            "exercise time": 60,
            "learn time": 1.75,
            "calories": 1590,
            "feel": 3
        },
        {
            "date": "26/10/2022",
            "exercise time": 30,
            "learn time": 1.2,
            "calories": 1670,
            "feel": 2
        },
        {
            "date": "27/10/2022",
            "exercise time": 120,
            "learn time": 1.1,
            "calories": 1890,
            "feel": 4
        },
        {
            "date": "28/10/2022",
            "exercise time": 130,
            "learn time": 1,
            "calories": 1900,
            "feel": 5
        },
        {
            "date": "29/10/2022",
            "exercise time": 120,
            "learn time": 1.8,
            "calories": 1300,
            "feel": 6
        },
        {
            "date": "30/10/2022",
            "exercise time": 150,
            "learn time": 5,
            "calories": 1200,
            "feel": 8
        },
        {
            "date": "31/10/2022",
            "exercise time": 150,
            "learn time": 3,
            "calories": 1240,
            "feel": 5
        },
        {
            "date": "01/11/2022",
            "exercise time": 20,
            "learn time": 3.75,
            "calories": 1200,
            "feel": 3
        },
        {
            "date": "02/11/2022",
            "exercise time": 130,
            "learn time": 3.5,
            "calories": 1300,
            "feel": 6
        },
        {
            "date": "03/11/2022",
            "exercise time": 120,
            "learn time": 4.5,
            "calories": 1450,
            "feel": 7
        },
        {
            "date": "04/11/2022",
            "exercise time": 180,
            "learn time": 5.5,
            "calories": 1500,
            "feel": 9
        },
        {
            "date": "05/11/2022",
            "exercise time": 135,
            "learn time": 4.5,
            "calories": 1450,
            "feel": 5
        },
        {
            "date": "06/11/2022",
            "exercise time": 145,
            "learn time": 3,
            "calories": 1350,
            "feel": 4
        },
        {
            "date": "07/11/2022",
            "exercise time": 100,
            "learn time": 2.6,
            "calories": 2100,
            "feel": 6
        },
        {
            "date": "08/11/2022",
            "exercise time": 30,
            "learn time": 1.8,
            "calories": 1500,
            "feel": 2
        },
        {
            "date": "09/11/2022",
            "exercise time": 45,
            "learn time": 2.9,
            "calories": 1450,
            "feel": 3
        },
        {
            "date": "10/11/2022",
            "exercise time": 100,
            "learn time": 2.55,
            "calories": 1670,
            "feel": 4
        },
        {
            "date": "11/11/2022",
            "exercise time": 80,
            "learn time": 2.6,
            "calories": 1560,
            "feel": 3
        },
        {
            "date": "12/11/2022",
            "exercise time": 130,
            "learn time": 3.45,
            "calories": 1680,
            "feel": 5
        },
        {
            "date": "13/11/2022",
            "exercise time": 120,
            "learn time": 4.2,
            "calories": 1650,
            "feel": 4
        },
        {
            "date": "14/11/2022",
            "exercise time": 20,
            "learn time": 5.3,
            "calories": 1800,
            "feel": 3
        },
        {
            "date": "15/11/2022",
            "exercise time": 50,
            "learn time": 4.65,
            "calories": 1955,
            "feel": 7
        },
        {
            "date": "16/11/2022",
            "exercise time": 40,
            "learn time": 2.45,
            "calories": 1800,
            "feel": 4
        },
        {
            "date": "17/11/2022",
            "exercise time": 110,
            "learn time": 4.3,
            "calories": 1905,
            "feel": 5
        },
        {
            "date": "18/11/2022",
            "exercise time": 120,
            "learn time": 5.2,
            "calories": 1890,
            "feel": 7
        },
        {
            "date": "19/11/2022",
            "exercise time": 150,
            "learn time": 3.2,
            "calories": 1480,
            "feel": 4
        },
        {
            "date": "20/11/2022",
            "exercise time": 160,
            "learn time": 4.2,
            "calories": 1455,
            "feel": 7
        },
        {
            "date": "21/11/2022",
            "exercise time": 190,
            "learn time": 4.35,
            "calories": 1400,
            "feel": 8
        },
        {
            "date": "22/11/2022",
            "exercise time": 20,
            "learn time": 2.35,
            "calories": 1800,
            "feel": 2
        },
        {
            "date": "23/11/2022",
            "exercise time": 33,
            "learn time": 3.35,
            "calories": 1700,
            "feel": 4
        },
        {
            "date": "24/11/2022",
            "exercise time": 150,
            "learn time": 4.2,
            "calories": 1300,
            "feel": 9
        },
        {
            "date": "25/11/2022",
            "exercise time": 65,
            "learn time": 2.2,
            "calories": 2300,
            "feel": 2
        }
    ]

    let organized = [];
    for (let i = 0; i < _data.length; i++) {
        let day = _data[i];
        let date = day.date;
        let exerciseTime = day["exercise time"];
        let learnTime = day["learn time"];
        let calories = day.calories;
        let feel = day.feel;
        let dayData = {
            date: date,
            exerciseTime: exerciseTime,
            learnTime: learnTime,
            calories: calories,
            feel: feel
        };
        organized.push(dayData);
    }

    return organized;
}

function drawVisualization(data, drawing) {
    /*This piece of code is to draw the visualization*/
    let dayWidth = (svgWidth-margin.left*2-margin.right*2+20) / 7; //the width of each day block
    let dayHeight = (svgWidth - margin.left*2-margin.right*2+20) / 7;
    //the height of each day block
    let dayPadding = 10;

    let dayGroup = drawing.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    let day = dayGroup.selectAll(".day").data(data);

    //draw the day circles
    day.enter().append("circle")
        .attr("class", "day")
        .attr("cx", (d, i) => {
            return (i % 7) * (dayWidth + dayPadding) + dayWidth / 2;
        })
        .attr("cy", (d, i) => {
            return (Math.floor(i / 7) * (dayHeight + dayPadding) + dayHeight / 2)+80;
        })
        .attr("r", (d) => {
            return d.exerciseTime / 3; //the radius of the circle is proportional to the exercise time
        })
        .attr("height", dayHeight)
        .attr("fill", function (d) {
            /*display different colors according to feel*/
            let feel = d.feel;
            let color = "black";
            if (feel <= 3) {
                color = "rgba(255,0,0,0.8)";
            }
            if (feel > 3 && feel <= 6) {
                color = "rgba(255,255,0,0.8)";
            }
            if (feel > 6) {
                color = "rgba(0,255,0,0.8)";
            }
            return color;
        })
    //draw the day block, just for a rectangle to cover the circle
    day.enter().append('rect')
        .attr("class", "day")
        .attr("x", (d, i) => {
            return (i % 7) * (dayWidth + dayPadding);
        })
        .attr("y", (d, i) => {
            return (Math.floor(i / 7) * (dayHeight + dayPadding))+80;
        })
        .attr("width", dayWidth)
        .attr("height", dayHeight)
        .attr("fill", "none")
        .attr("stroke", "black")

    //draw the date text
    let dayText = dayGroup.selectAll(".dayText").data(data);
    dayText.enter().append("text")
        .attr("x", function (d, i) {
            let x = i % 7;
            return x * (dayWidth + dayPadding);
        })
        .attr("y", function (d, i) {
            let y = Math.floor(i / 7);
            return (y * (dayHeight + dayPadding))+80;
        })
        .attr("dx", dayWidth / 2)
        .attr("dy", dayHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text(function (d) {
            let date = d.date;
            return date.split("/")[1] + "/" + date.split("/")[0];
        });

    //draw title and subtitle
    let dayTitle = dayGroup.append("text")
        .attr("x", 0)
        .attr("y", -30)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "central")
        .text("Calendar")
        .attr("font-size", "30px")
        .attr("font-weight", "bold")
    dayTitle.append("tspan")
        .attr("x", 0)
        .attr("y", -0)
        .attr("font-size", "16px")
        .attr("font-weight", "normal")
        .attr("text-anchor", "start")
        .text("Each day is a rectangle, the color of which represents the feeling of the day.");
    dayTitle.append("tspan")
        .attr("x", 0)
        .attr("y", 20)
        .attr("font-size", "16px")
        .attr("font-weight", "normal")
        .attr("text-anchor", "start")
        .text("The size of the circle represents the exercise time of the day.");

    //draw the week day text
    let xDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let xDayGroup = drawing.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    let xDayText = xDayGroup.selectAll(".xDayText").data(xDay);
    xDayText.enter().append("text")
        .attr("x", function (d, i) {
            return i * (dayWidth + dayPadding);
        })
        .attr("y", 0)
        .attr("dx", dayWidth / 2)
        .attr("dy", dayHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text(function (d) {
            return d;
        })

    //draw the legend for different feelings
    let legendGroup = drawing.append("g")
        .attr("transform", `translate(${svgWidth-margin.right-360},${margin.top})`);
    let legend = legendGroup.selectAll(".legend").data([["red","Bad"], ["yellow","Normal"],[ "green","Good"]]);
    legend.enter().append("rect")
        .attr("x", function (d, i) {
            return i * 150;
        })
        .attr("y", 0)
        .attr("width", 40)
        .attr("height", 20)
        .attr("fill", function (d) {
            return d[0];
        })
    legend.enter().append("text")
        .attr("x", function (d, i) {
            return i * 150;
        })
        .attr("y", 0)
        .attr("dx", -40)
        .attr("dy", 10)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text(function (d) {
            return d[1]+":";
        })
}

