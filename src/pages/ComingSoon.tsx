import React, { useState } from "react";

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

  const socialLinks = [
    {
      name: "DEXScreener",
      url: "https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2",
      icon: "📊",
    },
    {
      name: "DAO",
      url: "https://app.realms.today/dao/9C4iKuh92M45gSCRmDCSBYsdieK8TwiTvjFQohz8iMH9",
      icon: "🏛️",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/nova_dova_dao?s=21&t=ZbFHk49cdIpDiDCtajTlug",
      icon: "𝕏",
    },
    {
      name: "Telegram",
      url: "https://t.me/+WsS1KasVMPhjYTcx",
      icon: "📱",
    },
    {
      name: "Discord",
      url: "https://discord.gg/GPt44bGqqR",
      icon: "💬",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isHovered ? 0.8 : 0.6 }}
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Main content */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Logo or title */}
          <div className="relative mb-8">
            <h1
              className="text-6xl md:text-8xl font-bold text-transparent 
                        bg-clip-text bg-gradient-to-r from-space-blue to-space-purple 
                        animate-neon-glow tracking-tight"
            >
              Coming Soon
            </h1>
            <div
              className="absolute -inset-1 bg-gradient-to-r from-space-blue to-space-purple 
                          opacity-30 blur-xl -z-10"
            />
          </div>

          {/* Description */}
          <p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto 
                     leading-relaxed tracking-wide"
          >
            We are building the next evolution of AI agents. Stay tuned for
            updates and announcements. Token holders will be first to test the product demo.
          </p>

          {/* CA Display */}
          <div className="mt-8 mb-12">
            <a
              href="https://raydium.io/swap/?inputMint=sol&outputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <button className="neon-button text-white bg-gradient-to-r from-space-blue to-space-purple hover:from-space-purple hover:to-space-blue py-3 px-8 rounded-full text-lg sm:text-xl md:text-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden">
                <span className="relative z-10">raydium</span>
                <div className="absolute inset-0 bg-gradient-to-r from-space-purple to-space-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </a>
          </div>

          {/* Email subscription form */}
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
                className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm 
                        rounded-full border border-gray-800 focus:border-space-purple 
                        text-white placeholder-gray-400 outline-none transition-all 
                        duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                        px-6 py-2 bg-gradient-to-r from-space-blue to-space-purple 
                        rounded-full text-white font-medium transition-all duration-300 
                        hover:opacity-90 hover:scale-105"
              >
                Notify Me
              </button>
            </div>

            {/* Success message */}
            <div
              className={`absolute -bottom-12 left-0 right-0 text-center 
                       transition-all duration-300 ${
                         isSubmitted ? "opacity-100" : "opacity-0"
                       }`}
            >
              <span className="text-green-400">
                Thank you! We'll keep you updated.
              </span>
            </div>
          </form>

          {/* Social links */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-5 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-4 
                        text-gray-400 hover:text-white bg-gray-900/30 
                        backdrop-blur-sm rounded-xl border border-gray-800 
                        hover:border-space-purple transition-all duration-300 
                        transform hover:scale-105"
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
