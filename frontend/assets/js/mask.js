// Seleciona os campos de telefone pelo ID
const telefoneInput = document.getElementById("contato");
const telefoneEmergenciaInput = document.getElementById("contatoemergencia");

// Aplica a máscara para telefone no formato "(99) 9 9999-9999"
const im = new Inputmask("(99) 9 9999-9999"); // Formato padrão para números de celular no Brasil
im.mask(telefoneInput);
im.mask(telefoneEmergenciaInput);

// Seleciona os campos de data pelo ID
const dt_nascimentoInput = document.getElementById("dt_nascimento");
const ultGraduacaoInput = document.getElementById("ultgraduacao");

// Aplica a máscara para datas no formato "DD/MM/AAAA"
const maskDate = new Inputmask("99/99/9999"); // Garante que o usuário digite a data corretamente
maskDate.mask(dt_nascimentoInput);
maskDate.mask(ultGraduacaoInput);
