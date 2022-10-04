import './style.css'
import gridExample from "./examples/grid";

document.querySelector('#app').innerHTML = `
  <div class="examples">
    <div class="grid-card">
      <canvas id="canvas"></canvas>
    </div>
  </div>
`

window.onload = () => {
    gridExample('canvas');
}

