import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// import Sonnet from '../../components/Sonnet';

function ControlledTabsExample() {
    const router = useRouter()
    const roomId = router?.query?.room 
    const [key, setKey] = useState('home')

    const changeRoom = (tab) => {
        setKey(tab)
        router.push(`tab?room=${tab}`)
    }

    useEffect(() => {
        setKey(roomId)


    }, [roomId])



    return (
        <>

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => changeRoom(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    profile
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    contact
                </Tab>
                <Tab eventKey="about" title="About">
                    about
                </Tab>

            </Tabs>

        </>
    );
}

export default ControlledTabsExample;