const margin ={
	top: 30,
	right: 30,
	bottom: 70,
	left: 60
};

const width = 460 - margin.left - margin.right;

const height = 400 -margin.top - margin.bottom;

const svg = d3.select('#vis1')
	.append('svg')
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv('data.csv').then(function(data){
	const x = d3.scaleBand()
		.range([0, width])
		.domain(data.map(d=>d.Category))
		.padding(0.2);
	svg.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(x))
		.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");
	const y = d3.scaleLinear()
		.domain([0,100000])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(y));
	svg.selectAll("mybar")
		.data(data)
		.join("rect")
			.attr("x", d=>x(d.Category))
			.attr("y", d=> y(d.Value))
			.attr("width", x.bandwidth())
			.attr("height", d=>height-y(d.Value))
			.attr("fill", "#571fc7")
})