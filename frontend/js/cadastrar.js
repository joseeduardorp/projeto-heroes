import { baseURL, toast, clearInputs, handleDisableChildren } from './utils.js';

const signupForm = document.getElementById('signup-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const signupBtn = document.getElementById('signup-btn');

signupBtn.addEventListener('click', signup);

async function signup(e) {
	e.preventDefault();
	handleDisableChildren(signupForm, true);

	if (!username.value.trim() || !password.value.trim()) {
		toast.showToast('Preencha os campos', 'alert');
		return;
	}

	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const response = await fetch(`${baseURL}/signup`, {
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
		clearInputs(signupForm);
		handleDisableChildren(signupForm, false);
	}
}
