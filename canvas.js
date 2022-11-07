// JavaScript Document
$(document).ready(function (e) {
  let c = document.getElementById("formas");
  ctx = c.getContext("2d");
  let drawStyle = "clique";
  let previousMove = { x: 0, y: 0 };
  let isMouseDown = false;
  let lineWidthSize = 2;

  $("#lineH").change((ev) => {
    lineWidthSize = ev.target.value;
  });

  $(".radioGroup").change((ev) => {
    drawStyle = ev.target.value;
  });

  if (drawStyle == "slide") {
    c.addEventListener("mousemove", (event) => {
      if (drawStyle == "slide") {
        const { pageX: px, pageY: py, clientX, clientY } = event;

        let cor = $("#cor").val();

        // ctx.beginPath();
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = cor;
        ctx.lineWidth = lineWidthSize;
        ctx.stroke();

        previousMove = { px, py };

        $("#res").html(
          "Posição X: " + px + " Posição Y: " + py + " Cor: " + cor
        );
      } else {
      }
    });
  }

  c.addEventListener("mousemove", (event) => {
    const { pageX: px, pageY: py, clientX, clientY } = event;
    let cor = $("#cor").val();

    if (drawStyle == "slide") {
      ctx.lineTo(clientX, clientY);
      ctx.strokeStyle = cor;
      ctx.lineWidth = lineWidthSize;
      ctx.stroke();
      previousMove = { px, py };
    } else if (drawStyle == "clique" && isMouseDown) {
      ctx.moveTo(previousMove.x, previousMove.y);
      ctx.lineWidth = lineWidthSize;
      ctx.lineTo(px, py);
      ctx.strokeStyle = cor;
      ctx.stroke();
    }

    $("#res").html(
      "Posição X: " + px + "<br> Posição Y: " + py + "<br> Cor: " + cor
    );
  });

  c.addEventListener("mousedown", (event) => {
    if (drawStyle == "clique") {
      const { pageX: px, pageY: py } = event;
      previousMove = { px, py };

      $("#res").html("Posição X: " + px + " Posição Y: " + py + " Cor: " + cor);

      isMouseDown = true;
    }
  });

  c.addEventListener("mouseup", (event) => {
    if (drawStyle == "clique") {
      isMouseDown = false;
    }
  });
});
