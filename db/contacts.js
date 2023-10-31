import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContact = (contact) =>
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
}
export async function addContact(name, email, phone) {
  const contact = await listContacts();
  const addNewContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contact.push(addNewContact);
  await updateContact(contact);
  return addNewContact;
}

export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (!index === -1) null;

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
