// get async data from server
export const getAsyncData = async (url: string) => {
    const fetchData = await fetch(url);
    const jsonData = await fetchData.json();

    return jsonData;
};
