import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // assuming you have a Header component
import Footer from './Footer'; // assuming you have a Footer component

const Home = () => {
    const [marksheetTitles, setMarksheetTitles] = useState([]);

    useEffect(() => {
        // Fetch marksheet titles from the server
        const fetchMarksheetTitles = async () => {
            try {
                const response = await fetch('http://localhost:5000/marksheets/titles'); // Update this endpoint as needed
                const data = await response.json();
                setMarksheetTitles(data);
            } catch (error) {
                console.error('Error fetching marksheet titles:', error);
            }
        };

        fetchMarksheetTitles();
    }, []);

    const styles = {
        container: {
            backgroundColor: '#f4f7fa',
            minHeight: '100vh',
            padding: '40px 20px',
        },
        banner: {
            width: '100%',
            height: '250px',
            background: 'linear-gradient(45deg, #2596be, #28242c)', // Gradient background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        bannerText: {
            fontSize: '2.5rem',
            color: '#fff',
            fontWeight: '700',
            textAlign: 'center',
            padding: '20px',
            borderRadius: '7px',
        },
        bottomContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
        },
        boxesContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            width: '48%',
        },
        box: {
            backgroundColor: '#2596be',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#fff',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out',
        },
        boxTitle: {
            fontSize: '1.5rem',
            marginBottom: '10px',
        },
        boxDescription: {
            fontSize: '1rem',
        },
        boxHover: {
            transform: 'scale(1.05)', // Scale the card on hover
        },
        tableContainer: {
            width: '48%',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        th: {
            backgroundColor: '#08a4e4',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
        },
        td: {
            padding: '10px',
            border: '1px solid #ddd',
            textAlign: 'center',
            color: 'black',
        },
        link: {
            color: 'black',
            textDecoration: 'none',
        }
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                {/* Banner Section */}
                <div style={styles.banner} className='rounded'>
                    <div style={styles.bannerText}>Dashboard</div>
                </div>

                {/* Bottom section with boxes and table */}
                <div style={styles.bottomContainer}>
                    {/* Left: 2x2 Boxes */}
                    <div style={styles.boxesContainer}>
                        <Link
                            to="/course"
                            style={styles.box}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.boxHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                        >
                            <h3 style={styles.boxTitle}>Add Course</h3>
                            <p style={styles.boxDescription}>
                                Add new courses for students.
                            </p>
                        </Link>
                        <Link
                            to="/sheets-collection"
                            style={styles.box}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.boxHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                        >
                            <h3 style={styles.boxTitle}>Show Marksheets</h3>
                            <p style={styles.boxDescription}>
                                View all existing marksheets.
                            </p>
                        </Link>
                        <Link
                            to="/add-marksheet"
                            style={styles.box}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.boxHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                        >
                            <h3 style={styles.boxTitle}>Add Marksheet</h3>
                            <p style={styles.boxDescription}>
                                Create new marksheets for students.
                            </p>
                        </Link>
                        <Link
                            to="/add-admin"
                            style={styles.box}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.boxHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                        >
                            <h3 style={styles.boxTitle}>Add Admin</h3>
                            <p style={styles.boxDescription}>
                                Add new admin users to the system.
                            </p>
                        </Link>
                    </div>

                    {/* Right: Marksheet Titles Table */}
                    <div className="table-responsive container" style={{ width: '45%' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Marksheets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marksheetTitles.length > 0 ? (
                                    marksheetTitles.map((title, index) => (
                                        <tr key={index}>
                                            <td style={styles.td}>
                                                <Link to={`/marksheet/${title}`} style={styles.link}>
                                                    {title}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td style={styles.td}>No marksheet titles found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
