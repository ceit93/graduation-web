<template>
<div id="svg-canvas"></div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "index",
        mounted () {
          console.log(
            d3.select('#svg-canvas')
              .append('svg')
              .attr('width', 200)
              .attr('height', 100)
          )
        }
    }
</script>

<style scoped>

</style>
