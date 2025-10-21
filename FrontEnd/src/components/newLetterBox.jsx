import React, { useState, useEffect, useRef } from "react";

function NewLetterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");

    // simulate async subscribe call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000); // auto-reset
    }, 900);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="newsletter-heading"
      className={`w-full flex items-center justify-center py-14 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ background: "linear-gradient(90deg,#190221,#091c45)" }} // preserves gradient-to-l visual
    >
      <div className="w-[92%] max-w-[980px] rounded-2xl p-8 md:p-10 bg-white/6 backdrop-blur-md border border-white/8 shadow-xl">
        <header className="text-center mb-6">
          <h2
            id="newsletter-heading"
            className="text-[22px] md:text-3xl font-semibold text-[#a5f6f3]"
          >
            Subscribe now & get <span className="text-white">20% off</span>
          </h2>
          <p className="mt-2 text-[13px] md:text-[15px] text-blue-100/90 max-w-[800px] mx-auto">
            Subscribe and enjoy exclusive savings, special deals, and early access to new collections.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-invalid={!!error}
            aria-describedby="newsletter-help"
            required
            className="w-full md:flex-1 max-w-[520px] h-12 px-4 rounded-xl placeholder:text-[#2b2b2b]
                       bg-white/90 text-black text-sm md:text-base outline-none
                       focus:ring-2 focus:ring-[#46d1f7] focus:ring-offset-1 transition"
          />

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className={`h-12 px-6 rounded-xl text-white font-medium flex items-center justify-center gap-3
                        bg-gradient-to-r from-[#2e6ecf] to-[#66b9ff] shadow-md transform transition
                        ${status === "sending" ? "opacity-80 cursor-wait" : "hover:scale-[1.03]"} 
                        ${status === "success" ? "opacity-60 cursor-default" : ""}`}
            aria-live="polite"
          >
            {status === "sending" ? "Subscribing..." : status === "success" ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>

        <div id="newsletter-help" className="mt-3 text-center">
          {error ? (
            <p className="text-sm text-rose-300">{error}</p>
          ) : status === "success" ? (
            <p className="text-sm text-emerald-200">Thanks! Check your inbox for the discount code.</p>
          ) : (
            <p className="text-sm text-blue-100/80">We’ll only send occasional updates — unsubscribe anytime.</p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <span className="w-[160px] h-[3px] rounded-full bg-gradient-to-r from-[#00ffff] to-transparent opacity-80" />
        </div>
      </div>
    </section>
  );
}

export default NewLetterBox;
