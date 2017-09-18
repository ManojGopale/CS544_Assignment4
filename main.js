//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createRects(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.Col); })
        .attr("y", function(d) { return yScale(d.Row); })
        .attr("width", 10)
        .attr("height", 10);
}

function createPaths(sel)
{
    return sel
        .append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
        })
        .append("path");
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////

function glyphD(d) {
    // write this!
	// 1 => *, 2 => , 3 => +, 4 => --, 5 => -
	//debugger;
	var glyphScale = d3.scaleQuantize().domain([0, 500]).range([1, 2, 3, 4, 5]);
//	debugger;
	//console.log("X= " + xScale(d.Col) + " y= " + yScale(d.Row) );
	//return glyphScale(d.P);
	var x1 = xScale(d.Col);
	var y1 = yScale(d.Row);

	// Text
		var smallMinus =  ("M " + (x1+3) + " " + (y1+5) + " L " + (x1+7) + " " + (y1+5));	
		var largeMinus =  ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5));	
		var plus =  ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
								+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
								);	
		 var halfStar = ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
										+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
										+ " M " + (x1+9) + " " + (y1+1) + " L " + (x1+1) + " " + (y1+9)
										);	
		 var fullStar = ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
										+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
										+ " M " + (x1+9) + " " + (y1+1) + " L " + (x1+1) + " " + (y1+9)
										+ " M " + (x1+1) + " " + (y1+1) + " L " + (x1+9) + " " + (y1+9)
										);	

//	if (glyphScale(Math.abs(d.P)) === 1 ) {
//		//console.log("Inside the 1 loop, P= ", x1, y1, d.Col, d.Row, Math.abs(d.P), glyphScale(Math.abs(d.P)));
//		//debugger;
//		/return smallMinus;
//	} else if (glyphScale(Math.abs(d.P)) === 2) {
//		return largeMinus;
//	} else if (glyphScale(Math.abs(d.P)) === 3) {
//		//console.log("Inside the 1 loop, P= ", x1, y1, d.Col, d.Row, Math.abs(d.P), glyphScale(Math.abs(d.P)));
//		return plus;
//	} else if (glyphScale(Math.abs(d.P)) === 4) {
//		//console.log("Inside the 1 loop, P= ", x1, y1, d.Col, d.Row, Math.abs(d.P), glyphScale(Math.abs(d.P)));
//		return halfStar;
//	} else if (glyphScale(Math.abs(d.P)) === 5) {
//		//console.log("Inside the 1 loop, P= ", x1, y1, d.Col, d.Row, Math.abs(d.P), glyphScale(Math.abs(d.P)));
//		return fullStar;
//	};

// Switch
	switch ( glyphScale(Math.abs(d.P)) ) {
		case 1:
			//console.log("case 1");
			return smallMinus;
			break;
		case 2:
			//console.log("case 2");
			return largeMinus;
			break;
		case 3:
			//console.log("case 3");
			return plus;
			break;
		case 4:
			//console.log("case 4");
			return halfStar;
			break;
		case 5:
			//console.log("case 5: ", xScale(d.Col), yScale(d.Row), d.Col, d.Row, d.P);
			return fullStar;
			break;
		default:
			//return ("M " + x1 + " " + y1);
			//return ('M ' + x1 + " " + y1);
			//console.log("Default");
			//debugger;
			return ('M ');
	}
}

function glyphStroke(d) {
    // write this!
	//if (d.P < 0) {
	//	return "black";
	//} else {
	//	return "white";
	//}
	return "white";
}

function colorT1(d) {
    // write this!
	var TcolorScale = d3.scaleLinear()
										.interpolate(d3.interpolateHcl)
										.domain([-70, -60])
										.range(["orange", "blue"]);
//	debugger;
	//return TcolorScale(d.T);
	return d3.interpolateOranges(d3.scaleLinear().domain([-70, -60])(d.T));
}

function colorP1(d) {
    // write this!
	// Get the neutral value of color for the range
	var lowerColor = "orange";
	var upperColor = "blue";
	var nScale = d3.scaleLinear().interpolate(d3.interpolateHcl).
								domain([0,100]).range([lowerColor, upperColor]);

	//var nScale1 = d3.scaleLinear().interpolate(d3.interpolateHcl).
	//							domain([0,200]).range([lowerColor, upperColor]);
	//debugger;
	//console.log("1st Scale 0-100", nScale(50));
	//console.log("2ns scale 0-200",nScale1(100));

	var neutralColor = nScale(50);
	//console.log(neutralColor);

	var PcolorScale = d3.scaleLinear()
										.interpolate(d3.interpolateHcl)
										.domain([-500, 0, 500])
										.range([lowerColor, "white",  upperColor]);
	//return PcolorScale(d.P);
	//return d3.interpolateBrBG(d3.scaleLinear().domain([-500, 500])(d.P));
	return d3.interpolatePuOr(d3.scaleLinear().domain([-500, 500])(d.P));
}

function colorPT(d) {
    // write this!
	var tGradient = d3.scaleLinear().domain([-70, -60]);
	var pGradient = d3.scaleLinear().domain([-500, 500]);

	return d3.interpolatePuOr((tGradient(d.T) + pGradient(d.P))/2);
}

function colorT2(d) {
    // write this!
}

function createRectsLegend(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScaleLegend(d.Col); })
        .attr("y", function(d) { return yScaleLegend(d.Row); })
        .attr("width", 10)
        .attr("height", 10);
}


function legen1(d) {
	var TcolorScale = d3.scaleLinear()
										.interpolate(d3.interpolateHcl)
										.domain([-70, -60])
										.range(["orange", "blue"]);
//	debugger;
	//return TcolorScale(d.T);
	return d3.interpolateOranges(d3.scaleLinear().domain([-70, -60])(d.T));
	
}
//////////////////////////////////////////////////////////////////////////////

d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorT1);

d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorP1);

d3.select("#plot2-bivariate-color")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorPT);

var bivariateSvg = d3.select("#plot3-bivariate-glyph")
        .callReturn(createSvg);

bivariateSvg
    .callReturn(createRects)
    .attr("fill", colorT2);

bivariateSvg
    .callReturn(createPaths)
    .attr("d", glyphD)
    .attr("stroke", glyphStroke)
    .attr("stroke-width", 1);


// Legend for Plot 1
d3.select("#colorlegend-1")
	.append("svg")
	.attr("width", 100)
	.attr("height", 500)
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 75)
	.attr("height", 200)
	.attr("fill", legend1);
