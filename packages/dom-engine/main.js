import './style.css'
import tableExample from "./examples/table/index.jsx";
import zIndexExample from "./examples/zIndex/index.jsx";

document.querySelector('#app').innerHTML = `
  <div class="examples">
    <div class="card">
      <div class="title">Table</div>
      <div id="table"></div>
    </div>
     <div class="card">
      <div class="title">zIndex</div>
      <div id="zIndex"></div>
     </div>
  </div>
`

tableExample('table');
zIndexExample('zIndex');
