import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context/Userprovider";

const VoiceWaveLines = ({ isRecording = false }) => {
  const [rotation, setRotation] = useState(0);
  // const {isRecording} = useContext(UserContext)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const generatePoints = (count, radius, variation, speedFactor, direction) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const variationAmount = isRecording
        ? Math.sin((rotation * 0.05 + i * 0.5) * speedFactor) * variation
        : 0;
      const currentRadius = radius + variationAmount;
      const x =
        Math.cos(angle * direction) * currentRadius; // Varying direction
      const y = Math.sin(angle * direction) * currentRadius;
      points.push([x, y]);
    }
    return points;
  };

  const renderWaveforms = () => {
    const waveforms = [];
    const radii = Array.from({ length: 10 }, (_, i) => 80 - i * 7); // Smaller radii for inner layers
    const variations = Array.from({ length: 10 }, (_, i) => 20 - i * 2); // Smaller variations for inner layers
    const speedFactors = Array.from({ length: 10 }, (_, i) => 1 + i * 0.1); // Different speeds for each line
    const directions = Array.from({ length: 10 }, (_, i) => (i % 2 === 0 ? 1 : -1)); // Alternate directions

    for (let i = 0; i < radii.length; i++) {
      const points = generatePoints(50, radii[i], variations[i], speedFactors[i], directions[i]);
      const pathData = points.reduce((path, point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${path} ${command} ${point[0]},${point[1]}`;
      }, "");
      const closedPath = `${pathData} Z`;

      waveforms.push(
        <path
          key={i}
          d={closedPath}
          fill="none"
          stroke="#ffffff" // White color for all wave lines
          strokeWidth={1.5 - i * 0.1} // Slightly thinner strokes for inner layers
          style={{
            filter: `blur(${0.5 + i * 0.1}px)`,
            opacity: 0.8 - i * 0.05,
            animation: `wave-${i} ${2 + i * 0.5}s infinite ease-in-out`,
          }}
        />
      );
    }
    return waveforms;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full ">
        <div className={`flex items-center justify-center ${isRecording ? "mt-0" : "mt-10"} bg-transparent w-[60%] h-[60%] md:h-full md:w-full`}>
          <svg viewBox="-100 -100 200 200" className="w-64 h-64">
            {renderWaveforms()}
          </svg>

          <style>
            {`
          ${Array.from({ length: 10 })
                .map(
                  (_, i) => `
                @keyframes wave-${i} {
                  0% { transform: rotate(0deg); }
                  50% { transform: rotate(${i % 2 === 0 ? "-" : ""}${10 + i * 2}deg); }
                  100% { transform: rotate(0deg); }
                }
              `
                )
                .join("")}
        `}
          </style>
        </div>
        <div className={`w-[70%] md:w-[60%] overflow-scroll h-[80px] md:h-[125px] text-center ${isRecording ? "flex" : "hidden"}`}>
          <h1>
           
            In the ever-evolving world of technology, the demand for software developers continues to grow at an unprecedented rate. From building intricate websites to creating powerful applications, the role of a software developer is multifaceted and dynamic. Whether coding in JavaScript, Python, C++, or Ruby, each language offers unique strengths and challenges that shape the way developers approach problem-solving.

            In recent years, the rise of modern web development frameworks like React, Angular, and Vue.js has revolutionized the way we build user interfaces. These frameworks allow developers to create fast, efficient, and highly interactive applications that run seamlessly across a variety of devices. React, for example, has become particularly popular due to its component-based architecture, which allows for the creation of reusable components that can be efficiently rendered and updated.

            On the backend, technologies like Node.js, Django, and Ruby on Rails continue to power the server-side of applications, enabling developers to create robust, scalable systems that can handle millions of requests per day. With the growth of cloud computing platforms like AWS, Azure, and Google Cloud, developers now have access to an array of tools and services that make it easier to deploy and maintain their applications in a secure and cost-effective manner.

            In addition to technical skills, modern software developers must also possess strong problem-solving abilities, critical thinking skills, and a willingness to continuously learn. The technology landscape is constantly shifting, with new frameworks, libraries, and tools emerging regularly. As such, developers must stay up-to-date with the latest trends and best practices to remain competitive in the job market.

            Moreover, the importance of collaboration and teamwork in software development cannot be overstated. Whether working in a large corporation or as part of a small startup, developers often work alongside designers, project managers, quality assurance testers, and other stakeholders to ensure that an application meets the needs of its users. Effective communication and the ability to work well in a team are essential skills for any successful developer.

            The future of software development is bright, with exciting advancements on the horizon. Artificial intelligence, machine learning, and blockchain are just a few of the emerging technologies that are poised to change the way we build and interact with software. As these technologies continue to mature, developers will be at the forefront of driving innovation and creating the next generation of software that will shape our world. like any changes.
          </h1>
        </div>
      </div>
    </>
  );
};

export default VoiceWaveLines;
