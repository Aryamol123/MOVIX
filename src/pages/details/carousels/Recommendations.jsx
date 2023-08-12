import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );


    console.log(data?.results?.length,"dataa");
    
    return (
        <>
        {data?.results?.length > 0 && <Carousel
            title="Recommendations"
            data={data}
            loading={loading}
            endpoint={mediaType}
        />}
        </>
    );
};

export default Recommendations;