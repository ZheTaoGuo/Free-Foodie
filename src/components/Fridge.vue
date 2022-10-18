<template>
  <div class="tab">
    <button class="tablinks" onclick="openCity(eventName, 'London')">
      All
    </button>
    <button class="tablinks" onclick="openCity(eventName, 'Paris')">
      Meat
    </button>
    <button class="tablinks" onclick="openCity(eventName, 'Tokyo')">
      Carbohydrates
    </button>
  </div>

  <div class="header">

    <div class="container-fluid">
      <div class="row" id="tabcontent">
        <div class="col-4">
          <h3>London</h3>
          <p>London is the capital city of England.</p>
          
        </div>

        <div class="col-4">
          <h3>Paris</h3>
          <p>Paris is the capital city of England.</p>
        </div>

        <div class="col-4">
          <h3>Tokyo</h3>
          <p>Tokyo is the capital city of England.</p>
        </div>
  

      </div>
    </div>
    

    <!-- <div id="Paris" class="tabcontent">
      <h3>Paris</h3>
      <p>Paris is the capital of France.</p>
    </div>

    <div id="Tokyo" class="tabcontent">
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
    </div> -->
  </div>

  <div class="bottom"></div>
</template>

<script>

export default {
name: "HelloWorld",
props: {
  msg: String,
},
methods: {
  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  },
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
margin: 40px 0 0;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style>
