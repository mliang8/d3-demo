//Mengyu Liang
//Module 7 D3 Fundation- bubble chart 

//execute the following script when window is loaded
window.onload=function(){
	

	var w=900, h=500; //SVG dimension varibales
	var container=d3.select("body") //get the body elemnt from the DOM and return to a variable
		.append("svg") //add a new svg element in body
		.attr("width",w) //assign width to the operand
		.attr("height",h)  //assign height to the operand
		.attr("class","container")  //assign a class as the black name for styling and future seclection
		.style("background-color","rgba(249, 243, 67,0.5)"); //add a background color to the svg element
	var innerRect=container.append("rect")  //add a <rect> element into the svg
		.datum(400)  //add a single value to the rect
		.attr("width", function(da){
			return da*2;  //rectangle width
		}) 
		.attr("height",function(da){
			return da; //assgin a height to the rect
		})
		.attr("class","innerRect")  
		.attr("x",50)
		.attr("y",50)
		.style("fill","#ffeb66");
	//create an array to include the four cities and their population as data
	var cityPop=[
		{
			city: "Kunming",
			population: 3278780
		},
		{
			city: "Naples",
			population: 962000
		},
		{
			city: "Copenhagen",
			population: 1199000
		},
		{
			city: "Sydney",
			population: 4580000
		}
	];
	//using continuous linear scale function to evenly distribute the bubbles in x-direction
	var x=d3.scaleLinear()
		.range([90,705])
		.domain([0,3]);
	//find the min value of the data
	var minPop=d3.min(cityPop,function(d){
		return d.population;
	});
	//find the max value of the data
	var maxPop=d3.max(cityPop,function(d){
		return d.population;
	});
	//create a continuous color scheme to add fill colors to the buubles proportionally
	var color = d3.scaleLinear()
        .range([
            "#eff3ff",
            "#2171b5"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
    //using continuous linear function to scale the horizontal location of bubbles based on population size
	var y=d3.scaleLinear()
		.range([450,50])
		.domain([0,4500000
		]);
	//create circles based on population size
	var circles=container.selectAll(".circles") //create an empty selction for adding circles into 
		.data(cityPop) //feed in the array to draw the circles
		.enter() //join the data to the slection
		.append("circle")// add a circle for wach datum
		.attr("class","circles") //assign a class name for the cricles
		.attr("id",function(d){
			return d.city;
		})
		.attr("r",function(d){
			var area=d.population*0.001
			return Math.sqrt(area/Math.PI);
		})
		.attr("cx",function(d,i){
			return x(i);
		})
		.attr("cy", function(d){
            return y(d.population)+50;
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        }); //black circle stroke
    //create a y-axis to the left of the scaled bubbles
    var yAxis=d3.axisLeft(y);
    //create a group class to store the axis on the y-axis including the increments
    var axis=container.append("g")
    	.attr("class","axis")
    	.attr("transform","translate(50,0)")
    	.call(yAxis);
    //create a title for the graphic and center-align it, and furthur define its location 
    var title=container.append("text")
    	.attr("class","title")
    	.attr("text-anchor","middle")
    	.attr("x",450)
    	.attr("y",30)
    	.text("City Populations");
    //create circle labels by creating an empty selection first
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels") //define a class for the labels
        .attr("text-anchor", "left") //align the labels to the left
        /*.attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.0001 / Math.PI)+30;
        })*/
		//define the horizontal position 
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population)+45;
        });
        /*.text(function(d){
            return d.city + ", Pop. " + d.population;
        });*/
	//store the city nams of the data into a separate class and define its location
	var nameLine=labels.append("tspan")
		.attr("class","nameLine")
		.attr("x",function(d,i){
			return x(i) + Math.sqrt(d.population * 0.0001 / Math.PI)+30;
		})
		.text(function(d){
			return d.city;
		})
	//create format generator
	var format=d3.format(",");
	//create the second line of labels which includeds the population information 
	var popLine=labels.append("tspan")
		.attr("class","popLine")
		.attr("x",function(d,i){
			return x(i) + Math.sqrt(d.population * 0.0001 / Math.PI)+30;
		})
		.attr("dy","18")
		.text(function(d){
			return "Pop. "+format(d.population);
		});
	//console.log(circles);
};