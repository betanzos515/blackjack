/* 
    *2C = Two of Clubs
    *2D = Two of Diamonds
    *2H = Two of Hearts
    *2S = Two of Spades
*/

const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevoJuego');

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugadores = [];

const small = document.querySelectorAll('small');
const divCartas = document.querySelectorAll('.divCartas');

//Esta funcion inicializa el deck
const inicializarJuego = ( numJugadores = 2 )=>{
    

    crearDeck();
    puntosJugadores = [];
    btnDetener.disabled = false;
    btnPedir.disabled = false;

    /* divCartas.forEach(elemento=> elemento.innerText = 0);
    small.forEach(element => element.innerText = 0); */
    
    for(let i = 0 ; i < numJugadores; i++){
        puntosJugadores.push(0);
    }
    if(divCartas[0].length > 0 && divCartas[1].length){
        console.log('existen elementos en el dom renderizados')
    }
    divCartas.forEach(elemento=> elemento.innerHTML='');
}

const crearDeck = ()=> {
    deck = [];
    for(let i = 2; i<=10;i++){
        for(let tipo  of tipos){
            deck.push(i+tipo); 
        }
    }
    for(let especial of especiales){
        for(let tipo of tipos){
            deck.push(especial + tipo);
        }
    }
    return deck = _.shuffle(deck);
}


//Esta funcion me permite pedir una carta
const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No hay cartas en el deck'//De esta forma creamos nuestras excepcioes
    }
    return  deck.pop();
}


const valorCarta = ( carta )=>{
    const valor = carta.substring(0,(carta.length - 1));
    return (isNaN(valor)) ? 
            ( valor === 'A') ? 11 : 10
            : parseInt(valor);
}

const agregarCarta = (carta,turno)=>{
    const cartaImg = document.createElement('img');
    cartaImg.className ='carta';
    cartaImg.src = `./assets/cartas/${carta}.png` 
    divCartas[turno].appendChild(cartaImg);
};

//Turno:0 jugador, Turno:1 computadora
const acumularPuntos = (turno,carta)=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta) ;
    small[turno].innerText=puntosJugadores[turno];
};

const turnoComputadora = (puntosMinimos)=>{
    do{
        const carta = pedirCarta();
        acumularPuntos(1,carta);
        agregarCarta(carta,1)
        if(puntosJugadores[0] > 21 ){
            console.log('Has perdido la partida');
            btnPedir.disabled = true;
        }else if(puntosJugadores[0] === 21){
            console.log('Felicidades ganaste');
        }
        if(puntosMinimos > 21 ){
            break;
        }
    } while((puntosJugadores[1] < puntosMinimos) && (puntosMinimos <=21));
    determinarGanador(puntosMinimos);
}

const determinarGanador = (puntosMinimos)=>{
    setTimeout(() => {
        if(puntosJugadores[0] === puntosJugadores[1]){
            alert('Nadie Gana ...');
        }
        else if( puntosMinimos > 21 ){
            alert('computadora gana ...');
        }
        else if ( puntosJugadores[1] > 21 ){
            alert('jugador gana ...');
        }
        else{
            console.log('La computadora gano');
        }
    },10);
}

//Eventos Botones 
btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    acumularPuntos(0,carta);
    agregarCarta(carta,0);
    if(puntosJugadores[0] > 21 ){
        console.log('Has perdido la partida');
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
        btnPedir.disabled = true;
    }else if(puntosJugadores[0] === 21){
        //console.log('Felicidades ganaste');
        turnoComputadora(puntosJugadores[0]);
        btnDetener.disabled = true;
    }
});

btnDetener.addEventListener('click',()=>{
    turnoComputadora(puntosJugadores[0]);
    btnPedir.disabled = true;
    btnDetener.disabled = true;
});

btnNuevo.addEventListener('click',()=>{
    inicializarJuego();
});