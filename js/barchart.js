

d3.csv("data/excessdeaths.csv"). then(
    function(data) {
      data.forEach(function(d) {
            d.deaths = +d.deaths

        })
      data.sort(function(d) {
          return d3.descending (+d.deaths)
      console.log(data);
    })
        
var margin = {top: 40, right: 90, bottom: 100, left: 200},
    width = 1300 - margin.left - margin.right,
    height = 1300 - margin.top - margin.bottom,
    valueMargin = 4,
    labelWidth = 0;

    var valueMargin = 4

// append the svg object to the body of the page
var svg = d3.select("#chart-area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scaleOrdinal(d3.schemeCategory10);




  // Add X axis
  var x = d3.scaleLinear()
    .domain(([0, d3.max(data, function(d){ return d.deaths; })]))
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-size", "20px")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  var tooltip = d3.select("#chart-area")
            .append("div")
            .attr("class", "toolTip")
            .style("position", "absolute")
            .style("z-index", 10)
            .style("visibility", "hidden")
            .text("Simple text")
            .style("color","black")
            .style("font-weight","bold");

  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.State; }))
    .padding(.1);

  svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("font-size", "20px");

  //Bars
  var bars = svg.selectAll("rect")
    .data(data)
    .enter()

    bars.append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.State); })
    .attr("width", function(d) { return x(d.deaths); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d) {
          return color(d.State);
        })
    .on("mouseover", d => {tooltip.text("State :" + (d.State) + "||" + " Number of deaths : " + (d.deaths)); return tooltip.style("visibility", "visible")})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY +20)+"px").style("left",(d3.event.pageX+50)+"px");})
    .on("mouseout", () => tooltip.style("visibility", "hidden"));
    
    bars.append("text")
    .attr("class", "label")
    .style("font-size", "20px")
    .attr("y", function (d) {
                return y(d.State) + y.bandwidth() / 2 + 4;
            })

    .attr("x", function (d) {
                return x(d.deaths) + 3;
            })    
    ;

    svg.append("text")
        .attr("x", (width))             
        .attr("y", (height/3 ))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")   
        .style("fill", "orange")
        .style("font-weight","bold")
        .text("Hover on the bars!"); 
      
})

