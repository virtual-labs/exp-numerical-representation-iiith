document.addEventListener("DOMContentLoaded", function () {
  let hintSelect = document.getElementById("hintSelect");
  hintSelect.addEventListener("change", displayHint);
});

function displayHint() {
  let hintNo = document.getElementById("hintSelect").value;
  if (hintNo == 0) return;

    let qno = document.getElementById("probId").value;
    if (qno == "Problem1")
    {
        qno = 1;
    }
    else {
        qno = 2;
    }
  let hintPath = `Hints${qno}/Hint_${hintNo}.html`;

  fetch(hintPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("hintBox").innerHTML = data;
    })
    .catch(() => {
      document.getElementById("hintBox").innerText = "Hint not found.";
    });
}


CompilerService= "https://svc-test.vlabs.ac.in/compiler/"



function formatCompileErrors(errorText) {
  if (!errorText) return "";
  return errorText.replace(/\n/g, "<br>"); 
}

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the UI elements
  const compileBtn = document.getElementById("compile-btn");
  const runBtn = document.getElementById("run-btn");
  const languageSelect = document.getElementById("codeId"); // Language selection dropdown
  const problemSelect = document.getElementById("probId"); // Problem selection dropdown
  let resultDisplay = document.getElementById("result-display");
  if (!resultDisplay) {
    resultDisplay = document.createElement("div");
    resultDisplay.id = "result-display";
    resultDisplay.style.margin = "10px 0";
    resultDisplay.style.padding = "10px";
    resultDisplay.style.border = "1px solid #ccc";
    document.getElementById("contentLeft").appendChild(resultDisplay);
  } 
  

  
  const basePath = document.querySelector('meta[name="base-path"]')?.content || '';
  
  compileBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("Compile button clicked");
    
      const code = editAreaLoader.getValue("editArea");
      console.log(code);
    const language = languageSelect.value;
    
    compileCode(code, language);
  });
  
  runBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("Run button clicked");
    
      const code = editAreaLoader.getValue("editArea");
      const language = languageSelect.value;
      if (problemSelect.value == "Problem1") {
        problemId = 1;
      } else {
        problemId = 2;
      }
      console.log(problemId);
    runCode(code, language, problemId);
  });
  
  function compileCode(code, language) {
    resultDisplay.innerHTML = "<p>Compiling...</p>";
    
    const data = new URLSearchParams();
    data.append('code', code);
    data.append('language', language);
    data.append('input', '1'); // Empty input for compilation only
    
    fetch(CompilerService, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Compilation response:", data);

        if (data.status === 200 && !data.error) {
          resultDisplay.innerHTML = `
          <center><p style="color:green">Compilation successful</p></center>
          <br><br>
        `;
        } else {
          resultDisplay.innerHTML = `
          <center><p style="color:red">Compile Error</p></center>
          <br><br>
          ${formatCompileErrors(data.error)}
        `;
        }
      })
      .catch((error) => {
        console.error("Error during compilation:", error);
        resultDisplay.innerHTML = `
        <center><p style="color:red">Error connecting to compiler service</p></center>
        <br><br>
        ${error.message}
      `;
      });
  }
  
  function runCode(code, language, problemId) {
    resultDisplay.innerHTML = "<p>Running...</p>";

    const testCases = getCustomTestCases(problemId);

    if (!testCases || testCases.length === 0) {
      resultDisplay.innerHTML = `
      <center><p style="color:red">Error: No test cases defined for problem ${problemId}</p></center>
    `;
      return;
    }

    processTestCases(code, language, testCases);
  }

  function getCustomTestCases(problemId) {
    const customTestCases = {
      1: [
        { input: "65", expectedOutput: "7" },
        { input: "13", expectedOutput: "4" },
        { input: "5", expectedOutput: "3" },
        { input: "100000", expectedOutput: "17" },
        { input: "1000000", expectedOutput: "20" },
      ],
      2: [
        { input: "3\nA\nB\nC\nAC", expectedOutput: "4" },
        { input: "5\nA\nB\nC\nD\nE\nCE", expectedOutput: "28" },
        { input: "4\nX\nD\nR\nH\nDRH", expectedOutput: "11" },
        { input: "4\nX\nD\nR\nH\nR", expectedOutput: "13" },
        { input: "15\nA\nX\nS\nR\nO\nV\nG\nN\nM\nD\nU\nI\nQ\nJ\nZ\nJZ", expectedOutput: "32766" },
      ],
    };

    return customTestCases[problemId] || [];
  }

  async function processTestCases(code, language, testCases) {
  let tableHtml = `
    <table border="1" cellpadding="15" id="tableInpOut">
      <tr>
        <td>Input Data</td>
        <td>Expected Output</td>
        <td>Code Output</td>
        <td>Result</td>
        <td>Remarks</td>
      </tr>
  `;
  
  testCases.forEach(testCase => {
    tableHtml += `
      <tr id="test-case-${testCases.indexOf(testCase)}">
        <td>${escapeHtml(testCase.input)}</td>
        <td>${escapeHtml(testCase.expectedOutput)}</td>
        <td colspan="3">Waiting...</td>
      </tr>
    `;
  });
  
  tableHtml += "</table>";
  resultDisplay.innerHTML = tableHtml;
  
  let overallResult = "Accepted!!";
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    
    try {
      const result = await runTestCase(code, language, testCase.input, testCase.expectedOutput);
      
      const testRow = document.getElementById(`test-case-${i}`);
      if (testRow) {
        testRow.innerHTML = result.rowHtml;
      }
      
      if (result.status !== "Passed") {
        overallResult = result.message;
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error(`Error in test case ${i}:`, error);
      
      const testRow = document.getElementById(`test-case-${i}`);
      if (testRow) {
        testRow.innerHTML = `
          <td>${escapeHtml(testCase.input)}</td>
          <td>${escapeHtml(testCase.expectedOutput)}</td>
          <td>Error</td>
          <td>Failed</td>
          <td>Test Error: ${escapeHtml(error.message)}</td>
        `;
      }
      
      overallResult = "Test Error";
    }
  }
  
  const resultHeader = document.createElement('div');
  resultHeader.innerHTML = `
    <center><p style="color:${overallResult === "Accepted!!" ? "green" : "red"}">${overallResult}</p></center>
    <br>
  `;
  resultDisplay.insertBefore(resultHeader, resultDisplay.firstChild);
}

