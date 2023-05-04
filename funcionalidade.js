const div_data = document.querySelector('#data')
const div_relogio = document.querySelector('#relogio')

const btn_ativar = document.querySelector('#btn_ativar')
const btn_parar = document.querySelector('#btn_parar')
const tmp_alarme = document.querySelector('#tmp_alarme')
const hora_alarme = document.querySelector('#hora_alarme')
const timer = document.querySelector('.timer')

const som_alarme = new Audio('alarme.mp3')
som_alarme.loop = -1

let ts_atual = null
let ts_alarme = null
let alarme_ativado = false
let alarme_tocando = false

btn_ativar.addEventListener('click', ()=>{
    ts_atual = Date.now()
    ts_alarme = ts_atual + (tmp_alarme.value * 1000)
    alarme_ativado = true
    const data_alarme = new Date(ts_alarme)
    
    let hrs_alarme = data_alarme.getHours() 
    hrs_alarme = hrs_alarme < 10 ? `0${hrs_alarme}` : hrs_alarme

    let minuto_alarme = data_alarme.getMinutes()
    minuto_alarme = minuto_alarme < 10 ? `0${minuto_alarme}` : minuto_alarme

    let segundo_alarme = data_alarme.getSeconds()
    segundo_alarme = segundo_alarme < 10 ? `0${segundo_alarme}` : segundo_alarme
    
    hora_alarme.innerHTML = `Hora do Alarme: ${hrs_alarme}:${minuto_alarme}:${segundo_alarme}`
})

btn_parar.addEventListener('click', ()=>{
    alarme_ativado = false
    alarme_tocando = false
    hora_alarme.innerHTML = 'Hora do Alarme:'
    tmp_alarme.value = 0
    timer.classList.remove('alarme_aviso')
    som_alarme.pause()
    som_alarme.currentTime = 0
})


let data = new Date()
data.setDate(1)

const dia = data.getDate()
const dia_HTML = dia < 10 ? `0${dia}` : dia

const mes = data.getMonth()
const mes_HTML = mes < 10 ? `0${mes}` : mes

const data_reduzido = `${dia_HTML}/${mes_HTML}/${data.getFullYear()}`

div_data. innerHTML = data_reduzido

const relogio = ()=>{
    const data = new Date()
    let hora = data.getHours()
    hora = hora < 10 ? `0${hora}` : hora

    let minuto = data.getMinutes()
    minuto = minuto < 10 ? `0${minuto}` : minuto

    let segundo = data.getSeconds()
    segundo = segundo < 10 ? `0${segundo}` : segundo
    
    const hora_completa = `${hora}:${minuto}:${segundo}`
    div_relogio.innerHTML = hora_completa

    if(alarme_ativado == true && alarme_tocando == false){
        if(data.getTime() >= ts_alarme){
            alarme_tocando = true
            som_alarme.play()
            timer.classList.add('alarme_aviso')
        }
    }
}

setInterval(relogio, 1000)

