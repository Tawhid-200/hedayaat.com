import { ThemeSwitch } from "@/components/ui/AnimatedThemeToggler";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Button>Click me</Button>
      <ThemeSwitch />
    </div>
  );
}
