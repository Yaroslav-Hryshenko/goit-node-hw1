import contactsService from "./db/contacts.js";
import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log("allContacts: ", allContacts);
    case "getById":
      const contactById = await contactsService.getContactById(id);
      return console.log("contactById: ", contactById);
    case "add":
      const addContact = await contactsService.addContact(name, email, phone);
      return console.log("addContact: ", addContact);
    case "remove":
      const removeContact = await contactsService.removeContact(id);
      return console.log("removeContact: ", removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
