"use client";

import { useState } from "react";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzkY6QHkIexifpHgPIqd8e0nSvlDOvZNPtYWt4qjHf5G9PM7SUYGrLw3y5quMx1fxmB/exec";

interface PhoneModalProps {
  onSuccess: () => void;
}

export default function PhoneModal({ onSuccess }: PhoneModalProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setError("Número inválido. Digite DDD + número.");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        phone: cleaned,
        timestamp: new Date().toISOString(),
      });
      await fetch(`${SHEET_URL}?${params}`, { mode: "no-cors" });
      onSuccess();
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <div
        className="w-full max-w-sm mx-5 rounded-2xl px-6 py-8"
        style={{
          backgroundColor: "#0D0D0D",
          border: "1px solid rgba(201,168,108,0.3)",
        }}
      >
        <h2
          className="text-2xl font-serif text-center mb-2"
          style={{ color: "#C9A86C" }}
        >
          Antes de continuar…
        </h2>
        <p className="text-center text-sm mb-6" style={{ color: "#A0A0A0" }}>
          Deixa seu WhatsApp e acessa o conteúdo completo.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #1E1E1E",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#C9A86C";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#1E1E1E";
            }}
            disabled={loading}
            autoFocus
          />

          {error && (
            <p className="text-sm text-center" style={{ color: "#E05C5C" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl py-3 font-semibold text-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "#C9A86C", color: "#080808" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Enviando…
              </span>
            ) : (
              "Acessar conteúdo"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
