/**
 * Processes a fetch response and throws a custom error if not successful.
 * @param {Response} response - The fetch response object.
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */
export const handleError = async (response: any): Promise<any> => {
        // Attempt to parse the response body and extract a custom error message
        const errorBody = await response.json();
        console.log(errorBody);
        const errorMessage = errorBody.message || errorBody.err.message;
        console.log(errorMessage);
        throw new Error(errorMessage);
};