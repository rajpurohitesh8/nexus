import {
  Hexagon,
  Github,
  Twitter,
  Linkedin,
  ArrowUpCircle,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background pt-24 pb-12 relative overflow-hidden">
      {/* Top border with gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:pr-8">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Hexagon className="w-8 h-8 text-primary fill-primary/20" />
                <span className="font-display font-bold text-2xl tracking-widest text-white">
                  NEXUS
                </span>
              </div>
            </a>
            <p className="text-white/60 mb-8 leading-relaxed">
              Engineering digital masterpieces since 2011. We build the
              infrastructure for the next generation of industry leaders.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Web Applications",
                "Mobile Development",
                "UI/UX Design",
                "Cloud Architecture",
                "AI Integration",
                "Enterprise Software",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  Careers{" "}
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                    We're Hiring!
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">
              Contact
            </h4>
            <div className="space-y-4 mb-8">
              <a
                href="mailto:hello@nexus-agency.dev"
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                hello@nexus-agency.dev
              </a>
              <p className="text-white/60 text-sm">
                100 Innovation Drive
                <br />
                San Francisco, CA 94105
              </p>
            </div>
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full font-bold bg-primary text-white hover:bg-white hover:text-background transition-colors duration-300 glow-primary text-sm"
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Nexus Development Agency. All
            rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group"
          >
            Back to top
            <ArrowUpCircle className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
