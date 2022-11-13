import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const app = createApp(App);
app.use(router);
// app.use(PrimeVue);
app.mount("#app"); // finding "div id=app" in index.html and injecting the code there