function runTestCase(code, language, input, expected) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams();
    data.append('code', code);
    data.append('language', language);
    data.append('input', input);
    
    fetch(CompilerService, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Test case response:", data);

        const actualOutput = data.output ? data.output.trim() : "";
        const expectedOutput = expected ? expected.trim() : "";

        let rowHtml = "";
        let status = "";
        let message = "";

        if (data.error) {
          rowHtml = `
          <td>${escapeHtml(input)}</td>
          <td>${escapeHtml(expectedOutput)}</td>
          <td>${escapeHtml(actualOutput)}</td>
          <td>Failed</td>
          <td>Runtime Error: ${escapeHtml(data.error)}</td>
        `;

          status = "Failed";
          message = "Runtime Error";
        } else if (
          (data.output && data.output.includes("Time limit exceeded")) ||
          data.status !== 200
        ) {
          rowHtml = `
          <td>${escapeHtml(input)}</td>
          <td>${escapeHtml(expectedOutput)}</td>
          <td>${escapeHtml(actualOutput)}</td>
          <td>Failed</td>
          <td>Time Limit Exceeded</td>
        `;

          status = "Failed";
          message = "Time Limit Exceeded";
        } else if (actualOutput === expectedOutput) {
          rowHtml = `
          <td>${escapeHtml(input)}</td>
          <td>${escapeHtml(expectedOutput)}</td>
          <td>${escapeHtml(actualOutput)}</td>
          <td>Passed</td>
          <td></td>
        `;

          status = "Passed";
          message = "Accepted!!";
        } else {
          rowHtml = `
          <td>${escapeHtml(input)}</td>
          <td>${escapeHtml(expectedOutput)}</td>
          <td>${escapeHtml(actualOutput)}</td>
          <td>Failed</td>
          <td>Wrong Answer</td>
        `;

          status = "Failed";
          message = "Wrong Answer";
        }

        resolve({
          rowHtml: rowHtml,
          status: status,
          message: message,
        });
      })
      .catch((error) => {
        console.error("Error running test case:", error);

        const rowHtml = `
        <td>${escapeHtml(input)}</td>
        <td>${escapeHtml(expected)}</td>
        <td>Error</td>
        <td>Failed</td>
        <td>API Error: ${escapeHtml(error.message)}</td>
      `;

        resolve({
          rowHtml: rowHtml,
          status: "Failed",
          message: "API Error",
        });
      });
  });
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') {
    return unsafe;
  }
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

});


