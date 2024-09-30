"use client";
import { CONTRACT } from "@/app/constants";
import { useReadContract } from "thirdweb/react";
import ContactCard from "./contact-card";

interface Contact {
  name: string;
  wallet: string;
}

export default function ContactList() {
  const {
    data: contacts,
    isLoading: loadingContacts,
    refetch,
  } = useReadContract({
    contract: CONTRACT,
    method:
      "function getContacts() view returns ((string name, address wallet)[])",
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Contacts List</h1>
      {loadingContacts ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : contacts && contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact: Contact, index: number) => (
            <ContactCard
              key={index}
              index={index}
              name={contact.name}
              wallet={contact.wallet}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">No contacts found!</p>
      )}
    </div>
  );
}
