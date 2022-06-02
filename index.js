function color(child) {
    child.style.backgroundColor = "yellow";
  }
  
  function border(child) {
    child.style.border = "2px solid red";
  }
  
  function removeborder(child) {
    child.style.border = "";
  }
  
  function num(child, count) {
    child.innerHTML = count.toString();
  }
  
  const row_count = 10;
  const col_count = 20;
  
  function reset() {
    let grid = document.getElementById("grid-container");
    grid.innerHTML = "";
    document.getElementById("startbtn").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("algo").disabled = false;
    document.getElementById("size").disabled = false;
    let str = document.getElementById("size").value;
    let i_max = row_count;
    let j_max = col_count;
    let count = 0;
    for (let i = 0; i < i_max; i++) {
      for (let j = 0; j < j_max; j++) {
        let new_grid_item = document.createElement("div");
        new_grid_item.setAttribute("class", "grid-item");
        new_grid_item.setAttribute("row", i);
        new_grid_item.setAttribute("col", j);
        new_grid_item.setAttribute("index", count);
        if (i == 0 && j == 0) {
          new_grid_item.setAttribute("start", "true");
        }
        if (i == row_count - 1 && j == col_count - 1) {
          new_grid_item.setAttribute("end", "true");
        }
        grid.appendChild(new_grid_item);
        count++;
      }
    }
  }
  
  function start() {
    document.getElementById("startbtn").disabled = true;
    document.getElementById("speed").disabled = true;
    document.getElementById("algo").disabled = true;
    document.getElementById("size").disabled = true;
    let str = document.getElementById("algo").value;
    if (str == "bfs") {
      bfs();
    } else if (str == "dfs") {
      dfs();
    }
  }
  
  function dfs() {
    let s = document.getElementById("speed").value;
    let t = 700 - 5 * s;
    let start = document.querySelector("div[start='true']");
    let end = document.querySelector("div[end='true']");
    let stack = [start];
    let visited = [start];
    start.setAttribute("Price", "0");
    let count = 0;
    while (stack.length != 0) {
      //let t = 500;
      let cur = stack.pop();
      let price = parseInt(cur.getAttribute("Price"));
      //setTimeout(num, count * t, cur, count);
      count = price;
      setTimeout(color, count * t, cur);
      if (cur == end) {
        //window.alert("Done!");
        return;
      }
      let xA = [0, 1, 0, -1];
      let yA = [1, 0, -1, 0];
      for (let i = 0; i < 4; i++) {
        let nx = parseInt(cur.getAttribute("row")) + xA[i];
        let ny = parseInt(cur.getAttribute("col")) + yA[i];
        if (nx >= row_count || nx < 0 || ny >= col_count || ny < 0) {
          continue;
        }
        let neigh = document.querySelector(
          "div[row='" + nx + "'][col='" + ny + "']"
        );
        if (visited.includes(neigh)) {
          continue;
        }
        if (neigh.getAttribute("class") == "road-block") {
          continue;
        }
        neigh.setAttribute("Price", price + 1);
        stack.push(neigh);
        visited.push(neigh);
      }
    }
  }
  
  function change(event) {
    if (event.target.getAttribute("class") == "grid-item") {
      event.target.innerHTML = "";
      event.target.setAttribute("class", "road-block");
    } else if (event.target.getAttribute("class") == "road-block") {
      event.target.setAttribute("class", "grid-item");
      let x = event.target.getAttribute("row");
      let y = event.target.getAttribute("col");
      event.target.innerHTML = x + "," + y;
    }
  }
  
  function startend(event) {
    let check_grid = event.target.getAttribute("class");
    if (check_grid == "grid-item" || check_grid == "road-block") {
      let str = window.prompt(
        "Do you want this node to be the start or end? Enter s/e    respectively."
      );
      if (str == "s") {
        document
          .querySelector("div[start='true']")
          .setAttribute("start", "false");
        event.target.setAttribute("start", "true");
        event.target.innerHTML = "start";
      } else if (str == "e") {
        document.querySelector("div[end='true']").setAttribute("end", "false");
        event.target.setAttribute("end", "true");
        event.target.innerHTML = "end";
      }
    }
  }
  
  function bfs() {
    let s = document.getElementById("speed").value;
    let t = 700 - 5 * s;
    let start = document.querySelector("div[start='true']");
    let end = document.querySelector("div[end='true']");
    let queue = [start];
    let visited = [start];
    start.setAttribute("Price", "0");
    let count = 0;
    while (queue.length != 0) {
      //let t = 500;
      let cur = queue.shift();
      let price = parseInt(cur.getAttribute("Price"));
      //setTimeout(num, count * t, cur, count);
      count = price;
      setTimeout(color, count * t, cur);
      if (cur == end) {
        //window.alert("Done!");
        return;
      }
      let xA = [0, 1, 0, -1];
      let yA = [1, 0, -1, 0];
      for (let i = 0; i < 4; i++) {
        let nx = parseInt(cur.getAttribute("row")) + xA[i];
        let ny = parseInt(cur.getAttribute("col")) + yA[i];
        if (nx >= row_count || nx < 0 || ny >= col_count || ny < 0) {
          continue;
        }
        let neigh = document.querySelector(
          "div[row='" + nx + "'][col='" + ny + "']"
        );
        if (visited.includes(neigh)) {
          continue;
        }
        if (neigh.getAttribute("class") == "road-block") {
          continue;
        }
        neigh.setAttribute("Price", price + 1);
        queue.push(neigh);
        visited.push(neigh);
      }
    }
  }
  