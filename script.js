let curriculumText = "";

// Called when "Generate Curriculum" button is clicked
function generateCurriculum() {

    const data = {
        skill: document.getElementById("skill").value,
        level: document.getElementById("level").value,
        semesters: document.getElementById("semesters").value,
        hours: document.getElementById("hours").value,
        industry: document.getElementById("industry").value
    };

    document.getElementById("output").innerText = "⏳ Generating curriculum...";

    fetch("/api/generate-curriculum", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        curriculumText = result.output;
        document.getElementById("output").innerText = curriculumText;
    })
    .catch(error => {
        document.getElementById("output").innerText = "❌ Error generating curriculum";
    });
}

// Called when "Download PDF" button is clicked
function downloadPDF() {

    if (!curriculumText) {
        alert("Please generate curriculum first!");
        return;
    }

    fetch("/api/download-pdf", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: curriculumText })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "curriculum.pdf";
        a.click();
    });
}
