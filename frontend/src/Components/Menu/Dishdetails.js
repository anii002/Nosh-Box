import React from "react";


export class Dishdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allDish: [],
        };
    }
    render() {
        const { allDish } = this.state;
        return (
            <div className="row ">
                {allDish.map((items) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mt-2">
                        <div className="card">
                            <img
                                style={{ width: 'auto', height: 180 }}
                                className="card-img-top"
                                src={items.image}
                                alt="Card"
                            />
                            <div className="card-body">
                                <h6 className="card-title">
                                    Title : <strong>{items.title}</strong>
                                </h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Dishdetails;