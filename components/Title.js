import React from 'react'

const Title = ({title}) => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="position-relative heading">
                    <h3 className="position-absolute display-2 heading-back">{title}</h3>
                    <h2 className="mb-0 display-6 fw-bold">{title}</h2>
                </div>
                <div className="heading-line mb-3"></div>
            </div>
        </div>
    )
}

export default Title