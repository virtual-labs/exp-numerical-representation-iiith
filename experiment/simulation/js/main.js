
// --- Problems (from fillintheblanks.js, adapted) ---
const problems = [
	{
		id: 1,
		title: "Minimum Bits for Integer",
		desc: "Given a positive integer (≤ 1,000,000), find the minimum number of bits required to represent it as a binary number.",
		template: [
			"int main() {",
			"    int n;",
			"    scanf(\"%d\", &n);",
			"    int bits = _____;", // blank 0
			"    while (_____)", // blank 1
			"    {",
			"        bits++;",
			"        n _____ _____;", // blank 2, blank 3
			"    }",
			"    printf(\"%d\\n\", bits);",
			"    return 0;",
			"}"
		],
		blanks: [
			{ line: 3, answers: ["0"], placeholder: "initial value" },
			{ line: 4, answers: ["n > 0", "n>0", "(n > 0)", "(n>0)"], placeholder: "condition" },
			{ line: 7, answers: [">>=", ">>="], placeholder: "operator" },
			{ line: 7, answers: ["1"], placeholder: "value" }
		],
		hints: [
			"Blank 1: What should bits be initialized to?",
			"Blank 2: The loop should run while n is positive.",
			"Blank 3: Use the right shift assignment operator to divide n by 2.",
			"Blank 4: What value do you shift by?",
			"For n=13, output is 4. For n=8, output is 4."
		],
		compilerOutput: "Compiled successfully.",
		runtimeOutput: "For n=13, output is 4. For n=8, output is 4."
	},
	{
		id: 2,
		title: "Index of Ordered Subset",
		desc: "Given N (≤ 26) distinct characters, and a word formed from these characters (preserving their order), find the index of the word among all possible ordered subsets (dictionary order).",
		template: [
			"int index_of_subset(int n, char chars[], char word[]) {",
			"    int idx = _____;", // blank 0
			"    int len = strlen(word);",
			"    for (int i = 0; i < len; ++i) {",
			"        int pos = _____; // blank 1",
			"        idx _____ 1 << pos;", // blank 2
			"    }",
			"    return idx;",
			"}"
		],
		blanks: [
			{ line: 1, answers: ["0"], placeholder: "initial value" },
			{ line: 4, answers: ["strchr(chars, word[i]) - chars", "(strchr(chars, word[i]) - chars)", "strchr(chars,word[i])-chars"], placeholder: "position of word[i] in chars" },
			{ line: 5, answers: ["+=", "+= "], placeholder: "operator" }
		],
		hints: [
			"Blank 1: What should idx be initialized to?",
			"Blank 2: Find the position of word[i] in chars using strchr.",
			"Blank 3: Use the correct operator to add to idx.",
			"For chars = 'abcde', word = 'bd', output is 18. For chars = 'abc', word = 'ac', output is 5."
		],
		compilerOutput: "Compiled successfully.",
		runtimeOutput: "For chars = 'abcde', word = 'bd', output is 18. For chars = 'abc', word = 'ac', output is 5."
	},
	{
		id: 3,
		title: "Decimal to Binary String",
		desc: "Given a positive integer, print its binary representation as a string.",
		template: [
			"int main() {",
			"    int n;",
			"    scanf(\"%d\", &n);",
			"    char bin[32];",
			"    int i = _____;", // blank 0
			"    while (_____)", // blank 1
			"    {",
			"        bin[i--] = (n _____ 1) ? '1' : '0';", // blank 2
			"        n _____ 1;", // blank 3
			"    }",
			"    printf(\"%s\\n\", bin + i + 1);",
			"    return 0;",
			"}"
		],
		blanks: [
			{ line: 4, answers: ["31"], placeholder: "start index" },
			{ line: 5, answers: ["n > 0", "n>0", "(n > 0)", "(n>0)"], placeholder: "condition" },
			{ line: 7, answers: ["&", "& "], placeholder: "bitwise AND" },
			{ line: 8, answers: [">>", ">> "], placeholder: "right shift" }
		],
		hints: [
			"Blank 1: What should i be initialized to for a 32-bit int?",
			"Blank 2: The loop should run while n is positive.",
			"Blank 3: Use bitwise AND to get the lowest bit.",
			"Blank 4: Use right shift to move to the next bit.",
			"For n=5, output is 101. For n=8, output is 1000."
		],
		compilerOutput: "Compiled successfully.",
		runtimeOutput: "For n=5, output is 101. For n=8, output is 1000."
	}
];

let currentProblem = null;
let compileSuccess = false;

