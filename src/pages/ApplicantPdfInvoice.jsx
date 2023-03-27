import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { RiShareForwardLine } from "react-icons/ri";

function ApplicantPdfInvoice() {
  const [data, setData] = useState();
  const [url, setUrl] = useState(); 
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function handleOnLoad({ numPages }) {
    setNumPages(numPages);
  }

  const { id } = useParams();

  useEffect(() => {
    getPdfDocument();
  }, []);

  useEffect(() => {
    convertIntoPdf();
    console.log(url);
  }, [data]);

  function convertIntoPdf() {
    if (data) {
      console.log(data.data.data);
      const blob = new Blob([new Uint8Array(data.data.data)], {
        type: data.mimetype,
      });
      const url = URL.createObjectURL(blob);
      setUrl(url);
    }
  }

  async function getPdfDocument() {
    fetch(`http://44.204.133.124/api/v1/user/applicant/pdf/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        return res.data;
      })
      .then((body) => {
        console.log("Success:", body.data);
        setData(body);
      });
  }

  return (
    <div className="absolute top-0 pt-16 h-screen flex flex-col">
      <div className="flex items-center space-x-4">
        <Link
          to="/candidates"
          className="font-bold text-white hover:text-white"
        >
          <div className="m-4 bg-gray-400 text-white px-3 py-2 max-w-max rounded-md">
            Back
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <span>here is your generated pdf</span>
          <a
            className="px-3 py-2 border rounded bg-yellow-700 text-white"
            href={url}
            download
          >
            {data?.name}.pdf
          </a>
        </div>
      </div>
      <div className="grow overflow-y-scroll">
        <Document className={"bg-white h-full"} file={url} onLoadSuccess={handleOnLoad}>
          {
            Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))
          }
          </Document>
          <span className="absolute top-[66px] right-0 bg-gray-400 rounded-full p-2"><RiShareForwardLine/></span>
      </div>
    </div>
  );
}

export default ApplicantPdfInvoice;
