import axios from 'axios';

export const sendMessage = async (question) => {
    try {
      const response = await axios.post(
        'https://tharindu.pythonanywhere.com/ask',
        { question: question },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('reply:', response.data);
      return response.data;
    }  catch (err) {
      if (err.response) {
        // Server responded (4xx, 5xx)
        console.error('Server error:', err.response.data);
      } else if (err.request) {
        // Request made but no response (CORS / network)
        console.error('Network/CORS error:', err.message);
      } else {
        // Something else
        console.error('Unexpected error:', err.message);
      }
    
      return {
        success: false,
        answer: 'Unable to connect to server. Please try again later.'
      };
    }
  };
  
