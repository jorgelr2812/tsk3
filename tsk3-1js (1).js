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

/* ------------------ LocalStorage features (appended, no changes above) ------------------ */

// Guardar el array 'coches' en localStorage bajo la clave 'coches'
function guardarDatos() {
  try {
    localStorage.setItem('coches', JSON.stringify(coches));
  } catch (e) {
    console.error('Error guardando en localStorage', e);
  }
}

// Cargar 'coches' desde localStorage si existe
function cargarDatos() {
  const raw = localStorage.getItem('coches');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      coches = parsed;
      const contador = document.getElementById('contador');
      if (contador) contador.textContent = coches.length;
      // Mensaje sencillo de confirmación
      try { window.alert('¡Datos cargados correctamente!'); } catch(e){}
    }
  } catch (e) {
    console.error('Error parseando coches desde localStorage', e);
  }
}

// Borrar datos: vacía array y limpia localStorage
function borrarDatos() {
  coches = [];
  try {
    localStorage.clear();
  } catch (e) {
    console.error('Error limpiando localStorage', e);
  }
  const contador = document.getElementById('contador'); if (contador) contador.textContent = 0;
  try { window.alert('Datos borrados.'); } catch(e){}
}

// Crear botones dinámicamente (descargar / borrar) sin tocar el HTML original
function crearBotonesLocalStorage() {
  const prueba = document.getElementById('prueba');
  if (!prueba) return;

  // Descargar todo el localStorage
  const btnDesc = document.createElement('input');
  btnDesc.type = 'button';
  btnDesc.id = 'descargarLS';
  btnDesc.value = 'Descargar LocalStorage';
  prueba.parentNode.insertBefore(btnDesc, prueba.nextSibling);

  // Borrar datos
  const btnBorrar = document.createElement('input');
  btnBorrar.type = 'button';
  btnBorrar.id = 'borrarLS';
  btnBorrar.value = 'Borrar Datos';
  btnDesc.parentNode.insertBefore(btnBorrar, btnDesc.nextSibling);

  // Handler de prueba: guarda el formulario en el array y en localStorage
  prueba.addEventListener('click', function() {
    const coche = capturarDatos();
    if (!coche) return;
    coches.push(coche);
    guardarDatos();
    const contador = document.getElementById('contador'); if (contador) contador.textContent = coches.length;
    try { window.alert('Formulario guardado en LocalStorage.'); } catch(e){}
  });

  // Descargar todo el localStorage (exportar como JSON)
  btnDesc.addEventListener('click', function() {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        all[key] = JSON.parse(localStorage.getItem(key));
      } catch (e) {
        all[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'localstorage_dump.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });

  // Borrar datos (confirma y borra todo)
  btnBorrar.addEventListener('click', function() {
    if (confirm('¿Borrar todos los datos guardados en localStorage?')) {
      borrarDatos();
    }
  });
}

// Asegurar que cada vez que se pulse Add o Delete se guarden los datos
function hookAddDeletePersistence() {
  const btnAñadir = document.getElementById('btnAñadir');
  const btnEliminar = document.getElementById('btnEliminar');
  if (btnAñadir) {
    // after original handler runs, guardar
    btnAñadir.addEventListener('click', function() {
      setTimeout(guardarDatos, 50);
    });
  }
  if (btnEliminar) {
    // after original handler (which prompts and updates array), guardar
    btnEliminar.addEventListener('click', function() {
      setTimeout(guardarDatos, 200);
      setTimeout(function() { const contador = document.getElementById('contador'); if (contador) contador.textContent = coches.length; }, 250);
    });
  }
}

// Inicializar sólo las partes nuevas (no tocar nada anterior)
document.addEventListener('DOMContentLoaded', function() {
  try { cargarDatos(); } catch(e) { console.error(e); }
  try { crearBotonesLocalStorage(); } catch(e) { console.error(e); }
  try { hookAddDeletePersistence(); } catch(e) { console.error(e); }
});

// Mantener el id del intervalo en una variable global para poder pararlo
let intervalo = null;
// Obtener referencia al botón que alternará entre parar/continuar

const botonParar = document.getElementById('parar');

// Iniciar el reloj y guardar el id del intervalo para poder cancelarlo
intervalo = setInterval(mostrarHora, 1000);

// Handler que alterna entre parar y continuar el reloj
if (botonParar) {
  botonParar.onclick = function() {
    if (intervalo) {
      clearInterval(intervalo);
      intervalo = null;
     
      window.alert('Reloj parado');
    } else {
      intervalo = setInterval(mostrarHora, 1000);
      
      window.alert('Reloj iniciado');
    }
  };
}

document.getElementById('prueba').onclick = function() {
  localStorage.setItem('coches', 'el bmw');
  localStorage.setItem('anio', '2020');
  localStorage.setItem('combustible', 'gasolina');
  localStorage.setItem('itv', 'true'); 
  localStorage.setItem('marca', 'Toyota');  
  localStorage.setItem('categoria', 'SUV'); 
  localStorage.setItem('precio', '30000');
  localStorage.setItem('color', 'rojo'); 
  localStorage.setItem('km', '15000');
  localStorage.setItem('dueño', 'Juan Perez');  
  localStorage.setItem('matricula', '1234ABC');
  localStorage.setItem('modelo', '2020X');
  localStorage.setItem('potencia', '150CV');
  localStorage.setItem('JSON', JSON.stringify({marca: 'Ford', anio: 2018, combustible: 'diesel', itv: false}));
  window.alert('Datos guardados en localStorage');

  const jsonStr = localStorage.getItem('JSON');
  if (jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      window.alert(parsed.combustible);
    } catch (e) {
      window.alert('Invalid JSON in localStorage');
    }
  } else {
    window.alert('No JSON stored under key JSON');
  }
}


