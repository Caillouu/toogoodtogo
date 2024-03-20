export const db = {
    events : [
        {
            _id: 1,
            place: "Bar",
            event: "Ricard à 1€",
            organizer: "Mairie de Saint-Ouen",
            dateStart: "1707908658",
            dateEnd: "1708527382",
            category: "beer",
            description: "lorem ipsum",
            coordinates: [
                48.906737,
                2.3373836
            ],
            status: "WAITING"
        },
        {
            _id: 2,
            place: "Chez Mireille",
            event: "Repas à 12€",
            organizer: "Chez Mireille",
            dateStart: "1707908658",
            dateEnd: "1708527382",
            category: "ustensils",
            description: "lorem ipsum",
            coordinates: [
                48.9121876,
                2.3337924
            ],
            status: "WAITING"
        },
        {
            _id: 3,
            place: "Popeyes Anvers",
            event: "Poulet à 5€",
            organizer: "Popeyes",
            dateStart: "1707908658",
            dateEnd: "1708527382",
            category: "ustensils",
            description: "lorem ipsum",
            coordinates: [
                48.8830139,
                2.3411966
            ],
            status: "WAITING"
        }
    ],
    users: [
        {
            _id: 1,
            name: "John",
            email: "john@gmail.com",
            events: [1,2]
        },
        {
            _id: 2,
            name: "Jane",
            email: "jane@gmail.com",
            events: [3]
        }
    ]
}