"use client";

import { useState } from "react";
import type { TicketFormData } from "../types";

interface Props {
  onSubmit: (data: TicketFormData) => void;
  isLoading?: boolean;
}

export function VisitorForm({ onSubmit, isLoading = false }: Props) {
  const [formData, setFormData] = useState<TicketFormData>({
    ticketNumber: "",
    hasAgreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const terms = [
    "来訪中は常に来客バッジを着用してください。",
    "施設内での撮影・録音は禁止です。",
    "機密情報の取り扱いには十分注意してください。",
    "非常時は係員の指示に従ってください。",
    "退出時は来客バッジを受付に返却してください。",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="ticketNumber" className="form-label">
          発券番号
        </label>
        <input
          type="text"
          id="ticketNumber"
          name="ticketNumber"
          required
          className="input-field"
          value={formData.ticketNumber}
          onChange={handleChange}
          placeholder="例: V12345"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">注意事項</h3>
        <div className="space-y-2">
          {terms.map((term, index) => (
            <div key={index} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">{term}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="hasAgreedToTerms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={formData.hasAgreedToTerms}
              onChange={handleChange}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              上記の注意事項を読み、理解し、同意しました
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="button-primary"
          disabled={isLoading || !formData.hasAgreedToTerms}
        >
          {isLoading ? "確認中..." : "チェックイン"}
        </button>
      </div>
    </form>
  );
}
