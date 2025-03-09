function formatResponse(response) {
    // Replace **word** with <strong>word</strong>
    let formattedText = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace * with <br> for line breaks
    formattedText = formattedText.replace(/\*/g, '<br>');
    
    return formattedText;
}

// Example usage:
const apiResponse = "React JS, often shortened to just *React*, is a **JavaScript library** used for building **user interfaces (UIs)**.";
const formattedResponse = formatResponse(apiResponse);
console.log(formattedResponse);
