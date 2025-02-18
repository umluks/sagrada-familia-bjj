// Aplica a máscara de telefone
const telefoneInput = document.getElementById("contato");
const telefoneEmergenciaInput = document.getElementById("contatoemergencia");

const im = new Inputmask("(99) 9 9999-9999"); // Máscara para telefone com WhatsApp
im.mask(telefoneInput);
im.mask(telefoneEmergenciaInput);

$(document).ready(function () {
  var input = document.getElementsByClassName(".date");
  var im = new Inputmask("99/99/9999");
  im.mask(input);
});
