function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

//validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

//validação de telefone brasileiro
function validarTelefone(telefone) {
    const regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
    return regex.test(telefone.replace(/\s/g, ''));
}

//validação do Formulário
function validarFormulario(event) {
    event.preventDefault();
    
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    
    let isValid = true;
    
    //validar CPF
    if (!validarCPF(cpf)) {
        document.getElementById('cpfError').textContent = 'CPF inválido';
        isValid = false;
    } else {
        document.getElementById('cpfError').textContent = '';
    }
    
    //validar Telefone
    if (!validarTelefone(telefone)) {
        document.getElementById('telefoneError').textContent = 'Telefone inválido';
        isValid = false;
    } else {
        document.getElementById('telefoneError').textContent = '';
}

    //validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Email inválido';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    if (isValid) {
        alert('Formulário enviado com sucesso!');
        document.getElementById('formContato').reset();
        
        //modificação do HTML/CSS - alterar cor de fundo temporariamente
        document.body.style.backgroundColor = '#e8f5e8';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 2000);
    }
}

//carousel manual
let currentSlide = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].style.display = 'block';
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function currentSlideFunc(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

//contador de caracteres
function contarCaracteres() {
    const textarea = document.getElementById('mensagem');
    const contador = document.getElementById('contador');
    const maxLength = 500;
    
    const remaining = maxLength - textarea.value.length;
    contador.textContent = `${remaining} caracteres restantes`;
    
    if (remaining < 0) {
        contador.style.color = 'red';
    } else {
        contador.style.color = '#4A90E2';
    }
}

//inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    //inicializar carousel se existir
    if (document.querySelector('.carousel-slide')) {
        showSlide(currentSlide);
    }
    
    //adicionar evento de input para contador de caracteres
    const mensagemTextarea = document.getElementById('mensagem');
    if (mensagemTextarea) {
        mensagemTextarea.addEventListener('input', contarCaracteres);
    }
});