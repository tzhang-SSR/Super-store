export default function fetchItemList(params = '') {
    // access params to add to your query. This will help in the next phase.
    const ITEM_URL = 'https://gp-super-store-api.herokuapp.com/item/list'
    return fetch(ITEM_URL + params).then((response) =>
        response.json()
    );
}