import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import CustomToggle from "../../dropdowns";

function TotalCommentBlock() {



    return (
        <div>
            <div className="total-comment-block">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="post-option">
                        0 Comment
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="bg-secondary">
                            sfdsf
                        </Dropdown.Item>
                        <Dropdown.Item className="bg-secondary">
                            sfdsf
                        </Dropdown.Item>
                        <Dropdown.Item className="bg-secondary">
                            sfdsf
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </div>
        </div>
    )
}

export default TotalCommentBlock