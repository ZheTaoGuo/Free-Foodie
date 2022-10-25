import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import {Tabs, Tab} from 'vue3-tabs-component';

const app = createApp(App)
app.use(router)
app.component('tabs', Tabs)
app.component('tab', Tab)

app.mount('#app')  // finding "div id=app" in index.html and injecting the code there