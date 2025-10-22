"use client";

import { useState } from "react";
import { useTransition } from "react";
import * as actions from "@/server/actions";

export default function TaskForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      await actions.createTask(name, description, new Date(dueDate), completed);
      setName("");
      setDescription("");
      setDueDate("");
      setCompleted(false);
    });
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
      {/* Decorative gradient header */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-8 md:p-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">
                New Task
              </h2>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base">
            Fill in the details below to create a new task
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div className="group">
            <label 
              htmlFor="name" 
              className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide"
            >
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Task Title
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 dark:text-gray-100 transition-all duration-200 placeholder:text-gray-400 font-medium"
              placeholder="e.g., Complete project proposal..."
            />
          </div>

          {/* Description */}
          <div className="group">
            <label 
              htmlFor="description" 
              className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide"
            >
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 dark:text-gray-100 transition-all duration-200 resize-none placeholder:text-gray-400 font-medium"
              placeholder="Add more details about this task..."
            />
          </div>

          {/* Due Date and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div className="group">
              <label 
                htmlFor="dueDate" 
                className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide"
              >
                <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Deadline
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-pink-500 dark:focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-900/30 dark:text-gray-100 transition-all duration-200 font-medium"
              />
            </div>

            {/* Completed Status */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Initial Status
              </label>
              <label 
                htmlFor="completed"
                className="flex items-center gap-4 px-5 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  id="completed"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="w-5 h-5 text-green-600 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 transition-all"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    Mark as completed
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Check if this task is already done
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className={`group relative w-full py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                isPending || !name.trim()
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Task</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}