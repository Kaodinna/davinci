"use client";

import Link from "next/link";
import { ChevronLeft, Download, Printer } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";

const MOCK_INVOICES: Record<string, {
  id: string;
  date: string;
  paymentMethod: string;
  customer: { name: string; email: string };
  shipTo: string;
  lineItems: { title: string; category: string; artist: string; qty: number; price: number }[];
  taxRate: number;
}> = {
  "ORD-2024-001": {
    id: "ORD-2024-001",
    date: "November 13, 2024",
    paymentMethod: "Credit Card",
    customer: { name: "Sarah Johnson", email: "sarah.j@email.com" },
    shipTo: "123 Main St, San Francisco, CA 94105",
    lineItems: [
      { title: "Sunset Dreams", category: "Original Painting", artist: "Emma Chen", qty: 1, price: 450 },
      { title: "Urban Reflection", category: "Original Painting", artist: "Marcus Thompson", qty: 1, price: 380 },
    ],
    taxRate: 0.08,
  },
  "ORD-2024-002": {
    id: "ORD-2024-002",
    date: "November 12, 2024",
    paymentMethod: "Credit Card",
    customer: { name: "Sarah Johnson", email: "sarah.j@email.com" },
    shipTo: "123 Main St, San Francisco, CA 94105",
    lineItems: [
      { title: "Ocean Whispers", category: "Original Painting", artist: "Sofia Rodriguez", qty: 2, price: 280 },
    ],
    taxRate: 0.08,
  },
  "ORD-2024-003": {
    id: "ORD-2024-003",
    date: "December 10, 2024",
    paymentMethod: "Credit Card",
    customer: { name: "Sarah Johnson", email: "sarah.j@email.com" },
    shipTo: "123 Main St, San Francisco, CA 94105",
    lineItems: [
      { title: "Mountain Majesty", category: "Original Painting", artist: "Emma Chen", qty: 1, price: 520 },
    ],
    taxRate: 0.08,
  },
};

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const invoice = MOCK_INVOICES[id];
  if (!invoice) notFound();

  const subtotal = invoice.lineItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen" style={{ background: "#faf9f7" }}>
      <div className="max-w-[860px] mx-auto px-4 py-10">

        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[14px] text-dv-muted mb-6 hover:text-dv-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border border-dv-accent text-dv-accent text-[13px] font-medium px-4 h-9 rounded-full hover:bg-dv-accent/5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border border-dv-accent text-dv-accent text-[13px] font-medium px-4 h-9 rounded-full hover:bg-dv-accent/5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Invoice
          </button>
        </div>

        {/* Invoice document */}
        <div className="bg-white border border-black/8 rounded-[20px] p-10 shadow-sm print:shadow-none print:border-none print:rounded-none">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-serif italic text-dv-accent text-[40px] leading-none mb-2">
                Invoice
              </h1>
              <p className="text-[14px] font-semibold text-dv-text">DaVinci Project by SHINKAIBI</p>
              <p className="text-[12px] text-dv-muted">
                Helping artists &amp; makers find hope &amp; purpose, one creation at a time
              </p>
            </div>
            {/* Invoice number badge */}
            <div
              className="rounded-[14px] px-5 py-3 text-right"
              style={{ background: "#fff7f0" }}
            >
              <p className="text-[11px] text-dv-muted mb-1">Invoice Number</p>
              <p className="font-serif italic text-dv-accent text-[18px] font-bold">{invoice.id}</p>
            </div>
          </div>

          {/* Date + payment row */}
          <div className="flex gap-12 mb-6 pb-6 border-b border-black/8">
            <div>
              <p className="text-[11px] font-medium text-dv-accent mb-1">Invoice Date</p>
              <p className="text-[14px] font-semibold text-dv-text">{invoice.date}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-dv-muted mb-1">Payment Method</p>
              <p className="text-[14px] text-dv-text">{invoice.paymentMethod}</p>
            </div>
          </div>

          {/* Bill to / Ship to */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-black/8 rounded-[12px] px-5 py-4">
              <p className="text-[11px] font-medium text-dv-muted mb-2">Bill To</p>
              <p className="text-[15px] font-semibold text-dv-text">{invoice.customer.name}</p>
              <p className="text-[13px] text-dv-muted">{invoice.customer.email}</p>
            </div>
            <div className="border border-black/8 rounded-[12px] px-5 py-4">
              <p className="text-[11px] font-medium text-dv-muted mb-2">Ship To</p>
              <p className="text-[14px] text-dv-text">{invoice.shipTo}</p>
            </div>
          </div>

          {/* Line items table */}
          <div className="rounded-[12px] overflow-hidden mb-6">
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_160px_80px_90px_90px] px-5 py-3 text-[12px] font-medium text-white"
              style={{ background: "linear-gradient(90deg, #ff8c42 0%, #ffad72 100%)" }}
            >
              <span>Item</span>
              <span>Artist</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {/* Rows */}
            {invoice.lineItems.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_160px_80px_90px_90px] px-5 py-4 border-b border-black/6 last:border-none"
              >
                <div>
                  <p className="text-[14px] font-semibold text-dv-text">{item.title}</p>
                  <p className="text-[12px] text-dv-accent">{item.category}</p>
                </div>
                <p className="text-[13px] text-dv-accent self-center">{item.artist}</p>
                <p className="text-[14px] text-dv-text text-center self-center">{item.qty}</p>
                <p className="text-[14px] text-dv-text text-right self-center">{fmt(item.price)}</p>
                <p className="text-[14px] text-dv-text text-right self-center font-medium">
                  {fmt(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end gap-2 mb-10">
            <div className="w-full max-w-[320px] flex flex-col gap-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-dv-muted">Subtotal</span>
                <span className="text-dv-text font-medium">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-dv-muted">Tax ({Math.round(invoice.taxRate * 100)}%)</span>
                <span className="text-dv-text font-medium">{fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-[16px] font-semibold pt-2 border-t border-black/8">
                <span className="text-dv-text">Total Amount</span>
                <span className="font-serif italic text-dv-accent text-[22px] font-bold">{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-black/8 pt-6 text-center">
            <p className="text-[13px] text-dv-muted">
              Thank you for supporting special-needs artists through DaVinci Project!
            </p>
            <p className="text-[12px] text-dv-muted/70 mt-1">
              Questions? Contact us at contact@davinciproject.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
