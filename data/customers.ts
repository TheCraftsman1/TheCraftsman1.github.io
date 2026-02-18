// Mock customer data simulating SQL table structure
// Table: CUSTOMERS
// Columns: InsuranceID (INT PRIMARY KEY), Name (VARCHAR(50)), DOB (DATE), NIN (INT), LOCATION (VARCHAR(255))

export interface Customer {
    InsuranceID: number;
    Name: string;
    DOB: string; // YYYY-MM-DD format
    NIN: number;
    Location: string;
}

// SQL equivalent:
// CREATE TABLE CUSTOMERS(
//   InsuranceID INT PRIMARY KEY,
//   Name VARCHAR(50),
//   DOB DATE,
//   NIN INT,
//   LOCATION VARCHAR(255)
// );

export const customers: Customer[] = [
    { InsuranceID: 121, Name: 'Mango', DOB: '2000-01-01', NIN: 56781, Location: 'Delhi' },
    { InsuranceID: 122, Name: 'Banana', DOB: '2001-01-01', NIN: 56782, Location: 'Chennai' },
    { InsuranceID: 123, Name: 'Kiwi', DOB: '2002-01-01', NIN: 56783, Location: 'Hyd' },
];

// Helper function to simulate SELECT * FROM CUSTOMERS
export function getAllCustomers(): Customer[] {
    return customers;
}

// Helper function to simulate SELECT * FROM CUSTOMERS WHERE InsuranceID = ?
export function getCustomerById(InsuranceID: number): Customer | undefined {
    return customers.find(c => c.InsuranceID === InsuranceID);
}

// Helper function to simulate INSERT INTO CUSTOMERS
export function addCustomer(customer: Customer): void {
    customers.push(customer);
}

// Helper function to simulate DROP TABLE CUSTOMERS
export function clearCustomers(): void {
    customers.length = 0;
}
