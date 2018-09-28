import * as d3 from 'd3';
import * as c3 from 'c3';

class Chart { 

  constructor(target) {
    this.target = target;
    this.chartCounts = null;
  }

  render() {
    var self = this;

    var  padding = {
          top: 20,
          right: 40,
          bottom: 20,
          left: 60,
      };
    
    self.chartCounts = c3.generate({
        bindto: self.target,
        padding: padding,
        data: {
              // x: 'x',
              columns: [
                  ['2014', 3818, null, null, null, null, null, null],
                  ['2016', 1425, 19693, 35324, 45298, 98057, 124844, 206871],
                  ['2018', 11353, null, null, null, null, null, null]
              ],
          type: 'spline'
        },
          legend: {
            show: false
          },
          point: {
              show: true,
              r: function(d) { if (d.x == 0) { return 6; } else { return 0; } }
          },
          color: {
              pattern: ['#DDDDDD','#969696', '#333333']
          },
          axis: {
                // rotated: true,
                y: {
                      max: 250000,
                      min: 0,
                      padding: {bottom: 0, top: 0},
                      tick: {
                       count: 4,
                       values: [0,50000,100000,150000,200000,250000],
                       format: d3.format(',.0f')
                      }
                  },
              x: {
                type: 'category',
                categories: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6','Week 7'],
                padding: {right: 0, left: 0},
                      tick: {
                       rotate: -75,
                       multiline: false
                      },
                      height: 40
              }
          },
        grid: {
            focus:{
                show:false
              },
          },
          tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
              console.log(d);
              return '<div class="chart-tooltip gray5">' + '<span class="tooltip-label">' + d[2].id + ':</span>' +
                '<span class="tooltip-value">' + defaultValueFormat(d[2].value) + '</span>' +
                '</div><div class="chart-tooltip gray3">' +
                '<span class="tooltip-label">' + d[1].id + ':</span>' +
                '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
                '</div><div class="chart-tooltip gray1">' +
                '<span class="tooltip-label">' + d[0].id + ':</span>' +
                '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
                '</div>';
            }
          }
  });

  }
}

export { Chart as default }
