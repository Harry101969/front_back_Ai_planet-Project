
// // App.js

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './Components/Navbar';
// import InputField from './Components/InputField';
// import Question from './Components/Question';
// import Answer from './Components/Answer';
// import './App.css';

// function App() {
//   const [page, setPage] = useState([]);
//   const [fileName, setFileName] = useState('');
//   const [file, setFile] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [question, setQuestion] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [qaHistory, setQaHistory] = useState([]);

//   useEffect(() => {
//     axios.get('/api/home')
//       .then((res) => {
//         setPage(res.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//       });
//   }, []);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFileName(selectedFile.name);
//       setFile(selectedFile);
//       submitPdf(selectedFile);
//     } else {
//       setFileName('');
//       setFile(null);
//     }
//   };

//   const submitPdf = async (selectedFile) => {
//     const formData = new FormData();
//     formData.append("pdfFile", selectedFile);
//     try {
//       setIsLoading(true);
//       const result = await axios.post('/api/home', formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       console.log('File uploaded successfully', result.data);
//       setExtractedText(result.data.extractedText);

//     } catch (err) {
//       console.error('Error uploading file:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQuestionChange = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleQuestionSubmit = async () => {
//     try {
//       setIsLoading(true);

//       const questionsArray = question.split('?').map(q => q.trim()).filter(q => q.length > 0);
//       setQaHistory(prevQaHistory => [...prevQaHistory, { question, answer: '' }]);

//       const result = await axios.post('/api/query', { text: extractedText, questions: questionsArray });
//       const responses = result.data.responses.map(resp => resp.answer).join('\n');

//       setQaHistory(prevQaHistory => {
//         const updatedQaHistory = [...prevQaHistory];
//         updatedQaHistory[updatedQaHistory.length - 1].answer = responses;
//         return updatedQaHistory;
//       });

//       setQuestion(''); // Clear the question input after submission
//     } catch (err) {
//       console.error('Error getting answer:', err);
//     } finally {
//       setIsLoading(false); // Set loading state to false after request completes
//     }
//   };

//   return (
//     <div className='App'>
//       <Navbar fileName={fileName} handleFileChange={handleFileChange} />
//       <div className="chat-section">
//         {qaHistory.map((qa, index) => (
//           <div key={index}>
//             <Question text={qa.question} />
//             {qa.answer && <Answer text={qa.answer} />}
//           </div>
//         ))}
//       </div>
//       <InputField
//         question={question}
//         handleQuestionChange={handleQuestionChange}
//         handleQuestionSubmit={handleQuestionSubmit}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import InputField from './Components/InputField';
import Question from './Components/Question';
import Answer from './Components/Answer';
import './App.css';

function App() {
  const [page, setPage] = useState([]);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState([]);

  useEffect(() => {
    axios.get('/api/home')
      .then((res) => {
        setPage(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      submitPdf(selectedFile);
    } else {
      setFileName('');
      setFile(null);
    }
  };

  const submitPdf = async (selectedFile) => {
    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    try {
      setIsLoading(true);
      const result = await axios.post('/api/home', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log('File uploaded successfully', result.data);
      setExtractedText(result.data.extractedText);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = async () => {
    try {
      setIsLoading(true);
      const questionsArray = question.split('?').map(q => q.trim()).filter(q => q.length > 0);
      setQaHistory(prevQaHistory => [...prevQaHistory, { question, answer: '' }]);

      const result = await axios.post('/api/query', { text: extractedText, questions: questionsArray });
      const responses = result.data.responses.map(resp => resp.answer).join('\n');

      setQaHistory(prevQaHistory => {
        const updatedQaHistory = [...prevQaHistory];
        updatedQaHistory[updatedQaHistory.length - 1].answer = responses;
        return updatedQaHistory;
      });

      setQuestion(''); // Clear the question input after submission
    } catch (err) {
      console.error('Error getting answer:', err);
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className='App'>
      <Navbar fileName={fileName} handleFileChange={handleFileChange} />
      <div className="chat-section">
        {qaHistory.map((qa, index) => (
          <div key={index}>
            <Question text={qa.question} />
            {qa.answer && <Answer text={qa.answer} />}
          </div>
        ))}
      </div>
      <InputField
        question={question}
        handleQuestionChange={handleQuestionChange}
        handleQuestionSubmit={handleQuestionSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
