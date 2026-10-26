import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="py-20 rise">
      <p className="font-mono text-primary text-sm">404 · undefined is not a page</p>
      <h1 className="font-display text-5xl font-extrabold mt-3">This path does not exist.</h1>
      <p className="mt-3 text-muted-foreground">Nothing is lost. Your progress is right where you left it.</p>
      <Link href="/" className="press mt-8 inline-flex rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold" data-testid="link-home">Back to today</Link>
    </div>
  );
}
