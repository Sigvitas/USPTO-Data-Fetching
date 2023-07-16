const axios = require('axios');

async function searchPatentHandler(req, res) {
    try {
        const { patentNumber } = req.query;

        const response = await axios.get(
            `https://api.data.gov/uspto/patent/application/v1/${patentNumber}`,
            {
                params: {
                    api_key: ' XJVlKFHT.8L3O8fPTlEyZPJI8sQGFt9Kdkwdws4yF', // Replace with your actual API key
                },
            }
        );

        // Extract the relevant patent information from the API response
        const results = extractPatentInfo(response.data);

        res.json(results);
    } catch (error) {
        console.error('Error searching for patent:', error);
        res.status(500).json({ error: 'An error occurred while searching for the patent.' });
    }
}

// Extract relevant patent information from the API response
function extractPatentInfo(apiResponse) {
    const patentInfo = {
        id: apiResponse?.patentCaseMetadata?.patentNumber,
        title: apiResponse?.patentCaseMetadata?.title,
        abstract: apiResponse?.patentCaseMetadata?.abstractText,
        // Add more relevant fields based on the response structure
    };

    return [patentInfo];
}




async function downloadDocumentHandler(req, res) {
    try {
        const { patentNumber } = req.query;

        const response = await axios.get(
            `https://bulkdata.uspto.gov/data/patent/grant/redbook/fulltext/${patentNumber.substring(0, 2)}/${patentNumber}.zip`,
            {
                responseType: 'arraybuffer',
            }
        );

        // Set the appropriate response headers for the downloaded document
        res.setHeader('Content-Disposition', `attachment; filename="patent_${patentNumber}.zip"`);
        res.setHeader('Content-Type', 'application/zip');
        res.send(response.data);
    } catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).json({ error: 'An error occurred while downloading the document.' });
    }
}



module.exports = {
    searchPatentHandler,
    downloadDocumentHandler,
};
