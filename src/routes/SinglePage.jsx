import React from "react";
import useAxios from "../services/useAxios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/button";



const SinglePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, get, loading } = useAxios(`http://localhost:3000`);

    useEffect(() => {
        get(`books/${id}`);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (

        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Book Details</h1>
            {data ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {

                        <li
                            key={data.id}
                            style={{
                                padding: "15px",
                                margin: "10px 0",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <p><strong>ID:</strong> {data.id}</p>
                            <p><strong>Author:</strong> {data.author}</p>
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Genre:</strong> {data.genres}</p>
                            <p><strong>Start Date:</strong> {new Date(data.start).toLocaleDateString()}</p>



                        </li>
                    }
                </ul>
            ) : (
                <p>No Book data available</p>
            )}
            <Button onClick={() => navigate(-1)} />
        </div>
    );
}

export default SinglePage;
