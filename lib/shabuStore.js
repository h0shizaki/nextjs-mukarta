import { createApi } from "unsplash-js";

const getStoreUrl = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220312&limit=${limit}`
}

const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    //...other fetch options
});

const getListOfPicture = async () => {

    const picture = await unsplashApi.search.getPhotos({
        query: 'korean bbq',
        perPage: 40,
    });

    const unsplashResult = picture.response.results;

    const picResponse = unsplashResult.map((result) => result.urls['small'])

    return picResponse;
}

const fetchShabuStores = async () => {

    const url = getStoreUrl("18.808346,98.955006", "หมูกระทะ", 9);

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.NEXT_PUBLIC_FOUR_SQUARE_API_KEY,
        }
    })

    const data = await res.json();

    const transformedData = data?.results?.map((venue) => {
        return {
            id: venue.fsq_id,
            ...venue
        }
    }) || [];

    const pics = await getListOfPicture();

    return transformedData.map((venue, i) => {
        const neighborhood = venue.location.neighborhood;
        return {
            // ...venue,
            id: venue.fsq_id,
            name: venue.name,
            address: venue.location.address || "",
            neighborhood: (neighborhood && neighborhood.length > 0 && neighborhood[0]) || venue.location.cross_street || "",
            imgUrl: pics[i],
        }
    });

}

export default fetchShabuStores;