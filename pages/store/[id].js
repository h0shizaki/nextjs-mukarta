import { useRouter } from "next/router";

const Store = (props) => {

    const router = useRouter();
    const { id } = router.query;

    // console.log(id)

    return (
        <div>
            <h2> Hello {id}</h2>

        </div>
    )

}

export default Store;