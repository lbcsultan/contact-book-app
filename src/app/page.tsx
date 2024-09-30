"use client";
import AddContact from "@/components/add-contact";
import ContactList from "@/components/contact-list";
import Login from "@/components/login";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const account = useActiveAccount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Contact Book</h1>
          <Login />
        </header>

        {account ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Your Contacts
              </h2>
              <AddContact />
            </div>
            <ContactList />
          </div>
        ) : (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <p className="text-xl text-gray-600">
              Please connect your wallet to view and manage contacts.
            </p>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500">
          <p>&copy; 2024 Contact Book. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
