let Users = [
    {transfer_value: "1000", currency: 'USD', number: "+7 (916) 772 72 27", data: '12.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "350", currency: 'GEL', number: "+7 (212) 555 12 34", data: '11.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "100000", currency: 'AMD', number: '5032 5678 9101 1213', data: '10.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "5000", currency: 'RUB', number: "+7 (985) 823 12 34", data: '10.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "100", currency: 'USD', number: '0471 5678 9101 1213', data: '09.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "500", currency: 'EUR', number: '4291 5678 9101 1213', data: '08.10.2023', image: './public/images/unknown_user.jpg'},
    {transfer_value: "150", currency: 'GEL', number: '9746 5678 9101 1213', data: '02.10.2023', image: './public/images/unknown_user.jpg'}
]

export {Users}

export function updateUsers(newTransfer) {
    Users = [newTransfer, ...Users];
}