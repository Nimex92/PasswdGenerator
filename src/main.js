const rangeInput = document.getElementById('password-length'); 
const textInput = document.getElementById('lengthValue');
const historyBtn =  document.querySelector('.history');
const historyDialog =  document.getElementById('history-dialog');
const dropArea = document.querySelector('.drop-area');
const fileInput = document.getElementById('fileInput');
var historyPasswordList = [];
var excelData;


// Sucesos cuando cargue la ventana
window.onload = () => {
    textInput.value = "12"
}

// Actualizar el valor del rango al mover el slider
document.getElementById('password-length').addEventListener('input', function() {
    const length = this.value;
    document.getElementById('lengthValue').textContent = length; // Actualiza el valor visualmente

    // Generar la contraseña con la nueva longitud automáticamente
    generatePassword();
});

async function copyContent() {
    const copyText = document.getElementById('password').value;
    try {
      await navigator.clipboard.writeText(copyText);
      console.log('Contenido copiado al clipboard');
      /* Resuelto - texto copiado al clipboard con éxito */
    } catch (err) {
      console.error('Falló al copiar: ', err);
      /* Rechazado - texto falló al copiarse al clipboard */
    }
  }

function generatePassword() {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#~~€¬=-+^';
    let characterSet = '';
    let passwordLength = document.getElementById('password-length').value; // Obtener la longitud desde el rango

    // Comprobar qué checkboxes están seleccionados
    if (document.getElementById('minus').checked) {
        characterSet += lowerCaseChars;
    }
    if (document.getElementById('mayus').checked) {
        characterSet += upperCaseChars;
    }
    if (document.getElementById('numbers').checked) {
        characterSet += numberChars;
    }
    if (document.getElementById('symbols').checked) {
        characterSet += symbolChars;
    }

    // Verificar si al menos una opción está seleccionada
    if (characterSet === '') {
        alert('Por favor selecciona al menos una opción');
        return;
    }

    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    if(historyPasswordList >= 10){
        historyPasswordList.pop();
        historyPasswordList.push(password)
    } else {
        historyPasswordList.push(password)
    }
    // Mostrar la contraseña generada
    document.getElementById('password').value = password;
}

function onClickShake(){
    var container = document.querySelector('.container');
    container.classList.add('shake');

    setTimeout(() => {
        container.classList.remove('shake');
    }, 400);

}

// Añadir el evento para generar la contraseña al hacer clic en el botón
document.querySelector('.copy-button').addEventListener('click', copyContent);
document.querySelector('.submit').addEventListener('click', generatePassword);
document.querySelector('.submit').addEventListener('click', onClickShake);
document.getElementById('password-length').addEventListener('change', () => {
    //Actualizar el valor del input range
    const range = document.getElementById('password-length');
    const input =  document.getElementById('lengthValue');
    input.value = range.value;
    generatePassword();
});
document.getElementById('lengthValue').addEventListener('change', () =>{
        //Actualizar el valor del input range
        const range = document.getElementById('password-length');
        const input =  document.getElementById('lengthValue');
        range.value = input.value;
        generatePassword();
})
document.getElementById('close-history-dialog').addEventListener('click', () => {
    historyDialog.close();
});

historyBtn.addEventListener('click', () => {
    var passwordList =  document.getElementById('history-password-elements');
    passwordList.innerHTML = '';
    historyPasswordList.forEach(x =>{
        passwordList.innerHTML += '<li class="py-4 font-bold text-2xl">'+x+'</li>'
    });
    historyDialog.showModal()
});


// Eventos para resaltar el área de arrastre
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
  });
  
  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
  });
  
  // Evento para manejar el "drop" de archivos
  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
  
    const dt = new DataTransfer();
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      dt.items.add(e.dataTransfer.files[i]);
    }
    fileInput.files = dt.files;
  
    // Llamar a la función para procesar el archivo (si es necesario)
    procesarArchivo(fileInput.files);
  });
  
  // Evento principal para manejar el cambio en el input (selección de archivo)
  fileInput.addEventListener('change', () => {
    procesarArchivo(fileInput.files);
    console.log(excelData);
    
  });
// Función para procesar el archivo (se llama desde drop y change)
function procesarArchivo(files) {
    if (files.length === 0) return; // No hay archivos seleccionados

    const file = files[0]; // Toma el primer archivo (si hay varios)
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const datosFiltrados = jsonData.map(fila => {
            // Acceder a los datos usando índices numéricos (como en tu código original)
            return {
                'Nombre': fila[0],
                'Primer Apellido': fila[1],
                'Segundo Apellido': fila[2],
                'Nombre completo': fila[0] + ' ' + fila[1] + ' ' + fila[2],
                'Username': fila[0] + '.' + fila[1] + fila[2],
                'Password': 'Unir2025@@',
                'UsuarioSalaAdobe': fila[0] + fila[1] + fila[2],
                'URL Sala adobe': 'https://unir.adobeconnect.com/' + fila[0] + fila[1] + fila[2],
                'Mail unir': fila[16],
                'Mail personal': fila[17]
            };
        });

        const datosJson = JSON.stringify(datosFiltrados, null, 2);
        console.log(datosJson);
        excelData = datosFiltrados
        // console.log(excelData);
        
    };
    reader.readAsArrayBuffer(file);
}

