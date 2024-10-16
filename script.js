let correctCountry;
let options = [];
let timer; // Variável para armazenar o temporizador
let timeLeft = 0; // Duração do temporizador em segundos

function getCountryNameInPortuguese(country) {
    return country.translations && country.translations.por ?
        country.translations.por.common : country.name.common;
}

function getRandomCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            correctCountry = data[randomIndex];
            options = [correctCountry];

            while (options.length < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            options.sort(() => Math.random() - 0.5);
            displayQuestion();
        })
        .catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    document.getElementById('flagImage').src = correctCountry.flags.png;
    document.getElementById('flagImage').style.display = 'block';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = getCountryNameInPortuguese(option);
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });

    startTimer(10); // Inicia o temporizador
}

/*Verifica se esta correto*/
function checkAnswer(selected) {
   
    
    const resultDiv = document.getElementById('result');
   
    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = '<p>Correto!</p>';
    } else {
        clearInterval(timer); // Para o temporizador
        resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
    }
    
    const nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'block';
    nextButton.innerText = "Próximo";
}
/*TEMPORIZADOR*/

function startTimer() {
    timeLeft = 10; // Reseta o tempo
    const timerDiv = document.getElementById('timer');
    timerDiv.innerText = `Tempo restante: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDiv.innerText = `Tempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
        document.getElementById('result').innerHTML=`<h2>Tempo Esgotado o país correto é ${getCountryNameInPortuguese(correctCountry)}</h2>`
        nextButton = document.getElementById('nextButton');
        nextButton.style.display = 'block';
        nextButton.innerText = "Próximo";

        clearInterval(timer);
            checkAnswer({ name: { common: '' } }); // Resposta incorreta
           
        }
    }, 1000);
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    getRandomCountries();
};

// Inicia o jogo quando a página carregar
window.onload = getRandomCountries;
