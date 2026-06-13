import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import BanTexts from "@/pages/ban-texts";
import Recovery from "@/pages/recovery";
import RecoveryScripts from "@/pages/recovery-scripts";
import Stats from "@/pages/stats";
import NotFound from "@/pages/not-found";

function App() {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }
  return (
    <TooltipProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ban-texts" component={BanTexts} />
        <Route path="/recovery" component={Recovery} />
        <Route path="/recovery-scripts" component={RecoveryScripts} />
        <Route path="/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
