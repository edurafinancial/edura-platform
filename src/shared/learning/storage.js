export const loadProgress = () => {
	try {
		return JSON.parse(localStorage.getItem("edura-progress")) || {};
	} catch {
		return {};
	}
};

export const doSave = (progress) => {
	try {
		localStorage.setItem("edura-progress", JSON.stringify(progress));
	} catch {}
};

export const loadUser = () => {
	try {
		return JSON.parse(localStorage.getItem("edura-user"));
	} catch {
		return null;
	}
};

export const saveUser = (user) => {
	try {
		localStorage.setItem("edura-user", JSON.stringify(user));
	} catch {}
};
