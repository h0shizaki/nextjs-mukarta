import { findRecordByFilter, getMinifiedRecords, table } from '../../lib/airtable';

const favStoreRecord = async (req, res) => {

    if (req.method === 'PUT') {

        try {

            const id = req.body.id;

            if (id) {

                const records = await findRecordByFilter(id);

                if (records.length !== 0) {

                    const record = records[0];
                    const calculateVote = parseInt(record.vote) + parseInt(1);

                    const updateRec = await table.update(
                        [
                            {
                                id: record.recordID,
                                fields: {
                                    "vote": calculateVote
                                }
                            }
                        ]
                    );

                    if (updateRec) {
                        const response = getMinifiedRecords(updateRec);
                        res.json(response);
                    } else {
                        res.status(500).json({ "message": "Update failed" })
                    }


                } else {
                    res.json({ "message": "Id doesn't exist" })
                }


            } else {
                res.status(400).json({ "message": "Id is missing" })
            }

        } catch (err) {
            console.error("Something went wrong", err);
            res.status(500).json({ "message": "Something went wrong", error: err });
        }
    }

}

export default favStoreRecord;