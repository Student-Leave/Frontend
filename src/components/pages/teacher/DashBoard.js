import React from 'react'

const DashBoard = () => {
    return (
        <div className=''
            style={{
                width: '100%',
                padding: '3rem 25px 5rem 25px',

                display: 'felx',
                alignItems: 'center',
                justifyContent: 'center'

            }}
        >
            <iframe src="https://lookerstudio.google.com/embed/reporting/de62fb8f-fd5e-49bc-9daf-75fc6b5150f4/page/96cWD"
                frameBorder="0"
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                style={{

                    width: '100%',
                    height: '100vh',
                    maxHeight: '1200px',
                    maxWidth: '1920px',
                    margin: 'auto',
                    marginTop: '5px',
                    display: 'felx',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '0',
                    borderRadius: '15px',
                }}
            ></iframe>
        </div >
    )
}

export default DashBoard
