import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";


export default function Cards() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 p-4">
      <CardSpotlight
        radius={350}
        color="rgba(100, 100, 238, 0.3)"
        className="w-full max-w-md"
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-white mb-4">Hover Effect Test</h2>
          <p className="text-neutral-200">Move your mouse over this card to see the spotlight effect.</p>
          <ul className="mt-4 text-neutral-300 list-disc list-inside">
            <li>Enter your email address</li>
            <li>Create a strong password</li>
            <li>Set up two-factor authentication</li>
            <li>Verify your identity</li>
          </ul>
        </div>
      </CardSpotlight>
    </div>
  );
}
