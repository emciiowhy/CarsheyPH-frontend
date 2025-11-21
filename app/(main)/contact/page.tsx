"use client";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          We’d love to hear from you. Send us a message and our team will respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Reach Us</h2>
            <p className="text-gray-700 mb-2">
              📞 <strong>Phone:</strong> +63 912 345 6789
            </p>
            <p className="text-gray-700 mb-2">
              ✉️ <strong>Email:</strong>{" "}
              <a href="mailto:info@carshey.ph" className="text-blue-600 underline">
                info@carshey.ph
              </a>
            </p>
            <p className="text-gray-700">
              📍 <strong>Location:</strong> Manila, Philippines
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Business Hours</h2>
            <ul className="text-gray-700 space-y-1">
              <li>🕙 Monday – Friday: 9:00 AM – 6:00 PM</li>
              <li>🕙 Saturday: 9:00 AM – 4:00 PM</li>
              <li>❌ Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <form className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Juan Dela Cruz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
