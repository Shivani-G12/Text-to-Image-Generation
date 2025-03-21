// script.js
document.getElementById("generate-button").addEventListener("click", async () => {
    const textInput = document.getElementById("text-input").value.trim();
    const loadingText = document.getElementById("loading-text");
    const generatedImage = document.getElementById("generated-image");
  
    if (!textInput) {
      alert("Please enter a description!");
      return;
    }
  
    // Show loading text
    loadingText.style.display = "block";
    generatedImage.style.display = "none";
  
    try {
      // Make a request to the backend
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textInput }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate image. Please try again.");
      }
  
      const data = await response.json();
  
      // Update image source
      generatedImage.src = data.path;
      generatedImage.style.display = "block";
    } catch (error) {
      alert(error.message);
    } finally {
      loadingText.style.display = "none";
    }
  });
  