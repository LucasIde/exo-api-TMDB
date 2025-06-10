// ==============================
// 🌱 Sélection des éléments
// ==============================
const btnAll = document.querySelector(".btnWrapper");
const listHTML = document.querySelector(".list")

// ==============================
// 🌍 Variables globales
// ==============================

const current = {
	id : '',
	btn : ''
}

let currentbtn;
let page = 1;
let timeout = [];


// ==============================
// 🎊 Fonctionnalités
// ==============================

async function getSeries(category) {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/tv/${category}?api_key=6631e5f1dc96088e0d26b86da29b5b6a&include_adult=false&language=en-US&page=${page}`);
	    const data = await response.json();
		console.log(data);
		return (data);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

function createCard(serie) {
	let poster;
	(serie.poster_path) ? poster = `http://image.tmdb.org/t/p/w500${serie.poster_path}` : poster = `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg`;
	const div = document.createElement("div");
	div.className += "serie";
	div.dataset.id = serie.id;
	div.innerHTML = `
	<div class="title">${serie.name}</div>
	<div class="img">
	<img src="${poster}" alt="">
	</div>
	<div class="vote">${serie.vote_average}/10</div>
	`
	listHTML.append(div);
	requestAnimationFrame(() => {
		setTimeout(() => {
			div.classList.add("visible");
		}, 1);
	});
}

function createList(series, erase = 1) {
	timeout.forEach(element => {
		clearTimeout(element)
	});
	timeout = [];
	if (erase) {
		listHTML.innerHTML = "";
	}
	series.results.forEach((serie, index)=> {
		const tmp = setTimeout(() => {
			createCard(serie);
		},index * 100);
		timeout.push(tmp);
	});
}

function addactive(target, category) {
	if (currentbtn != category) {
		page = 1;
		const btn = document.querySelector(`[data-category="${currentbtn}"]`)
		console.log(btn);
		btn.classList.remove("active");
		currentbtn = category;
		target.classList.add("active");
	}
	current.btn = currentbtn;
	localStorage.setItem("id", JSON.stringify(current));
}

async function init(category = "top_rated"){
	currentbtn = "top_rated";
	const local = JSON.parse(localStorage.getItem("id"));
	if (local) {
		category = local.btn;
	}
	console.log(category);
	addactive(document.querySelector(`[data-category="${category}"]`), category);
	currentbtn = category;
	const series = await getSeries(category);
	createList(series);
}

// ==============================
// 🧲 Événements
// ==============================

init()

btnAll.addEventListener("click", async (e) => {
	if (e.target.matches("button")) {
		const category = e.target.dataset.category;
		addactive(e.target, category);
		const series = await getSeries(category);
		createList(series);
	}
})

listHTML.addEventListener("click", (e)=> {
	const target = (e.target.closest(".serie"));
	if (target) {
		const id = target.dataset.id;
		current.id = id;
		current.btn = currentbtn;
		localStorage.setItem("id", JSON.stringify(current));
		window.location.href = 'description.html';
	}
})

addEventListener("scrollend", async ()=> {
	page++;
	const series = await getSeries(currentbtn, page);
	createList(series, 0);
	setTimeout("", 2000);
})
