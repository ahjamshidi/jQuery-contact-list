$(document).ready(function () {
    // Sample initial contacts
    let contacts = [
        { name: 'John', surname: 'Doe', phone: '123-456-7891', address: '123 Main St' },
        { name: 'Abi', surname: 'Beckam', phone: '223-456-7892', address: '345 Main St' },
        { name: 'David', surname: 'White', phone: '323-456-7893', address: '321 Main St' },
        { name: 'Wayn', surname: 'Davies', phone: '423-456-7894', address: '456 Main St' },
        { name: 'Alfred', surname: 'Scott', phone: '523-456-7895', address: '654 Main St' },
        { name: 'Ziba', surname: 'Lewis', phone: '623-456-7895', address: '678 Main St' },
        { name: 'Jane', surname: 'Smith', phone: '787-654-3216', address: '876 Oak St' }
    ];

    // Display contacts on page load
    displayContacts();

    // Show contact input form
    $('#addContactBtn').on('click', function () {
        $('h1').text('Add New Contact');
        showAddContactForm();
    });
    // Submit contact data
    $('#submitBtn').on('click', function () {
        addContact();
    });
    // Cancel adding new contact
    $('#cancelBtn').on('click', function () {
        showContactList();
    });
    
    // Search input keyup event
    $('#searchInput').on('keyup', function () {
        searchContacts($(this).val());
    });
    

    // Function to display contacts
    function displayContacts(filteredContacts) {
        let contactList =  $('#contactList');
        contactList.empty();
        filteredContacts = filteredContacts || contacts;
        filteredContacts.forEach(contact => {
            let listItem = $('<li>');
            listItem.text(`${contact.name} ${contact.surname} - ${contact.phone} - ${contact.address}`);
            let deleteBtn = $('<button>').text('Delete').click(function () {
                deleteContact(contact);
            });

            listItem.append(deleteBtn);
            contactList.append(listItem);
        });        
        showContactList();
    }
    // Show contact list
    function showContactList() {
        $('#contactList').show();
        $('#addForm').hide();
        $('#searchInput').show();
        $('#addContactBtn').show();
        $('h1').text('Address Book');
        $('#addForm .input').val('')
    }
    // Show add contact form
    function showAddContactForm() {
        $('#contactList').hide();
        $('#searchInput').hide();
        $('#addContactBtn').hide();
        $('#addForm').css("display",'flex');
    }
    // Add a new contact
    function addContact() {
        let name = $('[name=name]').val();
        let surname = $('[name=surname]').val();
        let phone = $('[name=phone]').val();
        let address = $('[name=address]').val();
        if(!name || !surname || !phone || !address)
        {
            return
        }
        //object property shorthand
        let newContact = { name, surname, phone, address };
        contacts.push(newContact);

        displayContacts();
    }

    // Delete a contact
    function deleteContact(contact) {
        let index = contacts.indexOf(contact);
        if (index !== -1) {
            contacts.splice(index, 1);
            displayContacts();
        }
    }

    // Function to search contacts
    function searchContacts(query) {
        let filteredContacts = contacts.filter(contact => {
            let fullName = `${contact.name} ${contact.surname}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });
        displayContacts(filteredContacts);
    }
});