import Escalation from "./escalation";

function hasStatusAlready(string) {
	let hasStatus = false;

	if (string.toLowerCase().includes("(open)")) {
		return true;
	}

	if (string.toLowerCase().includes("(suspended)")) {
		return true;
	}

	if (string.toLowerCase().includes("(closed)")) {
		return true;
	}

	if (string.toLowerCase().includes("(timeout)")) {
		return true;
	}

	return false;
}

export default function activateSpecialButtons() {
	const specialButtons = document.querySelectorAll(
		"button.open, button.suspended, button.closed, button.timeout"
	);

	specialButtons.forEach((button) => {
		const value = button.getAttribute("data-value");
		const valuesList = ["(Open)", "(Suspended)", "(Closed)", "(Timeout)"];

		button.addEventListener("click", () => {
			// To mark the active button
			const buttonsGroup = button.parentElement.querySelectorAll("button");
			buttonsGroup.forEach((button) => {
				button.classList.remove("active");
			});
			button.classList.add("active");

			// Getting the ID for adding escalation
			const id = button
				.closest(".additional-input")
				.getAttribute("id")
				.replace("-extra", "");

			let target = button.parentElement.previousElementSibling;

			if (target.tagName !== "INPUT") {
				target = target.querySelector("input");
			}

			const preset = target.getAttribute("data-preset");

			if (preset) {
				const afterPreset = preset
					.replace("[value]", target.value.trim())
					.replace("[option]", value.trim());
				console.log(afterPreset);
				target.setAttribute("data-value", afterPreset);
			} else {
				target.setAttribute("data-value", `${target.value} ${value}`);
			}

			// AddEscalation
			Escalation.addEscalation(id);
			Escalation.updateResult();
		});
	});
}
