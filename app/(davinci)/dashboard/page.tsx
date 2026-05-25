"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Clock,
  Users,
  FileText,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { useState } from "react";
import { EVENTS } from "@/lib/mock-data";

const MOCK_USER = {
  name: "Sarah Johnson",
  email: "sarah.j@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, San Francisco, CA 94105",
};

const MOCK_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "November 13, 2024",
    status: "Delivered",
    lineItems: [
      { title: "Sunset Dreams", artist: "Emma Chen", qty: 1, price: 450 },
      { title: "Urban Reflection", artist: "Marcus Thompson", qty: 1, price: 380 },
    ],
    total: 830,
  },
  {
    id: "ORD-2024-002",
    date: "November 12, 2024",
    status: "Shipped",
    lineItems: [
      { title: "Ocean Whispers", artist: "Sofia Rodriguez", qty: 2, price: 560 },
    ],
    total: 560,
  },
  {
    id: "ORD-2024-003",
    date: "December 10, 2024",
    status: "Processing",
    lineItems: [
      { title: "Mountain Majesty", artist: "Emma Chen", qty: 1, price: 520 },
    ],
    total: 520,
  },
];

const REGISTERED_EVENT_IDS = ["spring-art-exhibition-2025", "watercolor-workshop-emma"];

const MY_REGISTRATIONS = [
  {
    eventId: "spring-art-exhibition-2025",
    attendeeCount: 2,
    registeredOn: "December 20, 2024",
    dietaryRestrictions: "Vegetarian" as string | null,
  },
  {
    eventId: "watercolor-workshop-emma",
    attendeeCount: 1,
    registeredOn: "December 18, 2024",
    dietaryRestrictions: null as string | null,
  },
];

