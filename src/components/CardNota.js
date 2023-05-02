import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";

const CardNota = ({_id, createdAt, status, untuk}) => {

    return (
    <div>
        <Link to={`/nota/${_id}`}>
        <div className="box">
            <div className="right-side">
                <div className="number">{untuk}</div>
                    <div className="box-topic">{moment(createdAt).format('DD MMM YYYY')}</div>
            </div>
            <i className={status === "notCheckedYet" || status === "aaa" ? "bx bx-checkbox maker cart" : status === "alreadyChecked" || status === "bbb" ? "bx bx-check-square checker cart" : "bx bx-badge-check payer cart"}></i>
        </div>
        </Link>
    </div>
  )
}

export default CardNota