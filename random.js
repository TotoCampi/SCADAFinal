// var number = setInterval(random, 500);
var arr = []
var chart;
var lista=document.getElementById("lista");
var odometer = document.getElementById("div");

//odometer.innerHTML = "Hola";

setInterval(()=>{
arr = [];
fetch('http://172.22.40.52/list')
.then((res)=>{
  console.log(res)
  return res.json()
}).then ((json)=>{
  console.log(json);
  var ultimo = json[json.length-1]
  var li=document.createElement('li')
  var label= document.createElement('label')
  const fecha = new Date(ultimo.fecha);
  setTimeout(function(){
    $('.odometer').html("0" + ultimo.numero);
  }, 1000);
  label.append(
    "Fecha: " +
      ("0" + fecha.getDate()).slice(-2) + "/" +
      ("0" + (fecha.getMonth()+1)).slice(-2) + "/" +
      fecha.getFullYear() + ", " +
    "Hora: " +
      ("0" + fecha.getHours()).slice(-2) + ":" +
      ("0" + fecha.getMinutes()).slice(-2) + ":" +
      ("0" + fecha.getSeconds()).slice(-2) + " => " +
    "Número: " + ultimo.numero
  )
  li.append(label);
  lista.insertBefore(li,lista.firstChild);
  json.forEach((element)=>{
    arr[element.numero] = arr[element.numero] ? arr[element.numero] + 1 : 1;
  });
  console.log (arr)
  for (var i = 1; i < arr.length; i++) {
    chart.options.data[0].dataPoints[i-1] = {
      y: arr[i],
      label: i
    }
    chart.render();
  }
});
},3000);



window.onload = function () {

chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  title:{
    text: "Randomizer"
  },
  axisY: {
    title: "Cantidad de números"
  },
  data: [{
    type: "column",
    showInLegend: true,
    legendMarkerColor: "grey",
    legendText: "Números",
    dataPoints: []
  }]
});

chart.render();


}
