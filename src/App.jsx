import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Processing your request... Please wait a moment.");

    console.log("generateAnswer function called"); 
    try {
      const apiKey = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;
      console.log("API Key:", apiKey); 

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      console.log("Response data:", response.data); 

      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts[0] &&
        response.data.candidates[0].content.parts[0].text
      ) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer("Sorry - Unable to parse the response.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  if (showChat) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <form
            onSubmit={generateAnswer}
            className="text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
            style={{ borderRadius: "50px" }}
          >
          <div>
      <header className="header">
        <button
          className="b"
          onClick={() => setShowChat(false)}
        >
          Return to Profile
        </button>
      </header>
    </div>

            <div>
      <textarea
        required
        className="textarea"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything"
      ></textarea>
    </div>

            <button
              type="submit"
              className="askbutton" 
              disabled={generatingAnswer}
              style={{ minWidth: "100px" }} 
            >
              Submit Question
            </button>
          </form>

          <div className="text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
            <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
          </div>

          
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page h-full w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100 mt-20 " style={{ backgroundColor: '#f0f0f0' }}>
      <div className="profile-container text-center rounded-lg shadow-lg bg-white p-10 w-full h-full">
        <img src="src\kash.jpg" alt="Profile" className="profile-image-large" />
        <h1 className="items-center mb-15 mt-15">Kashish Verma</h1>
        <p className="paragraph ">Software Development Internship at Pluto.ai</p>
        <h3 className="about-header">About</h3>
        <div className="announcement">
    <p>Kashish Verma is a B.Tech student pursuing Computer Science and Engineering at the National Institute of Technology, Patna.
              In her ongoing academic journey, She have cultivated a strong foundation in Programming Languages, Tools, and Technologies 
              relevant to the role.</p>
    <p>Contact: +91-9793081160 | Email: kashishv.ug22.cs@nitp.ac.in</p>
  </div>
        <div className="accordionButton">
          <button
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close Details" : "Open Details"}
          </button>
          {isOpen && (
            <div className="accordion-content mt-4 text-left bg-white p-4 rounded shadow">
            
  <div className="education">
    <h2>Education</h2>
    <ul>
      <li>B.Tech from National Institute of Technology, Patna with a current CGPA of 8.86</li>
      <li>Senior Secondary education from CBSE Board in 2026 with 85.6%</li>
      <li>Secondary education from CBSE Board in 2021 with 94.5%</li>
    </ul>
  </div>
  <div className="projects">
    <h2>Projects</h2>
    <div className="project">
      <h3>SmartPing (Feb 2024)</h3>
      <ul>
        <li>Developed a personalized dashboard for the GDSC Solution Challenge using ReactJS, NodeJS, MongoDB, Gemini AI, and Weather API.</li>
        <li>Leveraged Gemini AI for personalized nutrition tips and exercise routines based on user profiles.</li>
        <li>Integrated weather APIs for weather forecasts and visualizations.</li>
        <li>Implemented a dynamic event calendar synced with Google Calendar and Outlook.</li>
      </ul>
    </div>
    <div className="project">
      <h3>EarlyVision (Apr 2024)</h3>
      <ul>
        <li>Developed a web app using machine learning to detect visual cancers early.</li>
        <li>Used TensorFlow, Keras, ReactJS, NodeJS, Flask, MongoDB.</li>
        <li>Analyzed visual images for cancer prediction and created a user-friendly interface.</li>
      </ul>
    </div>
    <div className="project">
      <h3>CRUD Application (Nov 2023)</h3>
      <ul>
        <li>Developed a user-friendly application for basic dataset operations using HTML5, CSS3, ReactJs, NodeJs, and MongoDB.</li>
      </ul>
    </div>
  </div>
  <div className="skills">
    <h2>Skills & Interests</h2>
    <ul>
      <li>Proficient in languages such as C, C++, Java, Python, and JavaScript.</li>
      <li>Experienced in data analysis tools like Power BI, Python, SQL, and web development technologies.</li>
      <li>Skills in databases (SQL, MongoDB), frameworks (Numpy, Pandas, NLTK), and tools like Git and Visual Studio Code.</li>
    </ul>
  </div>
  <div className="responsibilities">
    <h2>Positions of Responsibility</h2>
    <ul>
      <li>Web Team Member at Google Developer Student Club, NITP (2023-2024), involved in website development and project management.</li>
    </ul>
  </div>
  <div className="achievements">
    <h2>Achievements</h2>
    <ul>
      <li>Finalist in PitchTember 2023 for showcasing innovative ideas.</li>
      <li>Participant in GDSC Solution Challenge Hackathon at the regional level.</li>
    </ul>
  </div>
  <div className="certifications">
    <h2>Certifications</h2>
    <ul>
      <li>Google Cloud: Introduction to Generative AI</li>
      <li>Simplilearn: Introduction to Cloud Computing</li>
    </ul>
  </div>
  <div className="announcement">
    <p className="announcement-text">
      In addition to this, Kashish has been selected for the Software Development intern at Prodigy InfoTech!
    </p>
  </div>
            </div>
          )}
        </div>

        <button
      className="chatbutton"
      onClick={() => setShowChat(true)}
    >
      Start Talking
    </button>

      </div>
    </div>
  );
}

export default App;

