import React from "react";
import useAxios from "../services/useAxios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/button";
import defaultImage from "../assets/defaultImage.png";

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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f4f4f9",
                fontFamily: "Arial, sans-serif",
                padding: "20px",
            }}
        >
            {data ? (
                <div
                    style={{
                        maxWidth: "500px",
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        overflow: "hidden",
                        textAlign: "center",
                    }}
                >
                    {/* Image */}
                    <img
                        src={data.img || defaultImage}
                        alt={data.name}
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />

                    {/* Content */}
                    <div style={{ padding: "20px" }}>
                        <h2 style={{ marginBottom: "10px" }}>{data.name}</h2>
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>Author:</strong> {data.author}
                        </p>
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>Genre:</strong> {data.genres}
                        </p>
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>Rating:</strong> {data.stars}
                        </p>
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>Start Date:</strong> {new Date(data.start).toLocaleDateString()}
                        </p>
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>End Date:</strong> {new Date(data.end).toLocaleDateString()}
                        </p>
                        <Button
                            onClick={() => navigate(-1)}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                        >
                            Back
                        </Button>

                    </div>
                </div>
            ) : (
                <p>No Book data available</p>
            )}
        </div>
    );
};

export default SinglePage;
