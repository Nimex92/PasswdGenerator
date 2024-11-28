// Actualizar el valor del rango al mover el slider
document.getElementById('password-length').addEventListener('input', function() {
    const length = this.value;
    document.getElementById('lengthValue').textContent = length; // Actualiza el valor visualmente

    // Generar la contraseña con la nueva longitud automáticamente
    generatePassword();
});

function copyToClipboard() {
    var copyText = document.querySelector(".password-input"); 
    copyText.select(); 
    copyText.setSelectionRange(0, 99999); // Para dispositivos móviles 
    document.execCommand("copy");  
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

    console.log(password)
   // Mostrar la contraseña generada
   document.getElementById('password').innerText = password;
}

// Añadir el evento para generar la contraseña al hacer clic en el botón
document.querySelector('.submit').addEventListener('click', generatePassword);


