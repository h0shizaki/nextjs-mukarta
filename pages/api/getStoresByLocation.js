import fetchShabuStores from "../../lib/shabuStore";

const getStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query;

        const response = await fetchShabuStores(latLong, limit);
        res.status(200).json(response)
    } catch (err) {
        console.error("Error When fetch stores", err);
        res.status(500).json({ message: "Error When fetch stores", err });
    }

}

export default getStoresByLocation;