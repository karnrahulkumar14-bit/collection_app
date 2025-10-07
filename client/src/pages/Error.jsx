import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <section className='error-wrapper'>
                <div className="d-flex flex-column align-items-center justify-content-center p-5 vh-100
                 text-center">
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <h2 className="mb-3">Page Not Found</h2>
                    <p className="text-muted mb-4">
                        Oops! The page you’re looking for doesn’t exist or has been moved.
                    </p>
                    <Link to="/" className="btn btn-success">
                        Back to Home
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Error