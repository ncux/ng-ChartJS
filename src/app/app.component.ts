import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  chart = [];

  constructor(private weather: WeatherService) {}

  ngOnInit() {
    this.weather.dailyForecast().subscribe(res => {
      console.log(res);
      let tempMax = res['list'].map(res => res.main.temp_max);
      let tempMin = res['list'].map(res => res.main.temp_min);
      let allDates = res['list'].map(res => res.dt);

      let weatherDates = [];

      allDates.forEach(date => {
        let newDate = new Date(date * 1000);
        weatherDates.push(newDate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: tempMax,
              borderColor: "#3cba9f",
              fill: false
            },
            {
              data: tempMin,
              borderColor: "#ffcc00",
              fill: false
            }
          ]
        },
        options: {
          legend: { display: false },
          scales: {
            xAxes: [{ display: true }],
            yAxes: [{ display: true }],
          }
        }
      })

    });
  }
}
