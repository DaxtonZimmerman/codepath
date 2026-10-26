import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Shell } from '@/components/shell';
import Dashboard from '@/pages/dashboard';
import PathPage from '@/pages/path';
import LessonPage from '@/pages/lesson';
import Practice from '@/pages/practice';
import Projects from '@/pages/projects';
import ProgressPage from '@/pages/progress';
import Assessment from '@/pages/assessment';
import Settings from '@/pages/settings';
import Build from '@/pages/build';
import Studio from '@/pages/studio';

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/learn" component={PathPage} />
          <Route path="/path" component={PathPage} />
          <Route path="/build" component={Build} />
          <Route path="/build/:id" component={Studio} />
          <Route path="/lesson/:id" component={LessonPage} />
          <Route path="/practice" component={Practice} />
          <Route path="/projects" component={Projects} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/assessment" component={Assessment} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Shell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
