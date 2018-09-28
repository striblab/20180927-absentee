import 'intersection-observer';
import * as d3 from 'd3';
import * as d3tooltip from 'd3-tooltip';
import * as topojson from 'topojson';
import mncounties from '../sources/counties.json';
import turnout from '../sources/turnout.json';

class Map {

  constructor(target) {
    this.target = target;
    this.svg = d3.select(target + " svg").attr("width", $(target).outerWidth()).attr("height", $(target).outerHeight());
    this.g = this.svg.append("g");
    this.zoomed = false;
    this.scaled = $(target).width()/520;
    this.colorScale = d3.scaleLinear()
    .domain([0, 0.5, 1])
    .range(['#ffffff',"#999999",'#000000']);
  }

  /********** PRIVATE METHODS **********/

  // Detect if the viewport is mobile or desktop, can be tweaked if necessary for anything in between
  _detect_mobile() {
    var winsize = $(window).width();

    if (winsize < 520) {
      return true;
    } else {
      return false;
    }
  }

  /********** PUBLIC METHODS **********/

  // Render the map
  render() {
    var self = this;

    var projection = d3.geoAlbers().scale(5037).translate([50, 970]);

    var width  = $(self.target).outerWidth();
    var height = $(self.target).outerHeight();
    var centered;

    var data = turnout.counties;

    var path = d3.geoPath(projection);

    var svg = d3.select(self.target + " svg").attr("width", width).attr("height", height);
    var g = svg.append("g");
    var tooltip = d3tooltip(d3);

    // self._render_legend();

    // Only fire resize events in the event of a width change because it prevents
    // an awful mobile Safari bug and developer rage blackouts.
    // https://stackoverflow.com/questions/9361968/javascript-resize-event-on-scroll-mobile
    var cachedWidth = window.innerWidth;
    d3.select(window).on("resize", function() {
      var newWidth = window.innerWidth;
      if(newWidth !== cachedWidth) {
        cachedWidth = newWidth;
      }
    });

    g.append("g")
        .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(mncounties, mncounties.objects.counties).features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", function(d) { return "county C" + d.properties.COUNTYFIPS; })
        .attr("id", function(d) { return "P" + d.properties.COUNTYFIPS; } )
        .style("stroke-width", '1')
        .style("stroke","#000000")
        .style("fill",function(d) {
          var votes;
          for (var i=0; i < data.length; i++) {
            if (d.properties.COUNTYNAME == data[i].county) {
              votes = data[i].total_pct;
            }
          }
          return self.colorScale(votes * 100);
        })
        .on("mouseover", function(d) {
          var votes;
          for (var i=0; i < data.length; i++) {
            if (d.properties.COUNTYNAME == data[i].county) {
              votes = data[i].total_pct;
            }
          }
          tooltip.html("<div class='countyName'>" + d.properties.COUNTYNAME + "</div><div><span class='legendary' style='color:#ffffff; background-color:" + self.colorScale(votes * 100) + ";'>" + d3.format(".2%")(votes) + "</span> voted early</div>");
          $(".d3-tooltip").show();
          tooltip.show();
      })
      .on("mouseout", function(d) {
          tooltip.hide()
      });

        $("svg").mouseleave(function() {
          $(".d3-tooltip").hide();
        });

        $(".tooltip").attr('style','font-family: "Benton Sans", Helvetica, Arial, sans-serif; background-color: #ffffff !important; height: auto !important; width: auto !important; color:#000000 !important; padding: 10px !important; opacity:1 !important; border-radius: 0 !important; border: 1px solid #000000 !important; font-size: 13px !important;');
        $(".tooltip").addClass("thisTip");

    var aspect = 500 / 550, chart = $(self.target + " svg");
      var targetWidth = chart.parent().width();
      chart.attr("width", targetWidth);
      chart.attr("height", targetWidth / aspect);
      if ($(window).width() <= 520) { $(self.target + " svg").attr("viewBox","0 0 500 550"); }

    $(window).on("resize", function() {
      targetWidth = chart.parent().width();
      chart.attr("width", targetWidth);
      chart.attr("height", targetWidth / aspect);
    });
  }
}

export { Map as default }