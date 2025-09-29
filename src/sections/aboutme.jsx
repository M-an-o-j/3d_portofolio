import React from 'react'
import plane from '../assets/images/plane.png'

const Aboutme = () => {
    const content = [
        "Hi, I'm Manoj — a developer with a unique journey that started in the commerce stream but grew into a deep passion for technology. My spark for science and computers truly ignited when I watched Iron Man. While Tony Stark may be a fictional character, his creativity, problem-solving, and futuristic vision inspired me to explore the limitless possibilities of tech. From revisiting old science books to experimenting with coding, I gradually dove into web development, machine learning, computer vision, and artificial intelligence, each step fueling my curiosity and pushing me further into the world of innovation.",
        "Today, I blend creativity with technical expertise to build projects that are both functional and impactful. My skills include Software Engineering, Full Stack Development, Python, FastAPI, Microservices, React.js, Blockchain, LLMs, LangChain, AWS, and Arduino/IoT. This portfolio itself — built with React.js and TailwindCSS — is a small reflection of my journey, passion, and commitment to continuous learning. Outside of coding, I'm a movie buff, inspired by stories and characters like Tony Stark, who remind us that technology is not just about machines but about creating meaningful impact."
    ]

    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* Flying Plane */}
            <div className="absolute top-1/3 -right-0 w-20 h-20 animate-flight z-0">
                <img src={plane} alt="" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 transform hover:scale-105 transition-transform duration-300">
                        <div className="inline-block mb-4">
                            <h1 className="text-4xl font-knewave md:text-6xl lg:text-7xl text-slate-200  drop-shadow-lg">
                                Who Am I?
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8 mb-16 transform hover:scale-[1.02]  hover:shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl hover:bg-white/10 transition-all duration-300 relative">
                        {content.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                                }}
                            >
                                <p className="text-lg md:text-xl font-permanent_marker leading-relaxed text-gray-200 font-light">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tailwind custom animation */}
            <style>
                {`
                    @keyframes flight {
                        0% { transform: translateX(0) translateY(50) rotate(30deg); opacity: 0; }
                        10% { opacity: 1; }
                        50% { transform: translateX(-60vw) translateY(-50px) rotate(-10deg); }
                        100% { transform: translateX(-120vw) translateY(-100px) rotate(10deg); opacity: 0; }
                    }
                    .animate-flight {
                        animation: flight 20s linear infinite;
                    }
                    `}
            </style>
        </div>
    )
}

export default Aboutme
