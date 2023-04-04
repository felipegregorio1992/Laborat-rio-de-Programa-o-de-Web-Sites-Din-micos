const inputQuestion = document.getElementById('question'); // pega o elemento com id question
const result = document.getElementById('result'); // pega o elemento com id result

inputQuestion.addEventListener("keypress",(e)=>{ //adiciona um evento de teclado no input
    if(inputQuestion.value && e.key === "Enter") //verifica se o input não está vazio e se a tecla pressionada é o enter
        
        sendQuestion(); //chama a função sendQuestion
        document.getElementById('result').value = ""; //limpa o input
});



document.getElementById('btnenviar').addEventListener('click', () => { //adiciona um evento de click no botão
    if(inputQuestion.value) //verifica se o input não está vazio
        sendQuestion(); //chama a função sendQuestion
        document.getElementById('result').value = ""; //limpa o input
})


const OPEN_API_KEY = "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"; //chave da api

function sendQuestion(){ //função para enviar a pergunta
    var sQuestion = inputQuestion.value; //pega o valor do input


    fetch(`https://api.openai.com/v1/completions`,{ //faz uma requisição para a api
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY
        },
        body: JSON.stringify({
            model:"text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, //quantidade de tokens valor maximo 2048
            temperature: 1, // nivel de criativida de 0 a 2
            top_p: 0.5, // probabilidade de 0 a 1
            
        }),
    })   
    .then((response) => response.json()) //converte a resposta para json
    .then((json) => { //pega o json
        if(result.value) result.value += "\n"; //verifica se o resultado não está vazio

        if(json.error?.message){ //verifica se existe um erro
            result.value += "Erro: " + json.error.message; //adiciona o erro no resultado
        }else if(json.choices?.[0].text){   //verifica se existe uma resposta
            var text = json.choices[0].text || " Sem resposta"; // adciona a resposta no resultado
            result.value += "Resposta: " + text; //adiciona a resposta no resultado
        }
        result.scrollTop = result.scrollHeight; //faz o scroll do resultado para o final

    })
    .catch((error) => console.error("error", error)) //trata o erro
    .finally(()=>{ 
        inputQuestion.value = "";  //limpa o input
        inputQuestion.disabled = false; //habilita o input
        inputQuestion.focus(); //coloca o foco no input
    });

    if (result.value) result.value += "\n\n\n"; //verifica se o resultado não está vazio
    result.value += `EU: ${sQuestion}` //adiciona a pergunta no resultado
    inputQuestion.value = "carregando..." //adiciona o texto carregando no input
    inputQuestion.disabled = true; //desabilita o input


    result.scrollTop = result.scrollHeight;  //faz o scroll do resultado para o final

};




var voicelist = document.querySelector('#voice') //pega o elemento com id voice
var synth = window.speechSynthesis //pega a api de voz do navegador
var voices = [] //array para armazenar as vozes


novavoz() 
if(speechSynthesis.onvoiceschanged !== undefined){  //verifica se a api de voz do navegador é suportada
    speechSynthesis.onvoiceschanged = novavoz //se for suportada, chama a função novavoz
}

btn.addEventListener('click', ()=>{

    var toSpeak = new SpeechSynthesisUtterance(result.value) //cria um objeto para falar
    var select = voice.selectedOptions[0].getAttribute('data-name') //pega o nome da voz selecionada
    voices.forEach((voice)=>{ //percorre o array de vozes
      if(voice.name === select){ //verifica se o nome da voz é igual ao nome da voz selecionada
            toSpeak.voice = voice //se for igual, atribui a voz selecionada ao objeto para falar
        }
        

        
    })
    synth.speak(toSpeak) //fala o texto
    
}) 


function novavoz(){ //função para listar as vozes
    voices = synth.getVoices() //pega as vozes do navegador
    var selectedIndex = voicelist.selectedIndex < 0 ? 0 : voicelist.selectedIndex //verifica se a voz selecionada é menor que 0, se for, atribui 0, se não, atribui a voz selecionada
    voicelist.innerHTML = '' //limpa o select
    voices.forEach((voice)=>{ //percorre o array de vozes
        var listItem = document.createElement('option') //cria um elemento option
        listItem.textContent = voice.name //atribui o nome da voz ao option
        listItem.setAttribute('data-lang', voice.lang) //atribui o idioma da voz ao option
        listItem.setAttribute('data-name', voice.name) //atribui o nome da voz ao option
        voicelist.appendChild(listItem) //adiciona o option ao select
    })
    voicelist.selectedIndex = selectedIndex   //atribui a voz selecionada ao select
}



var slides = document.querySelectorAll('.slide'); //pega todos os slides
var posicao = 0; //posição inicial
var intervalo = setInterval(nextSlide, 5000); //intervalo de 5 segundos

function nextSlide() { //função para passar o slide
    slides[posicao].className = 'slide'; //remove a classe active
    posicao = (posicao + 1) % slides.length; //incrementa a posição
    slides[posicao].className = 'slide active'; //adiciona a classe active
}