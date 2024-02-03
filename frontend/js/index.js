import { baseURL, toast, clearInputs, handleDisableChildren } from './utils.js';

const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

window.addEventListener('load', () => {
	const token = localStorage.getItem('@heroes:token');

	if (token) {
		window.location.replace('./herois.html');
	}
});

loginBtn.addEventListener('click', login);

async function login(e) {
	e.preventDefault();
	handleDisableChildren(loginForm, true);

	if (!username.value.trim() || !password.value.trim()) {
		toast.showToast('Preencha os campos', 'alert');
		return;
	}

	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const response = await fetch(`${baseURL}/login`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				username: username.value,
				password: password.value,
			}),
		});

		const { token } = await response.json();

		if (token) {
			localStorage.setItem('@heroes:token', token);
			window.location.replace('./herois.html');
		}
	} catch (error) {
		toast.showToast('Ocorreu um erro', 'error');
	} finally {
		clearInputs(loginForm);
		handleDisableChildren(loginForm, false);
	}
}
