"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, Heart, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section
        className="py-20 text-center"
        style={{
          background:
            "linear-gradient(180deg, #f7f2eb 0%, #fdf9f5 60%, #ffffff 100%)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col items-center gap-4">
          <h1
            className="font-serif italic text-[48px] sm:text-[56px] leading-tight"
            style={{
              background:
                "linear-gradient(90deg, #ff8c42 0%, #2a9d8f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get In Touch
          </h1>
          <p className="text-[17px] text-dv-muted max-w-[480px] leading-relaxed">
            We&apos;d love to hear from you! Whether you have questions, want
            to collaborate, or just want to say hello.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">

            {/* ── LEFT: Contact info ── */}
            <div>
              <h2 className="text-[22px] font-bold text-dv-text mb-2">
                Contact Information
              </h2>
              <p className="text-[14px] text-dv-muted mb-6 leading-relaxed">
                Reach out to us through any of these channels. We&apos;re here
                to help!
              </p>

              <div className="flex flex-col gap-4">
                {/* Email */}
                <div
                  className="flex items-center gap-4 rounded-[16px] px-5 py-4"
                  style={{ background: "#fff0eb" }}
                >
                  <div className="w-11 h-11 rounded-full bg-dv-accent/15 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-dv-accent" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-dv-text">Email Us</p>
                    <p className="text-[13px] text-dv-muted">hello@davinciproject.org</p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className="flex items-center gap-4 rounded-[16px] px-5 py-4"
                  style={{ background: "#e8f5f3" }}
                >
                  <div className="w-11 h-11 rounded-full bg-[#2a9d8f]/15 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#2a9d8f]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-dv-text">Call Us</p>
                    <p className="text-[13px] text-dv-muted">(123) 456-7890</p>
                  </div>
                </div>

                {/* Quote */}
                <div
                  className="flex items-start gap-4 rounded-[16px] px-5 py-4"
                  style={{ background: "#fff7f0" }}
                >
                  <div className="w-11 h-11 rounded-full bg-dv-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-5 h-5 text-dv-accent" fill="#ff8c42" />
                  </div>
                  <p className="text-[13px] text-dv-muted italic leading-relaxed">
                    &ldquo;Helping artists &amp; makers find hope &amp; purpose,
                    one creation at a time.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form + CTA ── */}
            <div className="flex flex-col gap-5">

              {/* Contact form card */}
              <div className="bg-white border border-black/8 rounded-[20px] p-8 shadow-sm">
                <h2 className="text-[22px] font-bold text-dv-text mb-6">
                  Send Us a Message
                </h2>

                {sent ? (
                  <div className="flex flex-col items-center text-center gap-4 py-8">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <Send className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-[18px] font-semibold text-dv-text">Message Sent!</h3>
                    <p className="text-[14px] text-dv-muted max-w-[320px] leading-relaxed">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24–48 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                      className="text-[14px] text-dv-accent hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-dv-text">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="border border-black/12 rounded-[10px] px-3 h-11 text-[14px] text-dv-text placeholder:text-dv-muted bg-[#f7f7f8] outline-none focus:border-dv-accent focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-dv-text">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="border border-black/12 rounded-[10px] px-3 h-11 text-[14px] text-dv-text placeholder:text-dv-muted bg-[#f7f7f8] outline-none focus:border-dv-accent focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-dv-text">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(123) 456-7890"
                        className="border border-black/12 rounded-[10px] px-3 h-11 text-[14px] text-dv-text placeholder:text-dv-muted bg-[#f7f7f8] outline-none focus:border-dv-accent focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-dv-text">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={4}
                        className="border border-black/12 rounded-[10px] px-3 py-2.5 text-[14px] text-dv-text placeholder:text-dv-muted bg-[#f7f7f8] outline-none focus:border-dv-accent focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {/* Submit row */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <button
                        type="submit"
                        className="h-11 px-7 rounded-full bg-dv-accent text-white text-[14px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        Send Message
                        <Send className="w-4 h-4" />
                      </button>
                      <p className="text-[13px] text-dv-muted">
                        We typically respond within 24–48 hours
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Become an artist CTA */}
              <div
                className="rounded-[16px] px-7 py-6 flex flex-col gap-3"
                style={{ background: "#fff7f0" }}
              >
                <p className="text-[15px] font-semibold text-dv-text">
                  Looking to become an artist with us?
                </p>
                <p className="text-[14px] text-dv-muted leading-relaxed">
                  We&apos;re always excited to welcome new artists to the DaVinci
                  Project family. Check out our About Us page to learn more about
                  our mission and how we support our artists.
                </p>
                <Link
                  href="/about"
                  className="self-start text-[13px] font-medium text-dv-accent border border-dv-accent px-5 h-9 rounded-full flex items-center hover:bg-dv-accent hover:text-white transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
