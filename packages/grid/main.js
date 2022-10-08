import './style.css'
// import gridExample from "./examples/grid";
import gridExample from "./examples/grid-app";


document.querySelector('#app').innerHTML = `
  <div class="examples">
    <div class="grid-card">
      <div id="toolbar"></div> 
      <canvas id="canvas"></canvas>
    </div>
  </div>
`

window.onload = () => {
    // gridExample('canvas');
    gridExample('canvas', 'toolbar');
}

