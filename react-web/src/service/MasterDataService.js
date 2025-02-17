const _fetchCategoriesService = async (setCategoriesList, setIsLoading) => {
  try {
    setIsLoading(true);

    // Append a cache-busting query parameter to the URL
    const timestamp = new Date().getTime();
    const url = `${process.env.REACT_APP_UAT_RESOURCE_ENDPOINT}/Category.json?t=${timestamp}`;

    const response = await fetch(url);
    const data = await response.json();
    setCategoriesList(data.Categories || []); // Assuming response format { Categories: [...] }
  } catch (error) { 
    console.error('Error fetching categories:', error);
  } finally {
    setIsLoading(false);
  }
};

const _fetchColorService = async (setCategoriesList, setIsLoading) => {
  try {
    setIsLoading(true);

    // Append a cache-busting query parameter to the URL
    const timestamp = new Date().getTime();
    const url = `${process.env.REACT_APP_UAT_RESOURCE_ENDPOINT}/Color.json?t=${timestamp}`;

    const response = await fetch(url);
    const data = await response.json();
    setCategoriesList(data.Categories || []); // Assuming response format { Categories: [...] }
  } catch (error) { 
    console.error('Error fetching categories:', error);
  } finally {
    setIsLoading(false);
  }
};
export { _fetchCategoriesService,_fetchColorService };
