import { Zap } from "lucide-react";

export default function AppLogo() {
    return (
        <div className="flex items-center gap-1 text-blue-600">
            <Zap size={25} />
            <span className="font-semibold text-3xl">Power Platfom</span>
        </div>
    );
}
