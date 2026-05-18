export const mockCustomers = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "9876543210",
    outstanding: 4500,
    nextDue: "2026-06-01",
  },
  {
    id: 2,
    name: "Meena Tailors",
    email: "meena@example.com",
    phone: "9123456789",
    outstanding: 8000,
    nextDue: "2026-05-28",
  },
  {
    id: 3,
    name: "Ledger Customer",
    email: "ledger@example.com",
    phone: "555-0199",
    outstanding: 0,
    nextDue: null,
  }
];

export const mockLoans = [
  {
    id: 101,
    customerId: 3,
    item: "Rice bag",
    amount: 5000,
    dueDate: "2026-05-12",
    balance: 4000,
    date: "2026-05-01"
  }
];

export const mockRepayments = [
  {
    id: 201,
    loanId: 101,
    amount: 1000,
    date: "2026-05-12"
  }
];