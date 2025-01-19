import model from "../libs/gemini.js";

const chatHistory = [
    {
      role: "user",
      parts: [{ text: "Maintain words in a single line like upto 10-15 only for each line" }],
    },
  ];
  
  // Function to handle user chat with async/await
  const sendChat = async (req, res) => {
      const msg = req.body.msg; // Get the user's message from the request
  
      try {
          // Add the user's message to the chat history
          chatHistory.push({
              role: "user",
              parts: [{ text: msg }],
          });
  
          // Start a new chat session with the updated history
          const chat = model.startChat({ history: chatHistory });
  
          // Send the message and get the response from the model
          const result = await chat.sendMessage(msg);
  
          // Get the text of the model's response
          const data = result.response.text();
  
          // Add the model's response to the chat history
          chatHistory.push({
              role: "model",
              parts: [{ text: data }],
          });
  
          // Respond to the client with the model's reply
          res.status(200).json(data);
      } catch (error) {
          // Log and handle any errors
          console.error("Error in chat:", error);
          res.status(500).json({ error: "Something went wrong" });
      }
  };
  


export default sendChat