import { Handshake, LampDesk, Presentation, Search, Settings2, Wrench } from "lucide-react";

export default function HighlightBento() {
    return (
        <div className="w-[80%] p-6 flex items-center justify-center">
            <div className="grid max-w-7xl w-full grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4">

                {/* Resilience */}
                <Card
                    className="md:col-span-1 md:row-span-1 bg-red-600"
                    title="Developers & startups"
                    logo={<LampDesk size={45} color="white" />}
                />

                {/* Growth */}
                <Card
                    className="md:col-span-1 md:row-span-1 bg-emerald-700"
                    title="Small businesses"
                    logo={<Handshake size={45} color="white" />}
                />

                {/* Engagement (BIG right card) */}
                <Card
                    className="md:col-span-2 md:row-span-2 bg-amber-600"
                    title="HR & recruitment teams"
                    big
                    logo={<Search size={65} color="white" />}
                />

                {/* Visioning (BIG bottom-left) */}
                <Card
                    className="md:col-span-2 md:row-span-2 bg-pink-500"
                    title="Anyone who wants full email control"
                    big
                    logo={<Settings2 size={65} color="white" />}
                />

                {/* Goal Orientation */}
                <Card
                    className="md:col-span-1 md:row-span-1 bg-blue-600"
                    title="Training institutes & colleges"
                    logo={<Presentation size={45} color="white" />}
                />

                {/* Self-belief */}
                <Card
                    className="md:col-span-1 md:row-span-1 bg-violet-600"
                    title="Internal company tools"
                    logo={<Wrench size={45} color="white" />}
                />

            </div>
        </div>
    );
}

/* ---------------- CARD ---------------- */

function Card({
    title,
    logo,
    className,
    big = false,
}: {
    title: string;
    logo: React.ReactNode;
    className?: string;
    big?: boolean;
}) {
    return (
        <div
            className={`relative rounded-2xl p-5 text-white shadow-lg flex flex-col justify-center items-center overflow-hidden ${className}`}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="w-full text-center flex justify-center items-center">
                {logo}
            </div>
            {/* Content */}
            <div className="relative z-10 mt-6">
                <h3 className={`${big ? "text-3xl" : "text-xl"} text-center font-semibold`}>
                    {title}
                </h3>
            </div>
        </div>
    );
}
