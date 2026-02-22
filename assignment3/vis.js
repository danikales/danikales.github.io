// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec1 = vl     //chart 1
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("Platform").sort("-y"),
      vl.y().fieldQ("Global_Sales").aggregate("sum")
      
    )
    .width("500")
    .height(400)
    .toSpec();

  const vlSpec2 = vl        //chart 2
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("Genre").sort("-y"),
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().value("teal")
    )
    .width("500")
    .height(500)
    .toSpec();

  render("#view", vlSpec1);
  render("#view2", vlSpec2);

  ///////////////////////////////visualization2
const vlSpec3 = {       //chart 3
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "./dataset/videogames_long.csv"},
  "width": 800,
  "height": 400,
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": "Year"
    },
    "y": {
      "aggregate": "sum",
      "field": "sales_amount",
      "type": "quantitative",
      "title": "Sales Amount (millions)"
    },
    "color": {
      "field": "platform",
      "type": "nominal",
      "title": "Platform",
      "scale": {"scheme": "category20"}
    },
    "tooltip": [
      {"field": "year", "type": "ordinal", "title": "Year"},
      {"field": "platform", "type": "nominal", "title": "Platform"},
      {"aggregate": "sum", "field": "sales_amount", "type": "quantitative", "title": "Sales Amount (millions)"}
    ]
  }
};

const vlSpec4 = {           //chart4
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "./dataset/videogames_long.csv"},
  "width": 800,
  "height": 400,
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": "Year",
      "axis": {"tickMinStep": 5} 
    },
    "y": {
      "aggregate": "sum",
      "field": "sales_amount",
      "type": "quantitative",
      "title": "Sales Amount (billions)"
    },
    "color": {
      "field": "genre",
      "type": "nominal",
      "title": "Genre",
      "scale": {"scheme": "category20"}
    },
    "tooltip": [
      {"field": "year", "type": "ordinal", "title": "Year"},
      {"field": "genre", "type": "nominal", "title": "Genre"},
      {"aggregate": "sum", "field": "sales_amount", "type": "quantitative", "title": "Sales Amount (millions)"}
    ]
  }
};
render("#view3", vlSpec3);
render("#view4", vlSpec4);
/////////////////// visualization 3
const vlSpec5 = {           //chart 5
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",

  "repeat": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
  "columns": 2,

  "spec": {
    "data": {"url": "./dataset/videogames_wide.csv"},

    "mark": "bar",

    "encoding": {
      "x": {
        "field": "Platform",
        "type": "nominal"
      },

      "y": {
        "aggregate": "sum",
        "field": {"repeat": "repeat"},
        "type": "quantitative",
        "stack": null
      },

      "color": {
        "field": "Platform",
        "type": "nominal"
      },
      "tooltip": [
        {"field": "Platform", "type": "nominal", "title": "Platform"},
        {"field": {"repeat": "repeat"}, "aggregate": "sum", "type": "quantitative", "title": "Total Sales (millions)"}
      ]
    }
  },

  "resolve": {
    "scale": {"y": "shared"}
  }
  
};

const vlSpec6 = {           //chart 6
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",

  "data": {"url": "./dataset/videogames_long.csv"},

  "transform": [
    {
      "aggregate": [{"op": "sum", "field": "sales_amount", "as": "TotalSales"}],
      "groupby": ["sales_region", "platform"]
    }
  ],

  "facet": {
    "column": {
      "field": "sales_region",
      "type": "nominal",
      "title": null,
      "labelExpr": "datum.value == 'NA' ? 'North America' : datum.value == 'EU' ? 'Europe' : datum.value == 'JP' ? 'Japan' : 'Other Regions'"
    }
  },

  "spec": {
    "mark": {"type": "arc"},

    "encoding": {
      "theta": {"field": "TotalSales", "type": "quantitative"},
      "color": {"field": "platform", "type": "nominal"},
      "tooltip": [
        {"field": "platform", "type": "nominal", "title": "Platform"},
        {"field": "sales_region", "type": "nominal", "title": "Region"},
        {"field": "TotalSales", "type": "quantitative", "title": "Total Sales (millions)"}
      ]
    }
  }
};


render("#view5", vlSpec5);
render("#view6", vlSpec6);

////////////visualization 4
const vlSpec7 = {  // Chart 7 - Japan Sales
 "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "description": "Nintendo Japan Sales Over Years",
  
  "data": {
    "url": "./dataset/videogames_wide.csv",
    "format": {"type": "csv"}
  },
//chatgpt was used here to filter to get nintendo
  "transform": [
    {"filter": "datum.Publisher == 'Nintendo'"}
  ],
//
  "width": 800,
  "height": 400,

  "mark": {
    "type": "line",
    "point": true
  },

  "encoding": {
    "x": {
      "field": "Year",
      "type": "quantitative",
      "title": "Year"
    },
    "y": {
      "aggregate": "sum",
      "field": "JP_Sales",
      "type": "quantitative",
      "title": "Japan Sales (Millions)"
    },
    "tooltip": [
      {"field": "Year", "type": "ordinal", "title": "Year"},
      {"aggregate": "sum", "field": "JP_Sales", "type": "quantitative", "title": "Japan Sales (millions)"},
      {"field": "Name", "type": "nominal", "title": "Game Name"}
    ]
  }
};
const vlSpec8 ={                //chart 8
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
 
  "data": { "url": "./dataset/videogames_long.csv" },
    "width": 400,
  "height": 400,
  "transform": [
    { "filter": "datum.name == 'Monopoly'" } 
  ],

  "mark": "circle",

  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal", 
      "title": "Year"
    },
    "y": {
      "field": "platform",
      "type": "nominal",
      "title": "Platform"
    },
    "size": {
      "field": "global_sales",
      "type": "quantitative",
      "title": "Global Sales (million)"
    },
    "color": {
      "field": "platform",
      "type": "nominal"
    },
    "tooltip": [
      {"field": "name", "type": "nominal", "title": "Game Name"},
      {"field": "platform", "type": "nominal", "title": "Platform"},
      {"field": "year", "type": "ordinal", "title": "Year"},
      {"field": "global_sales", "type": "quantitative", "title": "Global Sales (millions)"}
    ]
  }
};

render("#view7", vlSpec7);
render("#view8", vlSpec8);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}