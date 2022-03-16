const Airtable = require('airtable');
const base = new Airtable(
    { apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY }
).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID)

const table = base("mukarta");

const getMinifiedRecord = (record) => {
    return {
        recordID: record.id,
        ...record.fields,
    }
}

const getMinifiedRecords = (data) => {
    return data.map(record => getMinifiedRecord(record));
}

const findRecordByFilter = async (id) => {

    const findStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();


    return getMinifiedRecords(findStoreRecords);

}

export { table, getMinifiedRecords, findRecordByFilter };