const TeamMembers = ({ cards = [] }) => {
    return (
        <>
            <h2 className="fs-2 mb-4">Our Team</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-wrapper">
                {cards.map((card, index) => (
                    <div className="col" key={card.id || index}>
                        <div className="card">
                            <img
                                src={card.image}
                                className="img-fluid rounded-start"
                                alt={card.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default TeamMembers;