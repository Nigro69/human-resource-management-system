import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ApplicantPdfInvoice() {
    const [data, setData] = useState()
    const [url, setUrl] = useState()

    const {id} = useParams()

    useEffect(() => {
        getPdfDocument();
    }, [])

    useEffect(() => {
        convertIntoPdf()
        console.log(url)
    }, [data])

    function convertIntoPdf() {
        if(data){
            console.log(data.data.data)
            const blob = new Blob([new Uint8Array(data.data.data)], { type: data.mimetype })
            const url = URL.createObjectURL(blob)
            setUrl(url)
        }
    }

    async function getPdfDocument() {
        fetch(`http://44.204.133.124/api/v1/user/applicant/pdf/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                const res = await response.json()
                return res.data
            })
            .then((body) => {
                console.log('Success:', body.data);
                setData(body)
            })
    }

    return (
        <div className='flex items-center space-x-2'>
            <span>here is your generated pdf</span>
            <a className='px-3 py-2 border rounded bg-yellow-700 text-white' href={url} download>{data?.name}.pdf</a>
        </div>
    )
}

export default ApplicantPdfInvoice