import { Toast } from './toast.js';

const toast = new Toast(document.body);

const baseURL = 'https://heroes-api-6t0j.onrender.com';

function clearInputs(parent) {
	parent.querySelectorAll('input').forEach((input) => {
		input.value = input.type === 'number' ? 0 : '';
	});
}

function handleDisableChildren(parent, isDisabled = false) {
	const inputs = parent.querySelectorAll('input');
	const buttons = parent.querySelectorAll('button');

	if (isDisabled) {
		inputs.forEach((input) => (input.disabled = true));
		buttons.forEach((button) => (button.disabled = true));
	} else {
		inputs.forEach((input) => (input.disabled = false));
		buttons.forEach((button) => (button.disabled = false));
	}
}

function hasToken() {
	const token = localStorage.getItem('@heroes:token');

	if (!token) {
		location.replace('./index.html');
	}
}

export { baseURL, toast, clearInputs, handleDisableChildren, hasToken };
