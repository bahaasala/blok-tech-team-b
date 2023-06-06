require("dotenv").config();

const accessKey = process.env.ACCESS_KEY_UNSPLASH;

const searchPhotos = async (query, orderBy) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=5`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    const data = await response.json();

    const photos = data.results.map((photo) => ({
      url: photo.urls.regular,
      alt: photo.description,
    }));

    return photos;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

module.exports = {
  searchPhotos: searchPhotos,
};
