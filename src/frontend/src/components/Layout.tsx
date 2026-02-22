import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SiX, SiGithub } from 'react-icons/si';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-coral blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <Sparkles className="h-6 w-6 text-coral relative" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
              Nexus Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-coral"
              activeProps={{ className: 'text-coral' }}
            >
              Home
            </Link>
            <Link
              to="/content"
              className="text-sm font-medium transition-colors hover:text-teal"
              activeProps={{ className: 'text-teal' }}
            >
              Content Manager
            </Link>
            <Button
              onClick={() => navigate({ to: '/content' })}
              className="bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-sm font-medium transition-colors hover:text-coral"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/content"
                className="block py-2 text-sm font-medium transition-colors hover:text-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                Content Manager
              </Link>
              <Button
                onClick={() => {
                  navigate({ to: '/content' });
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-coral" />
                <span className="font-bold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                  Nexus Portal
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                A fresh, modern platform for content management and collaboration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-coral transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/content" className="text-muted-foreground hover:text-teal transition-colors">
                    Content Manager
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-coral transition-colors"
                  aria-label="Twitter"
                >
                  <SiX className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-teal transition-colors"
                  aria-label="GitHub"
                >
                  <SiGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Nexus Portal. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'nexus-portal'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
