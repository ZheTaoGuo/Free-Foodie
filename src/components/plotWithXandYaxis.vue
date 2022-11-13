<template>
    <div class="plot-container">
      <svg
        :width="size.width + margin.left + margin.right"
        :height="size.height + margin.top + margin.bottom"
      >
        <g :transform="`translate(${margin.left}, 10)`">
          <!-- Axes -->
          <g class="plot__axes">
            <g class="plot__axes__x" :transform="`translate(0, ${size.height})`"></g>
            <g class="plot__axes__y"></g>
          </g>
        </g>
      </svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";

  export default {
    name: "plotWithXandY",
    data() {
      return {
        size: {
          width: 0,
          height: 0
        },
        margin: {
          top: 20,
          bottom: 10,
          left: 35,
          right: 10
        },
        scales: {
          x: null,
          y: null
        },
        userData: null,
      };
    },
    props: {
      data: {
        type: Array,
        required: false
      },
      height: {
        type: Number
      }
    },
    methods: {
      /**
       * setSizes: Will set the width and height of the plot
       */
      setSizes() {
        const { left, right, top, bottom } = this.margin;
        const container = document.querySelector(".plot-container");
        this.size.width = container.offsetWidth - left - right;
        this.size.height = this.height || container.offsetHeight - top - bottom;
      },
      /**
       * setScales: Will set the scales based in the type
       * of the date
       */
      setScales() {
        // x axis scale
        this.scales.x = d3
        .scaleBand()
        .domain(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
        .range([0, 700]);
        
        // y axis scale
        this.scales.y = d3
        .scaleLinear()
        .domain([0, 3000])
        .rangeRound([this.size.height, 0]);
      },
      /**
       * renderAxes: Based on the x and y scales it will
       * render the axes in the svg.
       */
      renderAxes() {
        const { x, y } = this.scales;
        d3.select(".plot__axes__x").call(d3.axisBottom(x).ticks(7));  // modify the ticks to change the number of numbers in the
        d3.select(".plot__axes__y").call(d3.axisLeft(y));
      },
      render() { 

        this.setSizes();
        this.setScales();
        this.renderAxes();
      },
    },
    mounted() {
      this.render();
    }
  };
  </script>
  
  <style scoped>
  </style>
  