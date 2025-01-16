//src/pages/ComingSoon.tsx
import React, { useState } from "react";
import Socials from '../components/ui/Socials';

const ComingSoon = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1328032309219168437/B-O6gWkavZmeEYM5Zv7kUO8Vi0zJL4316PA-gczliF981myhYxaUamQeeGyRp00t6Blg";
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `email: ${email}`,
        }),
      });
      setIsSubmitted(true);
      setEmail(""); // Clear the input after successful submission
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Animated background */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isHovered ? 0.8 : 0.6 }}
      />
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div
            className="max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple animate-neon-glow tracking-tight">
                Coming Soon
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-space-blue to-space-purple opacity-30 blur-xl -z-10" />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
              We are building the next evolution of AI agents. Stay tuned for
              updates and announcements. Token holders will be first to test the product demo.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-12 max-w-md mx-auto relative group"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 focus:border-space-purple text-white placeholder-gray-400 outline-none transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-space-blue to-space-purple rounded-full text-white font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
                >
                  Notify Me
                </button>
              </div>
              <div
                className={`absolute -bottom-12 left-0 right-0 text-center transition-all duration-300 ${
                  isSubmitted ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-green-400">
                  Thank you! We'll keep you updated.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Social links at bottom */}
      <div className="pb-6 z-10 px-4">
        <Socials className="max-w-6xl mx-auto" />
      </div>
    </div>
  );
};

export default ComingSoon;
