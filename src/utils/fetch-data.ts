export const apiUrl = "https://bakesaleforgood.com";
export const fetchInitialData = async (search: string  = '') => {
  try {

    const response = search ? await fetch(`${apiUrl}/api/deals?searchTerm=${search}`) : await fetch(`${apiUrl}/api/deals`);
    const jsonData = response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchDetailData = async (detailId: number | string) => {
  try {
    const response = await fetch(`${apiUrl}/api/deals/${detailId}`);
    const jsonData = response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
