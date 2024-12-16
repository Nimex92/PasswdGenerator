const rangeInput = document.getElementById('password-length'); 
const textInput = document.getElementById('lengthValue');

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
    const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

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

