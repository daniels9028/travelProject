import { Payment } from "@/types/payment/response";

const ListPayment = ({
  listPayment,
  selectedPayment,
  setSelectedPayment,
}: {
  listPayment: Payment;
  selectedPayment: Payment | null;
  setSelectedPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
}) => {
  return (
    <div
      key={listPayment.id}
      className={`border rounded-lg flex flex-row justify-between items-center py-2 px-6 cursor-pointer ${
        selectedPayment?.id === listPayment.id ? "border-blue-500" : ""
      }`}
      onClick={() => setSelectedPayment(listPayment)}
    >
      <div className="flex flex-row items-center gap-4">
        <input
          type="radio"
          id={`payment-${listPayment.id}`}
          name="paymentMethod"
          value={listPayment.id}
          className="cursor-pointer"
          checked={selectedPayment?.id === listPayment.id}
          onChange={() => setSelectedPayment(listPayment)}
        />
        <label
          htmlFor={`payment-${listPayment.id}`}
          className="font-semibold text-lg cursor-pointer"
        >
          {listPayment.name}
        </label>
      </div>
      <img
        src={listPayment.imageUrl}
        alt={listPayment.name}
        className="w-20 h-20 bg-cover cursor-pointer"
      />
    </div>
  );
};

export default ListPayment;
