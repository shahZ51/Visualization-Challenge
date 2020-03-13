var path ="static/samples.json";


function init() {
    const data = d3.json(path).then(function(data) {    
   
    const labels = data.names;
    
     var dropdownMenu = d3.select("#selDataset");

     labels.forEach(name => { 
     var option = dropdownMenu.append("option");
     option.text(name);
    });

 
    
    var metaData = data.metadata;
    
    var metaData1 =(metaData[0])
    
    var wfreq =metaData1.wfreq
     
    var demography = d3.select("#sample-metadata");
     demography.html(" ");
    Object.entries(metaData1).forEach(([key, value]) =>{
         var row = demography.append("h5");
         row.text(`${key} :  ${value}`)
        });

    

    var samples = data.samples
   
    var sample_values = samples.map(sample =>sample.sample_values);  
    
    var top10sample_values = sample_values[0].slice(0,10).reverse();
    
    var otu_ids = data.samples.map(sample =>sample.otu_ids); 
    var top10otu_ids = otu_ids[0].slice(0,10).reverse();
    
    var otu_labels = data.samples.map(sample =>sample.otu_labels);
    var top10otu_labels = otu_labels[0].slice(0,10).reverse();
    
    
    
    
    var barData =[{
        x:top10sample_values,
        y:top10otu_ids.map(id =>  ("OTU" + id.toString())),
        type:"bar",
        text:top10otu_labels,
        orientation: "h"
    }];

    var barLayout = {
        title: "Top 10 OTU's of the Subject"
    };


    Plotly.newPlot("bar", barData,barLayout); 



    var bubbleData =[{
        x: otu_ids[0],
        y: sample_values[0],
        text: otu_labels[0],
        mode: "markers",
        marker: {
        size: sample_values[0],
        color: otu_ids[0],
        colorscale: "Earth"}
    }];

    var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closests",
        xaxis: { title: "OTU ID"},
        yaxis: { title: "Sample Values"}
      };
  
    Plotly.plot("bubble", bubbleData, bubbleLayout);



    

 });
};




function optionChanged(ID){    
    
    updateDemography (ID);
    updatePlots(ID);
    updateGauge(ID);
};




function updateDemography(ID) {
    d3.json(path).then(function(data){
        var metaData = data.metadata;
        for (var i=0; i<metaData.length; i++) {
            if (metaData[i].id.toString() ===ID) {
                  
                var demography = d3.select("#sample-metadata");
                demography.html(" ");
                Object.entries(metaData[i]).forEach(([key, value]) =>{
                var row = demography.append("h5");
                row.text(`${key} :  ${value}`);
                });
            };
        };
    });
};



function updatePlots(ID) {
    
    d3.json(path).then(function(data) {
        var samples = data.samples 
          
    for (var i=0; i<samples.length; i++) {
        if (samples[i].id ===ID) {
            
            
            let barData =[{
                x:samples[i].sample_values.slice(0,10).reverse(),
                y:samples[i].otu_ids.slice(0,10).map(id =>  ("OTU" + id.toString())).reverse(),
                type:"bar",
                text:samples[i].otu_labels.slice(0,10).reverse(),
                orientation: "h"
            }];

            let barLayout = {
                title: "Top 10 OTU's "
            };
            Plotly.newPlot("bar", barData, barLayout);


            let bubbleData =[{
                x: samples[i].otu_ids,
                y: samples[i].sample_values,
                text: samples[i].otu_labels,
                mode: "markers",
                marker: {
                size: samples[i].sample_values,
                color: samples[i].otu_ids,
                colorscale: "Earth"}
            }];
        
            let bubbleLayout = {
                margin: { t: 0 },
                hovermode: "closests",
                xaxis: { title: "OTU ID"},
                yaxis: { title: "Sample Values"}
              };
          
        Plotly.plot("bubble", bubbleData, bubbleLayout);

        };
    };
});
};

init();
