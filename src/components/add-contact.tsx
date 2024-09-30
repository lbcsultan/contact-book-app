"use client";
import { CONTRACT } from "@/app/constants";
import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function AddContact() {
  const [addContact, setAddContact] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const {
    mutateAsync: sendTransaction,
    isPending,
    error,
  } = useSendTransaction();

  const resetForm = () => {
    setName("");
    setAddress("");
    setAddContact(false); // Close the modal
  };

  const handleAddContact = async () => {
    try {
      const transaction = prepareContractCall({
        contract: CONTRACT,
        method: "function addContact(string _name, address _wallet)",
        params: [name, address],
      });
      await sendTransaction(transaction);
      resetForm(); // Reset form and close modal on success
    } catch (err) {
      console.error("Failed to add contact", err);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div>
      {!addContact ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setAddContact(true)}
        >
          Add contact
        </button>
      ) : (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Contact
              </h2>
              <button
                onClick={() => setAddContact(false)}
                className="text-gray-600 hover:text-gray-800 transition duration-150"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter contact name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="0x0000..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddContact}
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Contact"}
            </button>

            {error && (
              <p className="text-red-500 text-xs italic mt-2">
                {error.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
