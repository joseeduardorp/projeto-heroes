const statusTypes = {
	success: 'bg-green-500',
	error: 'bg-red-500',
	alert: 'bg-yellow-500',
	info: 'bg-blue-500',
};

class Toast {
	#element;
	#delay;

	constructor(element, delay = 5000) {
		this.#element = element;
		this.#delay = delay;
	}

	showToast(message = '', type = 'success') {
		const div = document.createElement('div');
		const span = document.createElement('span');
		span.textContent = message;

		const toastStyle = `
      px-[1.5rem] py-[1rem]
      w-fit h-fit ${statusTypes[type]}
      rounded-[0.5rem] shadow-lg
      fixed left-1/2 -translate-x-1/2 bottom-[2rem]
      cursor-pointer
      transition-opacity hover:opacity-80`;

		div.setAttribute('class', toastStyle);
		span.setAttribute('class', 'text-white text-[1.4rem] font-bold');

		div.appendChild(span);
		this.#element.appendChild(div);

		let timeout = null;
		div.addEventListener('click', () => {
			clearTimeout(timeout);
			this.#element.removeChild(div);
		});

		timeout = setTimeout(() => {
			this.#element.removeChild(div);
		}, this.#delay);
	}
}

export { Toast };
