import { RecordDocType } from "./Record.model";

const date = new Date();

export const records: RecordDocType[] = [
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "John",
    middleName: "Aaa",
    contactNumber: "09123456789",
    applicationType: "registration",
    gender: "male",
    applicationNumber: "1234567890",
    sk: "15 to 17",
    indigenousPeople: true,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Jane",
    middleName: "Bbb",
    contactNumber: "09123456789",
    applicationType: "reactivation",
    gender: "female",
    applicationNumber: "1234567891",
    sk: "no",
    indigenousPeople: false,
    seniorCitizen: true,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Mary",
    middleName: "Ccc",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "female",
    applicationNumber: "1234567892",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Mark",
    middleName: "Ddd",
    contactNumber: "09123456789",
    applicationType: "reactivation with correction",
    gender: "male",
    applicationNumber: "1234567893",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: true,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Alice",
    middleName: "Eee",
    contactNumber: "09123456789",
    applicationType: "transfer incoming",
    gender: "female",
    applicationNumber: "1234567894",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Bob",
    middleName: "Fff",
    contactNumber: "09123456789",
    applicationType: "transfer within",
    gender: "male",
    applicationNumber: "1234567895",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: true,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Charlie",
    middleName: "Ggg",
    contactNumber: "09123456789",
    applicationType: "transfer with reactivation",
    gender: "male",
    applicationNumber: "1234567896",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Dave",
    middleName: "Hhh",
    contactNumber: "09123456789",
    applicationType: "transfer with reactivation and correction",
    gender: "male",
    applicationNumber: "1234567897",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: true,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Doe",
    firstName: "Eve",
    middleName: "Iii",
    contactNumber: "09123456789",
    applicationType: "post to Local",
    gender: "female",
    applicationNumber: "1234567898",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Smith",
    firstName: "John",
    middleName: "Qqq",
    contactNumber: "09123456789",
    applicationType: "registration",
    gender: "male",
    applicationNumber: "1234567899",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Jones",
    firstName: "Alice",
    middleName: "Www",
    contactNumber: "09123456789",
    applicationType: "reactivation with correction",
    gender: "female",
    applicationNumber: "12345678910",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Brown",
    firstName: "Alice",
    middleName: "Exx",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "female",
    applicationNumber: "12345678911",
    sk: "15 to 17",
    indigenousPeople: false,
    seniorCitizen: true,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Smith",
    firstName: "John",
    middleName: "Zzz",
    contactNumber: "09123456789",
    applicationType: "reactivation",
    gender: "male",
    applicationNumber: "12345678912",
    sk: "15 to 17",
    indigenousPeople: false,
    seniorCitizen: true,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Johnson",
    firstName: "Jane",
    middleName: "Bbb",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "female",
    applicationNumber: "12345678913",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: false,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Williams",
    firstName: "Mary",
    middleName: "Ccc",
    contactNumber: "09123456789",
    applicationType: "transfer incoming",
    gender: "female",
    applicationNumber: "12345678914",
    sk: "18 to 30",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Davis",
    firstName: "Bob",
    middleName: "Ddd",
    contactNumber: "09123456789",
    applicationType: "transfer within",
    gender: "male",
    applicationNumber: "12345678915",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: true,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Garcia",
    firstName: "Juan",
    middleName: "Eee",
    contactNumber: "09123456789",
    applicationType: "transfer within",
    gender: "male",
    applicationNumber: "12345678916",
    sk: "no",
    indigenousPeople: false,
    seniorCitizen: false,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Martin",
    firstName: "Ana",
    middleName: "Fff",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "female",
    applicationNumber: "12345678917",
    sk: "18 to 30",
    indigenousPeople: true,
    seniorCitizen: false,
    personWithDisability: false,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Lopez",
    firstName: "Sofia",
    middleName: "Hhh",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "female",
    applicationNumber: "12345678919",
    sk: "no",
    indigenousPeople: true,
    seniorCitizen: false,
    personWithDisability: true,
  },
  {
    uuid: crypto.randomUUID(),
    createdAt: new Date(date.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    lastName: "Perez",
    firstName: "Carlos",
    middleName: "Iii",
    contactNumber: "09123456789",
    applicationType: "correction of entries",
    gender: "male",
    applicationNumber: "12345678920",
    sk: "no",
    indigenousPeople: false,
    seniorCitizen: true,
    personWithDisability: true,
  },
];
