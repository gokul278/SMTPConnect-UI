import React from "react";

const HoverCard: React.FC = () => {
    return (
        <div
            className="
        relative flex items-center justify-center
        w-[80%] p-9
        rounded-3xl
        overflow-hidden
        leading-[1.6]
        border border-[#999]
        transition-all duration-480
        hover:bg-[#ececec]
         cursor-pointer
      "
        >
            {/* Content */}
            <div
                className="
          relative z-10
          flex flex-col items-start gap-6
          text-black
          transition-all duration-480
          ease-[cubic-bezier(0.23,1,0.32,1)]
        "
            >
                <p
                    className="
             text-3xl font-bold leading-[1.3]
            transition-all duration-480
            ease-[cubic-bezier(0.23,1,0.32,1)]
            group-hover:text-white
          "
                >
                    What is SMTP Connect?
                </p>

                <p
                    className="
            text-[18px] opacity-80
            transition-all duration-480
            ease-[cubic-bezier(0.23,1,0.32,1)]
            group-hover:text-white
          "
                >
                    SMTP Connect is a lightweight email automation platform that allows you to create dynamic email templates and send personalized emails to multiple recipients using your own email server.
                    <br />
                    <br />
                    Whether you’re a developer, business, or organization — SMTP Connect gives you full ownership of your email communication.
                </p>
            </div>
        </div>
    );
};

export default HoverCard;
