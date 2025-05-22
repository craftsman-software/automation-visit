"use client";

import { useState } from "react";
import type { FormData } from "../types";

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function EmployeeForm({ onSubmit, isLoading = false }: Props) {
  const [formData, setFormData] = useState<FormData>({
    visitorName: "",
    hostName: "",
    purpose: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="visitorName" className="form-label">
          お客様のお名前
        </label>
        <input
          type="text"
          id="visitorName"
          name="visitorName"
          required
          className="input-field"
          value={formData.visitorName}
          onChange={handleChange}
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="hostName" className="form-label">
          受け入れ担当者
        </label>
        <input
          type="text"
          id="hostName"
          name="hostName"
          required
          className="input-field"
          value={formData.hostName}
          onChange={handleChange}
          placeholder="鈴木 一郎"
        />
      </div>

      <div>
        <label htmlFor="purpose" className="form-label">
          来社目的
        </label>
        <textarea
          id="purpose"
          name="purpose"
          required
          className="input-field min-h-[100px]"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="商談・打ち合わせなど"
        />
      </div>

      <div>
        <label htmlFor="duration" className="form-label">
          滞在予定時間
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          required
          className="input-field"
          value={formData.duration}
          onChange={handleChange}
          placeholder="1時間"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="button-primary"
          disabled={isLoading}
        >
          {isLoading ? "登録中..." : "登録する"}
        </button>
      </div>
    </form>
  );
}
