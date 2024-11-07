import { Send } from "lucide-react";

export default function WhatsAppFloat({
  phoneNumber = "919975551431",
  message = "Hello! I have a question.",
}) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-0 right-4 z-50 bg-[#2aff6a]">
      <button
        onClick={handleClick}
        className="bg-[#2aff6a] hover:bg-green-600 text-black rounded-full px-8 py-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center space-x-2"
        aria-label="Chat on WhatsApp"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
