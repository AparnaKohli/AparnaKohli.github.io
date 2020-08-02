var margin = {top: 40, right: 90, bottom: 100, left: 200},
    width = 1600 - margin.left - margin.right,
    height = 1300 - margin.top - margin.bottom;

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  //var cValue = function(d) { return d.State;};

// append the svg object to the body of the page
  var svg1 = d3.select("#scatterplot-area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/hospitalbeds.csv").then(function(data){
    console.log(data);

    data.forEach(function(d){
        d.hospitalbeds = +d.hospitalbeds;
        d.logdeaths = + d.logdeaths;
        d.yhat = +d.yhat;
    });

//Append new line
    /*var newline = d3.line()
        .x(function(d) {
            return x(d.hospitalbeds);
        })
        .y(function(d) {
            return y(d.yhat);
        });*/

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0,5])
        .range([0, width]);
  
  var xAxisGenerator = d3.axisBottom(x);
  xAxisGenerator.tickValues([0,1,2,3,4,5]);


  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisGenerator)
    .selectAll("text")
    .style("font-size", "20px");


    svg1.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Hospital beds per 1000 people");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
            return d.logdeaths;
        })])
        .range([height, 0]);

  svg1.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("font-size", "20px");

  svg1.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Log(excess deaths due to Covid 19)");

    var tooltip = d3.select("#chart-area")
            .append("div")
            .attr("class", "toolTip")
            .style("position", "absolute")
            .style("z-index", 10)
            .style("visibility", "hidden")
            .text("Simple text")
            .style("color","black")
            .style("font-weight","bold");

  // Add dots
  svg1.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.hospitalbeds); } )
      .attr("cy", function (d) { return y(d.logdeaths); } )
      .attr("r", 7)
      .style("fill", function(d) { return color(d.State);}) 
      .on("mouseover", d => {tooltip.text("State :" + (d.State) + "||" + " Number of deaths : " + (d.deaths)); return tooltip.style("visibility", "visible")})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY +20)+"px").style("left",(d3.event.pageX+50)+"px");})
      .on("mouseout", () => tooltip.style("visibility", "hidden"));
    

    svg1.append("text")
        .attr("x", (0.80*width))             
        .attr("y", (height/2 ))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")   
        .style("fill", "orange")
        .style("font-weight","bold")
        .text("Hover on the dots!"); 

    svg1.append("rect")

        .attr("x", 0.65*width )
        .attr("y", 0.62*height)
        .attr("width", "305px")
        .attr("height", "170px" )
        .style("fill", "none")
        .attr('stroke', 'black');


    svg1.append("text")
        .attr("x", 0.80*width)             
        .attr("y", 0.62*height +190)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")   
        .style("fill", "orange")
        .style("font-weight","bold")
        .text("States with >3.5 beds/1000 people have extremely low number of excess deaths!")
        .style("font-size", "14px"); 

    svg1.append("text")
        .attr("x", 0.80*width)             
        .attr("y", 0.62*height +210)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")   
        .style("fill", "orange")
        .style("font-weight","bold")
        .text("These include Nebraska, Montana, Kansas, Wyoming, West Virginia and North Dakota.")
        .style("font-size", "12px"); 

      
/*svg.append("text")
    .attr("x", 0.6*width)
    .attr("y", height/2)
    .attr("font-size", "26px")
    .attr("fill", "orange")
    .text("y = 0.129 + x*6.52e-07");*/

})
