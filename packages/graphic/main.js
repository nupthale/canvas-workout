import './style.css'
import { renderLine } from "./examples/line/index.js";

document.querySelector('#app').innerHTML = `
  <div class="examples">
    <div class="card">
      <div class="title">Line</div>
      <div id="line"></div>
    </div>
     <div class="card">
      <div class="title">zIndex</div>
      <div id="zIndex"></div>
     </div>
  </div>
`

renderLine('line');
