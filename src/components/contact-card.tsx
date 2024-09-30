import { CONTRACT } from "@/app/constants";
import React from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type Props = {
  index: number;
  name: string;
  wallet: string;
};

export default function ContactCard(props: Props) {
  const { mutate: sendTransaction, isPending, error } = useSendTransaction();

  const handleRemoveContact = async () => {
    try {
      const transaction = prepareContractCall({
        contract: CONTRACT,
        method: "function removeContact(uint256 _index)",
        params: [BigInt(props.index)],
      });
      await sendTransaction(transaction);
      // 성공적으로 삭제되었을 때의 처리 (예: 알림 표시)
    } catch (err) {
      console.error("Failed to remove contact:", err);
      // 에러 발생 시 사용자에게 알림
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center transition-all duration-300 hover:shadow-xl w-full">
      <div className="flex-grow mr-4">
        <h2 className="text-xl font-semibold text-gray-800">{props.name}</h2>
        <p className="text-gray-600 text-sm truncate">{props.wallet}</p>
      </div>
      <button
        onClick={handleRemoveContact}
        disabled={isPending}
        className={`bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 flex-shrink-0 ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 w-full">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
