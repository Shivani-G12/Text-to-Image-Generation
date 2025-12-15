document.getElementById("GenerateBtn").addEventListener("click", async function () {

    // Hugging Face token intentionally removed for security
    const HF_TOKEN = ""; // Add token via environment variable if running locally

    const input = document.getElementById("textInput").value.trim();
    const loadingSpinner = document.getElementById("loadingSpinner");
    const emptyInputMessage = document.getElementById("emptyInputMessage");
    const imageContainer = document.getElementById("imageContainer");

    if (input === "") {
        emptyInputMessage.style.display = "block";
        return;
    } else {
        emptyInputMessage.style.display = "none";
    }

    const regex = /[^a-zA-Z0-9\s.,!?'"-]/;
    if (regex.test(input)) {
        alert("Please use only valid characters: letters, numbers, and basic punctuation.");
        return;
    }

    loadingSpinner.style.display = "block";
    imageContainer.innerHTML = "";

    async function generateImage(promptText) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: promptText })
            }
        );

        if (!response.ok) {
            throw new Error("Image generation failed");
        }

        return await response.blob();
    }

    try {
        const imageBlob = await generateImage(input);
        const imageUrl = URL.createObjectURL(imageBlob);
        const img = new Image();
        img.src = imageUrl;
        img.alt = "Generated Image";
        imageContainer.appendChild(img);
    } catch (error) {
        console.error(error);
        loadingSpinner.innerText = "Error generating image. Please try again.";
        setTimeout(() => {
            loadingSpinner.style.display = "none";
            loadingSpinner.innerText = "";
        }, 3000);
        return;
    }

    loadingSpinner.style.display = "none";
});
