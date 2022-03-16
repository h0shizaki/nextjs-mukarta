import { table, findRecordByFilter } from '../../lib/airtable';

const getStoreRecordByID = async (req, res) => {

    const { id } = req.query;

    try {
        if (id) {
            const data = await findRecordByFilter(id);

            if (data.length !== 0) {
                res.json(data)
            } else {
                res.json({ "message": "Record is empty" })
            }

        } else {
            res.status(400).json({ "message": "Id is missing" })
        }
    } catch (err) {
        console.error("Something went wrong", err);
        res.status(500).json({ "message": "Something went wrong", error: err });
    }

}

export default getStoreRecordByID;