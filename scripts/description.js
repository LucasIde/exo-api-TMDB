const body = document.body;

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

const id = JSON.parse(localStorage.getItem("id"))
// console.log();

async function createDetails() {
	// const details = await getDetails(id.id)
	printDetails(details);
}
