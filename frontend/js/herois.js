import { baseURL, toast, clearInputs, handleDisableChildren } from './utils.js';

const filterOverlay = document.getElementById('filter-overlay');
const newHeroOverlay = document.getElementById('new-hero-overlay');
const heroesContainer = document.getElementById('heroes-container');

const filterModal = document.getElementById('filter-modal');
const newHeroModal = document.getElementById('new-hero-modal');

const nameInput = document.getElementById('name-filter');
const skipInput = document.getElementById('skip-filter');
const limitInput = document.getElementById('limit-filter');
const heroName = document.getElementById('hero-name');
const heroPower = document.getElementById('hero-power');

const openFiltersBtn = document.getElementById('open-filter-modal');
const filterBtn = document.getElementById('filter-btn');
const openNewHeroBtn = document.getElementById('open-new-hero-modal');
const addHeroBtn = document.getElementById('add-hero-btn');

window.addEventListener('load', filter);
document.body.addEventListener('click', closeModal);

openFiltersBtn.addEventListener('click', showFilterModal);
filterBtn.addEventListener('click', filter);
openNewHeroBtn.addEventListener('click', showNewHeroModal);
addHeroBtn.addEventListener('click', addHero);

function closeModal(e, isFinalAction = false) {
	e.preventDefault();

	if (
		e.target.id === filterOverlay.id ||
		e.target.id === newHeroOverlay.id ||
		e.target.id === 'cancel-btn' ||
		isFinalAction
	) {
		filterOverlay.classList.replace('flex', 'hidden');
		newHeroOverlay.classList.replace('flex', 'hidden');
		document.body.classList.replace('overflow-hidden', 'overflow-auto');
	}
}

function heroCard(data) {
	const div = document.createElement('div');
	const strong = document.createElement('strong');
	const span = document.createElement('span');

	div.setAttribute('data-hero-id', data._id);
	div.setAttribute(
		'class',
		'p-[1.5rem] w-full bg-white rounded-[1rem] shadow-md flex flex-col text-[1.6rem]'
	);
	strong.textContent = data.nome;
	span.textContent = data.poder;

	div.append(strong, span);

	return div;
}

function showFilterModal() {
	filterOverlay.classList.replace('hidden', 'flex');
	document.body.classList.replace('overflow-auto', 'overflow-hidden');
}

async function filter(e) {
	e.preventDefault();
	handleDisableChildren(filterModal, true);

	try {
		const token = localStorage.getItem('@heroes:token');

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', token);

		let queries = `skip=${skipInput.value}`;
		queries += `&limit=${limitInput.value}`;
		queries += nameInput.value ? `&nomed=${nameInput.value}` : '';

		const response = await fetch(`${baseURL}/herois?${queries}`, {
			method: 'GET',
			headers,
		});

		const data = await response.json();

		if (!data.error) {
			heroesContainer.innerHTML = null;
			heroesContainer.append(...data.map(heroCard));
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(filterModal);
		handleDisableChildren(filterModal, false);
		closeModal(e, true);
	}
}

function showNewHeroModal() {
	newHeroOverlay.classList.replace('hidden', 'flex');
	document.body.classList.replace('overflow-auto', 'overflow-hidden');
}

async function addHero(e) {
	e.preventDefault();
	handleDisableChildren(newHeroModal, true);

	try {
		const token = localStorage.getItem('@heroes:token');

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', token);

		const response = await fetch(`${baseURL}/herois`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				nome: heroName.value,
				poder: heroPower.value,
			}),
		});

		const data = await response.json();

		if (data._id) {
			const hero = {
				_id: data.id,
				nome: heroName.value,
				poder: heroPower.value,
			};
			heroesContainer.append(heroCard(hero));
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(newHeroModal);
		handleDisableChildren(newHeroModal, false);
		closeModal(e, true);
	}
}
