// Array principal para almacenar los coches
let coches = [];

// Captura y valida los datos del formulario
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
  return { marca, anio, categoria, combustible: combustible.value, itv };
}

// Añade un coche al array si la marca no está repetida
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

// Elimina un coche del array según la marca introducida
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

// Muestra todos los coches registrados en un alert
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

// Muestra la lista final de coches ordenados por año
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

// Muestra la hora actual en el elemento del reloj
function mostrarHora() {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString();
  const reloj = document.getElementById('reloj');
  if (reloj) reloj.textContent = hora;
}

// Guarda el array de coches en localStorage
function guardarDatos() {
  localStorage.setItem('coches', JSON.stringify(coches));
}

// Carga los coches guardados desde localStorage
function cargarDatos() {
  const raw = localStorage.getItem('coches');
  if (!raw) return;
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    coches = parsed;
    const contador = document.getElementById('contador');
    if (contador) contador.textContent = coches.length;
    window.alert('Data loaded successfully!');
  }
}

// Borra todos los datos de coches y localStorage
function borrarDatos() {
  coches = [];
  localStorage.clear();
  const contador = document.getElementById('contador');
  if (contador) contador.textContent = 0;
  window.alert('Data deleted');
}

// Crea los botones para descargar y borrar datos del localStorage
function crearBotonesLocalStorage() {
  const prueba = document.getElementById('prueba');
  if (!prueba) return;

  const btnDesc = document.createElement('input');
  btnDesc.type = 'button';
  btnDesc.id = 'descargarLS';
  btnDesc.value = 'Download Storage';
  prueba.parentNode.insertBefore(btnDesc, prueba.nextSibling);

  const btnBorrar = document.createElement('input');
  btnBorrar.type = 'button';
  btnBorrar.id = 'borrarLS';
  btnBorrar.value = 'Clear Data';
  btnDesc.parentNode.insertBefore(btnBorrar, btnDesc.nextSibling);

  prueba.addEventListener('click', function() {
    const coche = capturarDatos();
    if (!coche) return;
    coches.push(coche);
    guardarDatos();
    const contador = document.getElementById('contador');
    if (contador) contador.textContent = coches.length;
    window.alert('Data saved to storage');
  });

  btnDesc.addEventListener('click', function() {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      all[key] = JSON.parse(localStorage.getItem(key));
    }
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localstorage_dump.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  btnBorrar.addEventListener('click', function() {
    if (confirm('Delete all saved data?')) {
      borrarDatos();
    }
  });
}

// Añade persistencia automática al añadir o eliminar coches
function hookAddDeletePersistence() {
  const btnAñadir = document.getElementById('btnAñadir');
  const btnEliminar = document.getElementById('btnEliminar');
  if (btnAñadir) {
    btnAñadir.addEventListener('click', function() {
      setTimeout(guardarDatos, 50);
    });
  }
  if (btnEliminar) {
    btnEliminar.addEventListener('click', function() {
      setTimeout(guardarDatos, 200);
      setTimeout(function() {
        const contador = document.getElementById('contador');
        if (contador) contador.textContent = coches.length;
      }, 250);
    });
  }
}

let intervalo = null;
let clockColor = 'black';
let isClockRunning = true;

// Guarda el color del reloj en localStorage
function saveClockColor(color) {
  localStorage.setItem('clockColor', color);
}

// Carga el color del reloj desde localStorage
function loadClockColor() {
  const saved = localStorage.getItem('clockColor');
  if (saved) {
    clockColor = saved;
    return saved;
  }
  return null;
}

// Borra el color guardado del reloj
function clearClockColor() {
  localStorage.removeItem('clockColor');
  clockColor = 'black';
}

// Aplica el color seleccionado al reloj y lo guarda
function applyClockColor(color) {
  const reloj = document.getElementById('reloj');
  if (reloj && color) {
    reloj.style.color = color;
    clockColor = color;
    saveClockColor(color);
  }
}

// Alterna entre parar y continuar el reloj
function toggleClock() {
  const botonParar = document.getElementById('parar');
  const estadoReloj = document.getElementById('estadoReloj');
  if (isClockRunning) {
    if (intervalo) clearInterval(intervalo);
    intervalo = null;
    isClockRunning = false;
    if (botonParar) botonParar.value = 'Continue';
    if (estadoReloj) {
      estadoReloj.textContent = '⏸ Clock stopped';
      estadoReloj.style.color = 'red';
    }
    window.alert('Clock stopped');
  } else {
    mostrarHora();
    intervalo = setInterval(mostrarHora, 1000);
    isClockRunning = true;
    if (botonParar) botonParar.value = 'Stop';
    if (estadoReloj) {
      estadoReloj.textContent = '▶ Clock running';
      estadoReloj.style.color = 'green';
    }
    window.alert('Clock started');
  }
}

intervalo = setInterval(mostrarHora, 1000);

document.addEventListener('DOMContentLoaded', function() {
  cargarDatos();
  crearBotonesLocalStorage();
  hookAddDeletePersistence();

  const savedColor = loadClockColor();
  if (savedColor) applyClockColor(savedColor);

  const selectColor = document.getElementById('colorReloj');
  if (selectColor && savedColor) selectColor.value = savedColor;

  if (selectColor) {
    selectColor.addEventListener('change', function() {
      const newColor = this.value;
      if (newColor) {
        applyClockColor(newColor);
        window.alert('Clock color updated to: ' + newColor);
      }
    });
  }

  const botonParar = document.getElementById('parar');
  if (botonParar) {
    botonParar.onclick = toggleClock;
    const estadoReloj = document.getElementById('estadoReloj');
    if (estadoReloj) {
      estadoReloj.textContent = '▶ Clock running';
      estadoReloj.style.color = 'green';
    }
  }

  window.alert('Clock loaded successfully!');
});


