import { setEscalationHandler } from "./copyEscalation";

let ActiveEscalations = {};

function formatInputs(result) {
	// Format values here then return it as string
	// e.g. [1234, 2222, 3333] will return "1234, 2222 & 3333"
	let final_result = "";

	if (result.length == 1) {
		return result[0];
	}

	for (let i = 0; i < result.length; i++) {
		if (i === result.length - 1) {
			final_result += `& ${result[i]}`;
		} else if (i === result.length - 2) {
			final_result += `${result[i]} `;
		} else {
			final_result += `${result[i]}, `;
		}
	}

	return final_result;
}

// Use this in event's listener of selection, choices, and input fields
export function addEscalation(id) {
	const restriction = document.querySelector(`#${id}`);
	const linkedExtra = document.querySelector(`#${id}-extra`);
	const escalation = restriction.getAttribute("data-escalation");

	if (linkedExtra) {
		const selected = linkedExtra.querySelector(".selected");

		const selectedOption = selected
			? linkedExtra.querySelector(".selected").getAttribute("data-value").trim()
			: "";

		const slotGroup1 = linkedExtra.querySelector("[data-slot=slot1]");
		const slotGroup2 = linkedExtra.querySelector("[data-slot=slot2]");
		const slotGroup3 = linkedExtra.querySelector("[data-slot=slot3]");
		const slotGroup4 = linkedExtra.querySelector("[data-slot=slot4]");
		const allInputFields = linkedExtra.querySelectorAll("input");
		let inputCount = 0;
		allInputFields.forEach((input) => {
			if (input.value != "") {
				inputCount++;
			}
		});

		const slot1values = getInputFieldContents(slotGroup1);
		const slot2values = getInputFieldContents(slotGroup2);
		const slot3values = getInputFieldContents(slotGroup3);
		const slot4values = getInputFieldContents(slotGroup4);

		// Add values of each input within slot groups to corresponding slotvalues array
		function getInputFieldContents(slotGroup) {
			let result = [];

			if (slotGroup) {
				const allInputFields = slotGroup.querySelectorAll("input");

				allInputFields.forEach((input) => {
					if (input.value) {
						if (
							input.getAttribute("data-special") == "true" &&
							input.getAttribute("data-value")
						) {
							result.push(input.getAttribute("data-value").trim());
						} else if (input.getAttribute("data-special") != "true")
							result.push(input.value.trim());
					}
				});
			}

			return result;
		}

		const slot1 = formatInputs(slot1values)
			? formatInputs(slot1values).trim()
			: "";
		const slot2 = formatInputs(slot2values)
			? formatInputs(slot2values).trim()
			: "";
		const slot3 = formatInputs(slot3values)
			? formatInputs(slot3values).trim()
			: "";
		const slot4 = formatInputs(slot4values)
			? formatInputs(slot4values).trim()
			: "";

		//Replace [option] and [slot#] from data-escalation
		const optionFilled = escalation.replace("[option]", selectedOption);
		const slot1Filled = optionFilled.replace(
			"[slot1]",
			slot1 ? slot1 : "[slot1]"
		);
		const slot2Filled = slot1Filled.replace(
			"[slot2]",
			slot2 ? slot2 : "[slot2]"
		);
		const slot3Filled = slot2Filled.replace(
			"[slot3]",
			slot3 ? slot3 : "[slot3]"
		);
		const slot4Filled = slot3Filled.replace(
			"[slot4]",
			slot4 ? slot4 : "[slot4]"
		);

		const final = slot4Filled.replace("[inputCount]", inputCount);

		ActiveEscalations[id] = final;
	} else {
		ActiveEscalations[id] = escalation;
	}

	// console.log(`${id} added`);
}

export function removeEscalation(id) {
	if (Object.keys(ActiveEscalations).includes(id)) {
		delete ActiveEscalations[id];
		// console.log(`${id} removed`);
	}
}

export function resetEscalation() {
	ActiveEscalations = {};
}

export function getEscalations() {
	return ActiveEscalations;
}

function capitalizeFirstLetter(str) {
	if (!str) return str; // Return as is if the string is empty or null
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function updateResult() {
	let result = [];

	// Add escalation values to result array
	Object.values(ActiveEscalations).forEach((escalation) => {
		result.push(escalation);
	});

	// Join escalation items in result array and format them accordingly
	if (result.length > 1) {
		result = result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
	} else {
		result = result.join("");
	}

	// Update escalation display
	const resultP = document.querySelector("#escalation-result");
	if (result) {
		resultP.textContent = `Escalating case - ${capitalizeFirstLetter(result)}.`;
	} else {
		resultP.textContent = "No restrictions selected.";
	}

	setEscalationHandler();
}

function findNextSpecialButton(currentElement) {
	// Start from the current element
	let element = currentElement;

	// Loop through the DOM tree
	while (element) {
		// Check for the next sibling
		if (element.nextElementSibling) {
			element = element.nextElementSibling;

			// If the next sibling has the target class, return it
			if (element.classList.contains("special-buttons")) {
				return element;
			}

			// If not, look inside the sibling for nested matches
			const nestedMatch = element.querySelector(".special-buttons");
			if (nestedMatch) {
				return nestedMatch;
			}
		} else {
			// Move up to the parent's next sibling
			element = element.parentElement;

			if (element && element.nextElementSibling) {
				element = element.nextElementSibling;

				// Check if this new sibling has the target class
				if (element.classList.contains("special-buttons")) {
					return element;
				}

				// Check for nested matches
				const nestedMatch = element.querySelector(".special-buttons");
				if (nestedMatch) {
					return nestedMatch;
				}
			}
		}
	}

	// Return null if no matching element is found
	return null;
}

function inputFieldEventHandler(event) {
	const inputField = event.currentTarget;

	const id = inputField
		.closest(".additional-input")
		.getAttribute("id")
		.replace("-extra", "");

	const preset = inputField.getAttribute("data-preset");

	if (preset) {
		const active = findNextSpecialButton(inputField)
			.querySelector(".active")
			.getAttribute("data-value");

		const afterPreset = preset
			.replace("[value]", inputField.value.trim())
			.replace("[option]", active.trim());

		inputField.setAttribute("data-value", afterPreset);
	} else {
		inputField.setAttribute("data-value", inputField.value.trim());
	}

	addEscalation(id);
	updateResult();
}

function addInputEventHandler(inputField) {
	["keyup", "keydown", "blur"].forEach((eventType) => {
		inputField.addEventListener(eventType, inputFieldEventHandler);
	});
}

export default {
	updateResult,
	removeEscalation,
	addEscalation,
	resetEscalation,
	addInputEventHandler,
};
