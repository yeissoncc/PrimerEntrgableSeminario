const celeste= document.getElementById('celeste');
const violeta= document.getElementById('violeta');
const naranja= document.getElementById('naranja');
const verde= document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego{
	constructor(){
		this.inicializar()
		this.generarSecuencia()
		setTimeout(this.siguienteNivel(), 500);
	}
	inicializar(){
		this.toggleBtnEmpezar()
		this.nivel=  1
		this.colores = {
			celeste,
			naranja,
			verde,
			violeta
		}
	}
	toggleBtnEmpezar(){
		if(btnEmpezar.classList.contains('hide')){
			btnEmpezar.classList.remove('hide')
		}else{
			btnEmpezar.classList.add('hide')
		}
	}
	generarSecuencia(){
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n=>Math.floor(Math.random()*4))
		console.log(this.secuencia)
	}
	siguienteNivel(){
		this.subNivel = 0
		this.iluminarSecuencia();
		this.agregarEventosClick();
	}
	iluminarSecuencia(){
		for(let i=0; i<this.nivel; i++){
			const color = this.transformarNumeroColor(this.secuencia[i])
			setTimeout(() => this.iluminarColor(color), 1000 * i);
		}
	}
	iluminarColor(color){
		this.colores[color].classList.add('light');
		setTimeout(() => this.apagarColor(color), 350);
	}
	
	apagarColor(color){
		this.colores[color].classList.remove('light');
	}
	transformarNumeroColor(numero) {
		switch(numero) {
			case 0:
				return 'celeste';
			case 1:
				return 'violeta';
			case 2: 
				return 'naranja';
			case 3:
				return 'verde';
		}
	}
	transformarColorNumero(color) {
		switch(color) {
			case 'celeste':
				return 0;
			case 'violeta':
				return 1;
			case 'naranja': 
				return 2;
			case 'verde':
				return 3;
		}
	}
	agregarEventosClick() {
		this.colores.celeste.addEventListener('click', this.elegirColor.bind(this));
		this.colores.naranja.addEventListener('click', this.elegirColor.bind(this));
		this.colores.violeta.addEventListener('click', this.elegirColor.bind(this));
		this.colores.verde.addEventListener('click', this.elegirColor.bind(this));
	}
	elegirColor(ev) {
		const NOMBRE_COLOR = ev.target.dataset.color;
		const NUMERO_COLOR = this.transformarColorNumero(NOMBRE_COLOR);
		this.iluminarColor(NOMBRE_COLOR);

		if(NUMERO_COLOR === this.secuencia[this.subNivel]) {
			this.subNivel++;

			if(this.subNivel === this.nivel) {
				this.nivel++;
				this.eliminarEventosClick();
			}
			if(this.nivel === ((ULTIMO_NIVEL) + 1 )) {
				this.ganoJuego();
			}else {
				setTimeout(this.siguienteNivel.bind(this), 1500)
			}
		}else {
			this.perdioJuego();
		}
	}
	eliminarEventosClick() {
		this.colores.celeste.removeEventListener('click', this.elegirColor.bind(this));
		this.colores.naranja.removeEventListener('click', this.elegirColor.bind(this));
		this.colores.violeta.removeEventListener('click', this.elegirColor.bind(this));
		this.colores.verde.removeEventListener('click', this.elegirColor.bind(this));
	}
	ganoJuego() {
		swal('Usuario', 'Haz ganado', 'success');
		this.inicializar();
	}
	perdioJuego() {
		swal('Usuario', 'Haz perdido', 'error');
		this.eliminarEventosClick();
		this.inicializar();
	}
}
function empezarJuego() {
	var juego = new Juego();
}

