const detailsHTML = document.querySelector(".detailsWrapper");

async function getDetails(id) {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=6631e5f1dc96088e0d26b86da29b5b6a`);
	    const data = await response.json();
		console.log(data);
		return (data);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

function printDetails(details) {
	let back;
	(details.backdrop_path) ? back = details.backdrop_path : back = `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg`;
	const div = document.createElement("div");
	div.classList.add("details");
	div.innerHTML = `
		<div class="details__img"><img src="http://image.tmdb.org/t/p/w500${back}" alt=""></div>
		<div class="txt">
			<div class="txt__name">${details.name}</div>
			<div class="txt__genres">genre : </div>
			<div class="txt__overview">resume : ${details.overview}</div>
			<div class="txt__global">
				<div class="first">first appearance : <span>${details.first_air_date}</span></div>
				<div class="status">status : <span>${details.status}</span></div>
				<div class="popularity">TMDB popularity : <span>${details.popularity}</span></div>
			</div>
		</div>
		<button class="return">return to main page</button>
		`
	detailsHTML.append(div);
	const genreHTML = document.querySelector(".txt__genres");
	details.genres.forEach(genre => {
		const divGenre = document.createElement("div");
		divGenre.classList.add("genre");
		divGenre.innerHTML = genre.name;
		genreHTML.append(divGenre);
	});
}

const id = JSON.parse(localStorage.getItem("id"))
// console.log();

async function createDetails() {
	const details = await getDetails(id.id)
	printDetails(details);
}

createDetails();

detailsHTML.addEventListener("click", (e)=> {
	if (e.target.matches(".return")) {
		window.location.href = 'index.html';
	}
})