// --- DOM Elements ---
const problemSelect = document.getElementById('problem-select');
const problemDesc = document.getElementById('problem-desc');
const codeTemplateDiv = document.getElementById('code-template');
const submitBtn = document.getElementById('submit-btn');
const runBtn = document.getElementById('run-btn');
const feedbackDiv = document.getElementById('feedback');
const runtimeOutputDiv = document.getElementById('runtime-output');
const hintLevelSelect = document.getElementById('hint-level');
const hintsDiv = document.getElementById('hints');

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
	populateProblemDropdown();
	problemSelect.addEventListener('change', updateProblem);
	hintLevelSelect.addEventListener('change', updateHint);
	submitBtn.addEventListener('click', checkBlanks);
	runBtn.addEventListener('click', onRun);
});

function populateProblemDropdown() {
	problemSelect.innerHTML = '';
	problems.forEach((p, idx) => {
		const opt = document.createElement('option');
		opt.value = idx;
		opt.textContent = `${p.id}. ${p.title}`;
		problemSelect.appendChild(opt);
	});
	updateProblem();
}

function updateProblem() {
	const idx = parseInt(problemSelect.value);
	currentProblem = problems[idx];
	compileSuccess = false;
	runBtn.disabled = true;
	// Problem statement
	problemDesc.textContent = currentProblem.desc;
	// Render code template with blanks
	codeTemplateDiv.innerHTML = '';
	currentProblem.template.forEach((line, i) => {
		let html = line;
		// Replace all blanks in this line, in order
		let blanksInLine = currentProblem.blanks
			.map((b, idx) => ({...b, idx}))
			.filter(b => b.line === i);
		blanksInLine.forEach((blank, j) => {
			// Replace only the first occurrence of _____ each time
			html = html.replace(
				'_____',
				`<input class="blank-input code-blank" data-blank="${blank.idx}" placeholder="${blank.placeholder}" autocomplete="off">`
			);
		});
		const div = document.createElement('div');
		div.className = 'template-line';
		div.innerHTML = html;
		codeTemplateDiv.appendChild(div);
	});
	// Populate hints
	hintLevelSelect.innerHTML = '';
	currentProblem.hints.forEach((h, i) => {
		const opt = document.createElement('option');
		opt.value = i;
		if (i < currentProblem.blanks.length) {
			opt.textContent = `Hint for Blank ${i+1}`;
		} else {
			opt.textContent = `Example/Explanation`;
		}
		hintLevelSelect.appendChild(opt);
	});
	updateHint();
	feedbackDiv.textContent = '';
	runtimeOutputDiv.textContent = '';
}

function updateHint() {
	const hintIdx = parseInt(hintLevelSelect.value);
	hintsDiv.innerHTML = '';
	if (currentProblem.hints[hintIdx]) {
		const box = document.createElement('div');
		box.className = 'hint-box hint-text';
		box.textContent = currentProblem.hints[hintIdx];
		hintsDiv.appendChild(box);
	}
}

function checkBlanks() {
	let allCorrect = true;
	let feedbackHtml = '';
	currentProblem.blanks.forEach((blank, bIdx) => {
		const input = codeTemplateDiv.querySelector(`input[data-blank="${bIdx}"]`);
		if (!input) return;
		// Remove all whitespace for comparison
		const userVal = input.value.replace(/\s+/g, '');
		let correct = false;
		for (const ans of blank.answers) {
			if (userVal.toLowerCase() === ans.replace(/\s+/g, '').toLowerCase()) {
				correct = true;
				break;
			}
		}
		if (correct) {
			input.style.background = '#eaffea';
			input.classList.remove('is-invalid');
			feedbackHtml += `<div><strong>Blank ${bIdx + 1}:</strong> <span class='feedback-correct'>Correct!</span></div>`;
		} else {
			input.style.background = '#ffeaea';
			input.classList.add('is-invalid');
			feedbackHtml += `<div><strong>Blank ${bIdx + 1}:</strong> <span class='feedback-incorrect'>Incorrect.</span> <span class='feedback-expected'>Expected something like: <code>${blank.answers[0]}</code></span></div>`;
			allCorrect = false;
		}
	});
	if (allCorrect) {
		feedbackHtml += `<div class='feedback-all-correct'>All blanks are correct! Well done!</div>`;
		compileSuccess = true;
		runBtn.disabled = false;
	} else {
		compileSuccess = false;
		runBtn.disabled = true;
	}
	feedbackDiv.innerHTML = feedbackHtml;
	runtimeOutputDiv.textContent = '';
}

function onRun() {
	if (!compileSuccess) return;
	runtimeOutputDiv.innerHTML = `<div class='alert alert-info mt-2'><strong>Runtime Output:</strong><br>${currentProblem.runtimeOutput.replace(/\n/g, '<br>')}</div>`;
}
