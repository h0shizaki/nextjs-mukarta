import { findRecordByFilter, getMinifiedRecords, table } from '../../lib/airtable';

const createStore = async (req, res) => {

    if (req.method === "POST") {
        const { id, name, address, neighborhood, vote, imgUrl } = req.body;

        try {
            if (id) {
                const record = await findRecordByFilter(id);
                if (record.length !== 0) {
                    res.status(200).json(record);
                } else {
                    if (name) {
                        const createRecord = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neighborhood,
                                    vote: 0,
                                    imgUrl
                                }
                            }
                        ])

                        const record = getMinifiedRecords(createRecord);
                        res.status(200).json({ "message": "Create store record successfully", record })

                    }
                }



            } else {
                res.status(400).json({ "message": "Name is missing" })
            }
        } catch (err) {
            console.error("Something went wrong", err);
            res.status(500).json({ "message": "Something went wrong", error: err });
        }
    }
}

export default createStore;