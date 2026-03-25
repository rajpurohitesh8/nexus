import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactFormSchema, useContactSubmission } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const mutation = useContactSubmission();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      budget: "not-sure",
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Message Sent Successfully",
            description: "We'll be in touch within 24 hours.",
          });
          form.reset();
        },
        onError: (error) => {
          toast({
            title: "Submission Failed",
            description: error.message || "Please try again later.",
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <section id="contact" className="py-32 relative bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Let's Build The <br />
              <span className="text-primary">Future.</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Whether you need a revolutionary web application or a complete
              digital transformation, our engineers are ready to execute your
              vision.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-2">
                  Email
                </h4>
                <a
                  href="mailto:hello@nexus-agency.dev"
                  className="text-2xl text-white hover:text-primary transition-colors"
                >
                  hello@nexus-agency.dev
                </a>
              </div>
              <div>
                <h4 className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-2">
                  Location
                </h4>
                <p className="text-xl text-white">
                  100 Innovation Drive
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Full Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />

                  {form.formState.errors.name && (
                    <p className="text-red-400 text-xs">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Email Address
                  </label>
                  <input
                    {...form.register("email")}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />

                  {form.formState.errors.email && (
                    <p className="text-red-400 text-xs">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Company (Optional)
                </label>
                <input
                  {...form.register("company")}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your Company Ltd."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Project Budget
                </label>
                <select
                  {...form.register("budget")}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                >
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-plus">$100,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Project Details
                </label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us about your goals..."
                />

                {form.formState.errors.message && (
                  <p className="text-red-400 text-xs">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 rounded-xl font-bold bg-primary text-white glow-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    Processing <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
