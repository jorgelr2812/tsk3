let coches = [];

function capturarDatos() {
  let marca = document.getElementById("marca").value.trim();
  let anio = Number(document.getElementById("anio").value);
  let categoria = document.getElementById("categoria").value;
  let itv = document.getElementById("itv").checked;
  let radios = document.getElementsByName("combustible");
  let combustible = null;
  for (let i = 0; i < radios.length; i++) {
  if (radios[i].checked) {
    combustible = radios[i];
    break;
  }
}

  if (!marca || isNaN(anio) || !combustible) {
    alert("Please fill in all required fields.");
    return null;
  }

  if (marca.length > 30) {
    alert("The brand cannot have more than 30 characters.");
    return null;
  }

  if (anio < 1900 || anio > 2025) {
    alert("The year must be between 1900 and 2025.");
    return null;
  }

  return {
    marca: marca,
    anio: anio,
    categoria: categoria,
    combustible: combustible.value,
    itv: itv
  };
}

function añadirCoche(coche) {
  for (let c of coches) {
    if (c.marca === coche.marca) {
      alert("There is already a car with that brand.");
      return;
    }
  }
  coches.push(coche);
  document.getElementById("contador").textContent = coches.length;
  alert("Car added successfully.");
  document.getElementById("formCoche").reset();
}

function eliminarCoche() {
  if (coches.length === 0) {
    alert("No cars to delete.");
    return;
  }

  let marcaEliminar = prompt("Enter the brand of the car to delete:");
  if (!marcaEliminar) return;

  let nuevoCoches = [];
let encontrado = false;

for (let i = 0; i < coches.length; i++) {
  if (coches[i].marca.toLowerCase() !== marcaEliminar.toLowerCase()) {
    nuevoCoches.push(coches[i]);
  } else {
    encontrado = true;
  }
}

if (!encontrado) {
  alert("No car found with that brand.");
} else {
  coches = nuevoCoches;
  document.getElementById("contador").textContent = coches.length;
  alert("Car deleted successfully.");
}
}

function mostrarCoches() {
  if (coches.length === 0) {
    alert("There are no cars registered.");
    return;
  }
  let texto = "Registered cars:\n\n";
  for (let i = 0; i < coches.length; i++) {
  let c = coches[i];
  texto += (i + 1) + ". " + c.marca + " (" + c.anio + ") - " + c.categoria + ", " + c.combustible + " - ITV: " + (c.itv ? "Yes" : "No") + "\n";
}

  alert(texto);
}

function finalizar() {
  if (coches.length === 0) {
    alert("There are no cars to show.");
    return;
  }
  coches.sort((a, b) => a.anio - b.anio);
  let texto = "Final list of cars (sorted by year):\n\n";
  coches.forEach((c, i) => {
    texto += `${i + 1}. ${c.marca} (${c.anio}) - ${c.categoria}, ${c.combustible} - ITV: ${c.itv ? "Yes" : "No"}\n`;
  });
  alert(texto);
}

document.getElementById("btnAñadir").onclick = () => {
  const coche = capturarDatos();
  if (coche) añadirCoche(coche);
};

document.getElementById("btnMostrar").onclick = mostrarCoches;
document.getElementById("btnEliminar").onclick = eliminarCoche;
document.getElementById("btnFinalizar").onclick = finalizar;
function mostrarHora(){
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString();
  const reloj = document.getElementById('reloj');
  if (reloj) {
    reloj.textContent = hora;
  }
};

  setInterval(mostrarHora, 1000);


