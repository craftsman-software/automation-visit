"use client";

import { useState } from "react";
import { EmployeeForm } from "@/components/EmployeeForm";
import { VisitorForm } from "@/components/VisitorForm";
import type { FormData, TicketFormData } from "@/types";

export default function Home() {
  const [isEmployee, setIsEmployee] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEmployeeSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: `来客情報が登録されました。発券番号: ${result.ticketNumber}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "登録に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitorSubmit = async (data: TicketFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: `ようこそ、${result.visitor.visitorName}様。${result.visitor.hostName}がご案内いたします。`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "チェックインに失敗しました。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setIsEmployee(true)}
            className={`px-6 py-2 rounded-md ${
              isEmployee
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            社員用
          </button>
          <button
            onClick={() => setIsEmployee(false)}
            className={`px-6 py-2 rounded-md ${
              !isEmployee
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            来客用
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {isEmployee ? (
          <EmployeeForm onSubmit={handleEmployeeSubmit} isLoading={isLoading} />
        ) : (
          <VisitorForm onSubmit={handleVisitorSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
