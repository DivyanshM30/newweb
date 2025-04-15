import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="container" style={{ backgroundImage: "url(/BG1.JPG)" }}>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Tahoma, Verdana, sans-serif;
          }
          .hero {
            height: 100vh;
            display: flex;
            justify-content: center;
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8));
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            padding: 3rem;
          }
          .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
          }
          .hero p {
            font-size: 1.2rem;
            margin-bottom: 3rem;
          }
          .user-cards {
            display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 2rem;
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            flex-wrap: wrap;
          }
          .card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            width: 300px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.3);
          }
          .card.student {
            border-top: 5px solid dodgerblue;
          }
          .card.educator {
            border-top: 5px solid mediumseagreen;
          }
          .card.employer {
            border-top: 5px solid red;
          }
          .card h3 {
            margin-bottom: 1rem;
            color: midnightblue;
            font-size: 1.5rem;
          }
          .card p {
            color: gray;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            line-height: 1.5;
          }
          .btn {
            display: inline-block;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: transform 0.3s ease;
          }
          .btn:hover {
            transform: scale(1.05);
          }
          .btn.student {
            background: dodgerblue;
          }
          .btn.educator {
            background: mediumseagreen;
          }
          .btn.employer {
            background: red;
          }
          .footer {
            color: white;
            padding: 1rem;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
          }
          .footer a:link {
            color: white;
          }
          .footer a:visited {
            color: yellow;
          }
          .footer a:hover {
            color: brown;
          }
          .footer a:active {
            color: red;
          }
        `}
      </style>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EduConnect: Where Learning Meets Opportunity</h1>
          <h4>Choose your role to get started</h4>
        </div>
        <div className="user-cards">
          <div className="card student">
            <h3>Students</h3>
            <p>Start your learning journey with interactive courses, assessments, and personalized tracking.</p>
            <Link to="/student-login" className="btn student">Join as Student</Link>
          </div>
          <div className="card educator">
            <h3>Educators</h3>
            <p>Share your knowledge, create courses, and guide the next generation of learners.</p>
            <a href="/educator/educator_login.html" className="btn educator">Join as Educator</a>
          </div>
          <div className="card employer">
            <h3>Employers</h3>
            <p>Find talented individuals, offer certifications, and create job opportunities.</p>
            <a href="/employer/employer_login.html" className="btn employer">Join as Employer</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Connect With Us:-</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/vedant-agrawal-626118290/?originalSubdomain=in">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
