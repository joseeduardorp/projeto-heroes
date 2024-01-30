import { Toast } from './toast.js';

const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

const baseURL = 'https://heroes-api-6t0j.onrender.com';

window.onload = () => {
	loginBtn.addEventListener('click', login);
};

const toast = new Toast(document.body);

async function login(e) {
	e.preventDefault();

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
		username.value = '';
		password.value = '';
	}
}
