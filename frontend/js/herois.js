import { baseURL, toast, clearInputs, handleDisableChildren } from './utils.js';

// containers
const filterOverlay = document.getElementById('filter-overlay');
const newHeroOverlay = document.getElementById('new-hero-overlay');
const editHeroOverlay = document.getElementById('edit-hero-overlay');
const heroesContainer = document.getElementById('heroes-container');

// forms
const filterModal = document.getElementById('filter-modal');
const newHeroModal = document.getElementById('new-hero-modal');
const editHeroModal = document.getElementById('edit-hero-modal');

// inputs
const nameInput = document.getElementById('name-filter');
const skipInput = document.getElementById('skip-filter');
const limitInput = document.getElementById('limit-filter');
const heroName = document.getElementById('hero-name');
const heroPower = document.getElementById('hero-power');
const editedName = document.getElementById('edit-hero-name');
const editedPower = document.getElementById('edit-hero-power');

// buttons
const openFiltersBtn = document.getElementById('open-filter-modal');
const filterBtn = document.getElementById('filter-btn');
const openNewHeroBtn = document.getElementById('open-new-hero-modal');
const addHeroBtn = document.getElementById('add-hero-btn');
const editHeroBtn = document.getElementById('edit-hero-btn');
const deleteHeroBtn = document.getElementById('delete-hero-btn');

let selectedHeroId = null;
let selectedHeroCard = null;

window.addEventListener('load', filter);
document.body.addEventListener('click', closeModal);

openFiltersBtn.addEventListener('click', showFilterModal);
filterBtn.addEventListener('click', filter);
openNewHeroBtn.addEventListener('click', showNewHeroModal);
addHeroBtn.addEventListener('click', addHero);
editHeroBtn.addEventListener('click', editHero);
deleteHeroBtn.addEventListener('click', deleteHero);

function closeModal(e, isFinalAction = false) {
	e.preventDefault();

	const id = e.target.id;

	if (
		id === filterOverlay.id ||
		id === newHeroOverlay.id ||
		id === editHeroOverlay.id ||
		id === 'cancel-btn' ||
		isFinalAction
	) {
		filterOverlay.classList.replace('flex', 'hidden');
		newHeroOverlay.classList.replace('flex', 'hidden');
		editHeroOverlay.classList.replace('flex', 'hidden');

		document.body.classList.replace('overflow-hidden', 'overflow-auto');
	}
}

function heroCard(data) {
	const wrapper = document.createElement('div');

	const div = document.createElement('div');
	const strong = document.createElement('strong');
	const span = document.createElement('span');

	const openModalBtn = document.createElement('button');
	const editIcon = document.createElement('img');

	wrapper.setAttribute('data-hero-id', data._id);
	wrapper.setAttribute(
		'class',
		'p-[1.5rem] w-full bg-white rounded-[1rem] shadow-md flex items-start justify-between'
	);

	div.setAttribute('class', 'flex flex-col text-[1.6rem]');
	strong.textContent = data.nome;
	span.textContent = data.poder;

	editIcon.src = './icons/edit.svg';
	editIcon.alt = 'Edit button icon';
	editIcon.setAttribute(
		'class',
		'h-[2rem] cursor-pointer transition-opacity hover:opacity-65'
	);
	openModalBtn.appendChild(editIcon);

	div.append(strong, span);
	wrapper.append(div, openModalBtn);

	openModalBtn.addEventListener('click', () =>
		showEditHeroModal(data, wrapper)
	);

	return wrapper;
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
		queries += nameInput.value ? `&nome=${nameInput.value}` : '';

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
			toast.showToast('Herói adicionado com sucesso', 'success');
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(newHeroModal);
		handleDisableChildren(newHeroModal, false);
		closeModal(e, true);
	}
}

function showEditHeroModal(data, cardElement) {
	selectedHeroId = data._id;
	selectedHeroCard = cardElement;

	editedName.value = data.nome;
	editedPower.value = data.poder;

	editHeroOverlay.classList.replace('hidden', 'flex');
	document.body.classList.replace('overflow-auto', 'overflow-hidden');
}

async function editHero(e) {
	e.preventDefault();
	handleDisableChildren(editHeroModal, true);

	try {
		const token = localStorage.getItem('@heroes:token');

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', token);

		const editedHero = {
			nome: editedName.value,
			poder: editedPower.value,
		};

		const response = await fetch(`${baseURL}/herois/${selectedHeroId}`, {
			method: 'PATCH',
			headers,
			body: JSON.stringify(editedHero),
		});

		const data = await response.json();

		if (!data.error) {
			toast.showToast('Herói atualizado com sucesso', 'success');
			heroesContainer.removeChild(selectedHeroCard);
			heroesContainer.appendChild(heroCard(editedHero));
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(editHeroModal);
		handleDisableChildren(editHeroModal, false);
		closeModal(e, true);
	}
}

async function deleteHero(e) {
	e.preventDefault();
	handleDisableChildren(editHeroModal, true);

	try {
		const token = localStorage.getItem('@heroes:token');

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', token);

		const confirmDelete = confirm('Realmente deseja deletar esse herói?');

		if (!confirmDelete) return;

		const response = await fetch(`${baseURL}/herois/${selectedHeroId}`, {
			method: 'DELETE',
			headers,
		});

		const data = await response.json();

		if (!data.error) {
			toast.showToast('Herói removido com sucesso', 'success');
			heroesContainer.removeChild(selectedHeroCard);
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(editHeroModal);
		handleDisableChildren(editHeroModal, false);
		closeModal(e, true);
	}
}
