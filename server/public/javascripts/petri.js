var width = 1000,
    height = 500;

var nodes = d3.range(75).map(function() { 
  return {radius: Math.floor(Math.random() * 12 + 4)}; 
}),
root = nodes[0];

var vals = Object.keys(nodes).map(function(key) {
  // console.log(nodes[key]);
});

root.radius = 0;
root.fixed = true;

var force = d3.layout.force()
    .gravity(0)
    .charge(function(d, i) { return i ? 0 : -15; })
    .nodes(nodes)
    .size([width, height]);

force.start();

var svg = d3.select(".canvas").append("svg");

var circles = [];
var triangles = [];
var squiggles = [];

svg.each(function(p, j) {
  d3.select(this)
    .selectAll("circle");


  for (i = 0; i<nodes.length; i++) {
    if (nodes[i].radius > 12) {
      circles.push(nodes[i]);
    }

    else if (nodes[i].radius > 7) {
      triangles.push(nodes[i]);
    }

    else {
      squiggles.push(nodes[i]);
    }
  }
});

svg.selectAll("circle")
    .data(circles.splice(1))
  .enter().append("circle")
    .attr("r", function() { return 15; })
    .style("stroke", function(d, i) { return "#240eba"; })
    .style("stroke-width", function(d, i) { return "2px"; })
    .style("fill", "transparent");

var triangleWidth = 25;

svg.selectAll("polygon")
    .data(triangles.splice(1))
  .enter().append("polygon")
    .style("stroke", function(d, i) { return "#240eba"; })
    .style("stroke-width", function(d, i) { return "2px"; })
    .style("stroke-linejoin", function(d, i) { return "round"; })
    .attr("transform", function(d, i) { 
      if (Math.random() > 0.5) { return "rotate(180, 180, 180)"; } 
    })
    .style("transform-origin", function(d, i) {return "center center";})
    .style("fill", "transparent");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

svg.selectAll("path")
    .data(squiggles.splice(1))
  .enter().append("path")
    .attr("transform", function(d, i) { 
      var rotation = getRandomArbitrary(0, 360);
      return "rotate(" + rotation + ", " + rotation + ", " + rotation + ")";
    })
    .style("transform-origin", function(d, i) {return "center center";})
    .style("stroke", function(d, i) { return "#240eba"; })
    .style("stroke-width", function(d, i) { return "2px"; })
    .style("stroke-linejoin", function(d, i) { return "round"; })
    .style("stroke-linecap", function(d, i) { return "round"; })
    .style("fill", function(d, i) { return "transparent"; });

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

  svg.selectAll("path")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

  svg.selectAll("polygon")
    .attr("points", function(d, i) {
      var aX = (d.x - (triangleWidth/2));
      var bX = (d.x + (triangleWidth/2));
      var PosabY = (d.y + (1.25 * triangleWidth));
      var NegabY = (d.y - (1.25 * triangleWidth));
      pathData = [[d.x, d.y], [aX, PosabY], [bX, PosabY]]; 
      pathData.map(e => e.join(','));
      // NEGATIVE
      pathData1 = [[d.x, d.y], [aX, NegabY], [bX, NegabY]]; 
      pathData1.map(e => e.join(','));

      return pathData.join(' ');
    });

  svg.selectAll("path")
    .attr("d", function(d) { return "M" + d.x + " " + d.y + " Q " + (d.x + 20) + " " + (d.y + 20) + ", " + (d.x + 40) + " " + (d.y + 2) + " T " + (d.x + 80) + " " + (d.y + 5); })
});

svg.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

function collide(node) {
  var r = node.radius + 1,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}