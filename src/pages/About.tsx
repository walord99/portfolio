import "../css/About.css";

function About() {
  return (
    <div id="about">
      <div id="about_main">
        <h1>Hi I'm Benjamin Plante</h1>
        <h2 id="sub">
          a junior dev who wants to learn{" "}
          <span className="wide">everything</span>
        </h2>

        <h3>Aspirations</h3>
        <p>
          I strive to always be learning something, to embrace new challenges
          and hone my skills.
          <br />
          Whether through formal education, hands-on projects, or personal
          study,
          <br />
          I am committed to expanding my knowledge ever more.
          <br />
          It is my lifelong journey.
        </p>

        <h3>Knowledge</h3>
        <p>
          I have worked the most with C at 42 Quebec,
          <br />
          but I have also worked with Java, Python, C#, C++, Javascript and
          React on personal projects and at Cegep Ste-Foy.
          <br />
          This wide range of experiences allows me to get started on something
          new quickly.
          <br />
          For more examples check out my projects page and my github page.
        </p>

      </div>

      <div id="contacts">
        <h3>Links and Contacts</h3>
        <ul>
          <li><a href="https://www.linkedin.com/in/b-plante" target="_blank">Linkdin</a></li>
          <li><a href="https://github.com/walord99" target="_blank">Github</a></li>
          <li><a href="mailto: benplante99@gmail.com">Email</a></li>
          <li><a href="CV.pdf" target="_blank">Resume</a></li>
        </ul>
      </div>
    </div>
  );
}

export default About;
