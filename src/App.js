import React, { Component } from 'react';
import { post,get } from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      links: [],
      data: []
    }
    this.onformSubmit = this.onformSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onformSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file).then((response) => {
      this.setState({
        links: response.data
      })
    })

  }
  onChange(e) {
    this.setState({
      file: e.target.files[0]
    })
  }

  fileUpload(file) {
    const url = 'http://localhost:3000/api/file/file';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fission labs</h1>
        </header>
        <form onSubmit={this.onformSubmit}>
          <input type='file' onChange={this.onChange} />
          <button type="submit" onClick={this.displayLinks}>Upload</button>
          {this.state.links.map((link, i) =>
            <div className='row' key={i}>
              <ul>
                <Link to={'/' + link.substr(link.length - 7)} target={link.substr(link.length - 7)} >{link.substr(link.length - 7)}</Link></ul>

            </div>

          )}
        </form>
      </div>
    );
  }
}



var AmCharts = require("@amcharts/amcharts3-react");
class ChartDisplays extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seriesdata: []
    }
    var key = props.match.params.name;
    console.log(key);
    this.getData = this.getData.bind(this);

    this.getData(this.props.match.params.name).then((response) => {
      let data = response.data.data;
      for (let j in data) {
        let values = [];
        for (let i in data[j].values) {
          let temp = { year: data[j].values[i].year, value: parseInt(data[j].values[i].score) };
          values.push(temp);
        }
        data[j].values = values;
      }
      response.data = { "data": data };

      this.setState({
        seriesdata: response.data
      })
    })
  }

  getData(key) {

    const url = 'http://localhost:3000/api/file/getdata/' + key;
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }
    return get(url, config)
  }
  componentDidMount() {
    this.renderGraph([]);
  }
  renderGraph(data) {
    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginTop": 0,
      "marginRight": 80,
      "dataProvider": data,
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "gridAlpha": 0,
        "color": "#888888",
        "scrollbarHeight": 55,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "autoGridCount": true,
        "selectedGraphFillAlpha": 0,
        "graphLineAlpha": 0.2,
        "graphLineColor": "#c2c2c2",
        "selectedGraphLineColor": "#888888",
        "selectedGraphLineAlpha": 1

      },
      "chartCursor": {
        "categoryBalloonDateFormat": "YYYY",
        "cursorAlpha": 0,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "valueLineAlpha": 0.5,
        "fullWidth": true
      },
      "dataDateFormat": "YYYY",
      "categoryField": "year",
      "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      }
    });

    chart.addListener("rendered", zoomChart);
    if (chart.zoomChart) {
      chart.zoomChart();
    }

    function zoomChart() {
      chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
    }
  }
  render() {
    var data = [];
    if (this.state.seriesdata && this.state.seriesdata.data && this.state.seriesdata.data[0]) {
      this.renderGraph(this.state.seriesdata.data[0].values);
    }
    return (
      <div className="App">

        <p className="App-intro">
          <div id="chartdiv"></div>
        </p>


      </div>
    );
  }
}

export default { 
  ChartDisplays: ChartDisplays,
  App: App
  };

//export default App;
