const displayText = () => {
    const occasion = document.getElementById("occasion").value;
    const name = document.getElementById("name").value;
    const ingred = document.getElementById("ingred").value;
    const time = document.getElementById("time").value;
    html = '<section class="toutput"> <h2> Occasion: ' + occasion +'</h2> <p> Name of Meal: '+ name +'</p> <p> Ingredients: '+ ingred +'</p> <p> Time: ' + time + '</p>'
    html = elementFromHtml(html);
    document.getElementById("responses").appendChild(html);
  }

  function elementFromHtml(html) {
    console.log(html);
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  window.onload = () => {
    document.getElementById("add-comment").onclick = displayText;
  }