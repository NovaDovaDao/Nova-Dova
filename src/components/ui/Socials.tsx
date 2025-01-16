import React from 'react';

export const socialLinks = [
  {
    name: "Raydium",
    url: "https://raydium.io/swap/?inputMint=sol&outputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump",
    icon: "💫",
  },
  {
    name: "DEX",
    url: "https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2",
    icon: "📊",
  },
  {
    name: "DAO",
    url: "https://app.realms.today/dao/9C4iKuh92M45gSCRmDCSBYsdieK8TwiTvjFQohz8iMH9",
    icon: "🏛️",
  },
  {
    name: "",
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

interface SocialsProps {
  className?: string;
}

const Socials: React.FC<SocialsProps> = ({ className = "" }) => {
  return (
    <div className={`grid grid-cols-3 md:grid-cols-6 gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <button className="w-full neon-button text-white bg-gradient-to-r from-space-blue to-space-purple 
                           hover:from-space-purple hover:to-space-blue py-2 px-3 rounded-full 
                           text-xs sm:text-sm transform transition-all duration-300 
                           hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 
                           relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-1">
              <span className="text-sm sm:text-base">{link.icon}</span>
              <span>{link.name}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-space-purple to-space-blue 
                          opacity-0 group-hover:opacity-20 transition-opacity duration-300">
            </div>
          </button>
        </a>
      ))}
    </div>
  );
};

export default Socials;
