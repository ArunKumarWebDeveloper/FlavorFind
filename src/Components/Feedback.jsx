import { useState } from "react";


const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleMail = () => {
    if (!feedback.trim()) {
      alert("Please enter feedback first!");
      return;
    }

    // Replace with your email
    const email = "arunlokesh78@gmail.com"; 
    const subject = "Customer Feedback on Food-Recipe";
    const body = encodeURIComponent(feedback);

    // Open default mail client
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div id="feedback" className="feedback-form">
      <div className="feed1">
        <h1>Feedback on Food-Recipe</h1>
      </div>
      <div className="feed2">
        <p>We’d love to hear what you think about the recipes!</p>
      </div>

      <div className="feedback-container">
        {/* Feedback input */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
        />

        {/* Button → opens default mail app */}
        <button onClick={handleMail}>Submit Feedback</button>
      </div>
    </div>
  );
};

export default Feedback;