function statusStyle(status: string) {
  if (status === "Delivered") return "bg-green-100 text-green-700";
  if (status === "Shipped") return "bg-purple-100 text-purple-700";
  return "bg-yellow-100 text-yellow-700";
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "events">("orders");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const myEvents = REGISTERED_EVENT_IDS
    .map((eid) => {
      const event = EVENTS.find((e) => e.id === eid);
      const reg = MY_REGISTRATIONS.find((r) => r.eventId === eid);
      return event && reg ? { ...event, ...reg } : null;
    })
    .filter(Boolean) as (typeof EVENTS[0] & typeof MY_REGISTRATIONS[0])[];

  const upcomingCount = myEvents.filter((e) => e.status === "Upcoming").length;
  const pastCount = myEvents.filter((e) => e.status === "Past").length;

  const filteredEvents =
    eventFilter === "Upcoming"
      ? myEvents.filter((e) => e.status === "Upcoming")
      : eventFilter === "Past"
      ? myEvents.filter((e) => e.status === "Past")
      : myEvents;

  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);
  const deliveredCount = MOCK_ORDERS.filter((o) => o.status === "Delivered").length;
  const inProgressCount = MOCK_ORDERS.filter((o) => o.status !== "Delivered").length;

  return (
    <>
    <div className="min-h-screen" style={{ background: "#faf9f7" }}>
      <div className="max-w-[1280px] mx-auto px-4 py-10">

        {/* Page heading */}
        <h1 className="font-serif italic text-dv-accent text-[36px] leading-tight mb-1">
          My Dashboard
        </h1>
        <p className="text-[15px] text-dv-muted mb-8">
          Manage your orders and account information
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <div className="flex flex-col gap-5">

            {/* Profile card */}
            <div className="rounded-[20px] overflow-hidden border border-black/8 shadow-sm bg-white">
              {/* Orange top */}
              <div
                className="flex flex-col items-center py-8 gap-3"
                style={{ background: "linear-gradient(135deg, #ff8c42 0%, #ffad72 100%)" }}
              >
                <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="font-serif italic text-white text-[20px] leading-tight">
                  {MOCK_USER.name}
                </p>
              </div>

              {/* Contact info */}
              <div className="px-5 py-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-dv-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-dv-muted uppercase tracking-wide">Email</p>
                    <p className="text-[13px] text-dv-text">{MOCK_USER.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-dv-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-dv-muted uppercase tracking-wide">Phone</p>
                    <p className="text-[13px] text-dv-text">{MOCK_USER.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-dv-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-dv-muted uppercase tracking-wide">Address</p>
                    <p className="text-[13px] text-dv-text">{MOCK_USER.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div
              className="rounded-[20px] px-5 py-5 border border-black/8 shadow-sm"
              style={{ background: "#fff7f0" }}
            >
              <p className="font-serif italic text-dv-accent text-[16px] mb-4">
                Order Statistics
              </p>
              <div className="flex flex-col gap-0">
                <div className="flex items-center justify-between py-2.5 border-b border-black/8">
                  <span className="text-[14px] text-dv-muted">Total Orders</span>
                  <span className="text-[14px] font-semibold text-dv-text">{MOCK_ORDERS.length}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-black/8">
                  <span className="text-[14px] text-dv-muted">Delivered</span>
                  <span className="text-[14px] font-semibold text-green-600">{deliveredCount}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-black/8">
                  <span className="text-[14px] text-dv-muted">In Progress</span>
                  <span className="text-[14px] font-semibold text-dv-accent">{inProgressCount}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[14px] font-medium text-dv-text">Total Spent</span>
                  <span className="font-serif italic text-dv-accent text-[18px] font-bold">
                    {fmt(totalSpent)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex flex-col gap-6">

            {/* Tab switcher */}
            <div className="bg-white border border-black/10 rounded-full p-1 inline-flex self-start shadow-sm">
              <button
                onClick={() => setActiveTab("orders")}
                className={`inline-flex items-center gap-2 px-5 h-10 rounded-full text-[14px] font-medium transition-all ${
                  activeTab === "orders"
                    ? "bg-dv-accent text-white shadow-sm"
                    : "text-dv-text hover:text-dv-accent"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Orders &amp; Invoices
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`inline-flex items-center gap-2 px-5 h-10 rounded-full text-[14px] font-medium transition-all ${
                  activeTab === "events"
                    ? "bg-dv-accent text-white shadow-sm"
                    : "text-dv-text hover:text-dv-accent"
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                My Events
              </button>
            </div>

            {/* ── ORDERS TAB ── */}
            {activeTab === "orders" && (
              <div className="bg-white border border-black/8 rounded-[20px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5 text-dv-accent" />
                  <h2 className="font-serif italic text-dv-accent text-[24px]">
                    My Orders &amp; Invoices
                  </h2>
                </div>
                <p className="text-[13px] text-dv-muted mb-6">
                  View your order history and download invoices
                </p>

                <div className="flex flex-col gap-4">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="border border-black/8 rounded-[16px] p-5"
                    >
                      {/* Order header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-[14px] font-semibold text-dv-text">{order.id}</p>
                          <p className="text-[12px] text-dv-muted">{order.date}</p>
                        </div>
                        <span
                          className={`text-[12px] font-medium px-3 py-1 rounded-full shrink-0 ${statusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Line items */}
                      <div className="flex flex-col gap-1.5 mb-4">
                        {order.lineItems.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-[13px]">
                            <span className="text-dv-muted">
                              {item.title} by {item.artist} (x{item.qty})
                            </span>
                            <span className="text-dv-text font-medium">
                              {fmt(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total + invoice button */}
                      <div className="border-t border-black/8 pt-3 flex items-center justify-between">
                        <div>
                          <p className="text-[12px] text-dv-muted mb-0.5">Total Amount</p>
                          <p className="font-serif italic text-dv-accent text-[18px] font-bold">
                            {fmt(order.total)}
                          </p>
                        </div>
                        <Link
                          href={`/invoice/${order.id}`}
                          className="inline-flex items-center gap-2 bg-dv-accent text-white text-[13px] font-medium px-4 h-9 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Invoice
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── EVENTS TAB ── */}
            {activeTab === "events" && (
              <div className="bg-white border border-black/8 rounded-[20px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="w-5 h-5 text-dv-accent" />
                  <h2 className="font-serif italic text-dv-accent text-[24px]">
                    My Event Registrations
                  </h2>
                </div>
                <p className="text-[13px] text-dv-muted mb-6">
                  View and manage your registered events
                </p>

                {/* Stats mini-cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Total Registrations", value: myEvents.length },
                    { label: "Upcoming Events", value: upcomingCount },
                    { label: "Past Events", value: pastCount },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="border border-black/8 rounded-[14px] px-4 py-3"
                    >
                      <p className="text-[11px] text-dv-muted mb-1">{label}</p>
                      <p className="font-serif italic text-dv-accent text-[24px] font-bold leading-none">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {[
                    { key: "All Events", label: "All Events" },
                    { key: "Upcoming", label: `Upcoming (${upcomingCount})` },
                    { key: "Past", label: `Past (${pastCount})` },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setEventFilter(key)}
                      className={`text-[13px] font-medium px-4 h-8 rounded-full border transition-colors ${
                        eventFilter === key
                          ? "bg-dv-accent text-white border-dv-accent"
                          : "border-black/15 text-dv-text hover:border-dv-accent hover:text-dv-accent"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Event cards — 2-col grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredEvents.map((event) => {
                    const reg = MY_REGISTRATIONS.find((r) => r.eventId === event.id)!;
                    return (
                      <div
                        key={event.id}
                        className="border border-black/8 rounded-[16px] overflow-hidden flex flex-col"
                      >
                        {/* Event image with overlay */}
                        <div className="relative h-[160px] w-full">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          {/* Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                            <span className="text-[11px] font-medium bg-dv-accent text-white px-2.5 py-0.5 rounded-full">
                              {event.category}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                                event.status === "Upcoming"
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-500 text-white"
                              }`}
                            >
                              {event.status}
                            </span>
                          </div>
                          {/* Title overlay */}
                          <p className="absolute bottom-3 left-4 right-4 font-serif text-white text-[15px] font-semibold leading-snug">
                            {event.title}
                          </p>
                        </div>

                        {/* Card body */}
                        <div className="p-4 flex flex-col gap-2 flex-1">
                          <div className="flex flex-col gap-1.5 text-[12px] text-dv-muted">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                              {event.isoDate}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                              {reg.attendeeCount} attendee{reg.attendeeCount > 1 ? "s" : ""}
                            </span>
                          </div>
                          <p className="text-[11px] text-dv-muted/70 mt-1">
                            Registered on {reg.registeredOn}
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-auto pt-2">
                            <button
                              onClick={() => setSelectedEventId(event.id)}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-black/15 rounded-full h-8 text-[12px] text-dv-text hover:border-dv-accent hover:text-dv-accent transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View Details
                            </button>
                            <button
                              className="w-8 h-8 rounded-full border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                              aria-label="Cancel registration"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredEvents.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-[14px] text-dv-muted border border-black/8 rounded-[16px]">
                      No events in this category.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* ── REGISTRATION DETAILS MODAL ── */}

    {selectedEventId && (() => {
      const event = EVENTS.find((e) => e.id === selectedEventId);
      const reg = MY_REGISTRATIONS.find((r) => r.eventId === selectedEventId);
      if (!event || !reg) return null;
      return (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedEventId(null); }}
        >
          <div className="bg-white rounded-[24px] w-full max-w-[720px] overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-black/8">
              <h3 className="font-serif italic text-dv-accent text-[20px]">Registration Details</h3>
              <button
                onClick={() => setSelectedEventId(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-dv-muted" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Hero image */}
              <div className="relative h-[200px] w-full rounded-[14px] overflow-hidden">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>

              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[20px] font-semibold text-dv-text mb-2">{event.title}</h2>
                  <span className="text-[12px] font-medium text-dv-accent border border-dv-accent px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
                <span className={`text-[12px] font-medium px-3 py-1 rounded-full shrink-0 ${
                  event.status === "Upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {event.status === "Upcoming" ? "Upcoming Event" : "Past Event"}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-[14px] p-4" style={{ background: "#faf9f7" }}>
                  <h4 className="text-[14px] font-semibold text-dv-text mb-3">Event Information</h4>
                  <div className="flex flex-col gap-2.5 text-[13px]">
                    <span className="flex items-center gap-2 text-dv-muted">
                      <Calendar className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                      {event.isoDate}
                    </span>
                    <span className="flex items-center gap-2 text-dv-muted">
                      <Clock className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2 text-dv-muted">
                      <MapPin className="w-3.5 h-3.5 text-dv-accent shrink-0" />
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="rounded-[14px] p-4" style={{ background: "#faf9f7" }}>
                  <h4 className="text-[14px] font-semibold text-dv-text mb-3">Your Registration</h4>
                  <div className="flex flex-col gap-2 text-[13px]">
                    {[
                      { label: "Name:", value: MOCK_USER.name },
                      { label: "Email:", value: MOCK_USER.email },
                      { label: "Phone:", value: MOCK_USER.phone },
                      { label: "Attendees:", value: String(reg.attendeeCount) },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-dv-muted text-[11px]">{label}</p>
                        <p className="text-dv-text font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dietary info */}
              {reg.dietaryRestrictions && (
                <div>
                  <h4 className="text-[14px] font-semibold text-dv-text mb-2">Additional Information</h4>
                  <p className="text-[12px] text-dv-accent">Dietary Restrictions:</p>
                  <p className="text-[14px] text-dv-text">{reg.dietaryRestrictions}</p>
                </div>
              )}

              {/* About */}
              <div>
                <h4 className="text-[14px] font-semibold text-dv-text mb-1">About This Event</h4>
                <p className="text-[13px] text-dv-muted leading-relaxed">{event.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-black/8">
                <button
                  onClick={() => setSelectedEventId(null)}
                  className="flex-1 h-10 rounded-full border border-black/15 text-[14px] text-dv-text hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 h-10 rounded-full bg-red-600 text-white text-[14px] font-medium hover:opacity-90 transition-opacity">
                  Cancel Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })()}
    </>
  );
}
